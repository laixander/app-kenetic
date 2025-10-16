<template>
    <div class="flex justify-center items-center bg-gray-50 dark:bg-gray-950">
        <div class="my-46">
            <div class="text-slate-300 text-5xl font-bold">
                Transform Your Fitness Assessments
            </div>
            <div class="text-slate-500 w-4/6 my-6">
                The most comprehensive human kinetics assessment platform for professionals. Track, analyze, and
                optimize physical performance with precision.
            </div>
            <div class="flex w-full my-18 gap-4">
                <UButton size="xl" class="text-white font-bold" @click="login">Login to continue</UButton>
                <UButton size="xl" variant="soft">Learn More</UButton>
            </div>
        </div>
    </div>
    <div class="flex justify-center ">
        <div class="text-slate-200 text-3xl font-bold my-10">Professional Assessment Tools</div>
    </div>
    <div class="flex justify-between px-8 gap-8 mb-4">
        <UCard>
            <UIcon class="text-4xl text-primary-500" name="lucide:bar-chart-big"></UIcon>
            <div class="font-bold my-2">Comprehensive Metrics</div>
            <div class="font-light text-sm">Track all key fitness metrics from cardiovascular health to strength and flexibility.</div>
        </UCard>
        <UCard>
            <UIcon class="text-4xl text-primary-500" name="lucide:chart-no-axes-combined"></UIcon>
            <div class="font-bold my-2">Progress Tracking</div>
            <div class="font-light  text-sm">Visualize client progress over time with detailed analytics and reporting.</div>
        </UCard>
        <UCard>
            <UIcon class="text-4xl text-primary-500" name="lucide:clipboard-list"></UIcon>
            <div class="font-bold my-2">Custom Assessments</div>
            <div class="font-light text-sm">Create tailored assessment protocols for your specific needs and clients.</div>
        </UCard>
    </div>

    <div class="bg-indigo-700 rounded-lg shadow-xl mx-8 my-18 p-6">
        
            <div class="text-4xl font-bold">Ready to elevate your assessment?</div>
            <span class="block text-indigo-300 font-bold text-2xl mt-2">Start by logging in to your account.</span>
        
        <div class="flex justify-end">
            <UButton size="xl" color="neutral" variant="soft" @click="login">Login Now</UButton>
        </div>
        
    </div>

</template>

<script setup lang="ts">
definePageMeta({
    layout: 'landing'
})

 const { authRedirectUrl } = useRuntimeConfig().public
const loading = ref<boolean>(false)
const login = async ()=>{
    try {
        loading.value = true
        let res:string = await $fetch(authRedirectUrl, { method: 'GET', query: {referer:`${window.location.origin}/`} })
        await navigateTo(res, {external: true})
        loading.value = false


    } catch (error) {
        
    }
}
</script>