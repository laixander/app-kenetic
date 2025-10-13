<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-101 sm:h-103 lg:h-54" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Talent Identification" description="AI-powered sport suitability prediction and student potential assessment" inverted>
            <Tabs :items="talentTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Block title="Individual Sport Recommendation Reports" description="Generate comprehensive talent assessment reports with personalized sport recommendations" bgClass="bg-[radial-gradient(circle_at_100%_0%,rgba(142,81,255,0.15),transparent_20%),radial-gradient(circle_at_0%_100%,rgba(142,81,255,0.15),transparent_20%)]">
                <Grid :lg="4">
                    <div class="w-full">
                        <UFormField label="Select Student" size="lg">
                            <USelect placeholder="Choose a student" :items="['Timmy the Turtle', 'Beavis Butthead', 'Homer Simpson', 'Philip J. Fry' ]" class="w-full" />
                        </UFormField>
                        <UFormField label="Report Template" size="lg" class="mt-4">
                            <USelect defaultValue="Comprehensive Talent Report" :items="['Normal Talent Report', 'Comprehensive Talent Report', 'Advance Talent Report']" class="w-full" />
                        </UFormField>
                        <UButton label="Generate Report" icon="i-lucide-stars" color="neutral" size="lg" block class="mt-4" />
                    </div>
                    <GridSpan :lg="3">
                        <UAlert variant="subtle" color="info">
                            <template #description>
                                <div class="font-semibold text-base text-info">Talent Assessment Report</div>
                                <ListProfile
                                    profile-name="Marcus Williams"
                                    profile-description="Student"
                                    profile-photo="https://randomuser.me/api/portraits/men/15.jpg"
                                    class="mt-4"
                                />
                                <div class="flex items-center gap-1 mt-4 text-highlighted">
                                    <UIcon name="i-lucide-sparkles" class="size-5 shrink-0 text-info" />
                                    <span class="font-semibold">Top Sport Recommendations</span>
                                </div>
                                <div class="mt-4 space-y-2">
                                    <UAlert
                                        v-for="(sport, index) in [
                                            { rank: '1', name: 'Soccer', reason: 'Strong endurance and teamwork skills' },
                                            { rank: '2', name: 'Volleyball', reason: 'Excellent vertical jump and reflexes' },
                                            { rank: '3', name: 'Track & Field', reason: 'Outstanding speed and agility' }
                                        ]"
                                        :key="index"
                                        :title="sport.name"
                                        variant="subtle"
                                        color="info"
                                    >
                                        <template #leading>
                                            <div class="size-8 shrink-0 font-semibold text-base text-white flex items-center justify-center rounded-full bg-info dark:bg-info-800 my-auto">
                                                {{ sport.rank }}
                                            </div>
                                        </template>
                                        <template #description>
                                            <div class="text-sm text-highlighted">Suitability: {{ sport.reason }}</div>
                                        </template>
                                    </UAlert>
                                </div>
                                <div class="mt-4 text-xs text-dimmed text-center">
                                    <!-- This report provides an in-depth analysis of Marcus Williams' physical fitness, skill assessments, and
                                    potential sport suitability based on AI-driven insights. It includes benchmarking against international norms and
                                    personalized recommendations for athletic development. -->
                                    Generated on 9/15/2025 at 10:30 AM
                                </div>
                            </template>
                        </UAlert>
                    </GridSpan>
                </Grid>
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, talentTabs } from '~/data';
</script>