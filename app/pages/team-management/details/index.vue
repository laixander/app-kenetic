<template>
    <div class="relative overflow-y-auto">
        <Banner heightClass="h-38 sm:h-44 lg:h-80" image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" />
        <Page toolbarClass="border-white/20">
            <template #toolbar>
                <UButton label="Back to Team Management" icon="i-lucide-arrow-left" variant="ghost" class="text-white" to="/team-management" />
            </template>
            <div class="flex justify-between items-center">
                <div class="flex-1">
                    <div class="flex justify-between gap-8 w-full">
                        <div class=space-y-1>
                            <div class="flex items-center gap-2">
                                <span class="font-semibold text-lg text-white">Youth Basketball</span>
                                <UBadge
                                    color="success"
                                >active</UBadge>
                            </div>
                            <div class="text-sm text-white border-s-3 border-sky-500 pl-2">Basketball</div>
                        </div>
                        <div class="bg-primary-950/50 p-3 rounded-lg max-w-md backdrop-blur-xl flex items-center gap-3">
                            <UIcon name="i-lucide-calendar" class="text-white" />
                            <div class="flex flex-col">
                                <span class="text-primary-300 text-xs">Next Training</span>
                                <span class="text-white text-sm">2024-01-16 6:00 PM</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gradient-to-l to-white/20 max-w-120 h-[1px] my-4"></div>
                    <div class="flex items-center gap-8">
                        <div class="flex items-center gap-2">
                            <UAvatar src="https://randomuser.me/api/portraits/women/21.jpg" alt="Kim Johnson" size="xl" />
                            <div class="flex flex-col">
                                <span class="text-xs text-primary-300">Coach</span>
                                <span class="text-sm text-white font-semibold">Kim Johnson</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <UAvatar icon="i-lucide-users" size="xl" />
                            <div class="flex flex-col">
                                <span class="text-xs text-primary-300">Members</span>
                                <span class="text-sm text-white font-semibold">12 members</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Block>
                <ComingSoon />
            </Block>
        </Page>
    </div>
</template>
<script setup lang="ts">
</script>