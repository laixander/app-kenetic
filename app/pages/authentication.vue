<template>
    <!-- <div>
        Loading ...
    </div> -->
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <!-- Indigo Mesh Background -->
        <div class="absolute inset-0 -z-10 flex items-center justify-center">
            <div class="w-[180vmin] h-[180vmin] rounded-full
               bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.35)_0%,rgba(79,70,229,0.1)_40%,transparent_70%)]
               dark:bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.25)_0%,rgba(79,70,229,0.1)_40%,transparent_70%)]
               blur-3xl"></div>
        </div>
        <UContainer class="max-w-md text-center fade-in opacity-0">
            <div class="mb-12 slide-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                <div class="inline-flex items-center justify-center w-24 h-24 rounded-2xl
                 bg-gradient-to-br from-indigo-600 to-indigo-700
                 dark:from-indigo-500 dark:to-indigo-600
                 mb-6 shadow-lg zoom-in opacity-0
                 [animation-delay:400ms] [animation-fill-mode:forwards] squircle">
                    <UIcon name="i-lucide-activity" class="w-12 h-12 text-white" />
                </div>

                <h1
                    class="text-gray-900 dark:text-gray-100 font-bold mb-2 slide-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
                    HKAS
                </h1>
                <p
                    class="text-gray-600 dark:text-gray-400 slide-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
                    Human Kinetics Application System
                </p>
            </div>

            <div class="space-y-4 slide-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
                <UProgress v-model="progress" color="indigo" class="rounded-full h-2 transition-all duration-700" />
                <div class="flex items-center justify-center gap-2">
                    <div
                        class="w-4 h-4 border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent dark:border-t-transparent rounded-full animate-spin-smooth">
                    </div>
                    <p class="text-gray-600 dark:text-gray-300">
                        Loading application... {{ progress }}%
                    </p>
                </div>
            </div>

            <!-- <div
                class="mt-12 text-indigo-400 dark:text-indigo-500 animate-fade-up opacity-0 [animation-delay:1200ms] [animation-fill-mode:forwards]">
                <p>Professional Assessment Tools</p>
            </div> -->
        </UContainer>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'landing'
})

import { ref, onMounted } from 'vue'
import { useRouter } from '#imports'
const router = useRouter()
const progress = ref(0)
onMounted(() => {
    // Simulate loading
    const interval = setInterval(() => {
        if (progress.value < 100) {
            progress.value += Math.floor(Math.random() * 4) + 1
            if (progress.value > 100) progress.value = 100
        } else {
            clearInterval(interval)
            setTimeout(() => router.push('/dashboard'), 700)
        }
    }, 300)
})

// const route = useRoute();
// const { post } = useAPI()

// onMounted(async () => {

//     let { access_token } = route.query

//     let response = await $fetch<{success:boolean}>('/api/auth/login', {
//         method:'POST',
//         body:{ username: 'hkas', accessToken: access_token },
//         credentials: 'include'
//     })

//     if(response.success){
//        window.location.href = '/dashboard'
//     }

// })
</script>

<!-- <style scoped>
@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fade-up {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-up {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scale-in {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes spin-smooth {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
}

.animate-fade-up {
    animation: fade-up 0.8s ease-out forwards;
}

.animate-slide-up {
    animation: slide-up 0.8s ease-out forwards;
}

.animate-scale-in {
    animation: scale-in 0.8s ease-out forwards;
}

.animate-spin-smooth {
    animation: spin-smooth 1s linear infinite;
}
</style> -->