<!-- components/TablaInventario.vue -->
<template>
  <div class="overflow-x-auto">
    <table v-if="!loading && items.length > 0" class="w-full">
      <thead class="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nombre</th>
          <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Serial</th>
          <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tipo</th>
          <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
          <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ambiente</th>
          <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="item in items" :key="item.id_inventario" class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4">
            <div class="font-semibold text-gray-900">{{ item.nombre }}</div>
            <div class="text-sm text-gray-500">{{ item.marca }} - {{ item.modelo }}</div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">{{ item.numero_serial }}</td>
          <td class="px-6 py-4">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
              {{ item.tipo_elemento?.nombre_tipo || 'N/A' }}
            </span>
          </td>
          <td class="px-6 py-4">
            <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              {{ item.estado_elemento?.nombre_estado || 'N/A' }}
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700">
            {{ item.ambiente?.nombre_ambiente || 'Sin ambiente' }}
          </td>
          <td class="px-6 py-4">
            <div class="flex gap-2">
              <button 
                v-if="permisos?.ver_inventario"
                @click="$emit('ver', item)" 
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Ver detalle"
              >
                <Icon name="mdi:eye" class="w-5 h-5" />
              </button>
              <button 
                v-if="permisos?.editar_elemento"
                @click="$emit('editar', item)" 
                class="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                title="Editar"
              >
                <Icon name="mdi:pencil" class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Loading -->
    <div v-else-if="loading" class="p-12 text-center">
      <Icon name="mdi:loading" class="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
      <p class="mt-4 text-gray-600">Cargando inventario...</p>
    </div>

    <!-- Empty -->
    <div v-else class="p-12 text-center">
      <Icon name="mdi:package-variant-closed" class="w-16 h-16 text-gray-400 mx-auto" />
      <p class="mt-4 text-gray-600 font-medium">No se encontraron elementos</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: Array,
  loading: Boolean,
  permisos: Object
})

defineEmits(['ver', 'editar', 'cambiar-estado', 'cambiar-ubicacion'])
</script>