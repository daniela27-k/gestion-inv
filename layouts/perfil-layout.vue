<!-- pages/perfil.vue -->
<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Perfil del Usuario</h1>
    
    <div v-if="pending" class="text-center text-gray-500">
      <p>Cargando el perfil...</p>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500">
      <p>Error: {{ error }}</p>
      <p class="mt-2">
        <NuxtLink to="/login" class="text-blue-500 hover:underline">
          Inicia sesión
        </NuxtLink>
      </p>
    </div>
    
    <div v-else-if="data" class="space-y-4">
      <div class="p-4 bg-gray-50 rounded-lg">
        <p class="mb-2"><strong>Nombre:</strong> {{ data.nombre_completo }}</p>
        <p class="mb-2"><strong>Email:</strong> {{ data.email }}</p>
        <p class="mb-2"><strong>Teléfono:</strong> {{ data.telefono }}</p>
        <p class="mb-2"><strong>Rol:</strong> {{ data.rol_usuario }}</p>
        <p class="mb-2"><strong>Estado:</strong> {{ data.estado_usuario }}</p>
      </div>
      
      <div class="p-4 border-t border-gray-400">
        <button 
          @click="handleLogout" 
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
    
    <div v-else class="text-center text-gray-500">
      <p>No se encontraron datos de usuario.</p>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import { useApi } from '~/composables/useApi';

definePageMeta({
  layout: 'profile-layout'
});

const { logout } = useAuth();
const { data, pending, error } = useApi('/auth/profile', { 
  credentials: 'include' 
});

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>