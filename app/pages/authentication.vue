<template>
    <div>
        Loading ...
    </div>
</template>

<script setup lang="ts">

definePageMeta({
     layout: 'landing'
})

const route = useRoute();
const { post } = useAPI()

onMounted(async () => {

    let { access_token } = route.query

    let response = await $fetch<{success:boolean}>('/api/auth/login', {
        method:'POST',
        body:{ username: 'hkas', accessToken: access_token },
        credentials: 'include'
    })

    if(response.success){
       window.location.href = '/dashboard'
    }

})
</script>