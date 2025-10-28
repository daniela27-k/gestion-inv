<!-- layouts/public.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-md sticky top-0 z-50 py-4">
      <nav class="max-w-6xl mx-auto px-5 flex justify-between items-center">
        <!-- <a href="#" class="flex items-center"> -->
          <!-- Logo -->
          <NuxtLink to="/">
      <div class="flex items-center gap-3 font-extrabold text-3xl">
        <!-- <Icon name="tabler:brand-nuxt" class="w-10 h-10 text-green-500 animate-bounce" /> -->
        <span
          class="bg-gradient-to-r from-green-600 via-black-700 to-green-800 bg-clip-text text-transparent drop-shadow-lg tracking-wide hover:scale-105 transition-transform duration-300 ease-in-out">
          INVIGEX
        </span>
      </div>
    </NuxtLink>
        <!-- </a> -->
        
        <div :class="`lg:flex items-center gap-8 lg:static absolute top-20 left-0 w-full lg:w-auto bg-white lg:bg-transparent flex-col lg:flex-row p-5 lg:p-0 shadow-lg lg:shadow-none`">
          <ul class="flex flex-col lg:flex-row gap-8 lg:gap-8 text-center lg:text-left">
            <li><a href="#features" class="text-gray-700 font-medium hover:text-slate-400 transition-colors">Beneficios</a></li>
            <li><a href="#process" class="text-gray-700 font-medium hover:text-slate-400 transition-colors">¿Cómo funciona?</a></li>
            <li><a href="#testimonials" class="text-gray-700 font-medium hover:text-slate-400 transition-colors">Comentarios</a></li>
            <li><a href="nosotros" class="text-gray-700 font-medium hover:text-slate-400 transition-colors">Nosotros</a></li>
          </ul>
          <div class="flex flex-col lg:flex-row gap-4 lg:gap-4 mt-5 lg:mt-0">
            <a href="login" class="px-6 py-3 border-2 border-green-600 text-black-100 rounded hover:bg-green-600 hover:text-white transition-all">Inicia Sesión</a>
            <a href="register" class="px-6 py-3 border-2 border-green-600 text-black-100 rounded hover:bg-green-600 hover:text-white transition-all">Registrarse</a>
          </div>
        </div>
        
        <button 
          class="lg:hidden text-2xl"
         
        >
          <!-- <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i> -->
        </button>
      </nav>
    </header>
   
    <!-- Contenido principal -->
    <main class="flex-1 p-6">
      <slot />
    </main>

     <!-- Footer -->
    <footer class="bg-stone-700 text-white pt-15">
      <div class="max-w-6xl mx-auto px-5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h4 class="text-xl text-white mb-5">Inventario SENA</h4>
            <p class="leading-relaxed">
              Una herramienta creada por y para la comunidad SENA.
            </p>
          </div>
          
          <div class="text-center">
            <h4 class="text-xl text-white mb-5">Navegación</h4>
            <ul class="space-y-3 inline-block text-left">
              <li><a href="#features" class="hover:text-green-500 transition-colors">Beneficios</a></li>
              <li><a href="#process" class="hover:text-green-500 transition-colors">Proceso</a></li>
              <li><a href="#testimonials" class="hover:text-green-500 transition-colors">Comentarios</a></li>
            </ul>
          </div>
          
          <div class="text-center">
            <h4 class="text-xl text-white mb-5">Soporte</h4>
            <ul class="space-y-3 inline-block text-left">
              <li><a href="#" class="hover:text-green-500 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" class="hover:text-green-500 transition-colors">Centro de Ayuda</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-700 py-5 text-center text-sm">
          <p>&copy; 2025 Inventario SENA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>

    <!-- Footer -->
    <!-- <footer class="bg-slate-500 text-center p-4 text-white text-xl">
      © 2025 - Mi Sitio
    </footer> -->
  </div>
</template>

