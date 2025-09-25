<script setup lang="ts">
import FormCard from '~/components/feature/DataCollectionFormCard.vue';
import { dataStatCards, formCards, inputCards, dataCollectionTabs } from '~/data';

const open = ref(false)
// Input options (you can expand this list with more NuxtUI inputs)
const inputTypes = [
    { label: 'Text', value: 'UInput' },
    { label: 'Textarea', value: 'UTextarea' },
    { label: 'Select', value: 'USelect' },
    { label: 'Checkbox', value: 'UCheckbox' },
    { label: 'Switch', value: 'USwitch' },
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
        checkboxLayout.value = 'vertical'
        switchLayout.value = 'vertical'
    } else {
        // Reset inputValue type-wise
        if (selectedType.value === 'Checkbox' || selectedType.value === 'Switch') {
            inputValue.value = []
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
        case 'horizontal':
            return 'flex flex-row gap-4'
        case 'column':
            return 'grid grid-cols-2 gap-2'
        default:
            return 'flex flex-col gap-2'
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
</script>
<template>
    <div class="relative overflow-y-auto">
        <div
            class="absolute h-54 inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-indigo-900 dark:to-blue-900">
        </div>
        <Page title="Data Collection" description="Collect and manage sports performance data" inverted>
            <Tabs :items="dataCollectionTabs" color="white" />

            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block icon="i-lucide-clipboard-list" iconColor="blue" title="Data Forms"
                description="Choose the type of assessment you want to complete">
                <template #actions>
                    <UButton label="Create Form" icon="i-lucide-plus" size="lg" to="/data-collection/form-builder" />
                </template>
                <Grid :lg="3" :gap="4">
                    <FormCard v-for="(card, index) in formCards" :key="index" v-bind="card" :actions="[
                        { label: 'Use Form', icon: 'i-lucide-clipboard-list', click: () => console.log('Use Form') },
                        { label: 'Edit', icon: 'i-lucide-pencil', click: () => console.log('Edit') },
                        { label: 'Delete', icon: 'i-lucide-trash', click: () => console.log('Delete') }
                    ]" />
                </Grid>
            </Block>

            <Block icon="i-lucide-text-cursor-input" iconColor="teal" title="Input Fields"
                description="Manage pre-made input fields">
                <template #actions>
                    <UButton label="Create Input" icon="i-lucide-plus" variant="outline" color="neutral" size="lg"
                        @click="open = true" />
                </template>
                <Grid :lg="3" :gap="4">
                    <FormCard v-for="(card, index) in inputCards" :key="index" v-bind="card" :actions="[
                        { label: 'Use Form', icon: 'i-lucide-clipboard-list', click: () => console.log('Use Form') },
                        { label: 'Edit', icon: 'i-lucide-pencil', click: () => console.log('Edit') },
                        { label: 'Delete', icon: 'i-lucide-trash', click: () => console.log('Delete') }
                    ]" />
                </Grid>
            </Block>
        </Page>
    </div>

    <UModal v-model:open="open" title="Create Input" :ui="{ body: 'p-0 sm:p-0', }" class="max-w-4xl w-full">
        <template #body>
            <div class="flex divide-x divide-default">
                <div class="grid items-center gap-6 w-full p-4 sm:p-6">
                    <!-- Choose which input to render -->
                    <div class="space-y-2">
                        <UFormField label="Choose Input Type">
                            <USelect v-model="selectedType" :items="inputTypes.map((i: { label: any; }) => i.label)"
                                placeholder="Select input type" class="w-full" />
                        </UFormField>
                    </div>

                    <!-- Custom Label -->
                    <div v-if="selectedType" class="space-y-2">
                        <UFormField label="Label">
                            <UInput v-model="inputLabel" placeholder="Enter label" class="w-full" />
                        </UFormField>
                    </div>

                    <!-- Required toggle -->
                    <div v-if="selectedType">
                        <UCheckbox v-model="isRequired" label="Required field" />
                    </div>

                    <!-- Custom Placeholder -->
                    <div v-if="['Text', 'Textarea', 'Select'].includes(selectedType)">
                        <UFormField label="Placeholder">
                            <UInput v-model="inputPlaceholder" placeholder="Enter placeholder" class="w-full" />
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
                                <UButton color="red" variant="ghost" size="2xs" icon="i-lucide-x"
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
                                <UButton color="red" variant="ghost" size="2xs" icon="i-lucide-x"
                                    @click="removeCheckbox(index)" />
                            </li>
                        </ul>

                        <UFormField label="Layout">
                            <USelect v-model="checkboxLayout" :items="['horizontal', 'vertical', 'column']"
                                class="w-full" />
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
                                <UButton color="red" variant="ghost" size="2xs" icon="i-lucide-x"
                                    @click="removeSwitch(index)" />
                            </li>
                        </ul>

                        <UFormField label="Layout">
                            <USelect v-model="switchLayout" :items="['horizontal', 'vertical', 'column']"
                                class="w-full" />
                        </UFormField>
                    </div>

                    <!-- Description -->
                    <div v-if="selectedType" class="space-y-2">
                        <UFormField label="Description">
                            <UTextarea v-model="inputLabel" placeholder="Enter description" class="w-full" />
                        </UFormField>
                    </div>
                </div>

                <!-- Render the chosen input with custom label -->
                <div class="flex flex-col justify-center items-center w-full p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 min-h-64">

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
                        <UFormField v-if="selectedType === 'Text'" :label="inputLabel" :required="isRequired" class="w-full">
                            <UInput v-model="inputValue" :placeholder="inputPlaceholder || 'Enter text'"
                                class="w-full" />
                        </UFormField>

                        <!-- Textarea -->
                        <UFormField v-else-if="selectedType === 'Textarea'" :label="inputLabel" :required="isRequired" class="w-full">
                            <UTextarea v-model="inputValue" :placeholder="inputPlaceholder || 'Enter details'"
                                class="w-full" />
                        </UFormField>

                        <!-- Select -->
                        <UFormField v-else-if="selectedType === 'Select'" :label="inputLabel" :required="isRequired" class="w-full">
                            <USelect v-model="inputValue" :items="selectItems"
                                :placeholder="inputPlaceholder || 'Pick an option'" class="w-full" />
                        </UFormField>

                        <!-- Checkbox -->
                        <UFormField v-else-if="selectedType === 'Checkbox'" :label="inputLabel" :required="isRequired" class="w-full">
                            <div :class="checkboxLayoutClass">
                                <UCheckbox v-for="(item, index) in checkboxItems" :key="index" :value="item" :label="item" />
                            </div>
                        </UFormField>

                        <!-- Switch -->
                        <UFormField v-else-if="selectedType === 'Switch'" :label="inputLabel" :required="isRequired" class="w-full">
                            <div :class="switchLayoutClass">
                                <USwitch v-for="(item, index) in switchItems" :key="index" v-model="inputValue"
                                    :value="item" :label="item" />
                            </div>
                        </UFormField>

                        <div class="text-center text-default mt-6">
                            Preview
                        </div>
                    </template>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end gap-2 w-full">
                <UButton color="neutral" variant="ghost" @click="open = false">Cancel</UButton>
                <UButton color="primary" @click="open = false">Save</UButton>
            </div>
        </template>
    </UModal>
</template>