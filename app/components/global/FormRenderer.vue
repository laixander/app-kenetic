<script setup lang="ts">
import type { FormSection } from '~/types/models'

defineProps<{
    form: FormSection[]
}>()
</script>

<template>
    <div class="space-y-8">
        <section v-for="(section, sIndex) in form" :key="sIndex" class="space-y-4">
            <!-- Section Header -->
            <div class="flex items-center gap-2">
                <UIcon :name="section.icon" class="size-5 text-primary" />
                <span class="font-semibold text-default">{{ section.title }}</span>
            </div>

            <!-- Rows -->
            <div v-for="(row, rIndex) in section.rows" :key="rIndex" class="flex gap-4">
                <!-- Fields -->
                <!-- <DynamicInput
                v-for="(field, fIndex) in row.fields"
                :key="fIndex"
                v-model="field.inputValue"
                v-bind="field"
                class="w-full"
                /> -->
                <DynamicInput v-for="(field, fIndex) in row.fields" :key="fIndex" v-bind="field" class="w-full" />
            </div>

            <!-- Separator (not after last section) -->
            <USeparator v-if="sIndex < form.length - 1" class="my-8" />
        </section>
    </div>
</template>
