<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Benchmarking" description="Establish and compare performance norms across athletes and demographics" inverted>
            <Tabs :items="benchmarkingTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Demographic Analysis & Segmentation" description="Analyze performance norms across different demographic groups" icon="i-lucide-settings-2" noBodyPadding>
                <template #actions>
                    <UButton label="Export All" icon="i-lucide-download" size="lg" color="neutral" variant="outline" />
                    <UButton label="Batch Update" icon="i-lucide-refresh-cw" size="lg" color="neutral" variant="outline" />
                    <UButton label="Import Benchmark" icon="i-lucide-upload" size="lg" color="neutral" />
                </template>
            </Block>

            <UTabs :items="sections" color="indigo" :ui="{ trigger: 'grow w-full', content: 'space-y-6' }" class="gap-4 w-full">
                <template #overview>
                    <UCard v-for="n in 2" :ui="{ body: 'sm:p-4 space-y-6' }">
                        <header>
                            <div class="flex justify-between items-start">
                                <div class="space-y-2">
                                    <div class="flex items-center gap-2">
                                        <h4 class="font-semibold">Elite Basketball 2024</h4>
                                        <UBadge label="active" color="success" size="sm" />
                                    </div>
                                    <div class="text-xs text-muted border-l-2 border-orange pl-2">Basketball</div>
                                    <div>
                                        <UBadge v-for="benchmark in [
                                            { label: 'Vertical Jump' },
                                            { label: 'Sprint Speed' },
                                            { label: 'Agility' },
                                            { label: 'Strength' }
                                        ]" variant="subtle" color="neutral" size="sm" class="ml-1 first:ml-0">{{ benchmark.label }}</UBadge>
                                    </div>
                                </div>
                                <UDropdownMenu :items="actions" size="sm" :content="{ align: 'end', sideOffset: 4 }">
                                    <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis" size="sm" />
                                </UDropdownMenu>
                            </div>
                        </header>
                        <UCard variant="soft" :ui="{ body: '!px-0 sm:p-4' }">
                            <Grid :cols="4" :gap="0" class="divide-x divide-muted *:flex *:flex-col *:items-center *:space-y-1">
                                <div>
                                    <span class="text-dimmed text-xs">Accuracy</span>
                                    <span class="font-semibold text-default">94.2%</span>
                                </div>
                                <div>
                                    <span class="text-dimmed text-xs">Athletes</span>
                                    <span class="font-semibold text-default">245</span>
                                </div>
                                <div>
                                    <span class="text-dimmed text-xs">Metrics</span>
                                    <span class="font-semibold text-default">4</span>
                                </div>
                                <div>
                                    <span class="text-dimmed text-xs">Updates</span>
                                    <span class="font-semibold text-default">Monthly</span>
                                </div>
                            </Grid>
                        </UCard>
                        <footer class="flex justify-between items-center">
                            <List :items="[
                                { icon: 'i-lucide-refresh-cw', text: '2024-01-15 12:15' }
                            ]" :ui="{ item: 'text-xs' }" />
                            <div class="text-xs text-muted">
                                v1.0
                            </div>
                        </footer>
                    </UCard>
                </template>
                <template #edit>
                    <UCard :ui="{ body: 'sm:p-4 space-y-2' }">
                        <h4 class="font-semibold">Select Benchmark to Edit</h4>
                        <USelect placeholder="Select benchmark" :items="[ 'Benchmark 1', 'Benchmark 2', 'Benchmark 3' ]" size="lg" class="w-full" />
                    </UCard>
                    <div class="flex justify-end">
                        <USwitch v-model="isEditable" label="Enable Edit" />
                    </div>
                    <UCard :ui="{ body: 'sm:p-4 space-y-4' }">
                        <h4 class="font-semibold">Basic Information</h4>
                        <Grid :lg="2" :gap="4">
                            <UFormField label="Benchmark Name" size="lg">
                                <UInput default-value="Elite Basketball 2024" class="w-full" :disabled="!isEditable" />
                            </UFormField>
                            <UFormField label="Sport" size="lg">
                                <UInput class="w-full" :disabled="!isEditable" />
                            </UFormField>
                            <UFormField label="Version" size="lg">
                                <UInput class="w-full" :disabled="!isEditable" />
                            </UFormField>
                            <UFormField label="Update Frequency" size="lg">
                                <USelect default-value="Weekly" :items="[ 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Annually' ]" class="w-full" :disabled="!isEditable" />
                            </UFormField>
                        </Grid>
                        <UFormField label="Description">
                            <UTextarea placeholder="Describe the benchmark purpose and methodology..." class="w-full" :disabled="!isEditable" />
                        </UFormField>
                    </UCard>
                    <UCard :ui="{ body: 'sm:p-4 space-y-4' }">
                        <h4 class="font-semibold">Performance Metrics</h4>
                        <UCard v-for="metric in [
                            { label: 'Vertical Jump', weight: 25, min: 20, max: 60 },
                            { label: 'Sprint Speed', weight: 25, min: 20, max: 60 },
                            { label: 'Agility', weight: 25, min: 20, max: 60 },
                        ]" :ui="{ body: 'sm:p-4 flex items-center justify-between' }">
                            <USwitch :label="metric.label" :disabled="!isEditable" />
                            <div class="flex items-center gap-4">
                                <ul class="text-xs text-muted flex gap-3">
                                    <li>Weight: {{ metric.weight }}%</li>
                                    <li>Min: {{ metric.min }}</li>
                                    <li>Max: {{ metric.max }}</li>
                                </ul>
                                <UButton label="Configure" variant="outline" color="neutral" :disabled="!isEditable" />
                            </div>
                        </UCard>
                        <UButton label="Add New Metric" icon="i-lucide-plus" variant="ghost" color="neutral" size="lg" block class="border border-dashed border-muted" :disabled="!isEditable" />
                    </UCard>
                    <UCard :ui="{ body: 'sm:p-4 space-y-4' }">
                        <h4 class="font-semibold">Data Sources</h4>
                        <UCard v-for="source in [
                            { label: 'Historical Performance Data', description: '245 athletes, 2,940 records', icon: 'i-lucide-database', iconColor: 'text-blue-500', status: 'Connected' },
                            { label: 'Real-time Collection System', description: 'Live data feed from devices', icon: 'i-lucide-database', iconColor: 'text-green-500', status: 'Active' }
                        ]" :ui="{ body: 'sm:p-4 flex justify-between items-center' }">
                            <ListIcon :label="source.label" :description="source.description" :icon="source.icon" :iconColor="source.iconColor" />
                            <UBadge :label="source.status" variant="outline" color="neutral" />
                        </UCard>
                    </UCard>
                    <div class="flex justify-end gap-2">
                        <UButton label="Cancel" variant="ghost" color="neutral" size="lg" />
                        <UButton label="Save Assessment" icon="i-lucide-save" size="lg" :disabled="!isEditable" />
                    </div>
                </template>
                <template #history>
                    <Block title="Update History" description="Track all changes made to benchmarks">
                        <UTimeline reverse v-model="value" orientation="vertical" :items="items" size="xs" class="w-full">
                            <template #description="{ item }">
                                <div class="mb-1.5">{{ item.detail }}</div>
                                <UBadge :label="item.author" variant="outline" color="neutral" />
                            </template>
                        </UTimeline>
                    </Block>
                </template>
                <template #settings>
                    <Block title="Global Benchmark Settings" description="Configure system-wide benchmark parameters">
                        <section class="flex justify-between items-center">
                            <div>
                                <h4 class="font-semibold text-sm">Auto-update Benchmarks</h4>
                                <p class="text-sm text-muted">Automatically update benchmarks when new data is available</p>
                            </div>
                            <USwitch />
                        </section>
                        <USeparator class="py-2" />
                        <section class="flex justify-between items-center">
                            <div>
                                <h4 class="font-semibold text-sm">Outlier Detection</h4>
                                <p class="text-sm text-muted">Automatically identify and handle statistical outliers</p>
                            </div>
                            <USwitch />
                        </section>
                        <USeparator class="py-2" />
                        <section class="space-y-4">
                            <UFormField label="Default Statistical Model" size="lg">
                                <USelect placeholder="Select model" class="w-full" />
                            </UFormField>
                            <UFormField label="Minimum Sample Size" help="Minimum number of athletes required to create a benchmark" size="lg">
                                <UInputNumber :default-value="5" class="w-full" />
                            </UFormField>
                            <UFormField label="Confidence Level" size="lg">
                                <UInput default-value="95%" class="w-full" />
                            </UFormField>
                        </section>
                    </Block>
                    <div class="flex justify-end gap-2 mt-4">
                        <UButton label="Save Global Settings" icon="i-lucide-save" size="lg" />
                    </div>
                </template>
            </UTabs>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, benchmarkingTabs } from '~/data';
import type { TabsItem, DropdownMenuItem } from '@nuxt/ui'
import { UButton, UFormField, UInputNumber, USwitch, UTextarea } from '#components';

const isEditable = ref(false)

const sections = [
  {
    label: 'Benchmark Overview',
    icon: 'i-lucide-chart-column',
    slot: 'overview' as const
  },
  {
    label: 'Edit & Configure',
    icon: 'i-lucide-pencil-line',
    slot: 'edit' as const
  },
  {
    label: 'Update History',
    icon: 'i-lucide-calendar-arrow-up',
    slot: 'history' as const
  },
  {
    label: 'Global Settings',
    icon: 'i-lucide-settings',
    slot: 'settings' as const
  }
] satisfies TabsItem[]

const actions = ref<DropdownMenuItem[]>([
    {
      label: 'Edit',
      icon: 'i-lucide-pencil'
    },
    {
      label: 'Copy',
      icon: 'i-lucide-copy'
    },
    {
      label: 'Delete',
      color: 'error',
      icon: 'i-lucide-trash-2'
    }
])

import type { TimelineItem } from '@nuxt/ui'

const value = ref(2)

const items = ref<TimelineItem[]>([
  {
    date: 'Apr 5 2025',
    title: 'Updated Elite Basketball 2024',
    detail: 'Added 23 new athlete records, recalibrated percentiles',
    icon: 'i-lucide-clock',
    author: 'Dr. Sarah Wilson'
  },
  {
    date: 'Jun 12 2025',
    title: 'Performance Metrics Overhaul',
    detail: 'Introduced advanced agility and endurance tracking metrics for all athletes',
    icon: 'i-lucide-activity',
    author: 'Dr. Sarah Wilson'
  },
  {
    date: 'Sep 28 2025',
    title: 'Mid-Season Data Review',
    detail: 'Validated player stats and integrated video analysis insights into reports',
    icon: 'i-lucide-bar-chart',
    author: 'Dr. Sarah Wilson'
  },
  {
    date: 'Nov 1 2025',
    title: 'System Optimization',
    detail: 'Improved data synchronization speed and updated UI for better timeline filtering',
    icon: 'i-lucide-rocket',
    author: 'Dr. Sarah Wilson'
  }
])
</script>