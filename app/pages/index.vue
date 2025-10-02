<template>
  <!-- Sidebar: Position fixe -->
  <LayoutSidebar />
  <!-- TopBar: Position fixe -->
  <LayoutTopBar />
  
  <!-- Contenu principal -->
  <main class="pl-5 ml-0 lg:ml-72 mt-16 me-16 lg:mt-20 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] bg-white overflow-hidden">
    <div class="h-full flex flex-col p-4 sm:p-6 lg:p-8">
      <!-- Page Title -->
      <div class="mb-12 flex-shrink-0">
        <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Dashboard</h1>
      </div>
      
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12 mb-24 me-32 flex-shrink-0 ml-8">
                
                <!-- Spots actifs -->
                <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                  <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">23</div>
                  <div class="text-base lg:text-lg text-gray-600">Spots<br>actifs</div>
                </div>

                <!-- Missions en cours -->
                <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                  <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">43</div>
                  <div class="text-base lg:text-lg text-gray-600">Missions en cours</div>
                </div>

                <!-- Notifications active -->
                <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                  <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">2</div>
                  <div class="text-base lg:text-lg text-gray-600">Notifications active</div>
                </div>

                <!-- Utilisateurs en ligne -->
                <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                  <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">157</div>
                  <div class="text-base lg:text-lg text-gray-600">Utilisateurs en<br>ligne</div>
                </div>

                <!-- Xp total distribué -->
                <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                  <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">1 478 392</div>
                  <div class="text-base lg:text-lg text-gray-600">Xp total distribué</div>
                </div>

                <!-- Tickets -->
                <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                  <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Freeman', sans-serif;">1</div>
                  <div class="text-base lg:text-lg text-gray-600">Tickets</div>
                </div>
                
        </div>

        <!-- Map Section -->
        <div class="bg-white rounded-lg border border-gray-300 border-dashed p-8 lg:p-12 h-80 flex items-center justify-center mr-8">
          <div class="text-center text-gray-500">
            <div class="text-lg lg:text-xl font-medium mb-4">Image d'une map</div>
            <div class="text-sm text-gray-400">Emplacement réservé pour la carte interactive</div>
          </div>
        </div>
        
      </div>
    </div>
  </main>
</template>

<script setup>
// Meta de la page
definePageMeta({
  title: 'Dashboard'
})

// Head configuration
useHead({
  title: 'Dashboard',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect', 
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Freeman&display=swap'
    }
  ]
})
</script>

<style>
/* Forcer l'absence de scroll sur toute la page */
html, body {
  overflow: hidden !important;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>