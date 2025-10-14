// Design System Configuration
export const designSystem = {
  // Couleurs principales
  colors: {
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309'
    },
    danger: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },

  // Typographie
  typography: {
    fontFamilies: {
      heading: '"Do Hyeon", sans-serif',
      display: '"Freeman", sans-serif',
      body: '"Inter", system-ui, sans-serif'
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    }
  },

  // Espacement
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },

  // Border radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out'
  }
}

// Utilitaires pour les composants
export const getStatusVariant = (user) => {
  if (user.blocked) return 'danger'
  if (!user.confirmed) return 'warning'
  return 'success'
}

export const getStatusLabel = (user) => {
  if (user.blocked) return 'Bloqué'
  if (!user.confirmed) return 'Non confirmé'
  return 'Actif'
}

export const formatExperience = (experience) => {
  if (!experience) return '0 XP'
  return `${experience.toLocaleString()} XP`
}

export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A'
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  }
  
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', defaultOptions)
  } catch (error) {
    return 'Date invalide'
  }
}