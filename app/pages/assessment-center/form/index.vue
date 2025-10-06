<template>
    <Page title="Physical Assessment" description="Record comprehensive physical measurements">
        <template #toolbar>
            <UButton label="Back to Assessments" icon="i-lucide-arrow-left" variant="ghost" to="/assessment-center" />
        </template>
        <div class="grid lg:flex items-start gap-4">
            <UCard class="w-full">
                <FormRenderer :form="newForm" />
            </UCard>
            <UCard class="sticky top-0 lg:max-w-[390px] w-full">
                <div class="font-semibold text-default">
                    Assessment Progress
                </div>
                <UProgress v-model="value" color="success" status class="mb-6" />
                <ul class="list-disc list-inside text-sm text-muted">
                    <li class="text-success">Basic Information</li>
                    <li class="text-success">Body Measurements</li>
                    <li class="text-success">Skill Assessment</li>
                    <li class="text-success">Additional Details</li>
                    <li>Preferences</li>
                    <li>Survey</li>
                    <li>Upload Documents</li>
                </ul>
            </UCard>
        </div>
    </Page>
</template>
<script setup lang="ts">
import { newForm } from '~/data'

const value = ref(65)
</script>