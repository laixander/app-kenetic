<script setup lang="ts">
import InputCard from './InputCard.vue'
import { ref, reactive } from 'vue'

// uid helper
function uid() {
  return Math.random().toString(36).substring(2, 9)
}

const showModal = ref(false)
const editingInput = ref<null | Record<string, any>>(null)

const inputs = ref<Array<{ id: string; type: string; label: string; description: string }>>([
  { id: uid(), type: 'Text', label: 'First Name', description: 'Enter your first name' },
  { id: uid(), type: 'Select', label: 'Country', description: 'Choose a country' }
])

// form state
const form = reactive({ id: '', type: '', label: '', description: '' })

// open modal (create new)
function openModalForCreate() {
  editingInput.value = null
  form.id = ''
  form.type = ''
  form.label = ''
  form.description = ''
  showModal.value = true
}

// open modal (edit existing)
function openModalForEdit(input: any) {
  editingInput.value = input
  form.id = input.id
  form.type = input.type
  form.label = input.label
  form.description = input.description
  showModal.value = true
}

function onCancel() {
  showModal.value = false
}

function onSave() {
  if (!form.label.trim()) {
    alert('Please provide a label.')
    return
  }

  if (editingInput.value) {
    // update
    inputs.value = inputs.value.map(i =>
      i.id === form.id ? { ...i, type: form.type, label: form.label, description: form.description } : i
    )
  } else {
    // create
    inputs.value.unshift({
      id: uid(),
      type: form.type || 'Text',
      label: form.label.trim(),
      description: form.description.trim()
    })
  }

  showModal.value = false
}

function deleteInput(id: string) {
  if (!confirm('Delete this input?')) return
  inputs.value = inputs.value.filter(i => i.id !== id)
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold">Input Field Creator</h2>
      <UButton @click="openModalForCreate" size="sm">+ Add Input</UButton>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputCard
        v-for="input in inputs"
        :key="input.id"
        :input="input"
        @edit="openModalForEdit"
        @delete="deleteInput"
      />
    </div>

    <!-- Modal -->
    <UModal
      v-model:open="showModal"
      :title="editingInput ? 'Edit Input' : 'Create Input'"
      :description="editingInput ? 'Update this input field' : 'Define a new input field'"
      size="md"
    >
      <template #body>
        <div class="space-y-4">
          <UFormField label="Input Type">
            <USelect
              v-model="form.type"
              :items="['Text', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch', 'File Upload', 'Slider']"
              placeholder="Select type"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Label">
            <UInput v-model="form.label" placeholder="Enter label" class="w-full" />
          </UFormField>

          <UFormField label="Description">
            <UTextarea v-model="form.description" placeholder="Describe this input" class="w-full" />
          </UFormField>
        </div>
      </template>

      <template #footer="{ close }">
        <div class="flex justify-end gap-2 mt-2">
          <UButton color="neutral" variant="ghost" @click="close">Cancel</UButton>
          <UButton color="primary" @click="onSave">Save</UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
