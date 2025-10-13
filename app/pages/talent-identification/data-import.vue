<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-101 sm:h-103 lg:h-54" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Talent Identification" description="AI-powered sport suitability prediction and student potential assessment" inverted>
            <Tabs :items="talentTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Grid :lg="2" :gap="4">
                <Block title="Available Data Sources" description="Connect and manage your fitness data sources">

                    <!-- component -->
                    <UCard v-for="n in 3" :ui="{ body: 'sm:p-4' }">
                        <div class="flex items-center gap-3">
                            <UAvatar icon="i-lucide-activity" size="3xl" />
                            <div class="flex flex-col gap-1 flex-1">
                                <span class="font-semibold text-default text-sm">KEISER Strength Equipment</span>
                                <div class="flex flex-wrap items-center gap-2">
                                    <UBadge label="Hardware" variant="soft" size="sm" color="amber" />
                                    <span class=" text-xs text-dimmed">1247 records</span>
                                    <div class="flex items-center gap-1 text-dimmed">
                                        <UIcon name="i-lucide-refresh-cw" class="size-3 shrink-0" />
                                        <span class="text-xs">2024-01-15 14:30</span>
                                    </div>
                                </div>
                            </div>
                            <UBadge label="Connected" icon="i-lucide-plug-2" size="sm" color="success" />
                            <UButton label="Sync" icon="i-lucide-refresh-cw" variant="outline" color="neutral" size="sm" />
                        </div>
                    </UCard>

                </Block>
                <Block title="Data Import & Integration" description="Import fitness data from various sources including strength testers and fitness software">
                    <UTabs :items="items" variant="link" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
                        <template #file="{ item }">
                            <UFileUpload
                                position="inside"
                                layout="list"
                                multiple
                                label="Drop your file here"
                                description="CSV/Excel (max. 2MB)"
                                class="w-full"
                                :ui="{
                                    base: 'min-h-50'
                                }"
                            />
                        </template>
                        <template #api="{ item }">
                            <UFormField label="API Endpoint" size="lg">
                                <UInput placeholder="Enter API endpoint" class="w-full" />
                            </UFormField>
                            <UFormField label="API Key" size="lg" class="mt-4">
                                <UInput placeholder="Enter API key" class="w-full" />
                            </UFormField>
                            <UFormField label="Sync Frequency" size="lg" class="mt-4">
                                <USelect defaultValue="Every Hour" :items="['Every Hour', 'Every Minute', 'Every Second']" class="w-full" />
                            </UFormField>
                            <USwitch label="Enable automatic import" color="neutral" size="lg" class="mt-4" />
                            <UButton label="Test connection" color="neutral" size="lg" block class="mt-4" />
                        </template>
                        <template #hardware="{ item }">
                            <UFormField label="Equipment Type" size="lg">
                                <USelect placeholder="Select equipment" :items="['Odometer', '...']" class="w-full" />
                            </UFormField>
                            <UFormField label="Connection Method" size="lg" class="mt-4">
                                <USelect placeholder="Wi-Fi Network" :items="['SM Free Wifi', '...']" class="w-full" />
                            </UFormField>
                            <UFormField label="Device IP Address" size="lg" class="mt-4">
                                <UInput placeholder="192.168.1.100" class="w-full" />
                            </UFormField>
                            <UButton label="Connect device" color="neutral" size="lg" block class="mt-4" />
                        </template>
                    </UTabs>
                </Block>
            </Grid>

            <Block title="Recent Imports" description="History of imported fitness data">

                <!-- component -->
                <UCard v-for="n in 3" :ui="{ body: 'sm:p-4 flex justify-between' }">
                    <div class="flex flex-col gap-1">
                        <span class="font-semibold text-default text-sm">KEISER Equipment - Station 3</span>
                        <ul class="text-xs text-dimmed md:flex md:divide-x divide-default md:*:px-2 md:-mx-2">
                            <li>23 students</li>
                            <li>2.4 MB</li>
                            <li>2024-01-15 14:30</li>
                        </ul>
                        <div class="flex gap-1 pt-1">
                            <UBadge label="Leg Press" variant="subtle" color="neutral" size="sm" />
                            <UBadge label="Chest" variant="subtle" color="neutral" size="sm" />
                            <UBadge label="Lat Pull" variant="subtle" color="neutral" size="sm" />
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <UBadge label="Completed" color="success" size="sm" />
                        <UButton label="View" icon="i-lucide-eye" variant="outline" color="neutral" size="sm" />
                        <UButton label="Export" icon="i-lucide-download" variant="outline" color="neutral" size="sm" />
                        <UButton icon="i-lucide-trash-2" variant="outline" color="error" size="sm" />
                    </div>
                </UCard>
                
            </Block>
            
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, talentTabs } from '~/data';
import type { TabsItem } from '@nuxt/ui'
const items = [
  {
    label: 'File Upload',
    icon: 'i-lucide-file-text',
    slot: 'file' as const
  },
  {
    label: 'API Integration',
    icon: 'i-lucide-wifi',
    slot: 'api' as const
  },
  {
    label: 'Hardware Direct',
    icon: 'i-lucide-hard-drive',
    slot: 'hardware' as const
  }
] satisfies TabsItem[]
</script>