<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-94 md:h-96 lg:h-58" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Reports & Analytics" description="Generate comprehensive reports, export data, and analyze performance trends" inverted>
            <Tabs :items="reportsAnalyticsTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in analyticStatCards" :key="i" v-bind="card" countSize="text-xl" hasDetails />
            </Grid>

            <Block title="Performance Rankings" description="Individual fitness scores and participation status">
                <section class="grid lg:flex gap-2">
                    <UInput placeholder="Search by name" icon="i-lucide-search" size="lg" class="w-full" />
                    <USelect default-value="All Department" :items="['All Department', 'Engineering', 'Business', 'Arts & Sciences', 'Health Sciences', 'Education']" size="lg" class="w-auto" />
                    <USelect default-value="All Status" :items="['All Status', 'Active', 'Inactive']" size="lg" class="w-auto" />
                </section>
            </Block>

            <Block noBodyPadding class="overflow-x-auto">
                <table class="w-full table-auto border-collapse">
                    <thead class="bg-muted">
                        <tr class="*:p-4 text-left text-sm text-default border-b border-default">
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Vertical Jump</th>
                            <th>40m Sprint</th>
                            <th>Bench Press</th>
                            <th>Last Assessment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(test, index) in [
                            { rank: '1', name: 'Dakota Green', department: 'Business', vjump: '68', sprint: '4.72', bpress: '120', assessment: '2024-12-08', status: 'Active' },
                            { rank: '2', name: 'Jordan Smith', department: 'Engineering', vjump: '64', sprint: '4.89', bpress: '115', assessment: '2024-11-26', status: 'Active' },
                            { rank: '3', name: 'Riley Chen', department: 'Sports Science', vjump: '62', sprint: '4.95', bpress: '110', assessment: '2024-10-18', status: 'Active' },
                            { rank: '4', name: 'Avery Johnson', department: 'Marketing', vjump: '59', sprint: '5.04', bpress: '100', assessment: '2024-09-15', status: 'Active' },
                            { rank: '5', name: 'Taylor Brooks', department: 'Finance', vjump: '56', sprint: '5.18', bpress: '98', assessment: '2024-08-12', status: 'Inactive' },
                        ]" :key="index" class="*:p-4 text-sm text-muted hover:bg-primary-50 dark:hover:bg-primary-950 border-b border-default last:border-0">
                            <td>{{ test.rank }}</td>
                            <td>{{ test.name }}</td>
                            <td>
                                <UBadge :label="test.department" color="neutral" variant="subtle" size="sm" />
                            </td>
                            <td>{{ test.vjump }} cm</td>
                            <td>{{ test.sprint }} cm</td>
                            <td>{{ test.bpress }} cm</td>
                            <td>{{ test.assessment }}</td>
                            <td>
                                <UBadge
                                    :label="test.status"
                                    :color="test.status === 'Active' ? 'success' : 'neutral'"
                                    variant="subtle"
                                    size="sm"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Block>

            <UPagination :total="100" class="flex justify-center" />
        </Page>
    </div>
</template>
<script setup lang="ts">
import { analyticStatCards, reportsAnalyticsTabs } from '~/data';
</script>