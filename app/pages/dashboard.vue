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
                    <Block title="Assessment Trends" description="Completed assessments over the last 8 months" icon="i-lucide-bar-chart-3" iconColor="green">
                        <AssessmentChart />
                    </Block>
                </GridSpan>
                <Block title="Upcoming Events" description="Scheduled assessments and competitions" icon="i-lucide-calendar" iconColor="primary">
                    <UCard v-for="n in [
                        { title: 'Regional Championship', time: '3:00 PM', date: 'Jan 20, 2025', tag: 'Competition', tagColor: 'red' },
                        { title: 'Annual Fitness Test', time: '9:00 AM', date: 'Feb 15, 2025', tag: 'Assessment', tagColor: 'blue' },
                        { title: 'Team Tryouts', time: '1:00 PM', date: 'Mar 10, 2025', tag: 'Event', tagColor: 'green' },
                        { title: 'Skill Development Camp', time: '10:00 AM', date: 'Apr 5, 2025', tag: 'Camp', tagColor: 'amber' }
                    ]" :ui="{ body: 'sm:p-4 flex justify-between items-center' }">
                        <section class="grid gap-1">
                            <h4 class="font-semibold text-sm">{{ n.title }}</h4>
                            <ul class="*:text-xs *:text-dimmed flex items-center *:[:not(:last-child)]:after:content-['•'] *:[:not(:last-child)]:after:mx-2">
                                <li>{{ n.time }}</li>
                                <li>{{ n.date }}</li>
                            </ul>
                        </section>
                        <UBadge :label="n.tag" :color="n.tagColor" variant="soft" />
                    </UCard>
                </Block>
            </Grid>

            <Grid :lg="3" :gap="4">
                <Block title="Fitness Metric Trends" description="Track improvement fitness metrics over time" icon="i-lucide-trending-up" iconColor="purple">
                    <FitnessMetricChart />
                </Block>
                <Block title="Gender Distribution" description="Gender distribution among all athletes" icon="i-lucide-pie-chart" iconColor="pink">
                    <GenderDistributionChart />
                </Block>
                <Block title="Quick Actions" description="Frequently used features" icon="i-lucide-zap" iconColor="yellow">
                    <UButton :key="action" :label="action.label" :icon="action.icon" trailing-icon="i-lucide-arrow-right" variant="soft" size="lg" :color="action.color" :ui="{ label: 'flex-1 text-left' }" class="w-full py-4"
                        v-for="action in [
                            { label: 'Create Assessment Form', icon: 'i-lucide-file-text', color: 'green', click: () => console.log('Create Assessment Form') },
                            { label: 'Create Norm Dataset', icon: 'i-lucide-activity', color: 'indigo', click: () => console.log('Create Norm Dataset') },
                            { label: 'Create Team', icon: 'i-lucide-dribbble', color: 'rose', click: () => console.log('Create Team') },
                            { label: 'Add Athlete', icon: 'i-lucide-user', color: 'amber', click: () => console.log('Add Athlete') }
                    ]" @click="action.click" />
                </Block>
            </Grid>
        </Page>
    </div>
</template>

<script setup lang="ts">
import { UBadge } from '#components';
import AssessmentChart from '~/components/feature/AssessmentChart.vue';
import GenderDistributionChart from '~/components/feature/GenderDistributionChart.vue';
import GridSpan from '~/components/global/GridSpan.vue';
import { statCards } from '~/data'
import type { TimelineItem } from '@nuxt/ui'
import FitnessMetricChart from '~/components/feature/FitnessMetricChart.vue';

const items = ref<TimelineItem[]>([
  {
    date: 'a few seconds ago',
    title: 'Successful login attempt',
    icon: 'i-lucide-key-round'
  },
  {
    date: 'an hour ago',
    title: 'Created new assessment',
    icon: 'i-lucide-file-text'
  },
  {
    date: 'Nov 12 2025',
    title: 'Added a new athlete',
    icon: 'i-lucide-star'
  }
])
</script>