<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">Asignación de Elemento</h2>
      </v-col>
    </v-row>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="ID Asignación"
            v-model="asignacion.id"
            :rules="[v => !!v || 'Requerido']"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                label="Fecha Asignación"
                v-model="asignacion.fechaAsignacion"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="asignacion.fechaAsignacion" @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="6">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                label="Fecha Devolución Estimada"
                v-model="asignacion.fechaDevolucionEstimada"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="asignacion.fechaDevolucionEstimada" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Fecha Devolución Real"
            v-model="asignacion.fechaDevolucionReal"
            placeholder="dd/mm/aaaa"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            :items="estados"
            label="Estado Asignación"
            v-model="asignacion.estadoAsignacion"
            :rules="[v => !!v || 'Seleccione un estado']"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="ID Ambiente"
            v-model="asignacion.idAmbiente"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="ID Instructor"
            v-model="asignacion.idInstructor"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            label="Notas"
            v-model="asignacion.notas"
          ></v-textarea>
        </v-col>

        <v-col cols="12" class="text-center">
          <v-btn color="primary" @click="submitForm" :disabled="!valid">
            Guardar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      menu1: false,
      menu2: false,
      estados: ['Activo', 'Inactivo', 'Pendiente', 'Finalizado'],
      asignacion: {
        id: '',
        fechaAsignacion: '',
        fechaDevolucionEstimada: '',
        fechaDevolucionReal: '',
        estadoAsignacion: '',
        idAmbiente: '',
        idInstructor: '',
        notas: '',
      },
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        alert('Formulario válido y listo para enviar');
        // Aquí puedes hacer la lógica para enviar el formulario
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
