<template>
  <div class="sidebar">
    <h2>Panel de Administración</h2>
    <ul class="menu">
      <li>
        <a href="#" class="menu-link" @click.prevent="toggleSubmenu = !toggleSubmenu">Registrar Elementos</a>
        <ul class="submenu" v-show="toggleSubmenu">
          <li><a href="#" @click.prevent="setSeccion('agregar')">Agregar Elemento</a></li>
          <li><a href="#" @click.prevent="setSeccion('baja')">Dar de Baja</a></li>
          <li><a href="#" @click.prevent="setSeccion('trasladar')">Trasladar Elemento</a></li>
          <li><a href="#" @click.prevent="setSeccion('lista')">Elementos Registrados</a></li>
          <li><a href="#" @click.prevent="setSeccion('bajaLista')">Elementos Dados de Baja</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useInventario } from '~/composables/useInventario'

const toggleSubmenu = ref(false)
const { mostrarSeccion } = useInventario()

const setSeccion = (sec) => {
  mostrarSeccion(sec)
}
</script>
