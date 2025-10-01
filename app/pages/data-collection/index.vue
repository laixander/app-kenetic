<script setup lang="ts">
import FormCard from '~/components/feature/DataCollectionCard.vue';
import InputList from '~/components/feature/DataCollectionInputList.vue'
import InputList2 from '~/components/feature/DataCollectionInputList2.vue'
import UnitList from '~/components/feature/DataCollectionUnitList.vue'
import { dataStatCards, formCards, dataCollectionTabs } from '~/data';
</script>
<template>
    <div class="relative overflow-y-auto">
        <Banner />
        <Page title="Data Collection" description="Collect and manage sports performance data" inverted>
            <!-- <Tabs :items="dataCollectionTabs" color="white" /> -->

            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block icon="i-lucide-clipboard-list" iconColor="blue" title="Data Forms"
                description="Choose the type of assessment you want to complete">
                <template #actions>
                    <UButton label="Create Form" icon="i-lucide-plus" size="lg" to="/data-collection/form-builder" />
                </template>
                <Grid :lg="3" :gap="4">
                    <FormCard v-for="(card, index) in formCards" :key="index" v-bind="card" :actions="[
                        { label: 'Use Form', icon: 'i-lucide-clipboard-list', click: () => console.log('Use Form') },
                        { label: 'Edit', icon: 'i-lucide-pencil', click: () => console.log('Edit') },
                        { label: 'Delete', icon: 'i-lucide-trash', click: () => console.log('Delete') }
                    ]" />
                </Grid>
            </Block>

            <InputList />

            <InputList2 />

            <UnitList />
        </Page>
    </div>
</template>