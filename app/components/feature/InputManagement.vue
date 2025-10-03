<script setup lang="ts">
import InputCard from './InputCard.vue'
import { ref, reactive } from 'vue'
import { useUnits, type Unit } from '~/composables/useUnits'
import UnitCreator from './UnitCreator.vue'

const { addUnit, updateUnit } = useUnits()
const editingUnit = ref<Unit | null>(null)
const { units } = useUnits()

function handleSave(unit: Unit) {
    if (unit.id) {
        updateUnit(unit)
    } else {
        addUnit(unit) // ✅ new unit actually added
    }
    showUnitModal.value = false
}

const showUnitModal = ref(false)

// uid helper
function uid() {
    return Math.random().toString(36).substring(2, 9)
}

const showModal = ref(false)
const editingInput = ref<null | Record<string, any>>(null)

const inputs = ref<Array<{ id: string; type: string; label: string; description: string }>>([
    { id: uid(), type: 'Text', label: 'First Name', description: 'Enter your first name' },
    { id: uid(), type: 'Number', label: 'Height & Weight', description: 'Physical Measurement' }
])

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

// open modal (create new)
function openModalForCreate() {
    resetForm()
    editingInput.value = null
    form.id = ''
    form.type = ''
    form.label = ''
    form.description = ''
    showModal.value = true
}

// open modal (edit existing)
function openModalForEdit(input: any) {
    editingInput.value = input
    form.id = input.id
    form.type = input.type
    form.label = input.label
    form.description = input.description
    showModal.value = true
}

function onCancel() {
    showModal.value = false
    resetForm()
}

function onSave() {
    if (!form.label.trim()) {
        alert('Please provide a label.')
        return
    }

    const newInput: InputConfig = {
        id: editingInput.value ? form.id : uid(),
        type: form.type || 'Text',
        label: form.label.trim(),
        description: form.description?.trim(),
        placeholder: form.placeholder?.trim(),
        options: ['Select', 'Radio', 'Checkbox'].includes(form.type)
            ? form.options?.filter(Boolean) ?? []
            : [],
        unit: form.type === 'Number' ? form.unit?.trim() : '',
        min: form.type === 'Slider' ? form.min : undefined,
        max: form.type === 'Slider' ? form.max : undefined,
        step: form.type === 'Slider' ? form.step : undefined,
        defaultValue: form.type === 'Slider' ? form.defaultValue : null,
    }

    if (editingInput.value) {
        // update
        inputs.value = inputs.value.map(i => (i.id === form.id ? newInput : i))
    } else {
        // create
        inputs.value.unshift(newInput)
    }

    showModal.value = false
    resetForm()
}

function deleteInput(id: string) {
    if (!confirm('Delete this input?')) return
    inputs.value = inputs.value.filter(i => i.id !== id)
}

const sliderValue = ref(50)

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
    (newType) => {
        if (['Select', 'Radio', 'Checkbox'].includes(newType)) {
            optionsText.value = form.options?.join('\n') || ''
        }
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
    <Block icon="i-lucide-text-cursor-input" iconColor="teal" title="Input Fields"
        description="Manage preset input fields">
        <template #actions>
            <UButton label="Add New Field" icon="i-lucide-plus" variant="outline" color="neutral" size="lg"
                @click="openModalForCreate" />
        </template>
        <Grid :lg="3" :gap="4">
            <InputCard v-for="input in inputs" :key="input.id" :input="input" @edit="openModalForEdit"
                @delete="deleteInput" />
        </Grid>
    </Block>
    <!-- Modal -->
    <UModal v-model:open="showModal" :title="editingInput ? 'Edit Input' : 'Input Field Details'"
        :description="editingInput ? 'Update this input field' : 'Define a new input field'"
        :ui="{ body: 'p-0 sm:p-0', }" class="max-w-4xl w-full">
        <template #body>
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
                                :items="units.map(u => ({ label: `${u.name} (${u.symbol})`, value: u.symbol }))"
                                placeholder="Select unit" class="w-full" />
                        </UFormField>
                        <!-- Add Unit button -->
                        <UButton icon="i-lucide-plus" @click="showUnitModal = true" variant="outline" color="neutral"
                            label="New Unit" />

                        <!-- Inline Unit Creator Modal -->
                        <UnitCreator :open="showUnitModal" :unit="editingUnit" @close="showUnitModal = false"
                            @save="handleSave" />
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
        </template>


        <template #footer>
            <div class="flex justify-end gap-2 mt-2">
                <UButton color="neutral" variant="ghost" @click="onCancel">Cancel</UButton>
                <UButton color="primary" @click="onSave">Save</UButton>
            </div>
        </template>
    </UModal>
</template>
