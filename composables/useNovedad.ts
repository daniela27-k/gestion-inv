// composables/useNovedad.ts
import { ref } from 'vue'

export type TipoNovedad = 'daño' | 'perdida' | 'mantenimiento' | 'robo' | 'otro'
export type EstadoNovedad = 'pendiente' | 'en_revision' | 'resuelta' | 'cerrada'

export interface NovedadData {
    id_novedad: number
    tipo_novedad: TipoNovedad
    descripcion: string
    estado_novedad: EstadoNovedad
    fecha_novedad: string
    observaciones_admin: string | null
    id_inventario: number
    id_usuario_reporta: number
    inventario?: {
        id_inventario: number
        nombre: string
        numero_serial: string
    }
    usuarioReporta?: {
        id: number
        nombre_completo: string
        email: string
    }
    created_at: string
}

export interface CreateNovedadPayload {
    tipo_novedad: TipoNovedad
    descripcion: string
    id_inventario: number
    fecha_novedad?: string
}

export interface UpdateNovedadPayload {
    tipo_novedad?: TipoNovedad
    descripcion?: string
    estado_novedad?: EstadoNovedad
    observaciones_admin?: string
}

export const useNovedad = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'

    const novedades = ref<NovedadData[]>([])
    const novedad = ref<NovedadData | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // GET /novedad — Listar todas (ADMIN/INSTRUCTOR)
    const fetchNovedades = async (): Promise<NovedadData[]> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<NovedadData[]>(`${baseURL}/novedad`, {
                credentials: 'include',
            })
            novedades.value = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al obtener novedades'
            throw err
        } finally {
            loading.value = false
        }
    }

    // GET /novedad/mis-novedades — Solo las del usuario en sesión
    const fetchMisNovedades = async (): Promise<NovedadData[]> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<NovedadData[]>(`${baseURL}/novedad/mis-novedades`, {
                credentials: 'include',
            })
            novedades.value = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al obtener mis novedades'
            throw err
        } finally {
            loading.value = false
        }
    }

    // GET /novedad/inventario/:id — Novedades de un elemento
    const fetchNovedadesByInventario = async (idInventario: number): Promise<NovedadData[]> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<NovedadData[]>(`${baseURL}/novedad/inventario/${idInventario}`, {
                credentials: 'include',
            })
            novedades.value = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al obtener novedades del inventario'
            throw err
        } finally {
            loading.value = false
        }
    }

    // POST /novedad — Crear una novedad
    const createNovedad = async (data: CreateNovedadPayload): Promise<NovedadData> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<NovedadData>(`${baseURL}/novedad`, {
                method: 'POST',
                credentials: 'include',
                body: data,
            })
            novedades.value.unshift(response)
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al registrar la novedad'
            throw err
        } finally {
            loading.value = false
        }
    }

    // PATCH /novedad/:id — Actualizar
    const updateNovedad = async (id: number, data: UpdateNovedadPayload): Promise<NovedadData> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<NovedadData>(`${baseURL}/novedad/${id}`, {
                method: 'PATCH',
                credentials: 'include',
                body: data,
            })
            const idx = novedades.value.findIndex(n => n.id_novedad === id)
            if (idx !== -1) novedades.value[idx] = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al actualizar la novedad'
            throw err
        } finally {
            loading.value = false
        }
    }

    // DELETE /novedad/:id — Eliminar
    const deleteNovedad = async (id: number): Promise<void> => {
        loading.value = true
        error.value = null
        try {
            await $fetch(`${baseURL}/novedad/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            novedades.value = novedades.value.filter(n => n.id_novedad !== id)
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al eliminar la novedad'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        novedades,
        novedad,
        loading,
        error,
        fetchNovedades,
        fetchMisNovedades,
        fetchNovedadesByInventario,
        createNovedad,
        updateNovedad,
        deleteNovedad,
    }
}
