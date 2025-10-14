<template>
  <div :class="cardClasses">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div :class="iconClasses">
          <UiIcon 
            v-if="icon" 
            :name="icon" 
            class="h-6 w-6" 
          />
        </div>
      </div>
      <div class="ml-5 w-0 flex-1">
        <dl>
          <dt :class="labelClasses">
            {{ label }}
          </dt>
          <dd class="flex items-baseline">
            <div :class="valueClasses">
              {{ formattedValue }}
            </div>
            <p v-if="subtitle" :class="subtitleClasses">
              {{ subtitle }}
            </p>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'purple'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

// Classes calculées
const cardClasses = computed(() => {
  const sizes = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6'
  }
  
  return [
    'relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden',
    sizes[props.size]
  ].join(' ')
})

const iconClasses = computed(() => {
  const variants = {
    primary: 'bg-emerald-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
    purple: 'bg-purple-500'
  }
  
  return [
    'flex items-center justify-center h-10 w-10 rounded-md text-white',
    variants[props.variant] || variants.primary
  ].join(' ')
})

const labelClasses = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  }
  
  return [
    'font-medium text-gray-500 truncate',
    sizes[props.size]
  ].join(' ')
})

const valueClasses = computed(() => {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }
  
  return [
    'font-semibold text-gray-900',
    sizes[props.size]
  ].join(' ')
})

const subtitleClasses = computed(() => {
  return 'ml-2 flex items-baseline text-sm font-semibold text-gray-600'
})

// Valeur formatée
const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})
</script>