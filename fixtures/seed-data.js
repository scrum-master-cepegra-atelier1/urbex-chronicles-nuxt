#!/usr/bin/env node

/**
 * Script de génération de données de test pour Urbex Chronicles
 * Usage: node fixtures/seed-data.js
 */

const API_BASE = 'http://localhost:1337/api'
const ADMIN_TOKEN = process.env.STRAPI_ADMIN_TOKEN || 'YOUR_TOKEN_HERE'

const fixtures = {
  circuits: [
    {
      name: "Circuit du Château de la Folie",
      description: "Un magnifique château du 18ème siècle abandonné depuis les années 80. Architecture gothique, escaliers en colimaçon préservés et vue panoramique depuis la tour principale.",
      duration: 120,
      like: 25,
      address: {
        street: "Chemin du Château Abandonné",
        city: "Villers-la-Ville",
        zipCode: "1495",
        country: "Belgique"
      },
      comments: [
        {
          author: "UrbanExplorer92",
          content: "Lieu magique ! Attention aux escaliers en bois qui grincent.",
          date: "2024-09-15"
        }
      ]
    },
    {
      name: "Circuit de l'Usine Textile Désaffectée",
      description: "Ancienne filature des années 1920 avec ses machines d'époque encore présentes. Atmosphère industrielle unique avec jeux de lumière spectaculaires.",
      duration: 90,
      like: 18,
      address: {
        street: "Rue de l'Industrie 45",
        city: "Verviers",
        zipCode: "4800",
        country: "Belgique"
      },
      comments: [
        {
          author: "PhotoUrban",
          content: "Parfait pour la photographie ! Les rayons de soleil à travers les fenêtres cassées sont magnifiques.",
          date: "2024-08-20"
        },
        {
          author: "ExploreMore",
          content: "Accès un peu difficile mais ça vaut le coup. Prévoir de bonnes chaussures.",
          date: "2024-09-01"
        }
      ]
    },
    {
      name: "Circuit de l'Hôpital Psychiatrique Saint-Jean",
      description: "Complexe hospitalier des années 1950 avec de nombreux bâtiments interconnectés. Architecture art déco remarquable et fresques murales préservées.",
      duration: 180,
      like: 42,
      address: {
        street: "Avenue des Tilleuls 12",
        city: "Mons",
        zipCode: "7000",
        country: "Belgique"
      },
      comments: [
        {
          author: "GhostHunter",
          content: "Ambiance particulière garantie. Les couloirs semblent interminables !",
          date: "2024-09-10"
        }
      ]
    },
    {
      name: "Circuit de la Mine de Charbon Désaffectée",
      description: "Ancien site minier avec ses installations de surface préservées. Chevalement historique et bâtiments industriels des années 1940.",
      duration: 150,
      like: 31,
      address: {
        street: "Rue du Charbonnage 8",
        city: "Charleroi",
        zipCode: "6000",
        country: "Belgique"
      },
      comments: [
        {
          author: "IndustryExplorer",
          content: "Témoignage émouvant du passé industriel belge. Respect pour les anciens mineurs.",
          date: "2024-08-15"
        }
      ]
    },
    {
      name: "Circuit du Sanatorium des Pins",
      description: "Ancien sanatorium tuberculeux perché en forêt. Architecture fonctionnaliste des années 1930 et terrasses panoramiques sur la vallée.",
      duration: 105,
      like: 36,
      address: {
        street: "Chemin des Sapins",
        city: "Spa",
        zipCode: "4900",
        country: "Belgique"
      },
      comments: [
        {
          author: "NatureUrbex",
          content: "La nature reprend ses droits ! Magnifique symbiose entre architecture et végétation.",
          date: "2024-09-05"
        }
      ]
    }
  ],

  missions: [
    {
      name: "Capture les vitraux du château",
      description: "Photographier les magnifiques vitraux colorés de la chapelle du château. Bonus si vous capturez les jeux de lumière à travers les verres brisés.",
      type: "photographie",
      difficulty: "moyen",
      points: 150,
      requirements: [
        "Appareil photo ou smartphone",
        "Accès à la chapelle (étage -1)",
        "Patience pour attendre la bonne lumière"
      ],
      rewards: {
        xp: 150,
        badge: "Chasseur de Lumière"
      }
    },
    {
      name: "Trouve la salle des machines",
      description: "Localiser et documenter l'ancienne salle des machines de l'usine textile. Identifier au moins 3 machines d'époque encore présentes.",
      type: "exploration",
      difficulty: "facile",
      points: 100,
      requirements: [
        "Lampe torche",
        "Carnet de notes ou smartphone",
        "Prudence avec les machines rouillées"
      ],
      rewards: {
        xp: 100,
        badge: "Détective Industriel"
      }
    },
    {
      name: "Escalade jusqu'au toit du sanatorium",
      description: "Atteindre le toit-terrasse du sanatorium pour une vue panoramique sur la vallée. ATTENTION: Mission réservée aux explorateurs expérimentés.",
      type: "défi",
      difficulty: "expert",
      points: 300,
      requirements: [
        "Équipement de sécurité",
        "Expérience en escalade urbaine",
        "Météo favorable"
      ],
      rewards: {
        xp: 300,
        badge: "Sommet Urbex"
      }
    }
  ],

  achievements: [
    {
      name: "Premier Château",
      description: "Félicitations ! Vous avez exploré votre premier château abandonné. Le début d'une grande aventure urbex.",
      icon: "🏰",
      type: "exploration",
      rarity: "common",
      points: 50,
      unlock_conditions: {
        circuit_type: "château",
        completion_count: 1
      }
    },
    {
      name: "Chasseur de Lumière",
      description: "Maître de la photographie urbex ! Vous savez capturer la beauté dans l'abandon.",
      icon: "📸",
      type: "photographie",
      rarity: "rare",
      points: 200,
      unlock_conditions: {
        photo_missions_completed: 10
      }
    },
    {
      name: "Explorateur Intrépide",
      description: "Plus rien ne vous arrête ! Vous avez visité plus de 10 circuits différents.",
      icon: "🗺️",
      type: "exploration",
      rarity: "epic",
      points: 500,
      unlock_conditions: {
        circuits_completed: 10
      }
    },
    {
      name: "Légende Urbex",
      description: "Vous êtes une véritable légende de l'exploration urbaine ! Respect total de la communauté.",
      icon: "👑",
      type: "prestige",
      rarity: "legendary",
      points: 1000,
      unlock_conditions: {
        total_points: 5000,
        circuits_completed: 50
      }
    }
  ]
}

async function createData(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({ data })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`)
    }

    const result = await response.json()
    console.log(`✅ ${endpoint} créé:`, result.data?.name || result.data?.id)
    return result
  } catch (error) {
    console.error(`❌ Erreur création ${endpoint}:`, error.message)
    return null
  }
}

async function seedDatabase() {
  console.log('🌱 Démarrage du seeding de la base de données...')

  // Circuits
  console.log('\n📍 Création des circuits...')
  for (const circuit of fixtures.circuits) {
    await createData('circuits', circuit)
    await new Promise(resolve => setTimeout(resolve, 500)) // Pause pour éviter la surcharge
  }

  // Missions
  console.log('\n🎯 Création des missions...')
  for (const mission of fixtures.missions) {
    await createData('missions', mission)
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // Achievements
  console.log('\n🏆 Création des succès...')
  for (const achievement of fixtures.achievements) {
    await createData('successes', achievement) // Attention: 'successes' selon votre schéma
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log('\n✅ Seeding terminé ! Votre base de données est maintenant remplie de données de test.')
  console.log('🔗 Vérifiez dans l\'admin Strapi: http://localhost:1337/admin')
}

// Exécution du script
if (require.main === module) {
  seedDatabase().catch(console.error)
}

module.exports = { fixtures, createData, seedDatabase }