<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const series = ref([
{
    name: 'Students',
    data: [15, 25, 60, 95, 85],
  }
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
            categories: ['0-20', '21-40', '41-60', '61-80', '81-100'],
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
            colors: 'var(--ui-color-green-500)',
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
            }
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
        <ApexChart type="bar" height="360" :options="chartOptions" :series="series" />
    </ClientOnly>
</template>