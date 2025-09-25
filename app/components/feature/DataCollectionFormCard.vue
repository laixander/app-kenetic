<script setup lang="ts">
import type { FormCardProps } from '~/types/features'

const props = defineProps<FormCardProps>()

const colorMap: Record<string, any> = {
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/30',
        border: 'border border-blue-200 dark:border-blue-800',
        iconBg: 'bg-blue-100 dark:bg-blue-800',
        icon: 'text-blue-600 dark:text-blue-400'
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-900/30',
        border: 'border border-green-200 dark:border-green-800',
        iconBg: 'bg-green-100 dark:bg-green-900',
        icon: 'text-green-600 dark:text-green-400'
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/30',
        border: 'border border-purple-200 dark:border-purple-800',
        iconBg: 'bg-purple-100 dark:bg-purple-900',
        icon: 'text-purple-600 dark:text-purple-400'
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/30',
        border: 'border border-orange-200 dark:border-orange-800',
        iconBg: 'bg-orange-100 dark:bg-orange-900',
        icon: 'text-orange-600 dark:text-orange-400'
    },
    pink: {
        bg: 'bg-pink-50 dark:bg-pink-900/30',
        border: 'border border-pink-200 dark:border-pink-800',
        iconBg: 'bg-pink-100 dark:bg-pink-900',
        icon: 'text-pink-600 dark:text-pink-400'
    },
    gray: {
        bg: 'bg-gray-50 dark:bg-gray-800/30',
        border: 'border border-gray-200 dark:border-gray-800',
        iconBg: 'bg-gray-200/50 dark:bg-gray-800',
        icon: 'text-gray-600 dark:text-gray-400'
    }
}
</script>

<template>
    <div class="w-full p-5 rounded-lg inline-flex justify-between items-start gap-4"
        :class="[colorMap[color].bg, colorMap[color].border]">
        <!-- Left section -->
        <div class="flex items-start gap-4">
            <div class="p-2 rounded-lg" :class="colorMap[color].iconBg">
                <UIcon :name="icon" :class="['size-5 flex', colorMap[color].icon]" />
            </div>

            <div class="flex-1 space-y-2">
                <div class="text-default font-semibold">
                    {{ title }}
                </div>

                <div class="text-sm text-muted">
                    {{ description }}
                </div>

                <!-- <div v-if="$slots.tags">
                    <slot name="tags" /> 
                </div> -->
                <div v-if="tag">
                    <UBadge variant="subtle" color="neutral" :label="tag" />
                </div>

                <div v-if="timestamp" class="flex justify-start items-center gap-2">
                    <UIcon name="i-lucide-clock" class="size-4 text-dimmed flex" />
                    <div class="text-sm text-muted">
                        {{ timestamp }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Right section: dropdown actions -->
        <div v-if="actions?.length">
            <UDropdownMenu :items="actions" 
            :content="{
                align: 'start',
                side: 'bottom',
                sideOffset: 8   
            }">
                <UButton variant="ghost" color="gray" size="xs" icon="i-lucide-more-vertical" />
            </UDropdownMenu>
        </div>
    </div>
</template>
