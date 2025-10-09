<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-38 sm:h-44 lg:h-38" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Athlete Management" description="Track athlete performance and fitness metrics" inverted>
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
import { talentStatCards } from '~/data';
</script>