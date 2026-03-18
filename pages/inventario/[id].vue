<!-- pages/inventario/[id].vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-emerald-100 rounded-xl">
          <Icon name="mdi:pencil" class="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Editar Elemento</h1>
          <p class="text-gray-600">Modifica los datos del elemento</p>
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

    <!-- Cargando -->
    <div v-if="cargandoDatos" class="bg-white rounded-2xl shadow-lg p-12 flex justify-center">
      <Icon name="mdi:loading" class="w-10 h-10 text-emerald-600 animate-spin" />
    </div>

    <!-- Formulario -->
    <form v-else @submit.prevent="guardarCambios" class="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      
      <!-- Información Básica -->
      <div>
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="mdi:information-outline" class="text-emerald-600" />
          Información Básica
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Número Serial *</label>
            <input v-model="formulario.numero_serial" type="text" required maxlength="255"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Marca *</label>
            <input v-model="formulario.marca" type="text" required maxlength="255"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Modelo</label>
            <input v-model="formulario.modelo" type="text" maxlength="255"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      <!-- Descripción -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Descripción (Opcional)</label>
        <textarea v-model="formulario.descripcion" rows="3"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          placeholder="Describe el elemento..."></textarea>
      </div>

      <!-- Clasificación -->
      <div>
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="mdi:tag-multiple" class="text-emerald-600" />
          Clasificación
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tipo de Elemento *</label>
            <select v-model="formulario.id_tipo_elemento" required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option value="">Seleccionar...</option>
              <option v-for="tipo in listaTipos" :key="tipo.id_tipo_elemento" :value="tipo.id_tipo_elemento">
                {{ tipo.nombre_tipo }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Estado *</label>
            <select v-model="formulario.id_estado_elemento" required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option value="">Seleccionar...</option>
              <option v-for="estado in listaEstados" :key="estado.id_estado_elemento" :value="estado.id_estado_elemento">
                {{ estado.nombre_estado }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Ambiente *</label>
            <select v-model="formulario.id_ambiente" required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option value="">Seleccionar...</option>
              <option v-for="ambiente in listaAmbientes" :key="ambiente.id_ambiente" :value="ambiente.id_ambiente">
                {{ ambiente.nombre_ambiente }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Ubicación -->
      <div>
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="mdi:map-marker" class="text-emerald-600" />
          Ubicación
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Ubicación Específica (Opcional)</label>
            <input v-model="formulario.ubicacion_actual" type="text" maxlength="255"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ej: Escritorio 5" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Fecha de Registro</label>
            <input v-model="formulario.fecha_registro" type="date"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex gap-4 pt-6 border-t-2 border-gray-100">
        <button type="submit" :disabled="guardando"
          class="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
          <Icon :name="guardando ? 'mdi:loading' : 'mdi:content-save'" class="w-5 h-5" :class="{'animate-spin': guardando}" />
          {{ guardando ? 'Guardando...' : 'Guardar Cambios' }}
        </button>

        <NuxtLink to="/inventario/consultar"
          class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 flex items-center gap-2">
          <Icon name="mdi:arrow-left" class="w-5 h-5" />
          Volver
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'perfil-layout'
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'

const cargandoDatos = ref(true)
const guardando = ref(false)
const mensaje = ref({ texto: '', tipo: '' })

const listaTipos = ref([])
const listaEstados = ref([])
const listaAmbientes = ref([])

const formulario = ref({
  nombre: '',
  descripcion: '',
  numero_serial: '',
  modelo: '',
  marca: '',
  ubicacion_actual: '',
  fecha_registro: '',
  id_tipo_elemento: '',
  id_estado_elemento: '',
  id_ambiente: ''
})

const cargarDatos = async () => {
  cargandoDatos.value = true
  try {
    const [tipos, estados, ambientes, elemento] = await Promise.all([
      $fetch(`${baseURL}/tipo-elemento`, { credentials: 'include' }),
      $fetch(`${baseURL}/estado-elemento`, { credentials: 'include' }),
      $fetch(`${baseURL}/ambiente`, { credentials: 'include' }),
      $fetch(`${baseURL}/inventario/${route.params.id}`, { credentials: 'include' }),
    ])

    listaTipos.value = tipos
    listaEstados.value = estados
    listaAmbientes.value = ambientes

    formulario.value = {
      nombre: elemento.nombre || '',
      descripcion: elemento.descripcion || '',
      numero_serial: elemento.numero_serial || '',
      modelo: elemento.modelo || '',
      marca: elemento.marca || '',
      ubicacion_actual: elemento.ubicacion_actual || '',
      fecha_registro: elemento.fecha_registro ? elemento.fecha_registro.split('T')[0] : '',
      id_tipo_elemento: elemento.id_tipo_elemento || '',
      id_estado_elemento: elemento.id_estado_elemento || '',
      id_ambiente: elemento.id_ambiente || ''
    }
  } catch (error) {
    console.error('❌ Error cargando datos:', error)
    mensaje.value = { texto: 'Error al cargar los datos del elemento', tipo: 'error' }
  } finally {
    cargandoDatos.value = false
  }
}

const guardarCambios = async () => {
  guardando.value = true
  mensaje.value = { texto: '', tipo: '' }

  try {
    const datos = {
      nombre: formulario.value.nombre.trim(),
      numero_serial: formulario.value.numero_serial.trim(),
      modelo: formulario.value.modelo?.trim() || '',
      marca: formulario.value.marca.trim(),
      id_tipo_elemento: Number(formulario.value.id_tipo_elemento),
      id_estado_elemento: Number(formulario.value.id_estado_elemento),
      id_ambiente: Number(formulario.value.id_ambiente)
    }

    if (formulario.value.descripcion?.trim()) datos.descripcion = formulario.value.descripcion.trim()
    if (formulario.value.ubicacion_actual?.trim()) datos.ubicacion_actual = formulario.value.ubicacion_actual.trim()
    if (formulario.value.fecha_registro) datos.fecha_registro = formulario.value.fecha_registro

    await $fetch(`${baseURL}/inventario/${route.params.id}`, {
      method: 'PATCH',
      body: datos,
      credentials: 'include'
    })

    mensaje.value = { texto: '¡Elemento actualizado exitosamente!', tipo: 'success' }

    setTimeout(() => {
      router.push('/inventario/consultar')
    }, 1500)

  } catch (error) {
    console.error('❌ Error al actualizar:', error)
    const errorMsg = error.data?.message || error.message || 'Error al actualizar el elemento'
    mensaje.value = { texto: errorMsg, tipo: 'error' }
  } finally {
    guardando.value = false
  }
}

onMounted(() => {
  cargarDatos()
})
</script>