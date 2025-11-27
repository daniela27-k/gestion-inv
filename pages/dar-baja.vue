<!-- pages/dar-baja.vue -->
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-red-100 rounded-xl">
          <Icon name="mdi:archive-arrow-down" class="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Dar de Baja Elementos</h1>
          <p class="text-gray-600">Retira elementos del inventario activo</p>
        </div>
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

    <!-- Búsqueda -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative flex-1">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            v-model="busqueda"
            @input="buscarElementos"
            type="text"
            placeholder="Buscar por nombre, serial, modelo..."
            class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <button
          @click="cargarElementos"
          class="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold flex items-center gap-2"
          :disabled="loading"
        >
          <Icon name="mdi:refresh" class="w-5 h-5" :class="{ 'animate-spin': loading }" />
          Actualizar
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <span class="text-sm font-semibold text-gray-700">
          {{ elementosFiltrados.length }} elemento(s) activo(s)
        </span>
      </div>

      <div v-if="loading" class="p-12 text-center">
        <Icon name="mdi:loading" class="w-12 h-12 text-gray-400 animate-spin mx-auto" />
        <p class="mt-4 text-gray-600">Cargando elementos...</p>
      </div>

      <div v-else-if="elementosFiltrados.length === 0" class="p-12 text-center">
        <Icon name="mdi:package-variant-closed" class="w-16 h-16 text-gray-300 mx-auto" />
        <p class="mt-4 text-gray-600 font-semibold">No hay elementos activos</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Nombre</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Serial</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Modelo</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ambiente</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Estado</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="elemento in elementosFiltrados" :key="elemento.id_inventario" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="font-semibold text-gray-900">{{ elemento.nombre }}</div>
                <div class="text-sm text-gray-500">{{ elemento.marca }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ elemento.numero_serial }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ elemento.modelo }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ getNombreAmbiente(elemento.id_ambiente) }}</td>
              <td class="px-6 py-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  {{ getNombreEstado(elemento.id_estado_elemento) }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <button
                  @click="abrirModalBaja(elemento)"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center gap-2 mx-auto transition-colors"
                >
                  <Icon name="mdi:delete" class="w-4 h-4" />
                  Dar de Baja
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Confirmar Baja -->
    <div v-if="modalBaja" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6">
        <div class="text-center">
          <div class="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Icon name="mdi:alert-circle" class="w-10 h-10 text-red-600" />
          </div>
          <h3 class="mt-4 text-2xl font-bold text-gray-900">Confirmar Baja</h3>
          <p class="mt-2 text-gray-600">¿Estás seguro de dar de baja este elemento?</p>
        </div>

        <div class="bg-gray-50 rounded-xl p-4">
          <p class="text-sm font-semibold text-gray-700">{{ elementoSeleccionado?.nombre }}</p>
          <p class="text-xs text-gray-500 mt-1">Serial: {{ elementoSeleccionado?.numero_serial }}</p>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Motivo de Baja *</label>
          <textarea
            v-model="motivoBaja"
            rows="3"
            required
            placeholder="Describe el motivo..."
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          ></textarea>
        </div>

        <div class="flex gap-3">
          <button
            @click="confirmarBaja"
            :disabled="procesando || !motivoBaja.trim()"
            class="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icon :name="procesando ? 'mdi:loading' : 'mdi:check'" class="w-5 h-5" :class="{'animate-spin': procesando}" />
            {{ procesando ? 'Procesando...' : 'Confirmar' }}
          </button>
          <button
            @click="cerrarModal"
            :disabled="procesando"
            class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInventario } from '~/composables/useInventario'
import { useEstadoElemento } from '~/composables/useEstadoElemento'
import { useAuth } from '~/composables/useAuth'
import { permisosPorRol } from '~/utils/rolConfig'

definePageMeta({
  layout: 'perfil-layout'
})

const config = useRuntimeConfig()
const baseURL = config.public.apiBase || 'http://localhost:3001'

const { user } = useAuth()
const { inventarios, loading, fetchInventarios, updateInventario } = useInventario()
const { estados, fetchEstados } = useEstadoElemento()

const busqueda = ref('')
const mensaje = ref({ texto: '', tipo: '' })
const modalBaja = ref(false)
const elementoSeleccionado = ref(null)
const motivoBaja = ref('')
const procesando = ref(false)
const ambientes = ref([])

const permisos = computed(() => permisosPorRol[user.value?.rol_usuario || 'USUARIO'])

// Filtrar solo elementos activos (sin fecha_baja)
const elementosActivos = computed(() => {
  return inventarios.value.filter(el => !el.fecha_baja)
})

const elementosFiltrados = computed(() => {
  if (!busqueda.value.trim()) return elementosActivos.value
  
  const termino = busqueda.value.toLowerCase()
  return elementosActivos.value.filter(el => 
    el.nombre?.toLowerCase().includes(termino) ||
    el.numero_serial?.toLowerCase().includes(termino) ||
    el.modelo?.toLowerCase().includes(termino) ||
    el.marca?.toLowerCase().includes(termino)
  )
})

const buscarElementos = () => {
  // El computed ya maneja el filtrado
}

const getNombreEstado = (id) => {
  return estados.value.find(e => e.id_estado_elemento === id)?.nombre_estado || 'N/A'
}

const getNombreAmbiente = (id) => {
  return ambientes.value.find(a => a.id_ambiente === id)?.nombre_ambiente || 'N/A'
}

const cargarAmbientes = async () => {
  try {
    ambientes.value = await $fetch(`${baseURL}/ambiente`, { credentials: 'include' })
  } catch (error) {
    console.error('Error cargando ambientes:', error)
  }
}

const cargarElementos = async () => {
  try {
    await Promise.all([
      fetchInventarios(),
      fetchEstados(),
      cargarAmbientes()
    ])
  } catch (error) {
    mensaje.value = { texto: 'Error al cargar datos', tipo: 'error' }
  }
}

const abrirModalBaja = (elemento) => {
  elementoSeleccionado.value = elemento
  motivoBaja.value = ''
  modalBaja.value = true
}

const cerrarModal = () => {
  modalBaja.value = false
  elementoSeleccionado.value = null
  motivoBaja.value = ''
}

const confirmarBaja = async () => {
  if (!motivoBaja.value.trim()) {
    mensaje.value = { texto: 'Debes especificar el motivo de baja', tipo: 'error' }
    return
  }

  procesando.value = true
  try {
    console.log('Estados disponibles:', estados.value)
    
    // Buscar ID del estado "Dado de baja"
    const estadoBaja = estados.value.find(e => {
      const nombreLower = e.nombre_estado?.toLowerCase() || ''
      console.log('Buscando en:', nombreLower)
      return nombreLower.includes('baja') || nombreLower.includes('inactivo')
    })

    console.log('Estado encontrado:', estadoBaja)

    if (!estadoBaja) {
      throw new Error(`No se encontró el estado "Dado de baja". Estados disponibles: ${estados.value.map(e => e.nombre_estado).join(', ')}`)
    }

    const datosActualizacion = {
      fecha_baja: new Date().toISOString().split('T')[0],
      motivo_baja: motivoBaja.value.trim(),
      id_estado_elemento: estadoBaja.id_estado_elemento
    }

    await updateInventario(elementoSeleccionado.value.id_inventario, datosActualizacion)

    mensaje.value = { texto: 'Elemento dado de baja exitosamente', tipo: 'success' }
    cerrarModal()
    await cargarElementos()

    setTimeout(() => {
      mensaje.value = { texto: '', tipo: '' }
    }, 3000)

  } catch (error) {
    console.error('Error al dar de baja:', error)
    mensaje.value = { 
      texto: error.message || 'Error al dar de baja el elemento', 
      tipo: 'error' 
    }
  } finally {
    procesando.value = false
  }
}

onMounted(() => {
  if (!permisos.value.dar_baja_elemento) {
    navigateTo('/perfil')
    return
  }
  cargarElementos()
})
</script>