<template>
    <ul :class="[
        horizontal ? 'flex flex-row gap-4' : 'flex flex-col gap-2',
        ui.wrapper,
    ]">
        <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1 text-muted text-sm"
            :class="ui.item">
            <UIcon v-if="item.icon" :name="item.icon" class="flex shrink-0" :class="ui.icon" />
            <span :class="ui.text">{{ item.text }}</span>
        </li>
    </ul>
</template>

<script setup lang="ts">
defineProps({
    items: {
        type: Array as PropType<
            {
                icon?: string
                text: string
            }[]
        >,
        required: true,
    },
    horizontal: {
        type: Boolean,
        default: false,
    },
    ui: {
        type: Object as PropType<{
            wrapper?: string
            item?: string
            icon?: string
            text?: string
        }>,
        default: () => ({}),
    },
})
</script>
