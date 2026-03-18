<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-amber-100 rounded-xl">
            <Icon name="mdi:alert-circle" class="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ esAdmin ? 'Panel de Novedades' : 'Mis Novedades' }}
            </h1>
            <p class="text-gray-500 text-sm">
              {{ esAdmin
                ? 'Gestiona todas las novedades e incidentes reportados'
                : 'Registra y consulta tus reportes de incidentes' }}
            </p>
          </div>
        </div>
        <button
          id="btn-registrar-novedad"
          @click="abrirModalCrear"
          class="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          <Icon name="mdi:plus-circle" class="w-5 h-5" />
          Registrar Novedad
        </button>
      </div>
    </div>

    <!-- Alerta / feedback -->
    <Transition name="slide-fade">
      <div
        v-if="mensaje.texto"
        :class="[
          'flex items-center gap-3 px-5 py-4 rounded-xl border-2 font-medium',
          mensaje.tipo === 'success'
            ? 'bg-green-50 border-green-300 text-green-800'
            : 'bg-red-50 border-red-300 text-red-800'
        ]"
      >
        <Icon :name="mensaje.tipo === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" class="w-5 h-5 flex-shrink-0" />
        <span class="flex-1">{{ mensaje.texto }}</span>
        <button @click="mensaje.texto = ''"><Icon name="mdi:close" class="w-4 h-4 opacity-60 hover:opacity-100" /></button>
      </div>
    </Transition>

    <!-- Stats (solo admin / instructor) -->
    <div v-if="esAdmin || esInstructor" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div
        v-for="stat in estadisticas"
        :key="stat.label"
        class="bg-white rounded-2xl shadow p-5 flex flex-col gap-1 border-l-4"
        :class="stat.border"
      >
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
            id="input-buscar-novedad"
            v-model="busqueda"
            type="text"
            placeholder="Buscar por descripción o elemento..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
          />
        </div>
        <select
          id="filtro-tipo"
          v-model="filtroTipo"
          class="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Todos los tipos</option>
          <option value="daño">Daño</option>
          <option value="perdida">Pérdida</option>
          <option value="mantenimiento">Mantenimiento</option>
          <option value="robo">Robo</option>
          <option value="otro">Otro</option>
        </select>
        <select
          id="filtro-estado-novedad"
          v-model="filtroEstado"
          class="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_revision">En Revisión</option>
          <option value="resuelta">Resuelta</option>
          <option value="cerrada">Cerrada</option>
        </select>
        <button
          id="btn-refrescar-novedades"
          @click="cargar"
          :disabled="loading"
          class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold"
        >
          <Icon name="mdi:refresh" class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Actualizar
        </button>
      </div>
    </div>

    <!-- Tabla / lista de novedades -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <span class="text-sm font-semibold text-gray-600">
          {{ novedadesFiltradas.length }} novedad(es)
        </span>
      </div>

      <div v-if="loading" class="p-16 flex flex-col items-center gap-3 text-gray-400">
        <Icon name="mdi:loading" class="w-10 h-10 animate-spin" />
        <p class="font-medium">Cargando novedades...</p>
      </div>

      <div v-else-if="novedadesFiltradas.length === 0" class="p-16 flex flex-col items-center gap-3 text-gray-400">
        <Icon name="mdi:check-circle-outline" class="w-14 h-14 text-green-300" />
        <p class="font-semibold text-gray-500">No hay novedades registradas</p>
        <p class="text-sm">¡Todo en orden! Si detectas un incidente, regístralo aquí.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs uppercase tracking-wide">
              <th class="px-6 py-4 text-left font-semibold">#</th>
              <th class="px-6 py-4 text-left font-semibold">Elemento</th>
              <th class="px-6 py-4 text-left font-semibold">Tipo</th>
              <th class="px-6 py-4 text-left font-semibold">Descripción</th>
              <th class="px-6 py-4 text-left font-semibold">Estado</th>
              <th class="px-6 py-4 text-left font-semibold">Fecha</th>
              <th v-if="esAdmin" class="px-6 py-4 text-left font-semibold">Reportado por</th>
              <th class="px-6 py-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="n in novedadesFiltradas"
              :key="n.id_novedad"
              class="hover:bg-amber-50/30 transition-colors"
            >
              <td class="px-6 py-4 font-bold text-gray-400 text-xs">N-{{ n.id_novedad }}</td>

              <!-- Elemento inventario -->
              <td class="px-6 py-4">
                <p class="font-semibold text-gray-900 text-xs">
                  {{ n.inventario?.nombre || `ID: ${n.id_inventario}` }}
                </p>
                <p class="text-gray-400 text-xs">{{ n.inventario?.numero_serial }}</p>
              </td>

              <!-- Tipo -->
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                  :class="tipoBadgeClass(n.tipo_novedad)">
                  <Icon :name="tipoIcon(n.tipo_novedad)" class="w-3 h-3" />
                  {{ formatTipo(n.tipo_novedad) }}
                </span>
              </td>

              <!-- Descripción (truncada) -->
              <td class="px-6 py-4 max-w-xs">
                <p class="text-gray-700 text-xs truncate" :title="n.descripcion">{{ n.descripcion }}</p>
              </td>

              <!-- Estado -->
              <td class="px-6 py-4">
                <span v-if="!esAdmin"
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                  :class="estadoBadgeClass(n.estado_novedad)"
                >
                  {{ formatEstado(n.estado_novedad) }}
                </span>
                <!-- Admin puede cambiar estado inline -->
                <select
                  v-else
                  :value="n.estado_novedad"
                  @change="onCambiarEstado(n, ($event.target as HTMLSelectElement).value)"
                  class="text-xs font-bold px-2 py-1 rounded-lg border-2 border-transparent focus:outline-none cursor-pointer"
                  :class="estadoBadgeClass(n.estado_novedad)"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_revision">En Revisión</option>
                  <option value="resuelta">Resuelta</option>
                  <option value="cerrada">Cerrada</option>
                </select>
              </td>

              <!-- Fecha -->
              <td class="px-6 py-4 text-gray-500 text-xs">{{ formatFecha(n.fecha_novedad) }}</td>

              <!-- Reportado por (solo admin) -->
              <td v-if="esAdmin" class="px-6 py-4 text-xs text-gray-600">
                {{ n.usuarioReporta?.nombre_completo || `ID: ${n.id_usuario_reporta}` }}
              </td>

              <!-- Acciones -->
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    :id="`btn-ver-obs-${n.id_novedad}`"
                    @click="abrirModalDetalle(n)"
                    class="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all hover:scale-110"
                    title="Ver detalle / observaciones"
                  >
                    <Icon name="mdi:eye" class="w-4 h-4" />
                  </button>
                  <button
                    v-if="puedeEditar(n)"
                    :id="`btn-editar-novedad-${n.id_novedad}`"
                    @click="abrirModalEditar(n)"
                    class="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-all hover:scale-110"
                    title="Editar"
                  >
                    <Icon name="mdi:pencil" class="w-4 h-4" />
                  </button>
                  <button
                    v-if="puedeEliminar(n)"
                    :id="`btn-eliminar-novedad-${n.id_novedad}`"
                    @click="confirmarEliminar(n)"
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

    <!-- ════════ MODAL: Registrar / Editar Novedad ════════ -->
    <Transition name="modal">
      <div
        v-if="modalVisible"
        id="modal-novedad"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="cerrarModal"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

          <!-- Cabecera -->
          <div class="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-5 flex justify-between items-center">
            <div class="flex items-center gap-3 text-white">
              <div class="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon :name="modoModal === 'crear' ? 'mdi:plus-circle' : 'mdi:pencil'" class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-lg font-bold leading-tight">
                  {{ modoModal === 'crear' ? 'Registrar Novedad' : 'Editar Novedad' }}
                </h2>
                <p class="text-amber-100 text-xs">Completa los datos del incidente</p>
              </div>
            </div>
            <button @click="cerrarModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <form @submit.prevent="guardarNovedad" class="p-6 space-y-5">

            <!-- ── Sección: Tipo ── -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest">
                <Icon name="mdi:alert-circle" class="w-4 h-4" />
                <span>Tipo de incidente</span>
                <div class="flex-1 h-px bg-amber-100"></div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Clasificación *</label>
                <select
                  id="select-tipo-novedad"
                  v-model="form.tipo_novedad"
                  required
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="">— Seleccionar tipo —</option>
                  <option value="daño">🔴 Daño</option>
                  <option value="perdida">🟣 Pérdida</option>
                  <option value="mantenimiento">🟡 Mantenimiento requerido</option>
                  <option value="robo">⚫ Robo</option>
                  <option value="otro">⚪ Otro</option>
                </select>
              </div>
            </div>

            <!-- ── Sección: Elemento afectado ── -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest">
                <Icon name="mdi:laptop" class="w-4 h-4" />
                <span>Elemento afectado</span>
                <div class="flex-1 h-px bg-amber-100"></div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Elemento del inventario *</label>
                <select
                  id="select-elemento-novedad"
                  v-model="form.id_inventario"
                  required
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option :value="0">— Seleccionar elemento —</option>
                  <option
                    v-for="el in elementosActivos"
                    :key="el.id_inventario"
                    :value="el.id_inventario"
                  >
                    {{ el.marca }} {{ el.modelo }} · S/N: {{ el.numero_serial }}
                  </option>
                </select>
              </div>

              <!-- Tarjeta preview -->
              <Transition name="slide-fade">
                <div v-if="form.id_inventario && elementoNovedadInfo"
                  class="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <div class="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:laptop" class="w-5 h-5 text-amber-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-amber-900 truncate">{{ elementoNovedadInfo.nombre }}</p>
                    <p class="text-xs text-amber-600">{{ elementoNovedadInfo.marca }} {{ elementoNovedadInfo.modelo }}</p>
                  </div>
                  <span class="text-xs bg-amber-200 text-amber-800 font-mono px-2 py-1 rounded-lg whitespace-nowrap">S/N: {{ elementoNovedadInfo.numero_serial }}</span>
                </div>
              </Transition>
            </div>

            <!-- ── Sección: Descripción y fecha ── -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest">
                <Icon name="mdi:text-box" class="w-4 h-4" />
                <span>Detalle del incidente</span>
                <div class="flex-1 h-px bg-amber-100"></div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Descripción *</label>
                <textarea
                  id="textarea-descripcion-novedad"
                  v-model="form.descripcion"
                  required
                  rows="3"
                  maxlength="2000"
                  placeholder="Describe detalladamente el incidente..."
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                ></textarea>
                <p class="text-xs text-gray-400 text-right mt-1">{{ form.descripcion.length }}/2000</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Fecha del incidente</label>
                <input
                  id="input-fecha-novedad"
                  v-model="form.fecha_novedad"
                  type="date"
                  :max="hoy"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- ── Solo Admin en modo editar ── -->
            <div v-if="esAdmin && modoModal === 'editar'" class="space-y-3">
              <div class="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest">
                <Icon name="mdi:shield-check" class="w-4 h-4" />
                <span>Gestión administrativa</span>
                <div class="flex-1 h-px bg-blue-100"></div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Estado de la novedad</label>
                <select
                  id="select-estado-modal"
                  v-model="form.estado_novedad"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="pendiente">🟡 Pendiente</option>
                  <option value="en_revision">🔵 En Revisión</option>
                  <option value="resuelta">✅ Resuelta</option>
                  <option value="cerrada">⚫ Cerrada</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Observaciones del administrador</label>
                <textarea
                  id="textarea-obs-admin"
                  v-model="form.observaciones_admin"
                  rows="3"
                  maxlength="2000"
                  placeholder="Observaciones, resolución o comentarios adicionales..."
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                ></textarea>
              </div>
            </div>

            <!-- Error -->
            <div v-if="errorModal" class="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700">
              <Icon name="mdi:alert-circle" class="w-4 h-4 flex-shrink-0" />
              <span class="text-sm">{{ errorModal }}</span>
            </div>

            <!-- Botones -->
            <div class="flex gap-3 pt-1">
              <button type="button" @click="cerrarModal"
                class="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-all"
              >Cancelar</button>
              <button
                id="btn-guardar-novedad"
                type="submit"
                :disabled="guardando || (!form.id_inventario && modoModal === 'crear')"
                class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Icon :name="guardando ? 'mdi:loading' : 'mdi:content-save'" class="w-4 h-4" :class="{ 'animate-spin': guardando }" />
                {{ guardando ? 'Guardando...' : 'Guardar novedad' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ════════ MODAL: Detalle / Observaciones ════════ -->
    <Transition name="modal">
      <div
        v-if="modalDetalle"
        id="modal-detalle-novedad"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="modalDetalle = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5 flex justify-between items-center rounded-t-2xl">
            <div class="flex items-center gap-3 text-white">
              <Icon name="mdi:information" class="w-6 h-6" />
              <h2 class="text-lg font-bold">Detalle de la Novedad #N-{{ novedadDetalle?.id_novedad }}</h2>
            </div>
            <button @click="modalDetalle = false" class="text-white/80 hover:text-white">
              <Icon name="mdi:close" class="w-6 h-6" />
            </button>
          </div>
          <div v-if="novedadDetalle" class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Tipo</p>
                <p class="font-semibold text-gray-900">{{ formatTipo(novedadDetalle.tipo_novedad) }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Estado</p>
                <span class="inline-flex px-2 py-1 rounded-full text-xs font-bold" :class="estadoBadgeClass(novedadDetalle.estado_novedad)">
                  {{ formatEstado(novedadDetalle.estado_novedad) }}
                </span>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Elemento</p>
                <p class="font-semibold text-gray-900">{{ novedadDetalle.inventario?.nombre || `ID: ${novedadDetalle.id_inventario}` }}</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-3">
                <p class="text-xs font-bold text-gray-500 uppercase mb-1">Fecha / Registrado</p>
                <p class="font-semibold text-gray-900">{{ formatFecha(novedadDetalle.fecha_novedad) }}</p>
                <p class="text-xs text-gray-400">{{ formatFecha(novedadDetalle.created_at) }}</p>
              </div>
            </div>
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p class="text-xs font-bold text-gray-500 uppercase mb-2">Descripción</p>
              <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ novedadDetalle.descripcion }}</p>
            </div>
            <div v-if="novedadDetalle.observaciones_admin" class="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p class="text-xs font-bold text-blue-600 uppercase mb-2 flex items-center gap-1">
                <Icon name="mdi:shield-check" class="w-3 h-3" /> Observaciones del Administrador
              </p>
              <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ novedadDetalle.observaciones_admin }}</p>
            </div>
            <div v-else class="text-center py-3 text-gray-400 text-sm">
              <Icon name="mdi:comment-off" class="w-5 h-5 mx-auto mb-1" />
              <p>Sin observaciones del administrador aún</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useNovedad, type NovedadData, type TipoNovedad, type EstadoNovedad } from '~/composables/useNovedad'
import { useInventario } from '~/composables/useInventario'
import { useAuth } from '~/composables/useAuth'

definePageMeta({ layout: 'perfil-layout' })

const { user } = useAuth()
const { novedades, loading, fetchNovedades, fetchMisNovedades, createNovedad, updateNovedad, deleteNovedad } = useNovedad()
const { inventarios, fetchInventarios } = useInventario()

// ── Roles ──────────────────────────────────────────────
const esAdmin = computed(() => user.value?.rol_usuario === 'ADMIN')
const esInstructor = computed(() => user.value?.rol_usuario === 'INSTRUCTOR')

// ── Estado UI ──────────────────────────────────────────
const busqueda = ref('')
const filtroTipo = ref('')
const filtroEstado = ref('')
const mensaje = reactive({ texto: '', tipo: 'success' })
const guardando = ref(false)
const errorModal = ref('')
const hoy: string = new Date().toISOString().split('T')[0] ?? ''

// Computed: inventarios activos para el select
const elementosActivos = computed(() =>
  (inventarios.value as any[]).filter((i: any) => !i.fecha_baja)
)

// Preview del elemento seleccionado en el modal
const elementoNovedadInfo = computed(() =>
  (inventarios.value as any[]).find((i: any) => i.id_inventario === Number(form.id_inventario)) ?? null
)

// Modal crear/editar
const modalVisible = ref(false)
const modoModal = ref<'crear' | 'editar'>('crear')
const novedadEditando = ref<NovedadData | null>(null)
const form = reactive({
  tipo_novedad: '' as TipoNovedad | '',
  descripcion: '',
  fecha_novedad: hoy,
  id_inventario: 0,
  estado_novedad: 'pendiente' as EstadoNovedad,
  observaciones_admin: '',
})

// Modal detalle
const modalDetalle = ref(false)
const novedadDetalle = ref<NovedadData | null>(null)

// ── Estadísticas ─────────────────────────────────────
const estadisticas = computed(() => [
  {
    label: 'Total', value: novedades.value.length,
    color: 'text-gray-700', border: 'border-gray-400',
  },
  {
    label: 'Pendientes', value: novedades.value.filter(n => n.estado_novedad === 'pendiente').length,
    color: 'text-amber-600', border: 'border-amber-400',
  },
  {
    label: 'En Revisión', value: novedades.value.filter(n => n.estado_novedad === 'en_revision').length,
    color: 'text-blue-600', border: 'border-blue-400',
  },
  {
    label: 'Resueltas', value: novedades.value.filter(n => n.estado_novedad === 'resuelta').length,
    color: 'text-green-600', border: 'border-green-400',
  },
])

// ── Filtrado ───────────────────────────────────────────
const novedadesFiltradas = computed(() => {
  return novedades.value.filter(n => {
    const term = busqueda.value.toLowerCase().trim()
    const matchTexto = !term ||
      n.descripcion?.toLowerCase().includes(term) ||
      n.inventario?.nombre?.toLowerCase().includes(term) ||
      n.inventario?.numero_serial?.toLowerCase().includes(term)
    const matchTipo = !filtroTipo.value || n.tipo_novedad === filtroTipo.value
    const matchEstado = !filtroEstado.value || n.estado_novedad === filtroEstado.value
    return matchTexto && matchTipo && matchEstado
  })
})

// ── Permisos de acciones por fila ────────────────────
const puedeEditar = (n: NovedadData) =>
  esAdmin.value || (n.id_usuario_reporta === user.value?.id && n.estado_novedad === 'pendiente')

const puedeEliminar = (n: NovedadData) =>
  esAdmin.value || (n.id_usuario_reporta === user.value?.id && n.estado_novedad === 'pendiente')

// ── Carga inicial ────────────────────────────────────
const cargar = async () => {
  try {
    await Promise.all([
      esAdmin.value || esInstructor.value ? fetchNovedades() : fetchMisNovedades(),
      fetchInventarios(),
    ])
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al cargar datos', 'error')
  }
}

onMounted(async () => {
  await cargar()
})

// (busqueda de inventario eliminada — ahora se usa select)

// ── Modales ──────────────────────────────────────────
const resetForm = () => {
  form.tipo_novedad = ''
  form.descripcion = ''
  form.fecha_novedad = hoy
  form.id_inventario = 0
  form.estado_novedad = 'pendiente'
  form.observaciones_admin = ''
}

const abrirModalCrear = () => {
  modoModal.value = 'crear'
  novedadEditando.value = null
  errorModal.value = ''
  resetForm()
  modalVisible.value = true
}

const abrirModalEditar = (n: NovedadData) => {
  modoModal.value = 'editar'
  novedadEditando.value = n
  errorModal.value = ''
  form.tipo_novedad = n.tipo_novedad
  form.descripcion = n.descripcion
  form.fecha_novedad = n.fecha_novedad?.split('T')[0] || hoy
  form.id_inventario = n.id_inventario
  form.estado_novedad = n.estado_novedad
  form.observaciones_admin = n.observaciones_admin || ''
  modalVisible.value = true
}

const cerrarModal = () => {
  modalVisible.value = false
  errorModal.value = ''
}

const abrirModalDetalle = (n: NovedadData) => {
  novedadDetalle.value = n
  modalDetalle.value = true
}

const guardarNovedad = async () => {
  guardando.value = true
  errorModal.value = ''
  try {
    if (modoModal.value === 'crear') {
      if (!form.id_inventario) {
        errorModal.value = 'Debes seleccionar un elemento del inventario'
        return
      }
      await createNovedad({
        tipo_novedad: form.tipo_novedad as TipoNovedad,
        descripcion: form.descripcion,
        id_inventario: form.id_inventario,
        fecha_novedad: form.fecha_novedad,
      })
      mostrarMensaje('Novedad registrada exitosamente', 'success')
    } else if (novedadEditando.value) {
      const payload: any = {
        tipo_novedad: form.tipo_novedad,
        descripcion: form.descripcion,
      }
      if (esAdmin.value) {
        payload.estado_novedad = form.estado_novedad
        payload.observaciones_admin = form.observaciones_admin || null
      }
      await updateNovedad(novedadEditando.value.id_novedad, payload)
      mostrarMensaje('Novedad actualizada correctamente', 'success')
    }
    cerrarModal()
  } catch (e: any) {
    errorModal.value = e?.data?.message || e.message || 'Error al guardar la novedad'
  } finally {
    guardando.value = false
  }
}

const confirmarEliminar = async (n: NovedadData) => {
  if (!confirm(`¿Eliminar la novedad #N-${n.id_novedad}? Esta acción no se puede deshacer.`)) return
  try {
    await deleteNovedad(n.id_novedad)
    mostrarMensaje('Novedad eliminada', 'success')
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al eliminar la novedad', 'error')
  }
}

const onCambiarEstado = async (n: NovedadData, nuevoEstado: string) => {
  try {
    await updateNovedad(n.id_novedad, { estado_novedad: nuevoEstado as EstadoNovedad })
    mostrarMensaje(`Estado actualizado a "${formatEstado(nuevoEstado as EstadoNovedad)}"`, 'success')
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al cambiar el estado', 'error')
    await cargar()
  }
}

// ── Helpers de formato/clase ─────────────────────────
const mostrarMensaje = (texto: string, tipo: 'success' | 'error') => {
  mensaje.texto = texto
  mensaje.tipo = tipo
  setTimeout(() => { mensaje.texto = '' }, 4000)
}

const formatFecha = (f?: string) => {
  if (!f) return '—'
  return new Date(f).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatTipo = (t: TipoNovedad) => ({
  daño: 'Daño', perdida: 'Pérdida', mantenimiento: 'Mantenimiento', robo: 'Robo', otro: 'Otro',
}[t] || t)

const formatEstado = (e: EstadoNovedad | string) => ({
  pendiente: 'Pendiente', en_revision: 'En Revisión', resuelta: 'Resuelta', cerrada: 'Cerrada',
}[e] || e)

const tipoBadgeClass = (t: TipoNovedad) => ({
  daño: 'bg-red-100 text-red-700',
  perdida: 'bg-purple-100 text-purple-700',
  mantenimiento: 'bg-yellow-100 text-yellow-700',
  robo: 'bg-gray-800 text-white',
  otro: 'bg-gray-100 text-gray-700',
}[t] || 'bg-gray-100 text-gray-700')

const estadoBadgeClass = (e: EstadoNovedad | string) => ({
  pendiente: 'bg-amber-100 text-amber-700 border-amber-300',
  en_revision: 'bg-blue-100 text-blue-700 border-blue-300',
  resuelta: 'bg-green-100 text-green-700 border-green-300',
  cerrada: 'bg-gray-100 text-gray-600 border-gray-300',
}[e] || 'bg-gray-100 text-gray-600')

const tipoIcon = (t: TipoNovedad) => ({
  daño: 'mdi:alert', perdida: 'mdi:help-circle', mantenimiento: 'mdi:wrench',
  robo: 'mdi:shield-off', otro: 'mdi:dots-horizontal-circle',
}[t] || 'mdi:alert')
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }

.slide-fade-enter-active { transition: all 0.3s ease; }
.slide-fade-leave-active { transition: all 0.2s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
