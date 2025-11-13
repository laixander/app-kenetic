<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-94 md:h-96 lg:h-58" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Team Management" description="Create and manage teams, assign members, and configure roles for your sports analytics platform." inverted>
            <Tabs :items="teamManagementTabs" color="white" />
            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in teamStatCards" :key="i" v-bind="card" countSize="text-2xl" hasDetails />
            </Grid>

            <Block title="Teams Overview"
                description="Manage your teams and track their performance metrics">
                <template #actions>
                    <UButton label="Create Team" icon="i-lucide-users" size="lg" @click="open = true" class="justify-center w-full"/>
                </template>
                <div class="grid lg:flex gap-4">
                    <UInput placeholder="Search Team" icon="i-lucide-search" size="lg" class="w-full" />
                </div>
            </Block>

            <Grid :lg="4" :gap="4">
                <ULink 
                    to="/team-management/details"
                    v-for="team in [
                        { name: 'Youth Basketball', sport: 'Basketball', status: 'active', date:'Nov 15', time: '6:00 PM' },
                        { name: 'Soccer Team', sport: 'Soccer', status: 'active', date:'Nov 15', time: '6:00 PM' },
                        { name: 'NCAA Team', sport: 'Volleyball', status: 'inactive', date:'Nov 15', time: '6:00 PM' },
                        { name: 'Volleyball Team', sport: 'Volleyball', status: 'active', date:'Nov 15', time: '6:00 PM' },
                    ]"
                >
                    <UCard :ui="{ header: 'p-0 sm:px-0', body: 'space-y-4', footer: 'flex justify-between' }">
                        <template #header>
                            <NuxtImg src="https://images.unsplash.com/photo-1761767891805-e02480aab3a9" alt="Team Image" class="w-full h-32 object-cover object-center" />
                        </template>
                        <div class="flex items-start">
                            <div class="flex flex-col gap-0.5 flex-1">
                                <span class="font-semibold text-base text-default">{{ team.name }}</span>
                                <span class="text-sm text-muted">{{ team.sport }} athletes</span>
                            </div>
                            <UBadge :label="team.status" 
                                :color="team.status === 'active' ? 'success' : 'warning'"
                                variant="subtle"
                            />
                        </div>

                        <div class="flex flex-col gap-2">
                            <UCard variant="soft" :ui="{ body: 'sm:p-4' }">
                                <div class="flex justify-between items-center w-full">
                                    <div class="flex items-center gap-2">
                                        <UIcon name="i-lucide-crown" class="text-cyan" />
                                        <span class="text-xs text-muted">Coach</span>
                                    </div>
                                    <UAvatar src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" size="sm" />
                                </div>
                            </UCard>
                            <UCard variant="soft" :ui="{ body: 'sm:p-4' }">
                                <div class="flex justify-between items-center w-full">
                                    <div class="flex items-center gap-2">
                                        <UIcon name="i-lucide-users" class="text-teal" />
                                        <span class="text-xs text-muted">Members</span>
                                    </div>
                                    <UAvatarGroup size="sm" :max="2">
                                        <UAvatar src="https://randomuser.me/api/portraits/women/21.jpg" alt="Ava Martinez" />
                                        <UAvatar src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ethan Cruz" />
                                        <UAvatar src="https://randomuser.me/api/portraits/women/45.jpg" alt="Sophia Reyes" />
                                        <UAvatar src="https://randomuser.me/api/portraits/men/56.jpg" alt="Liam Santos" />
                                    </UAvatarGroup>
                                </div>
                            </UCard>
                        </div>

                        <template #footer>
                            <div class="flex items-center text-dimmed">
                                <UIcon name="i-lucide-calendar" class="shrink-0 mr-2" />
                                <span class="text-xs">Next Training:</span>
                            </div>
                            <span class="text-xs text-primary">{{ team.date }}, {{ team.time }}</span>
                            <!-- <UAlert variant="soft" icon="i-lucide-calendar" title="Next Training" :description="team.date + ' ' + team.time" /> -->
                        </template>
                    </UCard>
                </ULink>
            </Grid>

            <UPagination :total="100" class="flex justify-center" />
        </Page>
    </div>
    <UModal v-model:open="open" title="Create Team" description="Description goes here" :ui="{ footer: 'flex justify-end gap-2' }" class="min-w-2xl">
        <template #body>
            ...
        </template>
        <template #footer="{close}">
            <UButton label="Cancel" variant="ghost" color="neutral" size="lg" @click="close" />
            <UButton label="Save Team" icon="i-lucide-save" size="lg" @click="close" />
        </template>
    </UModal>
</template>
<script setup lang="ts">
import { UIcon } from '#components';
import { teamStatCards, teamManagementTabs } from '~/data';
const open = ref(false)
</script>