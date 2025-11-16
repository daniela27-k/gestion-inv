<!-- pages/perfil.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      
      <!-- Loading State -->
      <div v-if="pending" class="flex items-center justify-center min-h-[500px]">
        <div class="text-center">
          <div class="relative inline-flex">
            <div class="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <Icon name="mdi:account-circle" class="w-10 h-10 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p class="mt-6 text-lg font-medium text-gray-700">Cargando tu perfil...</p>
          <p class="mt-2 text-sm text-gray-500">Espera un momento</p>
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
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Icon name="mdi:login" class="w-5 h-5" />
              Iniciar sesión
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div v-else-if="data" class="space-y-6">
        
        <!-- Header Card con Avatar -->
        <div class="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
          <div class="px-8 py-12 sm:px-12">
            <div class="flex flex-col sm:flex-row items-center gap-8">
              <!-- Avatar -->
              <div class="relative group">
                <div class="w-32 h-32 rounded-full bg-white/20 backdrop-blur-lg border-4 border-white/50 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:account-circle" class="w-20 h-20 text-white" />
                </div>
                <div class="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Icon name="mdi:check" class="w-6 h-6 text-white" />
                </div>
              </div>

              <!-- Info Header -->
              <div class="flex-1 text-center sm:text-left">
                <h1 class="text-4xl font-bold text-white mb-2">
                  {{ data.nombre_completo }}
                </h1>
                <p class="text-xl text-white/90 mb-4">{{ data.email }}</p>
                
                <!-- Badges -->
                <div class="flex flex-wrap gap-3 justify-center sm:justify-start">
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
                  
                  <span 
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-lg backdrop-blur-sm"
                    :class="{
                      'bg-green-400/90 text-green-900': data.estado_usuario === 'activo',
                      'bg-red-400/90 text-red-900': data.estado_usuario === 'inactivo'
                    }"
                  >
                    <Icon 
                      :name="data.estado_usuario === 'activo' ? 'mdi:check-circle' : 'mdi:close-circle'" 
                      
                      class="w-4 h-4" 
                    />
                    {{ data.estado_usuario === 'activo' ? 'Activo' : 'Inactivo' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Información Personal -->
          <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
              <div class="p-3 bg-indigo-100 rounded-xl">
                <Icon name="mdi:account-details" class="w-6 h-6 text-indigo-600" />
              </div>
              <h2 class="text-2xl font-bold text-gray-800">Información Personal</h2>
            </div>

            <div class="space-y-6">
              <!-- Nombre Completo -->
              <div class="group hover:bg-gray-50 p-4 rounded-xl transition-colors duration-200">
                <div class="flex items-start gap-4">
                  <div class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Icon name="mdi:account-outline" class="w-6 h-6 text-blue-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-500 mb-1">Nombre Completo</p>
                    <p class="text-lg font-semibold text-gray-900">{{ data.nombre_completo }}</p>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="group hover:bg-gray-50 p-4 rounded-xl transition-colors duration-200">
                <div class="flex items-start gap-4">
                  <div class="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Icon name="mdi:email-outline" class="w-6 h-6 text-purple-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-500 mb-1">Correo Electrónico</p>
                    <p class="text-lg font-semibold text-gray-900 break-all">{{ data.email }}</p>
                  </div>
                </div>
              </div>

              <!-- Teléfono -->
              <div class="group hover:bg-gray-50 p-4 rounded-xl transition-colors duration-200">
                <div class="flex items-start gap-4">
                  <div class="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Icon name="mdi:phone-outline" class="w-6 h-6 text-green-600" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-500 mb-1">Teléfono</p>
                    <p class="text-lg font-semibold text-gray-900">{{ data.telefono }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-6">
            
            <!-- Acciones Rápidas -->
            <div class="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
              <div class="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
                <div class="p-3 bg-purple-100 rounded-xl">
                  <Icon name="mdi:lightning-bolt" class="w-6 h-6 text-purple-600" />
                </div>
                <h2 class="text-xl font-bold text-gray-800">Acciones</h2>
              </div>

              <div class="space-y-3">
                <!-- Editar Perfil -->
                <NuxtLink 
                  to="/perfil/settings" 
                  class="flex items-center gap-3 w-full px-5 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <Icon name="mdi:pencil-outline" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Editar Perfil</span>
                  <Icon name="mdi:chevron-right" class="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
                </NuxtLink>

                <!-- Cambiar Contraseña -->
                <button 
                  @click="() => router.push('/perfil/password')"
                  class="flex items-center gap-3 w-full px-5 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <Icon name="mdi:lock-reset" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Cambiar Contraseña</span>
                  <Icon name="mdi:chevron-right" class="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
                </button>

                <!-- Cerrar Sesión -->
                <button 
                  @click="handleLogout" 
                  class="flex items-center gap-3 w-full px-5 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <Icon name="heroicons-outline:logout" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Cerrar Sesión</span>
                  <Icon name="mdi:chevron-right" class="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <!-- Información Adicional -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-2 bg-indigo-200 rounded-lg">
                  <Icon name="mdi:information-outline" class="w-5 h-5 text-indigo-700" />
                </div>
                <h3 class="text-lg font-bold text-gray-800">Estado de Cuenta</h3>
              </div>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span class="text-sm text-gray-600">Perfil completado</span>
                  <span class="text-sm font-bold text-indigo-600">100%</span>
                </div>
                <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span class="text-sm text-gray-600">Último acceso</span>
                  <span class="text-sm font-bold text-gray-800">Hoy</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Footer Info -->
        <div class="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div class="flex items-center justify-center gap-2 text-gray-600">
            <Icon name="mdi:shield-check" class="w-5 h-5 text-green-600" />
            <p class="text-sm">Tu información está protegida y segura</p>
          </div>
        </div>

      </div>

      <!-- No Data State -->
      <div v-else class="max-w-md mx-auto mt-20">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
              <Icon name="mdi:account-off-outline" class="h-10 w-10 text-gray-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Sin datos de usuario</h3>
            <p class="text-gray-600 mb-6">No se encontró información de tu perfil</p>
            <NuxtLink 
              to="/login" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Icon name="mdi:login" class="w-5 h-5" />
              Iniciar sesión
            </NuxtLink>
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
const { data, pending, error } = useApi('/auth/profile', { 
  credentials: 'include' 
});

const handleLogout = async () => {
  try {
    await logout();
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    // Si hay error, forzar redirección
    router.push('/login');
  }
};
</script>