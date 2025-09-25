<script setup lang="ts">
import { formBuilderTabs } from '~/data'
import { ref } from 'vue'

interface Section {
    id: number
    title: string
    icon: string
    editing?: boolean
}

const sections = ref<Section[]>([])

let sectionCounter = 0

const addSection = () => {
    sectionCounter++
    sections.value.push({
        id: sectionCounter,
        title: `New Section ${sectionCounter}`,
        icon: 'i-lucide-folder',
        editing: false
    })
}

const startEdit = (id: number) => {
    const section = sections.value.find(s => s.id === id)
    if (section) section.editing = true
}

const saveEdit = (id: number) => {
    const section = sections.value.find(s => s.id === id)
    if (section) section.editing = false
}
</script>

<template>
    <Page title="Form Builder" description="Create and customize data collection forms for sports assessments">
        <template #toolbar>
            <UButton label="Back to Forms" icon="i-lucide-arrow-left" variant="ghost" to="/data-collection" />
        </template>
        <template #actions>
            <Tabs :items="formBuilderTabs" />
        </template>


        <Block title="Form Builder" description="Design and customize your data collection forms here">
            <!-- Dynamic Sections -->
            <div v-for="section in sections" :key="section.id" class="space-y-4 mb-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 flex-1">
                        <UIcon :name="section.icon" class="size-5" />

                        <!-- Editable Title -->
                        <UInput v-if="section.editing" v-model="section.title" class="w-full"
                            placeholder="Section title" autofocus @keydown.enter="saveEdit(section.id)"
                            @blur="saveEdit(section.id)" />
                        <span v-else class="font-medium">{{ section.title }}</span>
                    </div>

                    <!-- Show pen only when not editing -->
                    <UButton v-if="!section.editing" icon="i-lucide-pencil" variant="ghost" size="sm"
                        @click="startEdit(section.id)" />
                </div>

                <div class="text-muted-foreground text-sm italic">
                    [Add New Field Row]
                </div>

                <USeparator />
            </div>

            <!-- Add Section Button -->
            <UButton label="Add Section" icon="i-lucide-plus" color="neutral" @click="addSection" />
        </Block>



    </Page>
</template>