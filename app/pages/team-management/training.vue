<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-98 lg:h-51" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Team Management" description="Create and manage teams, assign members, and configure roles for your sports analytics platform." inverted>
            <Tabs :items="teamManagementTabs" color="white" />
            
            <Block title="Training Plan Management" description="Manage matches, practices, and events with automated notifications and attendance tracking." noBodyPadding>
                <template #actions>
                    <USelect default-value="All Teams" :items="['All Teams', 'Team A', 'Team B', 'Team C']" size="lg" class="w-full lg:w-58" />
                    <USelect default-value="Training Schedule" :items="['Training Schedule', 'Training A', 'Training B', 'Training C']" size="lg" class="w-full lg:w-58" />
                    <UButton label="Create Training Plan" icon="i-lucide-plus" size="lg" @click="open=true" />
                </template>
            </Block>

            <UCard v-for="n in 2">
                <header class="flex items-start">
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-default">
                                Speed & Agility Training
                            </span>
                            <UBadge label="Completed" color="success" size="sm" />
                        </div>
                        <ul class="*:text-xs *:text-dimmed flex items-center mt-1 *:[:not(:last-child)]:after:content-['•'] *:[:not(:last-child)]:after:mx-2">
                            <li>Youth Basketball</li>
                            <li>Team Training</li>
                        </ul>
                    </div>
                    <List
                        horizontal
                        :items="[
                            { icon: 'i-lucide-calendar', text: '1/15/2024' },
                            { icon: 'i-lucide-clock', text: '14:00 (90min)' },
                            { icon: 'i-lucide-users', text: '10/12 completed' }
                        ]"
                        :ui="{
                            wrapper: 'bg-gradient-to-l from-slate-100 py-2 px-3 rounded-md',
                            icon: 'size-3',
                            text: 'text-xs'
                        }"
                    />
                </header>
                <section class="mt-8">
                    <div class="font-semibold text-sm text-default">
                        Description & Objectives
                    </div>
                    <div class="flex items-center gap-2 mt-2">
                        <UBadge label="Improve 40m sprint time" icon="i-lucide-target" color="neutral" variant="subtle" />
                        <UBadge label="Enhance lateral movement" icon="i-lucide-target" color="neutral" variant="subtle" />
                    </div>
                </section>
                <section class="mt-8">
                    <div class="font-semibold text-sm text-default">
                        Drills & Exercises
                    </div>
                    <div class="flex gap-4 mt-2">
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
                </section>
                <section class="mt-8">
                    <div class="text-dimmed text-xs">
                        Completion Rate
                    </div>
                    <div class="flex items-center gap-2">
                        <UProgress :model-value="81" />
                        <span class="text-xs text-muted">81%</span>
                    </div>
                </section>
            </UCard>
        </Page>
    </div>
    <UModal v-model:open="open" title="Create Training Plan" description="Design a custom training session with specific drills and goals" :ui="{ body: 'space-y-6', footer: 'gap-2 justify-end' }" class="min-w-4xl">
        <template #body>
            <div class="flex gap-4">
                <UFormField label="Session Title" size="lg" class="w-full">
                    <UInput placeholder="e.g., Speed & Agility Training" class="w-full" />
                </UFormField>
                <UFormField label="Team" size="lg" class="w-full">
                    <USelect placeholder="Select team" :items="['Team A', 'Team B', 'Team C']" class="w-full" />
                </UFormField>
            </div>
            <div class="flex gap-4">
                <UFormField label="Date" size="lg" class="w-full">
                    <UInput type="date" class="w-full" />
                </UFormField>
                <UFormField label="Time" size="lg" class="w-full">
                    <UInput type="time" class="w-full" />
                </UFormField>
                <UFormField label="Duration (min)" size="lg" class="w-full">
                    <UInputNumber :default-value="0" color="neutral" class="w-full" />
                </UFormField>
            </div>
            <UFormField label="Training Type" size="lg">
                <USelect placeholder="Select type" :items="['Type A', 'Type B', 'Type C']" class="w-full" />
            </UFormField>
            <UFormField label="Training Goals" size="lg">
                <UTextarea placeholder="e.g., Improve speed, build endurance, etc..." class="w-full" />
            </UFormField>
            <UFormField label="Drills & Exercises" size="lg" :ui="{ container: 'flex gap-4' }" class="w-full">
                <UInput placeholder="Exercise Name" class="w-full" />
                <UInput placeholder="Duration" class="w-full" />
                <UButton label="Add" icon="i-lucide-plus" color="neutral" />
            </UFormField>
        </template>
        <template #footer="{ close }">
            <UButton label="Cancel" size="lg" variant="ghost" color="neutral" @click="close" />
            <UButton label="Create Schedule" icon="i-lucide-save" size="lg" @click="create" />
        </template>
    </UModal>
</template>
<script setup lang="ts">
import { teamManagementTabs } from '~/data';
const open = ref(false)

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