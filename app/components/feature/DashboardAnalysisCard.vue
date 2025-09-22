<script setup lang="ts">
import type { AnalysisCardProps } from '~/types/features'

const props = defineProps<AnalysisCardProps>()
</script>

<template>
    <div v-for="analysis in props.analysis" :key="analysis.id" class="bg-muted p-4">
        <!-- Header -->
        <div class="flex items-center gap-2 mb-4">
            <UIcon :name="analysis.icon || 'i-lucide-bar-chart-2'" class="w-6 h-6"
                :class="`text-${analysis.color || 'primary'}`" />
            <div class="text-highlighted font-semibold">{{ analysis.title || 'Sport Fit Analysis' }}</div>
        </div>

        <!-- Value -->
        <div class="flex items-baseline gap-2">
            <div class="text-2xl font-bold" :class="`text-${analysis.color || 'primary'}`">
                {{ analysis.value ?? '0' }}
            </div>
            <div class="text-sm text-muted">
                {{ analysis.unit }}
            </div>
        </div>
        <div v-if="analysis.label" class="text-sm text-muted">{{ analysis.label }}</div>

        <USeparator color="neutral" :ui="{border: 'dark:border-neutral-700/50'}" class="my-4" />

        <!-- Top Performers -->
        <div class="flex justify-between items-center gap-2">
            <div v-if="analysis.topPerformer" class="text-sm text-muted">Top Performer:</div>
            <UBadge v-if="analysis.topPerformer" :avatar="analysis.performerAvatar ? { src: analysis.performerAvatar } : undefined"
                size="lg" color="neutral" variant="subtle">
                {{ analysis.topPerformer }}
            </UBadge>
        </div>

        <!-- Details -->
        <!-- <div v-if="analysis.details" class="text-sm text-muted italic">
            {{ analysis.details }}
        </div> -->
    </div>
</template>
