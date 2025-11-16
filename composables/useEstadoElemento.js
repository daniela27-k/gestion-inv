// composables/useEstadoElemento.js
export const useEstadoElemento = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:3001'

  const estados = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchEstados = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/estado-elemento`, {
        method: 'GET',
        credentials: 'include'
      })
      estados.value = response
      console.log('✅ Estados cargados:', response)
      return response
    } catch (err) {
      error.value = err.message || 'Error al obtener estados'
      console.error('❌ Error fetchEstados:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    estados,
    loading,
    error,
    fetchEstados
  }
}