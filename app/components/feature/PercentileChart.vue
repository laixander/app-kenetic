<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const series = ref([
  {
    data: [70, 75, 78, 82],
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
            categories: ['25%', '50%', '75%', '90%'],
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