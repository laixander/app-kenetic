<template>
    <Page title="Create Dataset"
        description="Create performance norms using historical datasets and statistical models">
        <template #toolbar>
            <UButton label="Back to Norm Creation" icon="i-lucide-arrow-left" variant="ghost" to="../norm-creation" />
        </template>

        <Block title="1. Norm Details" description="Define the basic details of the performance norm">
            <UFormField label="Norm Title" size="lg" class="flex-1">
                <UInput placeholder="Enter norm title" class="w-full" />
            </UFormField>
            <UFormField label="Description" size="lg" class="flex-1">
                <UTextarea placeholder="Describe the purpose and characteristics of these norms" class="w-full" />
            </UFormField>
        </Block>

        <Block title="2. Define Norm Parameters" description="Set parameters for norm calculation">
            <UCard :ui="{ body: 'p-0 sm:p-0' }">
                
  <!-- only add divide-x when filled -->
  <div :class="['flex', isFilled && 'divide-x divide-muted']">
    <div class="flex-1">
      <!-- if this is not yet filled -->
      <div class="grid lg:flex gap-4 p-4">
        <USelect
          v-model="selected.field"
          placeholder="Select field"
          size="lg"
          :items="['Speed', 'Strength', 'Endurance', 'Agility']"
          class="w-full"
        />
        <USelect
          v-model="selected.gender"
          placeholder="Select gender"
          size="lg"
          :items="['All Genders', 'Male', 'Female']"
          class="w-full"
        />
        <USelect
          v-model="selected.age"
          placeholder="Select age group"
          size="lg"
          :items="['All Ages', 'Under 12', '12-15', '16-18', '18+']"
          class="w-full"
        />
      </div>

      <!-- show this if filled -->
      <template v-if="isFilled">
        <div
          class="mx-4 rounded-full h-2 bg-[linear-gradient(to_right,_#dcfce7,_#dbeafe,_#fef9c3,_#ffedd5,_#fee2e2)] 
                 dark:bg-[linear-gradient(to_right,_#14532d,_#1e3a8a,_#854d0e,_#9a3412,_#7f1d1d)]"
        ></div>

        <div class="grid lg:flex gap-4 p-4">
          <UFormField class="flex-1">
            <template #label>
              <span class="text-green-500 dark:text-green-300">Excellent</span>
            </template>
            <UInputNumber v-model="values.excellent" placeholder="Enter a number" color="neutral" class="w-full" />
          </UFormField>

          <UFormField class="flex-1">
            <template #label>
              <span class="text-blue-500 dark:text-blue-300">Good</span>
            </template>
            <UInputNumber v-model="values.good" placeholder="Enter a number" color="neutral" class="w-full" />
          </UFormField>

          <UFormField class="flex-1">
            <template #label>
              <span class="text-yellow-500 dark:text-yellow-300">Average</span>
            </template>
            <UInputNumber v-model="values.average" placeholder="Enter a number" color="neutral" class="w-full" />
          </UFormField>

          <UFormField class="flex-1">
            <template #label>
              <span class="text-orange-500 dark:text-orange-300">Below Average</span>
            </template>
            <UInputNumber v-model="values.belowAverage" placeholder="Enter a number" color="neutral" class="w-full" />
          </UFormField>

          <UFormField class="flex-1">
            <template #label>
              <span class="text-red-500 dark:text-red-300">Poor</span>
            </template>
            <UInputNumber v-model="values.poor" placeholder="Enter a number" color="neutral" class="w-full" />
          </UFormField>
        </div>
      </template>
    </div>

    <!-- side buttons -->
    <div v-if="isFilled" class="flex flex-col justify-between p-4">
      <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="sm" @click="resetForm" />
      <UButton icon="i-lucide-copy" color="secondary" variant="ghost" size="sm" @click="duplicate" />
      <UButton icon="i-lucide-plus" color="success" variant="ghost" size="sm" @click="addNew" />
    </div>
  </div>
  
            </UCard>
        </Block>
    </Page>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

const selected = ref({
  field: '',
  gender: '',
  age: ''
})

const values = ref({
  excellent: null as number | null,
  good: null as number | null,
  average: null as number | null,
  belowAverage: null as number | null,
  poor: null as number | null
})

// Only show filled UI and divider when all three selectors have values
const isFilled = computed(() =>
  Boolean(selected.value.field && selected.value.gender && selected.value.age)
)

const resetForm = () => {
  selected.value = { field: '', gender: '', age: '' }
  values.value = { excellent: null, good: null, average: null, belowAverage: null, poor: null }
}

const duplicate = () => {
  console.log('Duplicate this set')
}

const addNew = () => {
  console.log('Add new set')
}
</script>