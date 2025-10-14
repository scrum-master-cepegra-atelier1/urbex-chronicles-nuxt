<template>
  <span :class="badgeClasses">
    <UiIcon 
      v-if="icon" 
      :name="icon" 
      size="12"
      class="mr-1" 
    />
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'warning', 'danger', 'info', 'purple'].includes(value)
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['xs', 'sm', 'md'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  rounded: {
    type: Boolean,
    default: true
  }
})

const badgeClasses = computed(() => {
  const baseClasses = 'inline-flex items-center font-medium'
  
  // Tailles
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  }
  
  // Variantes de couleur
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800'
  }
  
  // Border radius
  const roundedClasses = props.rounded ? 'rounded-full' : 'rounded'
  
  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    roundedClasses
  ].join(' ')
})
</script>