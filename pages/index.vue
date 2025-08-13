<template>
  <div>
    <Sidebar />

    <div class="content">
      <section v-if="seccionActiva === 'agregar'">
        <h1>Agregar Elemento</h1>
        <!-- Aquí modal o formulario -->
      </section>

      <section v-if="seccionActiva === 'lista'">
        <h1>Elementos Registrados</h1>
        <!-- Tabla -->
      </section>

      <section v-if="seccionActiva === 'bajaLista'">
        <h1>Elementos Dados de Baja</h1>
        <!-- Tabla -->
      </section>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue'
import { useInventario } from '~/composables/useInventario'

const { seccionActiva } = useInventario()
</script>

<style>
@import '~/assets/css/style.css';
</style>
