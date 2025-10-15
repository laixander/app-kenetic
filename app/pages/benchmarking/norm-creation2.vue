<template>
    <div class="relative overflow-y-auto">
        <Banner image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Benchmarking"
            description="Establish and compare performance norms across athletes and demographics" inverted>
            <Tabs :items="benchmarkingTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Norm Creation Wizard"
                description="Create performance norms using historical datasets and statistical models"
                icon="i-lucide-wand-sparkles" noBodyPadding />

            <Grid :lg="4" :gap="4">
                <GridSpan :lg="3" class="space-y-6">
                    <Block title="1. Select Historical Dataset" description="Choose a dataset to create norms from">
                        <template #actions>
                            <UButton label="Upload New Dataset" icon="i-lucide-upload" variant="outline" color="neutral"
                                size="lg" />
                        </template>
                        <!-- component -->
                        <UCard v-for="(dataset, index) in [
                            { title: 'Elite Basketball 2024', athletes: '245', metrics: '12', duration: 'Jan 2024 - Dec 2024', status: 'High Quality' },
                            { title: 'National Swimming 2023', athletes: '180', metrics: '10', duration: 'Jan 2023 - Dec 2023', status: 'High Quality' },
                            { title: 'Youth Soccer 2022', athletes: '300', metrics: '15', duration: 'Jan 2022 - Dec 2022', status: 'Medium Quality' },
                            { title: 'Regional Volleyball 2021', athletes: '210', metrics: '8', duration: 'Jan 2021 - Dec 2021', status: 'Low Quality' },
                        ]" :key="index" :ui="{ body: 'sm:p-4 flex justify-between' }">
                            <div class="flex flex-col gap-1">
                                <span class="font-semibold text-default text-sm">{{ dataset.title }}</span>
                                <ul class="text-xs text-dimmed md:flex md:divide-x divide-default md:*:px-2 md:-mx-2">
                                    <li>{{ dataset.athletes }} athletes</li>
                                    <li>{{ dataset.metrics }} metrics</li>
                                    <li>{{ dataset.duration }}</li>
                                </ul>
                            </div>

                            <div class="flex items-center gap-2">
                                <UBadge :label="dataset.status" :color="dataset.status === 'High Quality'
                                    ? 'success'
                                    : dataset.status === 'Medium Quality'
                                        ? 'warning'
                                        : dataset.status === 'Low Quality'
                                            ? 'error'
                                            : 'neutral'" size="sm" />
                            </div>
                        </UCard>
                    </Block>

                    <Block title="2. Define Norm Parameters" description="Set parameters for norm calculation">
                        <div class="grid lg:flex gap-4">
                            <UFormField label="Age Group" size="lg" class="flex-1">
                                <USelect defaultValue="All Ages"
                                    :items="['All Ages', 'Under 12', '12-15', '16-18', '18+']" class="w-full" />
                            </UFormField>
                            <UFormField label="Gender" size="lg" class="flex-1">
                                <USelect defaultValue="All Genders"
                                    :items="['All Genders', 'Male', 'Female', 'Non-binary']" class="w-full" />
                            </UFormField>
                            <UFormField label="Performance Metrics" size="lg" class="flex-1">
                                <USelect defaultValue="All Metrics"
                                    :items="['All Metrics', 'Speed', 'Strength', 'Endurance', 'Agility']"
                                    class="w-full" />
                            </UFormField>
                        </div>
                        <USeparator class="my-4" />
                        <UFormField label="Norm Title" size="lg" class="flex-1">
                            <UInput placeholder="Enter norm title" class="w-full" />
                        </UFormField>
                        <UFormField label="Description" size="lg" class="flex-1">
                            <UTextarea placeholder="Describe the purpose and characteristics of these norms" class="w-full" />
                        </UFormField>
                    </Block>

                    <Block title="4. Performance Range Configuration"
                        description="Define thresholds for each performance level across selected metrics">
                        <!-- component -->
                        <div class="divide-y divide-muted *:py-6">
                            <div v-for="(athlete, index) in [
                                { name: 'Vertical Jump', unit: 'cm', icon: 'i-lucide-ruler-dimension-line', excellent: '', good: '', average: '', belowAverage: '', poor: '' },
                                { name: 'Sprint Speed', unit: 'seconds', icon: 'i-lucide-timer', excellent: '', good: '', average: '', belowAverage: '', poor: '' },
                                { name: 'Agility', unit: 'seconds', icon: 'i-lucide-rabbit', excellent: '', good: '', average: '', belowAverage: '', poor: '' },
                                { name: 'Strength', unit: 'index', icon: 'i-lucide-dumbbell', excellent: '', good: '', average: '', belowAverage: '', poor: '' }
                            ]" :key="index" class="first:pt-0 last:pb-0">
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center gap-1">
                                        <UIcon :name="athlete.icon" class="size-5 text-muted" />
                                        <div class="font-semibold text-sm text-default">{{ athlete.name }}</div>
                                    </div>
                                    <UBadge :label="athlete.unit" variant="subtle" size="sm" color="neutral" />
                                </div>
                                <div class="grid lg:flex gap-4 mb-3">
                                    <UFormField size="lg" class="flex-1">
                                        <template #label>
                                            <span class="text-green-500 dark:text-green-300">Excellent</span>
                                        </template>
                                        <UInput v-model="athlete.excellent" placeholder="e.g., 90+" type="number"
                                            class="w-full" />
                                    </UFormField>
                                    <UFormField size="lg" class="flex-1">
                                        <template #label>
                                            <span class="text-blue-500 dark:text-blue-300">Good</span>
                                        </template>
                                        <UInput v-model="athlete.good" placeholder="e.g., 75-89" type="number"
                                            class="w-full" />
                                    </UFormField>
                                    <UFormField size="lg" class="flex-1">
                                        <template #label>
                                            <span class="text-yellow-500 dark:text-yellow-300">Average</span>
                                        </template>
                                        <UInput v-model="athlete.average" placeholder="e.g., 50-74" type="number"
                                            class="w-full" />
                                    </UFormField>
                                    <UFormField size="lg" class="flex-1">
                                        <template #label>
                                            <span class="text-orange-500 dark:text-orange-300">Below Average</span>
                                        </template>
                                        <UInput v-model="athlete.belowAverage" placeholder="e.g., 30-49" type="number"
                                            class="w-full" />
                                    </UFormField>
                                    <UFormField size="lg" class="flex-1">
                                        <template #label>
                                            <span class="text-red-500 dark:text-red-300">Poor</span>
                                        </template>
                                        <UInput v-model="athlete.poor" placeholder="e.g., Below 30" type="number"
                                            class="w-full" />
                                    </UFormField>
                                </div>
                                <div class="rounded-full flex items-center justify-around text-xs font-medium py-0.5 bg-[linear-gradient(to_right,_#dcfce7,_#dbeafe,_#fef9c3,_#ffedd5,_#fee2e2)] dark:bg-[linear-gradient(to_right,_#14532d,_#1e3a8a,_#854d0e,_#9a3412,_#7f1d1d)]">
                                    <span class="text-green-500 dark:text-green-300">Excellent</span>
                                    <span class="text-blue-500 dark:text-blue-300">Good</span>
                                    <span class="text-yellow-500 dark:text-yellow-300">Average</span>
                                    <span class="text-orange-500 dark:text-orange-300">Below Average</span>
                                    <span class="text-red-500 dark:text-red-300">Poor</span>
                                </div>
                            </div>
                        </div>
                    </Block>

                    <Block title="4. Review & Generate Norms" description="Confirm selections and generate norms">
                        <div class="flex flex-col gap-4">
                            <UAlert variant="subtle" color="info">
                                <template #description>
                                    <div class="text-sm text-highlighted">
                                        You have selected the <span class="font-semibold">Elite Basketball 2024</span>
                                        dataset with the following parameters:
                                    </div>
                                    <ul class="mt-2 space-y-1 text-sm text-highlighted">
                                        <li>• Age Group: <span class="font-semibold">All Ages</span></li>
                                        <li>• Gender: <span class="font-semibold">All Genders</span></li>
                                        <li>• Performance Metrics: <span class="font-semibold">All Metrics</span></li>
                                    </ul>
                                    <div class="mt-2 text-sm text-highlighted">
                                        Click "Generate Norms" to start the norm creation process. This may take a few
                                        minutes.
                                    </div>
                                </template>
                            </UAlert>
                            <UButton label="Generate Norms" icon="i-lucide-check-circle" variant="outline"
                                color="primary" size="lg" class="self-end" />
                        </div>
                    </Block>
                </GridSpan>
                <!-- <Block title="Step 1: Data Selection" description="Choose datasets to include in norm creation">
                    <div class="p-4 border-2 border-dashed border-muted rounded-lg text-center text-sm text-muted">
                        <UIcon name="i-lucide-database" class="size-6 mx-auto mb-2" />
                        <p>Select datasets from your existing data sources or upload new data files.</p>
                        <UButton label="Select Datasets" icon="i-lucide-database" variant="outline" color="primary" size="sm" class="mt-4" />
                    </div>
                </Block>
                <Block title="Step 2: Define Parameters" description="Set parameters for norm calculation">
                    <div class="p-4 border-2 border-dashed border-muted rounded-lg text-center text-sm text-muted">
                        <UIcon name="i-lucide-sliders" class="size-6 mx-auto mb-2" />
                        <p>Specify age groups, gender, and performance metrics to include.</p>
                        <UButton label="Set Parameters" icon="i-lucide-sliders" variant="outline" color="primary" size="sm" class="mt-4" />
                    </div>
                </Block>
                <Block title="Step 3: Review & Generate" description="Review selections and generate norms">
                    <div class="p-4 border-2 border-dashed border-muted rounded-lg text-center text-sm text-muted">
                        <UIcon name="i-lucide-check-circle" class="size-6 mx-auto mb-2" />
                        <p>Confirm your selections and start the norm generation process.</p>
                        <UButton label="Generate Norms" icon="i-lucide-check-circle" variant="outline" color="primary" size="sm" class="mt-4" />
                    </div>
                </Block> -->
            </Grid>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, benchmarkingTabs, athletes } from '~/data';
</script>