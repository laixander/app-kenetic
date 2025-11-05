<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Benchmarking" description="Establish and compare performance norms across athletes and demographics" inverted>
            <Tabs :items="benchmarkingTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in benchmarkStatCards" :key="i" v-bind="card" countSize="text-xl" hasDetails />
            </Grid>

            <Block title="Recent Benchmarks" description="Latest performance benchmarks and their status">
                <div class="flex gap-2">
                    <USelect placeholder="Select sport" size="lg" class="w-full" :items="[ 'Basketball', 'Soccer', 'Tennis', 'Volleyball' ]" />
                    <USelect placeholder="Select performance metric" size="lg" class="w-full" :items="[ 'Elite Norms 2025', 'Youth Standard', 'Collegiate Level','Professional Benchmark' ]" />
                    <USelect placeholder="Select age group" size="lg" class="w-full" :items="[ 'Group A', 'Group B', 'Group C','Group D' ]" />
                    <UButton label="Reset" icon="i-lucide-refresh-cw" size="lg" color="neutral" variant="outline" />
                    <UButton label="Apply Filter" size="lg" color="neutral" />
                </div>
                <div class="py-4 space-y-4">
                    <UCard v-for="n in 5" :ui="{body: 'sm:p-4 flex justify-between items-center'}">
                        <div class="grid md:flex items-center md:justify-between w-full gap-2">
                            <div class="grid w-full">
                                <span class="font-semibold text-sm tex-default">Elite Basketball - Vertical Jump</span>
                                <ul class="*:text-xs *:text-dimmed flex items-center mt-1 *:[:not(:last-child)]:after:content-['•'] *:[:not(:last-child)]:after:mx-2">
                                    <li>Basketball</li>
                                    <li>Vertical Jump</li>
                                    <li>156 athletes</li>
                                </ul>
                            </div>
                            <div class="grid w-full">
                                <span class="text-xs text-dimmed">Status</span>
                                <span><UBadge label="active" color="success" size="sm" /></span>
                            </div>
                            <div class="grid w-full">
                                <span class="text-xs text-dimmed">Date Updated</span>
                                <span class="text-sm text-default font-medium">2025-01-15</span>
                            </div>
                            <div>
                                <UButton label="View" color="neutral" variant="outline" icon="i-lucide-eye" size="sm" />
                            </div>
                        </div>
                    </UCard>
                </div>
                <UPagination :total="100" class="flex justify-center" />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { benchmarkStatCards, benchmarkingTabs } from '~/data';
</script>