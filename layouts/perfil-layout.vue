<!-- layouts/perfil-layout.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Navbar Mejorado -->
    <nav class="bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo y Menú -->
          <div class="flex items-center space-x-4">
            <button 
              @click="toggleSidebar" 
              class="lg:hidden text-white hover:bg-emerald-800 p-2 rounded-lg transition-all duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  :d="sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
                />
              </svg>
            </button>
            
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Icon name="mdi:package-variant-closed" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 class="text-white text-lg font-bold tracking-tight">Sistema de Inventario</h1>
                <p class="text-emerald-100 text-xs">{{ getRolDescription(userRole) }}</p>
              </div>
            </div>
          </div>
          
          <!-- Usuario y Logout -->
          <div class="flex items-center space-x-3">
            <!-- Badge de Rol -->
            <span 
              :class="getRoleBadgeColor(userRole)" 
              class="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hidden sm:inline-flex items-center space-x-1"
            >
              <Icon name="mdi:shield-check" class="w-3 h-3" />
              <span>{{ userRole }}</span>
            </span>
            
            <!-- Nombre de Usuario -->
            <span class="text-white text-sm font-medium hidden md:block">
              {{ userName }}
            </span>
            
            <!-- Botón Cerrar Sesión -->
            <button 
              @click="handleLogout"
              class="bg-white text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 flex items-center space-x-2"
            >
              <Icon name="mdi:logout" class="w-4 h-4" />
              <span class="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex relative">
      <!-- Sidebar Mejorado -->
      <aside 
        :class="[
          'bg-white shadow-2xl w-72 min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out fixed lg:sticky top-16 z-40 border-r border-gray-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <div class="h-full flex flex-col">
          <!-- Perfil del Usuario -->
          <div class="p-6 border-b border-gray-200 bg-gradient-to-br from-emerald-50 to-white">
            <div class="flex items-center space-x-3">
              <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 shadow-md">
                <Icon name="mdi:account-circle" class="w-7 h-7 text-white" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-bold text-gray-900">{{ userName }}</p>
                <span 
                  :class="getRoleBadgeColor(userRole)" 
                  class="inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-semibold mt-1"
                >
                  <Icon name="mdi:shield-star" class="w-3 h-3" />
                  <span>{{ userRole }}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Menú de Navegación -->
          <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
            <NuxtLink 
              v-for="item in visibleMenuItems" 
              :key="item.id"
              :to="item.path"
              class="group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              :class="[
                route.path === item.path 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'text-gray-700 hover:text-emerald-700'
              ]"
              @click="closeSidebarOnMobile"
            >
              <span 
                class="transition-all duration-200"
                :class="route.path === item.path ? 'text-white scale-110' : 'text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110'"
              >
                <Icon :name="item.icon" class="w-5 h-5" />
              </span>
              <div class="flex-1">
                <span class="text-sm font-semibold">{{ item.name }}</span>
                <p 
                  v-if="item.description" 
                  class="text-xs mt-0.5"
                  :class="route.path === item.path ? 'text-emerald-100' : 'text-gray-500 group-hover:text-emerald-600'"
                >
                  {{ item.description }}
                </p>
              </div>
              
              <!-- Indicador activo -->
              <div 
                v-if="route.path === item.path"
                class="w-1.5 h-8 bg-white rounded-full"
              ></div>
            </NuxtLink>
          </nav>

          <!-- Información de Permisos -->
          <div class="p-4 border-t border-gray-200 bg-gray-50">
            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div class="flex items-center space-x-2 mb-3">
                <div class="bg-emerald-100 p-1.5 rounded-lg">
                  <Icon name="mdi:shield-check" class="w-4 h-4 text-emerald-600" />
                </div>
                <h3 class="text-xs font-bold text-gray-900 uppercase tracking-wide">Permisos Activos</h3>
              </div>
              <div class="space-y-2">
                <div v-if="tienePermiso(userRole, 'ver_inventario')" class="flex items-center space-x-2 text-xs">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
                  <span class="text-gray-700 font-medium">Consultar inventario</span>
                </div>
                <div v-if="tienePermiso(userRole, 'crear_asignacion')" class="flex items-center space-x-2 text-xs">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
                  <span class="text-gray-700 font-medium">Crear asignaciones</span>
                </div>
                <div v-if="tienePermiso(userRole, 'registrar_novedad')" class="flex items-center space-x-2 text-xs">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
                  <span class="text-gray-700 font-medium">Registrar novedades</span>
                </div>
                <div v-if="tienePermiso(userRole, 'gestionar_usuarios')" class="flex items-center space-x-2 text-xs">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
                  <span class="text-gray-700 font-medium">Gestionar usuarios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Overlay para cerrar sidebar en móvil -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="sidebarOpen" 
          @click="toggleSidebar"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
        ></div>
      </Transition>

      <!-- Main Content -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <!-- Breadcrumb Mejorado -->
        <div class="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div class="flex items-center space-x-2 text-sm">
            <Icon name="mdi:home" class="w-4 h-4 text-emerald-600" />
            <Icon name="mdi:chevron-right" class="w-4 h-4 text-gray-400" />
            <span class="text-gray-900 font-semibold">{{ currentPageTitle }}</span>
          </div>
        </div>
        
        <!-- Contenido de la página -->
        <div class="space-y-6">
          <slot />
        </div>
      </main>
    </div>

    <!-- Footer Mejorado -->
    <footer class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-12 border-t-4 border-emerald-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex items-center space-x-3">
            <Icon name="mdi:package-variant-closed" class="w-6 h-6 text-emerald-400" />
            <p class="text-sm text-gray-300">© 2025 Sistema de Inventario SENA. Todos los derechos reservados.</p>
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium flex items-center space-x-1">
              <Icon name="mdi:shield-lock" class="w-4 h-4" />
              <span>Privacidad</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium flex items-center space-x-1">
              <Icon name="mdi:file-document" class="w-4 h-4" />
              <span>Términos</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium flex items-center space-x-1">
              <Icon name="mdi:email" class="w-4 h-4" />
              <span>Contacto</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import { 
  getMenuItemsForRol, 
  getRoleBadgeColor, 
  getRolDescription,
  tienePermiso
} from '~/utils/rolConfig';

const route = useRoute();
const router = useRouter();
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
  const lastSegment = pathSegments[pathSegments.length - 1] || 'Dashboard';
  
  const currentItem = visibleMenuItems.value.find(item => 
    item.path === route.path || item.path.includes(lastSegment)
  );
  
  return currentItem?.name || lastSegment;
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false;
  }
};

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

// Debug en desarrollo
onMounted(() => {
  console.log('🔍 Debug Layout:');
  console.log('User:', user.value);
  console.log('User role:', userRole.value);
  console.log('Visible menu items:', visibleMenuItems.value);
  console.log('Current path:', route.path);
});
</script>

<style scoped>
/* Scrollbar personalizado */
nav::-webkit-scrollbar,
aside::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

nav::-webkit-scrollbar-track,
aside::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

nav::-webkit-scrollbar-thumb,
aside::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

nav::-webkit-scrollbar-thumb:hover,
aside::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animaciones suaves */
@media (prefers-reduced-motion: no-preference) {
  * {
    scroll-behavior: smooth;
  }
}
</style>