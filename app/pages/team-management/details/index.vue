<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-100 lg:h-70" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page toolbarClass="border-white/10">
            <template #toolbar>
                <UButton label="Back to Team Management" icon="i-lucide-arrow-left" variant="ghost" class="text-white" to="/team-management" />
            </template>
            <div class="flex justify-between items-center">
                <div class="flex-1">
                    <div class="grid lg:flex items-center w-full lg:divide-x divide-white/10 *:lg:px-12">
                        <div class="space-y-1 first:pl-0">
                            <div class="flex items-center gap-2">
                                <span class="font-semibold text-lg text-white">Youth Basketball</span>
                                <UBadge
                                    color="success"
                                >active</UBadge>
                            </div>
                            <div class="text-sm text-white border-s-3 border-sky-500 pl-2">Basketball</div>
                        </div>
                        <div class="bg-gradient-to-l to-white/20 max-w-120 h-[1px] my-6 lg:hidden"></div>
                        <div class="flex items-center gap-10">
                            <div class="flex items-center gap-2">
                                <UAvatar src="https://randomuser.me/api/portraits/women/21.jpg" alt="Kim Johnson" size="xl" />
                                <div class="flex flex-col">
                                    <span class="text-xs text-white">Coach</span>
                                    <span class="text-sm text-white font-semibold">Kim Johnson</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <UAvatar icon="i-lucide-users" size="xl" />
                                <div class="flex flex-col">
                                    <span class="text-xs text-white">Members</span>
                                    <span class="text-sm text-white font-semibold">12 members</span>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gradient-to-l to-white/20 max-w-120 h-[1px] my-6 lg:hidden"></div>
                        <div class="flex items-center gap-4 last:pr-0">
                            <UIcon name="i-lucide-calendar" class="text-primary-300" />
                            <div class="flex flex-col">
                                <span class="text-xs text-white">Next Training</span>
                                <span class="text-sm text-white font-semibold">2024-01-16 6:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UTabs :items="items" color="cyan" :ui="{ trigger: 'grow data-[state=inactive]:text-white/80 hover:data-[state=inactive]:not-disabled:text-white', list: 'bg-elevated/35 backdrop-blur-sm', }" class="gap-4 w-full">
                <template #members="{ item }">
                    <Block title="Teams Members" description="Manage team members and their roles across all teams">
                        <template #actions>
                            <UButton label="Add Member" icon="i-lucide-user-plus" size="lg" />
                        </template>
                        <div class="grid lg:flex gap-4">
                            <UInput placeholder="Search member" icon="i-lucide-search" size="lg" class="w-full" />
                            <USelect default-value="All Teams" :items="['All Teams', 'Team A', 'Team B', 'Team C']" class="w-full lg:w-58" />
                        </div>
                        <div class="py-4 space-y-4">
                            <UCard v-for="(member, i) in members" :key="i" :ui="{ body: 'sm:p-4' }">
                                <div class="grid md:flex items-center md:justify-between w-full gap-2">
                                    <ListProfile v-bind="member" class="w-full">
                                        <template #profileDescription>
                                            <ul class="md:flex md:divide-x divide-muted md:*:px-2 md:-mx-2">
                                                <li>{{ member.number }}</li>
                                                <li>{{ member.position }}</li>
                                                <li>Joined {{ member.date }}</li>
                                            </ul>
                                        </template>
                                    </ListProfile>
                                    <div class="grid w-full">
                                        <span class="text-xs text-dimmed">Contact</span>
                                        <span class="text-sm text-default font-semibold">+63912345678</span>
                                    </div>
                                    <div class="grid w-full">
                                        <span class="text-xs text-dimmed">Status</span>
                                        <span><UBadge label="active" color="success" variant="subtle" /></span>
                                    </div>
                                    <div>
                                        <UDropdownMenu :items="actions" size="sm" :content="{ align: 'end', sideOffset: 4 }">
                                            <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis" size="sm" />
                                        </UDropdownMenu>
                                    </div>
                                </div>
                            </UCard>
                        </div>
                        <UPagination :total="100" class="flex justify-center" />
                    </Block>
                </template>

                <template #workout="{ item }">
                    <Block title="Workout Logs" description="Recent workout logs and performance tracking">
                        <template #actions>
                            <UButton label="Log Workout" icon="i-lucide-plus" size="lg" />
                        </template>
                        <div class="grid lg:flex gap-4">
                            <UInput placeholder="Search log" icon="i-lucide-search" size="lg" class="w-full" />
                        </div>
                        <div class="py-4 space-y-4">
                            <UCard v-for="(workout, i) in workouts" :key="i" :ui="{ body: 'sm:p-4' }">
                                <div class="grid w-full gap-6">
                                    <ListProfile v-bind="workout" class="w-full">
                                        <template #profileDescription>
                                            <span class="text-xs text-dimmed">1 day ago</span>
                                        </template>
                                    </ListProfile>
                                    <div class="flex gap-8">
                                        <div class="grid">
                                            <span class="text-xs text-dimmed">Time</span>
                                            <span class="text-sm text-default font-semibold">2h 7min</span>
                                        </div>
                                        <div class="grid">
                                            <span class="text-xs text-dimmed">Reps</span>
                                            <span class="text-sm text-default font-semibold">68</span>
                                        </div>
                                        <div class="grid">
                                            <span class="text-xs text-dimmed">Training Plan</span>
                                            <span class="text-sm text-default font-semibold">Speed & Agility Training</span>
                                        </div>
                                    </div>
                                    <div class="bg-gradient-to-l to-gray-200 dark:to-gray-700 h-[1px]"></div>
                                    <div class="space-y-2">
                                        <div class="font-semibold text-sm text-default">
                                            Drills & Exercises
                                        </div>
                                        <div class="flex gap-4">
                                            <UAlert 
                                                variant="soft" 
                                                color="neutral"
                                                title="Sprint Intervals"
                                                description="20 minutes"
                                                icon="i-lucide-check-circle"
                                                :ui="{
                                                    icon: 'size-6 my-auto text-success',
                                                    title: 'font-semibold',
                                                    description: 'text-xs text-dimmed'
                                                }" 
                                            />
                                            <UAlert 
                                                variant="soft" 
                                                color="neutral"
                                                title="Ladder Drills"
                                                description="15 minutes"
                                                icon="i-lucide-check-circle"
                                                :ui="{
                                                    icon: 'size-6 my-auto text-success',
                                                    title: 'font-semibold',
                                                    description: 'text-xs text-dimmed'
                                                }" 
                                            />
                                            <UAlert 
                                                variant="soft" 
                                                color="neutral"
                                                title="Sprint Intervals"
                                                description="25 minutes"
                                                icon="i-lucide-check-circle"
                                                :ui="{
                                                    icon: 'size-6 my-auto text-success',
                                                    title: 'font-semibold',
                                                    description: 'text-xs text-dimmed'
                                                }" 
                                            />
                                            <UAlert 
                                                variant="soft" 
                                                color="neutral"
                                                title="Plyometric Jumps"
                                                description="30 minutes"
                                                icon="i-lucide-x-circle"
                                                :ui="{
                                                    icon: 'size-6 my-auto text-gray-400',
                                                    title: 'font-semibold',
                                                    description: 'text-xs text-dimmed'
                                                }" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </UCard>
                        </div>
                        <UPagination :total="100" class="flex justify-center" />
                    </Block>
                </template>

                <template #video="{ item }">
                    <Block title="Video Library" description="Training videos and match analysis">
                        <template #actions>
                            <UButton label="Upload Video" icon="i-lucide-upload" size="lg" />
                        </template>
                        <div class="grid lg:flex gap-4">
                            <UInput placeholder="Search video" icon="i-lucide-search" size="lg" class="w-full" />
                        </div>
                        <Grid :lg="4" :gap="4" class="py-4">
                            <UCard v-for="n in 4" :ui="{ body: 'p-0 sm:p-0', footer: 'space-y-4 p-4 sm:p-4' }">
                                <div class="bg-gray-800 dark:bg-gray-950 text-center p-8">
                                    <UIcon name="i-ic-round-play-circle" class="size-16 text-white/20" />
                                </div>
                                <template #footer>
                                    <div class="grid">
                                        <span class="font-semibold text-default">Practice Session - Ball Handling</span>
                                        <span class="text-xs text-dimmed">2024-01-15</span>
                                    </div>
                                    <div class="grid">
                                        <span class="text-xs text-dimmed">Athletes:</span>
                                        <span class="text-sm text-default">Sarah Johnson, Mike Chen, Emma Davis</span>
                                    </div>
                                </template>
                            </UCard>
                        </Grid>
                        <UPagination :total="100" class="flex justify-center" />
                    </Block>
                </template>

                <template #activity="{ item }">
                    <Block title="Recent Activity" description="Latest updates and changes for this team">
                        <div class="pb-4 space-y-4">
                            <UCard v-for="n in 5" :ui="{ body: 'sm:p-4 flex items-center gap-4' }">
                                <UChip standalone inset />
                                <div class="grid">
                                    <span class="text-default font-medium">Lisa Rodriguez joined the team</span>
                                    <span class="text-sm text-dimmed">2 hours ago</span>
                                </div>
                            </UCard>
                        </div>
                        <UPagination :total="100" class="flex justify-center" />
                    </Block>
                </template>
            </UTabs>
            
        </Page>
    </div>
</template>
<script setup lang="ts">
import { UButton } from '#components';
import type { TabsItem } from '@nuxt/ui'
import ComingSoon from '~/components/global/ComingSoon.vue';
const items = [
  {
    label: 'Members',
    icon: 'i-lucide-users',
    slot: 'members' as const
  },
  {
    label: 'Workout Logs',
    icon: 'i-lucide-dumbbell',
    slot: 'workout' as const
  },
  {
    label: 'Video Analysis',
    icon: 'i-lucide-video',
    slot: 'video' as const
  },
  {
    label: 'Activity Feed',
    icon: 'i-lucide-activity',
    slot: 'activity' as const
  }
] satisfies TabsItem[]

const actions = [
    {
      label: 'Edit',
      icon: 'i-lucide-pencil'
    },
    {
      label: 'Delete',
      color: 'error',
      icon: 'i-lucide-trash-2'
    }
]

// Athletes
const members = [
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
        profileName: "Sarah Johnson",
        position: "Coach",
        number: "24",
        date: "2024-01-15"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/45.jpg",
        profileName: "Laura Brown",
        position: "Forward",
        number: "45",
        date: "2024-03-05"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        profileName: "James Carter",
        position: "Sprinter",
        number: "88",
        date: "2024-04-10"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/men/28.jpg",
        profileName: "Michael Adams",
        position: "Point Guard",
        number: "32",
        date: "2024-06-22"
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/48.jpg",
        profileName: "Emily White",
        position: "Midfielder",
        number: "57",
        date: "2024-08-12"
    }
];

// Workout Logs
const workouts = [
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
        profileName: "Sarah Johnson",
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/45.jpg",
        profileName: "Laura Brown",
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        profileName: "James Carter",
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/men/28.jpg",
        profileName: "Michael Adams",
    },
    {
        profilePhoto: "https://randomuser.me/api/portraits/women/48.jpg",
        profileName: "Emily White",
    }
];
</script>