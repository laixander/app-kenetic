<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-94 md:h-96 lg:h-58" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Reports & Analytics" description="Generate comprehensive reports, export data, and analyze performance trends" inverted>
            <Tabs :items="reportsAnalyticsTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in analyticStatCards" :key="i" v-bind="card" countSize="text-xl" hasDetails />
            </Grid>

            <Grid :lg="2" :gap="4">
                <Block title="Campus-wide Fitness Score Distribution" description="Distribution of fitness scores across all 1,412 students">
                    <FeatureCampusWideChart />
                </Block>
                <Block title="Avg. Fitness Scores by Academic Year" description="Monthly trends showing overall student fitness progress">
                    <FeatureAvgFitnessChart />
                </Block>
            </Grid>

            <Block title="Population Analysis Summary" description="Key insights from campus-wide fitness data analysis">
                <UCard variant="subtle" :ui="{ body: 'sm:p-4' }">
                    <Grid :lg="3" class="divide-muted divide-x">
                        <div v-for="n in [
                            { label: 'Average Score', description: 'Campus Population', value: 73.2, icon: 'i-lucide-bar-chart-3' },
                            { label: 'Top Performers', description: 'Score 80+ (Excellent)', value: '30.8%', icon: 'i-lucide-pie-chart' },
                            { label: 'Improvement Trend', description: 'Points from last year', value: '+2.1', icon: 'i-lucide-line-chart' }
                        ]" class="grid w-full text-center gap-1">
                            <UIcon :name="n.icon" class="shrink-0 size-5 mx-auto"/>
                            <span class="text-xs text-dimmed">{{ n.label }}</span>
                            <span class="font-semibold text-default">{{ n.value }}</span>
                            <span class="text-xs text-dimmed">{{ n.description }}</span>
                        </div>
                    </Grid>
                </UCard>

                <section class="space-y-2 mt-8">
                    <h4 class="font-semibold text-default">Key Population Insights</h4>
                    <ul class="list-disc list-inside text-sm text-muted">
                        <li>69.2% of students score above the national average (65)</li>
                        <li>Health Sciences department leads with highest average fitness scores</li>
                        <li>Seniors show 6.4 point improvement over freshmen</li>
                        <li>78% of students show year-over-year fitness improvement</li>
                    </ul>
                </section>
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { analyticStatCards, reportsAnalyticsTabs } from '~/data';
</script>