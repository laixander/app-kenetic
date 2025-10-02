import { ref } from 'vue'

export type Unit = {
  id: string
  name: string
  symbol?: string
  factor: number
}

// simple uid generator
function uid() {
  return Math.random().toString(36).substring(2, 9)
}

// shared state
const units = ref<Unit[]>([
  { id: uid(), name: 'Meter', symbol: 'm', factor: 1 },
  { id: uid(), name: 'Kilometer', symbol: 'km', factor: 1000 },
  { id: uid(), name: 'Centimeter', symbol: 'cm', factor: 0.01 }
])

export function useUnits() {
  function addUnit(unit: Omit<Unit, 'id'>) {
    units.value.unshift({ ...unit, id: uid() })
  }

  function updateUnit(updated: Unit) {
    units.value = units.value.map(u => (u.id === updated.id ? updated : u))
  }

  function deleteUnit(id: string) {
    units.value = units.value.filter(u => u.id !== id)
  }

  return {
    units,
    addUnit,
    updateUnit,
    deleteUnit
  }
}
