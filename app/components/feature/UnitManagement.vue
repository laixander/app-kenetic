<script setup lang="ts">
import { ref } from 'vue'
import { useUnits, type Unit } from '~/composables/useUnits'
import UnitCreatorModal from './UnitCreatorModal.vue'
import UnitCard from './UnitCard.vue'

const { units, addUnit, updateUnit, deleteUnit } = useUnits()

const showModal = ref(false)
const editingUnit = ref<Unit | null>(null)

function openModalForCreate() {
  editingUnit.value = null
  showModal.value = true
}

function openModalForEdit(unit: Unit) {
  editingUnit.value = unit
  showModal.value = true
}

function handleSave(unit: Unit) {
  if (unit.id) {
    updateUnit(unit)
  } else {
    addUnit(unit) // id will be auto-generated inside composable
  }
  showModal.value = false
}
</script>

<template>
  <Block icon="i-lucide-ruler" iconColor="violet" title="Unit Measurement"
    description="Manage preset unit measurement">
    <template #actions>
      <UButton
        label="Add Unit"
        icon="i-lucide-plus"
        variant="outline"
        color="neutral"
        size="lg"
        @click="openModalForCreate"
      />
    </template>

    <Grid :lg="3" :gap="4">
        <!-- <pre>{{ units }}</pre> -->
      <UnitCard
        v-for="unit in units"
        :key="unit.id"
        :unit="unit"
        @edit="openModalForEdit"
        @delete="deleteUnit"
      />
    </Grid>
  </Block>

  <!-- Reusable Modal -->
  <UnitCreatorModal
    :open="showModal"
    :unit="editingUnit"
    @close="showModal = false"
    @save="handleSave"
  />
</template>