<script setup lang="ts">
import InfoCard from '~/components/feature/DataCollectionFormCard.vue';
import { dataStatCards, infoCards, dataCollectionTabs } from '~/data';
</script>
<template>
    <div class="relative min-h-screen">
        <div
            class="absolute h-54 inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-indigo-900 dark:to-blue-900">
        </div>
        <Page title="Data Collection" description="Collect and manage sports performance data" inverted>
            <Tabs :items="dataCollectionTabs" color="white" />

            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block icon="i-lucide-clipboard-list" iconColor="blue" title="Data Forms"
                description="Choose the type of assessment you want to complete">
                <template #actions>
                    <UButton label="Create Form" icon="i-lucide-plus" size="lg" to="/data-collection/form-builder" />
                </template>
                <Grid :lg="3" :gap="4">
                    <InfoCard 
                        v-for="(card, index) in infoCards" :key="index" v-bind="card"
                        :actions="[
                            { label: 'View Details', icon: 'i-lucide-eye', click: () => console.log('View Details') },
                            { label: 'Edit', icon: 'i-lucide-pencil', click: () => console.log('Edit') },
                            { label: 'Delete', icon: 'i-lucide-trash', click: () => console.log('Delete') }
                        ]"
                     />
                </Grid>
            </Block>
        </Page>
    </div>
</template>