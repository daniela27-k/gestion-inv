<template>
  <v-container class="py-10">
    <v-card class="mx-auto pa-6" max-width="600" elevation="8">
      <v-card-title class="text-h5 font-weight-bold mb-4">
        Registro de Estado de Elemento
      </v-card-title>

      <v-form @submit.prevent="guardarEstado" ref="form">
        <v-text-field
          v-model="estado.nombre"
          label="Nombre del Estado"
          placeholder="Ej: Disponible, Asignado, Mantenimiento..."
          required
          outlined
          dense
        />

        <v-text-field
          v-model="estado.descripcion"
          label="Descripción"
          placeholder="Descripción opcional del estado"
          outlined
          dense
        />

        <v-text-field
          v-model="estado.color"
          label="Color (ej: red, #FF0000)"
          placeholder="Color representativo"
          outlined
          dense
        />

        <v-btn type="submit" color="primary" class="mt-4" block>
          Guardar Estado
        </v-btn>
      </v-form>

      <!-- Estado registrado -->
      <v-alert
        v-if="guardado"
        type="success"
        class="mt-6"
        title="Estado registrado correctamente"
        border="start"
        color="green"
        variant="tonal"
      >
        <p><strong>Nombre:</strong> {{ estado.nombre }}</p>
        <p><strong>Descripción:</strong> {{ estado.descripcion }}</p>
        <p><strong>Color:</strong> <v-chip :color="estado.color" dark>{{ estado.color }}</v-chip></p>
      </v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const estado = ref({
  nombre: '',
  descripcion: '',
  color: ''
})

const guardado = ref(false)

const guardarEstado = () => {
  console.log('Estado registrado:', estado.value)
  guardado.value = true

  // Limpiar formulario después de 2 segundos
  setTimeout(() => {
    Object.keys(estado.value).forEach(key => {
      estado.value[key] = ''
    })
    guardado.value = false
  }, 2000)
}
</script>
