<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-teal-100 rounded-xl">
          <Icon name="mdi:home-account" class="w-8 h-8 text-teal-600" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Mis Ambientes</h1>
          <p class="text-gray-500 text-sm">Espacios y salones donde gestionas inventario</p>
        </div>
      </div>
    </div>

    <!-- Feedback -->
    <Transition name="slide-fade">
      <div
        v-if="error"
        class="flex items-center gap-3 px-5 py-4 rounded-xl border-2 font-medium bg-red-50 border-red-300 text-red-800"
      >
        <Icon name="mdi:alert-circle" class="w-5 h-5 flex-shrink-0" />
        <span class="flex-1">{{ error }}</span>
      </div>
    </Transition>

    <!-- Filtros -->
    <div class="bg-white rounded-2xl shadow-lg p-5">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="input-buscar-mi-ambiente"
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre o ubicación..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
        </div>
        <button id="btn-refrescar-mis-amb" @click="cargar" :disabled="loading"
          class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold">
          <Icon name="mdi:refresh" class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Actualizar
        </button>
      </div>
    </div>

    <!-- Resumen stats -->
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white rounded-2xl shadow p-5 border-l-4 border-teal-400">
        <span class="text-2xl font-bold text-teal-600">{{ ambientes.length }}</span>
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Total</p>
      </div>
      <div class="bg-white rounded-2xl shadow p-5 border-l-4 border-green-400">
        <span class="text-2xl font-bold text-green-600">{{ activos }}</span>
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Activos</p>
      </div>
      <div class="bg-white rounded-2xl shadow p-5 border-l-4 border-purple-400">
        <span class="text-2xl font-bold text-purple-600">{{ totalElementos }}</span>
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Elementos totales</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="bg-white rounded-2xl shadow-lg p-16 flex flex-col items-center gap-3 text-gray-400">
      <Icon name="mdi:loading" class="w-12 h-12 animate-spin" />
      <p class="font-medium">Cargando ambientes...</p>
    </div>

    <!-- Sin ambientes -->
    <div v-else-if="ambientesFiltrados.length === 0 && !loading"
      class="bg-white rounded-2xl shadow-lg p-16 flex flex-col items-center gap-3 text-gray-400">
      <Icon name="mdi:door-closed" class="w-14 h-14 text-gray-200" />
      <p class="font-semibold">No tienes ambientes asignados</p>
      <p class="text-sm">Contacta al administrador para que te asigne un ambiente.</p>
    </div>

    <!-- Grid de cards de ambientes -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div
        v-for="amb in ambientesFiltrados"
        :key="amb.id_ambiente"
        class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 border border-gray-100 cursor-pointer"
        @click="abrirDetalle(amb)"
      >
        <!-- Header card -->
        <div class="p-5" :class="estadoGradient(amb.estado)">
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <p class="text-xs text-white/70 font-semibold uppercase tracking-wide mb-0.5">AMB-{{ amb.id_ambiente }}</p>
              <h3 class="text-white font-bold text-lg leading-tight truncate">{{ amb.nombre_ambiente }}</h3>
              <p class="text-white/80 text-sm mt-1 flex items-center gap-1">
                <Icon name="mdi:map-marker" class="w-3.5 h-3.5" />
                {{ amb.ubicacion || 'Ubicación no definida' }}
              </p>
            </div>
            <span class="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full ml-2 capitalize flex-shrink-0">
              {{ amb.estado }}
            </span>
          </div>
        </div>

        <!-- Body card -->
        <div class="p-5">
          <!-- Métricas -->
          <div class="flex items-center gap-6 mb-4">
            <div class="flex items-center gap-2">
              <div class="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:account-group" class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p class="text-xs text-gray-500">Capacidad</p>
                <p class="font-bold text-gray-900">{{ amb.capacidad ?? '—' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:package-variant" class="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p class="text-xs text-gray-500">Elementos</p>
                <p class="font-bold text-gray-900">{{ amb.elementos?.length || 0 }}</p>
              </div>
            </div>
          </div>

          <!-- Mini lista de elementos (máx 3) -->
          <div v-if="amb.elementos?.length > 0" class="space-y-1.5">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Últimos elementos</p>
            <div
              v-for="el in amb.elementos.slice(0, 3)"
              :key="el.id_inventario"
              class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-xs"
            >
              <Icon name="mdi:laptop" class="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
              <span class="font-medium text-gray-700 truncate">{{ el.nombre }}</span>
              <span class="ml-auto text-gray-400 flex-shrink-0">{{ el.numero_serial }}</span>
            </div>
            <p v-if="amb.elementos.length > 3" class="text-xs text-teal-600 font-semibold text-center pt-1">
              + {{ amb.elementos.length - 3 }} más → click para ver todos
            </p>
          </div>
          <div v-else class="flex items-center gap-2 bg-gray-50 rounded-xl p-3 text-gray-400 text-sm">
            <Icon name="mdi:package-variant-closed" class="w-4 h-4" />
            <span>Sin elementos asignados aún</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ MODAL: Detalle del ambiente ════ -->
    <Transition name="modal">
      <div v-if="modalDetalle.visible" id="modal-mi-ambiente"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="modalDetalle.visible = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl overflow-hidden">
            <div class="px-6 py-5 flex justify-between items-center" :class="estadoGradient(modalDetalle.ambiente?.estado)">
              <div class="text-white">
                <p class="text-xs text-white/70 font-semibold uppercase tracking-wide">AMB-{{ modalDetalle.ambiente?.id_ambiente }}</p>
                <h2 class="text-xl font-bold">{{ modalDetalle.ambiente?.nombre_ambiente }}</h2>
              </div>
              <button @click="modalDetalle.visible = false" class="text-white/80 hover:text-white">
                <Icon name="mdi:close" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <div v-if="modalDetalle.ambiente" class="p-6 space-y-5">
            <!-- Info general -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Ubicación</p>
                <p class="font-semibold text-gray-900">{{ modalDetalle.ambiente.ubicacion || '—' }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Capacidad</p>
                <p class="font-semibold text-gray-900">{{ modalDetalle.ambiente.capacidad ?? '—' }} personas</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Estado</p>
                <span class="inline-flex px-2 py-1 rounded-full text-xs font-bold capitalize"
                  :class="estadoBadgeClass(modalDetalle.ambiente.estado)">
                  {{ modalDetalle.ambiente.estado }}
                </span>
              </div>
            </div>

            <!-- Inventario completo -->
            <div>
              <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icon name="mdi:package-variant" class="w-5 h-5 text-purple-500" />
                Inventario del Ambiente
                <span class="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {{ modalDetalle.ambiente.elementos?.length || 0 }}
                </span>
              </h3>
              <div v-if="modalDetalle.ambiente.elementos?.length > 0" class="space-y-2 max-h-64 overflow-y-auto pr-1">
                <div
                  v-for="el in modalDetalle.ambiente.elementos"
                  :key="el.id_inventario"
                  class="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 text-sm hover:bg-purple-50 transition-colors"
                >
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:laptop" class="w-4 h-4 text-purple-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900 truncate">{{ el.nombre }}</p>
                    <p class="text-xs text-gray-400">S/N: {{ el.numero_serial || '—' }}</p>
                  </div>
                  <span class="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full flex-shrink-0">
                    {{ el.estado_elemento?.nombre_estado || el.estado || '—' }}
                  </span>
                </div>
              </div>
              <div v-else class="flex flex-col items-center py-8 text-gray-400 bg-gray-50 rounded-xl">
                <Icon name="mdi:package-variant-closed" class="w-10 h-10 mb-2" />
                <p class="text-sm font-medium">Este ambiente no tiene elementos asignados</p>
              </div>
            </div>
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
const { ambientes, loading, error, fetchAmbientes } = useAmbiente()

const busqueda = ref('')
const modalDetalle = reactive({ visible: false, ambiente: null as any })

// ── Solo usuarios autenticados ────────────────────────
onMounted(async () => {
  if (!user.value) {
    await navigateTo('/login')
    return
  }
  await cargar()
})

// ── Totales ───────────────────────────────────────────
const activos = computed(() =>
  (ambientes.value as any[]).filter(a => a.estado === 'activo').length
)

const totalElementos = computed(() =>
  (ambientes.value as any[]).reduce((acc: number, a: any) => acc + (a.elementos?.length || 0), 0)
)

// ── Filtrado ─────────────────────────────────────────
const ambientesFiltrados = computed(() => {
  const term = busqueda.value.toLowerCase().trim()
  if (!term) return ambientes.value as any[]
  return (ambientes.value as any[]).filter(a =>
    a.nombre_ambiente?.toLowerCase().includes(term) ||
    a.ubicacion?.toLowerCase().includes(term)
  )
})

const cargar = async () => {
  try { await fetchAmbientes() }
  catch { /* error ya está en ref */ }
}

const abrirDetalle = (amb: any) => {
  modalDetalle.ambiente = amb
  modalDetalle.visible = true
}

// ── Helpers ───────────────────────────────────────────
const estadoGradient = (e: string) => ({
  activo: 'bg-gradient-to-r from-teal-500 to-teal-600',
  inactivo: 'bg-gradient-to-r from-gray-400 to-gray-500',
  mantenimiento: 'bg-gradient-to-r from-amber-500 to-amber-600',
}[e] || 'bg-gradient-to-r from-gray-400 to-gray-500')

const estadoBadgeClass = (e: string) => ({
  activo: 'bg-green-100 text-green-700',
  inactivo: 'bg-gray-100 text-gray-600',
  mantenimiento: 'bg-amber-100 text-amber-700',
}[e] || 'bg-gray-100 text-gray-600')
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
.slide-fade-enter-active { transition: all 0.3s ease; }
.slide-fade-leave-active { transition: all 0.2s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
