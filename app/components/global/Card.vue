<script setup lang="ts">
import type { CardProps } from '~/types/models'

withDefaults(defineProps<CardProps>(), {
    layout: () => ['description', 'custom', 'tags'],
    ui: () => ({
        wrapper: '',
        header: '',
        body: '',
        footer: '',
        image: '',
        icon: '',
    })
})
</script>

<template>
    <UCard :ui="{ header: 'p-0 sm:p-0', body: 'p-0 sm:p-0' }" :class="ui.wrapper">

        <!-- IMAGE HEADER -->
        <template #header v-if="img || $slots.image">
            <slot name="image">
                <img
                    :src="img.src"
                    class="w-full object-cover"
                    :class="ui.image"
                    :alt="img.alt || title || 'Card image'"
                    loading="lazy"
                />
            </slot>
        </template>

        <div class="py-4 sm:py-6">
            <!-- MAIN HEADER -->
            <div class="flex items-center gap-3 px-4 sm:px-6" :class="ui.header">
                <UAvatar v-if="icon || avatar" :icon="icon" :src="avatar" size="2xl" :class="ui.icon" />
                <div class="flex-1">
                    <div class="font-semibold line-clamp-1">{{ title }}</div>
                    <slot name="subtitle">
                        <div v-if="subtitle" class="text-sm text-muted">
                            {{ subtitle }}
                        </div>
                    </slot>
                </div>

                <slot name="actions">
                    <UDropdownMenu
                        v-if="actions?.length"
                        :items="actions"
                        :content="{ align: 'end', side: 'bottom', sideOffset: 8 }"
                        size="sm"
                    >
                        <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" size="sm" />
                    </UDropdownMenu>
                </slot>
            </div>

            <!-- BODY -->
            <div class="px-4 sm:px-6" :class="ui.body">
                <template v-for="section in layout" :key="section">

                    <!-- Description -->
                    <template v-if="section === 'description'">
                        <slot name="description">
                            <div v-if="description" class="text-muted text-sm line-clamp-2 mt-4">
                                {{ description }}
                            </div>
                        </slot>
                    </template>

                    <!-- Custom -->
                    <template v-else-if="section === 'custom'">
                        <slot name="custom" />
                    </template>

                    <!-- Tags -->
                    <template v-else-if="section === 'tags'">
                        <slot name="tags">
                            <div v-if="tags?.length" class="flex flex-wrap gap-2 mt-4">
                                <UBadge
                                    v-for="(tag, index) in tags.slice(0, 2)"
                                    :key="index"
                                    :label="tag"
                                    variant="soft"
                                    color="neutral"
                                />
                                <UBadge
                                    v-if="tags.length > 2"
                                    :label="`+${tags.length - 2}`"
                                    variant="soft"
                                    color="neutral"
                                />
                            </div>
                        </slot>
                    </template>

                </template>
            </div>
        </div>
        <!-- FOOTER -->
        <template #footer v-if="$slots.footer">
            <div :class="ui.footer">
                <slot name="footer" />
            </div>
        </template>

    </UCard>
</template>

