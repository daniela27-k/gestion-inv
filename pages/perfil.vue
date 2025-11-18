<!-- pages/perfil.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Loading State -->
      <div v-if="pending" class="flex items-center justify-center min-h-[500px]">
        <div class="text-center">
          <div class="relative inline-flex">
            <div class="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <Icon name="mdi:account-circle" class="w-10 h-10 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p class="mt-6 text-lg font-medium text-gray-700">Cargando tu perfil...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-md mx-auto mt-20">
        <div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-200">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <Icon name="mdi:alert-circle" class="h-10 w-10 text-red-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Error al cargar perfil</h3>
            <p class="text-gray-600 mb-6">{{ error }}</p>
            <NuxtLink 
              to="/login" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Icon name="mdi:login" class="w-5 h-5" />
              Iniciar sesión
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div v-else-if="data" class="space-y-6">
        
        <!-- Header Card con Gradiente -->
        <div class="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl shadow-2xl overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative px-8 py-12">
            <div class="flex flex-col md:flex-row items-center gap-6">
              <!-- Avatar -->
              <div class="relative">
                <div class="w-32 h-32 rounded-full bg-white/30 backdrop-blur-lg border-4 border-white/50 flex items-center justify-center shadow-2xl">
                  <Icon name="mdi:account-circle" class="w-16 h-16 text-white" />
                </div>
                <div class="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <!-- Info -->
              <div class="flex-1 text-center md:text-left">
                <h1 class="text-4xl font-bold text-white mb-2">
                  {{ data.nombre_completo }}
                </h1>
                <p class="text-xl text-white/90 mb-4">{{ data.email }}</p>
                
                <div class="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span 
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-lg backdrop-blur-sm"
                    :class="{
                      'bg-yellow-400/90 text-yellow-900': data.rol_usuario === 'ADMIN',
                      'bg-blue-400/90 text-blue-900': data.rol_usuario === 'INSTRUCTOR',
                      'bg-green-400/90 text-green-900': data.rol_usuario === 'USUARIO'
                    }"
                  >
                    <Icon name="mdi:shield-star" class="w-4 h-4" />
                    {{ data.rol_usuario }}
                  </span>
                  
                  <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-lg backdrop-blur-sm bg-green-400/90 text-green-900">
                    <div class="w-2 h-2 bg-green-900 rounded-full"></div>
                    Activo
                  </span>
                </div>
              </div>

              <!-- Botón Edit -->
              <button 
                @click="router.push('/perfil/settings')"
                class="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Icon name="mdi:pencil-outline" class="w-5 h-5" />
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="flex border-b overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all whitespace-nowrap"
              :class="activeTab === tab.id 
                ? 'bg-emerald-500 text-white border-b-4 border-emerald-600' 
                : 'text-gray-600 hover:bg-gray-50'"
            >
              <Icon :name="tab.icon" class="w-5 h-5" />
              {{ tab.label }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Columna Principal -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Estadísticas -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div 
                @click="handleViewAssignments" 
                class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="p-3 bg-blue-100 rounded-xl">
                    <Icon name="mdi:package-variant" class="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p class="text-3xl font-bold text-gray-900">{{ stats.elementosAsignados }}</p>
                <p class="text-sm text-gray-600 mt-1">Elementos Asignados</p>
              </div>

              <div 
                @click="handleViewNovedades"
                class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="p-3 bg-red-100 rounded-xl">
                    <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <p class="text-3xl font-bold text-gray-900">{{ stats.novedadesRegistradas }}</p>
                <p class="text-sm text-gray-600 mt-1">Novedades Registradas</p>
              </div>

              <div 
                @click="handleViewAmbientes"
                class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="p-3 bg-emerald-100 rounded-xl">
                    <Icon name="mdi:office-building" class="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <p class="text-3xl font-bold text-gray-900">{{ stats.ambientesGestionados }}</p>
                <p class="text-sm text-gray-600 mt-1">Ambientes</p>
              </div>
            </div>

            <!-- About Me -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div class="p-2 bg-emerald-100 rounded-lg">
                  <Icon name="mdi:account-details" class="w-6 h-6 text-emerald-600" />
                </div>
                Acerca de mí
              </h2>
              <p class="text-gray-700 leading-relaxed">
                {{ getAboutMeText(data.rol_usuario) }}
              </p>
            </div>

            <!-- Contact Info -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <Icon name="mdi:email-outline" class="w-6 h-6 text-blue-600" />
                </div>
                Información de Contacto
              </h2>
              
              <div class="space-y-4">
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div class="p-3 bg-blue-100 rounded-lg">
                    <Icon name="mdi:phone-outline" class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Teléfono</p>
                    <p class="font-semibold text-gray-900">{{ data.telefono }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div class="p-3 bg-purple-100 rounded-lg">
                    <Icon name="mdi:email-outline" class="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Correo Electrónico</p>
                    <p class="font-semibold text-gray-900 break-all">{{ data.email }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div class="p-3 bg-green-100 rounded-lg">
                    <Icon name="mdi:calendar-outline" class="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Miembro desde</p>
                    <p class="font-semibold text-gray-900">{{ formatDate(data.created_at) }}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Sidebar Derecha -->
          <div class="space-y-6">
            
            <!-- Acciones Rápidas -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="mdi:lightning-bolt" class="w-5 h-5 text-emerald-600" />
                Acciones Rápidas
              </h3>
              
              <div class="space-y-3">
                <button 
                  @click="handleViewAssignments"
                  class="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Icon name="mdi:package-variant" class="w-5 h-5" />
                  <span>Mis Asignaciones</span>
                </button>

                <button 
                  @click="handleViewNovedades"
                  class="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Icon name="mdi:alert-circle" class="w-5 h-5" />
                  <span>Mis Novedades</span>
                </button>

                <button 
                  @click="handleViewAmbientes"
                  class="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Icon name="mdi:office-building" class="w-5 h-5" />
                  <span>Ambientes</span>
                </button>
              </div>
            </div>

            <!-- Configuración -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="mdi:cog-outline" class="w-5 h-5 text-purple-600" />
                Configuración
              </h3>
              
              <div class="space-y-3">
                <button 
                  @click="router.push('/perfil/settings')"
                  class="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Icon name="mdi:pencil-outline" class="w-5 h-5" />
                  <span>Editar Perfil</span>
                </button>

                <button 
                  @click="router.push('/perfil/password')"
                  class="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Icon name="mdi:lock-reset" class="w-5 h-5" />
                  <span>Cambiar Contraseña</span>
                </button>

                <button 
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-rose-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Icon name="heroicons-outline:logout" class="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>

            <!-- Info Adicional -->
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-6 border-2 border-emerald-200">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="mdi:information-outline" class="w-5 h-5 text-emerald-600" />
                Estado de Cuenta
              </h3>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span class="text-sm text-gray-600">Perfil completado</span>
                  <span class="text-sm font-bold text-emerald-600">100%</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span class="text-sm text-gray-600">Último acceso</span>
                  <span class="text-sm font-bold text-gray-800">Hoy</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <span class="text-sm text-gray-600">Rol activo</span>
                  <span class="text-sm font-bold text-blue-600">{{ data.rol_usuario }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import { useApi } from '~/composables/useApi';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'perfil-layout'
});

const { logout } = useAuth();
const router = useRouter();
const activeTab = ref('profile');

// Obtener perfil
const { data, pending, error } = useApi('/auth/profile', { 
  credentials: 'include' 
});

// Estadísticas (placeholder - debes crear estos endpoints)
const stats = ref({
  elementosAsignados: 45,
  novedadesRegistradas: 12,
  ambientesGestionados: 8
});

// Tabs
const tabs = [
  { id: 'profile', label: 'Mi Perfil', icon: 'mdi:account-circle' },
  { id: 'assignments', label: 'Asignaciones', icon: 'mdi:package-variant' },
  { id: 'novedades', label: 'Novedades', icon: 'mdi:alert-circle' },
  { id: 'ambientes', label: 'Ambientes', icon: 'mdi:office-building' }
];

// Funciones
const handleLogout = async () => {
  try {
    await logout();
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    router.push('/login');
  }
};

const handleViewAssignments = () => {
  router.push('/inventario'); // O la ruta que prefieras
};

const handleViewNovedades = () => {
  router.push('/novedades'); // O la ruta que prefieras
};

const handleViewAmbientes = () => {
  router.push('/ambientes'); // O la ruta que prefieras
};

const getAboutMeText = (rol) => {
  const texts = {
    'INSTRUCTOR': 'Instructor encargado de la gestión y asignación de elementos del inventario a los ambientes de formación. Responsable de mantener el control y seguimiento de los recursos educativos.',
    'ADMIN': 'Administrador del sistema de inventario. Gestiono y superviso todos los recursos, ambientes y usuarios del sistema.',
    'USUARIO': 'Usuario del sistema de inventario con permisos para consultar y reportar novedades sobre los elementos asignados.'
  };
  return texts[rol] || texts['USUARIO'];
};

const formatDate = (date) => {
  if (!date) return 'No disponible';
  return new Date(date).toLocaleDateString('es-CO', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
</script>