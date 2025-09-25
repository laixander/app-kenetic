<script setup lang="ts">
import { UButton } from '#components'
import { ref } from 'vue'
import { formBuilderTabs } from '~/data'

import { computed } from 'vue'

// Show message if there are no rows with fields
const hasFields = computed(() =>
  fieldRows.value.some(row => row.fields.length > 0)
)

type Field = {
    id: number
    label: string
    type: string
    editing: boolean
    required: boolean
}

type FieldRow = {
    id: number
    fields: Field[]
}

const fieldRows = ref<FieldRow[]>([])
let nextRowId = 1
let nextFieldId = 0

function addFieldRow() {
    fieldRows.value.push({
        id: nextRowId++,
        fields: [createField()]
    })
}

function createField(): Field {
    return {
        id: nextFieldId++,
        label: `Field ${nextFieldId}`,
        type: 'Text',
        editing: false,
        required: false
    }
}

function addFieldToRow(row: FieldRow) {
    if (row.fields.length < 4) {
        row.fields.push(createField())
    }
}

function deleteFieldFromRow(row: FieldRow, fieldId: number) {
    row.fields = row.fields.filter(f => f.id !== fieldId)
}

function startEdit(field: Field) {
    field.editing = true
}

function finishEdit(field: Field) {
    field.editing = false
}

const fieldTypes = ['Text', 'Number', 'Date']
</script>

<template>
    <Page title="Form Builder" description="Create and customize data collection forms for sports assessments">
        <template #toolbar>
            <UButton label="Back to Forms" icon="i-lucide-arrow-left" variant="ghost" to="/data-collection" />
        </template>
        <template #actions>
            <Tabs :items="formBuilderTabs" />
        </template>
        <Block title="Form Builder" description="Design and customize your data collection forms here">
            <div class="space-y-4">
                <div v-if="!hasFields" class="text-dimmed text-sm mb-2 text-center">
                    No fields yet. Click "Add New Field Row" to start.
                </div>
                <template v-for="row in fieldRows" :key="row.id">
                    <div v-if="row.fields.length > 0">
                        <div class="flex gap-4 items-center">
                            <UCard v-for="field in row.fields" :key="field.id" class="flex-1" :ui="{body: 'sm:p-4'}">
                                <div class="flex flex-col items-start gap-2 w-full">
                                    <!-- Required Switch Top Right -->
                                    <div class="flex justify-between w-full gap-2">
                                        <div class="flex items-center flex-1">
                                            <template v-if="field.editing">
                                                <UInput v-model="field.label" variant="none" class="w-40"
                                                    @blur="finishEdit(field)" @keyup.enter="finishEdit(field)" autofocus />
                                            </template>
                                            <template v-else>
                                                <span class="text-sm font-medium text-default">{{ field.label }}</span>
                                                <UButton icon="i-lucide-pen" variant="link" color="neutral" size="sm" @click="startEdit(field)" aria-label="Edit label" />
                                            </template>
                                        </div>
                                        <div class="flex items-center gap-4">
                                            <div class="flex items-center gap-1">
                                                <USwitch v-model="field.required" size="sm" color="neutral" />
                                                <span class="text-xs text-default">Required</span>
                                            </div>
                                            <!-- <div class="flex items-center gap-1">
                                                <USwitch size="sm" color="neutral" />
                                                <span class="text-xs text-gray-600 text-nowrap">Device Integration</span>
                                            </div> -->
                                            <!-- delete button -->
                                            <UButton
                                                icon="i-lucide-trash"
                                                variant="ghost"
                                                color="error"
                                                aria-label="Delete Field"
                                                @click="deleteFieldFromRow(row, field.id)"
                                            />
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 w-full">
                                        <UInput v-model="field.label" :placeholder="`Label for ${field.label}`" class="w-full" variant="subtle" disabled />
                                        <USelect v-model="field.type" :items="fieldTypes" class="w-32" />
                                    </div>
                                </div>
                            </UCard>
                            <!-- Plus button for adding input to this row -->
                            <div v-if="row.fields.length > 0" class="flex flex-col justify-start items-center">
                                <UButton
                                    icon="i-lucide-plus"
                                    size="sm"
                                    color="neutral"
                                    :disabled="row.fields.length >= 4"
                                    @click="addFieldToRow(row)"
                                    aria-label="Add input"
                                    class="rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </template>
                <div class="text-center">
                    <UButton label="Add New Field Row" icon="i-lucide-plus" color="neutral" @click="addFieldRow" />
                </div>
            </div>
        </Block>
    </Page>
</template>