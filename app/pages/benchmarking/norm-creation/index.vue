<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-100 sm:h-102 lg:h-54" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Benchmarking"
            description="Establish and compare performance norms across athletes and demographics" inverted>
            <Tabs :items="benchmarkingTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Norm Creation Wizard"
                description="Create performance norms using historical datasets and statistical models"
                icon="i-lucide-wand-sparkles">
                <template #actions>
                    <UButton label="Download Template" icon="i-lucide-file-spreadsheet" variant="outline" size="lg"
                        color="success" class="justify-center" />
                    <USeparator orientation="vertical" class="mx-1 h-auto hidden md:block" />
                    <UTooltip text="It should be a .csv file with appropriate headers" arrow :content="{
                        align: 'center',
                        side: 'top',
                        sideOffset: 8
                    }">
                        <UButton label="Upload Dataset" icon="i-lucide-upload" variant="outline" size="lg"
                        color="neutral" class="justify-center" />
                    </UTooltip>
                    <UButton label="Create Dataset" icon="i-lucide-pen-line" size="lg" to="norm-creation/create" class="justify-center" />
                </template>

                <!-- component -->
                <UCard v-for="(dataset, index) in [
                    { title: 'Endurance Test', description: 'Benchmark for long-distance running performance', inputs: ['VO2 Max', 'Heart Rate', 'Stamina'], status: 'saved' },
                    { title: 'Strength Assessment', description: 'Benchmark for overall muscular strength', inputs: ['Bench Press', 'Squat', 'Deadlift'], status: 'saved' },
                    { title: 'Flexibility Measure', description: 'Benchmark for joint flexibility and range of motion', inputs: ['Sit and Reach', 'Shoulder Flexibility'], status: 'draft' },
                    { title: 'Agility Drill', description: 'Benchmark for quickness and change of direction', inputs: ['T-Test', 'Pro Agility Shuttle'], status: 'saved' },
                    { title: 'Speed Test', description: 'Benchmark for sprinting speed', inputs: ['40-Yard Dash', '100-Meter Sprint'], status: 'draft' }
                ]" :key="index" :ui="{ body: 'sm:p-4 grid md:flex justify-between gap-8' }" :class="[
                    'transition-all duration-300 border-l-8',
                    selected[index] ? 'border-l-primary bg-primary/5' : 'border-l-transparent'
                ]">
                    <div class="flex items-center gap-4 -ml-1">
                        <div class="flex justify-center items-center bg-primary-100 w-10 h-10 rounded-xl">
                            <UIcon name="i-lucide-activity" class="text-xl text-primary" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <span class="font-semibold text-default text-sm">{{ dataset.title }}</span>
                            <span class="text-xs text-muted">{{ dataset.description }}</span>
                            <div class="flex gap-1 pt-2">
                                <UBadge v-for="(input, i) in dataset.inputs" :key="i" :label="input" color="neutral"
                                    variant="subtle" />
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <template v-if="dataset.status === 'saved'">
                            <USwitch v-model="selected[index]" label="Set as default" />
                            <USeparator orientation="vertical" class="h-5" />
                            <UButton label="View Details" trailing-icon="i-lucide-file-text" variant="link" class="justify-center p-0" to="norm-creation/details" />
                        </template>
                        <template v-else-if="dataset.status === 'draft'">
                            <UBadge label="Draft" icon="i-lucide-drafting-compass" variant="soft" color="success" />
                            <USeparator orientation="vertical" class="h-5" />
                            <UButton label="Continue" trailing-icon="i-lucide-edit" variant="link" color="warning" class="justify-center p-0" />
                        </template>
                    </div>
                </UCard>

                <UPagination v-model:page="page" :total="100" class="flex justify-center mt-6" />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, benchmarkingTabs, athletes } from '~/data';
import { ref } from 'vue'
import { UIcon } from '#components';
const selected = ref<boolean[]>([])
const page = ref(1)
</script>