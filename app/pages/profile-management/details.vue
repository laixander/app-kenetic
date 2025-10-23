<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-38 sm:h-44 lg:h-38" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page toolbarClass="border-white/10">
            <template #toolbar>
                <UButton label="Back to Norm Creation" icon="i-lucide-arrow-left" variant="ghost" class="text-white" to="/profile-management" />
            </template>
            <template #description>
                <span class="text-white">
                    Profile Details
                </span>
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