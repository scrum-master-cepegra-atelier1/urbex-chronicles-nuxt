<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold text-center mb-8 text-blue-600">
      Urbex Chronicles
    </h1>
    
    <!-- Test Tailwind CSS -->
    <div class="bg-blue-100 p-6 rounded-lg mb-6">
      <h2 class="text-2xl font-semibold mb-4 text-blue-800">Test Tailwind CSS</h2>
      <p class="text-blue-700">Ce texte utilise les classes Tailwind CSS</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Bouton Tailwind
      </button>
    </div>
    
    <!-- Test SCSS -->
    <div class="custom-scss-component mb-6">
      <h2 class="text-xl font-semibold mb-2">Test SCSS</h2>
      <p class="scss-test">Ce texte utilise des styles SCSS personnalisés</p>
    </div>
    
    <!-- Navigation -->
    <nav class="text-center">
      <NuxtLink to="/home" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Aller à la page Home
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
// Configuration de la page
definePageMeta({
  title: 'Accueil - Urbex Chronicles'
})
</script>

<style scoped>
/* Styles spécifiques à cette page */
.container {
  max-width: 1200px;
}
</style>
