<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Assessments" description="Record and track raw athletic performance data" inverted>

            <Tabs :items="assessmentTabs" color="white" />

            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Scheduled Assessments"
                description="Keep track of scheduled assessments, including automated notifications and easy rescheduling.">
                <template #actions>
                    <USelect placeholder="All Teams" :items="['Team A', 'Team B', 'Team C', 'Team D']" />
                    <UButton label="Create Schedule" icon="i-lucide-plus" size="lg" @click="open = true" class="justify-center w-full" />
                </template>

                <Grid :md="2" :lg="3" :gap="4">
                    <UCard :ui="{ body: 'sm:p-4 space-y-6' }" v-for="n in 5">
                        <div class="flex items-center justify-between">
                            <div class="space-y-0.5">
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
                            <UDropdownMenu :items="actions" :content="{
                                align: 'start',
                                side: 'bottom',
                                sideOffset: 8
                            }">
                                <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis-vertical" size="sm" />
                            </UDropdownMenu>
                        </div>
                        <div class="space-y-1">
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-clock" class="size-4 text-muted" />
                                <div class="text-muted text-sm flex items-center">
                                    <span>15:00</span>
                                    <UIcon name="i-lucide-dot" class="size-5" />
                                    <span>1/20/2024</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-map-pin" class="size-4 text-muted" />
                                <span class="text-muted text-sm">Main Sports Hall</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <UIcon name="i-lucide-users" class="size-4 text-muted" />
                                <span class="text-muted text-sm">15 invited</span>
                            </div>
                        </div>

                        <div class="text-sm text-muted">
                            Weekly physical assessment
                        </div>
                        <UCard variant="soft" :ui="{ body: '!px-0 sm:p-4' }">
                            <Grid :cols="3" :gap="0" class="divide-x divide-muted *:flex *:flex-col *:items-center">
                                <div>
                                    <span class="font-semibold text-default">12</span>
                                    <span class="text-dimmed text-xs">Confirmed</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-default">12</span>
                                    <span class="text-dimmed text-xs">Pending</span>
                                </div>
                                <div>
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
    <UModal v-model:open="open" title="Create Assessment Schedule"
        description="Set up an assessment session and assign it to an athlete or team." :ui="{ body: 'space-y-4', footer: 'grid lg:flex lg:justify-end' }"
        class="lg:max-w-4xl">
        <template #body>
            <div class="grid lg:flex items-center gap-4">
                <UFormField label="Assessment Title" size="lg" class="w-full">
                    <UInput placeholder="Enter Assessment Title" class="w-full" />
                </UFormField>
                <UFormField label="Team" size="lg" class="w-full">
                    <USelect placeholder="Select Team" :items="['Team A', 'Team B', 'Team C']" class="w-full" />
                </UFormField>
            </div>
            <div class="grid lg:flex items-center gap-4">
                <UFormField label="Date" size="lg" class="w-full">
                    <UInput type="date" class="w-full" />
                </UFormField>
                <UFormField label="Time" size="lg" class="w-full">
                    <UInput type="time" class="w-full" />
                </UFormField>
                <UFormField label="Duration (min)" size="lg" class="w-full">
                    <UInput placeholder="Enter Duration" type="number" class="w-full" />
                </UFormField>
            </div>
            <UFormField label="Assessment Type" size="lg" class="w-full">
                <USelect placeholder="Select Assessment Type"
                    :items="['Assessment Type A', 'Assessment Type B', 'Assessment Type C']" class="w-full" />
            </UFormField>
            <UFormField label="Description" size="lg" class="w-full">
                <UTextarea placeholder="Enter Assessment Description" class="w-full" />
            </UFormField>
        </template>
        <template #footer="{ close }">
            <UButton label="Create Schedule" size="lg" class="justify-center w-full lg:order-2 lg:w-auto" />
            <UButton label="Cancel" variant="ghost" color="neutral" size="lg" @click="close" class="justify-center w-full lg:order-1 lg:w-auto" />
        </template>
    </UModal>
</template>
<script setup lang="ts">
import { dataStatCards, assessmentTabs } from '~/data';
import type { DropdownMenuItem } from '@nuxt/ui'

const open = ref(false)

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