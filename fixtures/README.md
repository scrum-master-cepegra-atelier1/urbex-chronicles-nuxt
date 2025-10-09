# Fixtures et Données de Test - Urbex Chronicles

## Vue d'ensemble

Ce dossier contient tous les outils nécessaires pour créer des données de test réalistes dans votre instance Strapi locale.

## Méthodes disponibles

### 1. 🎯 Script automatisé (Recommandé)

```bash
# Avec token admin
STRAPI_ADMIN_TOKEN="votre_token_ici" node fixtures/seed-data.js

# Ou modifier directement le token dans le fichier
node fixtures/seed-data.js
```

**Avantages :**
- Création en masse rapide
- Données cohérentes et réalistes
- Gestion des erreurs

### 2. 📡 Collection Insomnia

1. Importez `insomnia-collection.json` dans Insomnia
2. Remplacez `YOUR_STRAPI_TOKEN` par votre token admin
3. Exécutez les requêtes une par une

**Avantages :**
- Contrôle total sur chaque création
- Idéal pour tester l'API
- Réutilisable

### 3. 🖥️ Admin Panel Strapi

Accédez à `http://localhost:1337/admin` et créez manuellement.

**Avantages :**
- Interface visuelle
- Validation immédiate
- Parfait pour quelques entrées

## Données générées

### Circuits (5 exemples)
- **Château de la Folie** - Château gothique abandonné
- **Usine Textile** - Filature années 1920
- **Hôpital Saint-Jean** - Complexe psychiatrique art déco
- **Mine de Charbon** - Site minier historique
- **Sanatorium des Pins** - Sanatorium forestier années 1930

### Missions (3 exemples)
- **Capture les vitraux** - Mission photographie (moyen)
- **Trouve la salle des machines** - Mission exploration (facile)
- **Escalade jusqu'au toit** - Mission défi (expert)

### Succès/Achievements (4 exemples)
- **Premier Château** - Succès débutant
- **Chasseur de Lumière** - Succès photographie
- **Explorateur Intrépide** - Succès exploration
- **Légende Urbex** - Succès prestige

## Récupération du token admin

```bash
# 1. Connectez-vous à l'admin Strapi
curl -X POST "http://localhost:1337/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "motdepasse"}'

# 2. Copiez le token retourné
# 3. Utilisez-le dans vos requêtes avec l'en-tête:
# Authorization: Bearer YOUR_TOKEN_HERE
```

## Personnalisation

### Ajouter vos propres fixtures

Éditez `seed-data.js` et ajoutez vos données dans l'objet `fixtures` :

```javascript
const fixtures = {
  circuits: [
    // Vos circuits personnalisés
    {
      name: "Mon Circuit Custom",
      description: "Description détaillée...",
      // ...
    }
  ]
}
```

### Adapter pour vos modèles Strapi

Si vous avez d'autres content-types, ajoutez-les :

```javascript
// Dans seed-data.js
const fixtures = {
  // ... circuits, missions, achievements existants
  
  // Nouveau content-type
  spots: [
    {
      name: "Spot secret du château",
      coordinates: { lat: 50.123, lng: 4.456 },
      // ...
    }
  ]
}

// Dans la fonction seedDatabase()
console.log('\n📍 Création des spots...')
for (const spot of fixtures.spots) {
  await createData('spots', spot)
}
```

## Dépannage

### Erreur 401 (Unauthorized)
- Vérifiez que votre token admin est valide
- Reconnectez-vous à l'admin Strapi

### Erreur 400 (Bad Request)
- Vérifiez que vos données respectent le schéma Strapi
- Consultez les logs Strapi pour plus de détails

### Erreur de connexion
- Vérifiez que Strapi tourne sur `localhost:1337`
- Testez avec `curl http://localhost:1337/admin`

## Commandes utiles

```bash
# Vider toutes les données de test
# (Attention : supprime TOUTES les données !)
curl -X DELETE "http://localhost:1337/api/circuits" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Compter les entrées créées
curl "http://localhost:1337/api/circuits?pagination[pageSize]=100" \
  -H "Authorization: Bearer YOUR_TOKEN" | jq '.meta.pagination.total'

# Voir tous les circuits créés
curl "http://localhost:1337/api/circuits" \
  -H "Authorization: Bearer YOUR_TOKEN" | jq '.data[].attributes.name'
```