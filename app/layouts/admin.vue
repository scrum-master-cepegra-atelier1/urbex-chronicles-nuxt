<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <LayoutSidebar />
    
    <!-- Contenu principal -->
    <div class="flex-1 ml-72">
      <!-- TopBar -->
      <LayoutTopBar />
      
      <!-- Contenu de la page -->
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// Ce layout est utilisé pour toutes les pages administratives
// Il inclut automatiquement la Sidebar et la TopBar
</script>

<style scoped>
/* Styles spécifiques au layout admin si nécessaire */
</style>
