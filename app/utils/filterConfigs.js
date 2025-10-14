// Configuration des filtres pour chaque page
export const filterConfigs = {
  // Filtres pour la page Utilisateurs
  users: {
    initialFilters: {
      search: '',
      role: '',
      status: '',
      experienceLevel: '',
      hasAvatar: null,
      achievements: [],
      dateRange: {
        start: '',
        end: ''
      }
    },
    options: {
      roles: [
        { value: 'admin', label: 'Administrateur' },
        { value: 'moderator', label: 'Modérateur' },
        { value: 'explorer', label: 'Explorateur' },
        { value: 'member', label: 'Membre' }
      ],
      status: [
        { value: 'active', label: 'Actif' },
        { value: 'inactive', label: 'Inactif' },
        { value: 'banned', label: 'Banni' },
        { value: 'pending', label: 'En attente' }
      ],
      experienceLevels: [
        { value: 'beginner', label: 'Débutant' },
        { value: 'intermediate', label: 'Intermédiaire' },
        { value: 'advanced', label: 'Avancé' },
        { value: 'expert', label: 'Expert' }
      ],
      achievements: [
        { value: 'first_exploration', label: 'Première exploration' },
        { value: 'photo_master', label: 'Maître photographe' },
        { value: 'circuit_creator', label: 'Créateur de circuit' },
        { value: 'community_helper', label: 'Aide communautaire' }
      ]
    }
  },

  // Filtres pour la page Circuits
  circuits: {
    initialFilters: {
      search: '',
      difficulty: '',
      region: '',
      type: '',
      status: '',
      duration: '',
      rating: null,
      hasImages: null
    },
    options: {
      difficulties: [
        { value: 'easy', label: 'Facile' },
        { value: 'medium', label: 'Moyen' },
        { value: 'hard', label: 'Difficile' },
        { value: 'expert', label: 'Expert' }
      ],
      regions: [
        { value: 'paris', label: 'Paris' },
        { value: 'lyon', label: 'Lyon' },
        { value: 'marseille', label: 'Marseille' },
        { value: 'bordeaux', label: 'Bordeaux' },
        { value: 'lille', label: 'Lille' }
      ],
      types: [
        { value: 'industrial', label: 'Industriel' },
        { value: 'residential', label: 'Résidentiel' },
        { value: 'hospital', label: 'Hôpital' },
        { value: 'school', label: 'École' },
        { value: 'factory', label: 'Usine' },
        { value: 'other', label: 'Autre' }
      ],
      status: [
        { value: 'active', label: 'Actif' },
        { value: 'archived', label: 'Archivé' },
        { value: 'draft', label: 'Brouillon' }
      ],
      durations: [
        { value: '0-2h', label: 'Moins de 2h' },
        { value: '2-4h', label: '2-4 heures' },
        { value: '4-8h', label: '4-8 heures' },
        { value: '8h+', label: 'Plus de 8h' }
      ]
    }
  },

  // Filtres pour la page Missions
  missions: {
    initialFilters: {
      search: '',
      status: '',
      priority: '',
      assignee: '',
      type: '',
      dateRange: {
        start: '',
        end: ''
      }
    },
    options: {
      status: [
        { value: 'pending', label: 'En attente' },
        { value: 'in_progress', label: 'En cours' },
        { value: 'completed', label: 'Terminée' },
        { value: 'cancelled', label: 'Annulée' }
      ],
      priorities: [
        { value: 'low', label: 'Basse' },
        { value: 'medium', label: 'Moyenne' },
        { value: 'high', label: 'Haute' },
        { value: 'urgent', label: 'Urgente' }
      ],
      types: [
        { value: 'exploration', label: 'Exploration' },
        { value: 'documentation', label: 'Documentation' },
        { value: 'photography', label: 'Photographie' },
        { value: 'research', label: 'Recherche' },
        { value: 'maintenance', label: 'Maintenance' }
      ]
    }
  },

  // Filtres pour la page Succès
  success: {
    initialFilters: {
      search: '',
      category: '',
      difficulty: '',
      isUnlocked: null,
      rarity: ''
    },
    options: {
      categories: [
        { value: 'exploration', label: 'Exploration' },
        { value: 'photography', label: 'Photographie' },
        { value: 'community', label: 'Communauté' },
        { value: 'knowledge', label: 'Connaissance' },
        { value: 'special', label: 'Spécial' }
      ],
      difficulties: [
        { value: 'easy', label: 'Facile' },
        { value: 'medium', label: 'Moyen' },
        { value: 'hard', label: 'Difficile' },
        { value: 'legendary', label: 'Légendaire' }
      ],
      rarities: [
        { value: 'common', label: 'Commun' },
        { value: 'uncommon', label: 'Peu commun' },
        { value: 'rare', label: 'Rare' },
        { value: 'epic', label: 'Épique' },
        { value: 'legendary', label: 'Légendaire' }
      ]
    }
  },

  // Filtres pour la page Notifications
  notifications: {
    initialFilters: {
      search: '',
      type: '',
      status: '',
      priority: '',
      dateRange: {
        start: '',
        end: ''
      }
    },
    options: {
      types: [
        { value: 'system', label: 'Système' },
        { value: 'user', label: 'Utilisateur' },
        { value: 'mission', label: 'Mission' },
        { value: 'achievement', label: 'Succès' },
        { value: 'circuit', label: 'Circuit' }
      ],
      status: [
        { value: 'unread', label: 'Non lue' },
        { value: 'read', label: 'Lue' },
        { value: 'archived', label: 'Archivée' }
      ],
      priorities: [
        { value: 'low', label: 'Basse' },
        { value: 'medium', label: 'Moyenne' },
        { value: 'high', label: 'Haute' },
        { value: 'critical', label: 'Critique' }
      ]
    }
  },

  // Filtres pour la page Tickets
  tickets: {
    initialFilters: {
      search: '',
      status: '',
      priority: '',
      category: '',
      assignee: '',
      reporter: '',
      dateRange: {
        start: '',
        end: ''
      }
    },
    options: {
      status: [
        { value: 'open', label: 'Ouvert' },
        { value: 'in_progress', label: 'En cours' },
        { value: 'resolved', label: 'Résolu' },
        { value: 'closed', label: 'Fermé' },
        { value: 'rejected', label: 'Rejeté' }
      ],
      priorities: [
        { value: 'low', label: 'Basse' },
        { value: 'medium', label: 'Moyenne' },
        { value: 'high', label: 'Haute' },
        { value: 'critical', label: 'Critique' }
      ],
      categories: [
        { value: 'bug', label: 'Bug' },
        { value: 'feature', label: 'Fonctionnalité' },
        { value: 'support', label: 'Support' },
        { value: 'improvement', label: 'Amélioration' },
        { value: 'question', label: 'Question' }
      ]
    }
  }
}

// Fonction pour obtenir la configuration des filtres d'une page
export function getFilterConfig(page) {
  return filterConfigs[page] || {
    initialFilters: {},
    options: {}
  }
}

// Fonction pour appliquer les filtres à un dataset
export function applyFilters(data, filters, config) {
  if (!data || !Array.isArray(data)) return []
  
  return data.filter(item => {
    // Filtre de recherche général
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase()
      const searchableFields = ['name', 'title', 'email', 'username', 'description']
      const hasMatch = searchableFields.some(field => 
        item[field] && item[field].toString().toLowerCase().includes(searchTerm)
      )
      if (!hasMatch) return false
    }

    // Filtres spécifiques
    for (const [key, value] of Object.entries(filters)) {
      if (key === 'search' || !value) continue

      // Filtre de plage de dates
      if (key === 'dateRange' && value.start && value.end) {
        const itemDate = new Date(item.createdAt || item.created_at || item.date)
        const startDate = new Date(value.start)
        const endDate = new Date(value.end)
        if (itemDate < startDate || itemDate > endDate) return false
        continue
      }

      // Filtre tableau (pour les achievements par exemple)
      if (Array.isArray(value) && value.length > 0) {
        if (!item[key] || !value.some(v => item[key].includes(v))) return false
        continue
      }

      // Filtre booléen
      if (typeof value === 'boolean') {
        if (!!item[key] !== value) return false
        continue
      }

      // Filtre string/number
      if (value && item[key] !== value) return false
    }

    return true
  })
}