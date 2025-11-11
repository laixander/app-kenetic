<template>
    <LayoutLogin
        variant="floatRight"
        app="Human Kinetics"
        title="Welcome Back!"
        description="Sign in to your Human Kinetics account"
        background-image="https://images.unsplash.com/photo-1521804906057-1df8fdb718b7"
        @update:username="username = $event"
        @update:password="password = $event"
        @login="handleLogin"
    >
        <template #logo>
            <div class="flex items-center justify-center mx-auto w-20 h-20 rounded-2xl
                 bg-gradient-to-br from-indigo-600 to-indigo-700
                 dark:from-indigo-500 dark:to-indigo-600
                 mb-6 shadow-lg squircle">
                <UIcon name="i-lucide-activity" class="shrink-0 size-10 text-white" />
            </div>
        </template>
    </LayoutLogin>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'landing'
})

const username = ref('')
const password = ref('')

const handleLogin = ({ username, password }: { username: string; password: string }) => {
    console.log('Username:', username)
    console.log('Password:', password)
    // You can now trigger API login or redirect logic here
    navigateTo('/authentication')
}
</script>
