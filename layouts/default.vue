<!-- layouts/default.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <aside class="w-64 bg-white shadow-lg flex flex-col">
      <div class="p-6 text-xl font-bold border-b text-center text-blue-700">
        PANEL DE ADMINISTRACIÓN
      </div>
      <nav class="p-4 space-y-2 flex-1">
        <NuxtLink to="/usuario" class="block p-2 rounded hover:bg-blue-100">👤 Usuario</NuxtLink>
        <NuxtLink to="/asignacion" class="block p-2 rounded hover:bg-blue-100">📌 Asignación de Elemento</NuxtLink>
        <NuxtLink to="/elemento" class="block p-2 rounded hover:bg-blue-100">📦 Elemento</NuxtLink>
        <NuxtLink to="/ambiente" class="block p-2 rounded hover:bg-blue-100">🏢 Ambiente</NuxtLink>
        <NuxtLink to="/tipo-elemento" class="block p-2 rounded hover:bg-blue-100">📝 Tipo de Elemento</NuxtLink>
        <NuxtLink to="/estado-elemento" class="block p-2 rounded hover:bg-blue-100">⚙️ Estado de Elemento</NuxtLink>
      </nav>
    </aside>
    <main class="flex-1 p-8 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
