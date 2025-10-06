<script setup lang="ts">
import type { TabsProps } from '~/types/ui'
import { useRoute } from 'vue-router'

const props = defineProps<TabsProps>()
const route = useRoute()

const isActive = (to: string) => route.path === to

const colorMap = {
    primary: {
        active: 'bg-primary/10 text-primary',
        inactive: 'text-muted/70',
        hover: 'hover:text-primary hover:bg-primary/5'
    },
    secondary: {
        active: 'bg-secondary/10 text-secondary',
        inactive: 'text-muted/70',
        hover: 'hover:text-secondary hover:bg-secondary/5'
    },
    success: {
        active: 'bg-success/10 text-success',
        inactive: 'text-muted/70',
        hover: 'hover:text-success hover:bg-success/5'
    },
    danger: {
        active: 'bg-danger/10 text-danger',
        inactive: 'text-muted/70',
        hover: 'hover:text-danger hover:bg-danger/5'
    },
    white: {
        active: 'bg-white/10 text-white',
        inactive: 'text-white/70',
        hover: 'hover:text-white hover:bg-white/5'
    }
} as const

type ColorKey = keyof typeof colorMap

const resolvedColor = computed(() => {
    const color = props.color as ColorKey | undefined
    return colorMap[color ?? 'primary']
})
</script>

<template>
    <nav class="grid lg:flex gap-2 w-full" aria-label="Tabs">
        <NuxtLink v-for="item in props.items" :key="item.label" :to="item.to" :class="[
            'px-3 py-2 font-medium text-sm rounded-md flex items-center transition-colors',
            isActive(item.to)
                ? resolvedColor.active
                : `${resolvedColor.inactive} ${resolvedColor.hover}`
        ]">
            <UIcon v-if="item.icon" :name="item.icon" class="size-5 mr-2" />
            {{ item.label }}
        </NuxtLink>
    </nav>
</template>
