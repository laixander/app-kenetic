<script setup lang="ts">
import { formBuilderTabs, newForm } from '~/data'
const value = ref(0)

const mockField = ref({
  selectedType: 'Text',
  inputLabel: 'Full Name',
  inputPlaceholder: 'Enter athlete name',
  inputValue: '',
  isRequired: true,
  textInputType: 'number' as const, // <-- 👈 fixes type error
  selectedUnit: 'cm'
})
</script>
<template>
    <Page title="Form Preview" description="Preview your data collection form before publishing">
        <template #toolbar>
            <UButton label="Back to Forms" icon="i-lucide-arrow-left" variant="ghost" to="/data-collection" />
        </template>
        <template #actions>
            <Tabs :items="formBuilderTabs" />
        </template>
        <UCard>
            <FormRenderer :form="newForm" />
        </UCard>
    </Page>
</template>