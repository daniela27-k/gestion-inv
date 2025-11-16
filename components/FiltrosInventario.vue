
<!-- components/FiltrosInventario.vue -->
<template>
  <div class="bg-white rounded-2xl shadow-lg p-6">
    <div class="flex items-center gap-3 mb-4">
      <Icon name="mdi:filter-variant" class="w-6 h-6 text-emerald-600" />
      <h2 class="text-xl font-bold text-gray-900">Filtros</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
        <select v-model="filtros.tipo" class="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
          <option value="">Todos</option>
          <option value="1">Computadores</option>
          <option value="2">Proyectores</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
        <select v-model="filtros.estado" class="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
          <option value="">Todos</option>
          <option value="1">Disponible</option>
          <option value="2">En Uso</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Ambiente</label>
        <select v-model="filtros.ambiente" class="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
          <option value="">Todos</option>
          <option value="1">Ambiente 101</option>
          <option value="2">Ambiente 102</option>
        </select>
      </div>
    </div>

    <div class="flex gap-3 mt-4">
      <button @click="aplicar" class="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
        Aplicar Filtros
      </button>
      <button @click="limpiar" class="px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
        Limpiar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filtrar', 'limpiar'])

const filtros = ref({
  tipo: '',
  estado: '',
  ambiente: ''
})

const aplicar = () => {
  emit('filtrar', filtros.value)
}

const limpiar = () => {
  filtros.value = {
    tipo: '',
    estado: '',
    ambiente: ''
  }
  emit('limpiar')
}
</script>