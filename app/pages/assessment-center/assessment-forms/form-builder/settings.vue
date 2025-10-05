<template>
    <Page title="Form Builder" description="Create and manage forms with customizable fields and layouts">
        <template #toolbar>
            <UButton label="Back to Forms" icon="i-lucide-arrow-left" variant="ghost" to="../assessment-forms" />
        </template>
        <template #actions>
            <Tabs :items="formBuilderTabs" />
        </template>
        <Block title="Form Settings" description="Configure general from settings and metadata">
            <div class="space-y-4">
                <div class="flex gap-4">
                    <UFormField label="Form Name" size="lg" class="w-full">
                        <UInput class="w-full" placeholder="Enter Form Name" />
                    </UFormField>
                    <UFormField label="Select Icon" size="lg" class="w-full">
                        <USelect v-model="value" :items="items" value-key="value" :icon="icon" placeholder="Select Icon" class="w-full" />
                    </UFormField>
                    <UFormField label="Color" size="lg" class="w-full lg:w-auto">
                        <UPopover>
                            <UButton label="Choose color" color="neutral"
                                variant="soft" size="lg" class="w-full justify-center">
                                <template #leading>
                                    <span :style="chip" class="size-3 rounded-full" />
                                </template>
                            </UButton>
                            <template #content>
                                <UColorPicker v-model="color" class="p-2" />
                            </template>
                        </UPopover>
                    </UFormField>
                </div>
                <UFormField label="Description" class="w-full">
                    <UTextarea :rows="4" placeholder="Description for new assessment form" class="w-full" />
                </UFormField>
                <div class="text-right">
                    <UButton label="Save Form" icon="i-lucide-save" color="neutral" />
                </div>
            </div>
        </Block>
    </Page>
</template>
<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { formBuilderTabs } from '~/data'
const items = ref([
    {
        label: 'Folder',
        value: 'folder',
        icon: 'i-lucide-folder'
    },
    {
        label: 'User',
        value: 'user',
        icon: 'i-lucide-user'
    },
    {
        label: 'Ruler',
        value: 'ruler',
        icon: 'i-lucide-ruler'
    },
    {
        label: 'Activity',
        value: 'activity',
        icon: 'i-lucide-activity'
    }
    // add more option..
] satisfies SelectItem[])
const value = ref(items.value[0]?.value)
const icon = computed(() => items.value.find(item => item.value === value.value)?.icon)
const color = ref('#00C16A')
const chip = computed(() => ({ backgroundColor: color.value }))
</script>