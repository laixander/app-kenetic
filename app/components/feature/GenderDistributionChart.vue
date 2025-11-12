<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '#imports'

const colorMode = useColorMode()

const series = [80, 20]
const labels = ['Male', 'Female']
const customColors = [ 'var(--ui-blue)', 'var(--ui-pink)' ]

const chartOptions = computed(() => {
    const isDark = colorMode.value === 'dark'
    return {
        labels,
        colors: customColors,
        chart: {
            type: 'donut',
            background: 'transparent',
            toolbar: {
                show: false
            },
            fontFamily: `'Public Sans', sans-serif`
        },
        legend: {
            position: 'right',
            offsetY: 72,
            labels: {
                colors: isDark ? 'dark' : 'light'
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
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: isDark ? '#1d293d' : '#ffffff'
        }
    }
    
})
</script>
<template>
    <div class="w-full max-w-md mx-auto">
        <ClientOnly>
            <ApexChart type="donut" :options="chartOptions" :series="series" width="350" />
        </ClientOnly>
    </div>
</template>