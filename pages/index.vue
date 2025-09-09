<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md hidden md:block">
      <div class="p-6 text-center border-b">
        <h1 class="text-xl font-bold  flex items-center justify-center gap-2">
          <Icon name="mdi:view-dashboard-outline" class="w-6 h-6" />
          PANEL DE ADMINISTRACIÓN
        </h1>
      </div>
      <nav class="p-4">
        <ul class="space-y-4">
          <li>
            <NuxtLink to="/perfil" class="flex items-center gap-2 text-gray-700 hover:text-blue-500">
              <Icon name="tabler:dashboard" class="w-5 h-5" /> Dashboard
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/perfil/settings" class="flex items-center gap-2 text-gray-700 hover:text-blue-500">
              <Icon name="mdi:cog-outline" class="w-5 h-5" /> Ajustes
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <div class="flex-1 p-6">
      <!-- Header responsive -->
      <div class="md:hidden flex justify-between items-center mb-4">
        <button class="text-gray-600 text-2xl">
          <Icon name="mdi:menu" class="w-6 h-6" />
        </button>
        <span class="text-blue-600 font-bold">Panel</span>
      </div>

      <!-- Formulario -->
      <section class="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Registro de Estado de Elemento</h2>
        <RegistroEstadoElemento />
      </section>

      <!-- Tabla -->
      <section class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-lg font-semibold mb-4">Elementos Registrados</h2>
        <TablaElementos />
      </section>
    </div>
  </div>
</template>
<script setup>  
definePageMeta({
  layout: 'public'
  })
</script>

