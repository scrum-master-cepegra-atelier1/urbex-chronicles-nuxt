/**
 * Composable pour gérer les accessibilities avec Laravel API
 */

import { ref, computed } from "vue";

export const useAccessibilities = () => {
  // État réactif
  const accessibilities = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Fonctions utilitaires pour mapper les données selon le schéma Laravel
  const mapFromLaravel = (accessibility) => {
    return {
      id: accessibility.id,
      // Champs du schéma Laravel selon l'API_ROUTES.md
      name: accessibility.name || "Sans nom",
      description: accessibility.description || "Pas de description",
      // Champs UI dérivés pour compatibilité avec l'interface
      title: accessibility.name || "Sans nom", // UI compatibility
      created_at: accessibility.created_at,
      updated_at: accessibility.updated_at,
    };
  };

  const mapToLaravel = (uiData) => ({
    // Seulement les champs qui existent dans le schéma Laravel
    name: uiData.name || uiData.title || "Sans nom",
    description: uiData.description || "Pas de description",
  });

  // Stats calculées
  const stats = computed(() => {
    const total = accessibilities.value.length;
    const active = accessibilities.value.length; // Toutes les accessibilités sont considérées comme actives

    return {
      total,
      active,
    };
  });

  /**
   * Récupérer toutes les accessibilities depuis Laravel API
   */
  const fetchAccessibilities = async () => {
    try {
      loading.value = true;
      error.value = null;

      const { laravelApi } = await import("../service/ApiService.js");
      console.log("♿ Récupération des accessibilités depuis Laravel API...");

      const response = await laravelApi.get("/accessibilities");

      if (response) {
        const accessibilityData =
          response.accessibilities || response.data || response;

        if (Array.isArray(accessibilityData)) {
          console.log(
            `✅ ${accessibilityData.length} accessibilités récupérées avec succès`
          );
          accessibilities.value = accessibilityData.map(mapFromLaravel);
        } else {
          console.warn("⚠️ Structure de réponse inattendue:", response);
          accessibilities.value = [];
        }
      } else {
        console.warn("⚠️ Aucune réponse reçue de l'API Laravel");
        accessibilities.value = [];
      }
    } catch (err) {
      const errorMessage = `Erreur lors de la récupération des accessibilités: ${
        err.message || err
      }`;
      console.error("❌", errorMessage);
      error.value = errorMessage;

      // Fallback avec des données de test
      console.log("🔄 Utilisation de données de test pour le développement");
      accessibilities.value = [
        {
          id: 1,
          name: "Accès facile",
          description: "Accessible aux débutants",
          title: "Accès facile",
        },
        {
          id: 2,
          name: "Accès modéré",
          description: "Nécessite une bonne condition physique",
          title: "Accès modéré",
        },
        {
          id: 3,
          name: "Accès difficile",
          description: "Réservé aux explorateurs expérimentés",
          title: "Accès difficile",
        },
        {
          id: 4,
          name: "Accessibilité PMR",
          description: "Accessible aux personnes à mobilité réduite",
          title: "Accessibilité PMR",
        },
      ];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Créer une nouvelle accessibility
   */
  const createAccessibility = async (accessibilityData) => {
    try {
      loading.value = true;
      error.value = null;

      const { laravelApi } = await import("../service/ApiService.js");
      console.log(
        "♿ Création d'une nouvelle accessibilité...",
        accessibilityData
      );

      const response = await laravelApi.post(
        "/admin/accessibilities",
        mapToLaravel(accessibilityData)
      );

      if (response && response.accessibility) {
        const newAccessibility = mapFromLaravel(response.accessibility);
        accessibilities.value.push(newAccessibility);
        console.log("✅ Accessibilité créée avec succès:", newAccessibility);
        return newAccessibility;
      } else {
        throw new Error("Réponse invalide du serveur");
      }
    } catch (err) {
      const errorMessage = `Erreur lors de la création de l'accessibilité: ${
        err.message || err
      }`;
      console.error("❌", errorMessage);
      error.value = errorMessage;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Mettre à jour une accessibility
   */
  const updateAccessibility = async (id, accessibilityData) => {
    try {
      loading.value = true;
      error.value = null;

      const { laravelApi } = await import("../service/ApiService.js");
      console.log(
        `♿ Mise à jour de l'accessibilité ${id}...`,
        accessibilityData
      );

      const response = await laravelApi.put(
        `/admin/accessibilities/${id}`,
        mapToLaravel(accessibilityData)
      );

      if (response && response.accessibility) {
        const updatedAccessibility = mapFromLaravel(response.accessibility);
        const index = accessibilities.value.findIndex((a) => a.id === id);
        if (index !== -1) {
          accessibilities.value[index] = updatedAccessibility;
        }
        console.log(
          "✅ Accessibilité mise à jour avec succès:",
          updatedAccessibility
        );
        return updatedAccessibility;
      } else {
        throw new Error("Réponse invalide du serveur");
      }
    } catch (err) {
      const errorMessage = `Erreur lors de la mise à jour de l'accessibilité: ${
        err.message || err
      }`;
      console.error("❌", errorMessage);
      error.value = errorMessage;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Supprimer une accessibility
   */
  const deleteAccessibility = async (id) => {
    try {
      loading.value = true;
      error.value = null;

      const { laravelApi } = await import("../service/ApiService.js");
      console.log(`♿ Suppression de l'accessibilité ${id}...`);

      await laravelApi.delete(`/admin/accessibilities/${id}`);

      // Retirer de la liste locale
      accessibilities.value = accessibilities.value.filter((a) => a.id !== id);
      console.log("✅ Accessibilité supprimée avec succès");
    } catch (err) {
      const errorMessage = `Erreur lors de la suppression de l'accessibilité: ${
        err.message || err
      }`;
      console.error("❌", errorMessage);
      error.value = errorMessage;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupérer une accessibility par ID
   */
  const getAccessibilityById = async (id) => {
    try {
      const { laravelApi } = await import("../service/ApiService.js");
      console.log(`♿ Récupération de l'accessibilité ${id}...`);

      const response = await laravelApi.get(`/accessibilities/${id}`);

      if (response && response.accessibility) {
        return mapFromLaravel(response.accessibility);
      } else {
        throw new Error("Accessibilité introuvable");
      }
    } catch (err) {
      const errorMessage = `Erreur lors de la récupération de l'accessibilité: ${
        err.message || err
      }`;
      console.error("❌", errorMessage);
      error.value = errorMessage;
      throw err;
    }
  };

  /**
   * Recharger les données depuis l'API
   */
  const refreshAccessibilities = async () => {
    console.log("🔄 Rechargement des accessibilités...");
    await fetchAccessibilities();
  };

  return {
    // État
    accessibilities,
    loading,
    error,
    stats,

    // Actions
    fetchAccessibilities,
    createAccessibility,
    updateAccessibility,
    deleteAccessibility,
    getAccessibilityById,
    refreshAccessibilities,

    // Utilitaires
    mapFromLaravel,
    mapToLaravel,
  };
};
