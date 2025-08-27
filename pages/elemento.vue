<template>
  <v-container class="py-10">
    <v-card class="mx-auto pa-6" max-width="900" elevation="8">
      <v-card-title class="text-h5 font-weight-bold mb-4">
        Gestión de Elementos
      </v-card-title>

      <v-form @submit.prevent="guardarElemento" ref="form">
        <v-text-field
          v-model="elemento.nombre"
          label="Nombre del Elemento"
          required
          outlined
          dense
        />
        <v-text-field
          v-model="elemento.numero_serial"
          label="Número de Serie"
          required
          outlined
          dense
        />
        <v-textarea
          v-model="elemento.descripcion"
          label="Descripción"
          auto-grow
          outlined
          dense
        />
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="elemento.modelo"
              label="Modelo"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="elemento.marca"
              label="Marca"
              outlined
              dense
            />
          </v-col>
        </v-row>

        <v-text-field
          v-model="elemento.ubicacion_actual"
          label="Ubicación Actual"
          outlined
          dense
        />

        <v-text-field
          v-model="elemento.fecha_registro"
          label="Fecha de Registro"
          type="datetime-local"
          outlined
          dense
        />

        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="elemento.id_tipo_elemento"
              label="ID Tipo de Elemento"
              type="number"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="elemento.id_estado_elemento"
              label="ID Estado del Elemento"
              type="number"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="elemento.id_ambiente"
              label="ID Ambiente"
              type="number"
              outlined
              dense
            />
          </v-col>
        </v-row>

        <v-btn type="submit" color="primary" class="mt-4" block>
          Guardar Elemento
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const elemento = ref({
  nombre: '',
  numero_serial: '',
  descripcion: '',
  modelo: '',
  marca: '',
  ubicacion_actual: '',
  fecha_registro: new Date().toISOString().slice(0, 16),
  id_tipo_elemento: '',
  id_estado_elemento: '',
  id_ambiente: ''
})

const guardarElemento = () => {
  console.log('Elemento guardado:', elemento.value)
  Object.keys(elemento.value).forEach(key => {
    elemento.value[key] = ''
  })
}
</script>
