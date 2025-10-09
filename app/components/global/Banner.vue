<template>
    <div class="absolute inset-0 overflow-hidden" :class="[heightClass, gradientClass]">
        <!-- Image Overlay (Right-Aligned Athlete Photo) -->
        <img :src="image" alt="Athlete" class="absolute right-0 w-1/2 h-full object-cover 
             [mask-image:linear-gradient(to_left,black,transparent)] 
             [mask-size:100%_100%] [mask-repeat:no-repeat] opacity-50 grayscale-50" loading="lazy" />

        <!-- Optional fade gradient (for dark overlay) -->
        <div class="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/10 to-transparent pointer-events-none">
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    heightClass: {
        type: String,
        default: 'h-73 sm:h-80 lg:h-54',
    },
    gradientClass: {
        type: String,
        default:
            'bg-gradient-to-r from-indigo-800 to-blue-500 dark:from-indigo-900/80 dark:to-blue-800/80',
    },
    image: {
        type: String,
        default: '',
    },
})
</script>