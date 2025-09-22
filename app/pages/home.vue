<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold text-center mb-8 text-green-600">
      Page Home - Urbex Chronicles
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Section Tailwind -->
      <div class="bg-green-50 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4 text-green-800">
          Fonctionnalités Tailwind CSS
        </h2>
        <ul class="space-y-2 text-green-700">
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Responsive design
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Utility classes
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Système de grille
          </li>
        </ul>
      </div>
      
      <!-- Section SCSS -->
      <div class="custom-scss-component">
        <h2 class="text-xl font-semibold mb-4">
          Styles SCSS personnalisés
        </h2>
        <p class="scss-test">
          Ce composant utilise des styles SCSS avec des variables et des mixins
        </p>
        <div class="scss-nested-example">
          <p>Exemple de nesting SCSS</p>
        </div>
      </div>
    </div>
    
    <!-- Navigation -->
    <div class="text-center mt-8">
      <NuxtLink 
        to="/" 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Retour à l'accueil
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Configuration de la page
definePageMeta({
  title: 'Home - Urbex Chronicles'
})
</script>

<style lang="scss" scoped>
// Styles SCSS spécifiques à cette page
.scss-nested-example {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #f8fafc;
  border-left: 4px solid #10b981;
  
  p {
    margin: 0;
    font-style: italic;
    color: #065f46;
  }
}
</style>
