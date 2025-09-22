<script setup lang="ts">
import type { DataCollectionFormCardProps } from '~/types/features'

const colors = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    darkBg: 'bg-blue-900/30',
    darkBorder: 'border-blue-700',
    darkIconBg: 'bg-blue-800/50',
    darkIconColor: 'text-blue-300'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    darkBg: 'bg-green-900/30',
    darkBorder: 'border-green-700',
    darkIconBg: 'bg-green-800/50',
    darkIconColor: 'text-green-300'
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    darkBg: 'bg-violet-900/30',
    darkBorder: 'border-violet-700',
    darkIconBg: 'bg-violet-800/50',
    darkIconColor: 'text-violet-300'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    darkBg: 'bg-orange-900/30',
    darkBorder: 'border-orange-700',
    darkIconBg: 'bg-orange-800/50',
    darkIconColor: 'text-orange-300'
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    darkBg: 'bg-pink-900/30',
    darkBorder: 'border-pink-700',
    darkIconBg: 'bg-pink-800/50',
    darkIconColor: 'text-pink-300'
  }
}

const bgColor = colors[props.color].bg
const borderColor = colors[props.color].border
const iconBg = colors[props.color].iconBg
const iconColor = colors[props.color].iconColor
const darkBgColor = colors[props.color].darkBg
const darkBorderColor = colors[props.color].darkBorder
const darkIconBg = colors[props.color].darkIconBg
const darkIconColor = colors[props.color].darkIconColor
</script>
<template>
  <div
    class="w-full p-5 rounded-lg border inline-flex justify-start items-start gap-4 transition-colors"
    :class="[
      bgColor,
      borderColor,
      'dark:' + darkBgColor,
      'dark:' + darkBorderColor
    ]"
  >
    <!-- Icon wrapper -->
    <div class="p-2 rounded-lg" :class="[iconBg, 'dark:' + darkIconBg]">
      <UIcon :name="icon" class="size-5 flex" :class="[iconColor, 'dark:' + darkIconColor]" />
    </div>

    <!-- Text content -->
    <div class="flex-1 space-y-2">
      <div class="text-default font-semibold">{{ title }}</div>
      <div class="text-sm text-muted">{{ description }}</div>

      <div class="self-stretch h-5 inline-flex justify-start items-center gap-2">
        <div class="flex justify-start items-center gap-2">
          <UIcon name="i-lucide-clock" class="size-4 text-dimmed flex" />
          <div class="text-sm text-muted">{{ duration }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
