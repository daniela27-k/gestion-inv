// composables/useAmbiente.js
export const useAmbiente = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:3001'

  const ambientes = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAmbientes = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/ambiente`, {
        method: 'GET',
        credentials: 'include'
      })
      ambientes.value = response
      console.log('✅ Ambientes cargados:', response)
      return response
    } catch (err) {
      error.value = err.message || 'Error al obtener ambientes'
      console.error('❌ Error fetchAmbientes:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createAmbiente = async (ambienteData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/ambiente`, {
        method: 'POST',
        body: ambienteData,
        credentials: 'include'
      })
      if (response) {
        ambientes.value.push(response)
      }
      return response
    } catch (err) {
      error.value = err.message || 'Error al crear ambiente'
      console.error('❌ Error createAmbiente:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateAmbiente = async (id, ambienteData) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/ambiente/${id}`, {
        method: 'PATCH',
        body: ambienteData,
        credentials: 'include'
      })
      if (response) {
        const index = ambientes.value.findIndex(a => a.id_ambiente === id)
        if (index !== -1) {
          ambientes.value[index] = response
        }
      }
      return response
    } catch (err) {
      error.value = err.message || 'Error al actualizar ambiente'
      console.error('❌ Error updateAmbiente:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteAmbiente = async (id) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`${baseURL}/ambiente/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      ambientes.value = ambientes.value.filter(a => a.id_ambiente !== id)
      return true
    } catch (err) {
      error.value = err.message || 'Error al eliminar ambiente'
      console.error('❌ Error deleteAmbiente:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getAmbienteById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/ambiente/${id}`, {
        method: 'GET',
        credentials: 'include'
      })
      return response
    } catch (err) {
      error.value = err.message || 'Error al cargar ambiente'
      console.error('❌ Error getAmbienteById:', err)
      throw err
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