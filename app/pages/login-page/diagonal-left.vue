<template>
    <LayoutSplit position="left" bgImage="https://images.unsplash.com/photo-1521804906057-1df8fdb718b7">
        <div class="max-w-sm w-full space-y-12">
            <div class="grid gap-1 justify-center text-center">
                <NuxtImg src="/logo.png" class="size-28 mx-auto mb-6" />
                <span class="font-bold text-2xl">Human Kinetics Login</span>
                <span class="text-sm text-muted">Enter your credentials to access your account</span>
            </div>

            <div class="space-y-6">
                <UFormField label="Username" size="xl">
                    <UInput placeholder="Enter your username" variant="soft" class="w-full" />
                </UFormField>
                <UFormField label="Password" size="xl">
                    <UInput type="password" placeholder="Enter your password" variant="soft" class="w-full" />
                </UFormField>
            </div>

            <UButton label="Login" type="submit" size="xl" block />
        </div>
    </LayoutSplit>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'landing'
})
</script>