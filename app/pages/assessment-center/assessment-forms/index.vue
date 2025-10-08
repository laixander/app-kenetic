<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Assessments" description="Record and track raw athletic performance data" inverted>

            <Tabs :items="assessmentTabs" color="white" />

            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block icon="i-lucide-clipboard-list" iconColor="blue" title="Data Forms"
                description="Choose the type of assessment you want to complete">
                <template #actions>
                    <UButton label="Add New Form" icon="i-lucide-plus" size="lg" to="/assessment-center/assessment-forms/form-builder" class="justify-center w-full" />
                </template>
                <Grid :lg="3" :gap="4">
                    <FormCard v-for="(card, index) in formCards" :key="index" v-bind="card" :actions="[
                        { label: 'Use Form', icon: 'i-lucide-clipboard-list', click: () => console.log('Use Form') },
                        { label: 'Edit', icon: 'i-lucide-pencil', click: () => console.log('Edit') },
                        { label: 'Delete', icon: 'i-lucide-trash', click: () => console.log('Delete') }
                    ]" />
                </Grid>
            </Block>

            <InputManagement />

            <UnitManagement />
            
        </Page>
    </div>
</template>
<script setup lang="ts">
import FormCard from '~/components/feature/DataCollectionCard.vue';
import InputManagement from '~/components/feature/InputManagement.vue'
import UnitManagement from '~/components/feature/UnitManagement.vue'
import { dataStatCards, formCards, assessmentTabs } from '~/data';
</script>