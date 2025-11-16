// // composables/useTipoElemento.js
// import { ref } from 'vue'

// export const useTipoElemento = () => {
//   const config = useRuntimeConfig()
//   const baseURL = config.public.apiBase || 'http://localhost:3001'

//   const tipos = ref([])
//   const loading = ref(false)
//   const error = ref(null)

//   const fetchTipos = async () => {
//     loading.value = true
//     error.value = null
//     try {
//       const response = await $fetch(`${baseURL}/tipo-elemento`, {
//         method: 'GET'
//       })
//       tipos.value = response
//       return response
//     } catch (err) {
//       error.value = err.message || 'Error al obtener tipos'
//       console.error('Error fetchTipos:', err)
//       throw err
//     } finally {
//       loading.value = false
//     }
//   }

//   return {
//     tipos,
//     loading,
//     error,
//     fetchTipos
//   }
// }

// // composables/useEstadoElemento.js
// import { ref } from 'vue'

// export const useEstadoElemento = () => {
//   const config = useRuntimeConfig()
//   const baseURL = config.public.apiBase || 'http://localhost:3001'

//   const estados = ref([])
//   const loading = ref(false)
//   const error = ref(null)

//   const fetchEstados = async () => {
//     loading.value = true
//     error.value = null
//     try {
//       const response = await $fetch(`${baseURL}/estado-elemento`, {
//         method: 'GET'
//       })
//       estados.value = response
//       return response
//     } catch (err) {
//       error.value = err.message || 'Error al obtener estados'
//       console.error('Error fetchEstados:', err)
//       throw err
//     } finally {
//       loading.value = false
//     }
//   }

//   return {
//     estados,
//     loading,
//     error,
//     fetchEstados
//   }
// }

// // composables/useAmbiente.js
// import { ref } from 'vue'

// export const useAmbiente = () => {
//   const config = useRuntimeConfig()
//   const baseURL = config.public.apiBase || 'http://localhost:3001'

//   const ambientes = ref([])
//   const loading = ref(false)
//   const error = ref(null)

//   const fetchAmbientes = async () => {
//     loading.value = true
//     error.value = null
//     try {
//       const response = await $fetch(`${baseURL}/ambiente`, {
//         method: 'GET'
//       })
//       ambientes.value = response
//       return response
//     } catch (err) {
//       error.value = err.message || 'Error al obtener ambientes'
//       console.error('Error fetchAmbientes:', err)
//       throw err
//     } finally {
//       loading.value = false
//     }
//   }

//   return {
//     ambientes,
//     loading,
//     error,
//     fetchAmbientes
//   }
// }


// // composables/useTipoElemento.js
// import { ref } from 'vue'

// export const useTipoElemento = () => {
//   const config = useRuntimeConfig()
//   const baseURL = config.public.apiBase || 'http://localhost:3001'

//   const tipos = ref([])
//   const loading = ref(false)
//   const error = ref(null)

//   const fetchTipos = async () => {
//     loading.value = true
//     error.value = null
//     try {
//       const response = await $fetch(`${baseURL}/tipo-elemento`, {
//         method: 'GET'
//       })
//       tipos.value = response
//       return response
//     } catch (err) {
//       error.value = err.message || 'Error al obtener tipos'
//       console.error('Error fetchTipos:', err)
//       throw err
//     } finally {
//       loading.value = false
//     }
//   }

//   return {
//     tipos,
//     loading,
//     error,
//     fetchTipos
//   }
// }

// // composables/useEstadoElemento.js
// export const useEstadoElemento = () => {
//   const config = useRuntimeConfig()
//   const baseURL = config.public.apiBase || 'http://localhost:3001'

//   const estados = ref([])
//   const loading = ref(false)
//   const error = ref(null)

//   const fetchEstados = async () => {
//     loading.value = true
//     error.value = null
//     try {
//       const response = await $fetch(`${baseURL}/estado-elemento`, {
//         method: 'GET'
//       })
//       estados.value = response
//       return response
//     } catch (err) {
//       error.value = err.message || 'Error al obtener estados'
//       console.error('Error fetchEstados:', err)
//       throw err
//     } finally {
//       loading.value = false
//     }
//   }

//   return {
//     estados,
//     loading,
//     error,
//     fetchEstados
//   }
// }

// composables/useTipoElemento.js
import { ref } from 'vue'

export const useTipoElemento = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:3001'

  const tipos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchTipos = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/tipo-elemento`, {
        method: 'GET',
        credentials: 'include'
      })
      tipos.value = response
      console.log('✅ Tipos cargados:', response)
      return response
    } catch (err) {
      error.value = err.message || 'Error al obtener tipos'
      console.error('❌ Error fetchTipos:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    tipos,
    loading,
    error,
    fetchTipos
  }
}
