<script setup lang="ts">
import { dataStatCards, dataCollectionTabs } from '~/data';
</script>
<template>
    <div class="relative min-h-screen">
        <Banner />
        <Page title="Data Collection" description="Collect and manage sports performance data" inverted>
            <Tabs :items="dataCollectionTabs" color="white" />
            
            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block icon="i-lucide-webcam" iconColor="blue" title="Device Testing"
                description="Conduct live tests and assessments using connected devices">
                <template #actions>
                    <UButton label="Add Device" icon="i-lucide-plus" size="lg" to="/data-collection/form-builder" />
                </template>
            </Block>
        </Page>
    </div>
</template>