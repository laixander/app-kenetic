<script setup lang="ts">
import InputListCard from '~/components/feature/DataCollectionCard.vue';
import { inputCards as initialCards } from '~/data'

const inputCards = ref([...initialCards])

const open = ref(false)

// Input options (you can expand this list with more NuxtUI inputs)
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
const checkboxOrientation = ref<'horizontal' | 'vertical'>('vertical')

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
watch(open, (val) => {
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
        checkboxOrientation.value = 'vertical'
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
// const checkboxLayoutClass = computed(() => {
//     switch (checkboxLayout.value) {
//         case 'horizontal': return 'flex flex-row gap-4'
//         case 'column': return 'grid grid-cols-2 gap-2'
//         default: return 'flex flex-col gap-2'
//     }
// })

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

function addNewInput() {
    if (!selectedType.value) return

    inputCards.value.unshift({
        color: 'gray',
        icon: getIconForType(selectedType.value),
        title: inputLabel.value || selectedType.value,
        description: buildDescription(),
        tag: selectedType.value,
        timestamp: 'Just now'
    })

    open.value = false
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
    <Block icon="i-lucide-text-cursor-input" iconColor="teal" title="Input Fields"
        description="Manage preset input fields">
        <template #actions>
            <UButton label="Create Input" icon="i-lucide-plus" variant="outline" color="neutral" size="lg"
                @click="open = true" />
        </template>
        <Grid :lg="3" :gap="4">
            <InputListCard v-for="(card, index) in inputCards" :key="index" v-bind="card" :actions="[
                { label: 'View', icon: 'i-lucide-eye', click: () => console.log('View') },
                { label: 'Edit', icon: 'i-lucide-pencil', click: () => console.log('Edit') },
                { label: 'Delete', icon: 'i-lucide-trash', click: () => console.log('Delete') }
            ]" />
        </Grid>
    </Block>
    <UModal v-model:open="open" title="Create Input"
        description="Customize your input by selecting a type, adding labels, placeholders, and options."
        :ui="{ body: 'p-0 sm:p-0', }" class="max-w-4xl w-full">
        <template #body>
            <div class="flex divide-x divide-default">
                <div class="grid items-center gap-6 w-full p-4 sm:p-6">
                    <!-- <UAlert
                        description="Customize your input by selecting a type, adding labels, placeholders, and options. Adjust settings like required fields and layout before previewing on the right."
                        icon="i-lucide-info"
                        variant="soft"
                        color="info"
                    /> -->
                    <!-- Choose which input to render -->
                    <div class="space-y-2">
                        <UFormField label="Choose Input Type">
                            <USelect v-model="selectedType" :items="inputTypes.map((i: { label: any; }) => i.label)"
                                placeholder="Select input type" class="w-full" />
                        </UFormField>
                    </div>



                    <!-- Text options -->
                    <div v-if="selectedType === 'Text'" class="space-y-3">
                        <UFormField label="Input Type">
                            <USelect v-model="textInputType" :items="['text', 'number', 'file']"
                                placeholder="Select type" class="w-full" />
                        </UFormField>

                        <!-- Unit Selector (only when number type) -->
                        <div v-if="textInputType === 'number'" class="space-y-2">
                            <UFormField label="Unit">
                                <USelect v-model="selectedUnit" :items="numberUnits" placeholder="Select unit"
                                    class="w-full" />
                            </UFormField>
                        </div>
                    </div>

                    <!-- Custom Label -->
                    <div v-if="selectedType" class="space-y-2">
                        <UFormField label="Label">
                            <UInput v-model="inputLabel" placeholder="Enter label" class="w-full" />
                        </UFormField>
                    </div>

                    <!-- Required toggle -->
                    <div v-if="selectedType && selectedType !== 'File Upload'">
                        <UCheckbox v-model="isRequired" label="Required field" />
                    </div>

                    <!-- Custom Placeholder -->
                    <div v-if="selectedType && ['Text', 'Textarea', 'Select'].includes(selectedType)">
                        <UFormField label="Placeholder">
                            <UInput v-model="inputPlaceholder" placeholder="Enter placeholder" class="w-full" />
                        </UFormField>
                    </div>

                    <!-- File Upload custom description -->
                    <div v-if="selectedType === 'File Upload'" class="space-y-2">
                        <UFormField label="File Description">
                            <UInput v-model="fileDescription" placeholder="Enter file upload description"
                                class="w-full" />
                        </UFormField>
                    </div>

                    <!-- Select options -->
                    <div v-if="selectedType === 'Select'" class="space-y-3">
                        <UFormField label="Custom Options">
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
                        <UFormField label="Checkbox Options">
                            <div class="flex gap-2">
                                <UInput v-model="newCheckbox" placeholder="Add checkbox option" class="flex-1" />
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

                        <UFormField label="Orientation">
                            <USelect v-model="checkboxOrientation" :items="['horizontal', 'vertical']" class="w-full" />
                        </UFormField>
                    </div>

                    <!-- Switch options -->
                    <div v-if="selectedType === 'Switch'" class="space-y-3">
                        <UFormField label="Switch Options">
                            <div class="flex gap-2">
                                <UInput v-model="newSwitch" placeholder="Add switch option" class="flex-1" />
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
                                class="w-full" />
                        </UFormField>
                    </div>

                    <!-- Radio options -->
                    <div v-if="selectedType === 'Radio'" class="space-y-3">
                        <UFormField label="Radio Options">
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
                            <USelect v-model="radioOrientation" :items="['horizontal', 'vertical']" />
                        </UFormField>
                    </div>

                    <!-- Slider options -->
                    <div v-if="selectedType === 'Slider'" class="space-y-3">
                        <UFormField label="Minimum Value">
                            <UInput v-model.number="sliderMin" type="number" placeholder="Enter min value"
                                class="w-full" />
                        </UFormField>

                        <UFormField label="Maximum Value">
                            <UInput v-model.number="sliderMax" type="number" placeholder="Enter max value"
                                class="w-full" />
                        </UFormField>

                        <UFormField label="Step">
                            <UInput v-model.number="sliderStep" type="number" placeholder="Enter step value"
                                class="w-full" />
                        </UFormField>
                    </div>

                    <USeparator v-if="selectedType" />

                    <!-- Description -->
                    <div v-if="selectedType" class="space-y-2">
                        <UFormField label="Description" help="This will only show on the card list">
                            <UTextarea placeholder="Enter input description" class="w-full" />
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
                            <p class="text-xs text-dimmed">Choose an input type on the left to preview it here.</p>
                        </div>
                    </div>

                    <template v-else>
                        <!-- Text Input -->
                        <!-- <UFormField v-if="selectedType === 'Text'" :label="inputLabel" :required="isRequired" class="w-full">
                            <UInput v-model="inputValue" :placeholder="inputPlaceholder || 'Enter text'"
                                class="w-full" />
                        </UFormField> -->
                        <UFormField v-if="selectedType === 'Text'" :label="inputLabel" :required="isRequired"
                            class="w-full">
                            <UInput v-model="inputValue" :placeholder="inputPlaceholder || 'Enter text'"
                                :type="textInputType" class="w-full"
                                :ui="textInputType === 'number' ? { trailing: 'pointer-events-none' } : {}">
                                <template v-if="textInputType === 'number' && selectedUnit" #trailing>
                                    <div class="text-xs text-muted">{{ selectedUnit }}</div>
                                </template>
                            </UInput>
                        </UFormField>

                        <!-- Textarea -->
                        <UFormField v-else-if="selectedType === 'Textarea'" :label="inputLabel" :required="isRequired"
                            class="w-full">
                            <UTextarea v-model="inputValue" :placeholder="inputPlaceholder || 'Enter details'"
                                class="w-full" />
                        </UFormField>

                        <!-- Select -->
                        <UFormField v-else-if="selectedType === 'Select'" :label="inputLabel" :required="isRequired"
                            class="w-full">
                            <USelect v-model="inputValue" :items="selectItems"
                                :placeholder="inputPlaceholder || 'Pick an option'" class="w-full" />
                        </UFormField>

                        <!-- Checkbox -->
                        <UFormField v-else-if="selectedType === 'Checkbox'" :label="inputLabel" :required="isRequired"
                            class="w-full">
                            <UCheckboxGroup v-model="inputValue" :items="checkboxItems"
                                :orientation="checkboxOrientation" />
                            <!-- <div :class="checkboxLayoutClass">
                                <UCheckbox v-for="(item, index) in checkboxItems" :key="index" :value="item"
                                    :label="item" />
                            </div> -->
                        </UFormField>

                        <!-- Switch -->
                        <UFormField v-else-if="selectedType === 'Switch'" :label="inputLabel" :required="isRequired"
                            class="w-full">
                            <div :class="switchLayoutClass">
                                <USwitch v-for="(item, index) in switchItems" :key="index" v-model="inputValue"
                                    :value="item" :label="item" />
                            </div>
                        </UFormField>

                        <!-- Radio -->
                        <UFormField v-else-if="selectedType === 'Radio'" :label="inputLabel" :required="isRequired"
                            class="w-full">
                            <URadioGroup v-model="inputValue" :items="radioItems" :orientation="radioOrientation" />
                        </UFormField>

                        <!-- File Upload -->
                        <UFileUpload v-else-if="selectedType === 'File Upload'" v-model="inputValue"
                            :label="inputLabel || 'Drop your file here'"
                            :description="fileDescription || 'SVG, PNG, JPG or GIF (max. 2MB)'" class="w-full" />

                        <!-- Slider -->
                        <UFormField v-else-if="selectedType === 'Slider'" :label="inputLabel"
                            :hint="`Value: ${inputValue}`" :required="isRequired" class="w-full">
                            <USlider v-model="inputValue" :min="sliderMin" :max="sliderMax" :step="sliderStep"
                                class="w-full" />
                        </UFormField>
                    </template>
                </div>
            </div>
        </template>

        <template #footer="{ close }">
            <div class="flex justify-end gap-2 w-full">
                <UButton color="neutral" variant="ghost" @click="close">Cancel</UButton>
                <UButton color="primary" @click="addNewInput">Save</UButton>
            </div>
        </template>
    </UModal>
</template>