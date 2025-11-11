<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const series = ref([
    { name: 'Cardio', data: [31, 40, 28, 51] },
    { name: 'Strength', data: [11, 32, 45, 32] },
    { name: 'Flexibility', data: [15, 25, 20, 40] },
    { name: 'Overall Score', data: [20, 30, 35, 25] }
])

const chartOptions = computed(() => {
    const isDark = colorMode.value === 'dark'

    // Core palette (light vs dark mode)
    const colors = isDark
        ? [
            'var(--ui-color-green-400)',
            'var(--ui-color-pink-400)',
            'var(--ui-color-violet-400)',
            'var(--ui-color-amber-400)'
        ]
        : [
            'var(--ui-color-green-500)',
            'var(--ui-color-pink-500)',
            'var(--ui-color-violet-500)',
            'var(--ui-color-amber-500)'
        ]

    // Softer fill tints for each color
    const fillColors = isDark
        ? [
            'var(--ui-color-green-900)',
            'var(--ui-color-pink-900)',
            'var(--ui-color-violet-900)',
            'var(--ui-color-amber-900)'
        ]
        : [
            'var(--ui-color-green-100)',
            'var(--ui-color-pink-100)',
            'var(--ui-color-violet-100)',
            'var(--ui-color-amber-100)'
        ]

    return {
        chart: {
            type: 'area',
            stacked: true,
            background: 'transparent',
            toolbar: { show: false },
            fontFamily: `'Public Sans', sans-serif`
        },

        xaxis: {
            categories: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
            labels: { style: { colors: 'var(--ui-text-toned)' } },
            axisBorder: { show: true, color: 'var(--ui-border)' },
            axisTicks: { show: true, color: 'var(--ui-border)' }
        },

        legend: {
            position: 'top',
            labels: { colors: 'var(--ui-text-toned)' },
            markers: {
                strokeWidth: 0,
                offsetX: -6,
                customHTML: () => `
          <div style="
            width: 12px;
            height: 12px;
            border-radius: 4px;
            background-color: currentColor;
            display: inline-block;
          "></div>
        `
            },
            itemMargin: { horizontal: 12 }
        },

        tooltip: {
            theme: isDark ? 'dark' : 'light'
        },

        // Series line colors
        colors,

        // Fill colors with smooth transparency
        fill: {
            type: 'solid',
            colors: fillColors,
            opacity: 0.4
        },

        stroke: {
            curve: 'smooth',
            width: 3
        },

        dataLabels: {
            enabled: false
        },

        grid: {
            borderColor: 'var(--ui-border)',
            strokeDashArray: 3
        }
    }
})
</script>

<template>
    <ClientOnly>
        <ApexChart type="area" height="360" :options="chartOptions" :series="series" />
    </ClientOnly>
</template>
