<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Benchmarking" description="Establish and compare performance norms across athletes and demographics" inverted>
            <Tabs :items="benchmarkingTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <UTabs :items="sections" color="indigo" :ui="{ trigger: 'grow w-full', content: 'space-y-6' }" class="gap-4 w-full">
                <template #demographic="{ item }">
                    <Block title="Demographic Analysis & Segmentation" description="Analyze performance norms across different demographic groups" icon="i-lucide-user-check">
                        <div class="flex gap-2">
                            <USelect placeholder="Select age group" size="lg" class="w-full" :items="[ 'Group A', 'Group B', 'Group C','Group D' ]" />
                            <USelect default-value="All Sports" size="lg" class="w-full" :items="[ 'All Sports', 'Basketball', 'Soccer', 'Tennis', 'Volleyball' ]" />
                            <UButton label="Reset" icon="i-lucide-refresh-cw" size="lg" color="neutral" variant="outline" />
                            <UButton label="Apply Filter" size="lg" color="neutral" />
                        </div>
                    </Block>
                    <Block title="Detailed Segment Analysis" description="Performance distribution within age groups">
                        <div class="space-y-4 pb-4">
                            <UCard v-for="n in 3" :ui="{ body: 'sm:p-4 space-y-4' }">
                                <header class="flex justify-between items-center">
                                    <h4 class="font-semibold text-sm text-default">
                                        12-14 years
                                    </h4>
                                    <List 
                                        :items="[
                                            { icon: 'i-lucide-users', text: '89 athletes' }
                                        ]" 
                                        :ui="{
                                            item: 'text-xs'
                                        }"
                                    />
                                </header>
                                <div class="bg-gradient-to-r from-gray-200 dark:from-gray-700 h-[1px]" />
                                <main class="space-y-1.5">
                                    <Grid :lg="4">
                                        <div class="grid">
                                            <span class="text-xs text-dimmed">Average</span>
                                            <span class="font-semibold text-sm text-default">72.4</span>
                                        </div>
                                        <div class="grid">
                                            <span class="text-xs text-dimmed">Percentile</span>
                                            <span class="font-semibold text-sm text-default">65%</span>
                                        </div>
                                        <div class="grid">
                                            <span class="text-xs text-dimmed">Std Dev</span>
                                            <span class="font-semibold text-sm text-default">±10.4</span>
                                        </div>
                                        <div class="grid">
                                            <span class="text-xs text-dimmed">Range</span>
                                            <span class="font-semibold text-sm text-default">57.4 - 87.4</span>
                                        </div>
                                    </Grid>
                                    <UProgress :model-value="80" />
                                </main>
                            </UCard>
                        </div>
                        <UPagination :total="100" class="flex justify-center" />
                    </Block>
                </template>
                <template #performance="{ item }">
                    <Block title="Performance Metrics Selection" description="Choose which performance metrics to analyze for the selected demographic" icon="i-lucide-activity">
                        <UCheckboxGroup v-model="value" :items="items" :ui="{ fieldset: 'lg:grid grid-rows-2 grid-flow-col' }" />
                    </Block>
                    <Grid :lg="2" :gap="4">
                        <div class="flex flex-col gap-4">
                            <UCard v-for="metric in [
                                { name: 'Vertical Jump', athletes: 89, mean: 45.2, median: 44.8, std: 6.1 },
                                { name: 'Sprint Speed', athletes: 67, mean: 5.8, median: 5.7, std: 0.4 },
                                { name: 'Strength', athletes: 24, mean: 142, median: 140, std: 23 },
                            ]" :ui="{ body: 'sm:p-4 space-y-4' }">
                                <header class="flex justify-between items-center">
                                    <h4 class="font-semibold">{{ metric.name }}</h4>
                                    <List 
                                        :items="[
                                            { icon: 'i-lucide-users', text: metric.athletes + ' athletes' }
                                        ]"
                                        :ui="{
                                            text: 'text-xs'
                                        }"
                                    />
                                </header>
                                <UCard variant="soft" :ui="{ body: '!px-0 sm:p-4' }">
                                    <Grid :cols="3" :gap="0" class="divide-x divide-muted *:flex *:flex-col *:items-center">
                                        <div>
                                            <span class="text-dimmed text-xs">Mean</span>
                                            <span class="font-semibold text-default">{{ metric.mean }}</span>
                                        </div>
                                        <div>
                                            <span class="text-dimmed text-xs">Median</span>
                                            <span class="font-semibold text-default">{{ metric.median }}</span>
                                        </div>
                                        <div>
                                            <span class="text-dimmed text-xs">Std. Dev</span>
                                            <span class="font-semibold text-default">±{{ metric.std }}</span>
                                        </div>
                                    </Grid>
                                </UCard>
                            </UCard>
                        </div>
                        <Block title="Percentile Distribution">
                            <FeaturePercentileChart />
                        </Block>
                    </Grid>
                </template>
                <template #comparison="{ item }">
                    <Block title="Group Comparison Setup" description="Configure which demographic groups to compare across sports" icon="i-lucide-columns-2">
                        <USelect placeholder="Select sport" :items="['Sport A', 'Sport B', 'Sport C', 'Sport D']" size="lg" class="w-full" />

                        <Grid :lg="2" :gap="4" class="mt-4">
                            <UCard v-for="group in [
                                { name: 'Group A' },
                                { name: 'Group B' }
                            ]" :ui="{ body: 'sm:p-4 space-y-6' }">
                                <h4 class="font-semibold text-sm border-l-4 border-primary pl-2">{{ group.name }}</h4>
                                <main class="space-y-4">
                                    <UFormField label="Demographic Type" size="lg">
                                        <USelect placeholder="Select type" :items="['Skill Level', 'Type B', 'Type C']" class="w-full" />
                                    </UFormField>
                                    <UFormField label="Value" size="lg">
                                        <USelect placeholder="Select value" :items="['Amateur', 'Intermediate', 'Professional']" class="w-full" />
                                    </UFormField>
                                </main>
                            </UCard>
                        </Grid>
                    </Block>

                    <Block title="Comparison Results" description="Statistical comparison between selected demographic groups">
                        <UCard :ui="{ body: 'sm:p-4 space-y-4' }">
                            <header class="flex justify-between items-center">
                                <h4 class="font-semibold">Intermediate vs Amateur Basketball</h4>
                                <UBadge label="basketball" variant="subtle" color="neutral" />
                            </header>
                            <UCard variant="soft" :ui="{ body: '!px-0 sm:p-4' }">
                                <Grid :cols="3" :gap="0" class="divide-x divide-muted *:flex *:flex-col *:items-center *:space-y-1">
                                    <div>
                                        <span class="text-dimmed text-xs">Intermediate</span>
                                        <span class="font-semibold text-default">80</span>
                                        <span class="text-dimmed text-xs">n = 145</span>
                                    </div>
                                    <div>
                                        <span class="text-dimmed text-xs">Difference</span>
                                        <span class="font-semibold text-default">+8</span>
                                        <span class="text-dimmed text-xs">p = 0.001</span>
                                    </div>
                                    <div>
                                        <span class="text-dimmed text-xs">Amateur</span>
                                        <span class="font-semibold text-default">72</span>
                                        <span class="text-dimmed text-xs">n = 101</span>
                                    </div>
                                </Grid>
                            </UCard>
                            <footer class="flex justify-between items-center">
                                <UBadge label="Statistically Significant" />
                                <div class="space-x-2">
                                    <UButton label="View Details" icon="i-lucide-eye" variant="outline" color="neutral" size="lg" />
                                    <UButton label="Export" icon="i-lucide-download" variant="outline" color="neutral" size="lg" />
                                </div>
                            </footer>
                        </UCard>
                    </Block>
                </template>
            </UTabs>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, benchmarkingTabs, athletes } from '~/data';
import type { TabsItem } from '@nuxt/ui'

const sections = [
  {
    label: 'Demographic Segments',
    icon: 'i-lucide-user-check',
    slot: 'demographic' as const
  },
  {
    label: 'Performance Metrics',
    icon: 'i-lucide-activity',
    slot: 'performance' as const
  },
  {
    label: 'Group Comparison',
    icon: 'i-lucide-columns-2',
    slot: 'comparison' as const
  },
] satisfies TabsItem[]


import type { CheckboxGroupItem, CheckboxGroupValue } from '@nuxt/ui'
import { UFormField } from '#components';

const items = ref<CheckboxGroupItem[]>(['Vertical Jump (cm)', 'Strength (kg)', 'Sprint Speed (s)', 'Flexibility (cm)', 'Agility (s)', 'Balance (s)', 'Endurance (min)', 'Coordination (score)'])
const value = ref<CheckboxGroupValue[]>(['Vertical Jump (cm)', 'Strength (kg)', 'Sprint Speed (s)'])
</script>