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

const selectedType = ref<string | null>(null)
const inputLabel = ref<string>('')
const inputValue = ref<any>('')

// Required toggle
const isRequired = ref(false)

// Placeholder
const inputPlaceholder = ref('')

// For custom select items
const selectItems = ref<string[]>([])
const newOption = ref<string>('')

// Checkbox options
const checkboxItems = ref<string[]>([])
const newCheckbox = ref<string>('')
const checkboxLayout = ref<'horizontal' | 'vertical' | 'column'>('vertical')

// Switch options
const switchItems = ref<string[]>([])
const newSwitch = ref<string>('')
const switchLayout = ref<'horizontal' | 'vertical' | 'column'>('vertical')

// Radio button
const radioItems = ref<string[]>([])
const newRadio = ref<string>('')
const radioOrientation = ref<'horizontal' | 'vertical'>('vertical')

// File upload
const fileDescription = ref('')

// --- Slider state (add near your other state)
const sliderMin = ref<number>(0)
const sliderMax = ref<number>(100)
const sliderStep = ref<number>(1)

// Ensure inputValue is numeric when Slider selected and keep it within bounds
watch(selectedType, (type) => {
    if (type === 'Checkbox' || type === 'Switch') {
        inputValue.value = []
    } else if (type === 'Slider') {
        // initialize slider value to the middle (or min) as a number
        const min = Number(sliderMin.value ?? 0)
        const max = Number(sliderMax.value ?? 100)
        const mid = Math.floor((min + max) / 2)
        inputValue.value = Math.max(min, Math.min(max, mid))
    } else {
        inputValue.value = ''
    }
})

// Keep slider value within min/max if the bounds change
watch([sliderMin, sliderMax], () => {
    if (selectedType.value === 'Slider') {
        let min = Number(sliderMin.value)
        let max = Number(sliderMax.value)
        // if user swapped values, normalize
        if (min > max) {
            const tmp = min; min = max; max = tmp
            sliderMin.value = min; sliderMax.value = max
        }
        // coerce inputValue to number & clamp
        const val = Number(inputValue.value ?? min)
        inputValue.value = Math.max(min, Math.min(max, isNaN(val) ? min : val))
    }
})

// Reset modal state when closed
watch(showModal, (val) => {
    if (!val) {
        selectedType.value = null
        inputLabel.value = ''
        inputValue.value = ''
        isRequired.value = false
        inputPlaceholder.value = ''
        checkboxItems.value = []
        newCheckbox.value = ''
        switchItems.value = []
        newSwitch.value = ''
        radioItems.value = []
        newRadio.value = ''
        checkboxLayout.value = 'vertical'
        switchLayout.value = 'vertical'
        radioOrientation.value = 'vertical'
        fileDescription.value = ''
    } else {
        // Reset inputValue type-wise
        if (selectedType.value === 'Checkbox' || selectedType.value === 'Switch') {
            inputValue.value = []
        } else if (selectedType.value === 'Slider') {
            inputValue.value = 0
        } else {
            inputValue.value = ''
        }
    }
})

function addOption() {
    if (newOption.value.trim() !== '') {
        selectItems.value.push(newOption.value.trim())
        newOption.value = ''
    }
}

function removeOption(index: number) {
    selectItems.value.splice(index, 1)
}

function addCheckbox() {
    if (newCheckbox.value.trim() !== '') {
        checkboxItems.value.push(newCheckbox.value.trim())
        newCheckbox.value = ''
    }
}

function removeCheckbox(index: number) {
    checkboxItems.value.splice(index, 1)
}

// Classes for checkbox layout
const checkboxLayoutClass = computed(() => {
    switch (checkboxLayout.value) {
        case 'horizontal': return 'flex flex-row gap-4'
        case 'column': return 'grid grid-cols-2 gap-2'
        default: return 'flex flex-col gap-2'
    }
})

function addSwitch() {
    if (newSwitch.value.trim() !== '') {
        switchItems.value.push(newSwitch.value.trim())
        newSwitch.value = ''
    }
}

function removeSwitch(index: number) {
    switchItems.value.splice(index, 1)
}

const switchLayoutClass = computed(() => {
    switch (switchLayout.value) {
        case 'horizontal': return 'flex flex-row gap-4'
        case 'column': return 'grid grid-cols-2 gap-2'
        default: return 'flex flex-col gap-2'
    }
})

function addRadio() {
    if (newRadio.value.trim() !== '') {
        radioItems.value.push(newRadio.value.trim())
        newRadio.value = ''
    }
}

function removeRadio(index: number) {
    radioItems.value.splice(index, 1)
}

function getIconForType(type: string) {
    switch (type) {
        case 'Text': return 'i-lucide-type'
        case 'Textarea': return 'i-lucide-align-left'
        case 'Select': return 'i-lucide-list'
        case 'Checkbox': return 'i-lucide-square-check'
        case 'Switch': return 'i-lucide-toggle-right'
        case 'Radio': return 'i-lucide-circle-check'
        case 'File Upload': return 'i-lucide-upload'
        case 'Slider': return 'i-lucide-chevrons-left-right-ellipsis'
        default: return 'i-lucide-text-cursor-input'
    }
}

function buildDescription() {
    if (selectedType.value === 'File Upload') {
        return fileDescription.value || 'Upload files for this field'
    }
    if (selectedType.value === 'Select' && selectItems.value.length) {
        return `Choose from: ${selectItems.value.join(', ')}`
    }
    return inputPlaceholder.value || 'Custom input field'
}

// Text input type (default is text)
const textInputType = ref<'text' | 'number' | 'file'>('text')

// Units for number input
const numberUnits = ['cm', 'kg', 'm', 'lbs'] // sample units
const selectedUnit = ref('')
</script>

<template>
    <Page title="Form Builder" description="Create and customize data collection forms for sports assessments">
        <template #toolbar>
            <UButton label="Back to Forms" icon="i-lucide-arrow-left" variant="ghost" to="/assessment-center/assessment-forms" />
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
                <UButton label="Add Row Field" icon="i-lucide-plus" variant="outline" color="neutral" size="lg"
                    @click="addRow(section.id)" />

                <USeparator />
            </div>

            <!-- Add Section Button -->
            <UButton label="Add Section" icon="i-lucide-plus" color="neutral" size="lg" @click="addSection" />

            <!-- Field Modal -->
            <UModal v-model:open="showModal" :title="modalFieldId ? 'Edit Field' : 'Add Field'"
                :class="[selectedFieldType === 'Custom Field' ? 'max-w-4xl' : 'max-w-lg', 'w-full']"
                :ui="{ body: 'p-0 sm:p-0', footer: 'grid lg:flex lg:justify-end' }">
                <template #body>
                    <!-- <h3 class="text-lg font-medium">
                            {{ modalFieldId ? 'Edit Field' : 'Add Field' }}
                        </h3> -->

                    <!-- Radio Group -->
                    <div class="p-4 sm:p-6 border-b border-default space-y-4">
                        <URadioGroup v-model="selectedFieldType" orientation="horizontal" indicator="end"
                            variant="table" :ui="{ item: 'w-full' }" :items="items" />

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
                        <div class="lg:flex divide-y lg:divide-y-0 lg:divide-x divide-default">
                            <div class="grid items-center gap-6 w-full p-4 sm:p-6">
                                <!-- Choose which input to render -->
                                <div class="space-y-2">
                                    <UFormField label="Choose Input Type" size="lg">
                                        <USelect v-model="selectedType"
                                            :items="inputTypes.map((i: { label: any; }) => i.label)"
                                            placeholder="Select input type" class="w-full" />
                                    </UFormField>
                                </div>



                                <!-- Text options -->
                                <div v-if="selectedType === 'Text'" class="space-y-3">
                                    <UFormField label="Input Type" size="lg">
                                        <USelect v-model="textInputType" :items="['text', 'number', 'file']"
                                            placeholder="Select type" class="w-full" />
                                    </UFormField>

                                    <!-- Unit Selector (only when number type) -->
                                    <div v-if="textInputType === 'number'" class="space-y-2">
                                        <UFormField label="Unit" size="lg">
                                            <USelect v-model="selectedUnit" :items="numberUnits"
                                                placeholder="Select unit" class="w-full" />
                                        </UFormField>
                                    </div>
                                </div>

                                <!-- Custom Label -->
                                <div v-if="selectedType" class="space-y-2">
                                    <UFormField label="Label" size="lg">
                                        <UInput v-model="inputLabel" placeholder="Enter label" class="w-full" />
                                    </UFormField>
                                </div>

                                <!-- Required toggle -->
                                <div v-if="selectedType && selectedType !== 'File Upload'">
                                    <UCheckbox v-model="isRequired" label="Required field" />
                                </div>

                                <!-- Custom Placeholder -->
                                <div v-if="selectedType && ['Text', 'Textarea', 'Select'].includes(selectedType)">
                                    <UFormField label="Placeholder" size="lg">
                                        <UInput v-model="inputPlaceholder" placeholder="Enter placeholder"
                                            class="w-full" />
                                    </UFormField>
                                </div>

                                <!-- File Upload custom description -->
                                <div v-if="selectedType === 'File Upload'" class="space-y-2">
                                    <UFormField label="File Description" size="lg">
                                        <UInput v-model="fileDescription" placeholder="Enter file upload description"
                                            class="w-full" />
                                    </UFormField>
                                </div>

                                <!-- Select options -->
                                <div v-if="selectedType === 'Select'" class="space-y-3">
                                    <UFormField label="Custom Options" size="lg">
                                        <div class="flex gap-2">
                                            <UInput v-model="newOption" placeholder="Add option" class="flex-1" />
                                            <UButton color="primary" @click="addOption">Add</UButton>
                                        </div>
                                    </UFormField>

                                    <ul v-if="selectItems.length" class="space-y-1">
                                        <li v-for="(item, index) in selectItems" :key="index"
                                            class="flex items-center justify-between text-sm bg-muted/50 rounded px-2 py-1">
                                            <span>{{ item }}</span>
                                            <UButton color="red" variant="ghost" size="xs" icon="i-lucide-x"
                                                @click="removeOption(index)" />
                                        </li>
                                    </ul>
                                </div>

                                <!-- Checkbox options -->
                                <div v-if="selectedType === 'Checkbox'" class="space-y-3">
                                    <UFormField label="Checkbox Options" size="lg">
                                        <div class="flex gap-2">
                                            <UInput v-model="newCheckbox" placeholder="Add checkbox option"
                                                class="flex-1" />
                                            <UButton color="primary" @click="addCheckbox">Add</UButton>
                                        </div>
                                    </UFormField>

                                    <ul v-if="checkboxItems.length" class="space-y-1">
                                        <li v-for="(item, index) in checkboxItems" :key="index"
                                            class="flex items-center justify-between text-sm bg-muted/50 rounded px-2 py-1">
                                            <span>{{ item }}</span>
                                            <UButton color="red" variant="ghost" size="xs" icon="i-lucide-x"
                                                @click="removeCheckbox(index)" />
                                        </li>
                                    </ul>

                                    <UFormField label="Layout">
                                        <USelect v-model="checkboxLayout" :items="['horizontal', 'vertical', 'column']"
                                            class="w-full" size="lg" />
                                    </UFormField>
                                </div>

                                <!-- Switch options -->
                                <div v-if="selectedType === 'Switch'" class="space-y-3">
                                    <UFormField label="Switch Options" size="lg">
                                        <div class="flex gap-2">
                                            <UInput v-model="newSwitch" placeholder="Add switch option"
                                                class="flex-1" />
                                            <UButton color="primary" @click="addSwitch">Add</UButton>
                                        </div>
                                    </UFormField>

                                    <ul v-if="switchItems.length" class="space-y-1">
                                        <li v-for="(item, index) in switchItems" :key="index"
                                            class="flex items-center justify-between text-sm bg-muted/50 rounded px-2 py-1">
                                            <span>{{ item }}</span>
                                            <UButton color="red" variant="ghost" size="xs" icon="i-lucide-x"
                                                @click="removeSwitch(index)" />
                                        </li>
                                    </ul>

                                    <UFormField label="Layout">
                                        <USelect v-model="switchLayout" :items="['horizontal', 'vertical', 'column']"
                                            class="w-full" size="lg" />
                                    </UFormField>
                                </div>

                                <!-- Radio options -->
                                <div v-if="selectedType === 'Radio'" class="space-y-3">
                                    <UFormField label="Radio Options" size="lg">
                                        <div class="flex gap-2">
                                            <UInput v-model="newRadio" placeholder="Add radio option" class="flex-1" />
                                            <UButton color="primary" @click="addRadio">Add</UButton>
                                        </div>
                                    </UFormField>

                                    <ul v-if="radioItems.length" class="space-y-1">
                                        <li v-for="(item, index) in radioItems" :key="index"
                                            class="flex items-center justify-between text-sm bg-muted/50 rounded px-2 py-1">
                                            <span>{{ item }}</span>
                                            <UButton color="red" variant="ghost" size="xs" icon="i-lucide-x"
                                                @click="removeRadio(index)" />
                                        </li>
                                    </ul>

                                    <UFormField label="Orientation">
                                        <USelect v-model="radioOrientation" :items="['horizontal', 'vertical']" class="w-full" size="lg" />
                                    </UFormField>
                                </div>

                                <!-- Slider options -->
                                <div v-if="selectedType === 'Slider'" class="space-y-3">
                                    <UFormField label="Minimum Value">
                                        <UInput v-model.number="sliderMin" type="number" placeholder="Enter min value"
                                            class="w-full" size="lg" />
                                    </UFormField>

                                    <UFormField label="Maximum Value">
                                        <UInput v-model.number="sliderMax" type="number" placeholder="Enter max value"
                                            class="w-full" size="lg" />
                                    </UFormField>

                                    <UFormField label="Step">
                                        <UInput v-model.number="sliderStep" type="number" placeholder="Enter step value"
                                            class="w-full" size="lg" />
                                    </UFormField>
                                </div>

                                <USeparator v-if="selectedType" />

                                <!-- Description -->
                                <div v-if="selectedType" class="space-y-2">
                                    <UFormField label="Description" help="This will only show on the card list">
                                        <UTextarea placeholder="Enter input description" class="w-full" size="lg" />
                                    </UFormField>
                                </div>
                            </div>

                            <!-- Render the chosen input with custom label -->
                            <div
                                class="relative flex flex-col justify-center items-center w-full p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 min-h-64">
                                <div class="absolute top-0 left-0 inset-0 grid min-h-full">
                                    <Placeholder />
                                </div>

                                <!-- Empty state -->
                                <div v-if="!selectedType"
                                    class="h-full flex flex-col items-center justify-center text-center gap-3">
                                    <UIcon name="i-lucide-text-cursor-input" class="w-10 h-10 text-dimmed" />
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-muted">No input selected</p>
                                        <p class="text-xs text-dimmed">Choose an input type on the left to preview it
                                            here.</p>
                                    </div>
                                </div>

                                <template v-else>
                                    <!-- Text Input -->
                                    <!-- <UFormField v-if="selectedType === 'Text'" :label="inputLabel" :required="isRequired" class="w-full">
                            <UInput v-model="inputValue" :placeholder="inputPlaceholder || 'Enter text'"
                                class="w-full" />
                        </UFormField> -->
                                    <UFormField v-if="selectedType === 'Text'" :label="inputLabel"
                                        :required="isRequired" class="w-full" size="lg">
                                        <UInput v-model="inputValue" :placeholder="inputPlaceholder || 'Enter text'"
                                            :type="textInputType" class="w-full"
                                            :ui="textInputType === 'number' ? { trailing: 'pointer-events-none' } : {}">
                                            <template v-if="textInputType === 'number' && selectedUnit" #trailing>
                                                <div class="text-xs text-muted">{{ selectedUnit }}</div>
                                            </template>
                                        </UInput>
                                    </UFormField>

                                    <!-- Textarea -->
                                    <UFormField v-else-if="selectedType === 'Textarea'" :label="inputLabel"
                                        :required="isRequired" class="w-full" size="lg">
                                        <UTextarea v-model="inputValue"
                                            :placeholder="inputPlaceholder || 'Enter details'" class="w-full" />
                                    </UFormField>

                                    <!-- Select -->
                                    <UFormField v-else-if="selectedType === 'Select'" :label="inputLabel"
                                        :required="isRequired" class="w-full" size="lg">
                                        <USelect v-model="inputValue" :items="selectItems"
                                            :placeholder="inputPlaceholder || 'Pick an option'" class="w-full" />
                                    </UFormField>

                                    <!-- Checkbox -->
                                    <UFormField v-else-if="selectedType === 'Checkbox'" :label="inputLabel"
                                        :required="isRequired" class="w-full" size="lg">
                                        <div :class="checkboxLayoutClass">
                                            <UCheckbox v-for="(item, index) in checkboxItems" :key="index" :value="item"
                                                :label="item" />
                                        </div>
                                    </UFormField>

                                    <!-- Switch -->
                                    <UFormField v-else-if="selectedType === 'Switch'" :label="inputLabel"
                                        :required="isRequired" class="w-full" size="lg">
                                        <div :class="switchLayoutClass">
                                            <USwitch v-for="(item, index) in switchItems" :key="index"
                                                v-model="inputValue" :value="item" :label="item" />
                                        </div>
                                    </UFormField>

                                    <!-- Radio -->
                                    <UFormField v-else-if="selectedType === 'Radio'" :label="inputLabel"
                                        :required="isRequired" class="w-full" size="lg">
                                        <URadioGroup v-model="inputValue" :items="radioItems"
                                            :orientation="radioOrientation" />
                                    </UFormField>

                                    <!-- File Upload -->
                                    <UFileUpload v-else-if="selectedType === 'File Upload'" v-model="inputValue"
                                        :label="inputLabel || 'Drop your file here'"
                                        :description="fileDescription || 'SVG, PNG, JPG or GIF (max. 2MB)'"
                                        class="w-full" />

                                    <!-- Slider -->
                                    <UFormField v-else-if="selectedType === 'Slider'" :label="inputLabel"
                                        :hint="`Value: ${inputValue}`" :required="isRequired" class="w-full">
                                        <USlider v-model="inputValue" :min="sliderMin" :max="sliderMax"
                                            :step="sliderStep" class="w-full" />
                                    </UFormField>
                                </template>
                            </div>
                        </div>
                    </div>

                </template>
                <template #footer>
                    <UButton :label="modalFieldId ? 'Save Field' : 'Add Field'" color="primary" size="lg" :disabled="selectedFieldType === 'Preset Field' && !selectedPreset" @click="addField" class="justify-center w-full lg:order-2 lg:w-auto" />
                    <UButton label="Cancel" variant="ghost" color="neutral" @click="showModal = false" class="justify-center w-full lg:order-1 lg:w-auto" />
                </template>
            </UModal>
        </Block>
    </Page>
</template>
