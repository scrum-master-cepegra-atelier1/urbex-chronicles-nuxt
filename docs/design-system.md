# Design System - Urbex Chronicles

Ce document décrit le système de design unifié pour l'application Urbex Chronicles.

## 🎨 Couleurs

### Palette principale
- **Primary (Purple)**: Couleur principale de la marque
  - `bg-purple-50` à `bg-purple-900`
  - Utilisée pour les actions principales, liens importants
  
- **Success (Green)**: Succès, validation, statuts positifs
  - `bg-green-50` à `bg-green-900`
  
- **Warning (Yellow)**: Avertissements, attention
  - `bg-yellow-50` à `bg-yellow-900`
  
- **Danger (Red)**: Erreurs, suppressions, actions destructives
  - `bg-red-50` à `bg-red-900`

- **Gray**: Textes, arrière-plans neutres
  - `bg-gray-50` à `bg-gray-900`

## 🔤 Typographie

### Polices
- **Titres**: `Do Hyeon` - Pour les titres de pages et sections
- **Display**: `Freeman` - Pour les gros chiffres et statistiques
- **Corps**: `Inter` - Pour le texte courant

### Tailles
- `text-xs` (12px) - Textes très petits, badges
- `text-sm` (14px) - Textes secondaires
- `text-base` (16px) - Texte par défaut
- `text-lg` (18px) - Textes importants
- `text-xl` à `text-5xl` - Titres hiérarchisés

## 🧩 Composants

### UiButton
Bouton standardisé avec variantes et états.

```vue
<UiButton
  label="Mon bouton"
  variant="primary|secondary|success|danger|warning|ghost"
  size="sm|md|lg"
  icon="nom-icone"
  :loading="false"
  :disabled="false"
  @click="handleClick"
/>
```

#### Variantes
- `primary`: Action principale (purple)
- `secondary`: Action secondaire (gray)
- `success`: Action positive (green)
- `danger`: Action destructive (red)
- `warning`: Action d'attention (yellow)
- `ghost`: Bouton transparent avec bordure

### UiBadge
Badges pour statuts, catégories, etc.

```vue
<UiBadge
  label="Mon badge"
  variant="default|success|warning|danger|info|purple"
  size="xs|sm|md"
  icon="nom-icone"
/>
```

### UiIcon
Icône SVG standardisée.

```vue
<UiIcon
  name="nom-icone"
  :size="20"
  color="currentColor"
  class="text-purple-600"
/>
```

### UiStatsCard
Carte de statistique avec valeur numérique.

```vue
<UiStatsCard
  label="Utilisateurs"
  :value="156"
  subtitle="Description optionnelle"
  icon="user"
  variant="primary|success|warning|danger|default"
  size="sm|md|lg"
/>
```

### UiPageHeader
En-tête de page unifié.

```vue
<UiPageHeader
  title="Ma page"
  subtitle="Description de la page"
  icon="user"
  size="sm|md|lg|xl"
>
  <template #actions>
    <UiButton label="Action" />
  </template>
</UiPageHeader>
```

## 🎯 Icônes

Les icônes sont stockées dans `/public/images/icons/` au format SVG.

### Icônes disponibles
- `check` - Validation
- `check-circle` - Validation avec cercle
- `close` - Fermeture
- `edit` - Modification
- `trash` - Suppression
- `refresh` - Actualisation
- `exclamation` - Attention
- `warning` - Avertissement
- `plus` - Ajout
- `search` - Recherche
- `eye` - Visualisation
- `settings` - Paramètres
- `user` - Utilisateur

## 🎭 États et variantes

### Statuts utilisateur
```javascript
// Fonction utilitaire pour les statuts
getStatusVariant(user) {
  if (user.blocked) return 'danger'
  if (!user.confirmed) return 'warning' 
  return 'success'
}

getStatusLabel(user) {
  if (user.blocked) return 'Bloqué'
  if (!user.confirmed) return 'Non confirmé'
  return 'Actif'
}
```

### Formatage des données
```javascript
// Formatage de l'expérience
formatExperience(experience) {
  return `${experience.toLocaleString()} XP`
}

// Formatage des dates
formatDate(dateString, options = {}) {
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}
```

## 📐 Espacement

### Marges et paddings
- `p-2` (8px) - Padding serré
- `p-4` (16px) - Padding standard
- `p-6` (24px) - Padding large
- `mb-6` (24px) - Marge bottom normale
- `mb-8` (32px) - Marge bottom standard
- `mb-12` (48px) - Marge bottom large

### Grilles
```vue
<!-- Grille responsive pour cartes -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <UiStatsCard ... />
</div>
```

## 🎪 Animations

### Transitions standardisées
- `transition-colors duration-200` - Changement de couleur
- `transition-all duration-300` - Transition complète
- `hover:bg-purple-700` - États de survol

### Loading states
- `animate-spin` - Rotation pour loading
- `animate-pulse` - Pulsation pour skeleton

## 📱 Responsive

### Breakpoints
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

### Patterns responsifs
```vue
<!-- Texte responsive -->
<h1 class="text-2xl md:text-4xl lg:text-5xl">

<!-- Grille responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- Padding responsive -->
<div class="p-4 lg:p-8">
```

## 🎨 Guidelines d'utilisation

### Cohérence des actions
- **Créer/Ajouter**: Bouton `success` avec icône `plus`
- **Modifier**: Bouton `primary` avec icône `edit`
- **Supprimer**: Bouton `danger` avec icône `trash`
- **Voir/Consulter**: Bouton `ghost` avec icône `eye`
- **Actualiser**: Bouton `primary` avec icône `refresh`

### Hiérarchie des informations
1. **Titre principal**: `UiPageHeader` avec icône
2. **Statistiques**: Cartes `UiStatsCard` en grille
3. **Actions**: `UiButton` groupés et hiérarchisés
4. **Contenu**: Tableaux, listes avec composants uniformes

### Feedback utilisateur
- **Succès**: Badges/messages verts avec icône `check`
- **Erreur**: Messages rouges avec icône `exclamation`
- **Attention**: Messages jaunes avec icône `warning`
- **Loading**: Spinners avec texte explicite

---

Cette documentation évolue avec le projet. Consultez les composants dans `/app/components/ui/` pour les implémentations complètes.