<template>
  <span :class="textClasses">
    • Dernière mise à jour: {{ displayTime }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lastUpdated: {
    type: [Date, String, Number],
    default: null
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['xs', 'sm', 'md'].includes(value)
  },
  variant: {
    type: String,
    default: 'muted',
    validator: (value) => ['muted', 'normal', 'accent'].includes(value)
  }
})

const displayTime = computed(() => {
  if (!props.lastUpdated) {
    return 'Jamais mis à jour'
  }
  
  try {
    const date = new Date(props.lastUpdated)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffMins < 1) {
      return 'À l\'instant'
    } else if (diffMins < 60) {
      return `Il y a ${diffMins} min`
    } else if (diffMins < 1440) { // 24h
      const diffHours = Math.floor(diffMins / 60)
      return `Il y a ${diffHours}h`
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  } catch (error) {
    return 'Date invalide'
  }
})

const textClasses = computed(() => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base'
  }
  
  const variantClasses = {
    muted: 'text-gray-400',
    normal: 'text-gray-600',
    accent: 'text-purple-600'
  }
  
  return [
    sizeClasses[props.size],
    variantClasses[props.variant]
  ].join(' ')
})
</script>