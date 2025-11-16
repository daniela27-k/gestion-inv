<!-- pages/admin/estados-elemento/crear.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-purple-100 rounded-xl">
          <Icon name="mdi:plus-circle" class="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Crear Estado de Elemento</h1>
          <p class="text-gray-600">Define un nuevo estado para el inventario</p>
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
    <form @submit.prevent="crearEstado" class="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Nombre del Estado *
        </label>
        <input 
          v-model="formulario.nombre_estado" 
          type="text" 
          required 
          maxlength="50"
          placeholder="Ej: Disponible, En uso, Dañado"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p class="mt-1 text-xs text-gray-500">Nombre único para identificar el estado</p>
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
          placeholder="Describe cuándo usar este estado..."
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        ></textarea>
        <p class="mt-1 text-xs text-gray-500">Información adicional sobre este estado</p>
      </div>

      <!-- Color -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Color Identificador *
        </label>
        <div class="flex gap-4 items-center">
          <input 
            v-model="formulario.color_codigo" 
            type="color" 
            required
            class="h-12 w-20 border-2 border-gray-200 rounded-xl cursor-pointer"
          />
          <input 
            v-model="formulario.color_codigo" 
            type="text" 
            required
            pattern="^#[0-9A-Fa-f]{6}$"
            placeholder="#000000"
            class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
          />
          <div 
            class="w-12 h-12 rounded-xl shadow-lg border-2 border-gray-200"
            :style="{ backgroundColor: formulario.color_codigo }"
          ></div>
        </div>
        <p class="mt-1 text-xs text-gray-500">Color que representará este estado en la interfaz</p>
      </div>

      <!-- Colores sugeridos -->
      <div class="border-2 border-gray-200 rounded-xl p-4">
        <p class="text-sm font-semibold text-gray-700 mb-3">Colores sugeridos:</p>
        <div class="grid grid-cols-5 gap-3">
          <button
            v-for="color in coloresSugeridos"
            :key="color.hex"
            type="button"
            @click="formulario.color_codigo = color.hex"
            class="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div 
              class="w-10 h-10 rounded-lg shadow-md group-hover:scale-110 transition-transform border-2 border-gray-200"
              :style="{ backgroundColor: color.hex }"
            ></div>
            <span class="text-xs text-gray-600 font-medium">{{ color.nombre }}</span>
          </button>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex gap-4 pt-6 border-t-2 border-gray-100">
        <button 
          type="submit" 
          :disabled="guardando"
          class="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <Icon :name="guardando ? 'mdi:loading' : 'mdi:content-save'" class="w-5 h-5" :class="{'animate-spin': guardando}" />
          {{ guardando ? 'Guardando...' : 'Crear Estado' }}
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
          to="/admin/estados-elemento"
          class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 flex items-center gap-2"
        >
          <Icon name="mdi:arrow-left" class="w-5 h-5" />
          Volver
        </NuxtLink>
      </div>
    </form>

    <!-- Información de ayuda -->
    <div class="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
      <div class="flex items-start gap-3">
        <Icon name="mdi:information" class="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
        <div>
          <h3 class="font-bold text-purple-900 mb-2">Ejemplos de estados comunes</h3>
          <ul class="text-sm text-purple-800 space-y-1">
            <li>• <strong>Disponible</strong> (Verde) - Elemento listo para usar</li>
            <li>• <strong>En uso</strong> (Azul) - Elemento asignado actualmente</li>
            <li>• <strong>Mantenimiento</strong> (Amarillo) - En revisión o reparación</li>
            <li>• <strong>Dañado</strong> (Rojo) - Requiere reparación mayor</li>
            <li>• <strong>Dado de baja</strong> (Gris) - Fuera de servicio</li>
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
  nombre_estado: '',
  descripcion: '',
  color_codigo: '#28A745'
})

const coloresSugeridos = [
  { nombre: 'Verde', hex: '#28A745' },
  { nombre: 'Azul', hex: '#17A2B8' },
  { nombre: 'Amarillo', hex: '#FFC107' },
  { nombre: 'Rojo', hex: '#DC3545' },
  { nombre: 'Gris', hex: '#6C757D' },
  { nombre: 'Naranja', hex: '#FD7E14' },
  { nombre: 'Púrpura', hex: '#6F42C1' },
  { nombre: 'Verde-Azul', hex: '#20C997' },
  { nombre: 'Rosa', hex: '#E83E8C' },
  { nombre: 'Negro', hex: '#343A40' }
]

const crearEstado = async () => {
  guardando.value = true
  mensaje.value = { texto: '', tipo: '' }

  try {
    const datos = {
      nombre_estado: formulario.value.nombre_estado.trim(),
      color_codigo: formulario.value.color_codigo.toUpperCase()
    }

    if (formulario.value.descripcion?.trim()) {
      datos.descripcion = formulario.value.descripcion.trim()
    }

    await $fetch(`${baseURL}/estado-elemento`, {
      method: 'POST',
      body: datos,
      credentials: 'include'
    })

    mensaje.value = { texto: '¡Estado creado exitosamente!', tipo: 'success' }

    setTimeout(() => {
      router.push('/admin/estados-elemento')
    }, 1500)

  } catch (error) {
    console.error('Error al crear estado:', error)
    const errorMsg = error.data?.message || error.message || 'Error al crear el estado'
    mensaje.value = { texto: errorMsg, tipo: 'error' }
  } finally {
    guardando.value = false
  }
}

const limpiarFormulario = () => {
  formulario.value = {
    nombre_estado: '',
    descripcion: '',
    color_codigo: '#28A745'
  }
  mensaje.value = { texto: '', tipo: '' }
}
</script>