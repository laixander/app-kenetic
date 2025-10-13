<template>
    <Page title="Physical Assessment" description="Record comprehensive physical measurements">
        <template #toolbar>
            <UButton label="Back to Assessments" icon="i-lucide-arrow-left" variant="ghost" to="/assessment-center" />
        </template>
        <div class="grid lg:flex items-start gap-4">
            <UCard class="w-full">
                <FormRenderer :form="newForm" />
            </UCard>
            <div class="sticky top-0 lg:max-w-[390px] w-full space-y-2">
                <UCard :ui="{body: 'sm:p-4', footer: 'p-0 sm:px-0 divide-x divide-default flex'}">
                    <ListProfile
                        profile-name="Rebecca Lim"
                        profile-description="Student"
                        profile-photo="https://randomuser.me/api/portraits/women/44.jpg"
                    />
                    <template #footer>
                        <div class="py-4 w-full text-center flex items-center justify-center gap-2">
                            <UIcon name="i-lucide-user" class="size-5 shrink-0 text-muted" />
                            <span class="text-sm text-muted">Female</span>
                        </div>
                        <div class="py-4 w-full text-center flex items-center justify-center gap-2">
                            <UIcon name="i-lucide-cake" class="size-5 shrink-0 text-muted" />
                            <span class="text-sm text-muted">Jan 1, 1990</span>
                        </div>
                    </template>
                </UCard>
                <UCard>
                    <div class="font-semibold text-default">
                        Assessment Progress
                    </div>
                    <UProgress v-model="value" status class="mb-6" />
                    <ul class="list-disc list-inside text-sm text-muted">
                        <li class="text-primary">Basic Information</li>
                        <li class="text-primary">Body Measurements</li>
                        <li class="text-primary">Skill Assessment</li>
                        <li class="text-primary">Additional Details</li>
                        <li>Preferences</li>
                        <li>Survey</li>
                        <li>Upload Documents</li>
                    </ul>
                </UCard>
                <!-- only show this button when sticky reach top-0 -->
                <UButton label="Save Progress" icon="i-lucide-save" size="lg" variant="outline" block />
                <UButton label="Submit Assessment" icon="i-lucide-check" size="lg" disabled block />
            </div>
        </div>
    </Page>
</template>
<script setup lang="ts">
import { newForm } from '~/data'

const value = ref(65)
</script>