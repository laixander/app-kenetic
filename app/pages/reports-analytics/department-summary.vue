<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-94 md:h-96 lg:h-58" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Reports & Analytics" description="Generate comprehensive reports, export data, and analyze performance trends" inverted>
            <Tabs :items="reportsAnalyticsTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in analyticStatCards" :key="i" v-bind="card" countSize="text-xl" hasDetails />
            </Grid>

            <Block title="Department Score Distribution" description="Distribution of fitness scores across all 1,412 students">
                <template #actions>
                    <USelect size="lg" :items="[
                        { label: 'All Benchmark', value: 'all' },
                        { label: 'Vertical Jump', value: 'vertical-jump' },
                        { label: '40 Yard Dash', value: '40-yard-dash' },
                        { label: 'Pro Agility', value: 'pro-agility' },
                        { label: 'Broad Jump', value: 'broad-jump' },
                        { label: 'Push Ups', value: 'push-ups' },
                        { label: 'Sit Ups', value: 'sit-ups' },
                        { label: 'Mile Run', value: 'mile-run' }
                    ]" defaultValue="vertical-jump" />
                </template>

                <DeptScoreChart />

                <section class="mt-4 space-y-4">
                    <UCard v-for="dept in [
                        { name: 'Engineering', student: 342, score: 78.5, percentile: '72th', trend: 3.2 },
                        { name: 'Business', student: 298, score: 71.2, percentile: '58th', trend: 1.8 },
                        { name: 'Arts & Sciences', student: 445, score: 69.8, percentile: '54th', trend: -0.5 },
                        { name: 'Health Sciences', student: 189, score: 82.1, percentile: '81th', trend: 3.2 },
                        { name: 'Education', student: 138, score: 67.3, percentile: '48th', trend: -4.1 },
                    ]" :ui="{ body: 'sm:p-4 flex items-center gap-2' }">
                        <div class="grid w-full">
                            <span class="text-sm text-default font-semibold">{{ dept.name }}</span>
                            <span class="text-xs text-dimmed">{{ dept.student }} students</span>
                        </div>
                        <div class="grid w-full justify-end text-center">
                            <span class="text-sm text-green-600 dark:text-green-400 font-semibold">{{ dept.score }}</span>
                            <span class="text-xs text-dimmed">Avg Score</span>
                        </div>
                        <div class="grid w-full justify-end text-center">
                            <span class="text-sm text-blue-600 dark:text-blue-400 font-semibold">{{ dept.percentile }}</span>
                            <span class="text-xs text-dimmed">Percentile</span>
                        </div>
                        <div class="flex items-center gap-1 w-full justify-end">
                            <UIcon
                                :name="dept.trend >= 0 ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
                                :class="dept.trend >= 0 ? 'text-green-500' : 'text-red-500'"
                                class="shrink-0"
                            />
                            <span class="text-sm text-default">
                                {{ dept.trend >= 0 ? '+' : '' }}{{ dept.trend }}%
                            </span>
                        </div>
                    </UCard>
                </section>
                
                <UAlert 
                    title="Department Insights" 
                    description="Health Sciences leads with the highest average fitness score (82.1), while Education shows the lowest average (67.3). Engineering shows strong improvement with a +3.2% trend." 
                    color="info"
                    variant="soft"
                    icon="i-lucide-info" 
                    :ui="{
                        icon: 'size-8 my-auto'
                    }" 
                    class="mt-4" 
                />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { analyticStatCards, reportsAnalyticsTabs } from '~/data';
import DeptScoreChart from '~/components/feature/DeptScoreChart.vue';
</script>