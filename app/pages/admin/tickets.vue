<template>
    <!-- Sidebar: Position fixe -->
    <LayoutSidebar />
    <!-- TopBar: Position fixe -->
    <LayoutTopBar />

    <!-- Contenu principal -->
    <main class="pl-5 ml-0 lg:ml-72 mt-16 me-16 lg:mt-20 min-h-screen bg-white">
        <div class="p-4 sm:p-6 lg:p-8">
            <!-- Page Title -->
            <div class="mb-12 flex-shrink-0">
                <h1 class="text-gray-900" style="font-family: 'Do Hyeon', sans-serif; font-size: 36px;">Tickets</h1>
                <!-- Indicateur de chargement -->
                <div v-if="loading" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div class="flex items-center">
                        <UiIcon name="refresh" size="5" class="text-blue-500 mr-2 animate-spin" />
                        <span class="text-blue-800">Chargement des tickets...</span>
                    </div>
                </div>

                <!-- Message de succès -->
                <div v-if="successMessage" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div class="flex items-center">
                        <UiIcon name="check" size="5" class="text-green-500 mr-2" />
                        <span class="text-green-800">{{ successMessage }}</span>
                    </div>
                </div>

                <!-- Message d'erreur -->
                <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div class="flex items-center">
                        <UiIcon name="exclamation" size="5" class="text-red-500 mr-2" />
                        <span class="text-red-800">{{ error }}</span>
                        <button @click="refreshData"
                            class="ml-4 text-red-600 hover:text-red-800 underline">Réessayer</button>
                    </div>
                </div>
            </div>

            <div class="ml-8">

                <!-- Stats Section dynamiques -->
                <div class="mb-12 flex-shrink-0">
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12">
                        <!-- Total tickets -->
                        <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                            <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
                                style="font-family: 'Freeman', sans-serif;">{{ stats.total }}</div>
                            <div class="text-base lg:text-lg text-gray-600">Total tickets</div>
                        </div>

                        <!-- Tickets en attente -->
                        <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                            <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
                                style="font-family: 'Freeman', sans-serif;">{{ stats.pending }}</div>
                            <div class="text-base lg:text-lg text-gray-600">En attente</div>
                        </div>

                        <!-- Tickets résolus -->
                        <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                            <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
                                style="font-family: 'Freeman', sans-serif;">{{ stats.resolved }}</div>
                            <div class="text-base lg:text-lg text-gray-600">Résolus</div>
                        </div>

                        <!-- Tickets urgents -->
                        <div class="bg-gray-100 rounded-lg p-4 lg:p-6">
                            <div class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2"
                                style="font-family: 'Freeman', sans-serif;">{{ stats.urgent }}</div>
                            <div class="text-base lg:text-lg text-gray-600">Urgents</div>
                        </div>
                    </div>
                </div>

                <!-- Add Ticket Section -->
                <div class="mb-12 flex-shrink-0">

                    <!-- Formulaire Principal avec onglet déroulant -->
                    <div class="bg-white mb-12 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <!-- Header cliquable -->
                        <div @click="toggleAddForm"
                            class="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-6 cursor-pointer hover:from-orange-600 hover:to-red-700 transition-all duration-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-2xl font-bold text-white flex items-center"
                                        style="font-family: 'Do Hyeon', sans-serif;">
                                        <svg class="w-8 h-8 mr-3 text-orange-200" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                        </svg>
                                        Créer un nouveau ticket
                                    </h2>
                                    <p class="text-orange-100 mt-1">
                                        Créez un ticket de support pour un utilisateur ou traitement manuel
                                    </p>
                                </div>
                                <!-- Icône de déroulement -->
                                <div class="flex items-center">
                                    <svg :class="{ 'rotate-180': showAddForm }"
                                        class="w-6 h-6 text-orange-200 transform transition-transform duration-200"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Contenu déroulant -->
                        <div :class="{ 'max-h-0 overflow-hidden': !showAddForm, 'max-h-none': showAddForm }"
                            class="transition-all duration-300 ease-in-out">
                            <div class="p-8">
                                <!-- Formulaire de création de ticket -->
                                <form @submit.prevent="createTicket" class="space-y-6">
                                    <!-- Informations client -->
                                    <div>
                                        <h4 class="text-lg font-semibold text-gray-900 mb-4">Informations client</h4>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label for="customerName"
                                                    class="block text-sm font-medium text-gray-700 mb-2">Nom complet
                                                    *</label>
                                                <input v-model="newTicket.customerName" type="text" id="customerName"
                                                    required
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                                                    placeholder="Nom du client">
                                            </div>
                                            <div>
                                                <label for="customerEmail"
                                                    class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                                <input v-model="newTicket.customerEmail" type="email" id="customerEmail"
                                                    required
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                                                    placeholder="email@exemple.com">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Détails du ticket -->
                                    <div>
                                        <h4 class="text-lg font-semibold text-gray-900 mb-4">Détails du ticket</h4>
                                        <div class="space-y-6">
                                            <div>
                                                <label for="ticketTitle"
                                                    class="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
                                                <input v-model="newTicket.title" type="text" id="ticketTitle" required
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                                                    placeholder="Résumé du problème ou de la demande">
                                            </div>

                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label for="ticketType"
                                                        class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                                    <select v-model="newTicket.type" id="ticketType"
                                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200">
                                                        <option value="bug">🐛 Bug/Problème</option>
                                                        <option value="feature">✨ Demande de fonctionnalité</option>
                                                        <option value="question">❓ Question</option>
                                                        <option value="account">👤 Compte utilisateur</option>
                                                        <option value="payment">💳 Paiement</option>
                                                        <option value="other">📝 Autre</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label for="ticketPriority"
                                                        class="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                                                    <select v-model="newTicket.priority" id="ticketPriority"
                                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200">
                                                        <option value="low">⬇️ Basse</option>
                                                        <option value="medium">➡️ Moyenne</option>
                                                        <option value="high">⬆️ Élevée</option>
                                                        <option value="urgent">🔥 Urgente</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label for="ticketDescription"
                                                    class="block text-sm font-medium text-gray-700 mb-2">Description
                                                    *</label>
                                                <textarea v-model="newTicket.description" id="ticketDescription"
                                                    rows="6" required
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none"
                                                    placeholder="Décrivez en détail le problème ou la demande..."></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Actions -->
                                    <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                        <button type="button" @click="resetForm"
                                            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                                            Annuler
                                        </button>
                                        <button type="submit" :disabled="!isNewTicketValid || submitting"
                                            class="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center">
                                            <svg v-if="submitting" class="w-4 h-4 mr-2 animate-spin" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                                </path>
                                            </svg>
                                            {{ submitting ? 'Création...' : '🎫 Créer le ticket' }}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Tickets Management Section -->
                    <div class="mb-12">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-900" style="font-family: 'Do Hyeon', sans-serif;">
                            Gestion des tickets
                            </h2>
                            <div class="flex space-x-3">
                                <!-- Filtres avec overlay -->
                                <UiFilterOverlay
                                    page-title="les tickets"
                                    :filters="filters"
                                    :active-filters-count="activeFiltersCount"
                                    @update:filters="updateFilters"
                                    @reset="clearFilters"
                                >
                                    <template #default="{ filters, updateFilter }">
                                        <!-- Recherche -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                Rechercher
                                            </label>
                                            <input
                                                :value="filters.search"
                                                @input="updateFilter('search', $event.target.value)"
                                                type="text"
                                                placeholder="Titre, client, description..."
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                            />
                                        </div>

                                        <!-- Statut -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                                            <select
                                                :value="filters.status"
                                                @change="updateFilter('status', $event.target.value)"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                            >
                                                <option value="">Tous les statuts</option>
                                                <option value="open">Ouvert</option>
                                                <option value="in_progress">En cours</option>
                                                <option value="pending">En attente</option>
                                                <option value="resolved">Résolu</option>
                                                <option value="closed">Fermé</option>
                                            </select>
                                        </div>

                                        <!-- Priorité -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                                            <select
                                                :value="filters.priority"
                                                @change="updateFilter('priority', $event.target.value)"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                            >
                                                <option value="">Toutes les priorités</option>
                                                <option value="urgent">Urgente</option>
                                                <option value="high">Élevée</option>
                                                <option value="medium">Moyenne</option>
                                                <option value="low">Basse</option>
                                            </select>
                                        </div>

                                        <!-- Type -->
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                            <select
                                                :value="filters.type"
                                                @change="updateFilter('type', $event.target.value)"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                            >
                                                <option value="">Tous les types</option>
                                                <option value="bug">Bug/Problème</option>
                                                <option value="feature">Fonctionnalité</option>
                                                <option value="question">Question</option>
                                                <option value="account">Compte</option>
                                                <option value="payment">Paiement</option>
                                                <option value="other">Autre</option>
                                            </select>
                                        </div>
                                    </template>
                                </UiFilterOverlay>

                                <!-- Bouton refresh -->
                                <UiRefreshButton 
                                    :loading="loading" 
                                    @click="refreshData"
                                    variant="secondary"
                                    size="sm"
                                />
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <!-- Table Header -->
                            <div class="bg-gray-50 px-6 py-6 border-b border-gray-200 hidden md:block">
                                <div class="grid gap-4 text-base font-medium text-gray-700" style="grid-template-columns: 2fr 1.8fr 1fr 1fr 1fr 1.2fr 1fr;">
                                    <div>Ticket</div>
                                    <div>Client</div>
                                    <div>Type</div>
                                    <div>Priorité</div>
                                    <div>Statut</div>
                                    <div>Créé le</div>
                                    <div>Actions</div>
                                </div>
                            </div>

                            <!-- Table Body -->
                            <div class="max-h-96 overflow-y-auto">
                                <!-- Loading skeleton -->
                                <div v-if="loading" class="px-6 py-6">
                                    <div class="animate-pulse space-y-4">
                                        <div v-for="n in 3" :key="n" class="grid gap-4" style="grid-template-columns: 2fr 1.8fr 1fr 1fr 1fr 1.2fr 1fr;">
                                            <div class="h-4 bg-gray-200 rounded"></div>
                                            <div class="h-4 bg-gray-200 rounded"></div>
                                            <div class="h-4 bg-gray-200 rounded"></div>
                                            <div class="h-4 bg-gray-200 rounded"></div>
                                            <div class="h-4 bg-gray-200 rounded"></div>
                                            <div class="h-4 bg-gray-200 rounded"></div>
                                            <div class="h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tickets list - Desktop -->
                                <template v-else>
                                    <div v-for="ticket in filteredTickets" :key="ticket.id"
                                        class="px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 hidden md:block">
                                        <div class="grid gap-4 items-center text-base" style="grid-template-columns: 2fr 1.8fr 1fr 1fr 1fr 1.2fr 1fr;">
                                        <div class="text-gray-900 font-medium min-w-0">
                                            <div class="font-semibold truncate">{{ ticket.title }}</div>
                                            <div class="text-sm text-gray-500">#{{ ticket.id }}</div>
                                        </div>
                                        <div class="text-gray-600 min-w-0">
                                            <div class="font-medium truncate">{{ ticket.customer.name }}</div>
                                            <div class="text-sm text-gray-500 truncate">{{ ticket.customer.email }}</div>
                                        </div>
                                        <div class="flex items-center">
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                                                :class="getTypeColor(ticket.type)">
                                                {{ getTypeIcon(ticket.type) }} {{ getTypeLabel(ticket.type) }}
                                            </span>
                                        </div>
                                        <div class="flex items-center">
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                                                :class="getPriorityColor(ticket.priority)">
                                                {{ getPriorityIcon(ticket.priority) }} {{
                                                getPriorityLabel(ticket.priority) }}
                                            </span>
                                        </div>
                                        <div class="flex items-center">
                                            <span :class="getStatusColor(ticket.status)"
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
                                                {{ getStatusIcon(ticket.status) }} {{ getStatusLabel(ticket.status) }}
                                            </span>
                                        </div>
                                        <div class="text-gray-700 text-sm">{{ formatDate(ticket.createdAt) }}</div>
                                        <div class="flex items-center space-x-2">
                                            <button @click="viewTicket(ticket)"
                                                class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1.5"
                                                title="Voir détails">
                                                <UiIcon name="eye" size="4" />
                                            </button>
                                            <button @click="replyToTicket(ticket)"
                                                class="text-green-600 hover:text-green-800 transition-colors duration-200 p-1.5"
                                                title="Répondre">
                                                <UiIcon name="edit" size="4" />
                                            </button>
                                            <button v-if="ticket.status !== 'resolved' && ticket.status !== 'closed'"
                                                @click="resolveTicket(ticket)"
                                                class="text-purple-600 hover:text-purple-800 transition-colors duration-200 p-1.5"
                                                title="Marquer comme résolu">
                                                <UiIcon name="check" size="4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </template>

                                <!-- Tickets list - Mobile -->
                                <div v-for="ticket in filteredTickets" :key="'mobile-' + ticket.id"
                                    class="px-4 py-4 border-b border-gray-100 md:hidden">
                                    <div class="space-y-3">
                                        <!-- En-tête mobile -->
                                        <div class="flex items-start justify-between">
                                            <div class="flex-1 min-w-0">
                                                <h4 class="font-semibold text-gray-900 truncate">{{ ticket.title }}</h4>
                                                <p class="text-sm text-gray-500">#{{ ticket.id }} • {{ ticket.customer.name }}</p>
                                            </div>
                                            <span :class="getStatusColor(ticket.status)"
                                                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                                                {{ getStatusIcon(ticket.status) }} {{ getStatusLabel(ticket.status) }}
                                            </span>
                                        </div>
                                        
                                        <!-- Badges mobiles -->
                                        <div class="flex flex-wrap gap-2">
                                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                                :class="getTypeColor(ticket.type)">
                                                {{ getTypeIcon(ticket.type) }} {{ getTypeLabel(ticket.type) }}
                                            </span>
                                            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                                :class="getPriorityColor(ticket.priority)">
                                                {{ getPriorityIcon(ticket.priority) }} {{ getPriorityLabel(ticket.priority) }}
                                            </span>
                                        </div>
                                        
                                        <!-- Actions mobiles -->
                                        <div class="flex items-center justify-between">
                                            <span class="text-xs text-gray-500">{{ formatDate(ticket.createdAt) }}</span>
                                            <div class="flex items-center space-x-3">
                                                <button @click="viewTicket(ticket)"
                                                    class="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1"
                                                    title="Voir détails">
                                                    <UiIcon name="eye" size="5" />
                                                </button>
                                                <button @click="replyToTicket(ticket)"
                                                    class="text-green-600 hover:text-green-800 transition-colors duration-200 p-1"
                                                    title="Répondre">
                                                    <UiIcon name="edit" size="5" />
                                                </button>
                                                <button v-if="ticket.status !== 'resolved' && ticket.status !== 'closed'"
                                                    @click="resolveTicket(ticket)"
                                                    class="text-purple-600 hover:text-purple-800 transition-colors duration-200 p-1"
                                                    title="Marquer comme résolu">
                                                    <UiIcon name="check" size="5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Message si aucun ticket -->
                            <div v-if="!loading && filteredTickets.length === 0" class="p-12 text-center">
                                <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                                <h3 class="text-2xl font-bold text-gray-900 mb-2">Aucun ticket</h3>
                                <p class="text-gray-600 mb-6">
                                    {{ hasActiveFilters ? 'Aucun ticket ne correspond à vos critères de recherche.' :
                                    'Aucun ticket de support pour le moment. Excellente nouvelle !' }}
                                </p>
                                <button v-if="hasActiveFilters" @click="clearFilters"
                                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200">
                                    Effacer les filtres
                                </button>
                            </div>
                        </div>
                    </div>
                            <!-- Message si aucun ticket -->
                            <div v-if="!loading && filteredTickets.length === 0" class="p-12 text-center">
                                <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Aucun ticket trouvé</h3>
                                <p class="text-gray-600 mb-6">
                                    {{ hasActiveFilters ? 'Aucun ticket ne correspond à vos critères de recherche.' :'Aucun ticket de support pour le moment. Excellente nouvelle !' }}
                                </p>
                                <button v-if="hasActiveFilters" @click="clearFilters"
                                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200">
                                    Effacer les filtres
                                </button>
                            </div>
                        </div>
                    </div>

            <!-- Modal de détail du ticket -->
            <div v-if="showTicketModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                    <!-- Header -->
                    <div class="flex justify-between items-center p-6 border-b border-gray-200">
                        <div>
                            <h2 class="text-xl font-bold text-gray-900">{{ selectedTicket?.title }}</h2>
                            <p class="text-sm text-gray-600 mt-1">Ticket #{{ selectedTicket?.id }}</p>
                        </div>
                        <button @click="showTicketModal = false"
                            class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                            <UiIcon name="close" size="6" />
                        </button>
                    </div>

                    <!-- Contenu scrollable -->
                    <div class="overflow-y-auto max-h-[calc(90vh-120px)]">
                        <!-- Infos du ticket -->
                        <div class="p-6 border-b border-gray-200">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-3">Informations client</h4>
                                    <div class="space-y-2 text-sm">
                                        <p><strong>Nom:</strong> {{ selectedTicket?.customer.name }}</p>
                                        <p><strong>Email:</strong> {{ selectedTicket?.customer.email }}</p>
                                        <p><strong>Téléphone:</strong> {{ selectedTicket?.customer.phone || 'Non renseigné' }}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-3">Détails du ticket</h4>
                                    <div class="space-y-2 text-sm">
                                        <p><strong>Type:</strong> {{ getTypeLabel(selectedTicket?.type) }}</p>
                                        <p><strong>Priorité:</strong> {{ getPriorityLabel(selectedTicket?.priority) }}
                                        </p>
                                        <p><strong>Statut:</strong> {{ getStatusLabel(selectedTicket?.status) }}</p>
                                        <p><strong>Créé le:</strong> {{ formatDate(selectedTicket?.createdAt) }}</p>
                                        <p v-if="selectedTicket?.assignedTo"><strong>Assigné à:</strong> {{
                                            selectedTicket.assignedTo }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Description -->
                            <div class="mt-6">
                                <h4 class="font-semibold text-gray-900 mb-3">Description</h4>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-gray-700 whitespace-pre-wrap">{{ selectedTicket?.description }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Historique des réponses -->
                        <div class="p-6">
                            <h4 class="font-semibold text-gray-900 mb-4">Historique des échanges</h4>

                            <div class="space-y-4">
                                <div v-for="response in selectedTicket?.responses || []" :key="response.id"
                                    class="border rounded-lg p-4"
                                    :class="response.fromAdmin ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'">
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center space-x-2">
                                            <span class="font-medium text-gray-900">
                                                {{ response.fromAdmin ? response.adminName :
                                                selectedTicket?.customer.name }}
                                            </span>
                                            <span class="text-xs px-2 py-1 rounded-full"
                                                :class="response.fromAdmin ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'">
                                                {{ response.fromAdmin ? 'Admin' : 'Client' }}
                                            </span>
                                        </div>
                                        <span class="text-xs text-gray-500">{{ formatDate(response.createdAt) }}</span>
                                    </div>
                                    <p class="text-gray-700 whitespace-pre-wrap">{{ response.message }}</p>
                                </div>
                            </div>

                            <!-- Formulaire de réponse -->
                            <div class="mt-6 border-t border-gray-200 pt-6">
                                <h5 class="font-medium text-gray-900 mb-3">Répondre au ticket</h5>
                                <div class="space-y-4">
                                    <textarea v-model="newResponse" rows="4" placeholder="Tapez votre réponse..."
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"></textarea>

                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-4">
                                            <label class="flex items-center">
                                                <input type="checkbox" v-model="markAsResolved"
                                                    class="rounded border-gray-300 text-orange-600 focus:ring-orange-500">
                                                <span class="ml-2 text-sm text-gray-700">Marquer comme résolu</span>
                                            </label>
                                        </div>

                                        <div class="flex space-x-3">
                                            <button @click="newResponse = ''"
                                                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                Annuler
                                            </button>
                                            <button @click="sendResponse" :disabled="!newResponse.trim()"
                                                class="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                                                Envoyer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Meta de la page
definePageMeta({
    title: 'Support & Tickets'
})

// Head configuration
useHead({
    title: 'Support & Tickets'
})

// État global
const loading = ref(false)
const submitting = ref(false)
const showAddForm = ref(false)
const tickets = ref([])
const showTicketModal = ref(false)
const selectedTicket = ref(null)
const newResponse = ref('')
const markAsResolved = ref(false)
const successMessage = ref('')
const error = ref('')

// Toggle form
const toggleAddForm = () => {
    showAddForm.value = !showAddForm.value
}

// Filtres
const filters = ref({
    search: '',
    status: '',
    priority: '',
    type: ''
})

// Nouveau ticket
const newTicket = ref({
    customerName: '',
    customerEmail: '',
    title: '',
    type: 'question',
    priority: 'medium',
    description: ''
})

// Données statiques de démonstration
const staticTickets = [
    {
        id: 'TK-2024-001',
        title: 'Impossible de télécharger les photos de mon exploration',
        description: 'Bonjour, j\'ai exploré l\'ancienne usine de Charleroi hier et j\'aimerais télécharger mes photos sur la plateforme mais j\'ai une erreur 500 qui s\'affiche. Pouvez-vous m\'aider ?',
        type: 'bug',
        priority: 'medium',
        status: 'open',
        customer: {
            name: 'Alexandre Dubois',
            email: 'alex.dubois@gmail.com',
            phone: '+32 485 123 456'
        },
        createdAt: '2024-10-08T14:30:00Z',
        lastResponseAt: null,
        responseCount: 0,
        assignedTo: null,
        responses: []
    },
    {
        id: 'TK-2024-002',
        title: 'Demande de partenariat pour reportage photographique',
        description: 'Bonjour,\n\nJe suis photographe professionnel spécialisé dans l\'urbex et j\'aimerais proposer un partenariat pour créer du contenu exclusif pour votre plateforme. J\'ai notamment accès à plusieurs sites industriels abandonnés en Wallonie.\n\nPourrions-nous en discuter ?\n\nCordialement',
        type: 'feature',
        priority: 'low',
        status: 'in_progress',
        customer: {
            name: 'Marie Lefebvre',
            email: 'marie.lefebvre.photo@outlook.com',
            phone: '+32 476 987 654'
        },
        createdAt: '2024-10-07T09:15:00Z',
        lastResponseAt: '2024-10-07T15:30:00Z',
        responseCount: 2,
        assignedTo: 'Lucas Martin',
        responses: [
            {
                id: 'R-001',
                message: 'Bonjour Marie,\n\nMerci pour votre message ! Votre proposition nous intéresse beaucoup. Pourriez-vous nous envoyer un portfolio de vos travaux précédents en urbex ?\n\nCordialement,\nL\'équipe Urbex Chronicles',
                fromAdmin: true,
                adminName: 'Lucas Martin',
                createdAt: '2024-10-07T11:45:00Z'
            },
            {
                id: 'R-002',
                message: 'Parfait ! Je vous envoie mon portfolio par email séparé. J\'ai aussi quelques idées de spots uniques qui pourraient vous intéresser.',
                fromAdmin: false,
                createdAt: '2024-10-07T15:30:00Z'
            }
        ]
    },
    {
        id: 'TK-2024-003',
        title: 'Problème de paiement pour l\'abonnement premium',
        description: 'Ma carte bancaire est refusée lors du paiement de l\'abonnement premium. J\'ai vérifié avec ma banque et tout semble normal de leur côté. Le message d\'erreur indique "Transaction declined".',
        type: 'payment',
        priority: 'high',
        status: 'resolved',
        customer: {
            name: 'Jean-Pierre Vandenberghe',
            email: 'jp.vandenberghe@hotmail.com',
            phone: '+32 495 567 890'
        },
        createdAt: '2024-10-06T16:20:00Z',
        lastResponseAt: '2024-10-07T10:15:00Z',
        responseCount: 3,
        assignedTo: 'Sophie Durand',
        responses: [
            {
                id: 'R-003',
                message: 'Bonjour Jean-Pierre,\n\nNous avons identifié un problème temporaire avec notre processeur de paiement. Pouvez-vous réessayer maintenant ? Si le problème persiste, nous pouvons vous envoyer un lien de paiement alternatif.\n\nCordialement',
                fromAdmin: true,
                adminName: 'Sophie Durand',
                createdAt: '2024-10-06T18:30:00Z'
            },
            {
                id: 'R-004',
                message: 'J\'ai réessayé et ça fonctionne maintenant ! Merci beaucoup pour votre réactivité.',
                fromAdmin: false,
                createdAt: '2024-10-07T08:45:00Z'
            },
            {
                id: 'R-005',
                message: 'Parfait ! Bienvenue dans la communauté Premium. N\'hésitez pas à nous recontacter si vous avez d\'autres questions.',
                fromAdmin: true,
                adminName: 'Sophie Durand',
                createdAt: '2024-10-07T10:15:00Z'
            }
        ]
    },
    {
        id: 'TK-2024-004',
        title: 'Mot de passe oublié - récupération impossible',
        description: 'Je n\'arrive pas à récupérer mon mot de passe. Je clique sur "mot de passe oublié" mais je ne reçois aucun email. J\'ai vérifié mes spams.',
        type: 'account',
        priority: 'medium',
        status: 'pending',
        customer: {
            name: 'Sarah Moreau',
            email: 'sarah.moreau91@gmail.com',
            phone: null
        },
        createdAt: '2024-10-08T11:45:00Z',
        lastResponseAt: '2024-10-08T14:20:00Z',
        responseCount: 1,
        assignedTo: 'Thomas Rousseau',
        responses: [
            {
                id: 'R-006',
                message: 'Bonjour Sarah,\n\nJ\'ai vérifié votre compte et envoyé manuellement un email de réinitialisation. Pouvez-vous vérifier votre boîte mail dans les 10 prochaines minutes ?\n\nSi vous ne recevez toujours rien, nous réinitialiserons votre mot de passe manuellement.',
                fromAdmin: true,
                adminName: 'Thomas Rousseau',
                createdAt: '2024-10-08T14:20:00Z'
            }
        ]
    },
    {
        id: 'TK-2024-005',
        title: 'Suggestion: Mode sombre pour l\'application mobile',
        description: 'Serait-il possible d\'ajouter un mode sombre à l\'application mobile ? Cela serait très utile lors des explorations nocturnes pour ne pas être ébloui par l\'écran.',
        type: 'feature',
        priority: 'low',
        status: 'open',
        customer: {
            name: 'Maxime Rodriguez',
            email: 'max.rodriguez.urbex@protonmail.com',
            phone: '+32 468 234 567'
        },
        createdAt: '2024-10-08T20:30:00Z',
        lastResponseAt: null,
        responseCount: 0,
        assignedTo: null,
        responses: []
    },
    {
        id: 'TK-2024-006',
        title: 'URGENT: Contenu inapproprié signalé',
        description: 'Un utilisateur a publié des photos avec des tags/graffitis dans la cathédrale Saint-Bavon. Ce type de contenu va à l\'encontre de l\'éthique urbex et donne une mauvaise image à notre communauté.',
        type: 'other',
        priority: 'urgent',
        status: 'in_progress',
        customer: {
            name: 'Emma Lejeune',
            email: 'emma.lejeune.moderatrice@urbexchronicles.be',
            phone: '+32 477 345 678'
        },
        createdAt: '2024-10-09T07:15:00Z',
        lastResponseAt: '2024-10-09T08:00:00Z',
        responseCount: 1,
        assignedTo: 'Lucas Martin',
        responses: [
            {
                id: 'R-007',
                message: 'Signal reçu Emma. J\'ai supprimé les photos en question et contacté l\'utilisateur pour un rappel des règles. Merci pour votre vigilance !',
                fromAdmin: true,
                adminName: 'Lucas Martin',
                createdAt: '2024-10-09T08:00:00Z'
            }
        ]
    }
]

// Statistiques calculées
const stats = computed(() => {
    const total = tickets.value.length
    const pending = tickets.value.filter(t => t.status === 'pending' || t.status === 'open').length
    const resolved = tickets.value.filter(t => t.status === 'resolved' || t.status === 'closed').length
    const urgent = tickets.value.filter(t => t.priority === 'urgent').length

    return { total, pending, resolved, urgent }
})

// Tickets filtrés
const filteredTickets = computed(() => {
    let filtered = tickets.value

    if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        filtered = filtered.filter(ticket =>
            ticket.title.toLowerCase().includes(search) ||
            ticket.description.toLowerCase().includes(search) ||
            ticket.customer.name.toLowerCase().includes(search) ||
            ticket.customer.email.toLowerCase().includes(search)
        )
    }

    if (filters.value.status) {
        filtered = filtered.filter(ticket => ticket.status === filters.value.status)
    }

    if (filters.value.priority) {
        filtered = filtered.filter(ticket => ticket.priority === filters.value.priority)
    }

    if (filters.value.type) {
        filtered = filtered.filter(ticket => ticket.type === filters.value.type)
    }

    return filtered
})

// Filtres actifs
const hasActiveFilters = computed(() => {
    return filters.value.search || filters.value.status || filters.value.priority || filters.value.type
})

const activeFiltersCount = computed(() => {
    let count = 0
    if (filters.value.search) count++
    if (filters.value.status) count++
    if (filters.value.priority) count++
    if (filters.value.type) count++
    return count
})

// Validation nouveau ticket
const isNewTicketValid = computed(() => {
    return newTicket.value.customerName.trim() &&
        newTicket.value.customerEmail.trim() &&
        newTicket.value.title.trim() &&
        newTicket.value.description.trim()
})

// Méthodes utilitaires
const getStatusColor = (status) => {
    const colors = {
        open: 'bg-red-100 text-red-800',
        in_progress: 'bg-blue-100 text-blue-800',
        pending: 'bg-yellow-100 text-yellow-800',
        resolved: 'bg-green-100 text-green-800',
        closed: 'bg-gray-100 text-gray-800'
    }
    return colors[status] || colors.open
}

const getStatusLabel = (status) => {
    const labels = {
        open: 'Ouvert',
        in_progress: 'En cours',
        pending: 'En attente',
        resolved: 'Résolu',
        closed: 'Fermé'
    }
    return labels[status] || 'Inconnu'
}

const getStatusIcon = (status) => {
    const icons = {
        open: '🔴',
        in_progress: '🔵',
        pending: '🟡',
        resolved: '🟢',
        closed: '⚫'
    }
    return icons[status] || '❓'
}

const getPriorityColor = (priority) => {
    const colors = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-orange-100 text-orange-800',
        urgent: 'bg-red-100 text-red-800'
    }
    return colors[priority] || colors.medium
}

const getPriorityLabel = (priority) => {
    const labels = {
        low: 'Basse',
        medium: 'Moyenne',
        high: 'Élevée',
        urgent: 'Urgente'
    }
    return labels[priority] || 'Moyenne'
}

const getPriorityIcon = (priority) => {
    const icons = {
        low: '⬇️',
        medium: '➡️',
        high: '⬆️',
        urgent: '🔥'
    }
    return icons[priority] || '➡️'
}

const getTypeColor = (type) => {
    const colors = {
        bug: 'bg-red-100 text-red-800',
        feature: 'bg-purple-100 text-purple-800',
        question: 'bg-blue-100 text-blue-800',
        account: 'bg-green-100 text-green-800',
        payment: 'bg-yellow-100 text-yellow-800',
        other: 'bg-gray-100 text-gray-800'
    }
    return colors[type] || colors.other
}

const getTypeLabel = (type) => {
    const labels = {
        bug: 'Bug/Problème',
        feature: 'Fonctionnalité',
        question: 'Question',
        account: 'Compte',
        payment: 'Paiement',
        other: 'Autre'
    }
    return labels[type] || 'Autre'
}

const getTypeIcon = (type) => {
    const icons = {
        bug: '🐛',
        feature: '✨',
        question: '❓',
        account: '👤',
        payment: '💳',
        other: '📝'
    }
    return icons[type] || '📝'
}

const formatDate = (dateString) => {
    if (!dateString) return 'Non défini'
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Jamais'
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Il y a moins d\'1h'
    if (diffInHours < 24) return `Il y a ${diffInHours}h`
    if (diffInHours < 48) return 'Hier'
    const diffInDays = Math.floor(diffInHours / 24)
    return `Il y a ${diffInDays} jour(s)`
}

// Fonctions pour les filtres
const updateFilters = (newFilters) => {
    filters.value = { ...newFilters }
}

// Actions
const refreshData = () => {
    loading.value = true
    error.value = ''
    setTimeout(() => {
        loading.value = false
    }, 1000)
}

const resetForm = () => {
    newTicket.value = {
        customerName: '',
        customerEmail: '',
        title: '',
        type: 'question',
        priority: 'medium',
        description: ''
    }
    showAddForm.value = false
}

const clearFilters = () => {
    filters.value = {
        search: '',
        status: '',
        priority: '',
        type: ''
    }
}

const viewTicket = (ticket) => {
    selectedTicket.value = ticket
    showTicketModal.value = true
}

const replyToTicket = (ticket) => {
    selectedTicket.value = ticket
    showTicketModal.value = true
    // Focus sur le textarea de réponse après un petit délai
    setTimeout(() => {
        const textarea = document.querySelector('textarea')
        if (textarea) textarea.focus()
    }, 100)
}

const resolveTicket = (ticket) => {
    ticket.status = 'resolved'
    // Ici on ferait l'appel API pour mettre à jour le statut
}

const assignTicket = (ticket) => {
    ticket.assignedTo = 'Vous'
    ticket.status = 'in_progress'
    // Ici on ferait l'appel API pour assigner le ticket
}

const sendResponse = () => {
    if (!newResponse.value.trim()) return

    const response = {
        id: `R-${Date.now()}`,
        message: newResponse.value,
        fromAdmin: true,
        adminName: 'Vous',
        createdAt: new Date().toISOString()
    }

    selectedTicket.value.responses.push(response)
    selectedTicket.value.responseCount++
    selectedTicket.value.lastResponseAt = new Date().toISOString()

    if (markAsResolved.value) {
        selectedTicket.value.status = 'resolved'
    }

    newResponse.value = ''
    markAsResolved.value = false

    // Ici on ferait l'appel API pour envoyer la réponse
}

const createTicket = () => {
    if (!isNewTicketValid.value) return

    submitting.value = true

    setTimeout(() => {
        const ticket = {
            id: `TK-2024-${String(tickets.value.length + 1).padStart(3, '0')}`,
            title: newTicket.value.title,
            description: newTicket.value.description,
            type: newTicket.value.type,
            priority: newTicket.value.priority,
            status: 'open',
            customer: {
                name: newTicket.value.customerName,
                email: newTicket.value.customerEmail,
                phone: null
            },
            createdAt: new Date().toISOString(),
            lastResponseAt: null,
            responseCount: 0,
            assignedTo: null,
            responses: []
        }

        tickets.value.unshift(ticket)

        // Afficher le message de succès
        successMessage.value = `Ticket ${ticket.id} créé avec succès !`
        setTimeout(() => {
            successMessage.value = ''
        }, 5000)

        // Reset du formulaire
        resetForm()
        submitting.value = false
    }, 1500)
}

// Lifecycle
onMounted(() => {
    loading.value = true
    // Simulation du chargement des données
    setTimeout(() => {
        tickets.value = [...staticTickets]
        loading.value = false
    }, 1000)
})
</script>