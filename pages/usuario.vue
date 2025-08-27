<template>
  <v-container class="py-10">
    <v-card class="mx-auto pa-6" max-width="600" elevation="10">
      <v-card-title class="text-h5 font-weight-bold mb-4">Registro de Usuario</v-card-title>

      <div v-if="!registrado">
        <v-form @submit.prevent="registrarUsuario" ref="form">
          <v-text-field v-model="usuario.id_instructor" label="ID Instructor" required outlined dense />
          <v-text-field v-model="usuario.nombre_completo" label="Nombre Completo" required outlined dense />
          <v-text-field v-model="usuario.email" label="Email" type="email" required outlined dense />
          <v-text-field v-model="usuario.telefono" label="Teléfono" type="tel" required outlined dense />

          <v-select
            v-model="usuario.rol"
            :items="['instructor', 'admin']"
            label="Rol"
            required
            outlined
            dense
          />

          <v-text-field v-model="usuario.password_hash" label="Password" type="password" required outlined dense />

          <v-select
            v-model="usuario.estado"
            :items="['activo', 'inactivo']"
            label="Estado"
            required
            outlined
            dense
          />

          <v-btn type="submit" color="blue-darken-2" class="mt-4" block>Registrar Usuario</v-btn>
        </v-form>
      </div>

      <div v-else class="mt-6">
        <h2 class="text-h6 font-weight-medium mb-4">Usuario registrado</h2>
        <v-list dense>
          <v-list-item v-for="(val, key) in usuarioRegistrado" :key="key">
            <v-list-item-content>
              <v-list-item-title><strong>{{ key }}:</strong> {{ val }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn class="mt-4" color="green-darken-2" block @click="nuevoRegistro">Registrar otro usuario</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const usuario = ref({
  id_instructor: '',
  nombre_completo: '',
  email: '',
  telefono: '',
  rol: '',
  password_hash: '',
  estado: ''
})

const usuarioRegistrado = ref({})
const registrado = ref(false)

const registrarUsuario = () => {
  usuarioRegistrado.value = { ...usuario.value }

  usuario.value = {
    id_instructor: '',
    nombre_completo: '',
    email: '',
    telefono: '',
    rol: '',
    password_hash: '',
    estado: ''
  }

  registrado.value = true
}

const nuevoRegistro = () => {
  registrado.value = false
}
</script>
