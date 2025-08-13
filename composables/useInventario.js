import { ref } from 'vue'

export function useInventario() {
  const seccionActiva = ref('')
  const elementos = ref([
    { nombre: 'Proyector A', serial: 'SN-001', tipo: 'Proyector', estado: 'Disponible', ambiente: 'Salón 101', cantidad: 1 }
  ])
  const elementosBaja = ref([])

  const mostrarSeccion = (id) => {
    seccionActiva.value = id
  }

  const agregarElemento = (el) => {
    elementos.value.push(el)
  }

  const editarElemento = (index, nuevo) => {
    elementos.value[index] = nuevo
  }

  const borrarElemento = (index) => {
    elementos.value.splice(index, 1)
  }

  const darBajaElemento = (index) => {
    elementosBaja.value.push(elementos.value[index])
    elementos.value.splice(index, 1)
  }

  const trasladarElemento = (index, nuevoAmbiente) => {
    elementos.value[index].ambiente = nuevoAmbiente
  }

  return {
    seccionActiva,
    elementos,
    elementosBaja,
    mostrarSeccion,
    agregarElemento,
    editarElemento,
    borrarElemento,
    darBajaElemento,
    trasladarElemento
  }
}
