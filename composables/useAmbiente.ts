import { ref } from 'vue'
import { useApi } from './useApi'

export interface Ambiente {
  id_ambiente: number
  nombre_ambiente: string
  capacidad: number
  ubicacion: string
  estado: 'activo' | 'inactivo' | 'mantenimiento'
  elementos?: any[]
}

export function useAmbiente() {
  const ambientes = ref<Ambiente[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Obtener todos los ambientes
  const fetchAmbientes = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await useApi<Ambiente[]>('/ambiente')
      if (fetchError.value) {
        error.value = fetchError.value?.message || 'Error al cargar ambientes'
      } else {
        ambientes.value = (data.value as Ambiente[]) || []
      }
    } catch (err) {
      error.value = 'Error de conexión'
    } finally {
      loading.value = false
    }
  }

  // Crear ambiente
  const createAmbiente = async (ambienteData: Omit<Ambiente, 'id_ambiente'>) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await useApi<Ambiente>('/ambiente', {
        method: 'POST',
        body: ambienteData
      })
      if (fetchError.value) {
        error.value = fetchError.value.message || 'Error al crear ambiente'
        return null
      } else {
        const newAmbiente = data.value as Ambiente
        if (newAmbiente) {
          ambientes.value.push(newAmbiente)
        }
        return newAmbiente
      }
    } catch (err) {
      error.value = 'Error de conexión'
      return null
    } finally {
      loading.value = false
    }
  }

  // Actualizar ambiente
  const updateAmbiente = async (id: number, ambienteData: Partial<Ambiente>) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await useApi<Ambiente>(`/ambiente/${id}`, {
        method: 'PATCH',
        body: ambienteData
      })
      if (fetchError.value) {
        error.value = fetchError.value.message || 'Error al actualizar ambiente'
        return null
      } else {
        const updatedAmbiente = data.value as Ambiente
        if (updatedAmbiente) {
          const index = ambientes.value.findIndex(a => a.id_ambiente === id)
          if (index !== -1) {
            ambientes.value[index] = updatedAmbiente
          }
        }
        return updatedAmbiente
      }
    } catch (err) {
      error.value = 'Error de conexión'
      return null
    } finally {
      loading.value = false
    }
  }

  // Eliminar ambiente
  const deleteAmbiente = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { error: fetchError } = await useApi(`/ambiente/${id}`, {
        method: 'DELETE'
      })
      if (fetchError.value) {
        error.value = fetchError.value.message || 'Error al eliminar ambiente'
        return false
      } else {
        ambientes.value = ambientes.value.filter(a => a.id_ambiente !== id)
        return true
      }
    } catch (err) {
      error.value = 'Error de conexión'
      return false
    } finally {
      loading.value = false
    }
  }

  // Obtener ambiente por ID
  const getAmbienteById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await useApi<Ambiente>(`/ambiente/${id}`)
      if (fetchError.value) {
        error.value = fetchError.value.message || 'Error al cargar ambiente'
        return null
      } else {
        return data.value
      }
    } catch (err) {
      error.value = 'Error de conexión'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    ambientes,
    loading,
    error,
    fetchAmbientes,
    createAmbiente,
    updateAmbiente,
    deleteAmbiente,
    getAmbienteById
  }
}