<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Assessments" description="Record and track raw athletic performance data" inverted>

            <Tabs :items="assessmentTabs" color="white" />

            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Assessment Repository"
                description="A detailed overview of the most recent athlete evaluations">
                <template #actions>
                    <UButton label="Add Athlete" icon="i-lucide-user" size="lg" @click="open = true" class="justify-center w-full"/>
                </template>
                <div class="grid lg:flex gap-4">
                    <UInput placeholder="Search Assessments" icon="i-lucide-search" size="lg" class="w-full" />
                    <USelect placeholder="Assessment type" :items="['Option A', 'Option B', 'Option C']" class="w-full lg:w-58" />
                </div>
                <div class="py-4 space-y-4">
                    <UCard v-for="(user, i) in users" :key="i" :ui="{ body: 'sm:p-4' }">
                        <div class="grid md:flex items-center md:justify-between w-full gap-2">
                            <ListProfile v-bind="user">
                                <template #profileDescription>
                                    <ul class="md:flex md:divide-x divide-muted md:*:px-2 md:-mx-2">
                                        <li>{{ user.athlete }}</li>
                                        <li>{{ user.assessor }}</li>
                                        <li>{{ user.date }}</li>
                                    </ul>
                                </template>
                            </ListProfile>
                            <UButton label="View Details" icon="i-lucide-eye" color="neutral" variant="outline"
                                to="/assessment-center/assessment-details" class="justify-center" />
                        </div>
                    </UCard>
                </div>
                <UPagination v-model:page="page" :total="100" class="flex justify-center" />
            </Block>
        </Page>
    </div>
    <UModal v-model:open="open" title="Select Athlete and Form" description="Choose an athlete and the form you want to fill out." :ui="{ body: 'space-y-4', footer: 'grid lg:flex lg:justify-end' }">
        <template #body>
            <URadioGroup v-model="athleteType" orientation="horizontal" indicator="end" variant="table"
                :ui="{ item: 'w-full' }" :items="['New Athlete', 'Existing Athlete']" />
            <!-- Show this if Existing Athlete -->
            <UFormField label="Select Athlete" size="lg" class="w-full" v-if="athleteType === 'Existing Athlete'">
                <USelectMenu placeholder="Select Athlete" v-model="athlete" :avatar="athlete?.avatar" :items="athletes"
                    class="w-full" />
            </UFormField>
            <!-- Show this if New Athlete -->
            <UFormField label="Athlete's Name" size="lg" class="w-full" v-if="athleteType === 'New Athlete'">
                <UInput placeholder="Enter Name" class="w-full" />
            </UFormField>
            <UFormField label="Select Form" size="lg" class="w-full">
                <USelectMenu placeholder="Select Form"
                    :items="['Physical Assessment', 'Skill Assessment', 'Performance Test', 'Wellness Survey', 'Injury Assessment']"
                    class="w-full" />
            </UFormField>
        </template>
        <template #footer="{ close }">
            <UButton label="Proceed" size="lg" to="/assessment-center/form" class="justify-center w-full lg:order-2 lg:w-auto" />
            <UButton label="Cancel" variant="ghost" color="neutral" size="lg" @click="close" class="justify-center w-full lg:order-1 lg:w-auto" />
        </template>
    </UModal>
</template>
<script setup lang="ts">
import { dataStatCards, assessmentTabs } from '~/data';
import ListProfile from '~/components/global/ListProfile.vue';
import type { SelectMenuItem } from '@nuxt/ui'

const open = ref(false)

const athleteType = ref('New Athlete')

const page = ref(5)

// Athletes
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

// Athletes
const athletes = ref([
  {
    label: 'benjamincanac',
    value: 'benjamincanac',
    avatar: {
      src: 'https://github.com/benjamincanac.png',
      alt: 'benjamincanac'
    }
  },
  {
    label: 'romhml',
    value: 'romhml',
    avatar: {
      src: 'https://github.com/romhml.png',
      alt: 'romhml'
    }
  },
  {
    label: 'noook',
    value: 'noook',
    avatar: {
      src: 'https://github.com/noook.png',
      alt: 'noook'
    }
  },
  {
    label: 'sandros94',
    value: 'sandros94',
    avatar: {
      src: 'https://github.com/sandros94.png',
      alt: 'sandros94'
    }
  }
] satisfies SelectMenuItem[])

const athlete = ref(athletes.value[0])
</script>