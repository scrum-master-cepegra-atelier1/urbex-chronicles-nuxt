<template>
  <div :class="containerClasses">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <UiIcon 
          v-if="icon" 
          :name="icon" 
          :size="iconSize"
          :class="iconClasses"
        />
        <div>
          <h1 :class="titleClasses">
            {{ title }}
          </h1>
        </div>
      </div>
      
      <div v-if="$slots.actions" class="flex items-center space-x-3">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
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
  size: {
    type: String,
    default: 'lg',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  spacing: {
    type: String,
    default: 'default',
    validator: (value) => ['tight', 'default', 'loose'].includes(value)
  }
})

const containerClasses = computed(() => {
  const spacingMap = {
    tight: 'mb-6',
    default: 'mb-8',
    loose: 'mb-12'
  }
  
  return `flex-shrink-0 ${spacingMap[props.spacing]}`
})

const titleClasses = computed(() => {
  const sizeMap = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  }
  
  return `text-gray-900 font-bold ${sizeMap[props.size]} font-heading`
})

const subtitleClasses = computed(() => {
  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  
  return `text-gray-600 mt-1 ${sizeMap[props.size]}`
})

const iconSize = computed(() => {
  const sizeMap = {
    sm: '24',
    md: '32',
    lg: '36',
    xl: '48'
  }
  
  return sizeMap[props.size]
})

const iconClasses = computed(() => {
  return 'text-purple-600'
})
</script>

<style scoped>
.font-heading {
  font-family: 'Do Hyeon', sans-serif;
}
</style>