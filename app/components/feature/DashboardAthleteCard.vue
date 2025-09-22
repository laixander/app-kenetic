<script setup lang="ts">
import type { AthleteTableProps } from '~/types/features'

const props = defineProps<AthleteTableProps>()
</script>

<template>
    <UCard v-for="athlete in props.athletes" :key="athlete.id" :ui="{ body: 'flex items-center justify-between gap-4 sm:p-4' }">
        <span class="text-sm text-muted font-medium text-nowrap"># {{ athlete.id }}</span>
        <div class="flex items-center gap-3 w-full">
            <UAvatar :name="athlete.name" :size="32" :src="athlete.avatar" />
            <div>
                <div class="text-sm text-highlighted font-semibold">{{ athlete.name }}</div>
                <div class="text-sm text-muted">{{ athlete.sport }}</div>
            </div>
        </div>
        <div class="flex items-center gap-1 w-full">
            <div class="flex flex-col">
                <span class="text-sm text-muted font-medium">{{ athlete.fitnessScore }}</span>
                <span class="text-sm text-muted">{{ athlete.vo2 }} VO<sub>2</sub></span>
            </div>
            <UIcon v-if="athlete.trend === 'up'" name="i-lucide-trending-up" class="size-4 text-success ms-1" />
            <UIcon v-else-if="athlete.trend === 'down'" name="i-lucide-trending-down" class="size-4 text-error ms-1" />
            <UIcon v-else name="i-lucide-activity" class="size-4 text-warning ms-1" />
        </div>
        <UBadge :label="athlete.status" :color="athlete.statusColor" variant="soft" />
        <!-- <div>
            <div class="text-sm text-muted text-nowrap">Assessment</div>
            <div class="text-sm text-muted text-nowrap">{{ athlete.lastAssessment }}</div>
        </div> -->
    </UCard>
</template>
