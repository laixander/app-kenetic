<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-91 md:h-94 lg:h-56" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Reports & Analytics" description="Generate comprehensive reports, export data, and analyze performance trends" inverted>
            <Tabs :items="reportsAnalyticsTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <UCard v-for="action in [
                    { name: 'Generate Report', description: 'Create new custom report', icon: 'i-lucide-file-text', click: () => console.log('Generate Report') },
                    { name: 'Export Data', description: 'Download raw data files', icon: 'i-lucide-download', click: () => console.log('Export Data') },
                    { name: 'Analytics', description: 'View detailed analytics', icon: 'i-lucide-bar-chart-3', click: () => console.log('Analytics') },
                    { name: 'Share Report', description: 'Share with stakeholders', icon: 'i-lucide-share-2', click: () => console.log('Share Report') },
                ]" :key="action.name" :ui="{ body: 'flex flex-col items-center hover:bg-primary/10 dark:hover:bg-primary-950 transition-color duration-200' }" class="cursor-pointer" @click="action.click">
                    <div>
                        <UIcon :name="action.icon" class="shrink-0 size-6" />
                    </div>
                    <span class="font-semibold">{{ action.name }}</span>
                    <span class="text-xs text-muted">{{ action.description }}</span>
                </UCard>
            </Grid>

            <Block title="Recent Reports" description="View and manage recently generated reports">
                <template #actions>
                    <USelect defaultValue="All Categories" :items="['All Categories', 'Category A', 'Category B', 'Category C']" size="lg" />
                </template>

                <div class="space-y-4">
                    <UCard v-for="(report, i) in [
                        { title: 'Gait Analysis Report', category: 'Biomechanics', date: '2024-01-12', size: '2.3 MB', icon: 'i-lucide-activity' },
                        { title: 'Upper Limb Motion Study', category: 'Kinematic Assessment', date: '2024-02-10', size: '3.1 MB', icon: 'i-lucide-armchair' },
                        { title: 'Sprint Performance Evaluation', category: 'Performance Metrics', date: '2024-03-05', size: '2.8 MB', icon: 'i-lucide-gauge' },
                        { title: 'Postural Stability Test', category: 'Balance & Control', date: '2024-04-15', size: '1.9 MB', icon: 'i-lucide-crosshair' },
                        { title: 'Muscle Activation Summary', category: 'EMG Analysis', date: '2024-05-22', size: '3.5 MB', icon: 'i-lucide-activity-square' }
                    ]" :key="i" :ui="{ body: 'sm:p-4' }">
                        <div class="grid md:flex items-center md:justify-between w-full gap-2">
                            <ListIcon v-bind="report" :label="report.title" :icon="report.icon" styledIcon>
                                <template #description>
                                    <ul class="text-xs md:flex md:divide-x divide-muted md:*:px-2 md:-mx-2">
                                        <li>{{ report.category }}</li>
                                        <li>{{ report.date }}</li>
                                        <li>{{ report.size }}</li>
                                    </ul>
                                </template>
                            </ListIcon>
                            <div class="flex items-center gap-2">
                                <UBadge label="completed" color="success" size="sm" />
                                <UDropdownMenu :items="actions" size="sm" :content="{ align: 'end', sideOffset: 4 }">
                                    <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis" size="sm" />
                                </UDropdownMenu>
                            </div>
                        </div>
                    </UCard>
                </div>

            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { analyticStatCards, reportsAnalyticsTabs } from '~/data';
import type { DropdownMenuItem } from '@nuxt/ui'
const actions = ref<DropdownMenuItem[]>([
   {
      label: 'View',
      icon: 'i-lucide-eye'
    },
    {
      label: 'Export',
      icon: 'i-lucide-download'
    }
])
</script>