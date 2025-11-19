<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-38 sm:h-44 lg:h-50" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page toolbarClass="border-white/20">
            <template #toolbar>
                <UButton label="Back to Profile Management" icon="i-lucide-arrow-left" variant="ghost" class="text-white" to="/profile-management" />
            </template>
                <div class="flex justify-between items-center gap-4">
                    <div class="flex items-center gap-4">
                        <UAvatar src="https://randomuser.me/api/portraits/women/21.jpg" alt="Ava Martinez" size="3xl" />
                        <div class="grid">
                            <div class="flex items-center gap-2">
                                <span class="font-semibold text-lg text-white">Ava Martinez</span>
                                <UBadge
                                    color="violet"
                                    size="sm"
                                >Faculty</UBadge>
                            </div>
                            <span class="text-sm text-white border-s-3 border-lime-400 pl-2">Volleyball</span>
                        </div>
                    </div>
                    <!-- <div class="flex items-center gap-8 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                        <div class="flex items-center gap-2">
                            <div class="relative grid grid-cols-1 grid-rows-1">
                                <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-gray-950/20"></div>
                                <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-cyan-400 mask-conic-from-75% mask-conic-to-75% dark:border-cyan-400"></div>
                                <div class="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
                                    75%
                                </div>
                            </div>
                            <span class="text-white text-sm">Training Consistency</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="relative grid grid-cols-1 grid-rows-1">
                                <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-gray-950/20"></div>
                                <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-lime-400 mask-conic-from-92% mask-conic-to-92% dark:border-lime-400"></div>
                                <div class="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
                                    92%
                                </div>
                            </div>
                            <span class="text-white text-sm">Fitness Level</span>
                        </div>
                    </div> -->
                    <USelect
                        default-value="Physical Assessment"
                        :items="[
                            'Physical Assessment',
                            'Fitness Test',
                            'Strength Test',
                            'Mobility Check',
                            'Endurance Test'
                        ]"
                        size="lg"
                        :ui="{ base: 'bg-white/10 backdrop-blur-sm text-white ring-white/20' }"
                        class="min-w-52"
                    />

                </div>
            <Grid :lg="4" :gap="4">
                <Block>
                    <ComingSoon />
                </Block>
                <GridSpan :lg="3">
                    <div class="flex flex-col gap-4">
                        <Block title="Recommended Sports" description="Your top matches based on performance analysis" icon="i-lucide-sparkles" icon-color="violet"  bgClass="bg-[radial-gradient(circle_at_0%_100%,rgba(142,81,255,0.15),transparent_40%)]">
                            <Grid :lg="3" :gap="4">
                                <div class="flex items-center gap-2 border border-cyan-200 bg-cyan-50 dark:border-cyan-600/50 dark:bg-cyan-900/20 rounded-lg p-4 overflow-hidden relative">
                                    <div class="relative grid grid-cols-1 grid-rows-1">
                                        <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-white dark:border-gray-800"></div>
                                        <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-cyan-400 dark:border-cyan-300 mask-conic-from-98% mask-conic-to-98%"></div>
                                        <div class="absolute inset-0 flex items-center justify-center text-xs font-semibold dark:text-gray-200">
                                            98%
                                        </div>
                                    </div>
                                    <span class="text-sm font-bold dark:text-gray-100">Running</span>
                                    <UIcon name="i-lucide-lab-sneaker" class="text-cyan-100 dark:text-cyan-500/40 size-20 shrink-0 absolute right-2 -bottom-2" />
                                </div>

                                <div class="flex items-center gap-2 border border-amber-200 bg-amber-50 dark:border-amber-600/50 dark:bg-amber-900/20 rounded-lg p-4 overflow-hidden relative">
                                    <div class="relative grid grid-cols-1 grid-rows-1">
                                        <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-white dark:border-gray-800"></div>
                                        <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-amber-400 dark:border-amber-300 mask-conic-from-71% mask-conic-to-71%"></div>
                                        <div class="absolute inset-0 flex items-center justify-center text-xs font-semibold dark:text-gray-200">
                                            71%
                                        </div>
                                    </div>
                                    <span class="text-sm font-bold dark:text-gray-100">Table Tennis</span>
                                    <UIcon name="i-lucide-lab-tennis-racket" class="text-amber-100 dark:text-amber-500/40 size-20 shrink-0 absolute right-2 -bottom-2" />
                                </div>

                                <div class="flex items-center gap-2 border border-pink-200 bg-pink-50 dark:border-pink-600/50 dark:bg-pink-900/20 rounded-lg p-4 overflow-hidden relative">
                                    <div class="relative grid grid-cols-1 grid-rows-1">
                                        <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-white dark:border-gray-800"></div>
                                        <div class="col-start-1 row-start-1 size-13 rounded-full border-6 border-pink-400 dark:border-pink-300 mask-conic-from-41% mask-conic-to-41%"></div>
                                        <div class="absolute inset-0 flex items-center justify-center text-xs font-semibold dark:text-gray-200">
                                            41%
                                        </div>
                                    </div>
                                    <span class="text-sm font-bold dark:text-gray-100">Chess</span>
                                    <UIcon name="i-lucide-crown" class="text-pink-100 dark:text-pink-500/40 size-20 shrink-0 absolute right-2 -bottom-2" />
                                </div>

                            </Grid>
                        </Block>
                        <Block>
                            <ComingSoon />
                        </Block>
                    </div>
                </GridSpan>
            </Grid>
        </Page>
    </div>
</template>
<script setup lang="ts">
import ComingSoon from '~/components/global/ComingSoon.vue';
import Grid from '~/components/global/Grid.vue';
import GridSpan from '~/components/global/GridSpan.vue';
import { talentStatCards, teamManagementTabs } from '~/data';
</script>