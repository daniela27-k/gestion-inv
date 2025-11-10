<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-emerald-50">
    <!-- Header con navegación -->
    <header class="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-emerald-100">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <div class="absolute inset-0 bg-emerald-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div class="relative bg-gradient-to-br from-emerald-600 to-emerald-700 p-2.5 rounded-xl">
                <Icon name="mdi:clipboard-text" class="w-7 h-7 text-white" />
              </div>
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              INVIGEX
            </span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-8">
            <a href="/#features" class="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Características</a>
            <a href="/#process" class="text-gray-700 hover:text-emerald-600 font-medium transition-colors">¿Cómo funciona?</a>
            <a href="/#testimonials" class="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Testimonios</a>
            <NuxtLink to="/nosotros" class="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Nosotros</NuxtLink>
          </div>

          <!-- Auth Buttons -->
          <div class="hidden lg:flex items-center space-x-4">
            <NuxtLink to="/login" class="px-5 py-2.5 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
              Iniciar Sesión
            </NuxtLink>
            <NuxtLink to="/register" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              Registrarse
            </NuxtLink>
          </div>

          <!-- Mobile menu button -->
          <button @click="toggleMenu" class="lg:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors">
            <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div v-show="isMenuOpen" class="lg:hidden pb-4 space-y-2">
          <a href="/#features" @click="toggleMenu" class="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">Características</a>
          <a href="/#process" @click="toggleMenu" class="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">¿Cómo funciona?</a>
          <a href="/#testimonials" @click="toggleMenu" class="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">Testimonios</a>
          <NuxtLink to="/nosotros" @click="toggleMenu" class="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">Nosotros</NuxtLink>
          <div class="pt-2 space-y-2">
            <NuxtLink to="/login" class="block px-4 py-2 text-emerald-600 font-semibold text-center border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
              Iniciar Sesión
            </NuxtLink>
            <NuxtLink to="/register" class="block px-4 py-2 bg-emerald-600 text-white font-semibold text-center rounded-lg hover:bg-emerald-700 transition-colors">
              Registrarse
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Contenido de la página -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <div class="bg-gradient-to-br from-emerald-600 to-emerald-700 p-2 rounded-lg">
                <Icon name="mdi:clipboard-text" class="w-6 h-6 text-white" />
              </div>
              <span class="text-xl font-bold text-white">INVIGEX</span>
            </div>
            <p class="text-gray-400 leading-relaxed mb-4">
              Plataforma de gestión de inventarios diseñada para la comunidad SENA. Simplifica, organiza y optimiza tus recursos educativos.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
                <Icon name="mdi:facebook" class="w-5 h-5" />
              </a>
              <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
                <Icon name="mdi:twitter" class="w-5 h-5" />
              </a>
              <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors">
                <Icon name="mdi:linkedin" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-white font-semibold mb-4">Navegación</h4>
            <ul class="space-y-2">
              <li><a href="/#features" class="hover:text-emerald-400 transition-colors">Características</a></li>
              <li><a href="/#process" class="hover:text-emerald-400 transition-colors">Cómo Funciona</a></li>
              <li><a href="/#testimonials" class="hover:text-emerald-400 transition-colors">Testimonios</a></li>
              <li><NuxtLink to="/nosotros" class="hover:text-emerald-400 transition-colors">Nosotros</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-white font-semibold mb-4">Soporte</h4>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-emerald-400 transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" class="hover:text-emerald-400 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" class="hover:text-emerald-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 INVIGEX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>