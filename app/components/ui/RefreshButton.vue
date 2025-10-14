<template>
  <button 
    @click="handleClick" 
    :disabled="loading || disabled"
    :class="buttonClasses"
  >
    <UiIcon 
      name="refresh" 
      :size="iconSize"
      :class="{ 'animate-spin': loading }" 
      class="mr-2"
    />
    {{ loading ? loadingText : label }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Actualiser'
  },
  loadingText: {
    type: String,
    default: 'Actualisation...'
  },
  variant: {
    type: String,
    default: 'secondary',
    validator: (value) => ['primary', 'secondary', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.loading && !props.disabled) {
    emit('click')
  }
}

const buttonClasses = computed(() => {
  const baseClasses = 'flex items-center font-medium rounded-lg transition-colors duration-200 disabled:opacity-50'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const variantClasses = {
    primary: 'text-white bg-purple-600 hover:bg-purple-700',
    secondary: 'text-gray-600 bg-gray-100 hover:bg-gray-200',
    ghost: 'text-gray-600 border border-gray-300 hover:bg-gray-50'
  }
  
  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant]
  ].join(' ')
})

const iconSize = computed(() => {
  const sizes = {
    sm: 'sm',
    md: 'md', 
    lg: 'lg'
  }
  return sizes[props.size]
})
</script>