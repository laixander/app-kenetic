<template>
    <div class="relative overflow-y-auto">
        <Banner />
        <Page title="Assessments" description="Record and track raw athletic performance data" inverted>

            <Tabs :items="assessmentTabs" color="white" />

            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Assessment Repository"
                description="A detailed overview of the most recent athlete evaluations">
                <div class="flex gap-4">
                    <UInput placeholder="Search Assessments" icon="i-lucide-search" size="lg" class="w-full" />
                    <USelect placeholder="Assessment type" :items="['Option A', 'Option B', 'Option C']" class="w-58" />
                </div>
                <div class="py-4 space-y-4">
                    <UCard v-for="(user, i) in users" :key="i" :ui="{ body: 'sm:p-4' }">
                        <div class="flex items-center justify-between">
                            <ListProfile v-bind="user">
                                <template #profileDescription>
                                    <div class="flex items-center">
                                        <span>{{ user.athlete }}</span>
                                        <UIcon name="i-lucide-dot" class="size-6" />
                                        <span>{{ user.assessor }}</span>
                                        <UIcon name="i-lucide-dot" class="size-6" />
                                        <span>{{ user.date }}</span>
                                    </div>
                                </template>
                            </ListProfile>
                            <UButton label="View Details" icon="i-lucide-eye" color="neutral" variant="outline" to="/assessment-center/assessment-details" />
                        </div>
                    </UCard>
                </div>
                <UPagination v-model:page="page" :total="100" class="flex justify-center" />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { dataStatCards, assessmentTabs } from '~/data';
import ListProfile from '~/components/global/ListProfile.vue';

const page = ref(5)

const users = [
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
        profileName: "Physical Assessment",
        athlete: "Sarah Johnson",
        assessor: "Dr. Mike Wilson",
        date: "2024-01-15"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/45.jpg",
        profileName: "Performance Test",
        athlete: "Laura Brown",
        assessor: "Dr. Mike Wilson",
        date: "2024-03-05"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        profileName: "Strength Training",
        athlete: "James Carter",
        assessor: "Coach Alex Smith",
        date: "2024-04-10"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/men/28.jpg",
        profileName: "Endurance Evaluation",
        athlete: "Michael Adams",
        assessor: "Coach Rachel Green",
        date: "2024-06-22"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/48.jpg",
        profileName: "Recovery Session",
        athlete: "Emily White",
        assessor: "Dr. Sophia Lee",
        date: "2024-08-12"
    }
];
</script>