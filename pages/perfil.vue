<!-- // pages/perfil.vue
<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Perfil del Usuario</h1>
    <div v-if="pending" class="text-center text-gray-500">
      <p>Cargando el perfil...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>Error: {{ error }}</p>
      <p class="mt-2"><a href="/login" class="text-blue-500 hover:underline">Inicia sesión</a></p>
    </div>
    <div v-else-if="currentUser" class="space-y-4">
      <div class="p-4 bg-gray-50 rounded-lg">
        <p><strong>Nombre:</strong> {{ currentUser.nombre_completo }}</p>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <p><strong>Teléfono:</strong> {{ currentUser.telefono }}</p>
        <p><strong>Rol:</strong> {{ currentUser.rol_usuario }}</p>
        <p><strong>Estado:</strong> {{ currentUser.estado_usuario }}</p>
      </div>
      <div class="p-4 border-t border-gray-400">
        <button @click="handleLogout" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Cerrar Sesión</button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      <p>No se encontraron datos de usuario.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useApi } from '~/composables/useApi';

definePageMeta({
    layout: 'profile-layout'
})

const { user, logout } = useAuth();
const currentUser = ref(null);
const { data, pending, error } = useApi('/auth/profile', { credentials: 'include' });

watchEffect(() => {
  if (data.value) {
    currentUser.value = data.value;
  }
});

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script> -->

<!-- pages/perfil.vue -->
<template>
  <div class="max-w-4xl mx-auto mt-10 p-6">
    <!-- Encabezado -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
      <p class="text-gray-600">Información de tu cuenta</p>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="bg-white rounded-lg shadow-md p-8 text-center">
      <Icon name="mdi:loading" class="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
      <p class="text-gray-600">Cargando tu perfil...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-white rounded-lg shadow-md p-8">
      <div class="text-center">
        <Icon name="mdi:alert-circle-outline" class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Error al cargar el perfil</h2>
        <p class="text-red-500 mb-4">{{ error }}</p>
        <NuxtLink 
          to="/login" 
          class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Iniciar sesión
        </NuxtLink>
      </div>
    </div>

    <!-- Datos del perfil -->
    <div v-else-if="data" class="space-y-6">
      <!-- Información personal -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center mb-6">
          <Icon name="mdi:account-circle" class="w-8 h-8 text-blue-600 mr-3" />
          <h2 class="text-2xl font-semibold text-gray-800">Información Personal</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nombre -->
          <div class="flex items-start">
            <Icon name="mdi:account-outline" class="w-5 h-5 text-gray-500 mr-3 mt-1" />
            <div>
              <p class="text-sm text-gray-500 mb-1">Nombre completo</p>
              <p class="text-lg font-medium text-gray-800">{{ data.nombre_completo }}</p>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start">
            <Icon name="mdi:email-outline" class="w-5 h-5 text-gray-500 mr-3 mt-1" />
            <div>
              <p class="text-sm text-gray-500 mb-1">Correo electrónico</p>
              <p class="text-lg font-medium text-gray-800">{{ data.email }}</p>
            </div>
          </div>

          <!-- Teléfono -->
          <div class="flex items-start">
            <Icon name="mdi:phone-outline" class="w-5 h-5 text-gray-500 mr-3 mt-1" />
            <div>
              <p class="text-sm text-gray-500 mb-1">Teléfono</p>
              <p class="text-lg font-medium text-gray-800">{{ data.telefono }}</p>
            </div>
          </div>

          <!-- Rol -->
          <div class="flex items-start">
            <Icon name="mdi:shield-account-outline" class="w-5 h-5 text-gray-500 mr-3 mt-1" />
            <div>
              <p class="text-sm text-gray-500 mb-1">Rol</p>
              <span 
                class="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                :class="{
                  'bg-purple-100 text-purple-800': data.rol_usuario === 'ADMIN',
                  'bg-blue-100 text-blue-800': data.rol_usuario === 'INSTRUCTOR',
                  'bg-green-100 text-green-800': data.rol_usuario === 'USUARIO'
                }"
              >
                {{ data.rol_usuario }}
              </span>
            </div>
          </div>

          <!-- Estado -->
          <div class="flex items-start">
            <Icon name="mdi:checkbox-marked-circle-outline" class="w-5 h-5 text-gray-500 mr-3 mt-1" />
            <div>
              <p class="text-sm text-gray-500 mb-1">Estado</p>
              <span 
                class="inline-block px-3 py-1 rounded-full text-sm font-semibold"
                :class="{
                  'bg-green-100 text-green-800': data.estado_usuario === 'activo',
                  'bg-red-100 text-red-800': data.estado_usuario === 'inactivo'
                }"
              >
                {{ data.estado_usuario }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Acciones</h2>
        <div class="flex flex-wrap gap-4">
          <NuxtLink 
            to="/perfil/settings" 
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Icon name="mdi:cog-outline" class="w-5 h-5" />
            Editar perfil
          </NuxtLink>
          
          <button 
            @click="handleLogout" 
            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon name="heroicons-outline:logout" class="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>

    <!-- Sin datos -->
    <div v-else class="bg-white rounded-lg shadow-md p-8 text-center">
      <Icon name="mdi:account-off-outline" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-600 mb-4">No se encontraron datos de usuario.</p>
      <NuxtLink 
        to="/login" 
        class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Iniciar sesión
      </NuxtLink>
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
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    // Si hay error, forzar redirección
    router.push('/login');
  }
};
</script>