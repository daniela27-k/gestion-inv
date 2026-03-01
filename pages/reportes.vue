<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-violet-100 rounded-xl">
            <Icon name="mdi:chart-bar" class="w-8 h-8 text-violet-600" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Reportes y Estadísticas</h1>
            <p class="text-gray-500 text-sm">Análisis del inventario, asignaciones y novedades</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            id="btn-exportar-csv"
            @click="exportarCSV"
            :disabled="cargando"
            class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95"
          >
            <Icon name="mdi:file-excel" class="w-4 h-4" />
            Exportar CSV
          </button>
          <button
            id="btn-refrescar-reportes"
            @click="cargarTodo"
            :disabled="cargando"
            class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl font-semibold text-sm"
          >
            <Icon name="mdi:refresh" class="w-4 h-4" :class="{ 'animate-spin': cargando }" />
            Actualizar
          </button>
        </div>
      </div>
    </div>

    <!-- Cargando -->
    <div v-if="cargando" class="bg-white rounded-2xl shadow-lg p-16 flex flex-col items-center gap-3 text-gray-400">
      <Icon name="mdi:loading" class="w-12 h-12 animate-spin text-violet-400" />
      <p class="font-medium">Generando reporte...</p>
    </div>

    <template v-else>

      <!-- ── KPI Cards principales ─────────────────────────── -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="kpi in kpis" :key="kpi.label"
          class="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 hover:shadow-xl transition-all">
          <div class="flex items-center justify-between">
            <div class="p-2 rounded-xl" :class="kpi.iconBg">
              <Icon :name="kpi.icon" class="w-5 h-5" :class="kpi.iconColor" />
            </div>
            <span class="text-xs font-bold px-2 py-1 rounded-full" :class="kpi.badgeCls">
              {{ kpi.badge }}
            </span>
          </div>
          <div>
            <span class="text-3xl font-black" :class="kpi.valueColor">{{ kpi.value }}</span>
            <p class="text-xs font-semibold text-gray-500 mt-0.5">{{ kpi.label }}</p>
          </div>
        </div>
      </div>

      <!-- ── Segunda fila: 2 gráficas ─────────────────────── -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <!-- Inventario por Estado -->
        <div id="grafica-estado" class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="mdi:tag-multiple" class="w-5 h-5 text-blue-500" />
            Inventario por Estado
          </h2>
          <div class="space-y-3">
            <div v-for="item in inventarioPorEstado" :key="item.nombre">
              <div class="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                <span>{{ item.nombre }}</span>
                <span class="font-bold text-gray-900">{{ item.total }} ({{ item.pct }}%)</span>
              </div>
              <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :class="item.barColor"
                  :style="{ width: item.pct + '%' }"
                ></div>
              </div>
            </div>
            <p v-if="inventarioPorEstado.length === 0" class="text-gray-400 text-sm text-center py-4">
              Sin datos disponibles
            </p>
          </div>
        </div>

        <!-- Inventario por Tipo -->
        <div id="grafica-tipo" class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="mdi:shape" class="w-5 h-5 text-purple-500" />
            Inventario por Tipo de Elemento
          </h2>
          <div class="space-y-3">
            <div v-for="item in inventarioPorTipo" :key="item.nombre">
              <div class="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                <span>{{ item.nombre }}</span>
                <span class="font-bold text-gray-900">{{ item.total }}</span>
              </div>
              <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-600 transition-all duration-700"
                  :style="{ width: maxTipo > 0 ? (item.total / maxTipo * 100) + '%' : '0%' }"
                ></div>
              </div>
            </div>
            <p v-if="inventarioPorTipo.length === 0" class="text-gray-400 text-sm text-center py-4">
              Sin datos disponibles
            </p>
          </div>
        </div>
      </div>

      <!-- ── Tercera fila: Ambientes + Asignaciones ──────── -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <!-- Ambientes por estado -->
        <div id="grafica-ambientes" class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="mdi:door" class="w-5 h-5 text-green-500" />
            Ambientes por Estado
          </h2>
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div v-for="a in ambienteStats" :key="a.label"
              class="rounded-xl p-3 text-center" :class="a.bg">
              <p class="text-2xl font-black" :class="a.color">{{ a.value }}</p>
              <p class="text-xs font-semibold mt-1" :class="a.color + ' opacity-80'">{{ a.label }}</p>
            </div>
          </div>
          <!-- Top ambientes con más elementos -->
          <p class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Top ambientes por elementos</p>
          <div class="space-y-2">
            <div v-for="(amb, idx) in topAmbientes" :key="amb.id_ambiente"
              class="flex items-center gap-3 text-sm">
              <span class="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-black flex items-center justify-center flex-shrink-0">
                {{ idx + 1 }}
              </span>
              <span class="flex-1 font-medium text-gray-700 truncate">{{ amb.nombre_ambiente }}</span>
              <span class="font-black text-gray-900">{{ amb.elementos?.length || 0 }}</span>
              <div class="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-green-500 rounded-full"
                  :style="{ width: maxElementosAmb > 0 ? (amb.elementos?.length / maxElementosAmb * 100) + '%' : '0%' }">
                </div>
              </div>
            </div>
            <p v-if="topAmbientes.length === 0" class="text-gray-400 text-sm text-center py-2">Sin embientes</p>
          </div>
        </div>

        <!-- Asignaciones por estado -->
        <div id="grafica-asignaciones" class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="mdi:transfer" class="w-5 h-5 text-emerald-500" />
            Asignaciones por Estado
          </h2>
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div v-for="a in asignacionStats" :key="a.label" class="rounded-xl p-3 text-center" :class="a.bg">
              <p class="text-2xl font-black" :class="a.color">{{ a.value }}</p>
              <p class="text-xs font-semibold mt-1" :class="a.color + ' opacity-80'">{{ a.label }}</p>
            </div>
          </div>
          <!-- Alerta vencidas -->
          <div v-if="asignacionesVencidas > 0"
            class="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-center gap-2 mt-3">
            <Icon name="mdi:alert" class="w-5 h-5 text-red-500 flex-shrink-0" />
            <p class="text-sm text-red-700 font-semibold">
              {{ asignacionesVencidas }} asignación(es) activa(s) con devolución vencida
            </p>
          </div>
          <div v-else class="bg-green-50 border-2 border-green-200 rounded-xl p-3 flex items-center gap-2 mt-3">
            <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500" />
            <p class="text-sm text-green-700 font-semibold">Sin asignaciones vencidas ✓</p>
          </div>
        </div>
      </div>

      <!-- ── Novedades ─────────────────────────────────────── -->
      <div id="grafica-novedades" class="bg-white rounded-2xl shadow-lg p-6" v-if="esAdmin">
        <h2 class="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="mdi:alert-circle" class="w-5 h-5 text-orange-500" />
          Novedades por Estado
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div v-for="n in novedadStats" :key="n.label" class="rounded-xl p-4 text-center" :class="n.bg">
            <Icon :name="n.icon" class="w-6 h-6 mx-auto mb-1" :class="n.color" />
            <p class="text-2xl font-black" :class="n.color">{{ n.value }}</p>
            <p class="text-xs font-semibold mt-0.5" :class="n.color + ' opacity-70'">{{ n.label }}</p>
          </div>
        </div>
      </div>

      <!-- ── Tabla resumen inventario ──────────────────────── -->
      <div id="tabla-inventario" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h2 class="font-bold text-gray-900 flex items-center gap-2">
            <Icon name="mdi:table" class="w-5 h-5 text-violet-500" />
            Resumen de Inventario
          </h2>
          <span class="text-xs text-gray-500">{{ inventario.length }} elementos</span>
        </div>

        <!-- Filtro búsqueda tabla -->
        <div class="px-6 py-3 border-b border-gray-100">
          <div class="relative max-w-sm">
            <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="input-buscar-tabla"
              v-model="busquedaTabla"
              type="text"
              placeholder="Buscar elemento, serial..."
              class="w-full pl-9 pr-4 py-2 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gradient-to-r from-violet-600 to-purple-700 text-white text-xs uppercase tracking-wide">
                <th class="px-4 py-3 text-left font-semibold">#</th>
                <th class="px-4 py-3 text-left font-semibold">Nombre</th>
                <th class="px-4 py-3 text-left font-semibold">Marca/Modelo</th>
                <th class="px-4 py-3 text-left font-semibold">N° Serial</th>
                <th class="px-4 py-3 text-left font-semibold">Tipo</th>
                <th class="px-4 py-3 text-left font-semibold">Estado</th>
                <th class="px-4 py-3 text-left font-semibold">Ambiente</th>
                <th class="px-4 py-3 text-left font-semibold">F. Registro</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="el in inventarioFiltrado.slice(0, 50)" :key="el.id_inventario"
                class="hover:bg-violet-50/30 transition-colors">
                <td class="px-4 py-3 text-gray-400 text-xs font-bold">{{ el.id_inventario }}</td>
                <td class="px-4 py-3">
                  <p class="font-semibold text-gray-900">{{ el.nombre }}</p>
                  <p v-if="el.descripcion" class="text-xs text-gray-400 truncate max-w-[160px]">{{ el.descripcion }}</p>
                </td>
                <td class="px-4 py-3 text-gray-600">
                  <p>{{ el.marca }}</p>
                  <p class="text-xs text-gray-400">{{ el.modelo }}</p>
                </td>
                <td class="px-4 py-3 font-mono text-xs text-gray-600">{{ el.numero_serial }}</td>
                <td class="px-4 py-3 text-xs">
                  <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                    {{ el.tipoElemento?.nombre_tipo || '—' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <span class="text-xs font-bold px-2 py-1 rounded-full" :class="estadoInvClass(el.estadoElemento?.nombre_estado)">
                    {{ el.estadoElemento?.nombre_estado || '—' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-xs text-gray-600">{{ el.ambiente?.nombre_ambiente || '—' }}</td>
                <td class="px-4 py-3 text-xs text-gray-500">{{ formatFecha(el.fecha_registro) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-if="inventarioFiltrado.length > 50"
            class="text-center text-xs text-gray-400 py-3 border-t">
            Mostrando primeros 50 de {{ inventarioFiltrado.length }}. Usa el CSV para el listado completo.
          </p>
          <div v-if="inventarioFiltrado.length === 0"
            class="py-12 flex flex-col items-center gap-2 text-gray-400">
            <Icon name="mdi:table-off" class="w-10 h-10" />
            <p class="text-sm font-medium">Sin elementos para mostrar</p>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useAsignacion } from '~/composables/useAsignacion'
import { useAmbiente } from '~/composables/useAmbiente'

definePageMeta({ layout: 'perfil-layout' })

const { user } = useAuth()
const config = useRuntimeConfig()
const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'

const opts = () => ({ credentials: 'include' as RequestCredentials })

const esAdmin = computed(() => user.value?.rol_usuario === 'ADMIN')

// ── Data refs ────────────────────────────────────────
const cargando = ref(false)
const inventario = ref<any[]>([])
const asignaciones = ref<any[]>([])
const ambientes = ref<any[]>([])
const novedades = ref<any[]>([])
const busquedaTabla = ref('')

// ── Carga ─────────────────────────────────────────────
onMounted(async () => {
  if (!user.value) {
    await navigateTo('/login')
    return
  }
  await cargarTodo()
})

const cargarTodo = async () => {
  cargando.value = true
  try {
    const promesas: Promise<any>[] = [
      $fetch<any[]>(`${baseURL}/inventario`, opts()).then(r => { inventario.value = r }),
      $fetch<any[]>(`${baseURL}/asignacion-elemento`, opts()).then(r => { asignaciones.value = r }),
      $fetch<any[]>(`${baseURL}/ambiente`, opts()).then(r => { ambientes.value = r }),
    ]
    if (esAdmin.value) {
      promesas.push(
        $fetch<any[]>(`${baseURL}/novedad`, opts()).catch(() => []).then(r => { novedades.value = r })
      )
    }
    await Promise.all(promesas)
  } catch (e: any) {
    console.error('Error cargando reportes:', e)
  } finally {
    cargando.value = false
  }
}

// ── KPIs ──────────────────────────────────────────────
const totalInv = computed(() => inventario.value.length)
const totalAsig = computed(() => asignaciones.value.length)
const asignacionesActivas = computed(() => asignaciones.value.filter(a => a.estado_asignacion === 'activa').length)
const asignacionesVencidas = computed(() =>
  asignaciones.value.filter(a =>
    a.estado_asignacion === 'activa' && new Date(a.fecha_devolucion_estimada) < new Date()
  ).length
)
const totalAmbientes = computed(() => ambientes.value.length)
const totalNovedades = computed(() => novedades.value.length)
const novedadesPendientes = computed(() => novedades.value.filter(n => n.estado === 'PENDIENTE').length)

const kpis = computed(() => [
  {
    label: 'Elementos en Inventario',
    value: totalInv.value,
    icon: 'mdi:package-variant',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    valueColor: 'text-violet-700',
    badge: `${inventario.value.filter(e => !e.fecha_baja).length} activos`,
    badgeCls: 'bg-violet-100 text-violet-700',
  },
  {
    label: 'Asignaciones Activas',
    value: asignacionesActivas.value,
    icon: 'mdi:transfer',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    valueColor: 'text-emerald-700',
    badge: asignacionesVencidas.value > 0 ? `${asignacionesVencidas.value} vencidas` : 'Al día ✓',
    badgeCls: asignacionesVencidas.value > 0 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Ambientes Registrados',
    value: totalAmbientes.value,
    icon: 'mdi:door',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    valueColor: 'text-green-700',
    badge: `${ambientes.value.filter((a: any) => a.estado === 'activo').length} activos`,
    badgeCls: 'bg-green-100 text-green-700',
  },
  {
    label: 'Novedades Pendientes',
    value: esAdmin.value ? novedadesPendientes.value : '–',
    icon: 'mdi:alert-circle',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    valueColor: 'text-orange-700',
    badge: esAdmin.value ? `${totalNovedades.value} total` : 'Solo admin',
    badgeCls: 'bg-orange-100 text-orange-700',
  },
])

// ── Inventario por Estado ─────────────────────────────
const BAR_COLORS = [
  'bg-gradient-to-r from-emerald-400 to-emerald-600',
  'bg-gradient-to-r from-blue-400 to-blue-600',
  'bg-gradient-to-r from-amber-400 to-amber-600',
  'bg-gradient-to-r from-red-400 to-red-600',
  'bg-gradient-to-r from-purple-400 to-purple-600',
  'bg-gradient-to-r from-gray-400 to-gray-600',
]

const inventarioPorEstado = computed(() => {
  const map: Record<string, number> = {}
  inventario.value.forEach(e => {
    const key = e.estadoElemento?.nombre_estado || 'Sin estado'
    map[key] = (map[key] || 0) + 1
  })
  const total = inventario.value.length || 1
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([nombre, count], i) => ({
      nombre,
      total: count,
      pct: Math.round(count / total * 100),
      barColor: BAR_COLORS[i % BAR_COLORS.length],
    }))
})

// ── Inventario por Tipo ───────────────────────────────
const inventarioPorTipo = computed(() => {
  const map: Record<string, number> = {}
  inventario.value.forEach(e => {
    const key = e.tipoElemento?.nombre_tipo || 'Sin tipo'
    map[key] = (map[key] || 0) + 1
  })
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([nombre, total]) => ({ nombre, total }))
})

const maxTipo = computed(() =>
  Math.max(...inventarioPorTipo.value.map(i => i.total), 1)
)

// ── Ambientes stats ───────────────────────────────────
const ambienteStats = computed(() => [
  {
    label: 'Activos',
    value: ambientes.value.filter((a: any) => a.estado === 'activo').length,
    bg: 'bg-green-50', color: 'text-green-700',
  },
  {
    label: 'Inactivos',
    value: ambientes.value.filter((a: any) => a.estado === 'inactivo').length,
    bg: 'bg-gray-100', color: 'text-gray-600',
  },
  {
    label: 'Mantenimiento',
    value: ambientes.value.filter((a: any) => a.estado === 'mantenimiento').length,
    bg: 'bg-amber-50', color: 'text-amber-700',
  },
])

const topAmbientes = computed(() =>
  [...ambientes.value]
    .sort((a: any, b: any) => (b.elementos?.length || 0) - (a.elementos?.length || 0))
    .slice(0, 5)
)

const maxElementosAmb = computed(() =>
  Math.max(...topAmbientes.value.map((a: any) => a.elementos?.length || 0), 1)
)

// ── Asignaciones stats ────────────────────────────────
const asignacionStats = computed(() => [
  {
    label: 'Activas', value: asignaciones.value.filter(a => a.estado_asignacion === 'activa').length,
    bg: 'bg-emerald-50', color: 'text-emerald-700',
  },
  {
    label: 'Devueltas', value: asignaciones.value.filter(a => a.estado_asignacion === 'devuelta').length,
    bg: 'bg-blue-50', color: 'text-blue-700',
  },
  {
    label: 'Perdidas', value: asignaciones.value.filter(a => a.estado_asignacion === 'perdida').length,
    bg: 'bg-purple-50', color: 'text-purple-700',
  },
  {
    label: 'Dañadas', value: asignaciones.value.filter(a => a.estado_asignacion === 'dañada').length,
    bg: 'bg-red-50', color: 'text-red-700',
  },
])

// ── Novedades stats ───────────────────────────────────
const novedadStats = computed(() => [
  {
    label: 'Pendientes', value: novedades.value.filter(n => n.estado === 'PENDIENTE').length,
    bg: 'bg-orange-50', color: 'text-orange-600', icon: 'mdi:clock-outline',
  },
  {
    label: 'En revisión', value: novedades.value.filter(n => n.estado === 'EN_REVISION').length,
    bg: 'bg-blue-50', color: 'text-blue-600', icon: 'mdi:magnify',
  },
  {
    label: 'Resueltas', value: novedades.value.filter(n => n.estado === 'RESUELTA').length,
    bg: 'bg-green-50', color: 'text-green-600', icon: 'mdi:check-circle',
  },
  {
    label: 'Rechazadas', value: novedades.value.filter(n => n.estado === 'RECHAZADA').length,
    bg: 'bg-gray-100', color: 'text-gray-500', icon: 'mdi:close-circle',
  },
])

// ── Tabla inventario ─────────────────────────────────
const inventarioFiltrado = computed(() => {
  const term = busquedaTabla.value.toLowerCase().trim()
  if (!term) return inventario.value
  return inventario.value.filter(e =>
    e.nombre?.toLowerCase().includes(term) ||
    e.numero_serial?.toLowerCase().includes(term) ||
    e.marca?.toLowerCase().includes(term) ||
    e.tipoElemento?.nombre_tipo?.toLowerCase().includes(term) ||
    e.ambiente?.nombre_ambiente?.toLowerCase().includes(term)
  )
})

// ── Helpers ───────────────────────────────────────────
const formatFecha = (f: any) => {
  if (!f) return '—'
  return new Date(f).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })
}

const estadoInvClass = (estado?: string) => {
  const s = estado?.toLowerCase() || ''
  if (s.includes('buen') || s.includes('activ') || s.includes('disponib')) return 'bg-green-100 text-green-700'
  if (s.includes('mant')) return 'bg-amber-100 text-amber-700'
  if (s.includes('baja') || s.includes('inactiv')) return 'bg-gray-100 text-gray-500'
  if (s.includes('dañ') || s.includes('mal')) return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-600'
}

// ── Exportar CSV ──────────────────────────────────────
const exportarCSV = () => {
  const headers = ['ID', 'Nombre', 'Marca', 'Modelo', 'N°Serial', 'Tipo', 'Estado', 'Ambiente', 'Ubicacion', 'F.Registro']
  const filas = inventario.value.map(e => [
    e.id_inventario,
    `"${e.nombre || ''}"`,
    `"${e.marca || ''}"`,
    `"${e.modelo || ''}"`,
    `"${e.numero_serial || ''}"`,
    `"${e.tipoElemento?.nombre_tipo || ''}"`,
    `"${e.estadoElemento?.nombre_estado || ''}"`,
    `"${e.ambiente?.nombre_ambiente || ''}"`,
    `"${e.ubicacion_actual || ''}"`,
    e.fecha_registro ? new Date(e.fecha_registro).toLocaleDateString('es-CO') : '',
  ])
  const csv = [headers.join(','), ...filas.map(f => f.join(','))].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `invigex-inventario-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
</script>
