<template>
  <!--
    CircularProgress.vue
    Nuxt 3 / Vue 3 single-file component (script setup)

    Props:
      - value (Number, 0-100) : progress value
      - size (Number) : width/height in px
      - stroke (Number) : stroke width in px
      - color (String) : stroke color (any valid CSS color)
      - track (String) : track circle color
      - animated (Boolean) : smooth transitions when value changes
      - indeterminate (Boolean) : show an infinite spinner
      - showLabel (Boolean) : whether to render value label inside

    Example usage:
      <CircularProgress :value="72" size="120" stroke="12" color="#06b6d4" />
      <CircularProgress indeterminate size="48" stroke="3" />
  -->

  <div
    class="c-progress"
    :style="{ width: size + 'px', height: size + 'px' }"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="normalizedValue"
    :aria-busy="indeterminate ? 'true' : 'false'"
  >
    <svg :width="size" :height="size" viewBox="0 0 100 100" class="c-progress__svg" :class="{ 'is-indeterminate': indeterminate }">
      <!-- background / track circle -->
      <circle
        class="c-progress__track"
        cx="50"
        cy="50"
        :r="radius"
        :stroke-width="(stroke * 100) / size"
        fill="none"
        :style="{ stroke: track }"
      />

      <!-- progress circle -->
      <circle
        class="c-progress__value"
        cx="50"
        cy="50"
        :r="radius"
        :stroke-width="(stroke * 100) / size"
        fill="none"
        stroke-linecap="round"
        :style="valueStyle"
      />

      <!-- optional center content / slot -->
      <foreignObject x="14" y="14" :width="72" :height="72">
        <div class="c-progress__center" xmlns="http://www.w3.org/1999/xhtml">
          <slot>
            <div v-if="showLabel && !indeterminate" class="c-progress__label" :style="labelStyle" aria-hidden>
              {{ Math.round(normalizedValue) }}%
            </div>
            <div v-else-if="indeterminate" class="c-progress__label" aria-hidden>
              Loading
            </div>
          </slot>
        </div>
      </foreignObject>
    </svg>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  size: { type: Number, default: 96 },
  stroke: { type: Number, default: 10 },
  color: { type: String, default: 'currentColor' },
  track: { type: String, default: 'rgba(0,0,0,0.08)' },
  animated: { type: Boolean, default: true },
  indeterminate: { type: Boolean, default: false },
  showLabel: { type: Boolean, default: true },
  labelColor: { type: String, default: 'inherit' }, // 👈 new
  labelSize: { type: [String, Number], default: '0.9rem' } // 👈 new
})

const { value, size, stroke, color, track, animated, indeterminate } = toRefs(props)

// Use a 100x100 viewBox; radius expressed in that scale
const radius = computed(() => {
  // keep stroke inside viewbox: r = 50 - stroke/2 (in viewBox units)
  const sw = (stroke.value * 100) / size.value
  return 50 - sw / 2
})

const circumference = computed(() => 2 * Math.PI * radius.value)

const normalizedValue = computed(() => {
  const v = Number(value.value)
  if (Number.isNaN(v)) return 0
  return Math.max(0, Math.min(100, v))
})

const dashoffset = computed(() => {
  // progress from 0 (empty) to 100 (full)
  return circumference.value * (1 - normalizedValue.value / 100)
})

const labelStyle = computed(() => ({
  color: props.labelColor,
  fontSize: typeof props.labelSize === 'number' ? `${props.labelSize}px` : props.labelSize,
}))

const valueStyle = computed(() => {
  // stroke-dasharray: circumference, stroke-dashoffset: computed
  const base = `${circumference.value.toFixed(3)} ${circumference.value.toFixed(3)}`
  const style = {
    stroke: color.value,
    strokeDasharray: base,
    strokeDashoffset: indeterminate.value ? undefined : `${dashoffset.value.toFixed(3)}`,
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%'
  }

  if (animated.value && !indeterminate.value) {
    // Smooth transition on the dashoffset
    style.transition = 'stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1), stroke 0.2s'
  }

  if (indeterminate.value) {
    // When indeterminate, we prefer a dash pattern that'll animate well
    style.strokeDasharray = `${(circumference.value * 0.25).toFixed(3)} ${circumference.value.toFixed(3)}`
    style.strokeDashoffset = 0
    style.transition = 'none'
  }

  return style
})
</script>

<style scoped>
.c-progress {
  display: inline-block;
  position: relative;
  line-height: 0; /* prevent inline gaps */
}

.c-progress__svg {
  display: block;
}

.c-progress__track {
  transition: stroke 0.2s;
}

.c-progress__value {
  transform-origin: 50% 50%;
  transition: stroke 0.2s;
}

/* center content styling inside foreignObject */
.c-progress__center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-family: inherit;
}

.c-progress__label {
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  color: inherit;
}

/* Indeterminate animation: spin the whole SVG */
.c-progress__svg.is-indeterminate {
  animation: c-progress-spin 1.2s linear infinite;
}

@keyframes c-progress-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* small polish: reduce label size on tiny components */
@media (max-width: 420px) {
  .c-progress__label { font-size: 0.8rem }
}
</style>
