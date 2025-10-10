<script setup lang="ts">
import { UAvatar, UBadge, UIcon } from '#components';
import AnalysisCard from '~/components/feature/DashboardAnalysisCard.vue'
import AthleteCard from '~/components/feature/DashboardAthleteCard.vue'
import { analysis, statCards } from '~/data'
import { athletes } from '~/data'
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

            <Block
                icon="i-lucide-activity"
                iconColor="blue"
                title="Performance Metrics Overview"
                description="Concise insights into fitness metrics for tracking student athletic growth"
            >
                <Grid :lg="3" :gap="1" class="rounded-lg overflow-hidden">
                    <AnalysisCard :analysis="analysis" />
                </Grid>
            </Block>

            <!-- <div class="flex gap-4">
                <Block
                    icon="i-lucide-activity"
                    iconColor="blue"
                    title="Performance Metrics Overview"
                    description="Concise insights into fitness metrics for tracking student athletic growth"
                >
                    <Grid :lg="3" :gap="1" class="rounded-lg overflow-hidden">
                        <AnalysisCard :analysis="analysis" />
                    </Grid>
                </Block>
                <div class="w-[960px]">
                    <Block
                        icon="i-lucide-trophy"
                        iconColor="yellow"
                        title="Top Performers"
                        description="Top athletes by overall performance"
                    >
                        <AthleteCard :athletes="athletes" />
                    </Block>
                </div>
                
            </div> -->
        </Page>
    </div>
</template>