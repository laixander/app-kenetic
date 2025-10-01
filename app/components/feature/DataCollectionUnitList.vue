<script setup lang="ts">
import UnitCard from './UnitCard.vue'
import { ref, reactive, defineProps, defineEmits } from 'vue'

// simple uid generator instead of uuid dependency
function uid() {
    return Math.random().toString(36).substring(2, 9)
}

const showModal = ref(false)
const editingUnit = ref<null | Record<string, any>>(null)

const units = ref<Array<{ id: string; name: string; symbol?: string; factor: number }>>([
    { id: uid(), name: 'Meter', symbol: 'm', factor: 1 },
    { id: uid(), name: 'Kilometer', symbol: 'km', factor: 1000 },
    { id: uid(), name: 'Centimeter', symbol: 'cm', factor: 0.01 }
])

const form = reactive({ id: '', name: '', symbol: '', factor: 1 })

function openModalForCreate() {
    editingUnit.value = null
    form.id = ''
    form.name = ''
    form.symbol = ''
    form.factor = 1
    showModal.value = true
}

function openModalForEdit(unit: any) {
    editingUnit.value = unit
    form.id = unit.id
    form.name = unit.name
    form.symbol = unit.symbol || ''
    form.factor = unit.factor
    showModal.value = true
}

function onSave() {
    if (!form.name || String(form.name).trim().length < 1) {
        alert('Please provide a unit name.')
        return
    }

    if (editingUnit.value) {
        // Immutable update to avoid TS index errors
        units.value = units.value.map(u =>
            u.id === form.id
                ? { ...u, name: form.name.trim(), symbol: form.symbol.trim(), factor: Number(form.factor) }
                : u
        )
    } else {
        units.value.unshift({
            id: uid(),
            name: form.name.trim(),
            symbol: form.symbol.trim(),
            factor: Number(form.factor)
        })
    }

    showModal.value = false
}

function deleteUnit(id: string) {
    if (!confirm('Delete this unit?')) return
    units.value = units.value.filter(u => u.id !== id)
}
</script>
<template>
    <Block icon="i-lucide-ruler" iconColor="violet" title="Unit Measurement"
        description="Manage preset unit measurement">
        <template #actions>
            <UButton label="Add Unit" icon="i-lucide-plus" variant="outline" color="neutral" size="lg"
                @click="openModalForCreate" />
        </template>
        <Grid :lg="3" :gap="4">
            <UnitCard v-for="unit in units" :key="unit.id" :unit="unit" @edit="openModalForEdit" @delete="deleteUnit" />
        </Grid>
    </Block>
    <!-- Modal: Create / Edit -->
    <UModal v-model:open="showModal" :title="editingUnit ? 'Edit Unit' : 'Create Unit'"
        :description="editingUnit ? 'Update the details of your existing unit.' : 'Define a new measurement unit with name, symbol, and conversion factor.'"
        class="max-w-xl w-full">
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

        <template #footer="{ close }">
            <div class="flex justify-end gap-2 w-full">
                <UButton color="neutral" variant="ghost" @click="close">Cancel</UButton>
                <UButton color="primary" @click="onSave">Save</UButton>
            </div>
        </template>
    </UModal>

</template>