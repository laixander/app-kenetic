<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Benchmarking" description="Establish and compare performance norms across athletes and demographics" inverted>
            <Tabs :items="benchmarkingTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <UTabs :items="items" color="indigo" :ui="{ trigger: 'grow w-full', content: 'space-y-6' }" class="gap-4 w-full">
                <template #demographic="{ item }">
                    <Block title="Demographic Analysis & Segmentation" description="Analyze performance norms across different demographic groups">
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
                                    <span class="font-semibold text-sm text-default">
                                        12-14 years
                                    </span>
                                    <List 
                                        :items="[
                                            { icon: 'i-lucide-users', text: '89 athletes' }
                                        ]" 
                                        :ui="{
                                            item: 'text-xs'
                                        }"
                                    />
                                </header>
                                <div class="bg-gradient-to-r from-gray-200 h-[1px]" />
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
                    <Block title="Performance Metrics Selection" description="Choose which performance metrics to analyze for the selected demographic">
                        <ComingSoon />
                    </Block>
                </template>
                <template #comparison="{ item }">
                    <Block title="Group Comparison Setup" description="Configure which demographic groups to compare across sports">
                        <ComingSoon />
                    </Block>
                </template>
            </UTabs>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, benchmarkingTabs } from '~/data';
import type { TabsItem } from '@nuxt/ui'

const items = [
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
</script>