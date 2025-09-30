<script setup lang="ts">
import { formBuilderTabs, inputCards } from '~/data'
import { ref, nextTick } from 'vue'
import type { RadioGroupItem } from '@nuxt/ui'
import type { SelectItem } from '@nuxt/ui'

// Options for modal
const items = ref<RadioGroupItem[]>(['Preset Field', 'Custom Field'])
const selectedFieldType = ref<string>('Preset Field') // default

interface Field {
    id: number
    label: string
    icon?: string
    //   description?: string
    tag?: string
}

interface Row {
    id: number
    fields: Field[]
}

interface Section {
    id: number
    title: string
    icon: string
    editing?: boolean
    rows: Row[]
}

const sections = ref<Section[]>([])
let sectionCounter = 0
let rowCounter = 0
let fieldCounter = 0

// Modal state
const showModal = ref(false)
const modalSectionId = ref<number | null>(null)
const modalRowId = ref<number | null>(null)
const modalFieldId = ref<number | null>(null)

const availableIcons = ref([
    {
        label: 'Folder',
        value: 'i-lucide-folder',
        icon: 'i-lucide-folder'
    },
    {
        label: 'Ruler',
        value: 'i-lucide-ruler',
        icon: 'i-lucide-ruler'
    },
    {
        label: 'Activity',
        value: 'i-lucide-activity',
        icon: 'i-lucide-activity'
    },
    {
        label: 'Users',
        value: 'i-lucide-users',
        icon: 'i-lucide-users'
    },
    {
        label: 'Clipboard',
        value: 'i-lucide-clipboard-list',
        icon: 'i-lucide-clipboard-list'
    }
] satisfies SelectItem[])

const addSection = () => {
    sectionCounter++
    const newSection: Section = {
        id: sectionCounter,
        title: `New Section ${sectionCounter}`,
        icon: 'i-lucide-folder',
        editing: false,
        rows: []
    }

    sections.value.push(newSection)

    // Add a first row automatically
    addRow(newSection.id)
}

const startEditSection = async (id: number) => {
    const section = sections.value.find(s => s.id === id)
    if (section) {
        section.editing = true
        await nextTick()
    }
}

const saveSection = (id: number) => {
    const section = sections.value.find(s => s.id === id)
    if (section) section.editing = false
}

const addRow = (sectionId: number) => {
    const section = sections.value.find(s => s.id === sectionId)
    if (!section) return
    rowCounter++
    section.rows.push({
        id: rowCounter,
        fields: []
    })
}

const addField = () => {
    if (!modalSectionId.value || !modalRowId.value) return

    const section = sections.value.find(s => s.id === modalSectionId.value)
    if (!section) return
    const row = section.rows.find(r => r.id === modalRowId.value)
    if (!row) return

    let field: Partial<Field> = { label: 'Custom Field' }

    if (selectedFieldType.value === 'Preset Field' && selectedPreset.value) {
        const preset = inputCards.find(card => card.title === selectedPreset.value)
        if (preset) {
            field = {
                label: preset.title,
                icon: preset.icon,
                // description: preset.description,
                tag: preset.tag
            }
        }
    }

    if (!modalFieldId.value) {
        fieldCounter++
        row.fields.push({
            id: fieldCounter,
            label: field.label ?? 'Custom Field',
            icon: field.icon,
            //   description: field.description,
            tag: field.tag
        })
    } else {
        const existing = row.fields.find(f => f.id === modalFieldId.value)
        if (existing) Object.assign(existing, field)
    }

    // Reset + close
    showModal.value = false
    modalFieldId.value = null
    selectedPreset.value = undefined
}

const openFieldModal = (
    sectionId: number,
    rowId: number,
    fieldId: number | null = null
) => {
    modalSectionId.value = sectionId
    modalRowId.value = rowId
    modalFieldId.value = fieldId
    showModal.value = true
}

const deleteField = (sectionId: number, rowId: number, fieldId: number) => {
    const section = sections.value.find(s => s.id === sectionId)
    if (!section) return
    const row = section.rows.find(r => r.id === rowId)
    if (!row) return
    row.fields = row.fields.filter(f => f.id !== fieldId)
}

const deleteSection = (sectionId: number) => {
    sections.value = sections.value.filter(s => s.id !== sectionId)
}

const deleteRow = (sectionId: number, rowId: number) => {
    const section = sections.value.find(s => s.id === sectionId)
    if (!section) return

    section.rows = section.rows.filter(r => r.id !== rowId)

    // if all rows are deleted, add back one empty row
    if (section.rows.length === 0) {
        rowCounter++
        section.rows.push({
            id: rowCounter,
            fields: []
        })
    }
}


const presetOptions = ref(
    inputCards.map(card => ({
        label: card.title,
        value: card.title, // or card.tag if you prefer
        icon: card.icon
    }))
)
const selectedPreset = ref<string | undefined>(undefined)

const presetIcon = computed(() => {
    return presetOptions.value.find(item => item.value === selectedPreset.value)?.icon
})


// Custom Field Logic
const selectedType = ref<string | null>(null)
const inputTypes = [
    { label: 'Text', value: 'UInput' },
    { label: 'Textarea', value: 'UTextarea' },
    { label: 'Select', value: 'USelect' },
    { label: 'Checkbox', value: 'UCheckbox' },
    { label: 'Radio', value: 'URadioGroup' },
    { label: 'Switch', value: 'USwitch' },
    { label: 'File Upload', value: 'UFileUpload' },
    { label: 'Slider', value: 'USlider' }
]
</script>

<template>
    <Page title="Form Builder" description="Create and customize data collection forms for sports assessments">
        <template #toolbar>
            <UButton label="Back to Forms" icon="i-lucide-arrow-left" variant="ghost" to="/data-collection" />
        </template>
        <template #actions>
            <Tabs :items="formBuilderTabs" />
        </template>

        <Block title="Form Builder" description="Design and customize your data collection forms here">
            <!-- Dynamic Sections -->
            <div v-for="section in sections" :key="section.id" class="space-y-4 mb-6">
                <!-- Section Header -->
                <div class="flex items-center gap-2">
                    <!-- Icon select -->
                    <USelect v-if="section.editing" v-model="section.icon" :items="availableIcons" :icon="section.icon"
                        value-key="value" class="w-48" />
                    <UIcon v-else :name="section.icon" class="size-5" />

                    <UInput v-if="section.editing" v-model="section.title" class="w-auto" placeholder="Section title"
                        autofocus />
                    <span v-else class="font-medium">{{ section.title }}</span>

                    <div class="flex items-center gap-1">
                        <!-- Editing actions -->
                        <template v-if="section.editing">
                            <UButton icon="i-lucide-check" variant="ghost" size="sm" color="green"
                                @click="saveSection(section.id)" />
                            <UButton icon="i-lucide-x" variant="ghost" size="sm" color="red"
                                @click="section.editing = false" />
                        </template>

                        <!-- Default actions -->
                        <template v-else>
                            <UButton icon="i-lucide-pencil" variant="ghost" size="sm"
                                @click="startEditSection(section.id)" />
                            <UButton icon="i-lucide-trash" variant="ghost" size="sm" color="red"
                                @click="deleteSection(section.id)" />
                        </template>
                    </div>
                </div>

                <!-- Rows -->
                <div class="space-y-3">
                    <div v-for="row in section.rows" :key="row.id" class="flex items-center gap-2">
                        <!-- If row has fields -->
                        <template v-if="row.fields.length">
                            <div v-for="field in row.fields" :key="field.id" class="flex items-center w-full">
                                <!-- Display card with actions -->
                                <UCard class="relative w-full before:absolute before:w-[6px] before:block before:h-full before:bg-primary-500 overflow-hidden" :ui="{ body: 'sm:p-4' }">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <!-- Icon -->
                                            <UIcon v-if="field.icon" :name="field.icon"
                                                class="size-4 text-muted flex" />
                                            <!-- Title -->
                                            <span class="text-sm font-medium">{{ field.label }}</span>
                                            <!-- <p v-if="field.description" class="text-xs text-muted">
                                                {{ field.description }}
                                            </p> -->
                                            <UBadge v-if="field.tag" size="sm" color="neutral" variant="subtle">{{
                                                field.tag }}</UBadge>
                                        </div>

                                        <!-- Actions -->
                                        <UDropdownMenu :items="[
                                            {
                                                label: 'Edit',
                                                icon: 'i-lucide-pencil',
                                                onSelect: () => openFieldModal(section.id, row.id, field.id)
                                            },
                                            {
                                                label: 'Delete',
                                                icon: 'i-lucide-trash',
                                                color: 'red',
                                                onSelect: () => deleteField(section.id, row.id, field.id)
                                            }
                                        ]" :content="{
                                                align: 'end',
                                                side: 'bottom',
                                                sideOffset: 4
                                            }" :ui="{ content: 'w-40' }">
                                            <UButton icon="i-lucide-more-vertical" variant="ghost" color="neutral" size="sm" />
                                        </UDropdownMenu>
                                    </div>
                                </UCard>

                            </div>
                        </template>

                        <!-- If row is empty -->
                        <template v-else>
                            <div
                                class="relative overflow-hidden flex-1 px-4 py-4 border-1 border-muted rounded-lg text-muted text-sm text-center">
                                <div class="absolute top-0 left-0 inset-0 grid min-h-full">
                                    <Placeholder />
                                </div>
                                Empty Row
                            </div>
                        </template>



                        <!-- Add column button -->
                        <UButton icon="i-lucide-plus" variant="outline" size="sm" color="neutral" class="rounded-full"
                            @click="openFieldModal(section.id, row.id)" />

                        <!-- Delete row button -->
                        <UButton icon="i-lucide-trash" variant="ghost" size="sm" color="red"
                            @click="deleteRow(section.id, row.id)" />
                    </div>
                </div>

                <!-- Add Row Button -->
                <UButton label="Add Row Field" icon="i-lucide-plus" variant="outline" color="neutral"
                    @click="addRow(section.id)" />

                <USeparator />
            </div>

            <!-- Add Section Button -->
            <UButton label="Add Section" icon="i-lucide-plus" color="neutral" @click="addSection" />

            <!-- Field Modal -->
            <UModal v-model:open="showModal" :title="modalFieldId ? 'Edit Field' : 'Add Field'">
                <template #body>
                    <div class="space-y-4">
                        <!-- <h3 class="text-lg font-medium">
                            {{ modalFieldId ? 'Edit Field' : 'Add Field' }}
                        </h3> -->

                        <!-- Radio Group -->
                        <URadioGroup v-model="selectedFieldType" orientation="horizontal" indicator="end"
                            variant="table" size="sm" :ui="{ item: 'w-full' }" :items="items" />


                        <!-- Preset Field Select -->
                        <USelect v-if="selectedFieldType === 'Preset Field'" v-model="selectedPreset"
                            :items="presetOptions" value-key="value" placeholder="Select Preset Field"
                            :icon="presetIcon" size="lg" class="w-full" />

                        <!-- Confirm -->
                        <!-- <UButton :label="modalFieldId ? 'Save Field' : 'Add Field'" color="primary" size="lg" block
                            class="justify-center" @click="addField" /> -->

                        <div v-if="selectedFieldType === 'Custom Field'" class="space-y-4">
                            <UAlert
                                description="Customize your input by selecting a type, adding labels, placeholders, and options. Adjust settings like required fields and layout before previewing on the right."
                                icon="i-lucide-info"
                                variant="soft"
                                color="info"
                            />
                            <UFormField label="Choose Input Type">
                                <USelect v-model="selectedType" :items="inputTypes.map((i: { label: any; }) => i.label)"
                                    placeholder="Select input type" class="w-full" />
                            </UFormField>
                        </div>

                    </div>
                </template>
                <template #footer>
                    <!-- Actions -->
                    <div class="flex gap-2 justify-end">
                        <!-- Cancel -->
                        <UButton label="Cancel" variant="ghost" color="neutral" @click="showModal = false" />

                        <!-- Confirm -->
                        <UButton :label="modalFieldId ? 'Save Field' : 'Add Field'" color="primary" size="lg"
                            :disabled="selectedFieldType === 'Preset Field' && !selectedPreset" @click="addField" />
                    </div>
                </template>
            </UModal>
        </Block>
    </Page>
</template>
