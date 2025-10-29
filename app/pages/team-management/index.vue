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
                        { name: 'Youth Basketball', sport: 'Basketball', status: 'active', coach: 'Johnson', members: 12, date:'2024-01-16', time: '6:00 PM' },
                        { name: 'Soccer Team', sport: 'Soccer', status: 'active', coach: 'Johnson', members: 12, date:'2024-01-16', time: '6:00 PM' },
                        { name: 'NCAA Team', sport: 'Volleyball', status: 'inactive', coach: 'Johnson', members: 12, date:'2024-01-16', time: '6:00 PM' },
                        { name: 'Volleyball Team', sport: 'Volleyball', status: 'active', coach: 'Johnson', members: 12, date:'2024-01-16', time: '6:00 PM' },
                    ]"
                >
                    <UCard>
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

                        <div class="flex flex-col my-4 divide-y divide-muted *:flex *:items-center *:gap-2 *:py-2">
                            <div>
                                <UIcon name="i-lucide-crown" class="text-cyan" />
                                <span class="text-xs text-muted">Coach {{ team.coach }}</span>
                            </div>
                            <div>
                                <UIcon name="i-lucide-users" class="text-teal" />
                                <span class="text-xs text-muted">{{ team.members }} members</span>
                            </div>
                        </div>

                        <UAlert variant="soft" icon="i-lucide-calendar" title="Next Training" :description="team.date + ' ' + team.time" />
                    </UCard>
                </ULink>
            </Grid>

            <UPagination :total="100" class="flex justify-center" />
        </Page>
    </div>
</template>
<script setup lang="ts">
import { teamStatCards, teamManagementTabs } from '~/data';
</script>