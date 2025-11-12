<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const series = ref([
  {
    name: 'Fitness',
    data: [20, 35, 50, 65, 80, 85, 75, 60],
  },
  {
    name: 'Speed',
    data: [40, 55, 60, 50, 68, 55, 60, 70],
  },
  {
    name: 'Strength',
    data: [30, 55, 70, 85, 92, 90, 85, 80],
  },
  {
    name: 'Endurance',
    data: [60, 50, 55, 70, 55, 50, 60, 65],
  },
])

const chartOptions = computed(() => {
  const isDark = colorMode.value === 'dark'
  return {
    chart: {
      type: 'line',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: `'Public Sans', sans-serif`,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      labels: { style: { colors: 'var(--ui-text-toned)' } },
      axisBorder: { color: 'var(--ui-border)' },
      axisTicks: { color: 'var(--ui-border)' },
    },
    legend: {
      position: 'bottom',
      labels: { colors: 'var(--ui-text-toned)' },
      markers: {
            strokeWidth: 0,
            offsetX: -6,
            customHTML: () => {
                return `<div style="
                width: 12px;
                height: 12px;
                border-radius: 4px;
                background-color: currentColor;
                display: inline-block;
            "></div>`
            }
        },
      itemMargin: { horizontal: 12 },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    colors: ['var(--ui-color-cyan-500)', 'var(--ui-color-lime-500)', 'var(--ui-color-amber-500)', 'var(--ui-color-pink-500)'],
    stroke: {
      width: 3,
      curve: 'monotoneCubic',
    },
    grid: { borderColor: 'var(--ui-border)' },
  }
})
</script>

<template>
  <ClientOnly>
    <ApexChart type="line" height="220" :options="chartOptions" :series="series" />
  </ClientOnly>
</template>
