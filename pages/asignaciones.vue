<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-emerald-100 rounded-xl">
            <Icon name="mdi:transfer" class="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Gestión de Asignaciones</h1>
            <p class="text-gray-500 text-sm">Administra asignaciones de equipos a instructores</p>
          </div>
        </div>
        <button
          id="btn-nueva-asignacion"
          @click="abrirModalCrear"
          class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Icon name="mdi:plus-circle" class="w-5 h-5" />
          Nueva Asignación
        </button>
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

    <!-- Stats rápidas -->
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
            id="input-buscar-asignacion"
            v-model="busqueda"
            type="text"
            placeholder="Buscar por elemento, instructor..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
          />
        </div>
        <select id="filtro-estado-asig" v-model="filtroEstado"
          class="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
          <option value="">Todos los estados</option>
          <option value="activa">Activa</option>
          <option value="devuelta">Devuelta</option>
          <option value="perdida">Perdida</option>
          <option value="dañada">Dañada</option>
        </select>
        <button id="btn-refrescar-asig" @click="cargar" :disabled="loading"
          class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold">
          <Icon name="mdi:refresh" class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Actualizar
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <span class="text-sm font-semibold text-gray-600">{{ asignacionesFiltradas.length }} asignación(es)</span>
      </div>

      <div v-if="loading" class="p-16 flex flex-col items-center gap-3 text-gray-400">
        <Icon name="mdi:loading" class="w-10 h-10 animate-spin" />
        <p class="font-medium">Cargando asignaciones...</p>
      </div>

      <div v-else-if="asignacionesFiltradas.length === 0" class="p-16 flex flex-col items-center gap-3 text-gray-400">
        <Icon name="mdi:clipboard-off" class="w-14 h-14" />
        <p class="font-semibold">No hay asignaciones que coincidan</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs uppercase tracking-wide">
              <th class="px-5 py-4 text-left font-semibold">#</th>
              <th class="px-5 py-4 text-left font-semibold">Elemento</th>
              <th class="px-5 py-4 text-left font-semibold">Instructor</th>
              <th class="px-5 py-4 text-left font-semibold">F. Asignación</th>
              <th class="px-5 py-4 text-left font-semibold">F. Dev. Estimada</th>
              <th class="px-5 py-4 text-left font-semibold">F. Dev. Real</th>
              <th class="px-5 py-4 text-left font-semibold">Estado</th>
              <th class="px-5 py-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="a in asignacionesFiltradas" :key="a.id"
              class="hover:bg-emerald-50/30 transition-colors">
              <td class="px-5 py-4 font-bold text-gray-400 text-xs">A-{{ a.id }}</td>

              <!-- Elemento -->
              <td class="px-5 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Icon name="mdi:laptop" class="w-4 h-4 text-emerald-600" />
                  </div>
                  <span class="font-semibold text-gray-900">{{ a.nombreElemento }}</span>
                </div>
              </td>

              <!-- Instructor -->
              <td class="px-5 py-4">
                <div>
                  <p class="font-medium text-gray-800">{{ a.usuario?.nombre_completo || `ID: ${a.id_instructor}` }}</p>
                  <p class="text-xs text-gray-400">{{ a.usuario?.email }}</p>
                </div>
              </td>

              <td class="px-5 py-4 text-gray-600 text-xs">{{ formatFecha(a.fecha_asignacion) }}</td>

              <!-- F. Devolución Estimada con alerta de vencido -->
              <td class="px-5 py-4">
                <span class="text-xs font-medium"
                  :class="estaVencida(a) ? 'text-red-600 font-bold' : 'text-gray-600'">
                  {{ formatFecha(a.fecha_devolucion_estimada) }}
                  <span v-if="estaVencida(a)" class="ml-1">⚠️</span>
                </span>
              </td>

              <td class="px-5 py-4 text-gray-500 text-xs">
                {{ a.fecha_devolucion_real ? formatFecha(a.fecha_devolucion_real) : '—' }}
              </td>

              <!-- Estado con select inline -->
              <td class="px-5 py-4">
                <select
                  :value="a.estado_asignacion"
                  @change="onCambiarEstado(a, ($event.target as HTMLSelectElement).value)"
                  class="text-xs font-bold px-2 py-1 rounded-lg border-2 border-transparent cursor-pointer focus:outline-none"
                  :class="estadoBadgeClass(a.estado_asignacion)"
                >
                  <option value="activa">Activa</option>
                  <option value="devuelta">Devuelta</option>
                  <option value="perdida">Perdida</option>
                  <option value="dañada">Dañada</option>
                </select>
              </td>

              <!-- Acciones -->
              <td class="px-5 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    :id="`btn-editar-asig-${a.id}`"
                    @click="abrirModalEditar(a)"
                    class="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-all hover:scale-110"
                    title="Editar"
                  >
                    <Icon name="mdi:pencil" class="w-4 h-4" />
                  </button>
                  <button
                    v-if="a.estado_asignacion === 'activa'"
                    :id="`btn-devolver-${a.id}`"
                    @click="accionDevolver(a)"
                    class="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all hover:scale-110"
                    title="Marcar como devuelta"
                  >
                    <Icon name="mdi:check-circle" class="w-4 h-4" />
                  </button>
                  <button
                    :id="`btn-eliminar-asig-${a.id}`"
                    @click="confirmarEliminar(a)"
                    class="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all hover:scale-110"
                    title="Eliminar"
                  >
                    <Icon name="mdi:delete" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ════ MODAL: Crear / Editar asignación ════ -->
    <Transition name="modal">
      <div v-if="modalVisible" id="modal-asignacion"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="cerrarModal">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

          <!-- Cabecera del modal -->
          <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex justify-between items-center">
            <div class="flex items-center gap-3 text-white">
              <div class="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon :name="modoModal === 'crear' ? 'mdi:plus-circle' : 'mdi:pencil'" class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-lg font-bold leading-tight">{{ modoModal === 'crear' ? 'Nueva Asignación' : 'Editar Asignación' }}</h2>
                <p class="text-emerald-100 text-xs">Completa los datos requeridos</p>
              </div>
            </div>
            <button @click="cerrarModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="guardarAsignacion" class="p-6 space-y-5">

            <!-- ── Sección: Equipo ── -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest">
                <Icon name="mdi:laptop" class="w-4 h-4" />
                <span>Equipo a asignar</span>
                <div class="flex-1 h-px bg-emerald-100"></div>
              </div>

              <!-- Select elemento -->
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Elemento del inventario *</label>
                <select id="select-elemento-inventario" v-model="form.id_inventario_seleccionado" required
                  @change="onSeleccionarElemento"
                  :disabled="cargandoElementos"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white">
                  <option value="">{{ cargandoElementos ? 'Cargando elementos...' : '— Seleccionar elemento —' }}</option>
                  <option v-for="el in elementosInventario" :key="el.id_inventario" :value="el.id_inventario">
                    {{ el.marca }} {{ el.modelo }} · S/N: {{ el.numero_serial }}
                  </option>
                </select>
              </div>

              <!-- Tarjeta preview del elemento seleccionado -->
              <Transition name="slide-fade">
                <div v-if="form.id_inventario_seleccionado && elementoSeleccionadoInfo"
                  class="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                  <div class="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:laptop" class="w-5 h-5 text-emerald-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-emerald-900 truncate">{{ elementoSeleccionadoInfo.nombre }}</p>
                    <p class="text-xs text-emerald-600">{{ elementoSeleccionadoInfo.marca }} {{ elementoSeleccionadoInfo.modelo }}</p>
                  </div>
                  <span class="text-xs bg-emerald-200 text-emerald-800 font-mono px-2 py-1 rounded-lg whitespace-nowrap">S/N: {{ elementoSeleccionadoInfo.numero_serial }}</span>
                </div>
              </Transition>
            </div>

            <!-- ── Sección: Instructor ── -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest">
                <Icon name="mdi:account-tie" class="w-4 h-4" />
                <span>Instructor responsable</span>
                <div class="flex-1 h-px bg-emerald-100"></div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Instructor asignado *</label>
                <select id="select-instructor" v-model="form.id_instructor" required
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white">
                  <option value="">— Seleccionar instructor —</option>
                  <option v-for="u in instructores" :key="u.id" :value="u.id">
                    {{ u.nombre_completo }}
                  </option>
                </select>
              </div>

              <!-- Preview instructor -->
              <Transition name="slide-fade">
                <div v-if="form.id_instructor && instructorSeleccionadoInfo"
                  class="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                  <div class="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-bold text-sm">{{ instructorSeleccionadoInfo.nombre_completo?.charAt(0)?.toUpperCase() }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-blue-900 truncate">{{ instructorSeleccionadoInfo.nombre_completo }}</p>
                    <p class="text-xs text-blue-500">{{ instructorSeleccionadoInfo.email }}</p>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- ── Sección: Fechas y Estado ── -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest">
                <Icon name="mdi:calendar-range" class="w-4 h-4" />
                <span>Período de asignación</span>
                <div class="flex-1 h-px bg-emerald-100"></div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5">Fecha de asignación *</label>
                  <input id="input-fecha-asig" v-model="form.fecha_asignacion" type="date" required
                    class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5">Dev. estimada *</label>
                  <input id="input-fecha-dev" v-model="form.fecha_devolucion_estimada" type="date" required
                    class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Estado de la asignación</label>
                <select id="select-estado-asig" v-model="form.estado_asignacion"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white">
                  <option value="activa">✅ Activa</option>
                  <option value="devuelta">🔵 Devuelta</option>
                  <option value="perdida">🟣 Perdida</option>
                  <option value="dañada">🔴 Dañada</option>
                </select>
              </div>
            </div>

            <!-- ── Notas ── -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5">Notas u observaciones</label>
              <textarea id="textarea-notas-asig" v-model="form.notas" rows="2"
                placeholder="Observaciones opcionales..."
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"></textarea>
            </div>

            <!-- Error -->
            <div v-if="errorModal" class="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700">
              <Icon name="mdi:alert-circle" class="w-4 h-4 flex-shrink-0" />
              <span class="text-sm">{{ errorModal }}</span>
            </div>

            <!-- Botones -->
            <div class="flex gap-3 pt-1">
              <button type="button" @click="cerrarModal"
                class="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-all">Cancelar</button>
              <button id="btn-guardar-asig" type="submit" :disabled="guardando"
                class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                <Icon :name="guardando ? 'mdi:loading' : 'mdi:content-save'" class="w-4 h-4" :class="{ 'animate-spin': guardando }" />
                {{ guardando ? 'Guardando...' : 'Guardar asignación' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ════ MODAL: Confirmar devolución ════ -->
    <Transition name="modal">
      <div v-if="modalDevolucion.visible" id="modal-devolucion"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="modalDevolucion.visible = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon name="mdi:check-circle" class="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900">Registrar Devolución</h3>
              <p class="text-sm text-gray-500">{{ modalDevolucion.asignacion?.nombreElemento }}</p>
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-xs font-bold text-gray-700 mb-1">Fecha real de devolución</label>
            <input id="input-fecha-dev-real" v-model="modalDevolucion.fechaReal" type="date" :max="hoy"
              class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div class="flex gap-3">
            <button @click="modalDevolucion.visible = false"
              class="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm">Cancelar</button>
            <button id="btn-confirmar-devolucion" @click="confirmarDevolucion" :disabled="guardando"
              class="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all active:scale-95">
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
import { useAsignacion, type AsignacionData, type EstadoAsignacion, type CreateAsignacionPayload } from '~/composables/useAsignacion'
import { useUsuario } from '~/composables/useUsuario'
import { useAuth } from '~/composables/useAuth'
import { useInventario } from '~/composables/useInventario'

definePageMeta({ layout: 'perfil-layout' })

const { user } = useAuth()
const { asignaciones, loading, fetchAsignaciones, createAsignacion, updateAsignacion, devolverAsignacion, deleteAsignacion } = useAsignacion()
const { instructores, fetchInstructores } = useUsuario()
const { inventarios: elementosInventarioRaw, fetchInventarios } = useInventario()

// Elementos del inventario activos (sin fecha_baja) para el select
const elementosInventario = computed(() =>
  (elementosInventarioRaw.value as any[]).filter((el: any) => !el.fecha_baja)
)
const cargandoElementos = ref(false)

// Preview del elemento seleccionado en el modal
const elementoSeleccionadoInfo = computed(() =>
  (elementosInventarioRaw.value as any[]).find((el: any) => el.id_inventario === Number(form.id_inventario_seleccionado)) ?? null
)

// Preview del instructor seleccionado en el modal
const instructorSeleccionadoInfo = computed(() =>
  (instructores.value as any[]).find((u: any) => u.id === Number(form.id_instructor)) ?? null
)

const hoy: string = new Date().toISOString().split('T')[0] ?? ''

// ── Protección de acceso ────────────────────────────
onMounted(async () => {
  const rol = user.value?.rol_usuario
  if (rol !== 'ADMIN' && rol !== 'INSTRUCTOR') {
    await navigateTo('/perfil')
    return
  }
  await cargar()
})

// ── Estado UI ────────────────────────────────────────
const busqueda = ref('')
const filtroEstado = ref('')
const mensaje = reactive({ texto: '', tipo: 'success' })
const guardando = ref(false)
const errorModal = ref('')
const modalVisible = ref(false)
const modoModal = ref<'crear' | 'editar'>('crear')
const asignacionEditando = ref<AsignacionData | null>(null)

const form = reactive({
  id_inventario_seleccionado: '' as string | number,
  nombreElemento: '',
  id_instructor: 0,
  fecha_asignacion: hoy,
  fecha_devolucion_estimada: '',
  estado_asignacion: 'activa' as EstadoAsignacion,
  notas: '',
})

// Cuando se selecciona un elemento, actualizar el nombreElemento
const onSeleccionarElemento = () => {
  const el = (elementosInventarioRaw.value as any[]).find((e: any) => e.id_inventario === Number(form.id_inventario_seleccionado))
  form.nombreElemento = el ? el.nombre : ''
}

const modalDevolucion = reactive({
  visible: false,
  asignacion: null as AsignacionData | null,
  fechaReal: hoy,
})

// instructores viene directamente del composable (ya filtrado desde el backend)

// ── Stats ────────────────────────────────────────────
const estadisticas = computed(() => [
  { label: 'Total', value: asignaciones.value.length, color: 'text-gray-700', border: 'border-gray-400' },
  { label: 'Activas', value: asignaciones.value.filter(a => a.estado_asignacion === 'activa').length, color: 'text-emerald-600', border: 'border-emerald-400' },
  { label: 'Devueltas', value: asignaciones.value.filter(a => a.estado_asignacion === 'devuelta').length, color: 'text-blue-600', border: 'border-blue-400' },
  { label: 'Vencidas', value: asignaciones.value.filter(a => estaVencida(a)).length, color: 'text-red-600', border: 'border-red-400' },
])

// ── Filtrado ─────────────────────────────────────────
const asignacionesFiltradas = computed(() => {
  return asignaciones.value.filter(a => {
    const term = busqueda.value.toLowerCase().trim()
    const matchTexto = !term ||
      a.nombreElemento?.toLowerCase().includes(term) ||
      a.usuario?.nombre_completo?.toLowerCase().includes(term) ||
      a.usuario?.email?.toLowerCase().includes(term)
    const matchEstado = !filtroEstado.value || a.estado_asignacion === filtroEstado.value
    return matchTexto && matchEstado
  })
})

// ── Helpers ──────────────────────────────────────────
const estaVencida = (a: AsignacionData) =>
  a.estado_asignacion === 'activa' && new Date(a.fecha_devolucion_estimada) < new Date()

const formatFecha = (f?: string | null) => {
  if (!f) return '—'
  return new Date(f).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })
}

const estadoBadgeClass = (e: EstadoAsignacion) => ({
  activa: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  devuelta: 'bg-blue-100 text-blue-700 border-blue-300',
  perdida: 'bg-purple-100 text-purple-700 border-purple-300',
  dañada: 'bg-red-100 text-red-700 border-red-300',
}[e] || 'bg-gray-100 text-gray-700')

const mostrarMensaje = (texto: string, tipo: 'success' | 'error') => {
  mensaje.texto = texto
  mensaje.tipo = tipo
  setTimeout(() => { mensaje.texto = '' }, 4000)
}

// ── Carga ────────────────────────────────────────────
const cargar = async () => {
  try {
    cargandoElementos.value = true
    await Promise.all([fetchAsignaciones(), fetchInstructores(), fetchInventarios()])
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al cargar datos', 'error')
  } finally {
    cargandoElementos.value = false
  }
}

// ── Modales ──────────────────────────────────────────
const resetForm = () => {
  form.id_inventario_seleccionado = ''
  form.nombreElemento = ''
  form.id_instructor = 0
  form.fecha_asignacion = hoy
  form.fecha_devolucion_estimada = ''
  form.estado_asignacion = 'activa'
  form.notas = ''
}

const abrirModalCrear = () => {
  modoModal.value = 'crear'
  asignacionEditando.value = null
  errorModal.value = ''
  resetForm()
  modalVisible.value = true
}

const abrirModalEditar = (a: AsignacionData) => {
  modoModal.value = 'editar'
  asignacionEditando.value = a
  errorModal.value = ''
  // Buscar el elemento en el inventario por nombre para preseleccionar
  const elEncontrado = (elementosInventarioRaw.value as any[]).find((e: any) => e.nombre === a.nombreElemento)
  form.id_inventario_seleccionado = elEncontrado ? elEncontrado.id_inventario : ''
  form.nombreElemento = a.nombreElemento
  form.id_instructor = a.id_instructor
  form.fecha_asignacion = a.fecha_asignacion?.split('T')[0] || hoy
  form.fecha_devolucion_estimada = a.fecha_devolucion_estimada?.split('T')[0] || ''
  form.estado_asignacion = a.estado_asignacion
  form.notas = a.notas || ''
  modalVisible.value = true
}

const cerrarModal = () => {
  modalVisible.value = false
  errorModal.value = ''
}

const guardarAsignacion = async () => {
  if (!form.id_inventario_seleccionado) { errorModal.value = 'Selecciona un elemento del inventario'; return }
  if (!form.id_instructor) { errorModal.value = 'Selecciona un instructor'; return }
  guardando.value = true
  errorModal.value = ''
  try {
    const payload: CreateAsignacionPayload = {
      nombreElemento: form.nombreElemento,
      id_instructor: Number(form.id_instructor),
      fecha_asignacion: form.fecha_asignacion,
      fecha_devolucion_estimada: form.fecha_devolucion_estimada,
      estado_asignacion: form.estado_asignacion as EstadoAsignacion,
      notas: form.notas || undefined,
    }
    if (modoModal.value === 'crear') {
      await createAsignacion(payload)
      mostrarMensaje('Asignación creada exitosamente', 'success')
    } else if (asignacionEditando.value) {
      await updateAsignacion(asignacionEditando.value.id, payload)
      mostrarMensaje('Asignación actualizada correctamente', 'success')
    }
    cerrarModal()
  } catch (e: any) {
    errorModal.value = e?.data?.message || e.message || 'Error al guardar la asignación'
  } finally {
    guardando.value = false
  }
}

const onCambiarEstado = async (a: AsignacionData, nuevoEstado: string) => {
  try {
    await updateAsignacion(a.id, { estado_asignacion: nuevoEstado as EstadoAsignacion })
    mostrarMensaje('Estado actualizado correctamente', 'success')
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al cambiar el estado', 'error')
    await cargar()
  }
}

const accionDevolver = (a: AsignacionData) => {
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

const confirmarEliminar = async (a: AsignacionData) => {
  if (!confirm(`¿Eliminar la asignación #A-${a.id} de "${a.nombreElemento}"?`)) return
  try {
    await deleteAsignacion(a.id)
    mostrarMensaje('Asignación eliminada', 'success')
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al eliminar', 'error')
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
