<template>
    <div class="relative w-full min-h-screen flex flex-col lg:flex-row items-center overflow-hidden">
        <!-- Background section -->
        <div class="bg-primary flex lg:items-center bg-cover bg-center bg-no-repeat" :class="layout.bg" :style="{ backgroundImage: `url(${backgroundImage})` }">
            <div class="absolute w-full h-full opacity-90" :class="overlay" />
            <div v-if="hasContent" class="w-full z-50 p-4 lg:p-6">
                <!-- Slot for custom content -->
                <slot name="content" />
            </div>
        </div>

        <!-- Content section -->
        <div class="relative w-full flex-1 lg:flex-none lg:min-h-screen flex flex-col lg:justify-center items-center" :class="layout.content">
            <div class="max-w-sm w-full space-y-12 px-6" :class="layout.card">
                <!-- Header -->
                <div class="grid gap-1 justify-center text-center">
                    <NuxtImg :src="logo" class="size-16 lg:size-20 mx-auto mb-6" />
                    <span class="font-bold text-2xl text-default">{{ title }}</span>
                    <span class="text-sm text-muted">{{ description }}</span>
                </div>

                <!-- Slot for custom form -->
                <slot>
                    <!-- Default login form (used if no slot provided) -->
                    <div class="space-y-6">
                        <UFormField label="Username" size="xl">
                            <UInput placeholder="Enter your username" variant="soft" class="w-full" v-model="username"
                                @input="emit('update:username', username)" />
                        </UFormField>
                        <UFormField label="Password" size="xl">
                            <UInput type="password" placeholder="Enter your password" variant="soft" class="w-full"
                                v-model="password" @input="emit('update:password', password)" />
                        </UFormField>
                    </div>

                    <UButton label="Login" type="submit" size="xl" block @click="onLogin" />
                </slot>
            </div>
            <div class="absolute bottom-6 px-6 grid gap-1">
                <span class="text-xs text-dimmed text-center text-pretty" :class="layout.footer">&copy;{{ currentYear }} Beespoke Solutions Inc - {{ app }}&trade;. All Rights Reserved.</span>
                <span class="text-xs text-primary text-center" :class="layout.footer">Version {{ version }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components';
import { ref, computed, version } from 'vue'

// ---- Props ----
const props = defineProps({
    app: String,
    title: String,
    description: String,
    logo: String,
    backgroundImage: String,
    hasContent: Boolean,
    overlay: {
        type: String,
        default: 'bg-linear-to-br from-purple to-primary-600'
    },
    variant: {
        type: String,
        default: 'splitRight', // splitRight | splitLeft | splitDiagonalRight | splitDiagonalLeft
    }
})

const currentYear = ref(new Date().getFullYear());

// ---- Emits ----
const emit = defineEmits<{
    (e: 'update:username', value: string): void
    (e: 'update:password', value: string): void
    (e: 'login', payload: { username: string; password: string }): void
}>()

// ---- State ----
const username = ref('')
const password = ref('')

// ---- Methods ----
const onLogin = () => {
    emit('login', { username: username.value, password: password.value })
}

// ---- Layout Config ----
const LAYOUTS = {
    splitRight: {
        bg: 'w-full lg:w-1/2 h-32 lg:min-h-screen',
        content: 'lg:w-1/2 bg-default',
        card: '-mt-8 lg:mx-0'
    },
    splitLeft: {
        bg: 'lg:order-1 w-full lg:w-1/2 h-32 lg:min-h-screen',
        content: 'lg:w-1/2 bg-default',
        card: '-mt-8 lg:mx-0'
    },
    splitDiagonalRight: {
        bg: 'lg:absolute left-0 top-0 w-full lg:w-2/3 h-32 lg:min-h-screen clip-none',
        content: 'lg:ml-auto lg:pl-[180px] clip-diagonal-left lg:w-[calc(50%+120px)] bg-default',
        card: '-mt-8 lg:mx-0'
    },
    splitDiagonalLeft: {
        bg: 'lg:absolute right-0 top-0 w-full lg:w-[calc(50%+120px)] h-32 lg:min-h-screen clip-diagonal-right lg:z-50',
        content: 'lg:pr-[180px] lg:w-[calc(50%+120px)] bg-default',
        card: '-mt-8 lg:mx-0'
    },
    fullCenter: {
        bg: 'absolute right-0 top-0 w-full min-h-screen',
        content: 'justify-center px-4',
        footer: 'text-white',
        card: 'bg-default py-8 rounded-2xl drop-shadow-xl',
    },
    floatRight: {
        bg: 'absolute right-0 top-0 w-full min-h-screen',
        content: 'lg:w-1/2 lg:ml-auto px-4',
        card: 'bg-default py-8 mt-42 lg:mt-0 rounded-2xl drop-shadow-xl',
        footer: 'text-white'
    },
    floatLeft: {
        bg: 'absolute right-0 top-0 w-full min-h-screen',
        content: 'lg:w-1/2 px-4',
        card: 'bg-default py-8 mt-42 lg:mt-0 rounded-2xl drop-shadow-xl',
        footer: 'text-white'
    }
}

// ---- Computed Layout ----
const layout = computed(() => LAYOUTS[props.variant as keyof typeof LAYOUTS] ?? LAYOUTS.splitRight)
</script>

<style scoped>
.clip-diagonal-left {
    clip-path: polygon(240px 0, 100% 0, 100% 100%, 0 100%);
}

.clip-diagonal-right {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 240px 100%);
}

@media (max-width: 1024px) {

    .clip-diagonal-left,
    .clip-diagonal-right {
        clip-path: none
    }
}
</style>
