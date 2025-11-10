// 
// composables/useInventario.js
import { ref } from 'vue'

export const useInventario = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:3001'

  const inventarios = ref([])
  const inventario = ref(null)
  const estadisticas = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // GET: Obtener todos los inventarios
  const fetchInventarios = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario`, {
        method: 'GET'
      })
      inventarios.value = response
      return response
    } catch (err) {
      error.value = err.message || 'Error al obtener inventarios'
      console.error('Error fetchInventarios:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // GET: Obtener un inventario por ID
  const fetchInventarioById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/${id}`, {
        method: 'GET'
      })
      inventario.value = response
      return response
    } catch (err) {
      error.value = err.message || 'Error al obtener inventario'
      console.error('Error fetchInventarioById:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // GET: Buscar inventarios
  const searchInventarios = async (searchTerm) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/search`, {
        method: 'GET',
        query: { q: searchTerm }
      })
      inventarios.value = response
      return response
    } catch (err) {
      error.value = err.message || 'Error al buscar inventarios'
      console.error('Error searchInventarios:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // GET: Obtener estadísticas
  const fetchEstadisticas = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/estadisticas`, {
        method: 'GET'
      })
      estadisticas.value = response
      return response
    } catch (err) {
      error.value = err.message || 'Error al obtener estadísticas'
      console.error('Error fetchEstadisticas:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // GET: Buscar por tipo
  const fetchByTipo = async (id_tipo_elemento) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/tipo/${id_tipo_elemento}`, {
        method: 'GET'
      })
      inventarios.value = response
      return response
    } catch (err) {
      error.value = err.message || 'Error al buscar por tipo'
      console.error('Error fetchByTipo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // GET: Buscar por estado
  const fetchByEstado = async (id_estado_elemento) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/estado/${id_estado_elemento}`, {
        method: 'GET'
      })
      inventarios.value = response
      return response
    } catch (err) {
      error.value = err.message || 'Error al buscar por estado'
      console.error('Error fetchByEstado:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // GET: Buscar por ambiente
  const fetchByAmbiente = async (id_ambiente) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/ambiente/${id_ambiente}`, {
        method: 'GET'
      })
      inventarios.value = response
      return response
    } catch (err) {
      error.value = err.message || 'Error al buscar por ambiente'
      console.error('Error fetchByAmbiente:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // GET: Buscar por serial
  const fetchBySerial = async (numero_serial) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/serial/${numero_serial}`, {
        method: 'GET'
      })
      inventario.value = response
      return response
    } catch (err) {
      error.value = err.message || 'Error al buscar por serial'
      console.error('Error fetchBySerial:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // POST: Crear nuevo inventario
  const createInventario = async (data) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario`, {
        method: 'POST',
        body: data
      })
      // Agregar a la lista local
      inventarios.value.unshift(response)
      return response
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al crear inventario'
      console.error('Error createInventario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // PATCH: Actualizar inventario
  const updateInventario = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/${id}`, {
        method: 'PATCH',
        body: data
      })
      // Actualizar en la lista local
      const index = inventarios.value.findIndex(i => i.id_inventario === id)
      if (index !== -1) {
        inventarios.value[index] = response
      }
      inventario.value = response
      return response
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al actualizar inventario'
      console.error('Error updateInventario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // PATCH: Cambiar estado
  const cambiarEstado = async (id, id_estado_elemento) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/${id}/estado`, {
        method: 'PATCH',
        body: { id_estado_elemento }
      })
      // Actualizar en la lista local
      const index = inventarios.value.findIndex(i => i.id_inventario === id)
      if (index !== -1) {
        inventarios.value[index] = response
      }
      return response
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al cambiar estado'
      console.error('Error cambiarEstado:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // PATCH: Cambiar ubicación
  const cambiarUbicacion = async (id, id_ambiente) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/inventario/${id}/ubicacion`, {
        method: 'PATCH',
        body: { id_ambiente }
      })
      // Actualizar en la lista local
      const index = inventarios.value.findIndex(i => i.id_inventario === id)
      if (index !== -1) {
        inventarios.value[index] = response
      }
      return response
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al cambiar ubicación'
      console.error('Error cambiarUbicacion:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // DELETE: Eliminar inventario
  const deleteInventario = async (id) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`${baseURL}/inventario/${id}`, {
        method: 'DELETE'
      })
      // Remover de la lista local
      inventarios.value = inventarios.value.filter(i => i.id_inventario !== id)
      return true
    } catch (err) {
      error.value = err.data?.message || err.message || 'Error al eliminar inventario'
      console.error('Error deleteInventario:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // Estado
    inventarios,
    inventario,
    estadisticas,
    loading,
    error,
    
    // Métodos
    fetchInventarios,
    fetchInventarioById,
    searchInventarios,
    fetchEstadisticas,
    fetchByTipo,
    fetchByEstado,
    fetchByAmbiente,
    fetchBySerial,
    createInventario,
    updateInventario,
    cambiarEstado,
    cambiarUbicacion,
    deleteInventario
  }
}