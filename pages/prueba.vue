<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start">
            <!-- Botón Sidebar móvil -->
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100"
            >
              <Icon icon="mdi:menu" class="w-6 h-6" />
            </button>
            <div class="flex ml-2 md:mr-24">
              <Icon icon="mdi:package-variant-closed" class="h-8 w-8 text-blue-600 mr-2" />
              <span class="self-cen ter text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-900">
                Inventario Escolar
              </span>
            </div>
          </div>

          <!-- Search -->
          <div class="hidden md:block flex-1 max-w-md mx-8">
            <div class="relative">
              <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar elementos..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Usuario / Dropdown -->
          <div class="flex items-center">
            <button class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 mr-2">
              <Icon icon="mdi:bell-outline" class="w-6 h-6" />
            </button>

            <div class="relative">
              <button
                @click="dropdownOpen = !dropdownOpen"
                class="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300"
              >
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <Icon icon="mdi:account" class="w-5 h-5 text-white" />
                </div>
                <div class="hidden md:block text-left">
                  <div class="font-medium text-gray-900">{{ usuario.nombre }}</div>
                  <div class="text-sm text-gray-500">{{ usuario.email }}</div>
                </div>
                <Icon icon="mdi:chevron-down" class="w-4 h-4 ml-2 text-gray-400" />
              </button>

              <!-- Dropdown -->
              <div
                v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <div class="px-4 py-2 border-b">
                  <span
                    class="inline-block px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getRoleBadgeColor(usuario.rol)"
                  >
                    {{ usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1) }}
                  </span>
                </div>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <Icon icon="mdi:cog-outline" class="w-4 h-4 mr-2" />
                  Configuración
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <Icon icon="mdi:logout" class="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
        <!-- Profile -->
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
              <Icon icon="mdi:account" class="w-6 h-6 text-white" />
            </div>
            <div class="ml-3">
              <p class="font-medium text-gray-900">{{ usuario.nombre }}</p>
              <span
                class="inline-block px-2 py-1 text-xs font-semibold rounded-full"
                :class="getRoleBadgeColor(usuario.rol)"
              >
                {{ usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Menú -->
        <ul class="space-y-2 font-medium">
          <li v-for="item in menuItems.filter(i => i.visible)" :key="item.id">
            <button
              @click="activeSection = item.id; sidebarOpen = false"
              class="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              :class="{ 'bg-blue-100 text-blue-700': activeSection === item.id }"
            >
              <Icon :icon="item.icon" class="w-5 h-5" :class="activeSection === item.id ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-900'" />
              <span class="ml-3">{{ item.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Overlay móvil -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 sm:hidden" @click="sidebarOpen = false"></div>

    <!-- Contenido principal -->
    <div class="p-4 sm:ml-64 mt-20 min-h-screen">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ menuItems.find(item => item.id === activeSection)?.name || 'Dashboard' }}
        </h1>
        <p class="text-gray-600 mt-1">
          Gestión de inventario del salón de clase - Rol: {{ usuario.rol }}
        </p>
      </div>

      <!-- Render dinámico -->
      <component :is="renderContent" />
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 sm:ml-64">
      <div class="px-4 py-6 flex justify-between items-center">
        <div class="flex items-center">
          <Icon icon="mdi:package-variant-closed" class="h-5 w-5 text-blue-600 mr-2" />
          <span class="text-sm text-gray-600">Sistema de Inventario Escolar © 2024</span>
        </div>
        <div class="text-sm text-gray-500">Versión 1.0 | Desarrollado para gestión educativa</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";
import { getMenuItemsForRol, getRoleBadgeColor, getBotonesAmbiente, getEstadoAmbienteColor } from "~/utils/rolConfig";
import { useAmbiente } from "~/composables/useAmbiente";

const sidebarOpen = ref(false);
const dropdownOpen = ref(false);
const activeSection = ref("dashboard");

const usuario = ref({
  nombre: "Juan Pérez",
  email: "juan.perez@escuela.edu.co",
  rol: "ADMIN",
});

// Usar el composable de ambiente
const {
  ambientes,
  loading: loadingAmbientes,
  error: errorAmbientes,
  fetchAmbientes,
  createAmbiente,
  updateAmbiente,
  deleteAmbiente
} = useAmbiente();

// Estado para el formulario de ambiente
const showAmbienteForm = ref(false);
//const editingAmbiente = ref<Ambiente | null>(null);
const ambienteForm = ref({
  nombre_ambiente: '',
  capacidad: 0,
  ubicacion: '',
  estado: 'activo'
});

// Obtener menú filtrado por rol
const menuItems = computed(() => getMenuItemsForRol(usuario.value.rol));

// Obtener botones de ambiente según rol
const botonesAmbiente = computed(() => getBotonesAmbiente(usuario.value.rol));

// Cargar ambientes al montar el componente y cuando se cambia a la sección
onMounted(() => {
  if (activeSection.value === 'ambiente') {
    fetchAmbientes();
  }
});

watch(activeSection, (newSection) => {
  if (newSection === 'ambiente') {
    fetchAmbientes();
  }
});

// Funciones para manejar ambientes
const openAmbienteForm = (ambiente = null) => {
  editingAmbiente.value = ambiente;
  if (ambiente) {
    ambienteForm.value = {
      nombre_ambiente: ambiente.nombre_ambiente,
      capacidad: ambiente.capacidad,
      ubicacion: ambiente.ubicacion,
      estado: ambiente.estado
    };
  } else {
    ambienteForm.value = {
      nombre_ambiente: '',
      capacidad: 0,
      ubicacion: '',
      estado: 'activo'
    };
  }
  showAmbienteForm.value = true;
};

const closeAmbienteForm = () => {
  showAmbienteForm.value = false;
  editingAmbiente.value = null;
};

const saveAmbiente = async () => {
  if (editingAmbiente.value) {
    // Editar
    await updateAmbiente(editingAmbiente.value.id_ambiente, ambienteForm.value);
  } else {
    // Crear
    await createAmbiente(ambienteForm.value);
  }
  closeAmbienteForm();
  fetchAmbientes();
};

const confirmDeleteAmbiente = async (ambiente) => {
  if (confirm(`¿Estás seguro de eliminar el ambiente "${ambiente.nombre_ambiente}"?`)) {
    await deleteAmbiente(ambiente.id_ambiente);
    fetchAmbientes();
  }
};

// Usar la función del rolConfig

// Renderizado dinámico de contenido
const renderContent = computed(() => {
  switch (activeSection.value) {
    case "dashboard":
      return {
        template: `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow-sm border p-6 flex items-center">
              <Icon icon="mdi:package-variant" class="h-8 w-8 text-blue-600" />
              <div class="ml-4">
                <p class="text-sm text-gray-600">Total Elementos</p>
                <p class="text-2xl font-semibold text-gray-900">245</p>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-sm border p-6 flex items-center">
              <Icon icon="mdi:plus" class="h-8 w-8 text-green-600" />
              <div class="ml-4">
                <p class="text-sm text-gray-600">Agregados Hoy</p>
                <p class="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-sm border p-6 flex items-center">
              <Icon icon="mdi:trash-can-outline" class="h-8 w-8 text-red-600" />
              <div class="ml-4">
                <p class="text-sm text-gray-600">Dados de Baja</p>
                <p class="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>`,
        components: { Icon },
      };
    case "ver-inventario":
      return { template: `<div class="bg-white p-6 rounded-lg shadow-sm border">Aquí se mostraría la lista completa del inventario...</div>` };
    case "agregar-elemento":
      return { template: `<div class="bg-white p-6 rounded-lg shadow-sm border">Formulario para agregar nuevos elementos...</div>` };
    case "dar-baja":
      return { template: `<div class="bg-white p-6 rounded-lg shadow-sm border">Gestión de elementos para dar de baja...</div>` };
    case "ambiente":
      return {
        template: `
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-900">Gestión de Ambientes</h2>
              <button
                v-if="botonesAmbiente.some(b => b.id === 'crear')"
                @click="openAmbienteForm()"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Icon icon="mdi:plus" class="w-4 h-4" />
                Crear Ambiente
              </button>
            </div>

            <!-- Loading -->
            <div v-if="loadingAmbientes" class="text-center py-8">
              <Icon icon="mdi:loading" class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p class="text-gray-600">Cargando ambientes...</p>
            </div>

            <!-- Error -->
            <div v-else-if="errorAmbientes" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p class="text-red-800">{{ errorAmbientes }}</p>
            </div>

            <!-- Lista de ambientes -->
            <div v-else class="overflow-x-auto">
              <table class="min-w-full table-auto">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Capacidad</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ubicación</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="ambiente in ambientes" :key="ambiente.id_ambiente">
                    <td class="px-4 py-2 text-sm text-gray-900">{{ ambiente.nombre_ambiente }}</td>
                    <td class="px-4 py-2 text-sm text-gray-900">{{ ambiente.capacidad }}</td>
                    <td class="px-4 py-2 text-sm text-gray-900">{{ ambiente.ubicacion }}</td>
                    <td class="px-4 py-2">
                      <span
                        class="inline-block px-2 py-1 text-xs font-semibold rounded-full"
                        :class="getEstadoAmbienteColor(ambiente.estado)"
                      >
                        {{ ambiente.estado.charAt(0).toUpperCase() + ambiente.estado.slice(1) }}
                      </span>
                    </td>
                    <td class="px-4 py-2 text-sm space-x-2">
                      <button
                        v-if="botonesAmbiente.some(b => b.id === 'editar')"
                        @click="openAmbienteForm(ambiente)"
                        class="text-yellow-600 hover:text-yellow-800"
                        title="Editar"
                      >
                        <Icon icon="mdi:pencil" class="w-4 h-4" />
                      </button>
                      <button
                        v-if="botonesAmbiente.some(b => b.id === 'eliminar')"
                        @click="confirmDeleteAmbiente(ambiente)"
                        class="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <Icon icon="mdi:delete" class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="ambientes.length === 0" class="text-center py-8 text-gray-500">
                No hay ambientes registrados
              </div>
            </div>

            <!-- Modal del formulario -->
            <div v-if="showAmbienteForm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 class="text-lg font-semibold mb-4">
                  {{ editingAmbiente ? 'Editar Ambiente' : 'Crear Ambiente' }}
                </h3>
                <form @submit.prevent="saveAmbiente">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Ambiente</label>
                    <input
                      v-model="ambienteForm.nombre_ambiente"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
                    <input
                      v-model.number="ambienteForm.capacidad"
                      type="number"
                      min="1"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                    <input
                      v-model="ambienteForm.ubicacion"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                      v-model="ambienteForm.estado"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                      <option value="mantenimiento">Mantenimiento</option>
                    </select>
                  </div>
                  <div class="flex justify-end space-x-3">
                    <button
                      type="button"
                      @click="closeAmbienteForm"
                      class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {{ editingAmbiente ? 'Actualizar' : 'Crear' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>`,
        components: { Icon },
        setup: () => ({
          ambientes: ambientes.value,
          loadingAmbientes: loadingAmbientes.value,
          errorAmbientes: errorAmbientes.value,
          botonesAmbiente: botonesAmbiente.value,
          showAmbienteForm: showAmbienteForm.value,
          editingAmbiente: editingAmbiente.value,
          ambienteForm: ambienteForm.value,
          openAmbienteForm,
          closeAmbienteForm,
          saveAmbiente,
          confirmDeleteAmbiente,
          getEstadoAmbienteColor
        })
      };
    case "usuarios":
      return { template: `<div class="bg-white p-6 rounded-lg shadow-sm border">Panel de administración de usuarios...</div>` };
    default:
      return { template: `<div>Sección no encontrada</div>` };
  }
});
</script>