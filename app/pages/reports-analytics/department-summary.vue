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
                
                <UAlert title="Department Insights" description="Health Sciences leads with the highest average fitness score (82.1), while Education shows the lowest average (67.3). Engineering shows strong improvement with a +3.2% trend." color="info" class="mt-4" />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { analyticStatCards, reportsAnalyticsTabs } from '~/data';
import DeptScoreChart from '~/components/feature/DeptScoreChart.vue';
</script>