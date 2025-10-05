<template>
    <Block :title="props.title">
        <div class="-mt-6 space-y-2">
            <div class="font-bold text-default text-2xl text-center">
                {{ props.mainValue }}
            </div>
            <UProgress :model-value="props.progress" />
            <div class="text-muted text-xs text-center">
                {{ props.subtitle }}
            </div>
        </div>
    </Block>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
    mainValue: string
    progress: number
    subtitle: string
}>()
</script>