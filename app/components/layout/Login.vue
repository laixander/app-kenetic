<template>
    <div class="relative w-full min-h-screen lg:flex items-center overflow-hidden">
        <template v-if="splitDiagonalRight">
            <!-- Left background -->
            <div
                class="bg-gray-200 dark:bg-gray-800 lg:absolute left-0 top-0 w-full lg:w-2/3 h-44 lg:min-h-screen bg-cover bg-right bg-no-repeat"
                :style="{ backgroundImage: `url(${backgroundImage})` }"
            >
            </div>

            <!-- Right content -->
            <div
                class="w-full lg:w-[calc(50%+120px)] lg:pl-[180px] bg-default min-h-screen flex justify-center lg:items-center z-50 lg:ml-auto clip-diagonal-left">
                <div class="max-w-sm w-full space-y-12 -mt-12 mx-4 lg:mx-0">
                    <div class="grid gap-1 justify-center text-center">
                        <NuxtImg :src="logo" class="size-24 lg:size-28 mx-auto mb-6" />
                        <span class="font-bold text-2xl text-default">{{ title }}</span>
                        <span class="text-sm text-muted">{{ description }}</span>
                    </div>

                    <!-- FORM FIELDS -->
                    <div class="space-y-6">
                        <UFormField label="Username" size="xl">
                            <UInput
                                placeholder="Enter your username"
                                variant="soft"
                                class="w-full"
                                v-model="username"
                                @input="emit('update:username', username)"
                            />
                        </UFormField>
                        <UFormField label="Password" size="xl">
                            <UInput
                                type="password"
                                placeholder="Enter your password"
                                variant="soft"
                                class="w-full"
                                v-model="password"
                                @input="emit('update:password', password)"
                            />
                        </UFormField>
                    </div>

                    <!-- BUTTON -->
                    <UButton label="Login" type="submit" size="xl" block @click="onLogin" />
                </div>
            </div>
        </template>
        <template v-if="splitDiagonalLeft">
            <!-- Left background -->
            <div
                class="bg-gray-200 dark:bg-gray-800 lg:absolute right-0 top-0 w-full lg:w-[calc(50%+120px)] h-44 lg:min-h-screen bg-cover bg-left bg-no-repeat z-50 clip-diagonal-right"
                :style="{ backgroundImage: `url(${backgroundImage})` }"
            >
            </div>

            <!-- Right content -->
            <div
                class="w-full lg:w-[calc(50%+120px)] lg:pr-[180px] bg-default min-h-screen flex justify-center lg:items-center">
                <div class="max-w-sm w-full space-y-12 -mt-12 mx-4 lg:mx-0">
                    <div class="grid gap-1 justify-center text-center">
                        <NuxtImg :src="logo" class="size-24 lg:size-28 mx-auto mb-6" />
                        <span class="font-bold text-2xl text-default">{{ title }}</span>
                        <span class="text-sm text-muted">{{ description }}</span>
                    </div>

                    <!-- FORM FIELDS -->
                    <div class="space-y-6">
                        <UFormField label="Username" size="xl">
                            <UInput
                                placeholder="Enter your username"
                                variant="soft"
                                class="w-full"
                                v-model="username"
                                @input="emit('update:username', username)"
                            />
                        </UFormField>
                        <UFormField label="Password" size="xl">
                            <UInput
                                type="password"
                                placeholder="Enter your password"
                                variant="soft"
                                class="w-full"
                                v-model="password"
                                @input="emit('update:password', password)"
                            />
                        </UFormField>
                    </div>

                    <!-- BUTTON -->
                    <UButton label="Login" type="submit" size="xl" block @click="onLogin" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: String,
    description: String,
    logo: String,
    backgroundImage: String,
    splitDiagonalRight: {
        type: Boolean,
        default: false
    },
    splitDiagonalLeft: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits<{
    (e: 'update:username', value: string): void
    (e: 'update:password', value: string): void
    (e: 'login', payload: { username: string; password: string }): void
}>()

const username = ref('')
const password = ref('')

const onLogin = () => {
    emit('login', { username: username.value, password: password.value })
}
</script>

<style scoped>
.clip-diagonal-left {
    clip-path: polygon(240px 0, 100% 0, 100% 100%, 0 100%);
}

.clip-diagonal-right {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 240px 100%);
}

@media (max-width: 1024px) {
    .clip-diagonal-left, .clip-diagonal-right {
        clip-path: none
    }
}
</style>
