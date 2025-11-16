<!-- pages/inventario/crear.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-emerald-100 rounded-xl">
          <Icon name="mdi:plus-circle" class="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Registrar Nuevo Elemento</h1>
          <p class="text-gray-600">Completa los datos del elemento a registrar</p>
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
    <form @submit.prevent="registrarElemento" class="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      
      <!-- Información Básica -->
      <div>
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="mdi:information-outline" class="text-emerald-600" />
          Información Básica
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre del Elemento *</label>
            <input v-model="formulario.nombre" type="text" required maxlength="255"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ej: Computador Dell" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Número Serial *</label>
            <input v-model="formulario.numero_serial" type="text" required minlength="3" maxlength="255"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ej: SN123456789" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Modelo *</label>
            <input v-model="formulario.modelo" type="text" required maxlength="255"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ej: Latitude 5420" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Marca *</label>
            <input v-model="formulario.marca" type="text" required maxlength="255"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ej: Dell" />
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
            <select v-model="formulario.id_tipo_elemento" required :disabled="cargandoDatos"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option value="">{{ cargandoDatos ? 'Cargando...' : 'Seleccionar...' }}</option>
              <option v-for="tipo in listaTipos" :key="tipo.id_tipo_elemento" :value="tipo.id_tipo_elemento">
                {{ tipo.nombre_tipo }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Estado Inicial *</label>
            <select v-model="formulario.id_estado_elemento" required :disabled="cargandoDatos"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option value="">{{ cargandoDatos ? 'Cargando...' : 'Seleccionar...' }}</option>
              <option v-for="estado in listaEstados" :key="estado.id_estado_elemento" :value="estado.id_estado_elemento">
                {{ estado.nombre_estado }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Ambiente Inicial *</label>
            <select v-model="formulario.id_ambiente" required :disabled="cargandoDatos"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option value="">{{ cargandoDatos ? 'Cargando...' : 'Seleccionar...' }}</option>
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
          {{ guardando ? 'Guardando...' : 'Registrar Elemento' }}
        </button>

        <button type="button" @click="limpiarFormulario" :disabled="guardando"
          class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50">
          Limpiar
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

definePageMeta({
  layout: 'perfil-layout'
})

const config = useRuntimeConfig()
const baseURL = config.public.apiBase || 'http://localhost:3001'

// Estados
const cargandoDatos = ref(true)
const guardando = ref(false)
const mensaje = ref({ texto: '', tipo: '' })

// Listas
const listaTipos = ref([])
const listaEstados = ref([])
const listaAmbientes = ref([])

// Formulario
const formulario = ref({
  nombre: '',
  descripcion: '',
  numero_serial: '',
  modelo: '',
  marca: '',
  ubicacion_actual: '',
  fecha_registro: new Date().toISOString().split('T')[0],
  id_tipo_elemento: '',
  id_estado_elemento: '',
  id_ambiente: ''
})

// Cargar datos de los selects
const cargarDatos = async () => {
  cargandoDatos.value = true
  try {
    console.log('🔄 Cargando datos...')
    
    const [tipos, estados, ambientes] = await Promise.all([
      $fetch(`${baseURL}/tipo-elemento`, { credentials: 'include' }),
      $fetch(`${baseURL}/estado-elemento`, { credentials: 'include' }),
      $fetch(`${baseURL}/ambiente`, { credentials: 'include' })
    ])

    listaTipos.value = tipos
    listaEstados.value = estados
    listaAmbientes.value = ambientes

    console.log('✅ Tipos:', tipos)
    console.log('✅ Estados:', estados)
    console.log('✅ Ambientes:', ambientes)
  } catch (error) {
    console.error('❌ Error cargando datos:', error)
    mensaje.value = { texto: 'Error al cargar los datos del formulario', tipo: 'error' }
  } finally {
    cargandoDatos.value = false
  }
}

// Registrar elemento
const registrarElemento = async () => {
  guardando.value = true
  mensaje.value = { texto: '', tipo: '' }

  try {
    console.log('📤 Enviando datos:', formulario.value)

    const datos = {
      nombre: formulario.value.nombre.trim(),
      numero_serial: formulario.value.numero_serial.trim(),
      modelo: formulario.value.modelo.trim(),
      marca: formulario.value.marca.trim(),
      id_tipo_elemento: Number(formulario.value.id_tipo_elemento),
      id_estado_elemento: Number(formulario.value.id_estado_elemento),
      id_ambiente: Number(formulario.value.id_ambiente)
    }

    if (formulario.value.descripcion?.trim()) {
      datos.descripcion = formulario.value.descripcion.trim()
    }
    if (formulario.value.ubicacion_actual?.trim()) {
      datos.ubicacion_actual = formulario.value.ubicacion_actual.trim()
    }
    if (formulario.value.fecha_registro) {
      datos.fecha_registro = formulario.value.fecha_registro
    }

    const respuesta = await $fetch(`${baseURL}/inventario`, {
      method: 'POST',
      body: datos,
      credentials: 'include'
    })

    console.log('✅ Elemento creado:', respuesta)
    mensaje.value = { texto: '¡Elemento registrado exitosamente!', tipo: 'success' }

    setTimeout(() => {
      limpiarFormulario()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2000)

  } catch (error) {
    console.error('❌ Error al registrar:', error)
    const errorMsg = error.data?.message || error.message || 'Error al registrar el elemento'
    mensaje.value = { texto: errorMsg, tipo: 'error' }
  } finally {
    guardando.value = false
  }
}

// Limpiar formulario
const limpiarFormulario = () => {
  formulario.value = {
    nombre: '',
    descripcion: '',
    numero_serial: '',
    modelo: '',
    marca: '',
    ubicacion_actual: '',
    fecha_registro: new Date().toISOString().split('T')[0],
    id_tipo_elemento: '',
    id_estado_elemento: '',
    id_ambiente: ''
  }
  mensaje.value = { texto: '', tipo: '' }
}

onMounted(() => {
  console.log('🚀 Componente montado')
  cargarDatos()
})
</script>