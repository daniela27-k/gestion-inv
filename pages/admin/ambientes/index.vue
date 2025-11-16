<!-- pages/admin/ambientes/index.vue -->
<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-green-100 rounded-xl">
            <Icon name="mdi:door" class="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Ambientes</h1>
            <p class="text-gray-600">Gestiona los salones y espacios de la institución</p>
          </div>
        </div>
        <NuxtLink 
          to="/admin/ambientes/crear"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 shadow-lg transition-all"
        >
          <Icon name="mdi:plus-circle" class="w-5 h-5" />
          Crear Ambiente
        </NuxtLink>
      </div>
    </div>

    <!-- Mensajes -->
    <div v-if="mensaje.texto" :class="[
      'border-2 rounded-xl p-4 flex items-center gap-3',
      mensaje.tipo === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
    ]">
      <Icon :name="mensaje.tipo === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" 
            :class="['w-6 h-6', mensaje.tipo === 'success' ? 'text-green-600' : 'text-red-600']" />
      <p :class="['flex-1 font-semibold', mensaje.tipo === 'success' ? 'text-green-800' : 'text-red-800']">
        {{ mensaje.texto }}
      </p>
      <button @click="mensaje.texto = ''" :class="mensaje.tipo === 'success' ? 'text-green-600' : 'text-red-600'">
        <Icon name="mdi:close" class="w-5 h-5" />
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="bg-white rounded-2xl shadow-lg p-12 text-center">
      <Icon name="mdi:loading" class="w-12 h-12 text-green-600 animate-spin mx-auto" />
      <p class="mt-4 text-gray-600">Cargando ambientes...</p>
    </div>

    <!-- Grid de Cards -->
    <div v-else-if="ambientes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="ambiente in ambientes" 
        :key="ambiente.id_ambiente"
        class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      >
        <!-- Header de la card -->
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white mb-1">{{ ambiente.nombre_ambiente }}</h3>
              <p class="text-green-100 text-sm">{{ ambiente.ubicacion || 'Sin ubicación' }}</p>
            </div>
            <div class="bg-white/20 p-2 rounded-lg">
              <Icon name="mdi:door-open" class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <!-- Contenido -->
        <div class="p-6 space-y-4">
          <!-- Capacidad -->
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-100 rounded-lg">
              <Icon name="mdi:account-group" class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">Capacidad</p>
              <p class="font-semibold text-gray-900">{{ ambiente.capacidad || 'No especificada' }}</p>
            </div>
          </div>

          <!-- Elementos -->
          <div class="flex items-center gap-3">
            <div class="p-2 bg-purple-100 rounded-lg">
              <Icon name="mdi:package-variant" class="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p class="text-xs text-gray-500">Elementos asignados</p>
              <p class="font-semibold text-gray-900">{{ ambiente.elementos?.length || 0 }}</p>
            </div>
          </div>

          <!-- Descripción -->
          <div v-if="ambiente.descripcion" class="pt-3 border-t border-gray-100">
            <p class="text-sm text-gray-600 line-clamp-2">{{ ambiente.descripcion }}</p>
          </div>

          <!-- Acciones -->
          <div class="flex gap-2 pt-3">
            <button
              @click="verDetalle(ambiente)"
              class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Icon name="mdi:eye" class="w-4 h-4" />
              Ver
            </button>
            <button
              @click="confirmarEliminar(ambiente)"
              class="px-4 py-2 bg-red-50 text-red-700 font-semibold rounded-lg hover:bg-red-100 transition-colors"
              :disabled="ambiente.elementos?.length > 0"
            >
              <Icon name="mdi:delete" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
      <Icon name="mdi:door" class="w-16 h-16 text-gray-400 mx-auto" />
      <p class="mt-4 text-gray-600 font-medium">No hay ambientes registrados</p>
      <p class="text-sm text-gray-500 mt-2">Crea el primer ambiente para comenzar</p>
    </div>

    <!-- Modal de detalle -->
    <div v-if="modalDetalle.show" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Detalle del Ambiente</h2>
          <button @click="modalDetalle.show = false" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon name="mdi:close" class="w-6 h-6" />
          </button>
        </div>

        <div class="p-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500 mb-1">Nombre</p>
              <p class="font-semibold text-gray-900">{{ modalDetalle.ambiente?.nombre_ambiente }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">Ubicación</p>
              <p class="font-semibold text-gray-900">{{ modalDetalle.ambiente?.ubicacion || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">Capacidad</p>
              <p class="font-semibold text-gray-900">{{ modalDetalle.ambiente?.capacidad || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">Elementos</p>
              <p class="font-semibold text-gray-900">{{ modalDetalle.ambiente?.elementos?.length || 0 }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-sm text-gray-500 mb-1">Descripción</p>
              <p class="text-gray-900">{{ modalDetalle.ambiente?.descripcion || 'Sin descripción' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación eliminar -->
    <div v-if="modalEliminar.show" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Icon name="mdi:alert-circle" class="h-6 w-6 text-red-600" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">¿Eliminar ambiente?</h3>
          <p class="text-sm text-gray-600 mb-6">
            Se eliminará "{{ modalEliminar.ambiente?.nombre_ambiente }}". Esta acción no se puede deshacer.
          </p>
          <div class="flex gap-3">
            <button
              @click="modalEliminar.show = false"
              class="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              @click="eliminarAmbiente"
              class="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAmbiente } from '~/composables/useAmbiente'

definePageMeta({
  layout: 'perfil-layout'
})

const { ambientes, loading, fetchAmbientes, deleteAmbiente } = useAmbiente()

const mensaje = ref({ texto: '', tipo: '' })
const modalDetalle = ref({ show: false, ambiente: null })
const modalEliminar = ref({ show: false, ambiente: null })

const verDetalle = (ambiente) => {
  modalDetalle.value = { show: true, ambiente }
}

const confirmarEliminar = (ambiente) => {
  if (ambiente.elementos?.length > 0) {
    mensaje.value = { 
      texto: `No se puede eliminar "${ambiente.nombre_ambiente}" porque tiene ${ambiente.elementos.length} elemento(s) asignado(s)`, 
      tipo: 'error' 
    }
    return
  }
  modalEliminar.value = { show: true, ambiente }
}

const eliminarAmbiente = async () => {
  try {
    await deleteAmbiente(modalEliminar.value.ambiente.id_ambiente)
    mensaje.value = { texto: 'Ambiente eliminado exitosamente', tipo: 'success' }
    modalEliminar.value = { show: false, ambiente: null }
  } catch (error) {
    mensaje.value = { texto: 'Error al eliminar ambiente', tipo: 'error' }
    modalEliminar.value = { show: false, ambiente: null }
  }
}

onMounted(() => {
  fetchAmbientes()
})
</script>