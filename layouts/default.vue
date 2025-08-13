<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed z-30 inset-y-0 left-0 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static md:inset-auto',
      ]"
      aria-label="Sidebar"
    >
      <div class="h-16 flex items-center px-4 border-b">
        <slot name="logo">
          <h1 class="text-xl font-bold">Mi Panel</h1>
        </slot>
      </div>
      <nav class="p-4 space-y-1">
        <!-- Ejemplo de items -->
        <NuxtLink to="/" class="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</NuxtLink>
        <NuxtLink to="/inventario" class="block px-3 py-2 rounded hover:bg-gray-100">Inventario</NuxtLink>
        <NuxtLink to="/proveedores" class="block px-3 py-2 rounded hover:bg-gray-100">Proveedores</NuxtLink>
        <slot name="sidebar" />
      </nav>
    </aside>

    <!-- Overlay móvil -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/30 z-20 md:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Contenido -->
    <div class="flex-1 flex flex-col min-w-0 md:ml-64">
      <!-- Header -->
      <header class="h-16 bg-white border-b flex items-center justify-between px-4">
        <div class="flex items-center gap-2">
          <button
            class="md:hidden p-2 rounded hover:bg-gray-100"
            @click="sidebarOpen = !sidebarOpen"
            aria-label="Toggle sidebar"
          >
            <span class="block w-5 h-0.5 bg-gray-800 mb-1"></span>
            <span class="block w-5 h-0.5 bg-gray-800 mb-1"></span>
            <span class="block w-5 h-0.5 bg-gray-800"></span>
          </button>
          <slot name="title">
            <h2 class="text-lg font-semibold">Inicio</h2>
          </slot>
        </div>
        <div class="flex items-center gap-2">
          <slot name="actions">
            <button class="px-3 py-1.5 rounded border hover:bg-gray-50">Acción</button>
          </slot>
        </div>
      </header>

      <!-- Main -->
      <main class="p-4">
        <slot>
          <NuxtPage />
        </slot>
      </main>

      <!-- Footer -->
      <footer class="mt-auto p-4 text-xs text-gray-500">
        <slot name="footer">© {{ year }} — Tu Empresa</slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const sidebarOpen = ref(false)
const year = computed(() => new Date().getFullYear())
</script>
