/**
 * Composable pour la gestion des circuits avec Laravel API
 * Récupère les données dynamiques depuis la base de données
 */
import { ref, computed, readonly } from "vue";

export const useCircuits = () => {
  // États réactifs
  const circuits = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Configuration supprimée - utilise directement Laravel API via laravelApi

  // Computed properties pour les statistiques
  const totalCircuits = computed(() => circuits.value.length);
  const activeCircuits = computed(
    () =>
      circuits.value.filter((circuit) => {
        // Pour l'instant, on considère tous les circuits comme actifs
        // car il n'y a pas de champ publishedAt dans la structure Laravel
        return true;
      }).length
  );
  const newCircuitsSuggested = computed(() => {
    // Calculer les nouveaux circuits des 7 derniers jours
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return circuits.value.filter((circuit) => {
      // Laravel utilise 'created_at' au format ISO
      if (!circuit.created_at) return false;
      const circuitDate = new Date(circuit.created_at);
      return circuitDate >= sevenDaysAgo;
    }).length;
  });

  /**
   * Récupérer tous les circuits depuis Laravel API
   */
  const fetchCircuits = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Import de l'API Laravel
      const { laravelApi } = await import("../service/ApiService.js");

      console.log("🔄 Récupération des circuits depuis Laravel API...");

      // Utiliser la route Laravel pour récupérer les circuits
      const response = await laravelApi.get("/circuits");

      console.log("✅ Réponse Laravel circuits:", response);

      // Traiter la réponse Laravel - les données sont dans response.circuits
      let circuitData = response.circuits || response.data || response;

      if (Array.isArray(circuitData)) {
        circuits.value = circuitData;
      } else if (response.circuits && Array.isArray(response.circuits)) {
        // Si les données arrivent sous la forme { circuits: [...] }
        circuits.value = response.circuits;
      } else {
        console.warn("⚠️ Format de réponse inattendu:", response);
        circuits.value = [];
      }

      console.log(
        `✅ ${circuits.value.length} circuits récupérés depuis Laravel API`
      );
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des circuits:", err);
      error.value = `Erreur de connexion à Laravel API: ${err.message}`;

      // Message d'aide pour le développement
      if (err.message.includes("ERR_CONNECTION_REFUSED")) {
        error.value =
          "Impossible de se connecter à Laravel API. Vérifiez que Laravel est démarré sur votre serveur";
      } else if (err.message.includes("404")) {
        error.value =
          "Route circuits non trouvée. Vérifiez la configuration de Laravel API";
      } else if (err.message.includes("403")) {
        error.value =
          "Accès refusé. Vous devez être connecté en tant qu'administrateur Laravel";
      } else if (err.message.includes("401")) {
        error.value =
          "Token d'authentification manquant ou expiré. Reconnectez-vous à l'administration";
      }

      // Pas de données de fallback - on veut voir l'erreur en développement
      circuits.value = [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupérer un circuit par son ID
   */
  const fetchCircuitById = async (circuitId) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");
      const response = await laravelApi.get(`/circuits/${circuitId}`);

      return response.data || response;
    } catch (err) {
      console.error(
        `Erreur lors de la récupération du circuit ${circuitId}:`,
        err
      );
      throw new Error(`Impossible de récupérer le circuit: ${err.message}`);
    }
  };

  /**
   * Créer un nouveau circuit (Admin)
   */
  const createCircuit = async (circuitData) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      console.log("🔄 Création d'un nouveau circuit avec:", circuitData);

      // Valider les données selon le schéma Laravel
      const validCircuitData = {
        name: circuitData.name,
        description: circuitData.description || null,
        duration: circuitData.duration ? parseInt(circuitData.duration) : null,
        like: circuitData.like ? parseInt(circuitData.like) : 0,
        thumbnail: circuitData.thumbnail || null,
        achievement_id: circuitData.achievement_id || null,
        accessibility_ids: circuitData.accessibility_ids || [],
        mission_ids: circuitData.mission_ids || [],
      };

      console.log(
        "📋 Données validées pour création Laravel:",
        validCircuitData
      );

      const response = await laravelApi.post(
        "/admin/circuits",
        validCircuitData
      );

      // Ajouter à la liste locale
      const newCircuit = response.circuit || response.data || response;
      circuits.value.unshift(newCircuit); // Ajouter au début de la liste

      console.log("✅ Nouveau circuit créé avec succès:", newCircuit);
      error.value = null;
      return newCircuit;
    } catch (err) {
      console.error("❌ Erreur lors de la création du circuit:", err);
      error.value = `Impossible de créer le circuit: ${err.message}`;
      throw err;
    }
  };

  /**
   * Mettre à jour un circuit (Admin)
   */
  const updateCircuit = async (circuitId, circuitData) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`🔄 Mise à jour circuit ${circuitId} avec:`, circuitData);

      // Valider les champs selon le schéma Laravel
      const validCircuitData = {
        name: circuitData.name,
        description: circuitData.description || null,
        duration:
          circuitData.duration !== undefined && circuitData.duration !== null
            ? parseInt(circuitData.duration)
            : null,
        like:
          circuitData.like !== undefined && circuitData.like !== null
            ? parseInt(circuitData.like)
            : 0,
        thumbnail: circuitData.thumbnail || null,
        achievement_id: circuitData.achievement_id || null,
        accessibility_ids: circuitData.accessibility_ids || [],
        mission_ids: circuitData.mission_ids || [],
      };

      console.log("📋 Données validées pour Laravel:", validCircuitData);
      console.log("🔍 Détails de l'envoi:", {
        url: `/admin/circuits/${circuitId}`,
        method: "PUT",
        data: JSON.stringify(validCircuitData, null, 2),
      });

      // Utiliser la route Laravel PUT
      const response = await laravelApi.put(
        `/admin/circuits/${circuitId}`,
        validCircuitData
      );

      console.log("✅ Réponse de mise à jour Laravel:", response);

      // Mettre à jour dans la liste locale
      const index = circuits.value.findIndex(
        (circuit) => circuit.id === circuitId
      );
      if (index !== -1) {
        // Fusionner les nouvelles données avec les anciennes
        circuits.value[index] = {
          ...circuits.value[index],
          ...(response.circuit || response.data || response),
        };
        console.log(
          `✅ Circuit ${circuitId} mis à jour localement:`,
          circuits.value[index]
        );
      } else {
        console.warn(`⚠️ Circuit ${circuitId} non trouvé dans la liste locale`);
      }

      error.value = null;
      return response.data || response;
    } catch (err) {
      console.error(
        `❌ Erreur lors de la mise à jour du circuit ${circuitId}:`,
        err
      );
      error.value = `Impossible de mettre à jour le circuit: ${err.message}`;
      throw err;
    }
  };

  /**
   * Supprimer un circuit (Admin)
   */
  const deleteCircuit = async (circuitId) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      console.log(`🗑️ Suppression circuit ${circuitId}`);

      // Utiliser la route Laravel DELETE
      const response = await laravelApi.delete(`/admin/circuits/${circuitId}`);

      console.log("✅ Réponse de suppression Laravel:", response);

      // Supprimer de la liste locale
      const index = circuits.value.findIndex(
        (circuit) => circuit.id === circuitId
      );
      if (index !== -1) {
        const deletedCircuit = circuits.value.splice(index, 1)[0];
        console.log(`✅ Circuit supprimé localement:`, deletedCircuit);
      } else {
        console.warn(
          `⚠️ Circuit ${circuitId} non trouvé dans la liste locale pour suppression`
        );
      }

      error.value = null;
      return response.data || response;
    } catch (err) {
      console.error(
        `❌ Erreur lors de la suppression du circuit ${circuitId}:`,
        err
      );
      error.value = `Impossible de supprimer le circuit: ${err.message}`;
      throw err;
    }
  };

  /**
   * Chercher des circuits
   */
  const searchCircuits = async (query) => {
    loading.value = true;
    error.value = null;

    try {
      const { laravelApi } = await import("../service/ApiService.js");

      // Utiliser la recherche Laravel (si supportée par l'API)
      const response = await laravelApi.get(
        `/circuits?search=${encodeURIComponent(query)}`
      );

      return response.data || response || [];
    } catch (err) {
      error.value = `Erreur lors de la recherche: ${err.message}`;
      console.error("❌ Erreur searchCircuits:", err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Teste la connexion avec Laravel API
   */
  const testConnection = async () => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      console.log("🔗 Test de connexion à Laravel API...");

      const response = await laravelApi.get("/circuits");

      console.log("✅ Test de connexion Laravel circuits réussi:", response);
      return true;
    } catch (err) {
      console.error("❌ Test de connexion Laravel circuits échoué:", err);
      return false;
    }
  };

  /**
   * Synchroniser les missions d'un circuit (Admin)
   */
  const syncCircuitMissions = async (circuitId, missionIds) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      const response = await laravelApi.post(
        `/admin/circuits/${circuitId}/sync-missions`,
        {
          mission_ids: missionIds,
        }
      );

      console.log(`✅ Missions synchronisées pour le circuit ${circuitId}`);
      return response;
    } catch (err) {
      console.error("❌ Erreur lors de la synchronisation des missions:", err);
      throw err;
    }
  };

  /**
   * Ajouter un commentaire à un circuit
   */
  const addCircuitComment = async (circuitId, content) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      const response = await laravelApi.post(
        `/circuits/${circuitId}/comments`,
        {
          content: content,
        }
      );

      console.log(`✅ Commentaire ajouté au circuit ${circuitId}`);
      return response;
    } catch (err) {
      console.error("❌ Erreur lors de l'ajout du commentaire:", err);
      throw err;
    }
  };

  /**
   * Supprimer un commentaire d'un circuit
   */
  const deleteCircuitComment = async (circuitId, commentId) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");

      const response = await laravelApi.delete(
        `/circuits/${circuitId}/comments/${commentId}`
      );

      console.log(
        `✅ Commentaire ${commentId} supprimé du circuit ${circuitId}`
      );
      return response;
    } catch (err) {
      console.error("❌ Erreur lors de la suppression du commentaire:", err);
      throw err;
    }
  };

  // Méthodes utilitaires pour l'affichage selon le schéma Circuit
  const getCircuitStatus = (circuit) => {
    if (circuit.published) return "Publié";
    return "Brouillon";
  };

  const getCircuitDuration = (circuit) => {
    return circuit.duration ? parseInt(circuit.duration) : 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ""}`;
    }
    return `${mins}min`;
  };

  const getCircuitAddress = (circuit) => {
    if (!circuit.address) return "N/A";

    const parts = [];
    if (circuit.address.street) parts.push(circuit.address.street);
    if (circuit.address.city) parts.push(circuit.address.city);
    if (circuit.address.zipCode) parts.push(circuit.address.zipCode);

    return parts.length > 0 ? parts.join(", ") : "N/A";
  };

  // Retourner l'API publique
  return {
    // États (readonly pour éviter les mutations directes)
    circuits: readonly(circuits),
    loading: readonly(loading),
    error: readonly(error),

    // Computed properties
    totalCircuits,
    activeCircuits,
    newCircuitsSuggested,

    // Actions
    fetchCircuits,
    fetchCircuitById,
    createCircuit,
    updateCircuit,
    deleteCircuit,
    searchCircuits,
    testConnection,
    syncCircuitMissions,
    addCircuitComment,
    deleteCircuitComment,

    // Utilitaires
    formatDate,
    formatDuration,
    getCircuitAddress,
    getCircuitStatus,
    getCircuitDuration,
  };
};

// Export par défaut pour compatibilité
export default useCircuits;
