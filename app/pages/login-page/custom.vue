<template>
    <LayoutLogin
        hasContent
        variant="floatLeft"
        app="Human Kinetics"
        title="Welcome Back!"
        description="Sign in to your Human Kinetics account"
        logo="/logo.png"
        background-image="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b"
        overlay="bg-linear-to-br from-rose-800 to-rose-950"
        @update:username="username = $event"
        @update:password="password = $event"
        @login="handleLogin"
    >
        <template #content>
            <div class="lg:max-w-1/2 lg:ml-auto">
                <div class="lg:max-w-xl lg:mx-auto space-y-12">
                    <div class="flex items-center gap-2 lg:gap-4">
                        <NuxtImg src="/school-logo.png" class="w-12 lg:w-16" />
                        <div class="*:block pb-2">
                            <span class="font-semibold text-white text-base lg:text-2xl">Mindanao State University</span>
                            <span class="text-white text-xs lg:text-sm">Marawi Campus</span>
                        </div>
                    </div>
                    <div class="hidden lg:block lg:space-y-12">
                        <div class="space-y-2">
                            <div class="*:block">
                                <span class="font-semibold text-yellow-300 text-sm">Our</span>
                                <span class="font-bold text-white text-2xl">Philosophy</span>
                            </div>
                            <div class="text-white text-sm">
                                MSU System is committed to the development of man and to the search for truth, virtue and academic excellence.
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="*:block">
                                <span class="font-semibold text-yellow-300 text-sm">Our</span>
                                <span class="font-bold text-white text-2xl">Mission</span>
                            </div>
                            <div class="text-white text-sm">
                                MSU System is committed to:
                            </div>
                            <div class="border-l-3 border-yellow-300 pl-4 space-y-4">
                                <div class="text-white text-sm">
                                    Lead in social transformation through peace education and integration of the Muslims and other cultural minority groups into the mainstream society;
                                </div>
                                <div class="text-white text-sm">
                                    Ensure excellence in instruction, research development, innovation, extension, and environmental education and discovery;
                                </div>
                                <div class="text-white text-sm">
                                    Advance national and international linkages through collaboration; and
                                </div>
                                <div class="text-white text-sm">
                                    Demonstrate greater excellence, relevance, and inclusiveness for Mindanao and the Filipino nation.
                                </div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="*:block">
                                <span class="font-semibold text-yellow-300 text-sm">Our</span>
                                <span class="font-bold text-white text-2xl">Vision</span>
                            </div>
                            <div class="text-white text-sm">
                                MSU System aspires to be a Center of Excellence in Instruction, Research and Extension transforming itself into a premier and globally competitive national peace University.
                            </div>
                        </div>
                    </div>
                </div>
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
}
</script>
