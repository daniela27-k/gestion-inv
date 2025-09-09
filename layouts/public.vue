<!-- layouts/public.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-primary-blanco border border-primary-verde shadow-md p-4 flex items-center justify-between">
      <!-- Botón menú -->
      <button class="text-gray-600 text-2xl md:hidden">
        <Icon name="mdi:menu" class="w-6 h-6" />
      </button>

     <!-- Logo -->
<div class="flex items-center gap-3 font-extrabold text-3xl">
  <Icon name="tabler:brand-nuxt" class="w-10 h-10 text-green-500 animate-bounce" />
  <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide hover:scale-105 transition-transform duration-300 ease-in-out">
    INVIGEX
  </span>
</div>


      <!-- Menú principal -->
      <nav class="hidden md:flex gap-6 items-center">
        <NuxtLink to="/nosotros" class="flex items-center gap-1 hover:text-blue-500">
          <button class="bg-purple-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-purple-600 transition-colors duration-300">Nosotros</button>
        </NuxtLink>
        <NuxtLink to="/login" class="flex items-center gap-1 hover:text-blue-500">
          <button class="bg-sky-400 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-sky-500 transition-colors duration-300">Iniciar Sesión</button>
        </NuxtLink>
        <NuxtLink to="/register" class="flex items-center gap-1 hover:text-blue-500">
          <button class="bg-rose-700 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-rose-800 transition-colors duration-300">Registrarse</button>

        </NuxtLink>
      </nav>
    </header>

    <!-- Contenido principal -->
    <main class="flex-1 p-6">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-500 text-center p-4 text-white text-xl">
      © 2025 - Mi Sitio
    </footer>
  </div>
</template>
