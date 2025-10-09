<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-38 sm:h-44 lg:h-38" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Reports & Analytics" description="Generate comprehensive reports, export data, and analyze performance trends" inverted>
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block>
                <ComingSoon />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, teamManagementTabs } from '~/data';
</script>