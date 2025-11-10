<!-- pages/test-navigation.vue -->
<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">🔍 Diagnóstico de Navegación</h1>
    
    <div class="bg-white rounded-lg shadow p-6 mb-4">
      <h2 class="text-xl font-semibold mb-3">Información del Usuario</h2>
      <pre class="bg-gray-800 text-green-400 p-4 rounded overflow-auto">{{ user }}</pre>
    </div>
    
    <div class="bg-white rounded-lg shadow p-6 mb-4">
      <h2 class="text-xl font-semibold mb-3">Rol del Usuario</h2>
      <p class="text-2xl font-bold text-blue-600">{{ userRole }}</p>
    </div>
    
    <div class="bg-white rounded-lg shadow p-6 mb-4">
      <h2 class="text-xl font-semibold mb-3">Menú Items Visibles</h2>
      <div class="space-y-2">
        <div v-for="item in menuItems" :key="item.id" class="border-l-4 border-blue-500 pl-4 py-2">
          <p class="font-semibold">{{ item.name }}</p>
          <p class="text-sm text-gray-600">Path: {{ item.path }}</p>
          <NuxtLink :to="item.path" class="text-blue-600 hover:underline text-sm">
            → Ir a esta ruta
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-3">Navegación Manual</h2>
      <div class="flex gap-2">
        <button @click="goTo('/perfil')" class="bg-blue-500 text-white px-4 py-2 rounded">
          Ir a Perfil
        </button>
        <button @click="goTo('/inventario')" class="bg-green-500 text-white px-4 py-2 rounded">
          Ir a Inventario
        </button>
        <button @click="goTo('/inventario/crear')" class="bg-purple-500 text-white px-4 py-2 rounded">
          Crear Inventario
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import { getMenuItemsForRol } from '~/utils/rolConfig';

const router = useRouter();
const { user } = useAuth();

const userRole = computed(() => user.value?.rol_usuario || 'USUARIO');
const menuItems = computed(() => getMenuItemsForRol(userRole.value));

const goTo = (path) => {
  console.log('🚀 Navegando a:', path);
  router.push(path);
};
</script>