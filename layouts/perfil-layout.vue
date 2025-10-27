<!-- layouts/profile-layout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-gradient-to-r from-green-700 to-green-600 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <button 
              @click="toggleSidebar" 
              class="lg:hidden text-white hover:bg-green-800 p-2 rounded-md transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <div class="ml-3">
              <h1 class="text-white text-xl font-bold">Sistema de Inventario</h1>
              <p class="text-green-100 text-xs hidden sm:block">{{ getRolDescription(userRole) }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Badge de Rol -->
            <span :class="getRoleBadgeColor(userRole)" class="px-3 py-1 rounded-full text-xs font-semibold hidden sm:inline-block">
              {{ userRole }}
            </span>
            <span class="text-white text-sm hidden md:block">{{ userName }}</span>
            <button 
              @click="handleLogout"
              class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors text-sm font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <aside 
        :class="[
          'bg-gray-900 text-white w-72 min-h-screen transition-transform duration-300 ease-in-out fixed lg:sticky top-16 z-40',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <div class="p-6">
          <!-- Perfil del Usuario -->
          <div class="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
            <div class="flex items-center space-x-3">
              <div class="bg-green-600 rounded-full p-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-white">{{ userName }}</p>
                <span :class="getRoleBadgeColor(userRole)" class="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1">
                  {{ userRole }}
                </span>
              </div>
            </div>
          </div>

          <!-- Menú de Navegación -->
          <nav class="space-y-1">
            <div v-for="item in visibleMenuItems" :key="item.id">
              <NuxtLink 
                :to="`/${item.id}`"
                class="group flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-green-700 hover:translate-x-1"
                active-class="bg-green-600 shadow-lg"
              >
                <span class="text-green-400 group-hover:text-white transition-colors">
                  <Icon :name="item.icon" class="w-5 h-5" />
                </span>
                <div class="flex-1">
                  <span class="text-sm font-medium">{{ item.name }}</span>
                  <p v-if="item.description" class="text-xs text-gray-400 group-hover:text-green-100 mt-0.5">
                    {{ item.description }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </nav>

          <!-- Información de Permisos -->
          <div v-if="userRole" class="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div class="flex items-center space-x-2 mb-2">
              <Icon name="mdi:shield-check" class="w-4 h-4 text-green-400" />
              <h3 class="text-xs font-semibold text-gray-300">Permisos Activos</h3>
            </div>
            <div class="space-y-1">
              <div v-if="tienePermiso(userRole, 'ver_inventario')" class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span class="text-xs text-gray-400">Consultar inventario</span>
              </div>
              <div v-if="tienePermiso(userRole, 'crear_asignacion')" class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span class="text-xs text-gray-400">Crear asignaciones</span>
              </div>
              <div v-if="tienePermiso(userRole, 'registrar_novedad')" class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span class="text-xs text-gray-400">Registrar novedades</span>
              </div>
              <div v-if="tienePermiso(userRole, 'gestionar_usuarios')" class="flex items-center space-x-2">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span class="text-xs text-gray-400">Gestionar usuarios</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Overlay para cerrar sidebar en móvil -->
      <div 
        v-if="sidebarOpen" 
        @click="toggleSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
      ></div>

      <!-- Main Content -->
      <main class="flex-1 p-6 lg:ml-0">
        <!-- Breadcrumb opcional -->
        <div class="mb-6">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <Icon name="mdi:home" class="w-4 h-4" />
            <span>/</span>
            <span class="text-gray-900 font-medium">{{ currentPageTitle }}</span>
          </div>
        </div>
        
        <slot />
      </main>
    </div>

    <!-- Footer -->
    <footer class="bg-black text-white py-6 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-gray-400">© 2025 Sistema de Inventario SENA. Todos los derechos reservados.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-green-500 transition-colors text-sm">Privacidad</a>
            <a href="#" class="text-gray-400 hover:text-green-500 transition-colors text-sm">Términos</a>
            <a href="#" class="text-gray-400 hover:text-green-500 transition-colors text-sm">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import { 
  getMenuItemsForRol, 
  getRoleBadgeColor, 
  getRolDescription,
  tienePermiso
} from '~/utils/rolConfig';

const route = useRoute();
const { logout, user } = useAuth();
const sidebarOpen = ref(false);

// Datos del usuario
const userName = computed(() => user.value?.nombre_completo || 'Usuario');
const userRole = computed(() => user.value?.rol_usuario || 'USUARIO');

// Menú filtrado por rol
const visibleMenuItems = computed(() => {
  return getMenuItemsForRol(userRole.value);
});

// Título de página actual
const currentPageTitle = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean);
  return pathSegments[pathSegments.length - 1] || 'Dashboard';
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>

<style scoped>
/* Animaciones suaves para el sidebar */
@media (max-width: 1024px) {
  aside {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
}

/* Efecto hover mejorado en los enlaces */
.group:hover svg {
  transform: scale(1.1);
}

/* Scrollbar personalizado para el sidebar */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: #1f2937;
}

aside::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>