<!-- components/ModalDetalle.vue -->
<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="$emit('cerrar')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Detalle del Elemento</h2>
        <button @click="$emit('cerrar')" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Icon name="mdi:close" class="w-6 h-6" />
        </button>
      </div>

      <div class="p-6 space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500 mb-1">Nombre</p>
            <p class="font-semibold text-gray-900">{{ elemento.nombre }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Serial</p>
            <p class="font-semibold text-gray-900">{{ elemento.numero_serial }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Marca</p>
            <p class="font-semibold text-gray-900">{{ elemento.marca }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Modelo</p>
            <p class="font-semibold text-gray-900">{{ elemento.modelo }}</p>
          </div>
          <div class="col-span-2">
            <p class="text-sm text-gray-500 mb-1">Descripción</p>
            <p class="text-gray-900">{{ elemento.descripcion || 'Sin descripción' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  elemento: Object
})

defineEmits(['cerrar'])
</script>