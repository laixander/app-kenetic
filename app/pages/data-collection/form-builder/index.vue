<script setup lang="ts">
import { formBuilderTabs } from '~/data'
</script>
<template>
    <Page title="Form Builder" description="Create and customize data collection forms for sports assessments">
        <template #toolbar>
            <UButton label="Back to Forms" icon="i-lucide-arrow-left" variant="ghost" to="/data-collection" />
        </template>
        <template #actions>
            <Tabs :items="formBuilderTabs" />
        </template>
        <Block></Block>
    </Page>
</template>