<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-45 lg:h-45" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page title="Profile Management" description="Track the performance and fitness metrics" inverted>
            <Grid :lg="4" :gap="4">
                <StatCard v-for="(card, i) in profileManagementStatCards" :key="i" v-bind="card" hasDetails />
            </Grid>

            <Block title="Profile Directory" description="Search and filter profiles by type, gender, or sport">
                <div class="grid lg:flex gap-2 mb-4">
                    <UInput placeholder="Search by name, student ID, or email..." icon="i-lucide-search" size="lg" class="w-full" />
                    <USelect default-value="All Type" :items="['All Type', 'Student', 'Faculty', 'Employee']" size="lg" class="w-auto" />
                    <USelect default-value="All Gender" :items="['All Gender', 'Male', 'Female']" size="lg" class="w-auto" />
                    <USelect default-value="All Sport" :items="['All Sports', 'Basketball', 'Volleyball', 'Baseball', 'Swimming', 'Archery']" size="lg" class="w-auto" />
                </div>
                <Grid :md="2" :lg="4" :gap="4">
                    <ULink to="/profile-management/details"
                        v-for="profile in [
                            { photo: 'https://randomuser.me/api/portraits/men/11.jpg', name: 'Marcus Johnson', type: 'Student', group: 'Basketball', dateAssessment: '2025-01-25' },
                            { photo: 'https://randomuser.me/api/portraits/women/21.jpg', name: 'Ava Martinez', type: 'Faculty', group: 'Volleyball', dateAssessment: '2025-02-10' },
                            { photo: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Ethan Cruz', type: 'Athlete', group: 'Track & Field', dateAssessment: '2025-03-05' },
                            { photo: 'https://randomuser.me/api/portraits/women/45.jpg', name: 'Sophia Reyes', type: 'Student', group: 'Swimming', dateAssessment: '2025-03-28' },
                            { photo: 'https://randomuser.me/api/portraits/men/56.jpg', name: 'Liam Santos', type: 'Faculty', group: 'Soccer', dateAssessment: '2025-04-12' },
                            { photo: 'https://randomuser.me/api/portraits/women/63.jpg', name: 'Chloe Dela Cruz', type: 'Employee', group: 'Tennis', dateAssessment: '2025-05-20' },
                            { photo: 'https://randomuser.me/api/portraits/men/74.jpg', name: 'Noah Tan', type: 'Athlete', group: 'Boxing', dateAssessment: '2025-06-15' },
                            { photo: 'https://randomuser.me/api/portraits/women/85.jpg', name: 'Mia Lim', type: 'Faculty', group: 'Badminton', dateAssessment: '2025-07-02' },
                            { photo: 'https://randomuser.me/api/portraits/men/95.jpg', name: 'Lucas Navarro', type: 'Employee', group: 'Baseball', dateAssessment: '2025-08-22' },
                            { photo: 'https://randomuser.me/api/portraits/women/99.jpg', name: 'Ella Gomez', type: 'Athlete', group: 'Cheerleading', dateAssessment: '2025-09-10' }
                        ]"
                        :key="profile.name"
                    >
                        <UCard :ui="{ body: 'sm:p-4', footer: 'flex items-center gap-2 text-muted sm:px-4' }">
                            <div class="flex items-center gap-4">
                                <UAvatar :src="profile.photo" :alt="profile.name" size="xl" />
                                <div class="grid">
                                    <div class="flex items-center gap-2">
                                        <span class="font-semibold text-sm">{{ profile.name }}</span>
                                        <UBadge
                                            :color="profile.type === 'Student' ? 'blue'
                                                    : profile.type === 'Faculty' ? 'violet'
                                                    : profile.type === 'Employee' ? 'amber'
                                                    : 'green'"
                                            variant="subtle"
                                            size="sm"
                                        >{{ profile.type }}</UBadge>
                                    </div>
                                    <span class="text-xs text-muted">{{ profile.group }}</span>
                                </div>
                            </div>
                            <template #footer>
                                <UIcon name="i-lucide-clock" class="shrink-0" />
                                <span class="text-xs">Last Assessment: {{ profile.dateAssessment }}</span>
                            </template>
                        </UCard>
                    </ULink>
                </Grid>
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { profileManagementStatCards } from '~/data';
</script>