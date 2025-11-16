<!-- components/EstadisticasCards.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div v-if="loading" v-for="i in 4" :key="i" class="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-24 mb-4"></div>
      <div class="h-8 bg-gray-200 rounded w-16"></div>
    </div>

    <template v-else-if="stats">
      <!-- Total Elementos -->
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium mb-1">Total Elementos</p>
            <p class="text-3xl font-bold">{{ stats.total_elementos || 0 }}</p>
          </div>
          <div class="bg-white/20 p-3 rounded-xl">
            <Icon name="mdi:package-variant" class="w-8 h-8" />
          </div>
        </div>
      </div>

      <!-- Disponibles -->
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium mb-1">Disponibles</p>
            <p class="text-3xl font-bold">{{ stats.disponibles || 0 }}</p>
          </div>
          <div class="bg-white/20 p-3 rounded-xl">
            <Icon name="mdi:check-circle" class="w-8 h-8" />
          </div>
        </div>
      </div>

      <!-- En Uso -->
      <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-yellow-100 text-sm font-medium mb-1">En Uso</p>
            <p class="text-3xl font-bold">{{ stats.en_uso || 0 }}</p>
          </div>
          <div class="bg-white/20 p-3 rounded-xl">
            <Icon name="mdi:account-check" class="w-8 h-8" />
          </div>
        </div>
      </div>

      <!-- En Mantenimiento -->
      <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-red-100 text-sm font-medium mb-1">Mantenimiento</p>
            <p class="text-3xl font-bold">{{ stats.en_mantenimiento || 0 }}</p>
          </div>
          <div class="bg-white/20 p-3 rounded-xl">
            <Icon name="mdi:wrench" class="w-8 h-8" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  stats: Object,
  loading: Boolean
})
</script>