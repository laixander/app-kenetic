<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const series = ref([
  {
    name: 'Fitness',
    data: [70, 75, 78, 82, 76, 85, 88, 90],
  },
  {
    name: 'Speed',
    data: [60, 68, 80, 65, 78, 72, 85, 83],
  },
  {
    name: 'Strength',
    data: [85, 87, 90, 92, 93, 91, 95, 94],
  },
  {
    name: 'Endurance',
    data: [65, 70, 72, 75, 78, 82, 86, 89],
  },
])

const chartOptions = computed(() => {
    const isDark = colorMode.value === 'dark'
    return {
        chart: {
            type: 'bar',
            stacked: false,
            background: 'transparent',
            toolbar: {
                show: false
            },
            fontFamily: `'Public Sans', sans-serif`
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            labels: {
                style: { colors: 'var(--ui-text-toned)' },
            },

            axisBorder: {
                show: true,
                color: 'var(--ui-border)'
            },
            axisTicks: {
                show: true,
                color: 'var(--ui-border)'
            },
        },
        legend: {
            position: 'top',
            labels: {
                colors: 'var(--ui-text-toned)'
            },
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
            itemMargin: {
                horizontal: 12
            },
        },
        tooltip: {
            theme: isDark ? 'dark' : 'light'
        },
        fill: {
            opacity: 1,
            colors: ['var(--ui-color-cyan-500)', 'var(--ui-color-lime-500)', 'var(--ui-color-amber-500)', 'var(--ui-color-pink-500)'],
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
            }
        },
        stroke: {
            show: true,
            width: 4,
            colors: ['transparent']
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: 'var(--ui-border)'
        },
    }
})
</script>
<template>
    <ClientOnly>
        <ApexChart type="bar" height="400" :options="chartOptions" :series="series" />
    </ClientOnly>
</template>