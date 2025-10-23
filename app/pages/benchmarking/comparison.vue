<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Benchmarking" description="Establish and compare performance norms across athletes and demographics" inverted>
            <Tabs :items="benchmarkingTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <UTabs :items="items" color="indigo" :ui="{ trigger: 'grow w-full', content: 'space-y-6' }" class="gap-4 w-full">
                <template #individual="{ item }">
                    <Block title="Comparative Analysis Dashboard" description="Compare group performance against established norms and benchmarks" icon="i-lucide-bar-chart-3">
                        <div class="flex gap-2">
                            <USelect placeholder="Select Group" size="lg" class="w-full" :items="[ 'Basketball Elite Team', 'Soccer Youth Program', 'Tennis Academy','Volleyball Varsity' ]" />
                            <USelect placeholder="Benchmark Standard" size="lg" class="w-full" :items="[ 'Elite Norms 2025', 'Youth Standard', 'Collegiate Level','Professional Benchmark' ]" />
                            <UButton label="Reset" icon="i-lucide-refresh-cw" size="lg" color="neutral" variant="outline" />
                            <UButton label="Apply Filter" size="lg" color="neutral" />
                        </div>
                    </Block>
                    <Block title="Individual vs. Norm Performance" description="How each athlete compares to the selected benchmark">
                        <div class="space-y-4">
                            <UCard :ui="{ body: 'space-y-4' }"
                                v-for="athlete in [
                                    {
                                        name: 'Sarah Johnson',
                                        percentile: '81th',
                                        trend: 'up',
                                        stats: [
                                            { label: 'Vertical Jump', value: 48.2, unit: 'cm', percentile: '85%', trend: 'up' },
                                            { label: 'Sprint Speed', value: 5.2, unit: 'sec', percentile: '85%', trend: 'up' },
                                            { label: 'Agility', value: 10.8, unit: 'sec', percentile: '75%', trend: 'down' }
                                        ]
                                    },
                                    {
                                        name: 'John Smith',
                                        percentile: '70th',
                                        trend: 'down',
                                        stats: [
                                            { label: 'Vertical Jump', value: 44.1, unit: 'cm', percentile: '70%', trend: 'down' },
                                            { label: 'Sprint Speed', value: 5.5, unit: 'sec', percentile: '65%', trend: 'down' },
                                            { label: 'Agility', value: 11.2, unit: 'sec', percentile: '60%', trend: 'down' }
                                        ]
                                    },
                                    {
                                        name: 'Emily Davis',
                                        percentile: '90th',
                                        trend: 'up',
                                        stats: [
                                            { label: 'Vertical Jump', value: 52.4, unit: 'cm', percentile: '92%', trend: 'up' },
                                            { label: 'Sprint Speed', value: 4.9, unit: 'sec', percentile: '90%', trend: 'up' },
                                            { label: 'Agility', value: 10.2, unit: 'sec', percentile: '88%', trend: 'up' }
                                        ]
                                    },
                                    {
                                        name: 'Liam Brown',
                                        percentile: '65th',
                                        trend: 'down',
                                        stats: [
                                            { label: 'Vertical Jump', value: 41.8, unit: 'cm', percentile: '60%', trend: 'down' },
                                            { label: 'Sprint Speed', value: 5.7, unit: 'sec', percentile: '62%', trend: 'up' },
                                            { label: 'Agility', value: 11.5, unit: 'sec', percentile: '59%', trend: 'down' }
                                        ]
                                    },
                                    {
                                        name: 'Ava Martinez',
                                        percentile: '88th',
                                        trend: 'up',
                                        stats: [
                                            { label: 'Vertical Jump', value: 50.6, unit: 'cm', percentile: '88%', trend: 'up' },
                                            { label: 'Sprint Speed', value: 5.0, unit: 'sec', percentile: '86%', trend: 'up' },
                                            { label: 'Agility', value: 10.5, unit: 'sec', percentile: '84%', trend: 'up' }
                                        ]
                                    }
                                ]"
                                :key="athlete.name"
                            >
                                <div class="flex justify-between items-center">
                                    <span class="font-semibold text-sm">{{ athlete.name }}</span>
                                    <div class="flex items-center gap-2">
                                        <UBadge size="sm">{{ athlete.percentile }} percentile</UBadge>
                                        <UIcon
                                            :name="athlete.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                                            :class="athlete.trend === 'up' ? 'text-success' : 'text-error'"
                                            class="shrink-0"
                                        />
                                    </div>
                                </div>
                                <UCard :ui="{ body: 'flex items-center divide-x divide-default' }" variant="subtle">
                                    <div v-for="(stat, index) in athlete.stats" :key="index" class="w-full flex flex-col items-center gap-1.5">
                                        <span class="text-sm text-muted">{{ stat.label }}</span>
                                        <div class="inline-flex items-center gap-1">
                                            <span class="font-semibold text-lg text-highlighted">{{ stat.value }}</span>
                                            <UBadge size="xs" color="neutral" variant="subtle">{{ stat.unit }}</UBadge>
                                        </div>
                                        <div class="inline-flex items-center gap-2">
                                            <span class="text-sm"
                                                :class="stat.trend === 'up' ? 'text-success' : 'text-error'"
                                            >{{ stat.percentile }}</span>
                                            <UIcon
                                                :name="stat.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                                                :class="stat.trend === 'up' ? 'text-success' : 'text-error'"
                                                class="shrink-0"
                                            />
                                        </div>
                                    </div>
                                </UCard>
                            </UCard>
                        </div>
                    </Block>
                </template>
                <template #team="{ item }">
                    <Block title="Comparative Analysis Dashboard" description="Compare group performance against established norms and benchmarks" icon="i-lucide-bar-chart-3">
                        <div class="flex gap-2">
                            <USelect placeholder="Benchmark Standard" size="lg" class="w-full" :items="[ 'Elite Norms 2025', 'Youth Standard', 'Collegiate Level','Professional Benchmark' ]" />
                            <UButton label="Reset" icon="i-lucide-refresh-cw" size="lg" color="neutral" variant="outline" />
                            <UButton label="Apply Filter" size="lg" color="neutral" />
                        </div>
                    </Block>
                    <Grid :lg="3" :gap="4">
                        <UCard v-for="team in [
                            { title: 'Elite Basketball Academy', member: 24, rank: 'top', average: 87.2, percentile: 95, value: '+5.2', trend: 'up' },
                            { title: 'Metro Speed Club', member: 18, rank: 'mid', average: 78.5, percentile: 72, value: '+1.8', trend: 'up' },
                            { title: 'Northside Runners', member: 31, rank: 'mid', average: 74.3, percentile: 68, value: '-2.1', trend: 'down' },
                            { title: 'Precision Strength Team', member: 22, rank: 'top', average: 82.6, percentile: 80, value: '+3.9', trend: 'up' },
                            { title: 'NextGen Athletics', member: 27, rank: 'low', average: 69.8, percentile: 55, value: '-1.4', trend: 'down' }
                        ]">
                            <div class="flex items-start">
                                <div class="flex flex-col gap-0.5 flex-1">
                                    <span class="font-semibold text-base text-default">{{ team.title }}</span>
                                    <span class="text-sm text-muted">{{ team.member }} athletes</span>
                                </div>
                                <UIcon name="i-lucide-medal" class="size-7 shrink-0"
                                    :class="{
                                        'text-success': team.rank === 'top',
                                        'text-warning': team.rank === 'mid',
                                        'text-error': team.rank === 'low'
                                    }"
                                />
                            </div>
                            <div class="flex flex-col items-center my-4">
                                <span class="font-bold text-3xl">{{ team.average }}</span>
                                <span class="text-xs text-muted">Average Score</span>
                            </div>
                            <UFormField label="Percentile Rank">
                                <div class="flex items-center gap-2">
                                    <UProgress :modelValue="team.percentile" 
                                        :color="team.rank === 'top' ? 'success' : team.rank === 'mid' ? 'warning' : 'error'"
                                    />
                                    <span>{{ team.percentile }}%</span>
                                </div>
                            </UFormField>
                            <div class="flex justify-between mt-2">
                                <span class="text-muted text-sm">30-day change</span>
                                <div class="flex items-center gap-0.5">
                                    <span class="text-sm" :class="team.trend === 'up' ? 'text-success' : 'text-error'">{{ team.value }}%</span>
                                    <UIcon
                                        :name="team.trend === 'up' ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                                        :class="team.trend === 'up' ? 'text-success' : 'text-error'"
                                        class="shrink-0"
                                    />
                                </div>
                            </div>
                        </UCard>
                    </Grid>
                </template>
            </UTabs>

            <!-- <Block title="Hello" description="Hello Again">
            </Block> -->
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, benchmarkingTabs } from '~/data';
import type { TabsItem } from '@nuxt/ui'
import { UFormField, UIcon, UProgress, USelect } from '#components';

const items = [
  {
    label: 'Individual',
    icon: 'i-lucide-user',
    slot: 'individual' as const
  },
  {
    label: 'Team',
    icon: 'i-lucide-lock',
    slot: 'team' as const
  }
] satisfies TabsItem[]

</script>