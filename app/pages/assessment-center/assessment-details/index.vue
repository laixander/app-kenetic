<template>
    <Page>
        <template #toolbar>
            <UButton label="Back to Assessments" icon="i-lucide-arrow-left" variant="ghost" to="/assessment-center" />
        </template>
        <Block title="Assessment Overview">
            <Grid :lg="4">
                <ListProfile profile-photo="https://randomuser.me/api/portraits/women/44.jpg"
                    profile-name="Sarah Johnson" profile-description="Athlete" />
                <ListIcon v-for="(item, idx) in items" :key="idx" v-bind="item" styledIcon />
            </Grid>
        </Block>
        <Grid :lg="3" :gap="6">
            <ScoreCard v-for="card in cards" :key="card.title" :title="card.title" :main-value="card.mainValue"
                :progress="card.progress" :subtitle="card.subtitle" />
        </Grid>
        <Block title="Detailed Result" noBodyPadding>
            <UTable :data="data" :columns="columns" class="flex-1" />
        </Block>
    </Page>
</template>
<script setup lang="ts">
import ScoreCard from '~/components/feature/ScoreCard.vue';
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

type Result = {
    metric: string
    result: string
    benchmark: string
    percentile: string
    performance: string
}

const items = [
    {
        label: 'Physical Assessment',
        description: 'Assessment Type',
        icon: 'i-lucide-ruler',
    },
    {
        label: '2024-01-15',
        description: 'Date Completed',
        icon: 'i-lucide-calendar',
    },
    {
        label: 'Dr. Mike Wilson',
        description: 'Assessor',
        icon: 'i-lucide-user',
    },
]
const cards = [
    {
        title: 'Overall Score',
        mainValue: '87%',
        progress: 87,
        subtitle: '87/100 points',
    },
    {
        title: 'Percentile Rank',
        mainValue: '92th',
        progress: 92,
        subtitle: 'Better than 92% of athletes',
    },
    {
        title: 'Performance Level',
        mainValue: 'Good',
        progress: 87,
        subtitle: '87/100 points',
    },
]
const data = ref<Result[]>([
    {
        metric: 'VO2 Max',
        result: '58.2 ml/kg/min',
        benchmark: '55 ml/kg/min',
        percentile: '85th',
        performance: 'Above Average'
    },
    {
        metric: 'Bench Press',
        result: '135 lbs',
        benchmark: '120 lbs',
        percentile: '78th',
        performance: 'Above Average'
    },
    {
        metric: '40-Yard Dash',
        result: '4.8 seconds',
        benchmark: '5 seconds',
        percentile: '92th',
        performance: 'Above Average'
    },
    {
        metric: 'Vertical Jump',
        result: '28 inches',
        benchmark: '24 inches',
        percentile: '89th',
        performance: 'Above Average'
    }

])
const columns: TableColumn<Result>[] = [
    {
        accessorKey: 'metric',
        header: 'Metric',
    },
    {
        accessorKey: 'result',
        header: 'Result',
    },
    {
        accessorKey: 'benchmark',
        header: 'Benchmark',
    },
    {
        accessorKey: 'percentile',
        header: 'Percentile',
        cell: ({ row }) => {
            return h(UBadge, { variant: 'subtle', color: 'neutral' }, () =>
                row.getValue('percentile')
            )
        }
    },
    {
        accessorKey: 'performance',
        header: 'Performance',
        cell: ({ row }) => {
            return h(
                'span',
                {
                    class: 'text-success'
                },
                row.getValue('performance')
            )
        }
    },
]
</script>