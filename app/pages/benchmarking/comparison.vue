<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Benchmarking" description="Establish and compare performance norms across athletes and demographics" inverted>
            <Tabs :items="benchmarkingTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <UTabs :items="items" color="indigo" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
                <template #individual="{ item }">
                    Individual
                </template>
                <template #team="{ item }">
                    Team
                </template>
            </UTabs>

            <Block>
                <ComingSoon />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, benchmarkingTabs } from '~/data';
import type { TabsItem } from '@nuxt/ui'

const items = [
  {
    label: 'Individual',
    icon: 'i-lucide-user',
    slot: 'individual' as const
  },
  {
    label: 'Team',
    icon: 'i-lucide-lock',
    slot: 'team' as const
  }
] satisfies TabsItem[]

</script>