<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-98 lg:h-51" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Team Management" description="Create and manage teams, assign members, and configure roles for your sports analytics platform." inverted>
            <Tabs :items="teamManagementTabs" color="white" />
            
            <Block title="Event & Schedule Management" description="Manage matches, practices, and events with automated notifications and attendance tracking." noBodyPadding>
                <template #actions>
                    <USelect default-value="All Teams" :items="['All Teams', 'Team A', 'Team B', 'Team C']" size="lg" class="w-full lg:w-58" />
                    <USelect default-value="Event Calendar" :items="['Event Calendar', 'Training A', 'Training B', 'Training C']" size="lg" class="w-full lg:w-58" />
                    <UButton label="Create Event" icon="i-lucide-plus" size="lg" @click="open=true" />
                </template>
            </Block>

            <Grid :md="2" :lg="3" :gap="4">
                <UCard :ui="{ body: 'sm:p-4 space-y-6' }" v-for="n in 5">
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <div class="flex items-center gap-2">
                                <div class="font-semibold text-default">
                                    Championship Finals
                                </div>
                                <UBadge label="Match" size="sm" />
                            </div>
                            <div class="text-dimmed text-xs">
                                Youth Basketball
                            </div>
                        </div>
                        <UDropdownMenu :items="actions" :content="{
                            align: 'end',
                            side: 'bottom',
                            sideOffset: 8
                        }" size="sm">
                            <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis-vertical" size="sm" />
                        </UDropdownMenu>
                    </div>
                    <List
                        :items="[
                            { icon: 'i-lucide-calendar', text: '1/15/2024 3:00PM' },
                            { icon: 'i-lucide-map-pin', text: 'Main Sports Hall' },
                            { icon: 'i-lucide-users', text: '15 invited' },
                            { icon: 'i-lucide-bell', text: 'Notifications: Email, In-App' }
                        ]"
                        :ui="{
                            item: 'gap-2',
                            icon: 'size-4'
                        }"
                    />

                    <div class="text-sm text-muted">
                        Final match of the season championship
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
        </Page>
    </div>

    <UModal v-model:open="open" title="Create New Event" description="Schedule a new match, practice session, or team event" :ui="{ body: 'space-y-6', footer: 'gap-2 justify-end' }" class="min-w-4xl">
        <template #body>
            <div class="flex gap-4">
                <UFormField label="Event Title" size="lg" class="w-full">
                    <UInput placeholder="e.g., Championship Finals" class="w-full" />
                </UFormField>
                <UFormField label="Event Type" size="lg" class="w-full">
                    <USelect placeholder="Select type" :items="['Type A', 'Type B', 'Type C']" class="w-full" />
                </UFormField>
            </div>
            <UFormField label="Team" size="lg">
                <USelect placeholder="Select team" :items="['Team A', 'Team B', 'Team C']" class="w-full" />
            </UFormField>
            <div class="flex gap-4">
                <UFormField label="Date" size="lg" class="w-full">
                    <UInput type="date" class="w-full" />
                </UFormField>
                <UFormField label="Time" size="lg" class="w-full">
                    <UInput type="time" class="w-full" />
                </UFormField>
                <UFormField label="Duration (min)" size="lg" class="w-full">
                    <UInput placeholder="Venue/Room" color="neutral" class="w-full" />
                </UFormField>
            </div>
            <UFormField label="Description" size="lg">
                <UTextarea placeholder="Event details, requirements, or special instructions..." class="w-full" />
            </UFormField>
        </template>
        <template #footer="{ close }">
            <UButton label="Cancel" size="lg" variant="ghost" color="neutral" @click="close" />
            <UButton label="Create Event" icon="i-lucide-save" size="lg" @click="create" />
        </template>
    </UModal>
</template>
<script setup lang="ts">
import { talentStatCards, teamManagementTabs } from '~/data';
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

const toast = useToast()

function create() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    icon: 'i-lucide-save'
  })
  open.value = false
}
</script>