<!-- layouts/perfil.vue -->
<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white p-6 hidden md:block">
      <h2 class="text-lg font-semibold mb-6 flex items-center gap-2">
        <Icon name="mdi:account-circle-outline" class="w-6 h-6" /> Perfil
      </h2>
      <nav class="flex flex-col gap-4">
        <NuxtLink to="/perfil" class="flex items-center gap-2 hover:text-blue-400">
          <Icon name="tabler:dashboard" class="w-5 h-5" /> Dashboard
        </NuxtLink>
        <NuxtLink to="/perfil/settings" class="flex items-center gap-2 hover:text-blue-400">
          <Icon name="mdi:cog-outline" class="w-5 h-5" /> Ajustes
        </NuxtLink>
        <NuxtLink to="/logout" class="flex items-center gap-2 hover:text-blue-400">
          <Icon name="heroicons-outline:logout" class="w-5 h-5" /> Cerrar Sesión
        </NuxtLink>
      </nav>
    </aside>

    <!-- Contenido -->
    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</template>
