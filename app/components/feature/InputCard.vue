<script setup lang="ts">
const props = defineProps<{ input: { id: string; type: string; label: string; description: string } }>()
const emit = defineEmits(['edit', 'delete'])

const iconMap: Record<string, string> = {
    Text: 'i-lucide-type',
    Number: 'i-lucide-ruler',
    Textarea: 'i-lucide-align-left',
    Select: 'i-lucide-list',
    Checkbox: 'i-lucide-square-check',
    Switch: 'i-lucide-toggle-right',
    Radio: 'i-lucide-circle-check',
    'File Upload': 'i-lucide-upload',
    Slider: 'i-lucide-chevrons-left-right-ellipsis'
}

const getIcon = (type: string) => {
    return iconMap[type] || 'i-lucide-text-cursor-input'
}
</script>

<template>
    <UCard :ui="{ body: 'sm:p-4' }" variant="subtle">
        <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-4">
                <div class="p-2 rounded-lg bg-accented">
                    <UIcon :name="getIcon(props.input.type)" class="size-5 flex text-default" />
                </div>
                <div class="space-y-1">
                    <div class="flex items-center gap-2">
                        <div class="text-default font-semibold">{{ props.input.label }}</div>
                        <UBadge v-if="props.input.type" :label="props.input.type" variant="subtle" color="neutral" size="sm" />
                    </div>
                    <p class="text-xs text-muted">{{ props.input.description }}</p>
                </div>
            </div>

            <div class="flex items-center">
                <UDropdownMenu :items="[
                    { label: 'Edit', icon: 'i-lucide-pencil', onSelect: () => emit('edit', props.input) },
                    { label: 'Delete', icon: 'i-lucide-trash', onSelect: () => emit('delete', props.input.id) }
                ]">
                    <UButton variant="ghost" color="neutral" size="xs" icon="i-lucide-more-vertical" />
                </UDropdownMenu>
            </div>
        </div>
    </UCard>
</template>
