<!-- pages/inventario/consultar.vue -->
<template>
  <div class="space-y-6">
    <!-- Header con búsqueda -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Icon name="mdi:package-variant" class="text-emerald-600" />
            Consultar Inventario
          </h1>
          <p class="text-gray-600 mt-1">Gestiona y consulta todos los elementos del sistema</p>
        </div>
        
        <!-- Búsqueda global -->
        <div class="relative w-full md:w-96">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            v-model="searchTerm"
            @input="debouncedSearch"
            type="text"
            placeholder="Buscar por nombre, serial, modelo..."
            class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          <button
            v-if="searchTerm"
            @click="clearSearch"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Icon name="mdi:close-circle" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Estadísticas -->
    <EstadisticasCards :stats="estadisticas" :loading="loading" />

    <!-- Filtros -->
    <FiltrosInventario 
      @filtrar="aplicarFiltros"
      @limpiar="limpiarFiltros"
    />

    <!-- Tabla de resultados -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <!-- Header de tabla con contador -->
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-gray-700">
            {{ inventarios.length }} elemento(s) encontrado(s)
          </span>
          <span v-if="filtrosActivos" class="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            Filtros aplicados
          </span>
        </div>
        
        <button
          @click="refreshData"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          :disabled="loading"
        >
          <Icon name="mdi:refresh" class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Actualizar
        </button>
      </div>

      <!-- Tabla -->
      <TablaInventario 
        :items="inventarios"
        :loading="loading"
        :permisos="permisos"
        @ver="verDetalle"
        @editar="editarElemento"
        @cambiar-estado="cambiarEstado"
        @cambiar-ubicacion="cambiarUbicacion"
      />
    </div>

    <!-- Modal de detalle -->
    <ModalDetalle
      v-if="elementoSeleccionado"
      :elemento="elementoSeleccionado"
      @cerrar="elementoSeleccionado = null"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInventario } from '~/composables/useInventario'
import { useAuth } from '~/composables/useAuth'
import { permisosPorRol } from '~/utils/rolConfig'

definePageMeta({
  layout: 'perfil-layout'
})

const { user } = useAuth()
const { 
  inventarios, 
  estadisticas,
  loading, 
  fetchInventarios, 
  fetchEstadisticas,
  searchInventarios,
  fetchByTipo,
  fetchByEstado,
  fetchByAmbiente
} = useInventario()

const searchTerm = ref('')
const elementoSeleccionado = ref(null)
const filtrosActivos = ref(false)
let searchTimeout = null

const permisos = computed(() => permisosPorRol[user.value?.rol_usuario || 'USUARIO'])

// Búsqueda con debounce
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    if (searchTerm.value.trim()) {
      await searchInventarios(searchTerm.value)
    } else {
      await fetchInventarios()
    }
  }, 500)
}

const clearSearch = () => {
  searchTerm.value = ''
  fetchInventarios()
}

const aplicarFiltros = async (filtros) => {
  filtrosActivos.value = true
  try {
    if (filtros.tipo) {
      await fetchByTipo(filtros.tipo)
    } else if (filtros.estado) {
      await fetchByEstado(filtros.estado)
    } else if (filtros.ambiente) {
      await fetchByAmbiente(filtros.ambiente)
    } else {
      await fetchInventarios()
    }
  } catch (error) {
    console.error('Error aplicando filtros:', error)
  }
}

const limpiarFiltros = () => {
  filtrosActivos.value = false
  fetchInventarios()
}

const verDetalle = (elemento) => {
  elementoSeleccionado.value = elemento
}

const editarElemento = (elemento) => {
  navigateTo(`/inventario/${elemento.id_inventario}`)
}

const cambiarEstado = async (id, nuevoEstado) => {
  // Implementar cambio de estado
  console.log('Cambiar estado:', id, nuevoEstado)
}

const cambiarUbicacion = async (id, nuevaUbicacion) => {
  // Implementar cambio de ubicación
  console.log('Cambiar ubicación:', id, nuevaUbicacion)
}

const refreshData = async () => {
  await Promise.all([
    fetchInventarios(),
    fetchEstadisticas()
  ])
}

onMounted(() => {
  refreshData()
})
</script>