<!-- pages/admin/tipos-elemento/index.vue -->
<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-blue-100 rounded-xl">
            <Icon name="mdi:tag-multiple" class="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Tipos de Elemento</h1>
            <p class="text-gray-600">Gestiona las categorías de elementos del inventario</p>
          </div>
        </div>
        <NuxtLink 
          to="/admin/tipos-elemento/crear"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all"
        >
          <Icon name="mdi:plus-circle" class="w-5 h-5" />
          Crear Tipo
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
      <Icon name="mdi:loading" class="w-12 h-12 text-blue-600 animate-spin mx-auto" />
      <p class="mt-4 text-gray-600">Cargando tipos de elemento...</p>
    </div>

    <!-- Tabla -->
    <div v-else class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div v-if="tipos.length === 0" class="p-12 text-center">
        <Icon name="mdi:tag-off" class="w-16 h-16 text-gray-400 mx-auto" />
        <p class="mt-4 text-gray-600 font-medium">No hay tipos de elemento registrados</p>
        <p class="text-sm text-gray-500 mt-2">Crea el primer tipo para comenzar</p>
      </div>

      <table v-else class="w-full">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Nombre</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Descripción</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Estado</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Elementos</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="tipo in tipos" :key="tipo.id_tipo_elemento" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <p class="font-semibold text-gray-900">{{ tipo.nombre_tipo }}</p>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ tipo.descripcion || 'Sin descripción' }}
            </td>
            <td class="px-6 py-4">
              <span :class="[
                'px-3 py-1 text-xs font-semibold rounded-full',
                tipo.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              ]">
                {{ tipo.estado }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-700">
              {{ tipo.inventarios?.length || 0 }} elementos
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button 
                  @click="toggleEstado(tipo)"
                  :class="[
                    'p-2 rounded-lg transition-colors',
                    tipo.estado === 'activo' ? 'text-gray-600 hover:bg-gray-100' : 'text-green-600 hover:bg-green-50'
                  ]"
                  :title="tipo.estado === 'activo' ? 'Desactivar' : 'Activar'"
                >
                  <Icon :name="tipo.estado === 'activo' ? 'mdi:pause-circle' : 'mdi:play-circle'" class="w-5 h-5" />
                </button>
                <button 
                  @click="confirmarEliminar(tipo)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                  :disabled="tipo.inventarios?.length > 0"
                >
                  <Icon name="mdi:delete" class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="modalEliminar.show" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Icon name="mdi:alert-circle" class="h-6 w-6 text-red-600" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">¿Eliminar tipo de elemento?</h3>
          <p class="text-sm text-gray-600 mb-6">
            Se eliminará "{{ modalEliminar.tipo?.nombre_tipo }}". Esta acción no se puede deshacer.
          </p>
          <div class="flex gap-3">
            <button
              @click="modalEliminar.show = false"
              class="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              @click="eliminarTipo"
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
import { useTipoElemento } from '~/composables/useTipoElemento'

definePageMeta({
  layout: 'perfil-layout'
})

const { tipos, loading, fetchTipos } = useTipoElemento()
const config = useRuntimeConfig()
const baseURL = config.public.apiBase || 'http://localhost:3001'

const mensaje = ref({ texto: '', tipo: '' })
const modalEliminar = ref({ show: false, tipo: null })

const toggleEstado = async (tipo) => {
  try {
    const nuevoEstado = tipo.estado === 'activo' ? 'inactivo' : 'activo'
    const endpoint = nuevoEstado === 'activo' ? 'activar' : 'desactivar'
    
    await $fetch(`${baseURL}/tipo-elemento/${tipo.id_tipo_elemento}/${endpoint}`, {
      method: 'PATCH',
      credentials: 'include'
    })
    
    mensaje.value = { 
      texto: `Tipo ${nuevoEstado === 'activo' ? 'activado' : 'desactivado'} exitosamente`, 
      tipo: 'success' 
    }
    await fetchTipos()
  } catch (error) {
    mensaje.value = { texto: 'Error al cambiar estado', tipo: 'error' }
  }
}

const confirmarEliminar = (tipo) => {
  if (tipo.inventarios?.length > 0) {
    mensaje.value = { 
      texto: `No se puede eliminar "${tipo.nombre_tipo}" porque tiene ${tipo.inventarios.length} elemento(s) asociado(s)`, 
      tipo: 'error' 
    }
    return
  }
  modalEliminar.value = { show: true, tipo }
}

const eliminarTipo = async () => {
  try {
    await $fetch(`${baseURL}/tipo-elemento/${modalEliminar.value.tipo.id_tipo_elemento}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    
    mensaje.value = { texto: 'Tipo eliminado exitosamente', tipo: 'success' }
    modalEliminar.value = { show: false, tipo: null }
    await fetchTipos()
  } catch (error) {
    mensaje.value = { texto: 'Error al eliminar tipo', tipo: 'error' }
    modalEliminar.value = { show: false, tipo: null }
  }
}

onMounted(() => {
  fetchTipos()
})
</script>