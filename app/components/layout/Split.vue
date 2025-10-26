<template>
    <div 
        class="min-h-screen w-full flex flex-col items-center gap-6 lg:flex-row bg-white dark:bg-gray-950 relative"
        :class="position === 'right' ? 'lg:justify-end' : 'lg:justify-start'"
    >
        <!-- Background Image for Large Screens -->
        <div 
            v-if="!isSmallScreen"
            class="hidden lg:block absolute inset-0 bg-cover"
            :class="position === 'right' ? 'bg-left' : 'bg-right'"
            :style="{ backgroundImage: `url(${computedBgImage})` }"
        ></div>

        <!-- Overlay -->
        <div 
            v-if="!isSmallScreen"
            class="hidden lg:block absolute inset-0"
            :class="gradientClass"
        ></div>

        <!-- Content -->
         <div class="w-full lg:w-1/2 flex justify-center items-center p-4 order-last relative z-10">
            <slot />
        </div>

        <!-- Background Image for Small Screens -->
        <div
            v-if="isSmallScreen" 
            class="w-full h-[120px] bg-cover bg-center lg:hidden" 
            :style="{ backgroundImage: `url(${computedBgImage})` }"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useWindowSize, useThrottle } from "@vueuse/core";

const { width } = useWindowSize();
const throttledWidth = useThrottle(width, 100);
const isSmallScreen = computed(() => throttledWidth.value < 1024);

const props = withDefaults(
    defineProps<{
        bgImage?: string;
        position?: "right" | "left";
        variant?: "diagonal" | "straight";
    }>(),
    {
        position: "right",
        variant: "diagonal"
    }
);

const computedBgImage = computed(() => 
    props.bgImage || "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b"
);

const gradientClass = computed(() => {
    const styles = {
        diagonal: {
            right: "bg-[linear-gradient(108deg,transparent_0%,transparent_49.96%,white_50%,white_100%)] dark:bg-[linear-gradient(108deg,transparent_0%,transparent_49.96%,#0f172a_50%,#0f172a_100%)]",
            left: "bg-[linear-gradient(-108deg,transparent_0%,transparent_49.96%,white_50%,white_100%)] dark:bg-[linear-gradient(-108deg,transparent_0%,transparent_49.96%,#0f172a_50%,#0f172a_100%)]",
        },
        straight: {
            right: "bg-[linear-gradient(90deg,transparent_0%,transparent_49.96%,white_50%,white_100%)] dark:bg-[linear-gradient(90deg,transparent_0%,transparent_49.96%,#0f172a_50%,#0f172a_100%)]",
            left: "bg-[linear-gradient(-90deg,transparent_0%,transparent_49.96%,white_50%,white_100%)] dark:bg-[linear-gradient(-90deg,transparent_0%,transparent_49.96%,#0f172a_50%,#0f172a_100%)]",
        },
    };

    return styles[props.variant][props.position];
});
</script>