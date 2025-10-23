<template>
    <Page title="Endurance Test" description="Benchmark for long-distance running performance">
        <template #toolbar>
            <UButton label="Back to Norm Creation" icon="i-lucide-arrow-left" variant="ghost" to="../norm-creation" />
        </template>
        <UTabs :items="parameters" color="neutral" :ui="{ content: 'space-y-4', trigger: 'grow' }" class="gap-4 w-full">
            <template #overall>
                <UCard v-for="(detail, index) in [
                    { header: 'VO2 Max' },
                    { header: 'Heart Rate' },
                    { header: 'Stamina' }
                ]" :key="index" :ui="{ header: 'flex items-center gap-2', body: 'p-0 sm:p-0' }" class="overflow-x-auto">
                    <template #header>
                        <UIcon name="i-lucide-activity" class="size-5 shrink-0 text-primary" />
                        <span class="font-bold">
                            {{ detail.header }}
                        </span>
                    </template>
                    <table class="w-full table-auto border-collapse">
                        <thead class="bg-muted">
                            <tr class="*:p-4 *:w-1/5 text-left text-sm text-default border-b border-default">
                                <th>Excellent</th>
                                <th>Good</th>
                                <th>Average</th>
                                <th>Below Average</th>
                                <th>Poor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(test, index) in [
                                { excellent: 95, good: 85, average: 75, below: 65, poor: 55 },
                                { excellent: 100, good: 90, average: 80, below: 70, poor: 60 },
                                { excellent: 92, good: 82, average: 72, below: 62, poor: 52 },
                                { excellent: 98, good: 88, average: 78, below: 68, poor: 58 },
                                { excellent: 93, good: 83, average: 73, below: 63, poor: 53 }
                            ]" :key="index"
                                class="*:p-4 text-sm text-muted hover:bg-primary-50 dark:hover:bg-primary-950 border-b border-default last:border-0">
                                <td>{{ test.excellent }}</td>
                                <td>{{ test.good }}</td>
                                <td>{{ test.average }}</td>
                                <td>{{ test.below }}</td>
                                <td>{{ test.poor }}</td>
                            </tr>
                        </tbody>
                    </table>
                </UCard>
            </template>
            <template #gender>
                <UCard :ui="{body:'py-2 sm:py-1 sm:px-4'}">
                    <UAccordion :items="gender" trailing-icon="i-lucide-plus" :ui="{ content: 'p-1 space-y-4 overflow-visible', leadingIcon: 'text-primary' }">
                        <template #content="{ item }">
                            <UCard v-for="(detail, dIndex) in item.details" :key="dIndex"
                                :ui="{ header: 'flex items-center gap-2', body: 'p-0 sm:p-0' }" class="overflow-x-auto mb-4">
                                <template #header>
                                    <UIcon name="i-lucide-activity" class="size-5 shrink-0 text-primary" />
                                    <span class="font-bold">{{ detail.header }}</span>
                                </template>

                                <table class="w-full table-auto border-collapse">
                                    <thead class="bg-muted">
                                        <tr class="*:p-4 *:w-1/5 text-left text-sm text-default border-b border-default">
                                            <th>Excellent</th>
                                            <th>Good</th>
                                            <th>Average</th>
                                            <th>Below Average</th>
                                            <th>Poor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(test, tIndex) in detail.tests" :key="tIndex"
                                            class="*:p-4 text-sm text-muted hover:bg-primary-50 dark:hover:bg-primary-950 border-b border-default last:border-0">
                                            <td>{{ test.excellent }}</td>
                                            <td>{{ test.good }}</td>
                                            <td>{{ test.average }}</td>
                                            <td>{{ test.below }}</td>
                                            <td>{{ test.poor }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </UCard>
                        </template>
                    </UAccordion>
                </UCard>
            </template>
            <template #age>
                <UCard :ui="{body:'py-2 sm:py-1 sm:px-4'}">
                    <UAccordion :items="age" trailing-icon="i-lucide-plus" :ui="{ content: 'p-1 space-y-4 overflow-visible', leadingIcon: 'text-primary' }">
                        <template #content="{ item }">
                            <UCard v-for="(detail, dIndex) in item.details" :key="dIndex"
                                :ui="{ header: 'flex items-center gap-2', body: 'p-0 sm:p-0' }" class="overflow-x-auto mb-4">
                                <template #header>
                                    <UIcon name="i-lucide-activity" class="size-5 shrink-0 text-primary" />
                                    <span class="font-bold">{{ detail.header }}</span>
                                </template>

                                <table class="w-full table-auto border-collapse">
                                    <thead class="bg-muted">
                                        <tr class="*:p-4 *:w-1/5 text-left text-sm text-default border-b border-default">
                                            <th>Excellent</th>
                                            <th>Good</th>
                                            <th>Average</th>
                                            <th>Below Average</th>
                                            <th>Poor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(test, tIndex) in detail.tests" :key="tIndex"
                                            class="*:p-4 text-sm text-muted hover:bg-primary-50 dark:hover:bg-primary-950 border-b border-default last:border-0">
                                            <td>{{ test.excellent }}</td>
                                            <td>{{ test.good }}</td>
                                            <td>{{ test.average }}</td>
                                            <td>{{ test.below }}</td>
                                            <td>{{ test.poor }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </UCard>
                        </template>
                    </UAccordion>
                </UCard>
            </template>
            <template #both>
                <UCard :ui="{body:'py-2 sm:py-1 sm:px-4'}">
                    <UAccordion :items="both" trailing-icon="i-lucide-plus" :ui="{ content: 'p-1 space-y-4 overflow-visible', leadingIcon: 'text-primary' }">
                        <template #content="{ item }">
                            <UCard v-for="(detail, dIndex) in item.details" :key="dIndex"
                                :ui="{ header: 'flex items-center gap-2', body: 'p-0 sm:p-0' }" class="overflow-x-auto mb-4">
                                <template #header>
                                    <UIcon name="i-lucide-activity" class="size-5 shrink-0 text-primary" />
                                    <span class="font-bold">{{ detail.header }}</span>
                                </template>

                                <table class="w-full table-auto border-collapse">
                                    <thead class="bg-muted">
                                        <tr class="*:p-4 *:w-1/5 text-left text-sm text-default border-b border-default">
                                            <th>Excellent</th>
                                            <th>Good</th>
                                            <th>Average</th>
                                            <th>Below Average</th>
                                            <th>Poor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(test, tIndex) in detail.tests" :key="tIndex"
                                            class="*:p-4 text-sm text-muted hover:bg-primary-50 dark:hover:bg-primary-950 border-b border-default last:border-0">
                                            <td>{{ test.excellent }}</td>
                                            <td>{{ test.good }}</td>
                                            <td>{{ test.average }}</td>
                                            <td>{{ test.below }}</td>
                                            <td>{{ test.poor }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </UCard>
                        </template>
                    </UAccordion>
                </UCard>
            </template>
        </UTabs>
    </Page>
</template>

<script setup lang="ts">
import type { TabsItem, AccordionItem } from '@nuxt/ui'

const parameters = [
    { label: 'Overall', icon: 'i-lucide-clipboard-check', slot: 'overall' as const },
    { label: 'Gender', icon: 'i-lucide-users', slot: 'gender' as const },
    { label: 'Age Group', icon: 'i-lucide-calendar', slot: 'age' as const },
    { label: 'Gender and Age Group', icon: 'i-lucide-user-plus', slot: 'both' as const }
] satisfies TabsItem[]

const gender: AccordionItem[] = [
    {
        label: 'Male',
        icon: 'i-lucide-mars',
        details: [
            {
                header: 'VO2 Max',
                tests: [
                    { excellent: 95, good: 85, average: 75, below: 65, poor: 55 },
                    { excellent: 100, good: 90, average: 80, below: 70, poor: 60 },
                ]
            },
            {
                header: 'Heart Rate',
                tests: [
                    { excellent: 60, good: 70, average: 80, below: 90, poor: 100 },
                    { excellent: 65, good: 75, average: 85, below: 95, poor: 105 },
                ]
            },
            {
                header: 'Stamina',
                tests: [
                    { excellent: 90, good: 80, average: 70, below: 60, poor: 50 },
                    { excellent: 88, good: 78, average: 68, below: 58, poor: 48 },
                ]
            }
        ]
    },
    {
        label: 'Female',
        icon: 'i-lucide-venus',
        details: [
            {
                header: 'VO2 Max',
                tests: [
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                    { excellent: 90, good: 80, average: 70, below: 60, poor: 50 },
                ]
            },
            {
                header: 'Heart Rate',
                tests: [
                    { excellent: 65, good: 75, average: 85, below: 95, poor: 105 },
                    { excellent: 70, good: 80, average: 90, below: 100, poor: 110 },
                ]
            },
            {
                header: 'Stamina',
                tests: [
                    { excellent: 88, good: 78, average: 68, below: 58, poor: 48 },
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                ]
            }
        ]
    }
]

const age: AccordionItem[] = [
    {
        label: '9-11',
        icon: 'i-lucide-calendar',
        details: [
            {
                header: 'VO2 Max',
                tests: [
                    { excellent: 95, good: 85, average: 75, below: 65, poor: 55 },
                    { excellent: 100, good: 90, average: 80, below: 70, poor: 60 },
                ]
            },
            {
                header: 'Heart Rate',
                tests: [
                    { excellent: 60, good: 70, average: 80, below: 90, poor: 100 },
                    { excellent: 65, good: 75, average: 85, below: 95, poor: 105 },
                ]
            },
            {
                header: 'Stamina',
                tests: [
                    { excellent: 90, good: 80, average: 70, below: 60, poor: 50 },
                    { excellent: 88, good: 78, average: 68, below: 58, poor: 48 },
                ]
            }
        ]
    },
    {
        label: '12-15',
        icon: 'i-lucide-calendar',
        details: [
            {
                header: 'VO2 Max',
                tests: [
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                    { excellent: 90, good: 80, average: 70, below: 60, poor: 50 },
                ]
            },
            {
                header: 'Heart Rate',
                tests: [
                    { excellent: 65, good: 75, average: 85, below: 95, poor: 105 },
                    { excellent: 70, good: 80, average: 90, below: 100, poor: 110 },
                ]
            },
            {
                header: 'Stamina',
                tests: [
                    { excellent: 88, good: 78, average: 68, below: 58, poor: 48 },
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                ]
            }
        ]
    },
    {
        label: '16-18',
        icon: 'i-lucide-calendar',
        details: [
            {
                header: 'VO2 Max',
                tests: [
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                    { excellent: 90, good: 80, average: 70, below: 60, poor: 50 },
                ]
            },
            {
                header: 'Heart Rate',
                tests: [
                    { excellent: 65, good: 75, average: 85, below: 95, poor: 105 },
                    { excellent: 70, good: 80, average: 90, below: 100, poor: 110 },
                ]
            },
            {
                header: 'Stamina',
                tests: [
                    { excellent: 88, good: 78, average: 68, below: 58, poor: 48 },
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                ]
            }
        ]
    }
]

const both: AccordionItem[] = [
    {
        label: 'Male, 9-11',
        icon: 'i-lucide-user-plus',
        details: [
            {
                header: 'VO2 Max',
                tests: [
                    { excellent: 95, good: 85, average: 75, below: 65, poor: 55 },
                    { excellent: 100, good: 90, average: 80, below: 70, poor: 60 },
                ]
            },
            {
                header: 'Heart Rate',
                tests: [
                    { excellent: 60, good: 70, average: 80, below: 90, poor: 100 },
                    { excellent: 65, good: 75, average: 85, below: 95, poor: 105 },
                ]
            },
            {
                header: 'Stamina',
                tests: [
                    { excellent: 90, good: 80, average: 70, below: 60, poor: 50 },
                    { excellent: 88, good: 78, average: 68, below: 58, poor: 48 },
                ]
            }
        ]
    },
    {
        label: 'Female, 12-15',
        icon: 'i-lucide-user-plus',
        details: [
            {
                header: 'VO2 Max',
                tests: [
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                    { excellent: 90, good: 80, average: 70, below: 60, poor: 50 },
                ]
            },
            {
                header: 'Heart Rate',
                tests: [
                    { excellent: 65, good: 75, average: 85, below: 95, poor: 105 },
                    { excellent: 70, good: 80, average: 90, below: 100, poor: 110 },
                ]
            },
            {
                header: 'Stamina',
                tests: [
                    { excellent: 88, good: 78, average: 68, below: 58, poor: 48 },
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                ]
            }
        ]
    },
    {
        label: 'Male, 16-18',
        icon: 'i-lucide-user-plus',
        details: [
            {
                header: 'VO2 Max',
                tests: [
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                    { excellent: 90, good: 80, average: 70, below: 60, poor: 50 },
                ]
            },
            {
                header: 'Heart Rate',
                tests: [
                    { excellent: 65, good: 75, average: 85, below: 95, poor: 105 },
                    { excellent: 70, good: 80, average: 90, below: 100, poor: 110 },
                ]
            },
            {
                header: 'Stamina',
                tests: [
                    { excellent: 88, good: 78, average: 68, below: 58, poor: 48 },
                    { excellent: 85, good: 75, average: 65, below: 55, poor: 45 },
                ]
            }
        ]
    }
]
</script>
