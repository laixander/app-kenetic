<!-- UnitCard Component -->
<script setup lang="ts">
import { UBadge } from '#components';

const props = defineProps<{ unit: { id: string; name: string; symbol?: string; factor: number } }>()
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
    <UCard :ui="{body: 'sm:p-4'}" variant="subtle">
        <div class="flex items-center justify-between gap-3">
            <div class="space-y-2">
                <div class="flex items-center gap-3">
                    <div class="text-default font-semibold">{{ props.unit.name }}</div>
                    <UBadge v-if="props.unit.symbol" :label="props.unit.symbol" variant="subtle" color="neutral" />
                </div>
                <p class="text-xs text-muted">Factor to base: <strong>{{ props.unit.factor }}</strong></p>
            </div>

            <div class="flex items-center">
                <UDropdownMenu :items="[
                    { label: 'Edit', icon: 'i-lucide-pencil', onSelect: () => emit('edit', props.unit) },
                    { label: 'Delete', icon: 'i-lucide-trash', onSelect: () => emit('delete', props.unit.id) }
                ]">
                    <UButton variant="ghost" color="neutral" size="xs" icon="i-lucide-more-vertical" />
                </UDropdownMenu>
            </div>
        </div>
    </UCard>
</template>