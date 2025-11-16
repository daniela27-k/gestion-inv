<!-- pages/admin/estados-elemento/index.vue -->
<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-purple-100 rounded-xl">
            <Icon name="mdi:state-machine" class="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Estados de Elemento</h1>
            <p class="text-gray-600">Gestiona los estados del ciclo de vida del inventario</p>
          </div>
        </div>
        <NuxtLink 
          to="/admin/estados-elemento/crear"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-800 shadow-lg transition-all"
        >
          <Icon name="mdi:plus-circle" class="w-5 h-5" />
          Crear Estado
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
      <Icon name="mdi:loading" class="w-12 h-12 text-purple-600 animate-spin mx-auto" />
      <p class="mt-4 text-gray-600">Cargando estados de elemento...</p>
    </div>

    <!-- Tabla -->
    <div v-else class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div v-if="estados.length === 0" class="p-12 text-center">
        <Icon name="mdi:state-machine" class="w-16 h-16 text-gray-400 mx-auto" />
        <p class="mt-4 text-gray-600 font-medium">No hay estados registrados</p>
        <p class="text-sm text-gray-500 mt-2">Crea el primer estado para comenzar</p>
      </div>

      <table v-else class="w-full">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Color</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Estado</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Descripción</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Elementos</th>
            <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="estado in estados" :key="estado.id_estado_elemento" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div 
                  class="w-6 h-6 rounded-lg shadow-sm border-2 border-gray-200"
                  :style="{ backgroundColor: estado.color_codigo }"
                ></div>
                <span class="text-xs font-mono text-gray-500">{{ estado.color_codigo }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span 
                class="px-3 py-1 text-xs font-semibold rounded-full"
                :style="{ 
                  backgroundColor: estado.color_codigo + '20',
                  color: estado.color_codigo
                }"
              >
                {{ estado.nombre_estado }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ estado.descripcion || 'Sin descripción' }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-700">
              {{ estado.inventarios?.length || 0 }} elementos
            </td>
            <td class="px-6 py-4">
              <button 
                @click="confirmarEliminar(estado)"
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar"
                :disabled="estado.inventarios?.length > 0"
              >
                <Icon name="mdi:delete" class="w-5 h-5" />
              </button>
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
          <h3 class="text-lg font-bold text-gray-900 mb-2">¿Eliminar estado?</h3>
          <p class="text-sm text-gray-600 mb-6">
            Se eliminará "{{ modalEliminar.estado?.nombre_estado }}". Esta acción no se puede deshacer.
          </p>
          <div class="flex gap-3">
            <button
              @click="modalEliminar.show = false"
              class="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              @click="eliminarEstado"
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
import { useEstadoElemento } from '~/composables/useEstadoElemento'

definePageMeta({
  layout: 'perfil-layout'
})

const { estados, loading, fetchEstados } = useEstadoElemento()
const config = useRuntimeConfig()
const baseURL = config.public.apiBase || 'http://localhost:3001'

const mensaje = ref({ texto: '', tipo: '' })
const modalEliminar = ref({ show: false, estado: null })

const confirmarEliminar = (estado) => {
  if (estado.inventarios?.length > 0) {
    mensaje.value = { 
      texto: `No se puede eliminar "${estado.nombre_estado}" porque tiene ${estado.inventarios.length} elemento(s) asociado(s)`, 
      tipo: 'error' 
    }
    return
  }
  modalEliminar.value = { show: true, estado }
}

const eliminarEstado = async () => {
  try {
    await $fetch(`${baseURL}/estado-elemento/${modalEliminar.value.estado.id_estado_elemento}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    
    mensaje.value = { texto: 'Estado eliminado exitosamente', tipo: 'success' }
    modalEliminar.value = { show: false, estado: null }
    await fetchEstados()
  } catch (error) {
    mensaje.value = { texto: 'Error al eliminar estado', tipo: 'error' }
    modalEliminar.value = { show: false, estado: null }
  }
}

onMounted(() => {
  fetchEstados()
})
</script>