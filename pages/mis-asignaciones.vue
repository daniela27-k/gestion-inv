<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-cyan-100 rounded-xl">
          <Icon name="mdi:clipboard-list" class="w-8 h-8 text-cyan-600" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Mis Asignaciones</h1>
          <p class="text-gray-500 text-sm">Elementos que tienes asignados actualmente</p>
        </div>
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

    <!-- Resumen visual por estado -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div v-for="stat in estadisticas" :key="stat.label"
        @click="filtroEstado = stat.filtro"
        class="bg-white rounded-2xl shadow p-5 flex flex-col gap-1 border-l-4 cursor-pointer hover:shadow-md transition-all"
        :class="[stat.border, filtroEstado === stat.filtro ? 'ring-2 ring-offset-1 ' + stat.ring : '']">
        <span class="text-2xl font-bold" :class="stat.color">{{ stat.value }}</span>
        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">{{ stat.label }}</span>
      </div>
    </div>

    <!-- Filtro / búsqueda -->
    <div class="bg-white rounded-2xl shadow-lg p-5">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="input-buscar-mis-asig"
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre del elemento..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
          />
        </div>
        <select id="filtro-mis-asig-estado" v-model="filtroEstado"
          class="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
          <option value="">Todos</option>
          <option value="activa">Activas</option>
          <option value="devuelta">Devueltas</option>
          <option value="perdida">Perdidas</option>
          <option value="dañada">Dañadas</option>
        </select>
        <button id="btn-refrescar-mis-asig" @click="cargar" :disabled="loading"
          class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold">
          <Icon name="mdi:refresh" class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Actualizar
        </button>
      </div>
    </div>

    <!-- Alerta de vencidos -->
    <div v-if="vencidas.length > 0"
      class="bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex items-center gap-3">
      <Icon name="mdi:alert" class="w-6 h-6 text-red-600 flex-shrink-0" />
      <div>
        <p class="text-red-800 font-bold text-sm">
          ⚠️ Tienes {{ vencidas.length }} asignación(es) con devolución vencida
        </p>
        <p class="text-red-700 text-xs">Por favor contacta al administrador para regularizar la situación.</p>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="bg-white rounded-2xl shadow-lg p-16 flex flex-col items-center gap-3 text-gray-400">
      <Icon name="mdi:loading" class="w-10 h-10 animate-spin" />
      <p class="font-medium">Cargando tus asignaciones...</p>
    </div>

    <!-- Sin asignaciones -->
    <div v-else-if="asignacionesFiltradas.length === 0 && !loading"
      class="bg-white rounded-2xl shadow-lg p-16 flex flex-col items-center gap-3 text-gray-400">
      <Icon name="mdi:clipboard-check" class="w-14 h-14 text-gray-200" />
      <p class="font-semibold">No tienes asignaciones activas</p>
      <p class="text-sm">Cuando te asignen un equipo, aparecerá aquí.</p>
    </div>

    <!-- Tarjetas de asignaciones -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="a in asignacionesFiltradas"
        :key="a.id"
        class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 border border-gray-100"
        :class="{ 'border-l-4 !border-l-red-400': estaVencida(a) }"
      >
        <!-- Card header con estado -->
        <div class="px-5 pt-5 pb-3 flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
              :class="estadoIconBg(a.estado_asignacion)">
              <Icon :name="estadoIcon(a.estado_asignacion)" class="w-6 h-6 text-white" />
            </div>
            <div>
              <p class="text-xs text-gray-400 font-semibold uppercase tracking-wide">A-{{ a.id }}</p>
              <h3 class="font-bold text-gray-900 text-sm leading-tight">{{ a.nombreElemento }}</h3>
            </div>
          </div>
          <span class="text-xs font-bold px-2.5 py-1 rounded-full" :class="estadoBadgeClass(a.estado_asignacion)">
            {{ formatEstado(a.estado_asignacion) }}
          </span>
        </div>

        <!-- Divider -->
        <div class="mx-5 border-t border-gray-100"></div>

        <!-- Detalles de fechas -->
        <div class="px-5 py-4 space-y-2 text-sm">
          <div class="flex items-center justify-between">
            <span class="text-gray-500 flex items-center gap-1.5">
              <Icon name="mdi:calendar-check" class="w-4 h-4 text-emerald-500" />
              Asignado
            </span>
            <span class="font-semibold text-gray-800">{{ formatFecha(a.fecha_asignacion) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-500 flex items-center gap-1.5">
              <Icon name="mdi:calendar-alert" class="w-4 h-4"
                :class="estaVencida(a) ? 'text-red-500' : 'text-amber-500'" />
              Dev. estimada
            </span>
            <span class="font-semibold" :class="estaVencida(a) ? 'text-red-600' : 'text-gray-800'">
              {{ formatFecha(a.fecha_devolucion_estimada) }}
              <span v-if="estaVencida(a)" class="text-xs text-red-500"> (Vencida)</span>
            </span>
          </div>
          <div v-if="a.fecha_devolucion_real" class="flex items-center justify-between">
            <span class="text-gray-500 flex items-center gap-1.5">
              <Icon name="mdi:calendar-check-outline" class="w-4 h-4 text-blue-500" />
              Dev. real
            </span>
            <span class="font-semibold text-blue-700">{{ formatFecha(a.fecha_devolucion_real) }}</span>
          </div>
        </div>

        <!-- Notas -->
        <div v-if="a.notas" class="px-5 pb-4">
          <p class="text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-600 italic">
            "{{ a.notas }}"
          </p>
        </div>

        <!-- Acción de devolución (solo si activa) -->
        <div v-if="a.estado_asignacion === 'activa'" class="px-5 pb-5">
          <button
            :id="`btn-devolver-mia-${a.id}`"
            @click="abrirModalDevolucion(a)"
            class="w-full flex items-center justify-center gap-2 bg-cyan-50 hover:bg-cyan-100 border-2 border-cyan-200 text-cyan-700 font-semibold text-sm py-2.5 rounded-xl transition-all active:scale-95"
          >
            <Icon name="mdi:check-circle-outline" class="w-4 h-4" />
            Confirmar Devolución
          </button>
        </div>
      </div>
    </div>

    <!-- ════ MODAL: Registrar Devolución ════ -->
    <Transition name="modal">
      <div v-if="modalDevolucion.visible" id="modal-dev-mia"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="modalDevolucion.visible = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <div class="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="mdi:check-all" class="w-8 h-8 text-cyan-600" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">Registrar Devolución</h3>
          <p class="text-gray-500 text-sm mb-5">
            <span class="font-semibold text-gray-700">{{ modalDevolucion.asignacion?.nombreElemento }}</span>
          </p>
          <div class="text-left mb-5">
            <label class="block text-xs font-bold text-gray-700 mb-1">Fecha de devolución</label>
            <input
              id="input-fecha-dev-mia"
              v-model="modalDevolucion.fechaReal"
              type="date"
              :max="hoy"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <p class="text-xs text-gray-400 mb-4">Al confirmar se notificará al administrador.</p>
          <div class="flex gap-3">
            <button @click="modalDevolucion.visible = false"
              class="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm">Cancelar</button>
            <button id="btn-confirmar-dev-mia" @click="confirmarDevolucion" :disabled="guardando"
              class="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm transition-all active:scale-95">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useAsignacion, type AsignacionData, type EstadoAsignacion } from '~/composables/useAsignacion'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'perfil-layout' })

const { user } = useAuth()
const { asignaciones, loading, fetchAsignacionesByUsuario, devolverAsignacion } = useAsignacion()

const hoy: string = new Date().toISOString().split('T')[0] ?? ''

// ── UI State ─────────────────────────────────────────
const busqueda = ref('')
const filtroEstado = ref('')
const mensaje = reactive({ texto: '', tipo: 'success' })
const guardando = ref(false)

const modalDevolucion = reactive({
  visible: false,
  asignacion: null as AsignacionData | null,
  fechaReal: hoy,
})

// ── Carga ────────────────────────────────────────────
const cargar = async () => {
  if (!user.value?.id) return
  try {
    await fetchAsignacionesByUsuario(user.value.id)
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al cargar tus asignaciones', 'error')
  }
}

onMounted(async () => {
  await cargar()
})

// ── Data derivada ─────────────────────────────────────
const vencidas = computed(() =>
  asignaciones.value.filter(a => estaVencida(a))
)

const estadisticas = computed(() => [
  { label: 'Total', value: asignaciones.value.length, color: 'text-gray-700', border: 'border-gray-400', ring: 'ring-gray-300', filtro: '' },
  { label: 'Activas', value: asignaciones.value.filter(a => a.estado_asignacion === 'activa').length, color: 'text-emerald-600', border: 'border-emerald-400', ring: 'ring-emerald-300', filtro: 'activa' },
  { label: 'Devueltas', value: asignaciones.value.filter(a => a.estado_asignacion === 'devuelta').length, color: 'text-blue-600', border: 'border-blue-400', ring: 'ring-blue-300', filtro: 'devuelta' },
  { label: 'Vencidas', value: vencidas.value.length, color: 'text-red-600', border: 'border-red-400', ring: 'ring-red-300', filtro: 'activa' },
])

const asignacionesFiltradas = computed(() => {
  return asignaciones.value.filter(a => {
    const term = busqueda.value.toLowerCase().trim()
    const matchTexto = !term || a.nombreElemento?.toLowerCase().includes(term)
    const matchEstado = !filtroEstado.value || a.estado_asignacion === filtroEstado.value
    return matchTexto && matchEstado
  })
})

// ── Helpers ───────────────────────────────────────────
const estaVencida = (a: AsignacionData) =>
  a.estado_asignacion === 'activa' && new Date(a.fecha_devolucion_estimada) < new Date()

const formatFecha = (f?: string | null) => {
  if (!f) return '—'
  return new Date(f).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatEstado = (e: EstadoAsignacion) => ({
  activa: 'Activa', devuelta: 'Devuelta', perdida: 'Perdida', dañada: 'Dañada'
}[e] || e)

const estadoBadgeClass = (e: EstadoAsignacion) => ({
  activa: 'bg-emerald-100 text-emerald-700',
  devuelta: 'bg-blue-100 text-blue-700',
  perdida: 'bg-purple-100 text-purple-700',
  dañada: 'bg-red-100 text-red-700',
}[e] || 'bg-gray-100 text-gray-700')

const estadoIconBg = (e: EstadoAsignacion) => ({
  activa: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  devuelta: 'bg-gradient-to-br from-blue-500 to-blue-600',
  perdida: 'bg-gradient-to-br from-purple-500 to-purple-600',
  dañada: 'bg-gradient-to-br from-red-500 to-red-600',
}[e] || 'bg-gradient-to-br from-gray-400 to-gray-500')

const estadoIcon = (e: EstadoAsignacion) => ({
  activa: 'mdi:laptop', devuelta: 'mdi:check-circle', perdida: 'mdi:help', dañada: 'mdi:alert'
}[e] || 'mdi:laptop')

const mostrarMensaje = (texto: string, tipo: 'success' | 'error') => {
  mensaje.texto = texto
  mensaje.tipo = tipo
  setTimeout(() => { mensaje.texto = '' }, 4000)
}

// ── Devolución ────────────────────────────────────────
const abrirModalDevolucion = (a: AsignacionData) => {
  modalDevolucion.asignacion = a
  modalDevolucion.fechaReal = hoy
  modalDevolucion.visible = true
}

const confirmarDevolucion = async () => {
  if (!modalDevolucion.asignacion) return
  guardando.value = true
  try {
    await devolverAsignacion(modalDevolucion.asignacion.id, modalDevolucion.fechaReal || undefined)
    mostrarMensaje('Devolución registrada correctamente', 'success')
    modalDevolucion.visible = false
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al registrar devolución', 'error')
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
