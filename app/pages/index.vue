<template>
    <header class="bg-default/75 backdrop-blur border-b border-default h-16 sticky top-0 z-50">
        <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full">
            <div class="lg:flex-1 flex items-center gap-1.5 slide-right opacity-0 [animation-delay:400ms]">
                <UAvatar alt="Human Kenetics" :ui="{root: 'bg-indigo-700 dark:bg-indigo-500 size-10', fallback: 'text-white text-sm'}" class="rounded-none squircle" />
                <span class="font-semibold text-default">Human Kenetics</span>
            </div>
            <div class="flex items-center justify-end lg:flex-1 gap-1.5 slide-left opacity-0 [animation-delay:400ms]">
                    <UButton
                        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
                        color="neutral"
                        variant="ghost"
                        @click="isDark = !isDark"
                    />
                <UButton label="Login" color="neutral" variant="outline" to="/login" />
            </div>
        </div>
    </header>
    <main class="min-h-[calc(100vh-h-16)]">
        <div>
            <div class="relative isolate">
                <div class="slide-down opacity-0 [animation-delay:800ms] absolute w-full -top-px transition-all text-indigo shrink-0 duration-[400ms]"><svg viewBox="0 0 1440 181" fill="none" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none"><mask id="path-1-inside-1_414_5526" fill="white"><path d="M0 0H1440V181H0V0Z"></path></mask><path d="M0 0H1440V181H0V0Z" fill="url(#paint0_linear_414_5526)" fill-opacity="0.22"></path><path d="M0 2H1440V-2H0V2Z" fill="url(#paint1_linear_414_5526)" mask="url(#path-1-inside-1_414_5526)"></path><defs><linearGradient id="paint0_linear_414_5526" x1="720" y1="0" x2="720" y2="181" gradientUnits="userSpaceOnUse"><stop stop-color="currentColor"></stop><stop offset="1" stop-color="currentColor" stop-opacity="0"></stop></linearGradient><linearGradient id="paint1_linear_414_5526" x1="0" y1="90.5" x2="1440" y2="90.5" gradientUnits="userSpaceOnUse"><stop stop-color="currentColor" stop-opacity="0"></stop><stop offset="0.395" stop-color="currentColor"></stop><stop offset="1" stop-color="currentColor" stop-opacity="0"></stop></linearGradient></defs></svg></div>

                <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24">
                    <div class="text-center">
                        <div class="slide-up opacity-0 [animation-delay:200ms]">
                            <h1 class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted zoom-in opacity-0 [animation-delay:400ms]">
                                <div class="">Transform Your <span class="text-indigo">Fitness</span> Assessments</div>
                            </h1>
                            <div class="text-lg sm:text-xl/8 text-muted text-balance mt-6 slide-up opacity-0 [animation-delay:800ms]">
                                The most comprehensive human kinetics assessment platform for professionals. Track, analyze, and optimize physical performance with precision.
                            </div>
                        </div>
                        <div class="mt-10">
                            <div class="flex flex-wrap gap-x-6 gap-y-3 justify-center">
                                <UButton label="Login to Continue" color="indigo" size="xl" to="/login" class="px-8 py-3.5 rounded-xl slide-right opacity-0 [animation-delay:400ms]" />
                                <UButton label="Learn More" trailing-icon="i-lucide-arrow-right" size="xl" variant="subtle" color="neutral" class="px-8 py-3.5 rounded-xl slide-left opacity-0 [animation-delay:400ms]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="relative isolate">
                <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16">

                    <div class="slide-up opacity-0 [animation-delay:200ms]">
                        <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center zoom-in opacity-0 [animation-delay:400ms]">
                            Professional Assessment Tools
                        </h2>
                        <div class="text-base sm:text-lg text-muted text-center text-balance mt-6 slide-up opacity-0 [animation-delay:800ms]">
                            An integrated platform for the collection, analysis, and interpretation of human kinetics data, supporting advanced research in biomechanics, movement science, and performance evaluation.
                        </div>
                    </div>
                    <div class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <UCard class="slide-right opacity-0 [animation-delay:400ms]">
                            <UIcon class="text-4xl text-indigo-500" name="lucide:bar-chart-big"></UIcon>
                            <div class="font-bold my-2">Comprehensive Metrics</div>
                            <div class="text-sm">Track all key fitness metrics from cardiovascular health to strength and flexibility.</div>
                        </UCard>
                        <UCard class="slide-up opacity-0 [animation-delay:400ms]">
                            <UIcon class="text-4xl text-indigo-500" name="lucide:chart-no-axes-combined"></UIcon>
                            <div class="font-bold my-2">Progress Tracking</div>
                            <div class=" text-sm">Visualize client progress over time with detailed analytics and reporting.</div>
                        </UCard>
                        <UCard class="slide-left opacity-0 [animation-delay:400ms]">
                            <UIcon class="text-4xl text-indigo-500" name="lucide:clipboard-list"></UIcon>
                            <div class="font-bold my-2">Custom Assessments</div>
                            <div class="text-sm">Create tailored assessment protocols for your specific needs and clients.</div>
                        </UCard>
                    </div>

                </div>
            </section>

            <section class="relative isolate">
                <div class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16">
                    <div class="relative bg-indigo-700 dark:bg-indigo-950 rounded-xl shadow-xl overflow-hidden">
                        <!-- overlay image -->
                        <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd" alt="Athlete" class="absolute right-0 w-1/2 h-full object-cover 
                            [mask-image:linear-gradient(to_left,black,transparent)] 
                            [mask-size:100%_100%] [mask-repeat:no-repeat] opacity-50 grayscale-50" loading="lazy" />
                        <div class="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/10 to-transparent pointer-events-none">
                        </div>
                        <!--  -->
                        <div class="p-6">
                            <div class="text-3xl font-semibold text-white">Ready to elevate your assessment?</div>
                            <div class="text-indigo-50 font-light text-balance mt-2">Start by logging in to your account.</div>
                            <div class="mt-6">
                                <UButton size="xl" class="px-5 transition-colors ring ring-inset ring-white/50 dark:ring-indigo/50 text-white dark:text-indigo hover:bg-indigo/10 active:bg-indigo/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo" label="Login Now" variant="outline" to="/login" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
    

</template>

<script setup lang="ts">
definePageMeta({
    layout: 'landing'
})

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})

// const { authRedirectUrl } = useRuntimeConfig().public
// const loading = ref<boolean>(false)
// const login = async ()=>{
//     try {
//         loading.value = true
//         let res:string = await $fetch(authRedirectUrl, { method: 'GET', query: {referer:`${window.location.origin}/`} })
//         await navigateTo(res, {external: true})
//         loading.value = false


//     } catch (error) {
        
//     }
// }
</script>