<template>
    <div v-if="$slots.toolbar" :class="[
        'relative shrink-0 flex items-center justify-between border-b border-default py-2.5 px-4 sm:px-6 gap-2 overflow-x-auto',
        toolbarClass
    ]">
        <slot name="toolbar" />
    </div>
    <div class="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 overflow-y-auto">
        <div v-if="title || description || $slots.actions || $slots.description"
            class="relative flex flex-col gap-5 lg:flex-row lg:items-center">
            <div :class="['flex-1 space-y-1', alignCenter ? 'text-center' : undefined]">
                <slot name="title">
                    <div :class="['text-2xl text-pretty font-bold', inverted ? 'text-white' : 'text-highlighted']">
                        {{ title }}
                    </div>
                </slot>
                <slot name="description">
                    <div :class="['text-sm text-pretty', inverted ? 'text-white' : 'text-muted']">
                        {{ description }}
                    </div>
                </slot>
            </div>
            <div class="grid gap-1 md:gap-2 md:flex">
                <slot name="actions" />
            </div>
        </div>
        <div :class="['relative flex flex-col gap-4 sm:gap-6', alignCenter ? 'items-center' : undefined]">
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
import type { PageProps } from '~/types/models'
defineProps<PageProps>()
</script>