// composables/useAsignacion.ts
import { ref } from 'vue'

export type EstadoAsignacion = 'activa' | 'devuelta' | 'perdida' | 'dañada'

export interface AsignacionData {
    id: number
    nombreElemento: string
    fecha_asignacion: string
    fecha_devolucion_estimada: string
    fecha_devolucion_real?: string | null
    estado_asignacion: EstadoAsignacion
    notas?: string | null
    id_instructor: number
    usuario?: {
        id: number
        nombre_completo: string
        email: string
        rol_usuario: string
    }
}

export interface CreateAsignacionPayload {
    nombreElemento: string
    fecha_asignacion: string
    fecha_devolucion_estimada: string
    fecha_devolucion_real?: string
    estado_asignacion: EstadoAsignacion
    notas?: string
    id_instructor: number
}

export interface UpdateAsignacionPayload {
    nombreElemento?: string
    fecha_asignacion?: string
    fecha_devolucion_estimada?: string
    fecha_devolucion_real?: string
    estado_asignacion?: EstadoAsignacion
    notas?: string
    id_instructor?: number
}

export const useAsignacion = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'

    const asignaciones = ref<AsignacionData[]>([])
    const asignacion = ref<AsignacionData | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Cabeceras con cookie
    const opts = () => ({ credentials: 'include' as RequestCredentials })

    // GET /asignacion-elemento — Todas las asignaciones (con filtro opcional de estado)
    const fetchAsignaciones = async (estado?: EstadoAsignacion): Promise<AsignacionData[]> => {
        loading.value = true
        error.value = null
        try {
            const query = estado ? `?estado=${estado}` : ''
            const response = await $fetch<AsignacionData[]>(`${baseURL}/asignacion-elemento${query}`, opts())
            asignaciones.value = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al obtener asignaciones'
            throw err
        } finally {
            loading.value = false
        }
    }

    // GET /asignacion-elemento/usuario/:id — Asignaciones de un usuario/instructor específico
    const fetchAsignacionesByUsuario = async (idUsuario: number): Promise<AsignacionData[]> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<AsignacionData[]>(
                `${baseURL}/asignacion-elemento/usuario/${idUsuario}`,
                opts()
            )
            asignaciones.value = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al obtener las asignaciones del usuario'
            throw err
        } finally {
            loading.value = false
        }
    }

    // GET /asignacion-elemento/:id — Una asignación por ID
    const fetchAsignacionById = async (id: number): Promise<AsignacionData> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<AsignacionData>(`${baseURL}/asignacion-elemento/${id}`, opts())
            asignacion.value = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al obtener la asignación'
            throw err
        } finally {
            loading.value = false
        }
    }

    // POST /asignacion-elemento — Crear asignación
    const createAsignacion = async (data: CreateAsignacionPayload): Promise<AsignacionData> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<AsignacionData>(`${baseURL}/asignacion-elemento`, {
                method: 'POST',
                body: data,
                ...opts(),
            })
            asignaciones.value.unshift(response)
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al crear la asignación'
            throw err
        } finally {
            loading.value = false
        }
    }

    // PATCH /asignacion-elemento/:id — Actualizar asignación
    const updateAsignacion = async (id: number, data: UpdateAsignacionPayload): Promise<AsignacionData> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<AsignacionData>(`${baseURL}/asignacion-elemento/${id}`, {
                method: 'PATCH',
                body: data,
                ...opts(),
            })
            const idx = asignaciones.value.findIndex(a => a.id === id)
            if (idx !== -1) asignaciones.value[idx] = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al actualizar la asignación'
            throw err
        } finally {
            loading.value = false
        }
    }

    // PATCH /asignacion-elemento/:id/devolver — Marcar como devuelta
    const devolverAsignacion = async (id: number, fechaReal?: string): Promise<AsignacionData> => {
        loading.value = true
        error.value = null
        try {
            const response = await $fetch<AsignacionData>(`${baseURL}/asignacion-elemento/${id}/devolver`, {
                method: 'PATCH',
                body: fechaReal ? { fecha_devolucion_real: fechaReal } : {},
                ...opts(),
            })
            const idx = asignaciones.value.findIndex(a => a.id === id)
            if (idx !== -1) asignaciones.value[idx] = response
            return response
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al registrar devolución'
            throw err
        } finally {
            loading.value = false
        }
    }

    // DELETE /asignacion-elemento/:id
    const deleteAsignacion = async (id: number): Promise<void> => {
        loading.value = true
        error.value = null
        try {
            await $fetch(`${baseURL}/asignacion-elemento/${id}`, {
                method: 'DELETE',
                ...opts(),
            })
            asignaciones.value = asignaciones.value.filter(a => a.id !== id)
        } catch (err: any) {
            error.value = err?.data?.message || err.message || 'Error al eliminar la asignación'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        asignaciones,
        asignacion,
        loading,
        error,
        fetchAsignaciones,
        fetchAsignacionesByUsuario,
        fetchAsignacionById,
        createAsignacion,
        updateAsignacion,
        devolverAsignacion,
        deleteAsignacion,
    }
}
