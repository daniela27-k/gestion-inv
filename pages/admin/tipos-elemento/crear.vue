<!-- pages/admin/tipos-elemento/crear.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
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

    <form @submit.prevent="crearTipo" class="bg-white rounded-2xl shadow-lg p-8 space-y-6">

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre del Tipo *</label>
        <input v-model="formulario.nombre_tipo" type="text" required maxlength="100"
          placeholder="Ej: Computador, Proyector, Silla"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <p class="mt-1 text-xs text-gray-500">Nombre único para identificar el tipo de elemento</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Descripción (Opcional)</label>
        <textarea v-model="formulario.descripcion" rows="3" maxlength="500"
          placeholder="Describe las características de este tipo de elemento..."
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
        <p class="mt-1 text-xs text-gray-500">Información adicional sobre este tipo</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Marca (Opcional)</label>
        <input v-model="formulario.marca" type="text" maxlength="255" placeholder="Ej: HP, Samsung, Dell"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <p class="mt-1 text-xs text-gray-500">Marca del fabricante del elemento</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Modelo (Opcional)</label>
        <input v-model="formulario.modelo" type="text" maxlength="255" placeholder="Ej: LaserJet Pro, Galaxy S21"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <p class="mt-1 text-xs text-gray-500">Modelo específico del elemento</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Número Serial (Opcional)</label>
        <input v-model="formulario.numero_serial" type="text" maxlength="255" placeholder="Ej: SN123456789"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <p class="mt-1 text-xs text-gray-500">Si se ingresa, el serial quedará registrado en el inventario</p>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Estado Inicial *</label>
        <select v-model="formulario.estado" required
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <p class="mt-1 text-xs text-gray-500">Los tipos activos estarán disponibles al crear elementos</p>
      </div>

      <div class="flex gap-4 pt-6 border-t-2 border-gray-100">
        <button type="submit" :disabled="guardando"
          class="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
          <Icon :name="guardando ? 'mdi:loading' : 'mdi:content-save'" class="w-5 h-5" :class="{'animate-spin': guardando}" />
          {{ guardando ? 'Guardando...' : 'Crear Tipo' }}
        </button>

        <button type="button" @click="limpiarFormulario" :disabled="guardando"
          class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50">
          Limpiar
        </button>

        <NuxtLink to="/admin/tipos-elemento"
          class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 flex items-center gap-2">
          <Icon name="mdi:arrow-left" class="w-5 h-5" />
          Volver
        </NuxtLink>
      </div>
    </form>
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
const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'

const guardando = ref(false)
const mensaje = ref({ texto: '', tipo: '' })

const formulario = ref({
  nombre_tipo: '',
  descripcion: '',
  marca: '',
  modelo: '',
  numero_serial: '',
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

    if (formulario.value.descripcion?.trim()) datos.descripcion = formulario.value.descripcion.trim()
    if (formulario.value.marca?.trim()) datos.marca = formulario.value.marca.trim()
    if (formulario.value.modelo?.trim()) datos.modelo = formulario.value.modelo.trim()
    if (formulario.value.numero_serial?.trim()) datos.numero_serial = formulario.value.numero_serial.trim()

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
    marca: '',
    modelo: '',
    numero_serial: '',
    estado: 'activo'
  }
  mensaje.value = { texto: '', tipo: '' }
}
</script>