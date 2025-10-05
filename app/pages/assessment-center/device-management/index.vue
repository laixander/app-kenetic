<script setup lang="ts">
import { UIcon, USwitch, UChip, UButton } from '#components';
import { dataStatCards, dataCollectionTabs, devices } from '~/data';
import type { CardProps } from '~/types/models'

const props = defineProps<{
    card: CardProps & {
        highlights: {
            status: 'Connected' | 'Calibrating' | 'Disconnected'
            signal: number
            battery: number
        }
    }
}>()

// ✅ Status color (for UChip)
const statusColor = (status: string) => {
    switch (status) {
        case 'Connected': return 'success'
        case 'Calibrating': return 'warning'
        case 'Disconnected': return 'error'
        default: return 'neutral'
    }
}

// ✅ Signal helpers
const signalColor = (val: number) => {
    if (val >= 70) return 'text-success'
    if (val >= 40) return 'text-warning'
    return 'text-error'
}
const signalIcon = (val: number) => {
    if (val >= 70) return 'i-lucide-signal'
    if (val >= 40) return 'i-lucide-signal-medium'
    return 'i-lucide-signal-zero'
}

// ✅ Battery helpers
const batteryColor = (val: number) => {
    if (val >= 70) return 'text-success'
    if (val >= 40) return 'text-warning'
    return 'text-error'
}
const batteryIcon = (val: number) => {
    if (val >= 70) return 'i-lucide-battery-full'
    if (val >= 40) return 'i-lucide-battery-medium'
    return 'i-lucide-battery-low'
}

// reactive toggle states
const deviceStatuses = ref<Record<number, boolean>>(
    Object.fromEntries(
        devices.map(card => [
            card.id,
            card.highlights.status === 'Connected'
        ])
    )
)

function toggleStatus(id: number, value: boolean) {
    const card = devices.find(c => c.id === id)
    if (!card) return

    deviceStatuses.value[id] = value

    // only toggle between Connected/Disconnected
    card.highlights.status = value ? 'Connected' : 'Disconnected'
}
</script>

<template>
    <div class="relative overflow-y-auto">
        <Banner />
        <Page title="Data Collection" description="Collect and manage sports performance data" inverted>
            <Tabs :items="dataCollectionTabs" color="white" />

            <Grid :lg="3" :gap="4">
                <StatCard v-for="(card, i) in dataStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block icon="i-lucide-monitor-cog" iconColor="blue" title="Overview"
                description="Monitor and control connected sports equipment and sensors">
                <template #actions>
                    <UButton label="Sync All Devices" icon="i-lucide-refresh-cw" size="lg" variant="outline"
                        color="neutral" @click="console.log('Sync All Devices')" />
                    <UButton label="Add Device" icon="i-lucide-plus" size="lg" to="/data-collection/form-builder" />
                </template>

                <Grid :lg="3" :gap="4">
                    <Card v-for="card in devices" :key="card.id" :icon="card.icon" :tags="card.tags">
                        <template #actions>
                            <USwitch v-if="card.highlights.status !== 'Calibrating'" v-model="deviceStatuses[card.id]"
                                color="neutral" @update:model-value="(val: any) => toggleStatus(card.id, val)" />

                            <!-- Show disabled switch if Calibrating -->
                            <USwitch v-else color="neutral" :model-value="false" disabled />
                        </template>

                        <template #description>
                            <div class="font-semibold text-default mt-2">
                                {{ card.description.title }}
                            </div>
                            <div class="text-sm text-muted">
                                {{ card.description.details }}
                            </div>
                        </template>

                        <template #highlights>
                            <div v-if="card.highlights"
                                class="flex justify-between items-center mt-4 py-2 px-4 bg-muted rounded">
                                <!-- Status -->
                                <div class="flex items-center gap-2">
                                    <UChip size="sm" :color="statusColor(card.highlights.status)" />
                                    <span class="text-sm" :class="`text-${statusColor(card.highlights.status)}`">{{
                                        card.highlights.status }}</span>
                                </div>

                                <!-- Signal + Battery -->
                                <div v-if="card.highlights.status == 'Connected'" class="flex items-center gap-4">
                                    <!-- Signal -->
                                    <div class="flex items-center gap-2">
                                        <UIcon :name="signalIcon(card.highlights.signal)" class="size-4 flex"
                                            :class="signalColor(card.highlights.signal)" />
                                        <span class="text-sm" :class="signalColor(card.highlights.signal)">
                                            {{ card.highlights.signal }}%
                                        </span>
                                    </div>
                                    <!-- Battery -->
                                    <div class="flex items-center gap-2">
                                        <UIcon :name="batteryIcon(card.highlights.battery)" class="size-4 flex"
                                            :class="batteryColor(card.highlights.battery)" />
                                        <span class="text-sm" :class="batteryColor(card.highlights.battery)">
                                            {{ card.highlights.battery }}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #footer>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-lucide-refresh-cw" class="size-4 text-dimmed" />
                                    <span class="text-sm text-muted">{{ card.lastSynced }}</span>
                                </div>
                                <span class="text-sm text-muted">v{{ card.version }}</span>
                            </div>
                        </template>
                    </Card>
                </Grid>
            </Block>

        </Page>
    </div>
</template>
