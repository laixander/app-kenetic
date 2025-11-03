<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Campus Fitness" description="Comprehensive fitness analysis across the student population" inverted>
            <Tabs :items="teamManagementTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Individual Performance" description="Detailed performance metrics and recent test results for each athlete.">
                <div class="pb-4 space-y-4">
                    <UCard v-for="(workout, i) in workouts" :key="i" :ui="{ body: 'sm:p-4' }">
                        <div class="grid w-full gap-6">
                            <ListProfile v-bind="workout" class="w-full" />
                            <Grid :lg="4" :gap="4">
                                <UCard v-for="n in 4" :ui="{ body: 'sm:p-4' }">
                                    <div class="flex justify-between items-start">
                                        <div class="grid">
                                            <span class="text-xs text-muted">Sprint 40m</span>
                                            <span class="text-lg font-semibold">6.1s</span>
                                        </div>
                                        <UBadge label="below" color="error" size="sm" />
                                    </div>
                                    <div class="grid mt-4">
                                        <span class="text-xs text-muted">Benchmark: 5.8s</span>
                                        <UProgress model-value="60" />
                                    </div>
                                </UCard>
                            </Grid>
                        </div>
                    </UCard>
                </div>
                <UPagination v-model:page="page" :total="100" class="flex justify-center" />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, teamManagementTabs } from '~/data';

// Workout Logs
const workouts = [
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
        profileName: "Sarah Johnson",
        profileDescription: "Midfielder"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/45.jpg",
        profileName: "Laura Brown",
        profileDescription: "Midfielder"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        profileName: "James Carter",
        profileDescription: "Midfielder"
    }
];
</script>