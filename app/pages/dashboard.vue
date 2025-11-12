<script setup lang="ts">
import { UBadge } from '#components';
import AssessmentChart from '~/components/feature/AssessmentChart.vue';
import SportsDistributionChart from '~/components/feature/SportsDistributionChart.vue';
import GridSpan from '~/components/global/GridSpan.vue';
import { statCards } from '~/data'
</script>
<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-50 lg:h-45" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Dashboard" description="Advanced analytics for sports performance, talent identification, and fitness assessment" inverted>
            <Grid :lg="4" :gap="4">
                <StatCard
                    v-for="(card, i) in statCards"
                    :key="i"
                    v-bind="card"
                />
            </Grid>

            <Grid :lg="3" :gap="4">
                <GridSpan :lg="2">
                    <Block title="Assessment Trends" description="Completed assessments over the last 8 months">
                        <AssessmentChart />
                    </Block>
                </GridSpan>
                <Block title="Upcoming Events" description="Scheduled assessments and competitions">
                    <UCard v-for="n in [
                        { title: 'Sprint Test', date: 'Aug 15, 2024', tag: 'Assessment' },
                        { title: 'Marathon Qualifier', date: 'Sep 10, 2024', tag: 'Competition' },
                        { title: 'Strength Evaluation', date: 'Oct 5, 2024', tag: 'Assessment' },
                        { title: 'Regional Championship', date: 'Nov 20, 2024', tag: 'Competition' },
                        { title: 'Endurance Test', date: 'Dec 12, 2024', tag: 'Assessment' }
                    ]" :ui="{ body: 'sm:p-4 flex justify-between items-center' }">
                        <section class="grid gap-1">
                            <h4 class="font-semibold text-sm">{{ n.title }}</h4>
                            <div class="flex items-center gap-2">
                                <span class="text-xs text-dimmed">{{ n.date }}</span>
                                <UBadge :label="n.tag" variant="subtle" color="neutral" size="sm" />
                            </div>
                        </section>
                        <UBadge label="Today" color="green" />
                    </UCard>
                </Block>
            </Grid>

            <Grid :lg="3" :gap="4">
                <Block title="Recent Activity" description="Latest system updates">
                    <UCard v-for="n in [
                        { title: 'Fitness assessment completed', athletes: 24, team: 'Swimming', date: '12 min ago' },
                        { title: 'New training module added', athletes: 18, team: 'Basketball', date: 'Nov 28' },
                        { title: 'Competition results published', athletes: 30, team: 'Baseball', date: 'Sept 15' }
                    ]" :ui="{ body: 'sm:p-4 flex justify-between items-center' }">
                        <section class="grid gap-1">
                            <h4 class="font-semibold text-sm">{{ n.title }}</h4>
                            <ul class="*:text-xs *:text-dimmed flex items-center *:[:not(:last-child)]:after:content-['•'] *:[:not(:last-child)]:after:mx-2">
                                <li>{{ n.athletes }} athletes</li>
                                <li>{{ n.team }} team</li>
                            </ul>
                        </section>
                        <span class="text-xs text-dimmed">{{ n.date }}</span>
                    </UCard>
                </Block>
                <Block title="Sport Distribution" description="Athletes per sport/team">
                    <SportsDistributionChart />
                </Block>
                <Block title="Quick Actions" description="Frequently used features">
                    <UButton label="Create Assessment Form" icon="i-lucide-file-text" trailing-icon="i-lucide-arrow-right" size="lg" color="lime" :ui="{ label: 'flex-1 text-left' }" class="w-full py-4" />
                    <UButton label="Create Norm Dataset" icon="i-lucide-activity" trailing-icon="i-lucide-arrow-right" size="lg" color="orange" :ui="{ label: 'flex-1 text-left' }" class="w-full py-4" />
                    <UButton label="Create Team" icon="i-lucide-dribbble" trailing-icon="i-lucide-arrow-right" size="lg" color="pink" :ui="{ label: 'flex-1 text-left' }" class="w-full py-4" />
                    <UButton label="Add Athlete" icon="i-lucide-user" trailing-icon="i-lucide-arrow-right" size="lg" color="purple" :ui="{ label: 'flex-1 text-left' }" class="w-full py-4" />
                </Block>
            </Grid>
        </Page>
    </div>
</template>