<script setup lang="ts">
import { ref, computed } from 'vue'
import { useColorMode } from '#imports'
import { tooltip } from '#build/ui'

const colorMode = useColorMode()

const series = [67, 22, 80, 20, 25]
const labels = ['Swimming', 'Basketball', 'Soccer', 'Tennis', 'Running']
const customColors = ['var(--ui-pink)', 'var(--ui-blue)', 'var(--ui-violet)', 'var(--ui-yellow)', 'var(--ui-green)' ]

const chartOptions = computed(() => {
    const isDark = colorMode.value === 'dark'
    return {
        labels,
        colors: customColors,
        chart: {
            background: 'transparent',
            toolbar: {
                show: false
            },
            fontFamily: `'Public Sans', sans-serif`
        },
        legend: {
            position: 'right',
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
            colors: isDark ? 'dark' : 'light'
        }
    }
    
})
</script>
<template>
    <client-only>
        <div class="w-full max-w-md mx-auto">
            <ApexChart type="donut" :options="chartOptions" :series="series" width="370" />
        </div>
    </client-only>
</template>