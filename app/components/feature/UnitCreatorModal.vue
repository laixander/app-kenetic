<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Unit } from '~/composables/useUnits'

const props = defineProps<{
    open: boolean
    unit?: Unit | null
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'save', unit: Omit<Unit, 'id'> & { id?: string }): void
}>()

// Local modal open state
const localOpen = ref(props.open)
watch(() => props.open, (val) => (localOpen.value = val))
watch(localOpen, (val) => {
    if (!val) {
        emit('close')
    } else {
        resetForm()
    }
})

// form state
const form = reactive<Unit>({
    id: '',
    name: '',
    symbol: '',
    factor: 1
})

function resetForm() {
    if (props.unit) {
        Object.assign(form, props.unit)
    } else {
        form.id = ''
        form.name = ''
        form.symbol = ''
        form.factor = 1
    }
}

function onSave() {
    if (!form.name.trim()) {
        alert('Name is required')
        return
    }
    emit('save', { ...form })
    localOpen.value = false // close modal after save
}
</script>

<template>
    <UModal v-model:open="localOpen" :title="props.unit ? 'Edit Unit' : 'Create Unit'" :description="props.unit
        ? 'Update the details of your existing unit.'
        : 'Define a new measurement unit with name, symbol, and conversion factor.'" class="max-w-xl w-full">
        <template #body>
            <div class="space-y-4">
                <UFormField label="Unit name" class="w-full">
                    <UInput v-model="form.name" placeholder="e.g. Meter, Kilogram" class="w-full" />
                </UFormField>

                <UFormField label="Symbol (optional)" class="w-full">
                    <UInput v-model="form.symbol" placeholder="e.g. m, kg" class="w-full" />
                </UFormField>

                <UFormField label="Conversion factor (to base unit)" class="w-full">
                    <UInput v-model="form.factor" type="number" placeholder="e.g. 1, 1000" class="w-full" />
                </UFormField>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-end gap-2 w-full">
                <UButton color="neutral" variant="ghost" @click="localOpen = false">Cancel</UButton>
                <UButton color="primary" @click="onSave">Save</UButton>
            </div>
        </template>
    </UModal>
</template>