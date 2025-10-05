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

// --- Custom field logic -------------------------------------------------- //

import type { UnitType } from '~/types/models'

const {findAll} = useAPI()

const units = ref<Array<UnitType>>()

onMounted(async ()=>{
   await getUnits()
})

const getUnits = async()=>{
    let {results} =  await findAll<UnitType>('/units', {paginate:false})
    units.value = results.value
}


// uid helper
function uid() {
    return Math.random().toString(36).substring(2, 9)
}

const editingInput = ref<null | Record<string, any>>(null)

// form state
// const form = reactive({ id: '', type: '', label: '', description: '' })
const form = reactive<InputConfig>({
    id: '',
    type: '',
    label: '',
    description: '',
    placeholder: '',
    options: [],
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: null
})

function resetForm() {
  form.id = ''
  form.type = ''
  form.label = ''
  form.description = ''
  form.placeholder = ''
  form.options = []
  form.unit = ''
  form.min = 0
  form.max = 100
  form.step = 1
  form.defaultValue = null
  optionsText.value = ''
  editingInput.value = null
}

type InputConfig = {
    id: string
    type: string
    label: string
    description?: string
    placeholder?: string
    options?: string[] // for Select, Radio, Checkbox
    unit?: string      // for number fields with units
    min?: number       // for slider/range
    max?: number
    step?: number
    defaultValue?: any
}

const optionsText = ref('')

// Whenever editing an input with options, hydrate optionsText
watch(
    () => form.type,
    async(newType) => {
        if (['Select', 'Radio', 'Checkbox'].includes(newType)) {
            optionsText.value = form.options?.join('\n') || ''
        }

        await getUnits();
    },
    { immediate: true }
)

// Keep form.options in sync when optionsText changes
watch(optionsText, (val) => {
    if (['Select', 'Radio', 'Checkbox'].includes(form.type)) {
        form.options = val.split('\n').map(s => s.trim()).filter(Boolean)
    }
})
</script>

<template>
    <Page title="Form Builder" description="Create and manage forms with customizable fields and layouts">
        <template #toolbar>
            <UButton label="Back to Forms" icon="i-lucide-arrow-left" variant="ghost" to="../assessment-forms" />
        </template>
        <template #actions>
            <Tabs :items="formBuilderTabs" />
        </template>

        <Block title="Form Fields" description="Configure the fields for your assessment form">
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
                    <div v-for="(row, rowIndex) in section.rows" :key="row.id" class="flex items-center gap-2">
                        <!-- If row has fields -->
                        <template v-if="row.fields.length">
                            <div v-for="field in row.fields" :key="field.id" class="flex items-center w-full">
                                <!-- Display card with actions -->
                                <UCard
                                    class="relative w-full before:absolute before:w-[6px] before:block before:h-full before:bg-primary-500 overflow-hidden"
                                    :ui="{ body: 'sm:p-4' }">
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
                                            <UButton icon="i-lucide-more-vertical" variant="ghost" color="neutral"
                                                size="sm" />
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
                        <!-- <UButton v-if="rowIndex > 0" icon="i-lucide-trash" variant="ghost" size="sm" color="red"
                            @click="deleteRow(section.id, row.id)" /> -->

                        <UButton icon="i-lucide-trash" variant="ghost" size="sm" color="red"
                            @click="deleteRow(section.id, row.id)" :class="{ 'invisible': rowIndex === 0 }" />
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
            <UModal v-model:open="showModal" :title="modalFieldId ? 'Edit Field' : 'Add Field'"
                :class="[selectedFieldType === 'Custom Field' ? 'max-w-4xl' : 'max-w-lg', 'w-full']"
                :ui="{ body: 'p-0 sm:p-0', }">
                <template #body>
                    <!-- <h3 class="text-lg font-medium">
                            {{ modalFieldId ? 'Edit Field' : 'Add Field' }}
                        </h3> -->

                    <!-- Radio Group -->
                    <div class="p-4 sm:p-6 border-b border-default space-y-4">
                        <URadioGroup v-model="selectedFieldType" orientation="horizontal" indicator="end"
                            variant="table" size="sm" :ui="{ item: 'w-full' }" :items="items" />

                        <UAlert v-if="selectedFieldType === 'Custom Field'"
                            description="Customize your input by selecting a type, adding labels, placeholders, and options."
                            icon="i-lucide-info" variant="soft" color="info" />
                    </div>


                    <!-- Preset Field Select -->
                    <div v-if="selectedFieldType === 'Preset Field'" class="p-4 sm:p-6">
                        <USelect v-model="selectedPreset" :items="presetOptions" value-key="value"
                            placeholder="Select Preset Field" :icon="presetIcon" size="lg" class="w-full" />
                    </div>

                    <!-- Confirm -->
                    <!-- <UButton :label="modalFieldId ? 'Save Field' : 'Add Field'" color="primary" size="lg" block
                            class="justify-center" @click="addField" /> -->

                    <div v-if="selectedFieldType === 'Custom Field'" class="space-y-4">
                        <div class="flex divide-x divide-default">
                            <!-- Left Form -->
                            <div class="w-full space-y-4 p-4 sm:p-6">
                                <UFormField label="Input Type">
                                    <USelect v-model="form.type"
                                        :items="['Text', 'Number', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch', 'File Upload', 'Slider']"
                                        placeholder="Select type" class="w-full" />
                                </UFormField>

                                <!-- Common -->
                                <UFormField label="Label" class="w-full">
                                    <UInput v-model="form.label" placeholder="Field label" class="w-full" />
                                </UFormField>

                                <UFormField label="Description" class="w-full">
                                    <UTextarea v-model="form.description" placeholder="Helper text..." class="w-full" />
                                </UFormField>

                                <UFormField label="Placeholder" v-if="['Text', 'Number', 'Textarea', 'Select'].includes(form.type)"
                                    class="w-full">
                                    <UInput v-model="form.placeholder" placeholder="Placeholder text" class="w-full" />
                                </UFormField>

                                <!-- Number specific -->
                                <!-- <div v-if="form.type === 'Number'" class="flex gap-2">
                                    <UFormField label="Unit">
                                        <UInput v-model="form.unit" placeholder="kg, cm, etc." />
                                    </UFormField>
                                </div> -->
                                <div v-if="form.type === 'Number'" class="flex items-end gap-2">
                                    <UFormField label="Unit" class="w-full">
                                        <USelect v-model="form.unit"
                                            :items="units.map(u => ({ label: `${u.name} (${u.symbol})`, value: u.id }))"
                                            placeholder="Select unit" class="w-full" />
                                    </UFormField>
                                </div>

                                <!-- Options (for Select, Radio, Checkbox) -->
                                <UFormField v-if="['Select', 'Radio', 'Checkbox'].includes(form.type)" label="Options"
                                    class="w-full">
                                    <UTextarea v-model="optionsText" placeholder="One option per line" class="w-full" />
                                </UFormField>

                                <!-- Slider specific -->
                                <div v-if="form.type === 'Slider'" class="grid grid-cols-3 gap-2">
                                    <UFormField label="Min">
                                        <UInput type="number" v-model.number="form.min" />
                                    </UFormField>
                                    <UFormField label="Max">
                                        <UInput type="number" v-model.number="form.max" />
                                    </UFormField>
                                    <UFormField label="Step">
                                        <UInput type="number" v-model.number="form.step" />
                                    </UFormField>
                                </div>
                            </div>

                            <!-- Right Preview -->
                            <div
                                class="relative flex flex-col justify-center items-center w-full p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 min-h-64">
                                <div class="absolute top-0 left-0 inset-0 grid min-h-full">
                                    <Placeholder />
                                </div>

                                <!-- Live Preview -->
                                <div class="w-full max-w-md space-y-4">
                                    <template v-if="form.type">
                                        <UFormField :label="form.label || 'Untitled Field'" :description="form.description">
                                            <!-- Text -->
                                            <UInput v-if="form.type === 'Text'"
                                                :placeholder="form.placeholder || 'Type something...'" />

                                            <!-- Number -->
                                            <UInput v-else-if="form.type === 'Number'" type="number"
                                                :placeholder="form.placeholder || 'Enter a number...'">
                                                <template #trailing v-if="form.unit">
                                                    <span class="text-xs text-muted">{{ form.unit }}</span>
                                                </template>
                                            </UInput>

                                            <!-- Textarea -->
                                            <UTextarea v-else-if="form.type === 'Textarea'"
                                                :placeholder="form.placeholder || 'Enter long text...'" />

                                            <!-- Select -->
                                            <USelect v-else-if="form.type === 'Select'"
                                                :items="form.options?.length ? form.options : ['Option A', 'Option B']"
                                                :placeholder="form.placeholder || 'Choose option'" />

                                            <!-- Checkbox -->
                                            <div v-else-if="form.type === 'Checkbox'" class="space-y-2">
                                                <UCheckbox
                                                    v-for="(opt, i) in form.options?.length ? form.options : ['Option A', 'Option B']"
                                                    :key="i" :label="opt" />
                                            </div>

                                            <!-- Radio -->
                                            <div v-else-if="form.type === 'Radio'" class="space-y-2">
                                                <URadioGroup v-model="form.defaultValue"
                                                    :items="form.options?.length ? form.options : ['Option A', 'Option B']" />
                                            </div>

                                            <!-- Switch -->
                                            <USwitch v-else-if="form.type === 'Switch'" :label="form.label || 'Enable feature'" />

                                            <!-- File Upload -->
                                            <UInput v-else-if="form.type === 'File Upload'" type="file" />

                                            <!-- Slider -->
                                            <div v-else-if="form.type === 'Slider'" class="space-y-2 mt-2">
                                                <USlider v-model="form.defaultValue" :min="form.min ?? 0" :max="form.max ?? 100"
                                                    :step="form.step ?? 1" />
                                                <p class="text-xs text-muted">Value: {{ form.defaultValue }}</p>
                                            </div>

                                            <!-- Fallback -->
                                            <UInput v-else placeholder="Preview unavailable" />
                                        </UFormField>
                                    </template>

                                    <!-- Empty state -->
                                    <template v-else>
                                        <div class="h-full flex flex-col items-center justify-center text-center gap-3">
                                            <UIcon name="i-lucide-text-cursor-input" class="w-10 h-10 text-dimmed" />
                                            <div class="space-y-1">
                                                <p class="text-sm font-medium text-muted">No input selected</p>
                                                <p class="text-xs text-dimmed">Choose an input type on the left to preview it here.
                                                </p>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>

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
