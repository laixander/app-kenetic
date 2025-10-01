<script setup lang="ts">
import type { DynamicFieldProps } from '~/types/models'

const props = defineProps<DynamicFieldProps>()
const model = defineModel<any>()

const switchLayoutClass = computed(() => {
    switch (props.switchLayout) {
        case 'horizontal':
            return 'flex flex-row gap-4'
        case 'column':
            return 'grid grid-cols-2 gap-2'
        default:
            return 'flex flex-col gap-2'
    }
})
</script>

<template>
    <!-- Text Input -->
    <UFormField v-if="props.selectedType === 'Text'" :label="props.inputLabel" :required="props.isRequired"
        class="w-full">
        <UInput v-model="model" :placeholder="props.inputPlaceholder || 'Enter text'"
            :type="props.textInputType || 'text'" class="w-full"
            :ui="props.textInputType === 'number' ? { trailing: 'pointer-events-none' } : {}">
            <template v-if="props.textInputType === 'number' && props.selectedUnit" #trailing>
                <div class="text-xs text-muted">{{ props.selectedUnit }}</div>
            </template>
        </UInput>
    </UFormField>

    <!-- Textarea -->
    <UFormField v-else-if="props.selectedType === 'Textarea'" :label="props.inputLabel" :required="props.isRequired"
        class="w-full">
        <UTextarea v-model="model" :placeholder="props.inputPlaceholder || 'Enter details'" class="w-full" />
    </UFormField>

    <!-- Select -->
    <UFormField v-else-if="props.selectedType === 'Select'" :label="props.inputLabel" :required="props.isRequired"
        class="w-full">
        <USelect v-model="model" :items="props.selectItems" :placeholder="props.inputPlaceholder || 'Pick an option'"
            class="w-full" />
    </UFormField>

    <!-- Checkbox -->
    <UFormField v-else-if="props.selectedType === 'Checkbox'" :label="props.inputLabel" :required="props.isRequired"
        class="w-full">
        <UCheckboxGroup v-model="model" :items="props.checkboxItems"
            :orientation="props.checkboxOrientation || 'vertical'" />
    </UFormField>

    <!-- Switch -->
    <UFormField v-else-if="props.selectedType === 'Switch'" :label="props.inputLabel" :required="props.isRequired"
        class="w-full">
        <div :class="switchLayoutClass">
            <USwitch v-for="(item, index) in props.switchItems" :key="index" :value="item" :label="item" />
        </div>
    </UFormField>

    <!-- Radio -->
    <UFormField v-else-if="props.selectedType === 'Radio'" :label="props.inputLabel" :required="props.isRequired"
        class="w-full">
        <URadioGroup v-model="model" :items="props.radioItems" :orientation="props.radioOrientation || 'vertical'" />
    </UFormField>

    <!-- File Upload -->
    <UFileUpload v-else-if="props.selectedType === 'File Upload'" v-model="model"
        :label="props.inputLabel || 'Drop your file here'"
        :description="props.fileDescription || 'SVG, PNG, JPG or GIF (max. 2MB)'" class="w-full" />

    <!-- Slider -->
    <UFormField v-else-if="props.selectedType === 'Slider'" :label="props.inputLabel" :hint="`Value: ${model ?? 0}`"
        :required="props.isRequired" class="w-full">
        <USlider v-model="model" :min="props.sliderMin ?? 0" :max="props.sliderMax ?? 100" :step="props.sliderStep ?? 1"
            class="w-full my-2.5" />
    </UFormField>
</template>