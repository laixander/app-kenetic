<template>
    <Block icon="i-lucide-ruler" iconColor="violet" title="Unit Measurement"
        description="Manage preset unit measurement">
        <template #actions>
            <UButton label="Add Unit" icon="i-lucide-plus" variant="outline" color="neutral" size="lg"
                @click="createNew" />
        </template>
        <Grid :lg="3" :gap="4">
            <UnitCard v-for="unit in units" :key="unit.id" :unit="unit" @edit="edit(unit)" @delete="deleteRecord(unit)" />
        </Grid>
    </Block>
    <!-- Modal: Create / Edit -->
    <UModal v-model:open="showModal" title="Unit Details"
        description="Define measurement unit with name, symbol, and conversion factor." class="max-w-xl w-full">
        <template #body>
            <div class="space-y-4">
                <UFormField label="Unit name" class="w-full">
                    <UInput v-model="unit.name" placeholder="e.g. Meter, Kilogram" class="w-full" />
                </UFormField>

                <UFormField label="Symbol (optional)" class="w-full">
                    <UInput v-model="unit.symbol" placeholder="e.g. m, kg" class="w-full" />
                </UFormField>

                <UFormField label="Conversion factor (to base unit)" class="w-full">
                    <UInput v-model="unit.conversionFactor" type="number" placeholder="e.g. 1, 1000" class="w-full" />
                </UFormField>
            </div>
        </template>

        <template #footer="{ close }">
            <div class="flex justify-end gap-2 w-full">
                <UButton color="neutral" variant="ghost" @click="close">Cancel</UButton>
                <UButton color="primary" @click="save">Save</UButton>
            </div>
        </template>
    </UModal>

</template>

<script setup lang="ts">
import type { UnitType } from '~/types/models'
import UnitCard from './UnitCard.vue'
import { ref, reactive, defineProps, defineEmits } from 'vue'


const { create, find, findAll, update, archive } = useAPI()

onMounted(async () => {
    await init()
})

const units = ref<Array<UnitType>>()

const init = async () => {
    let { results } = await findAll<UnitType>("/units", {})
    units.value = results.value
}


const showModal = ref(false)
const unit = ref<UnitType>({})

const edit = (rec: UnitType) => {
    unit.value = JSON.parse(JSON.stringify(rec))
    showModal.value = true
}

const createNew = () => {
    unit.value = {}
    showModal.value = true
}

const save = async () => {
    try {
        if (!unit.value?.id) {
            //save
            await create("/units", unit.value)
        } else {
            //update
            await update("/units", unit.value)
        }
        await init();
    } catch (error) {
        console.log('error :>> ', error);
    }

    showModal.value = false
}


const deleteRecord = async(rec:UnitType)=>{
     await archive("/units", rec)
     await init()
}
</script>