<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-101 sm:h-103 lg:h-54" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Talent Identification" description="AI-powered sport suitability prediction and student potential assessment" inverted>
            <Tabs :items="talentTabs" color="white" />
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in talentStatCards" :key="i" v-bind="card" countSize="text-xl" />
            </Grid>

            <Grid :lg="4" :gap="4">
                <GridSpan :lg="3">
                    <div class="flex-1 flex flex-col gap-4">
                        <Block title="Athlete Directory" description="A summary of athletes, their scores, and suggested sports">
                            <div class="flex flex-col gap-6">
                                <div class="grid lg:flex gap-2">
                                    <UInput placeholder="Search by name, student ID, or email..." icon="i-lucide-search" size="lg" class="w-full" />
                                    <USelect default-value="All Sports" :items="['All Sports', 'Basketball', 'Volleyball', 'Baseball', 'Swimming', 'Archery']" size="lg" class="w-auto" />
                                    <UButton label="Search" icon="i-lucide-search" color="neutral" size="lg" />
                                </div>
                                <Grid :lg="3" :gap="4">
                                    <UCard v-for="n in 6" :key="n" :ui="{ body: 'sm:p-4', footer: 'py-2 sm:px-4' }">
                                        <div class="flex items-center gap-3">
                                            <UAvatar src="https://randomuser.me/api/portraits/women/44.jpg" size="xl" />
                                            <div class="flex flex-col gap-1">
                                                <div class="inline-flex items-center">
                                                    <span class="font-semibold text-default text-sm">Jane Doe</span>
                                                    <UIcon name="i-lucide-dot" class="text-dimmed" />
                                                    <span class="font-normal text-dimmed text-xs">1st year</span>
                                                </div>
                                                <div class="inline-flex items-center gap-2">
                                                    <UBadge color="teal" icon="i-lucide-sparkles" size="sm" variant="soft">98%</UBadge>
                                                    <span class="text-xs text-dimmed">Basketball</span>
                                                </div>
                                            </div>
                                        </div>
                                        <template #footer>
                                            <div class="inline-flex items-center gap-1">
                                                <UIcon name="i-lucide-clock" class="text-dimmed" />
                                                <span class="text-xs text-muted">Last Assessment: 2025-01-25</span>
                                            </div>
                                        </template>
                                    </UCard>
                                </Grid>
                                <UPagination :items-per-page="20" :total="100" class="flex justify-center" />
                            </div>
                        </Block>
                        <Block title="Sports Distribution" description="Top sports based on assessment results">
                            <div class="flex flex-col gap-4">
                                <UFormField
                                    v-for="(item, i) in assessments"
                                    :key="i"
                                    :label="item.label"
                                    :hint="`${item.students} students (${item.value}%)`"
                                >
                                    <UProgress
                                        v-model="item.value"
                                        :color="item.color"
                                    />
                                </UFormField>
                            </div>
                        </Block>
                    </div>
                </GridSpan>
                <Block description="Brief insights on fitness metrics for monitoring student athletic progress." bgClass="bg-[radial-gradient(circle_at_100%_0%,rgba(142,81,255,0.15),transparent_40%),radial-gradient(circle_at_0%_70%,rgba(142,81,255,0.15),transparent_40%)]">
                    <template #title>
                        <div class="inline-flex items-center gap-2">
                            <UIcon name="i-lucide-sparkles" class="size-5 text-violet-500 dark:text-violet-800" />
                            AI Sports Predictions
                        </div>
                    </template>

                    <div class="space-y-3"> 
                        <UCard v-for="n in 3" :ui="{ body: 'sm:p-4 space-y-4' }">
                            <div class="flex justify-between items-center gap-2">
                                <span class="font-semibold text-default text-sm">
                                    Basketball
                                </span>
                                <UIcon name="i-lucide-chevron-right" class="text-muted" />
                            </div>
                            <USeparator />
                            <div class="flex flex-col items-start gap-2">
                                <UBadge label="Top Performer" icon="i-lucide-chart-column-increasing" variant="soft" color="pink" />
                                <div class="flex items-center gap-2">
                                    <UAvatar src="https://randomuser.me/api/portraits/women/90.jpg" alt="Alex Johnson" size="lg" />
                                    <span class="text-default text-sm">Alex Johnson</span>
                                </div>
                                <span class="text-xs text-dimmed">Key Attributes</span>
                                <div class="flex gap-1">
                                    <UBadge label="Movement Efficiency" variant="subtle" color="neutral" />
                                    <UBadge label="+3" variant="subtle" color="neutral" />
                                </div>
                            </div>
                        </UCard>
                    </div>
                </Block>
            </Grid>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, talentTabs } from '~/data';
const assessments = ref([
    { label: 'Basketball', students: 114, value: 85, color: 'green' as const },
    { label: 'Baseball', students: 55, value: 67, color: 'blue' as const },
    { label: 'Archery', students: 21, value: 45, color: 'orange' as const },
    { label: 'Volleyball', students: 2, value: 30, color: 'pink' as const },
    { label: 'Swimming', students: 2, value: 20, color: 'red' as const },
    { label: 'Track & Field', students: 2, value: 10, color: 'violet' as const },
])
</script>