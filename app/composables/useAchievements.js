/**
 * Composable pour gérer les achievements (succès) avec Laravel API
 */

import { ref, computed } from "vue";

export const useAchievements = () => {
  // État réactif
  const achievements = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Fonctions utilitaires pour mapper les données selon le schéma Laravel
  const mapFromLaravel = (achievement) => {
    const isPublished = achievement.published === true;

    return {
      id: achievement.id,
      // Champs du schéma Laravel
      name: achievement.name || "Sans titre",
      experience: parseInt(achievement.experience) || 0,
      // Champs UI dérivés pour compatibilité avec l'interface
      title: achievement.name || "Sans titre", // UI compatibility
      xpReward: parseInt(achievement.experience) || 0, // UI compatibility
      description: `Succès: ${achievement.name}`, // Description générée
      icon: "🏆", // Icône par défaut
      type: "achievement", // Type par défaut
      rarity: "common", // Rareté par défaut
      active: isPublished, // Basé sur le champ published
      conditions: `Obtenir ${achievement.experience} points d'expérience`, // Conditions générées
      unlocks: 0, // Simulation
      created_at: achievement.created_at,
      updated_at: achievement.updated_at,
      published_at: achievement.published_at,
      published: achievement.published, // Ajout du champ published
    };
  };

  const mapToLaravel = (uiData) => ({
    // Seulement les champs qui existent dans le schéma Laravel
    name: uiData.title || uiData.name || "Sans titre",
    experience: parseInt(uiData.xpReward || uiData.experience || 0),
    published: uiData.active || false,
  });

  // Stats calculées
  const stats = computed(() => {
    const total = achievements.value.length;
    const active = achievements.value.filter((a) => a.active).length;
    const todayUnlocked = Math.floor(Math.random() * 20) + 5; // Simulation
    // Calcul du XP total seulement pour les succès débloqués (publiés/actifs)
    const totalXP = achievements.value
      .filter((a) => a.active) // Seulement les succès publiés/débloqués
      .reduce((sum, a) => sum + (a.experience || a.xpReward || 0), 0);

    // Calcul du total d'XP distribué (XP * nombre de débloquages)
    const totalXPDistributed = achievements.value
      .filter((a) => a.active) // Seulement les succès publiés/débloqués
      .reduce((sum, a) => {
        const xp = a.experience || a.xpReward || 0;
        const unlocks = a.unlocks || 0;
        return sum + xp * unlocks;
      }, 0);

    return {
      total,
      active,
      todayUnlocked,
      totalXP,
      totalXPDistributed,
    };
  });

  /**
   * Récupérer tous les achievements depuis Laravel API
   */
  const fetchAchievements = async () => {
    try {
      loading.value = true;
      error.value = null;

      const { laravelApi } = await import("../service/ApiService.js");
      console.log("🏆 Récupération des achievements depuis Laravel API...");

      const response = await laravelApi.get("/achievements");

      if (response) {
        const achievementData =
          response.achievements || response.data || response;

        if (Array.isArray(achievementData)) {
          console.log(
            `✅ ${achievementData.length} achievements récupérés avec succès`
          );
          achievements.value = achievementData.map(mapFromLaravel);
        } else {
          console.warn("⚠️ Structure de réponse inattendue:", response);
          achievements.value = [];
        }
      } else {
        console.warn("⚠️ Aucune réponse reçue");
        achievements.value = [];
      }

      error.value = null;
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des achievements:", err);
      error.value = `Erreur de connexion à l'API Laravel: ${err.message}`;

      // Message d'aide pour le développement
      if (err.message.includes("ERR_CONNECTION_REFUSED")) {
        error.value += " - Vérifiez que l'API Laravel est accessible";
      }

      achievements.value = [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupérer un achievement spécifique par ID
   */
  const getAchievementById = async (achievementId) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");
      const response = await laravelApi.get(`/achievements/${achievementId}`);
      return response.achievement || response.data || response;
    } catch (err) {
      console.error(
        `Erreur lors de la récupération de l'achievement ${achievementId}:`,
        err
      );
      throw err;
    }
  };

  /**
   * Créer un nouvel achievement
   */
  const createAchievement = async (achievementData) => {
    try {
      loading.value = true;

      const { laravelApi } = await import("../service/ApiService.js");

      // Mapper les données UI vers Laravel
      const laravelData = mapToLaravel(achievementData);
      console.log("📤 Données envoyées à Laravel:", laravelData);

      const response = await laravelApi.post(
        "/admin/achievements",
        laravelData
      );

      if (response) {
        // Ajouter le nouvel achievement à la liste en utilisant les données de réponse
        const responseData = response.achievement || response.data || response;
        const newAchievement = mapFromLaravel({
          ...responseData,
          published: false, // Par défaut, les nouveaux achievements sont non publiés
          unlocks: 0,
        });
        achievements.value.unshift(newAchievement);
        console.log("✅ Nouvel achievement créé avec succès");
        return responseData;
      }
    } catch (err) {
      console.error("❌ Erreur lors de la création de l'achievement:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Mettre à jour un achievement existant
   */
  const updateAchievement = async (achievementId, achievementData) => {
    try {
      loading.value = true;

      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`🔄 Mise à jour de l'achievement avec ID: ${achievementId}`);

      // Mapper les données UI vers Laravel
      const laravelData = mapToLaravel(achievementData);
      console.log("📤 Données de mise à jour envoyées à Laravel:", laravelData);

      const response = await laravelApi.put(
        `/admin/achievements/${achievementId}`,
        laravelData
      );

      if (response) {
        // Mettre à jour l'achievement dans la liste en utilisant l'ID
        const responseData = response.achievement || response.data || response;
        const index = achievements.value.findIndex(
          (a) => a.id === achievementId
        );
        if (index !== -1) {
          achievements.value[index] = mapFromLaravel({
            ...responseData,
            published: responseData.published || false, // Inclure le published dans la mise à jour
            unlocks: achievements.value[index].unlocks, // Conserver les unlocks existants
          });
        }
        console.log(`✅ Achievement ${achievementId} mis à jour avec succès`);
        return responseData;
      }
    } catch (err) {
      console.error(
        `❌ Erreur lors de la mise à jour de l'achievement ${achievementId}:`,
        err
      );
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Supprimer un achievement
   */
  const deleteAchievement = async (achievementId) => {
    try {
      loading.value = true;

      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`🗑️ Suppression de l'achievement avec ID: ${achievementId}`);

      const response = await laravelApi.delete(
        `/admin/achievements/${achievementId}`
      );

      // Supprimer l'achievement de la liste en utilisant l'ID
      achievements.value = achievements.value.filter(
        (a) => a.id !== achievementId
      );

      console.log(`✅ Achievement ${achievementId} supprimé avec succès`);
      return response;
    } catch (err) {
      console.error(
        `❌ Erreur lors de la suppression de l'achievement ${achievementId}:`,
        err
      );
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Changer le statut actif/inactif d'un achievement (publié/non publié)
   */
  const toggleAchievementStatus = async (achievementId, shouldPublish) => {
    try {
      console.log(
        `🔄 Toggle publish status: ID=${achievementId}, publier=${shouldPublish}`
      );

      const { laravelApi } = await import("../service/ApiService.js");

      // Utiliser updateAchievement pour changer le statut published
      const response = await laravelApi.put(
        `/admin/achievements/${achievementId}`,
        {
          published: shouldPublish,
          published_at: shouldPublish ? new Date().toISOString() : null,
        }
      );

      // Mettre à jour la liste locale
      const index = achievements.value.findIndex((a) => a.id === achievementId);
      if (index !== -1) {
        achievements.value[index].active = shouldPublish;
        achievements.value[index].published = shouldPublish;
        achievements.value[index].published_at = shouldPublish
          ? new Date().toISOString()
          : null;
      }

      console.log(
        `✅ Achievement ${
          shouldPublish ? "publié" : "mis en brouillon"
        } avec succès`
      );
      return response.achievement || response.data || response;
    } catch (err) {
      console.error(
        "❌ Erreur lors du changement de statut de publication:",
        err
      );
      throw err;
    }
  };

  /**
   * Test de connexion à l'API Laravel
   */
  const testConnection = async () => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");
      const response = await laravelApi.get("/achievements");
      console.log(
        "🔧 Test de connexion Laravel achievements:",
        response.status || "OK"
      );
      return true;
    } catch (err) {
      console.error("🔧 Erreur de connexion Laravel achievements:", err);
      return false;
    }
  };

  /**
   * Rechercher des achievements
   */
  const searchAchievements = async (searchTerm) => {
    try {
      if (!searchTerm) {
        await fetchAchievements();
        return;
      }

      const filtered = achievements.value.filter(
        (achievement) =>
          achievement.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          achievement.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          achievement.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      achievements.value = filtered;
    } catch (err) {
      console.error("❌ Erreur searchAchievements:", err);
      throw err;
    }
  };

  // Retourner les fonctions et données réactives
  return {
    // État
    achievements,
    loading,
    error,
    stats,

    // Actions
    fetchAchievements,
    getAchievementById,
    createAchievement,
    updateAchievement,
    deleteAchievement,
    toggleAchievementStatus,
    searchAchievements,
    testConnection,
  };
};
