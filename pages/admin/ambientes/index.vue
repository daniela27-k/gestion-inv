<!-- pages/admin/ambientes/index.vue -->
<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-green-100 rounded-xl">
            <Icon name="mdi:door" class="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Gestión de Ambientes</h1>
            <p class="text-gray-500 text-sm">Administra salones y espacios de la institución</p>
          </div>
        </div>
        <NuxtLink
          to="/admin/ambientes/crear"
          id="btn-crear-ambiente"
          class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Icon name="mdi:plus-circle" class="w-5 h-5" />
          Nuevo Ambiente
        </NuxtLink>
      </div>
    </div>

    <!-- Feedback -->
    <Transition name="slide-fade">
      <div
        v-if="mensaje.texto"
        :class="['flex items-center gap-3 px-5 py-4 rounded-xl border-2 font-medium',
          mensaje.tipo === 'success' ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800']"
      >
        <Icon :name="mensaje.tipo === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" class="w-5 h-5 flex-shrink-0" />
        <span class="flex-1">{{ mensaje.texto }}</span>
        <button @click="mensaje.texto = ''"><Icon name="mdi:close" class="w-4 h-4 opacity-60 hover:opacity-100" /></button>
      </div>
    </Transition>

    <!-- Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div v-for="stat in estadisticas" :key="stat.label"
        class="bg-white rounded-2xl shadow p-5 flex flex-col gap-1 border-l-4" :class="stat.border">
        <span class="text-2xl font-bold" :class="stat.color">{{ stat.value }}</span>
        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">{{ stat.label }}</span>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-2xl shadow-lg p-5">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="input-buscar-ambiente"
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre o ubicación..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>
        <select id="filtro-estado-ambiente" v-model="filtroEstado"
          class="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
        <button id="btn-refrescar-amb" @click="cargar" :disabled="loading"
          class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold">
          <Icon name="mdi:refresh" class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Actualizar
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="bg-white rounded-2xl shadow-lg p-16 flex flex-col items-center gap-3 text-gray-400">
      <Icon name="mdi:loading" class="w-12 h-12 animate-spin" />
      <p class="font-medium">Cargando ambientes...</p>
    </div>

    <!-- Empty -->
    <div v-else-if="ambientesFiltrados.length === 0 && !loading"
      class="bg-white rounded-2xl shadow-lg p-16 flex flex-col items-center gap-3 text-gray-400">
      <Icon name="mdi:door-closed" class="w-14 h-14" />
      <p class="font-semibold">No hay ambientes que coincidan</p>
      <NuxtLink to="/admin/ambientes/crear" class="text-green-600 hover:underline text-sm font-semibold">+ Crear primer ambiente</NuxtLink>
    </div>

    <!-- Grid de cards -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="amb in ambientesFiltrados"
        :key="amb.id_ambiente"
        class="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-200 border border-gray-100 group"
      >
        <!-- Card header con gradiente según estado -->
        <div class="p-5 text-white" :class="estadoGradient(amb.estado)">
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-white/70 uppercase tracking-wide mb-0.5">AMB-{{ amb.id_ambiente }}</p>
              <h3 class="font-bold text-white text-lg leading-tight truncate">{{ amb.nombre_ambiente }}</h3>
              <p class="text-white/80 text-sm mt-1">{{ amb.ubicacion || 'Sin ubicación definida' }}</p>
            </div>
            <div class="bg-white/20 p-2 rounded-xl ml-2 flex-shrink-0">
              <Icon name="mdi:door-open" class="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <!-- Body de la card -->
        <div class="p-5 space-y-3">
          <!-- Info rápida -->
          <div class="flex items-center gap-4 text-sm">
            <div class="flex items-center gap-1.5 text-gray-600">
              <Icon name="mdi:account-group" class="w-4 h-4 text-blue-500" />
              <span class="font-semibold">{{ amb.capacidad || '—' }}</span>
              <span class="text-gray-400 text-xs">personas</span>
            </div>
            <div class="flex items-center gap-1.5 text-gray-600">
              <Icon name="mdi:package-variant" class="w-4 h-4 text-purple-500" />
              <span class="font-semibold">{{ amb.elementos?.length || 0 }}</span>
              <span class="text-gray-400 text-xs">elementos</span>
            </div>
          </div>

          <!-- Estado inline editable -->
          <div class="flex items-center justify-between pt-2 border-t border-gray-100">
            <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Estado</span>
            <select
              :value="amb.estado"
              @change="onCambiarEstado(amb, ($event.target as HTMLSelectElement).value)"
              class="text-xs font-bold px-2 py-1 rounded-lg border-2 border-transparent focus:outline-none cursor-pointer"
              :class="estadoBadgeClass(amb.estado)"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>

          <!-- Acciones -->
          <div class="flex gap-2 pt-1">
            <button
              :id="`btn-ver-amb-${amb.id_ambiente}`"
              @click="abrirDetalle(amb)"
              class="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm rounded-xl transition-all"
            >
              <Icon name="mdi:eye" class="w-4 h-4" />
              Ver
            </button>
            <button
              :id="`btn-editar-amb-${amb.id_ambiente}`"
              @click="abrirModalEditar(amb)"
              class="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-sm rounded-xl transition-all"
            >
              <Icon name="mdi:pencil" class="w-4 h-4" />
              Editar
            </button>
            <button
              :id="`btn-eliminar-amb-${amb.id_ambiente}`"
              @click="confirmarEliminar(amb)"
              :disabled="amb.elementos?.length > 0"
              class="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              :title="amb.elementos?.length > 0 ? 'No se puede eliminar: tiene elementos asignados' : 'Eliminar ambiente'"
            >
              <Icon name="mdi:delete" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ MODAL: Editar Ambiente ════ -->
    <Transition name="modal">
      <div v-if="modalEditar.visible" id="modal-editar-ambiente"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="modalEditar.visible = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div class="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5 flex justify-between items-center">
            <div class="flex items-center gap-3 text-white">
              <Icon name="mdi:door" class="w-6 h-6" />
              <h2 class="text-lg font-bold">Editar Ambiente</h2>
            </div>
            <button @click="modalEditar.visible = false" class="text-white/80 hover:text-white">
              <Icon name="mdi:close" class="w-6 h-6" />
            </button>
          </div>

          <form @submit.prevent="guardarEdicion" class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Nombre del ambiente *</label>
              <input id="input-edit-nombre" v-model="formEdit.nombre_ambiente" type="text" required maxlength="255"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Ubicación</label>
              <input id="input-edit-ubicacion" v-model="formEdit.ubicacion" type="text" maxlength="255"
                placeholder="Ej: Edificio A, Piso 2"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Capacidad</label>
                <input id="input-edit-capacidad" v-model.number="formEdit.capacidad" type="number" min="1" max="999"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Estado</label>
                <select id="select-edit-estado" v-model="formEdit.estado"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="mantenimiento">Mantenimiento</option>
                </select>
              </div>
            </div>

            <p v-if="errorModal" class="text-red-600 text-sm flex items-center gap-1">
              <Icon name="mdi:alert-circle" class="w-4 h-4" />{{ errorModal }}
            </p>

            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="modalEditar.visible = false"
                class="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm">Cancelar</button>
              <button id="btn-guardar-edicion-amb" type="submit" :disabled="guardando"
                class="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2">
                <Icon :name="guardando ? 'mdi:loading' : 'mdi:content-save'" class="w-4 h-4" :class="{ 'animate-spin': guardando }" />
                {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ════ MODAL: Detalle Ambiente ════ -->
    <Transition name="modal">
      <div v-if="modalDetalle.visible" id="modal-detalle-ambiente"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="modalDetalle.visible = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5 flex justify-between items-center rounded-t-2xl">
            <div class="flex items-center gap-3 text-white">
              <Icon name="mdi:information" class="w-6 h-6" />
              <h2 class="text-lg font-bold">{{ modalDetalle.ambiente?.nombre_ambiente }}</h2>
            </div>
            <button @click="modalDetalle.visible = false" class="text-white/80 hover:text-white">
              <Icon name="mdi:close" class="w-6 h-6" />
            </button>
          </div>
          <div v-if="modalDetalle.ambiente" class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Ubicación</p>
                <p class="font-semibold text-gray-900">{{ modalDetalle.ambiente.ubicacion || '—' }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Capacidad</p>
                <p class="font-semibold text-gray-900">{{ modalDetalle.ambiente.capacidad || '—' }} personas</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Estado</p>
                <span class="inline-flex px-2 py-1 rounded-full text-xs font-bold" :class="estadoBadgeClass(modalDetalle.ambiente.estado)">
                  {{ modalDetalle.ambiente.estado }}
                </span>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Elementos</p>
                <p class="font-semibold text-gray-900">{{ modalDetalle.ambiente.elementos?.length || 0 }} asignados</p>
              </div>
            </div>
            <!-- Lista de elementos -->
            <div v-if="modalDetalle.ambiente.elementos?.length > 0">
              <p class="text-xs font-bold text-gray-500 uppercase mb-2">Inventario en este ambiente</p>
              <div class="space-y-1 max-h-48 overflow-y-auto">
                <div v-for="el in modalDetalle.ambiente.elementos" :key="el.id_inventario"
                  class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                  <Icon name="mdi:package-variant" class="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <span class="font-medium text-gray-800">{{ el.nombre }}</span>
                  <span class="ml-auto text-xs text-gray-400">{{ el.numero_serial }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ════ MODAL: Confirmar eliminar ════ -->
    <Transition name="modal">
      <div v-if="modalEliminar.visible" id="modal-eliminar-ambiente"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="modalEliminar.visible = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="mdi:delete-alert" class="w-8 h-8 text-red-600" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">¿Eliminar ambiente?</h3>
          <p class="text-gray-500 text-sm mb-6">
            Se eliminará <strong>{{ modalEliminar.ambiente?.nombre_ambiente }}</strong>. Esta acción no se puede deshacer.
          </p>
          <div class="flex gap-3">
            <button @click="modalEliminar.visible = false"
              class="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm">Cancelar</button>
            <button id="btn-confirmar-eliminar-amb" @click="ejecutarEliminar" :disabled="guardando"
              class="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all active:scale-95">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useAmbiente } from '~/composables/useAmbiente'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'perfil-layout' })

const { user } = useAuth()
const { ambientes, loading, fetchAmbientes, updateAmbiente, deleteAmbiente } = useAmbiente()

// ── UI State ─────────────────────────────────────────
const busqueda = ref('')
const filtroEstado = ref('')
const mensaje = reactive({ texto: '', tipo: 'success' })
const guardando = ref(false)
const errorModal = ref('')

const modalEditar = reactive({ visible: false, ambiente: null as any })
const modalDetalle = reactive({ visible: false, ambiente: null as any })
const modalEliminar = reactive({ visible: false, ambiente: null as any })

const formEdit = reactive({
  nombre_ambiente: '',
  ubicacion: '',
  capacidad: null as number | null,
  estado: 'activo',
})

// ── Protección ────────────────────────────────────────
onMounted(async () => {
  const rol = user.value?.rol_usuario
  if (rol !== 'ADMIN') {
    await navigateTo('/perfil')
    return
  }
  await cargar()
})

// ── Stats ─────────────────────────────────────────────
const estadisticas = computed(() => [
  { label: 'Total', value: ambientes.value.length, color: 'text-gray-700', border: 'border-gray-400' },
  { label: 'Activos', value: ambientes.value.filter((a: any) => a.estado === 'activo').length, color: 'text-green-600', border: 'border-green-400' },
  { label: 'Inactivos', value: ambientes.value.filter((a: any) => a.estado === 'inactivo').length, color: 'text-gray-500', border: 'border-gray-300' },
  { label: 'Mantenimiento', value: ambientes.value.filter((a: any) => a.estado === 'mantenimiento').length, color: 'text-amber-600', border: 'border-amber-400' },
])

// ── Filtrado ─────────────────────────────────────────
const ambientesFiltrados = computed(() => {
  return (ambientes.value as any[]).filter(a => {
    const term = busqueda.value.toLowerCase().trim()
    const matchTexto = !term ||
      a.nombre_ambiente?.toLowerCase().includes(term) ||
      a.ubicacion?.toLowerCase().includes(term)
    const matchEstado = !filtroEstado.value || a.estado === filtroEstado.value
    return matchTexto && matchEstado
  })
})

// ── Helpers UI ─────────────────────────────────────────
const estadoGradient = (e: string) => ({
  activo: 'bg-gradient-to-r from-green-500 to-emerald-600',
  inactivo: 'bg-gradient-to-r from-gray-400 to-gray-500',
  mantenimiento: 'bg-gradient-to-r from-amber-500 to-amber-600',
}[e] || 'bg-gradient-to-r from-gray-400 to-gray-500')

const estadoBadgeClass = (e: string) => ({
  activo: 'bg-green-100 text-green-700 border-green-300',
  inactivo: 'bg-gray-100 text-gray-600 border-gray-300',
  mantenimiento: 'bg-amber-100 text-amber-700 border-amber-300',
}[e] || 'bg-gray-100 text-gray-600')

const mostrarMensaje = (texto: string, tipo: 'success' | 'error') => {
  mensaje.texto = texto
  mensaje.tipo = tipo
  setTimeout(() => { mensaje.texto = '' }, 4000)
}

// ── Acciones ──────────────────────────────────────────
const cargar = async () => {
  try { await fetchAmbientes() }
  catch (e: any) { mostrarMensaje(e?.data?.message || 'Error al cargar ambientes', 'error') }
}

const onCambiarEstado = async (amb: any, nuevoEstado: string) => {
  try {
    await updateAmbiente(amb.id_ambiente, { estado: nuevoEstado })
    mostrarMensaje(`Estado de "${amb.nombre_ambiente}" actualizado a ${nuevoEstado}`, 'success')
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al cambiar estado', 'error')
    await cargar()
  }
}

const abrirDetalle = (amb: any) => {
  modalDetalle.ambiente = amb
  modalDetalle.visible = true
}

const abrirModalEditar = (amb: any) => {
  modalEditar.ambiente = amb
  errorModal.value = ''
  formEdit.nombre_ambiente = amb.nombre_ambiente
  formEdit.ubicacion = amb.ubicacion || ''
  formEdit.capacidad = amb.capacidad || null
  formEdit.estado = amb.estado || 'activo'
  modalEditar.visible = true
}

const guardarEdicion = async () => {
  guardando.value = true
  errorModal.value = ''
  try {
    await updateAmbiente(modalEditar.ambiente.id_ambiente, {
      nombre_ambiente: formEdit.nombre_ambiente,
      ubicacion: formEdit.ubicacion || undefined,
      capacidad: formEdit.capacidad || undefined,
      estado: formEdit.estado,
    })
    mostrarMensaje('Ambiente actualizado correctamente', 'success')
    modalEditar.visible = false
  } catch (e: any) {
    errorModal.value = e?.data?.message || e.message || 'Error al actualizar el ambiente'
  } finally {
    guardando.value = false
  }
}

const confirmarEliminar = (amb: any) => {
  if (amb.elementos?.length > 0) {
    mostrarMensaje(`No se puede eliminar "${amb.nombre_ambiente}": tiene ${amb.elementos.length} elemento(s) asignado(s).`, 'error')
    return
  }
  modalEliminar.ambiente = amb
  modalEliminar.visible = true
}

const ejecutarEliminar = async () => {
  guardando.value = true
  try {
    await deleteAmbiente(modalEliminar.ambiente.id_ambiente)
    mostrarMensaje(`Ambiente "${modalEliminar.ambiente.nombre_ambiente}" eliminado`, 'success')
    modalEliminar.visible = false
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al eliminar el ambiente', 'error')
  } finally {
    guardando.value = false
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
.slide-fade-enter-active { transition: all 0.3s ease; }
.slide-fade-leave-active { transition: all 0.2s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>