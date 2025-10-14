# Fix: Affichage des 3 états de publication Strapi v5

## 🐛 Problèmes Identifiés

1. **Missions déjà publiées dans Strapi affichées comme "brouillon"**
   - Le mapping des données ne calculait pas correctement le statut
   - On utilisait seulement `published` (boolean) basé sur `publishedAt != null`

2. **Seulement 2 états affichés au lieu de 3**
   - Affichage : "Publié" / "Brouillon"
   - Manquant : État "Modifié" (published with unpublished changes)

## 📚 Strapi v5 Draft & Publish - Les 3 États

Strapi v5 gère 3 états distincts pour les contenus avec Draft & Publish activé :

### 1. **Draft** (Brouillon)
```javascript
{
  publishedAt: null,
  updatedAt: "2025-10-13T10:00:00Z"
}
// Contenu jamais publié
```

### 2. **Published** (Publié)
```javascript
{
  publishedAt: "2025-10-13T10:00:00Z",
  updatedAt: "2025-10-13T10:00:00Z"
}
// updatedAt <= publishedAt = Pas de modifications depuis la publication
```

### 3. **Modified** (Modifié)
```javascript
{
  publishedAt: "2025-10-13T10:00:00Z",
  updatedAt: "2025-10-13T11:30:00Z"
}
// updatedAt > publishedAt = Modifications non publiées
```

## ✅ Solution Implémentée

### 1. Fonction pour calculer le statut dans `useMissions.js`

```javascript
// Helper pour déterminer le statut Strapi v5 (draft, published, modified)
const getMissionStatus = (mission) => {
  if (!mission.publishedAt) {
    return 'draft' // Brouillon
  }
  
  // Comparer les dates pour détecter les modifications
  const publishedDate = new Date(mission.publishedAt)
  const updatedDate = new Date(mission.updatedAt)
  
  // Si updatedAt > publishedAt, il y a des modifications non publiées
  if (updatedDate > publishedDate) {
    return 'modified' // Publié avec modifications
  }
  
  return 'published' // Publié
}
```

### 2. Ajout du statut lors du mapping des missions

```javascript
missions.value = response.results.map(mission => ({
  // ... autres champs
  
  // Calculer le statut Strapi v5
  status: (() => {
    if (!mission.publishedAt) return 'draft'
    const publishedDate = new Date(mission.publishedAt)
    const updatedDate = new Date(mission.updatedAt)
    return updatedDate > publishedDate ? 'modified' : 'published'
  })()
}))
```

### 3. Computed properties mis à jour

```javascript
const publishedMissions = computed(() => 
  missions.value.filter(mission => mission.status === 'published').length
)

const draftMissions = computed(() => 
  missions.value.filter(mission => mission.status === 'draft').length
)

const modifiedMissions = computed(() => 
  missions.value.filter(mission => mission.status === 'modified').length
)
```

### 4. Interface utilisateur avec 4 cartes de stats

```vue
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
  <!-- Missions totales -->
  <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
    <div class="text-4xl">{{ totalMissions }}</div>
    <div>Missions totales</div>
  </div>

  <!-- Missions publiées (vert) -->
  <div class="bg-green-50 rounded-lg p-4 lg:p-6">
    <div class="text-4xl text-green-700">{{ publishedMissions }}</div>
    <div class="text-green-600">Publiées</div>
  </div>

  <!-- Missions modifiées (orange) -->
  <div class="bg-orange-50 rounded-lg p-4 lg:p-6">
    <div class="text-4xl text-orange-700">{{ modifiedMissions }}</div>
    <div class="text-orange-600">Modifiées</div>
  </div>

  <!-- Missions brouillon (gris) -->
  <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
    <div class="text-4xl">{{ draftMissions }}</div>
    <div>Brouillon</div>
  </div>
</div>
```

### 5. Badge de statut avec 3 couleurs

```vue
<span 
  :class="{
    'bg-green-100 text-green-800': mission.status === 'published',
    'bg-orange-100 text-orange-800': mission.status === 'modified',
    'bg-gray-100 text-gray-800': mission.status === 'draft'
  }" 
  class="px-2 py-1 rounded-full text-xs font-medium"
>
  {{ 
    mission.status === 'published' ? 'Publié' : 
    mission.status === 'modified' ? 'Modifié' : 
    'Brouillon' 
  }}
</span>
```

### 6. Filtre mis à jour

```vue
<select v-model="filters.status">
  <option value="">Tous</option>
  <option value="published">Publié</option>
  <option value="modified">Modifié (à republier)</option>
  <option value="draft">Brouillon</option>
</select>
```

### 7. Logique de filtrage simplifiée

```javascript
const filteredMissions = computed(() => {
  let result = missions.value
  
  // Filtre par statut (plus besoin de conditions complexes)
  if (filters.value.status) {
    result = result.filter(m => m.status === filters.value.status)
  }
  
  // ... autres filtres
  
  return result
})
```

## 🔍 Debug Log Ajouté

Pour vérifier ce que Strapi envoie réellement :

```javascript
console.log('🔍 DEBUG - Réponse Strapi brute (première mission):', response.results[0])
```

Cela permet de voir :
- La valeur exacte de `publishedAt`
- La valeur exacte de `updatedAt`
- Si le statut est correctement calculé

## 🎨 Code de Couleur

| État | Couleur | Background | Text |
|------|---------|------------|------|
| **Publié** | Vert | `bg-green-50` / `bg-green-100` | `text-green-700` / `text-green-800` |
| **Modifié** | Orange | `bg-orange-50` / `bg-orange-100` | `text-orange-700` / `text-orange-800` |
| **Brouillon** | Gris | `bg-gray-100` | `text-gray-800` |

## 📋 Checklist de Validation

Pour vérifier que tout fonctionne :

### Test 1: Vérifier l'affichage initial
- [ ] Ouvrir la page missions
- [ ] Regarder la console pour le log `🔍 DEBUG - Réponse Strapi brute`
- [ ] Vérifier que `publishedAt` et `updatedAt` sont présents
- [ ] Vérifier que les 4 cartes de stats affichent les bons chiffres
- [ ] Vérifier que les missions ont les bons badges de couleur

### Test 2: Missions déjà publiées
- [ ] Les missions publiées dans Strapi doivent avoir un badge **VERT "Publié"**
- [ ] Si `updatedAt` > `publishedAt` → badge **ORANGE "Modifié"**

### Test 3: Créer et publier une nouvelle mission
- [ ] Créer une mission en brouillon → badge **GRIS "Brouillon"**
- [ ] La publier → badge **VERT "Publié"**
- [ ] La modifier sans republier → badge **ORANGE "Modifié"**
- [ ] La republier → badge **VERT "Publié"**

### Test 4: Filtres
- [ ] Filtrer par "Publié" → voir seulement les missions vertes
- [ ] Filtrer par "Modifié" → voir seulement les missions orange
- [ ] Filtrer par "Brouillon" → voir seulement les missions grises

## 🚀 Prochaines Étapes

Une fois validé que les statuts s'affichent correctement :

1. **Tester le workflow complet** de publication/modification/republication
2. **Vérifier dans la console** que les bons endpoints sont appelés
3. **Nettoyer les logs de debug** une fois confirmé que tout fonctionne
4. **Documenter** le comportement pour l'équipe

## 💡 Remarques Importantes

- ⚠️ **Ne jamais envoyer `publishedAt` dans un payload de mise à jour**
- ✅ **Toujours utiliser `/actions/publish` et `/actions/unpublish`**
- 🔄 **Le statut "Modifié" est automatique** dès qu'on modifie un contenu publié
- 📊 **Les 3 états permettent de voir rapidement** quelles missions ont besoin d'être republiées
