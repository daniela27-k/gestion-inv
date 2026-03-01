<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-indigo-100 rounded-xl">
            <Icon name="mdi:account-multiple" class="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <p class="text-gray-500 text-sm">Administra roles, estados y accesos del sistema</p>
          </div>
        </div>
        <button
          id="btn-nuevo-usuario"
          @click="abrirModalCrear"
          class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          <Icon name="mdi:account-plus" class="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>
    </div>

    <!-- Mensaje feedback -->
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
        <Icon
          :name="mensaje.tipo === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'"
          class="w-5 h-5 flex-shrink-0"
        />
        <span class="flex-1">{{ mensaje.texto }}</span>
        <button @click="mensaje.texto = ''" class="opacity-60 hover:opacity-100">
          <Icon name="mdi:close" class="w-4 h-4" />
        </button>
      </div>
    </Transition>

    <!-- Filtros y búsqueda -->
    <div class="bg-white rounded-2xl shadow-lg p-5">
      <div class="flex flex-col sm:flex-row gap-3">
        <!-- Búsqueda -->
        <div class="relative flex-1">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="input-buscar-usuario"
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre o correo..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
        <!-- Filtro Rol -->
        <select
          id="filtro-rol"
          v-model="filtroRol"
          class="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Todos los roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="INSTRUCTOR">INSTRUCTOR</option>
          <option value="USUARIO">USUARIO</option>
        </select>
        <!-- Filtro Estado -->
        <select
          id="filtro-estado"
          v-model="filtroEstado"
          class="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <!-- Refresh -->
        <button
          id="btn-refrescar"
          @click="cargar"
          :disabled="loading"
          class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
        >
          <Icon name="mdi:refresh" class="w-4 h-4" :class="{ 'animate-spin': loading }" />
          Actualizar
        </button>
      </div>
    </div>

    <!-- Tabla de usuarios -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <!-- Cabecera stats -->
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <span class="text-sm font-semibold text-gray-600">
          {{ usuariosFiltrados.length }} usuario(s) encontrado(s)
        </span>
        <div class="flex gap-3 text-xs font-semibold">
          <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            {{ usuarios.filter(u => u.estado_usuario === 'activo').length }} activos
          </span>
          <span class="bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
            {{ usuarios.filter(u => u.estado_usuario === 'inactivo').length }} inactivos
          </span>
        </div>
      </div>

      <!-- Cargando -->
      <div v-if="loading" class="p-16 flex flex-col items-center justify-center gap-3 text-gray-400">
        <Icon name="mdi:loading" class="w-10 h-10 animate-spin" />
        <p class="font-medium">Cargando usuarios...</p>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="usuariosFiltrados.length === 0" class="p-16 flex flex-col items-center justify-center gap-3 text-gray-400">
        <Icon name="mdi:account-off" class="w-14 h-14" />
        <p class="font-semibold">No hay usuarios que coincidan con los filtros</p>
      </div>

      <!-- Tabla -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-left text-xs uppercase tracking-wide">
              <th class="px-6 py-4 font-semibold">#</th>
              <th class="px-6 py-4 font-semibold">Usuario</th>
              <th class="px-6 py-4 font-semibold">Teléfono</th>
              <th class="px-6 py-4 font-semibold">Rol</th>
              <th class="px-6 py-4 font-semibold">Estado</th>
              <th class="px-6 py-4 font-semibold">Registro</th>
              <th class="px-6 py-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="u in usuariosFiltrados"
              :key="u.id"
              class="hover:bg-indigo-50/40 transition-colors"
            >
              <td class="px-6 py-4 font-bold text-gray-400">{{ u.id }}</td>
              <!-- Nombre + Email -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm"
                    :class="avatarColor(u.rol_usuario)"
                  >
                    {{ u.nombre_completo?.charAt(0)?.toUpperCase() || '?' }}
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ u.nombre_completo }}</p>
                    <p class="text-xs text-gray-500">{{ u.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ u.telefono || '—' }}</td>
              <!-- Rol badge editable -->
              <td class="px-6 py-4">
                <select
                  :id="`select-rol-${u.id}`"
                  :value="u.rol_usuario"
                  @change="onCambiarRol(u, ($event.target as HTMLSelectElement).value)"
                  class="text-xs font-bold px-2 py-1 rounded-lg border-2 border-transparent cursor-pointer focus:outline-none"
                  :class="rolClass(u.rol_usuario)"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="INSTRUCTOR">INSTRUCTOR</option>
                  <option value="USUARIO">USUARIO</option>
                </select>
              </td>
              <!-- Estado toggle -->
              <td class="px-6 py-4">
                <button
                  :id="`btn-estado-${u.id}`"
                  @click="onToggleEstado(u)"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all hover:scale-105 active:scale-95"
                  :class="u.estado_usuario === 'activo'
                    ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100'
                    : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'"
                >
                  <Icon :name="u.estado_usuario === 'activo' ? 'mdi:check-circle' : 'mdi:cancel'" class="w-3.5 h-3.5" />
                  {{ u.estado_usuario === 'activo' ? 'Activo' : 'Inactivo' }}
                </button>
              </td>
              <td class="px-6 py-4 text-gray-500 text-xs">
                {{ formatFecha(u.created_at) }}
              </td>
              <!-- Acciones -->
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button
                    :id="`btn-editar-${u.id}`"
                    @click="abrirModalEditar(u)"
                    class="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-all hover:scale-110" title="Editar datos"
                  >
                    <Icon name="mdi:pencil" class="w-4 h-4" />
                  </button>
                  <button
                    :id="`btn-eliminar-${u.id}`"
                    @click="abrirModalEliminar(u)"
                    class="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all hover:scale-110" title="Eliminar usuario"
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

    <!-- ───────── MODAL: Crear / Editar usuario ───────── -->
    <Transition name="modal">
      <div
        v-if="modalVisible"
        id="modal-usuario"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="cerrarModal"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <!-- Header modal -->
          <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5 flex justify-between items-center">
            <div class="flex items-center gap-3 text-white">
              <Icon :name="modoModal === 'crear' ? 'mdi:account-plus' : 'mdi:account-edit'" class="w-6 h-6" />
              <h2 class="text-lg font-bold">{{ modoModal === 'crear' ? 'Nuevo Usuario' : 'Editar Usuario' }}</h2>
            </div>
            <button @click="cerrarModal" class="text-white/80 hover:text-white">
              <Icon name="mdi:close" class="w-6 h-6" />
            </button>
          </div>

          <!-- Body modal -->
          <form @submit.prevent="guardarUsuario" class="p-6 space-y-4">
            <div class="grid grid-cols-1 gap-4">

              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Nombre completo *</label>
                <input
                  id="input-nombre"
                  v-model="form.nombre_completo"
                  type="text"
                  required
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Nombre Completo"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Correo electrónico *</label>
                <input
                  id="input-email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="usuario@ejemplo.com"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Teléfono *</label>
                <input
                  id="input-telefono"
                  v-model="form.telefono"
                  type="tel"
                  required
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="300 123 4567"
                />
              </div>

              <div v-if="modoModal === 'crear'">
                <label class="block text-xs font-bold text-gray-700 mb-1">Contraseña *</label>
                <input
                  id="input-password"
                  v-model="form.password"
                  type="password"
                  required
                  minlength="6"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Rol</label>
                  <select
                    id="select-modal-rol"
                    v-model="form.rol_usuario"
                    class="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="USUARIO">USUARIO</option>
                    <option value="INSTRUCTOR">INSTRUCTOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Estado</label>
                  <select
                    id="select-modal-estado"
                    v-model="form.estado_usuario"
                    class="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Errores -->
            <p v-if="errorModal" class="text-red-600 text-sm font-medium flex items-center gap-1">
              <Icon name="mdi:alert-circle" class="w-4 h-4" />{{ errorModal }}
            </p>

            <!-- Botones -->
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" @click="cerrarModal"
                class="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm">
                Cancelar
              </button>
              <button
                id="btn-guardar-modal"
                type="submit"
                :disabled="guardando"
                class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <Icon :name="guardando ? 'mdi:loading' : 'mdi:content-save'" class="w-4 h-4" :class="{ 'animate-spin': guardando }" />
                {{ guardando ? 'Guardando...' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ───────── MODAL: Confirmar eliminación ───────── -->
    <Transition name="modal">
      <div
        v-if="modalEliminar.visible"
        id="modal-eliminar"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="modalEliminar.visible = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="mdi:account-remove" class="w-8 h-8 text-red-600" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">¿Confirmar eliminación?</h3>
          <p class="text-gray-500 text-sm mb-6">
            El usuario <strong>{{ modalEliminar.usuario?.nombre_completo }}</strong> será dado de baja del sistema.
          </p>
          <div class="flex gap-3">
            <button
              @click="modalEliminar.visible = false"
              class="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm"
            >
              Cancelar
            </button>
            <button
              id="btn-confirmar-eliminar"
              @click="confirmarEliminar"
              :disabled="guardando"
              class="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all active:scale-95"
            >
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
import { useUsuario, type UsuarioData } from '~/composables/useUsuario'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'perfil-layout'
})

const { user } = useAuth()
const { usuarios, loading, fetchUsuarios, createUsuario, updateUsuario, cambiarRol, cambiarEstado, deleteUsuario } = useUsuario()
const config = useRuntimeConfig()
const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'

// ── Estado UI ──────────────────────────────────────────
const busqueda = ref('')
const filtroRol = ref('')
const filtroEstado = ref('')
const mensaje = reactive({ texto: '', tipo: 'success' })
const guardando = ref(false)
const errorModal = ref('')

// Modal crear/editar
const modalVisible = ref(false)
const modoModal = ref<'crear' | 'editar'>('crear')
const usuarioEditando = ref<UsuarioData | null>(null)

const form = reactive({
  nombre_completo: '',
  email: '',
  telefono: '',
  password: '',
  rol_usuario: 'USUARIO' as 'ADMIN' | 'INSTRUCTOR' | 'USUARIO',
  estado_usuario: 'activo' as 'activo' | 'inactivo',
})

// Modal eliminar
const modalEliminar = reactive({
  visible: false,
  usuario: null as UsuarioData | null,
})

// ── Seguridad: solo ADMIN puede acceder ──────────────
onMounted(async () => {
  if (user.value?.rol_usuario !== 'ADMIN') {
    await navigateTo('/perfil')
    return
  }
  await cargar()
})

// ── Datos filtrados ───────────────────────────────────
const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(u => {
    const term = busqueda.value.toLowerCase().trim()
    const matchTexto = !term ||
      u.nombre_completo?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term)
    const matchRol = !filtroRol.value || u.rol_usuario === filtroRol.value
    const matchEstado = !filtroEstado.value || u.estado_usuario === filtroEstado.value
    return matchTexto && matchRol && matchEstado
  })
})

// ── Acciones de tabla ─────────────────────────────────
const cargar = async () => {
  try {
    await fetchUsuarios()
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al cargar usuarios', 'error')
  }
}

const onCambiarRol = async (u: UsuarioData, nuevoRol: string) => {
  try {
    await cambiarRol(u.id, nuevoRol as any)
    mostrarMensaje(`Rol de ${u.nombre_completo} actualizado a ${nuevoRol}`, 'success')
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al cambiar el rol', 'error')
    await cargar() // revertir estado visual
  }
}

const onToggleEstado = async (u: UsuarioData) => {
  const nuevoEstado = u.estado_usuario === 'activo' ? 'inactivo' : 'activo'
  try {
    await cambiarEstado(u.id, nuevoEstado)
    mostrarMensaje(`Usuario ${u.nombre_completo} ${nuevoEstado === 'activo' ? 'activado' : 'desactivado'} correctamente`, 'success')
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al cambiar el estado', 'error')
    await cargar()
  }
}

// ── Modal Crear ───────────────────────────────────────
const abrirModalCrear = () => {
  modoModal.value = 'crear'
  usuarioEditando.value = null
  errorModal.value = ''
  Object.assign(form, {
    nombre_completo: '',
    email: '',
    telefono: '',
    password: '',
    rol_usuario: 'USUARIO',
    estado_usuario: 'activo',
  })
  modalVisible.value = true
}

// ── Modal Editar ─────────────────────────────────────
const abrirModalEditar = (u: UsuarioData) => {
  modoModal.value = 'editar'
  usuarioEditando.value = u
  errorModal.value = ''
  Object.assign(form, {
    nombre_completo: u.nombre_completo,
    email: u.email,
    telefono: u.telefono,
    password: '',
    rol_usuario: u.rol_usuario,
    estado_usuario: u.estado_usuario,
  })
  modalVisible.value = true
}

const cerrarModal = () => {
  modalVisible.value = false
  errorModal.value = ''
}

const guardarUsuario = async () => {
  guardando.value = true
  errorModal.value = ''
  try {
    if (modoModal.value === 'crear') {
      // Crear usuario via composable (POST /usuarios)
      await createUsuario({
        nombre_completo: form.nombre_completo,
        email: form.email,
        telefono: form.telefono,
        password: form.password,
        rol_usuario: form.rol_usuario,
        estado_usuario: form.estado_usuario,
      })
      mostrarMensaje('Usuario creado exitosamente', 'success')
    } else if (usuarioEditando.value) {
      const payload: any = {
        nombre_completo: form.nombre_completo,
        email: form.email,
        telefono: form.telefono,
        rol_usuario: form.rol_usuario,
        estado_usuario: form.estado_usuario,
      }
      if (form.password?.trim()) payload.password = form.password
      await updateUsuario(usuarioEditando.value.id, payload)
      mostrarMensaje('Usuario actualizado correctamente', 'success')
    }
    cerrarModal()
    await cargar()
  } catch (e: any) {
    const serverMsg = e?.data?.message || e?.data?.error
    const statusCode = e?.status || e?.statusCode
    const networkMsg = e?.message
    errorModal.value = serverMsg
      ? `[${statusCode || '?'}] ${serverMsg}`
      : networkMsg || 'Error al guardar el usuario'
    console.error('Error completo al guardar usuario:', JSON.stringify(e?.data || e))
  } finally {
    guardando.value = false
  }
}

// ── Modal Eliminar ────────────────────────────────────
const abrirModalEliminar = (u: UsuarioData) => {
  modalEliminar.usuario = u
  modalEliminar.visible = true
}

const confirmarEliminar = async () => {
  if (!modalEliminar.usuario) return
  guardando.value = true
  try {
    await deleteUsuario(modalEliminar.usuario.id)
    mostrarMensaje(`Usuario ${modalEliminar.usuario.nombre_completo} eliminado`, 'success')
    modalEliminar.visible = false
  } catch (e: any) {
    mostrarMensaje(e?.data?.message || 'Error al eliminar el usuario', 'error')
  } finally {
    guardando.value = false
  }
}

// ── Helpers UI ────────────────────────────────────────
const mostrarMensaje = (texto: string, tipo: 'success' | 'error') => {
  mensaje.texto = texto
  mensaje.tipo = tipo
  setTimeout(() => { mensaje.texto = '' }, 4000)
}

const formatFecha = (fecha?: string) => {
  if (!fecha) return '—'
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

const rolClass = (rol: string) => {
  switch (rol) {
    case 'ADMIN': return 'bg-red-100 text-red-700 border-red-300'
    case 'INSTRUCTOR': return 'bg-blue-100 text-blue-700 border-blue-300'
    default: return 'bg-green-100 text-green-700 border-green-300'
  }
}

const avatarColor = (rol: string) => {
  switch (rol) {
    case 'ADMIN': return 'bg-gradient-to-br from-red-500 to-red-600'
    case 'INSTRUCTOR': return 'bg-gradient-to-br from-blue-500 to-blue-600'
    default: return 'bg-gradient-to-br from-green-500 to-green-600'
  }
}
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Alert slide */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
