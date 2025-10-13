<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-101 sm:h-103 lg:h-54" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Talent Identification" description="AI-powered sport suitability prediction and student potential assessment" inverted>
            <Tabs :items="talentTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Benchmark Fitness" description="Compare student fitness data against international norms by age, and gender">
                <div class="flex gap-2">
                    <USelect placeholder="Select Age" :items="[ '16 years', '17 years', '18 years', '19 years', '20 years', '21 years' ]" size="lg" class="w-full" />
                    <USelect placeholder="Select Gender" :items="[ 'Male', 'Female' ]" size="lg" class="w-full" />
                    <UButton label="Apply Filters" icon="i-lucide-filter" color="neutral" size="lg" />
                </div>
            </Block>
            
            <Block>
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-clipboard-check" class="size-5 shrink-0 text-muted" />
                    <div class="text-sm text-muted">
                        Performance comparison against international norms for <span class="font-bold text-primary">16-year-old females</span>
                    </div>
                </div>
            </Block>

            <Block noBodyPadding class="overflow-x-auto">
                <table class="w-full table-auto border-collapse">
                    <thead class="bg-muted">
                        <tr class="*:p-4 text-left text-sm text-default border-b border-default">
                            <th>Fitness Test</th>
                            <th>Athlete Value</th>
                            <th>International Norm</th>
                            <th>Percentile</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(test, index) in [
                            { name: 'VO2 Max', score: '45 ml/kg/min', norm: '40-50 ml/kg/min', percentile: '70th', status: 'Above Average' },
                            { name: '1RM Bench Press', score: '80 kg', norm: '70-90 kg', percentile: '60th', status: 'Average' },
                            { name: '1RM Squat', score: '100 kg', norm: '90-110 kg', percentile: '75th', status: 'Above Average' },
                            { name: '40m Sprint', score: '5.2 sec', norm: '5.0-5.5 sec', percentile: '50th', status: 'Average' },
                            { name: 'Agility Test', score: '15 sec', norm: '14-16 sec', percentile: '80th', status: 'Above Average' }
                        ]" :key="index" class="*:p-4 text-sm text-muted hover:bg-primary-50 dark:hover:bg-primary-950 border-b border-default last:border-0">
                            <td>{{ test.name }}</td>
                            <td>{{ test.score }}</td>
                            <td>{{ test.norm }}</td>
                            <td class="text-success flex items-center gap-1">
                                <UIcon name="i-lucide-trending-up" class="size-4 shrink-0" /> {{ test.percentile }}
                            </td>
                            <td>
                                <UBadge
                                    :label="test.status"
                                    :color="test.status === 'Above Average' ? 'success' : (test.status === 'Average' ? 'warning' : 'error')"
                                    size="sm"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, talentTabs } from '~/data';
</script>