<template>
  <v-app>
    <v-main>
      <v-container class="py-10">
        <v-card class="mx-auto pa-6" max-width="500" elevation="10">
          <v-card-title class="text-h5 font-weight-bold text-center mb-4">
            Gestión de Ambientes
          </v-card-title>

          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              v-model="ambiente.id_ambiente"
              label="ID del Ambiente"
              type="number"
              outlined
              dense
              :rules="[rules.required, rules.number]"
            />

            <v-text-field
              v-model="ambiente.nombre_ambiente"
              label="Nombre del Ambiente"
              placeholder="Ej: Laboratorio 1"
              outlined
              dense
              :rules="[rules.required]"
            />

            <v-text-field
              v-model="ambiente.capacidad"
              label="Capacidad"
              type="number"
              outlined
              dense
              :rules="[rules.required, rules.number]"
            />

            <v-text-field
              v-model="ambiente.ubicacion"
              label="Ubicación"
              placeholder="Ej: Piso 2 - Bloque A"
              outlined
              dense
              :rules="[rules.required]"
            />

            <v-select
              v-model="ambiente.estado"
              :items="estados"
              label="Estado"
              outlined
              dense
              :rules="[rules.required]"
            />

            <v-btn
              class="mt-4"
              color="deep-orange darken-2"
              dark
              block
              large
              @click="guardarAmbiente"
            >
              Guardar Ambiente
            </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const valid = ref(false)
const form = ref(null)

const ambiente = ref({
  id_ambiente: '',
  nombre_ambiente: '',
  capacidad: '',
  ubicacion: '',
  estado: ''
})

const estados = ['activo', 'inactivo', 'mantenimiento']

const rules = {
  required: v => !!v || 'Este campo es obligatorio',
  number: v => !isNaN(Number(v)) || 'Debe ser un número válido'
}

const guardarAmbiente = () => {
  if (form.value.validate()) {
    console.log('✅ Datos del ambiente:', ambiente.value)
    alert('✅ Ambiente guardado correctamente')
    // Aquí puedes hacer POST a tu API:
    // await $fetch('/api/ambientes', { method: 'POST', body: ambiente.value })
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 16px;
  background: #fff;
}
.v-btn {
  font-weight: bold;
  font-size: 16px;
}
</style>
