<script setup lang="ts">
const props = defineProps<{ input: { id: string; type: string; label: string; description: string } }>()
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <UCard class="p-4 flex flex-col justify-between">
    <div class="flex items-start justify-between gap-3">
      <div>
        <div class="flex items-baseline gap-2">
          <h3 class="text-lg font-medium">{{ props.input.label }}</h3>
          <span class="text-xs text-muted">({{ props.input.type }})</span>
        </div>
        <p class="text-xs text-muted mt-1">{{ props.input.description }}</p>
      </div>

      <div class="flex items-center">
        <UDropdownMenu
          :items="[
            { label: 'Edit', icon: 'i-lucide-pencil', onSelect: () => emit('edit', props.input) },
            { label: 'Delete', icon: 'i-lucide-trash', onSelect: () => emit('delete', props.input.id) }
          ]"
        >
          <UButton icon="i-lucide-ellipsis" color="neutral" variant="ghost" size="sm" />
        </UDropdownMenu>
      </div>
    </div>
  </UCard>
</template>
