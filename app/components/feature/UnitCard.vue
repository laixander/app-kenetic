<!-- UnitCard Component -->
<script setup lang="ts">
import type { Unit } from '~/composables/useUnits'

const props = defineProps<{ unit: Unit }>()
const emit = defineEmits<{
  (e: 'edit', unit: Unit): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
    <UCard :ui="{body: 'sm:p-4'}" variant="subtle">
        <div class="flex items-center justify-between gap-3">
            <div class="space-y-1">
                <div class="flex items-center gap-2">
                    <div class="text-default font-semibold">{{ props.unit.name }}</div>
                    <UBadge v-if="props.unit.symbol" :label="props.unit.symbol" variant="subtle" color="neutral" size="sm" />
                </div>
                <p class="text-xs text-muted">Factor to base: <strong>{{ props.unit.factor }}</strong></p>
            </div>

            <div class="flex items-center">
                <UDropdownMenu :items="[
                    { label: 'Edit', icon: 'i-lucide-pencil', onSelect: () => emit('edit', props.unit) },
                    { label: 'Delete', icon: 'i-lucide-trash', onSelect: () => emit('delete', props.unit) }
                ]">
                    <UButton variant="ghost" color="neutral" size="xs" icon="i-lucide-more-vertical" />
                </UDropdownMenu>
            </div>
        </div>
    </UCard>
</template>