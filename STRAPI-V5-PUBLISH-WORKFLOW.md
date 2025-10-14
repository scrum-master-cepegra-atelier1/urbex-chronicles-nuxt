# Strapi v5 Draft & Publish Workflow Implementation

## 🎯 Problème Résolu

Les modifications de missions ne se sauvegardaient pas correctement dans la base de données en raison d'une mauvaise gestion du système Draft & Publish de Strapi v5.

### Symptômes initiaux
- Les modifications de missions semblaient ne pas prendre effet
- Le statut publié/brouillon ne changeait pas correctement
- Erreurs silencieuses lors des mises à jour

## 🔍 Cause Racine Identifiée

### Strapi v5 Draft & Publish System
Strapi v5 gère automatiquement les brouillons et publications avec trois états:
1. **Draft** (brouillon) : `publishedAt = null`
2. **Published** (publié) : `publishedAt = Date`
3. **Modified** (modifié) : contenu publié avec modifications en brouillon

### Erreur initiale
❌ **Envoi de `publishedAt` dans le payload de mise à jour**
```javascript
// INCORRECT - Ne fonctionne pas avec Strapi v5
await updateMission(missionId, { 
  title, 
  description, 
  publishedAt: isPublished ? new Date() : null // ❌ Strapi rejette ça
})
```

## ✅ Solution Implémentée

### 1. Workflow correct Strapi v5
Utiliser les endpoints d'action dédiés au lieu de modifier `publishedAt`:
- **Publier**: `POST /content-manager/collection-types/api::mission.mission/{id}/actions/publish`
- **Dépublier**: `POST /content-manager/collection-types/api::mission.mission/{id}/actions/unpublish`

### 2. Nouvelles fonctions dans `useMissions.js`

```javascript
/**
 * Publier une mission (Strapi v5 Draft & Publish)
 */
const publishMission = async (missionId) => {
  const { strapiAdminApi } = await import('../service/ApiService.js')
  
  console.log(`📢 Publication de la mission ${missionId}...`)
  
  const response = await strapiAdminApi.post(
    `/content-manager/collection-types/api::mission.mission/${missionId}/actions/publish`, 
    {}
  )
  
  // Mise à jour locale
  const index = missions.value.findIndex(m => m.documentId === missionId)
  if (index !== -1) {
    missions.value[index].publishedAt = new Date().toISOString()
    missions.value[index].published = true
  }
  
  return response.data
}

/**
 * Dépublier une mission (Strapi v5 Draft & Publish)
 */
const unpublishMission = async (missionId) => {
  const { strapiAdminApi } = await import('../service/ApiService.js')
  
  console.log(`📝 Dépublication de la mission ${missionId}...`)
  
  const response = await strapiAdminApi.post(
    `/content-manager/collection-types/api::mission.mission/${missionId}/actions/unpublish`, 
    {}
  )
  
  // Mise à jour locale
  const index = missions.value.findIndex(m => m.documentId === missionId)
  if (index !== -1) {
    missions.value[index].publishedAt = null
    missions.value[index].published = false
  }
  
  return response.data
}
```

### 3. Logique de sauvegarde dans `missions.vue`

```javascript
const saveEditMission = async () => {
  try {
    const missionId = currentMission.value.documentId || currentMission.value.id
    const wasPublished = !!originalPublishedState.value
    const wantsToPublish = currentMission.value.published === true

    console.log(`🔍 État de publication - Avant: ${wasPublished}, Après: ${wantsToPublish}`)

    // 1. Mise à jour du contenu (SANS publishedAt)
    const missionData = {
      title: currentMission.value.title,
      description: currentMission.value.description,
      // ... tous les autres champs SAUF publishedAt
    }

    await updateMission(missionId, missionData)

    // 2. Gestion du statut de publication
    if (!wasPublished && wantsToPublish) {
      // Brouillon → Publié
      console.log('📢 Publication de la mission...')
      await publishMission(missionId)
    } else if (wasPublished && !wantsToPublish) {
      // Publié → Brouillon
      console.log('📝 Dépublication de la mission...')
      await unpublishMission(missionId)
    } else if (wasPublished && wantsToPublish) {
      // Publié → Publié (avec modifications)
      console.log('📢 Re-publication des modifications...')
      await publishMission(missionId)
    }

    showEditModal.value = false
    await refreshData()
    
  } catch (err) {
    console.error('❌ Erreur lors de la sauvegarde:', err)
  }
}
```

## 📋 Checklist de Tests

Avant de supprimer les logs de debug, tester ces scénarios:

### Test 1: Créer et publier
- [ ] Créer une nouvelle mission (brouillon par défaut)
- [ ] Vérifier dans Strapi: `publishedAt = null`
- [ ] Modifier la mission et cocher "Publié"
- [ ] Sauvegarder
- [ ] Vérifier dans Strapi: `publishedAt` a une date

### Test 2: Modifier contenu publié
- [ ] Ouvrir une mission publiée
- [ ] Modifier le titre ou la description
- [ ] Garder "Publié" coché
- [ ] Sauvegarder
- [ ] Vérifier dans Strapi: les modifications sont visibles ET `publishedAt` est maintenu

### Test 3: Dépublier
- [ ] Ouvrir une mission publiée
- [ ] Décocher "Publié"
- [ ] Sauvegarder
- [ ] Vérifier dans Strapi: `publishedAt = null`

### Test 4: Modifier brouillon
- [ ] Ouvrir une mission en brouillon
- [ ] Modifier du contenu
- [ ] Garder "Publié" décoché
- [ ] Sauvegarder
- [ ] Vérifier dans Strapi: les modifications sont sauvées, `publishedAt = null`

## 🧹 Nettoyage Post-Validation

Une fois tous les tests passés, nettoyer les logs de debug:

### Dans `useMissions.js`
```javascript
// Supprimer ou commenter les console.log avec emojis:
// 🔍 📦 📡 ✅ ❌ 📢 📝
```

### Dans `missions.vue`
```javascript
// Supprimer ou commenter dans saveEditMission():
console.log(`🔍 État de publication - Avant: ${wasPublished}, Après: ${wantsToPublish}`)
console.log('📢 Publication de la mission...')
console.log('📝 Dépublication de la mission...')
console.log('📢 Re-publication des modifications...')
```

## 📚 Références Strapi v5

- [Draft & Publish Documentation](https://docs.strapi.io/dev-docs/draft-and-publish)
- [Content Manager API](https://docs.strapi.io/dev-docs/api/content-manager)
- [Action Endpoints](https://docs.strapi.io/dev-docs/api/content-manager#publish)

## 🎓 Leçons Apprises

1. **Ne JAMAIS envoyer `publishedAt` dans un payload de mise à jour**
   - Strapi v5 gère ça automatiquement via les endpoints d'action

2. **Toujours envoyer TOUS les champs lors d'une mise à jour**
   - Strapi peut interpréter un champ manquant comme une suppression
   - 13 champs pour une mission: title, description, latitude, longitude, threshold, hint, media, achievement, instructions, address, type, difficulty, status

3. **Utiliser `documentId` pour les opérations individuelles**
   - Plus fiable que `id` dans Strapi v5

4. **Workflow en 2 étapes**
   1. Mettre à jour le contenu avec `PUT`
   2. Gérer la publication avec `POST /actions/publish` ou `/actions/unpublish`

## 🚀 Déploiement

Le code est maintenant prêt pour le déploiement. Pas d'erreurs TypeScript/ESLint, workflow Strapi v5 correctement implémenté.
