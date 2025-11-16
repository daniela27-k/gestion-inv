<!-- pages/admin/ambientes/crear.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-green-100 rounded-xl">
          <Icon name="mdi:plus-circle" class="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Crear Ambiente</h1>
          <p class="text-gray-600">Registra un nuevo salón o espacio</p>
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
    <form @submit.prevent="crearAmbiente" class="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      
      <!-- Información Básica -->
      <div>
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="mdi:information-outline" class="text-green-600" />
          Información Básica
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Ambiente *
            </label>
            <input 
              v-model="formulario.nombre_ambiente" 
              type="text" 
              required 
              maxlength="100"
              placeholder="Ej: Salón 101, Laboratorio A"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Ubicación (Opcional)
            </label>
            <input 
              v-model="formulario.ubicacion" 
              type="text" 
              maxlength="200"
              placeholder="Ej: Edificio A, Piso 2"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Capacidad -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Capacidad (Opcional)
        </label>
        <input 
          v-model.number="formulario.capacidad" 
          type="number" 
          min="1"
          max="999"
          placeholder="Ej: 30"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <p class="mt-1 text-xs text-gray-500">Número de personas que puede albergar</p>
      </div>

      <!-- Descripción -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Descripción (Opcional)
        </label>
        <textarea 
          v-model="formulario.descripcion" 
          rows="4"
          maxlength="500"
          placeholder="Describe las características del ambiente..."
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        ></textarea>
        <p class="mt-1 text-xs text-gray-500">Información adicional sobre el ambiente</p>
      </div>

      <!-- Botones -->
      <div class="flex gap-4 pt-6 border-t-2 border-gray-100">
        <button 
          type="submit" 
          :disabled="guardando"
          class="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <Icon :name="guardando ? 'mdi:loading' : 'mdi:content-save'" class="w-5 h-5" :class="{'animate-spin': guardando}" />
          {{ guardando ? 'Guardando...' : 'Crear Ambiente' }}
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
          to="/admin/ambientes"
          class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 flex items-center gap-2"
        >
          <Icon name="mdi:arrow-left" class="w-5 h-5" />
          Volver
        </NuxtLink>
      </div>
    </form>

    <!-- Información de ayuda -->
    <div class="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
      <div class="flex items-start gap-3">
        <Icon name="mdi:information" class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
        <div>
          <h3 class="font-bold text-green-900 mb-2">Ejemplos de ambientes</h3>
          <ul class="text-sm text-green-800 space-y-1">
            <li>• <strong>Aulas:</strong> Salón 101, Salón 202, Aula Magna</li>
            <li>• <strong>Laboratorios:</strong> Lab. Química, Lab. Física, Lab. Cómputo A</li>
            <li>• <strong>Talleres:</strong> Taller de Mecánica, Taller de Electrónica</li>
            <li>• <strong>Espacios comunes:</strong> Biblioteca, Cafetería, Auditorio</li>
            <li>• <strong>Oficinas:</strong> Coordinación, Secretaría, Sala de profesores</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAmbiente } from '~/composables/useAmbiente'

definePageMeta({
  layout: 'perfil-layout'
})

const router = useRouter()
const { createAmbiente } = useAmbiente()

const guardando = ref(false)
const mensaje = ref({ texto: '', tipo: '' })

const formulario = ref({
  nombre_ambiente: '',
  ubicacion: '',
  capacidad: null,
  descripcion: ''
})

const crearAmbiente = async () => {
  guardando.value = true
  mensaje.value = { texto: '', tipo: '' }

  try {
    const datos = {
      nombre_ambiente: formulario.value.nombre_ambiente.trim()
    }

    if (formulario.value.ubicacion?.trim()) {
      datos.ubicacion = formulario.value.ubicacion.trim()
    }
    if (formulario.value.capacidad) {
      datos.capacidad = formulario.value.capacidad
    }
    if (formulario.value.descripcion?.trim()) {
      datos.descripcion = formulario.value.descripcion.trim()
    }

    await createAmbiente(datos)

    mensaje.value = { texto: '¡Ambiente creado exitosamente!', tipo: 'success' }

    setTimeout(() => {
      router.push('/admin/ambientes')
    }, 1500)

  } catch (error) {
    console.error('Error al crear ambiente:', error)
    const errorMsg = error.data?.message || error.message || 'Error al crear el ambiente'
    mensaje.value = { texto: errorMsg, tipo: 'error' }
  } finally {
    guardando.value = false
  }
}

const limpiarFormulario = () => {
  formulario.value = {
    nombre_ambiente: '',
    ubicacion: '',
    capacidad: null,
    descripcion: ''
  }
  mensaje.value = { texto: '', tipo: '' }
}
</script>