<script setup lang="ts">
import { UIcon } from '#components';
import Grid from '~/components/global/Grid.vue';
import Page from '~/components/global/Page.vue';
import StatCard from '~/components/global/StatCard.vue';
import { dataStatCards } from '~/data';

const items = [
    {
      label: 'Assessment Forms',
      icon: 'i-lucide-book-open',
      to: '/data-collection',
      active: true
    },
    {
      label: 'Device Management',
      icon: 'i-lucide-database',
      to: '/data-collection/device-management'
    },
    {
      label: 'Live Data',
      icon: 'i-lucide-box',
      to: '/data-collection/live-data'
    }
]
</script>
<template>
    <div class="relative min-h-screen">
        <div class="absolute h-55 inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-indigo-900 dark:to-blue-900"></div>
        <Page title="Data Collection" description="Collect and manage sports performance data" inverted>
            <nav class="flex space-x-4" aria-label="Tabs">
                <NuxtLink
                    v-for="item in items"
                    :key="item.label"
                    :to="item.to"
                    :class="['px-3 py-2 font-medium text-sm rounded-md flex items-center', item.active ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/20']"
                >
                    <UIcon :name="item.icon" class="size-5 mr-2" />
                    {{ item.label }}
                </NuxtLink>
            </nav>
            <Grid :lg="3" :gap="4">
                <StatCard
                    v-for="(card, i) in dataStatCards"
                    :key="i"
                    v-bind="card"
                />
            </Grid>

            <Block
                icon="i-lucide-clipboard-list"
                iconColor="blue"
                title="Data Forms"
                description="Choose the type of assessment you want to complete"
            >
                <Grid :lg="3" :gap="4">
                    <div class="w-full p-5 bg-blue-50 rounded-lg border border-blue-200 inline-flex justify-start items-start gap-4">
                        <div class="size- p-2 bg-blue-100 rounded-lg">
                            <UIcon name="i-lucide-ruler" class="size-5 text-blue-600 flex" />
                        </div>
                        <div class="flex-1 space-y-2">
                            <div class="text-default font-semibold">Physical Assessment</div>
                            <div class="text-sm text-muted">Body measurements, biometric data, and physical condition</div>
                            <div class="self-stretch h-5 inline-flex justify-start items-center gap-2">
                            <div class="flex justify-start items-center gap-2">
                                <UIcon name="i-lucide-clock" class="size-4 text-dimmed flex" />
                                <div class="text-sm text-muted">15 mins</div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full p-5 bg-green-50 rounded-lg border border-green-200 inline-flex justify-start items-start gap-4">
                        <div class="size- p-2 bg-green-100 rounded-lg">
                            <UIcon name="i-lucide-ruler" class="size-5 text-green-600 flex" />
                        </div>
                        <div class="flex-1 space-y-2">
                            <div class="text-default font-semibold">Physical Assessment</div>
                            <div class="text-sm text-muted">Body measurements, biometric data, and physical condition</div>
                            <div class="self-stretch h-5 inline-flex justify-start items-center gap-2">
                            <div class="flex justify-start items-center gap-2">
                                <UIcon name="i-lucide-clock" class="size-4 text-dimmed flex" />
                                <div class="text-sm text-muted">15 mins</div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full p-5 bg-violet-50 rounded-lg border border-violet-200 inline-flex justify-start items-start gap-4">
                        <div class="size- p-2 bg-violet-100 rounded-lg">
                            <UIcon name="i-lucide-ruler" class="size-5 text-violet-600 flex" />
                        </div>
                        <div class="flex-1 space-y-2">
                            <div class="text-default font-semibold">Physical Assessment</div>
                            <div class="text-sm text-muted">Body measurements, biometric data, and physical condition</div>
                            <div class="self-stretch h-5 inline-flex justify-start items-center gap-2">
                            <div class="flex justify-start items-center gap-2">
                                <UIcon name="i-lucide-clock" class="size-4 text-dimmed flex" />
                                <div class="text-sm text-muted">15 mins</div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full p-5 bg-orange-50 rounded-lg border border-orange-200 inline-flex justify-start items-start gap-4">
                        <div class="size- p-2 bg-orange-100 rounded-lg">
                            <UIcon name="i-lucide-ruler" class="size-5 text-orange-600 flex" />
                        </div>
                        <div class="flex-1 space-y-2">
                            <div class="text-default font-semibold">Physical Assessment</div>
                            <div class="text-sm text-muted">Body measurements, biometric data, and physical condition</div>
                            <div class="self-stretch h-5 inline-flex justify-start items-center gap-2">
                            <div class="flex justify-start items-center gap-2">
                                <UIcon name="i-lucide-clock" class="size-4 text-dimmed flex" />
                                <div class="text-sm text-muted">15 mins</div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full p-5 bg-pink-50 rounded-lg border border-pink-200 inline-flex justify-start items-start gap-4">
                        <div class="size- p-2 bg-pink-100 rounded-lg">
                            <UIcon name="i-lucide-ruler" class="size-5 text-pink-600 flex" />
                        </div>
                        <div class="flex-1 space-y-2">
                            <div class="text-default font-semibold">Physical Assessment</div>
                            <div class="text-sm text-muted">Body measurements, biometric data, and physical condition</div>
                            <div class="self-stretch h-5 inline-flex justify-start items-center gap-2">
                            <div class="flex justify-start items-center gap-2">
                                <UIcon name="i-lucide-clock" class="size-4 text-dimmed flex" />
                                <div class="text-sm text-muted">15 mins</div>
                            </div>
                            </div>
                        </div>
                    </div>
                </Grid>

            </Block>
        </Page>
    </div>
</template>