<template>
  <v-app>
    <v-main>
      <v-container class="py-10">
        <v-card class="mx-auto pa-6" max-width="900" elevation="10">
          <v-card-title class="text-h5 font-weight-bold mb-4">
            Lista de Tipos de Elementos
          </v-card-title>

          <!-- Tabla -->
          <v-data-table
            :headers="headers"
            :items="tipos"
            class="elevation-1"
            dense
            :items-per-page="5"
          >
            <template #item.color_codigo="{ item }">
              <v-chip :color="item.color_codigo" dark>
                {{ item.color_codigo }}
              </v-chip>
            </template>

            <template #no-data>
              <v-alert type="info" border="left" color="blue lighten-4">
                No hay tipos de elementos registrados.
              </v-alert>
            </template>
          </v-data-table>

          <!-- Botón para agregar nuevo -->
          <v-btn
            color="deep-orange darken-2"
            dark
            class="mt-4"
            @click="abrirDialogo"
          >
            Agregar Tipo de Elemento
          </v-btn>
        </v-card>

        <!-- Diálogo para agregar nuevo tipo -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="text-h6 font-weight-bold">
              Nuevo Tipo de Elemento
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="nuevo.id_tipo_elemento"
                  label="ID del Tipo"
                  type="number"
                  outlined
                  dense
                  :rules="[rules.required, rules.number]"
                />
                <v-text-field
                  v-model="nuevo.nombre_estado"
                  label="Nombre del Estado"
                  outlined
                  dense
                  :rules="[rules.required]"
                />
                <v-text-field
                  v-model="nuevo.descripcion"
                  label="Descripción"
                  outlined
                  dense
                  :rules="[rules.required]"
                />
                <v-text-field
                  v-model="nuevo.color_codigo"
                  label="Color (ej: red, #FF0000)"
                  outlined
                  dense
                  :rules="[rules.required]"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="grey" text @click="dialog = false">Cancelar</v-btn>
              <v-btn color="deep-orange darken-2" dark @click="guardarTipo">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const valid = ref(false)
const form = ref(null)

const headers = [
  { text: 'ID', value: 'id_tipo_elemento', align: 'start' },
  { text: 'Nombre Estado', value: 'nombre_estado' },
  { text: 'Descripción', value: 'descripcion' },
  { text: 'Color', value: 'color_codigo' }
]

const tipos = ref([
  { id_tipo_elemento: 1, nombre_estado: 'Disponible', descripcion: 'Elemento en uso', color_codigo: 'green' },
  { id_tipo_elemento: 2, nombre_estado: 'No disponible', descripcion: 'Elemento fuera de servicio', color_codigo: 'red' }
])

const nuevo = ref({
  id_tipo_elemento: '',
  nombre_estado: '',
  descripcion: '',
  color_codigo: ''
})

const rules = {
  required: v => !!v || 'Este campo es obligatorio',
  number: v => !isNaN(Number(v)) || 'Debe ser un número válido'
}

const abrirDialogo = () => {
  dialog.value = true
}

const guardarTipo = () => {
  if (form.value.validate()) {
    tipos.value.push({ ...nuevo.value })
    dialog.value = false
    Object.keys(nuevo.value).forEach(key => (nuevo.value[key] = ''))
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
