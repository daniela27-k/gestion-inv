<!-- pages/admin/tipos-elemento/crear.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-blue-100 rounded-xl">
          <Icon name="mdi:plus-circle" class="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Crear Tipo de Elemento</h1>
          <p class="text-gray-600">Define una nueva categoría para el inventario</p>
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

    <!-- Formulario -->
    <form @submit.prevent="crearTipo" class="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Nombre del Tipo *
        </label>
        <input 
          v-model="formulario.nombre_tipo" 
          type="text" 
          required 
          maxlength="100"
          placeholder="Ej: Computador, Proyector, Silla"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p class="mt-1 text-xs text-gray-500">Nombre único para identificar el tipo de elemento</p>
      </div>

      <!-- Descripción -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Descripción (Opcional)
        </label>
        <textarea 
          v-model="formulario.descripcion" 
          rows="3"
          maxlength="500"
          placeholder="Describe las características de este tipo de elemento..."
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        ></textarea>
        <p class="mt-1 text-xs text-gray-500">Información adicional sobre este tipo</p>
      </div>

      <!-- Estado -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Estado Inicial *
        </label>
        <select 
          v-model="formulario.estado"
          required
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <p class="mt-1 text-xs text-gray-500">Los tipos activos estarán disponibles al crear elementos</p>
      </div>

      <!-- Botones -->
      <div class="flex gap-4 pt-6 border-t-2 border-gray-100">
        <button 
          type="submit" 
          :disabled="guardando"
          class="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <Icon :name="guardando ? 'mdi:loading' : 'mdi:content-save'" class="w-5 h-5" :class="{'animate-spin': guardando}" />
          {{ guardando ? 'Guardando...' : 'Crear Tipo' }}
        </button>

        <button 
          type="button" 
          @click="limpiarFormulario" 
          :disabled="guardando"
          class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50"
        >
          Limpiar
        </button>

        <NuxtLink 
          to="/admin/tipos-elemento"
          class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 flex items-center gap-2"
        >
          <Icon name="mdi:arrow-left" class="w-5 h-5" />
          Volver
        </NuxtLink>
      </div>
    </form>

    <!-- Información de ayuda -->
    <div class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
      <div class="flex items-start gap-3">
        <Icon name="mdi:information" class="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h3 class="font-bold text-blue-900 mb-2">Ejemplos de tipos de elemento</h3>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• <strong>Equipos:</strong> Computador, Portátil, Tablet</li>
            <li>• <strong>Audiovisuales:</strong> Proyector, Televisor, Parlante</li>
            <li>• <strong>Mobiliario:</strong> Silla, Mesa, Escritorio, Estantería</li>
            <li>• <strong>Herramientas:</strong> Taladro, Martillo, Destornillador</li>
            <li>• <strong>Material didáctico:</strong> Pizarra, Marcadores, Libros</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'perfil-layout'
})

const router = useRouter()
const config = useRuntimeConfig()
const baseURL = config.public.apiBase || 'http://localhost:3001'

const guardando = ref(false)
const mensaje = ref({ texto: '', tipo: '' })

const formulario = ref({
  nombre_tipo: '',
  descripcion: '',
  estado: 'activo'
})

const crearTipo = async () => {
  guardando.value = true
  mensaje.value = { texto: '', tipo: '' }

  try {
    const datos = {
      nombre_tipo: formulario.value.nombre_tipo.trim(),
      estado: formulario.value.estado
    }

    if (formulario.value.descripcion?.trim()) {
      datos.descripcion = formulario.value.descripcion.trim()
    }

    await $fetch(`${baseURL}/tipo-elemento`, {
      method: 'POST',
      body: datos,
      credentials: 'include'
    })

    mensaje.value = { texto: '¡Tipo de elemento creado exitosamente!', tipo: 'success' }

    setTimeout(() => {
      router.push('/admin/tipos-elemento')
    }, 1500)

  } catch (error) {
    console.error('Error al crear tipo:', error)
    const errorMsg = error.data?.message || error.message || 'Error al crear el tipo de elemento'
    mensaje.value = { texto: errorMsg, tipo: 'error' }
  } finally {
    guardando.value = false
  }
}

const limpiarFormulario = () => {
  formulario.value = {
    nombre_tipo: '',
    descripcion: '',
    estado: 'activo'
  }
  mensaje.value = { texto: '', tipo: '' }
}
</script>