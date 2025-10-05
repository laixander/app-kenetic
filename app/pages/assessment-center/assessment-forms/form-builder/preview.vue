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
    <Page title="Form Builder" description="Create and manage forms with customizable fields and layouts">
        <template #toolbar>
            <UButton label="Back to Forms" icon="i-lucide-arrow-left" variant="ghost" to="../assessment-forms" />
        </template>
        <template #actions>
            <Tabs :items="formBuilderTabs" />
        </template>
        <Block title="Form Preview" description="Preview your data collection form before publishing">
            <UCard>
                <FormRenderer :form="newForm" />
            </UCard>
        </Block>
    </Page>
</template>