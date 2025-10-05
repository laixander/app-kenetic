<template>
    <div class="relative overflow-y-auto">
        <Banner />
        <Page title="Assessments" description="Record and track raw athletic performance data" inverted>

            <Tabs :items="assessmentTabs" color="white" />

            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Scheduled Assessments" description="Keep track of scheduled assessments, including automated notifications and easy rescheduling.">
                <template #actions>
                    <USelect placeholder="All Teams" :items="['Team A', 'Team B', 'Team C', 'Team D' ]" />
                    <UButton label="Create Schedule" icon="i-lucide-plus" color="neutral" size="lg" />
                </template>
                
                <Grid :lg="3" :gap="4">
                    <UCard :ui="{body: 'sm:p-4 space-y-6'}" v-for="n in 5">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="flex items-center gap-2">
                                    <div class="font-semibold text-default">
                                        Physical Assessment
                                    </div>
                                    <UBadge label="Assessment" color="amber" size="sm" />
                                </div>
                                <div class="text-dimmed text-xs">
                                    Youth Basketball
                                </div>
                            </div>
                            <UDropdownMenu :items="actions" size="sm" 
                                :content="{
                                    align: 'start',
                                    side: 'bottom',
                                    sideOffset: 8
                                }"
                            >
                                <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis-vertical" />
                            </UDropdownMenu>
                        </div>
                        <div class="space-y-2">
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-clock" class="size-4 text-muted" />
                                <span class="text-muted text-xs">15:00 • 1/20/2024</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-map-pin" class="size-4 text-muted" />
                                <span class="text-muted text-xs">Main Sports Hall</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-users" class="size-4 text-muted" />
                                <span class="text-muted text-xs">15 invited</span>
                            </div>
                        </div>

                        <div class="text-sm text-muted">
                            Weekly physical assessment
                        </div>
                        <UCard variant="soft" :ui="{body: '!px-0 sm:p-4'}">
                            <Grid :lg="3" :gap="0" class="divide-x divide-muted">
                                <div class="flex flex-col items-center">
                                    <span class="font-semibold text-default">12</span>
                                    <span class="text-dimmed text-xs">Confirmed</span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <span class="font-semibold text-default">12</span>
                                    <span class="text-dimmed text-xs">Pending</span>
                                </div>
                                <div class="flex flex-col items-center">
                                    <span class="font-semibold text-default">12</span>
                                    <span class="text-dimmed text-xs">Declined</span>
                                </div>
                            </Grid>
                        </UCard>
                    </UCard>
                </Grid>
            </Block>
            
        </Page>
    </div>
</template>
<script setup lang="ts">
import { dataStatCards, assessmentTabs } from '~/data';
import type { DropdownMenuItem } from '@nuxt/ui'

const actions = [
    {
        label: 'Send Reminder',
        icon: 'i-lucide-bell'
    },
    {
        label: 'View Details',
        icon: 'i-lucide-eye'
    }
] satisfies DropdownMenuItem[]
</script>