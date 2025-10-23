<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-38 sm:h-44 lg:h-50" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page toolbarClass="border-white/10">
            <template #toolbar>
                <UButton label="Back to Norm Creation" icon="i-lucide-arrow-left" variant="ghost" class="text-white" to="/profile-management" />
            </template>
            <template #description>
                <div class="flex items-center gap-4">
                    <UAvatar src="https://randomuser.me/api/portraits/women/21.jpg" alt="Ava Martinez" size="3xl" />
                    <div class="grid flex-1">
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-lg text-white">Ava Martinez</span>
                            <UBadge
                                color="violet"
                                variant="subtle"
                                size="sm"
                            >Faculty</UBadge>
                        </div>
                        <span class="text-sm text-white">Volleyball</span>
                    </div>

                    <div class="flex gap-6 items-center">
                        <div class="flex gap-2 items-center">
                            <span class="text-white text-sm">Training Consistency</span>
                            <CircularProgress
                                :value="85"
                                color="#22D3EE"
                                labelColor="#fff"
                                :labelSize="24"
                                size="54" stroke="6"
                            />
                        </div>
                        <div class="flex gap-2 items-center">
                            <span class="text-white text-sm">Fitness Level</span>
                            <CircularProgress
                                :value="92"
                                color="#A3E635"
                                labelColor="#fff"
                                :labelSize="24"
                                size="54" stroke="6"
                            />
                        </div>
                    </div>

                </div>
            </template>
            <Block>
                <ComingSoon />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
import { talentStatCards, teamManagementTabs } from '~/data';
</script>