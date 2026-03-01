// composables/useUsuario.ts
import { ref } from 'vue'

export interface UsuarioData {
    id: number
    nombre_completo: string
    email: string
    telefono: string
    rol_usuario: 'ADMIN' | 'INSTRUCTOR' | 'USUARIO'
    estado_usuario: 'activo' | 'inactivo'
    created_at?: string
    updated_at?: string
}

export interface UpdateUsuarioPayload {
    nombre_completo?: string
    email?: string
    telefono?: string
    rol_usuario?: 'ADMIN' | 'INSTRUCTOR' | 'USUARIO'
    estado_usuario?: 'activo' | 'inactivo'
    password?: string
}

export const useUsuario = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'

    const usuarios = ref<UsuarioData[]>([])
    const usuario = ref<UsuarioData | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // GET /usuarios — Listar todos (solo ADMIN)
    const fetchUsuarios = async (): Promise<UsuarioData[]> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<UsuarioData[]>(`${baseURL}/usuarios`, {
                method: 'GET',
                credentials: 'include',
            })
            usuarios.value = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al obtener usuarios'
            console.error('fetchUsuarios error:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // GET /usuarios/instructores — Lista de instructores/admins activos (cualquier usuario autenticado)
    const instructores = ref<UsuarioData[]>([])
    const fetchInstructores = async (): Promise<UsuarioData[]> => {
        try {
            const response = await $fetch<UsuarioData[]>(`${baseURL}/usuarios/instructores`, {
                method: 'GET',
                credentials: 'include',
            })
            instructores.value = response
            return response
        } catch (err: any) {
            console.error('fetchInstructores error:', err)
            throw err
        }
    }

    // POST /usuarios — Crear usuario (solo ADMIN)
    const createUsuario = async (data: any): Promise<UsuarioData> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<UsuarioData>(`${baseURL}/usuarios`, {
                method: 'POST',
                credentials: 'include',
                body: data,
            })
            // Opcional: recargar lista o agregar a la lista local
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al crear el usuario'
            throw err
        } finally {
            loading.value = false
        }
    }

    // GET /usuarios/:id — Obtener usuario por ID
    const fetchUsuarioById = async (id: number): Promise<UsuarioData> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<UsuarioData>(`${baseURL}/usuarios/${id}`, {
                method: 'GET',
                credentials: 'include',
            })
            usuario.value = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al obtener el usuario'
            throw err
        } finally {
            loading.value = false
        }
    }

    // PATCH /usuarios/:id — Actualizar usuario (rol, estado, datos)
    const updateUsuario = async (id: number, data: UpdateUsuarioPayload): Promise<UsuarioData> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<UsuarioData>(`${baseURL}/usuarios/${id}`, {
                method: 'PATCH',
                credentials: 'include',
                body: data,
            })
            // Actualizar en la lista local si existe
            const idx = usuarios.value.findIndex(u => u.id === id)
            if (idx !== -1) usuarios.value[idx] = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al actualizar el usuario'
            throw err
        } finally {
            loading.value = false
        }
    }

    // Shortcut: cambiar rol de usuario
    const cambiarRol = (id: number, rol_usuario: 'ADMIN' | 'INSTRUCTOR' | 'USUARIO') =>
        updateUsuario(id, { rol_usuario })

    // Shortcut: activar/desactivar usuario
    const cambiarEstado = (id: number, estado_usuario: 'activo' | 'inactivo') =>
        updateUsuario(id, { estado_usuario })

    // DELETE /usuarios/:id — Soft delete (solo ADMIN)
    const deleteUsuario = async (id: number): Promise<void> => {
        loading.value = true
        error.value = null
        try {
            await $fetch(`${baseURL}/usuarios/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            usuarios.value = usuarios.value.filter(u => u.id !== id)
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al eliminar el usuario'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        usuarios,
        usuario,
        loading,
        error,
        fetchUsuarios,
        createUsuario,
        fetchUsuarioById,
        updateUsuario,
        cambiarRol,
        cambiarEstado,
        deleteUsuario,
        instructores,
        fetchInstructores,
    }
}
