/**
 * Composable pour la gestion des missions avec Laravel API
 * Gestion directe de la collection missions via l'API Laravel
 */
import { ref, computed, readonly } from "vue";

export default async function useMissions() {
  // Configuration supprimée - utilise directement Laravel API

  // États réactifs
  const missions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Computed properties pour les statistiques
  const totalMissions = computed(() => missions.value.length);

  const publishedMissions = computed(
    () => missions.value.filter((mission) => mission.published).length
  );

  const draftMissions = computed(
    () => missions.value.filter((mission) => !mission.published).length
  );

  const modifiedMissions = computed(
    () =>
      missions.value.filter(
        (mission) => getMissionStatus(mission) === "modified"
      ).length
  );

  /**
   * Récupérer toutes les missions depuis Laravel API
   */
  const fetchMissions = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { laravelApi } = await import("../service/ApiService.js");
      console.log("🔄 Récupération des missions depuis Laravel API...");

      // Récupérer les missions depuis Laravel
      const response = await laravelApi.get("/missions");

      console.log("✅ Réponse Laravel missions:", response);

      // Traiter la réponse Laravel - les données sont dans response.missions
      let missionData = response.missions || response.data || response;

      if (Array.isArray(missionData)) {
        missions.value = missionData.map((mission) => ({
          // Identifiants
          id: mission.id,
          // Champs requis du schema Laravel
          title: mission.title || "Mission sans titre",
          description: mission.description || "",
          latitude: mission.latitude || null,
          longitude: mission.longitude || null,
          threshold: mission.threshold || null,
          // Champs optionnels du schema
          hint: mission.hint || null,
          achievement_id: mission.achievement_id || null,
          // Pour circuit_id, prendre le premier circuit s'il existe
          circuit_id:
            mission.circuits && mission.circuits.length > 0
              ? mission.circuits[0].id
              : null,
          // Relations (si incluses dans la réponse)
          achievement: mission.achievement || null,
          circuit:
            mission.circuits && mission.circuits.length > 0
              ? mission.circuits[0]
              : null,
          circuits: mission.circuits || [], // Garder aussi la liste complète
          questions: mission.questions || [],
          // Métadonnées Laravel
          published: mission.published || false,
          published_at: mission.published_at || null,
          created_at: mission.created_at,
          updated_at: mission.updated_at,
          // Calculer le statut Laravel
          status: !mission.published ? "draft" : "published",
        }));
        console.log(
          `✅ ${missions.value.length} missions récupérées avec succès`
        );
        console.log("🔍 Structure d'une mission:", missions.value[0]);
      } else {
        console.warn("⚠️ Structure de réponse inattendue:", response);
        missions.value = [];
      }
      error.value = null;
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des missions:", err);
      error.value = `Erreur de connexion à l'API Laravel: ${err.message}`;
      // Message d'aide pour le développement
      if (err.message.includes("ERR_CONNECTION_REFUSED")) {
        error.value =
          "Impossible de se connecter à l'API Laravel. Vérifiez que l'API est accessible";
      } else if (err.message.includes("404")) {
        error.value =
          "Route missions non trouvée. Vérifiez la configuration de l'API Laravel";
      } else if (err.message.includes("403")) {
        error.value =
          "Accès refusé. Vous devez être connecté en tant qu'administrateur";
      } else if (err.message.includes("401")) {
        error.value =
          "Token d'authentification manquant ou expiré. Reconnectez-vous à l'administration";
      }
      missions.value = [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupérer une mission par son ID
   */
  const fetchMissionById = async (missionId) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");
      const response = await laravelApi.get(`/missions/${missionId}`);

      return response.data || response;
    } catch (err) {
      console.error(
        `Erreur lors de la récupération de la mission ${missionId}:`,
        err
      );
      throw new Error(`Impossible de récupérer la mission: ${err.message}`);
    }
  };

  /**
   * Créer une nouvelle mission
   */
  /**
   * Créer une nouvelle mission (Admin)
   */
  const createMission = async (missionData) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      console.log("🔄 Création d'une nouvelle mission avec Laravel API...");

      // Valider les données selon le schéma Laravel
      const validMissionData = {
        title: missionData.title,
        description: missionData.description || null,
        latitude: missionData.latitude || null,
        longitude: missionData.longitude || null,
        threshold: missionData.threshold || null,
        hint: missionData.hint || null,
        achievement_id: missionData.achievement_id || null,
        // Inclure les questions si fournies
        questions: missionData.questions || [],
      };

      console.log(
        "📋 Données validées pour création Laravel:",
        validMissionData
      );

      const response = await laravelApi.post(
        "/admin/missions",
        validMissionData
      );

      // Ajouter à la liste locale
      const newMission = response.mission || response.data || response;
      missions.value.unshift(newMission);

      console.log("✅ Nouvelle mission créée avec succès:", newMission);
      error.value = null;
      return newMission;
    } catch (err) {
      console.error("❌ Erreur lors de la création de la mission:", err);
      error.value = `Impossible de créer la mission: ${err.message}`;
      throw err;
    }
  };

  /**
   * Mettre à jour une mission (Admin)
   */
  const updateMission = async (missionId, missionData) => {
    try {
      console.log("🔍 useMissions - updateMission appelé avec Laravel API:", {
        missionId,
        missionData,
      });

      const { laravelApi } = await import("../service/ApiService.js");

      // Valider les données selon le schéma Laravel
      const validMissionData = {
        title: missionData.title,
        description: missionData.description || null,
        latitude: missionData.latitude || null,
        longitude: missionData.longitude || null,
        threshold: missionData.threshold || null,
        hint: missionData.hint || null,
        achievement_id: missionData.achievement_id || null,
        // Inclure les questions si fournies
        questions: missionData.questions || [],
      };

      console.log("📦 useMissions - Payload Laravel:", validMissionData);

      const response = await laravelApi.put(
        `/admin/missions/${missionId}`,
        validMissionData
      );

      console.log("📡 useMissions - Réponse Laravel:", response);

      // Mettre à jour dans la liste locale
      const index = missions.value.findIndex(
        (mission) => mission.id === missionId
      );
      console.log("🔎 useMissions - Index trouvé dans la liste locale:", index);

      if (index !== -1) {
        missions.value[index] = {
          ...missions.value[index],
          ...(response.mission || response.data || response),
        };
        console.log(
          "✅ useMissions - Mission mise à jour dans la liste locale:",
          missions.value[index]
        );
      } else {
        console.warn(
          "⚠️ useMissions - Mission non trouvée dans la liste locale"
        );
      }

      console.log(`✅ Mission ${missionId} mise à jour avec succès`);
      return response.mission || response.data || response;
    } catch (err) {
      console.error(
        `❌ useMissions - Erreur lors de la mise à jour de la mission ${missionId}:`,
        err
      );
      error.value = `Impossible de mettre à jour la mission: ${err.message}`;
      throw err;
    }
  };

  /**
   * Supprimer une mission (Admin)
   */
  const deleteMission = async (missionId) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      await laravelApi.delete(`/admin/missions/${missionId}`);

      // Mettre à jour la liste locale
      missions.value = missions.value.filter(
        (mission) => mission.id !== missionId
      );

      console.log(`✅ Mission ${missionId} supprimée avec succès`);
      error.value = null;
      return true;
    } catch (err) {
      console.error(
        `❌ Erreur lors de la suppression de la mission ${missionId}:`,
        err
      );

      // Enhanced error handling for authentication and permission issues
      if (err.message.includes("401")) {
        throw new Error("Session expirée. Veuillez vous reconnecter.");
      } else if (err.message.includes("403")) {
        throw new Error(
          "Permissions insuffisantes pour supprimer cette mission."
        );
      } else if (err.message.includes("404")) {
        throw new Error("Mission non trouvée.");
      } else {
        throw new Error(
          "Erreur lors de la suppression de la mission. Veuillez réessayer."
        );
      }
    }
  };

  /**
   * Publier une mission (Laravel API)
   */
  const publishMission = async (missionId) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`📢 Publication de la mission ${missionId}...`);

      // Utiliser updateMission pour mettre à jour le statut published
      const response = await laravelApi.put(`/admin/missions/${missionId}`, {
        published: true,
        published_at: new Date().toISOString(),
      });

      console.log(`✅ Mission ${missionId} publiée avec succès`);

      // Mettre à jour dans la liste locale
      const index = missions.value.findIndex(
        (mission) => mission.id === missionId
      );
      if (index !== -1) {
        missions.value[index].published_at = new Date().toISOString();
        missions.value[index].published = true;
      }

      return response.mission || response.data || response;
    } catch (err) {
      console.error(
        `❌ Erreur lors de la publication de la mission ${missionId}:`,
        err
      );
      error.value = `Impossible de publier la mission: ${err.message}`;
      throw err;
    }
  };

  /**
   * Dépublier une mission (Laravel API)
   */
  const unpublishMission = async (missionId) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`📝 Dépublication de la mission ${missionId}...`);

      // Utiliser updateMission pour mettre à jour le statut published
      const response = await laravelApi.put(`/admin/missions/${missionId}`, {
        published: false,
        published_at: null,
      });

      console.log(`✅ Mission ${missionId} dépubliée avec succès`);

      // Mettre à jour dans la liste locale
      const index = missions.value.findIndex(
        (mission) => mission.id === missionId
      );
      if (index !== -1) {
        missions.value[index].published_at = null;
        missions.value[index].published = false;
      }

      return response.mission || response.data || response;
    } catch (err) {
      console.error(
        `❌ Erreur lors de la dépublication de la mission ${missionId}:`,
        err
      );
      error.value = `Impossible de dépublier la mission: ${err.message}`;
      throw err;
    }
  };

  /**
   * Rechercher des missions par titre
   */
  const searchMissions = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return missions.value;
    }

    return missions.value.filter(
      (mission) =>
        mission.title &&
        mission.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  /**
   * Test de connexion à l'API Laravel
   */
  const testConnection = async () => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");
      const response = await laravelApi.get("/missions");
      console.log("🔧 Test de connexion Laravel:", response.status || "OK");
      return true;
    } catch (err) {
      console.error("🔧 Erreur de connexion Laravel:", err);
      return false;
    }
  };

  /**
   * Publier/Dépublier une mission (Laravel API)
   */
  const toggleMissionStatus = async (missionId, published) => {
    try {
      // Utiliser published_at au lieu de publishedAt (structure Laravel)
      const published_at = published ? new Date().toISOString() : null;
      const updatedMission = await updateMission(missionId, {
        published: published,
        published_at: published_at,
      });
      console.log(
        `✅ Mission ${published ? "publiée" : "dépubliée"} avec succès`
      );
      return updatedMission;
    } catch (err) {
      console.error("❌ Erreur lors du changement de statut:", err);
      throw err;
    }
  };

  // Méthodes utilitaires pour l'affichage
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Date invalide";
    }
  };

  const formatCoordinates = (lat, lng) => {
    if (!lat || !lng) return "N/A";
    return `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;
  };

  // Helper pour convertir published_at en boolean (Laravel)
  const isPublished = (mission) => {
    return mission?.published === true || mission?.published_at != null;
  };

  // Helper pour déterminer le statut de la mission (Laravel)
  const getMissionStatus = (mission) => {
    if (!mission.published || !mission.published_at) {
      return "draft"; // Brouillon
    }

    // Comparer les dates pour détecter les modifications
    const publishedDate = new Date(mission.published_at);
    const updatedDate = new Date(mission.updated_at);

    // Si updated_at > published_at, il y a des modifications non publiées
    if (updatedDate > publishedDate) {
      return "modified"; // Publié avec modifications
    }

    return "published"; // Publié
  };

  // Helper pour ajouter une propriété published calculée
  const addPublishedProperty = (mission) => {
    return {
      ...mission,
      published: isPublished(mission),
      status: getMissionStatus(mission),
    };
  };

  // Retourner l'API publique
  return {
    // États (readonly pour éviter les mutations directes)
    missions: readonly(missions),
    loading: readonly(loading),
    error: readonly(error),

    // Computed properties
    totalMissions,
    publishedMissions,
    draftMissions,
    modifiedMissions,

    // Actions
    fetchMissions,
    fetchMissionById,
    createMission,
    updateMission,
    deleteMission,
    publishMission,
    unpublishMission,
    searchMissions,
    testConnection,
    toggleMissionStatus,

    // Utilitaires
    formatDate,
    formatCoordinates,
    isPublished,
    getMissionStatus,
    addPublishedProperty,
  };
}
