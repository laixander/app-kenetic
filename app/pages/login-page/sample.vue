<template>
    <LayoutLogin
        variant="floatRight"
        app="Human Kinetics"
        title="Welcome Back!"
        description="Sign in to your Human Kinetics account"
        logo="/logo.png"
        background-image="https://images.unsplash.com/photo-1521804906057-1df8fdb718b7"
        @update:username="username = $event"
        @update:password="password = $event"
        @login="handleLogin"
    >
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
}
</script>
