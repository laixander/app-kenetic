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
                            { photo: 'https://randomuser.me/api/portraits/men/11.jpg', name: 'Marcus Johnson', type: 'Student', sport: 'Basketball', dateAssessment: '2025-01-25', borderColor: 'blue' },
                            { photo: 'https://randomuser.me/api/portraits/women/21.jpg', name: 'Ava Martinez', type: 'Faculty', sport: 'Volleyball', dateAssessment: '2025-02-10', borderColor: 'lime' },
                            { photo: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Ethan Cruz', type: 'Athlete', sport: 'Track & Field', dateAssessment: '2025-03-05' },
                            { photo: 'https://randomuser.me/api/portraits/women/45.jpg', name: 'Sophia Reyes', type: 'Student', sport: 'Swimming', dateAssessment: '2025-03-28' },
                            { photo: 'https://randomuser.me/api/portraits/men/56.jpg', name: 'Liam Santos', type: 'Faculty', sport: 'Soccer', dateAssessment: '2025-04-12' },
                            { photo: 'https://randomuser.me/api/portraits/women/63.jpg', name: 'Chloe Dela Cruz', type: 'Employee', sport: 'Tennis', dateAssessment: '2025-05-20' },
                            { photo: 'https://randomuser.me/api/portraits/men/74.jpg', name: 'Noah Tan', type: 'Athlete', sport: 'Boxing', dateAssessment: '2025-06-15' },
                            { photo: 'https://randomuser.me/api/portraits/women/85.jpg', name: 'Mia Lim', type: 'Faculty', sport: 'Badminton', dateAssessment: '2025-07-02' },
                            { photo: 'https://randomuser.me/api/portraits/men/95.jpg', name: 'Lucas Navarro', type: 'Employee', sport: 'Baseball', dateAssessment: '2025-08-22' },
                            { photo: 'https://randomuser.me/api/portraits/women/99.jpg', name: 'Ella Gomez', type: 'Athlete', sport: 'Cheerleading', dateAssessment: '2025-09-10' }
                        ]"
                        :key="profile.name"
                    >
                        <UCard :ui="{ body: 'sm:p-4', footer: 'flex items-center gap-2 text-muted sm:px-4' }">
                            <div class="flex items-center gap-4">
                                <UAvatar :src="profile.photo" :alt="profile.name" size="xl" />
                                <div class="grid gap-1">
                                    <div class="flex items-center gap-2">
                                        <span class="font-semibold text-sm">{{ profile.name }}</span>
                                        <UBadge
                                            :color="profile.type === 'Student' ? 'blue'
                                                    : profile.type === 'Faculty' ? 'violet'
                                                    : profile.type === 'Employee' ? 'amber'
                                                    : 'green'"
                                            variant="soft"
                                            size="sm"
                                        >{{ profile.type }}</UBadge>
                                    </div>
                                    <span 
                                        class="text-xs text-muted border-s-3 pl-2" 
                                        :class="{
                                            'border-blue-400': profile.sport === 'Basketball',
                                            'border-lime-400': profile.sport === 'Volleyball',
                                            'border-red-400': profile.sport === 'Track & Field',
                                            'border-cyan-400': profile.sport === 'Swimming',
                                            'border-green-400': profile.sport === 'Soccer',
                                            'border-amber-400': profile.sport === 'Tennis',
                                            'border-pink-400': profile.sport === 'Boxing',
                                            'border-emerald-400': profile.sport === 'Badminton',
                                            'border-indigo-400': profile.sport === 'Baseball',
                                            'border-rose-400': profile.sport === 'Cheerleading'
                                        }"
                                    >{{ profile.sport }}</span>
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