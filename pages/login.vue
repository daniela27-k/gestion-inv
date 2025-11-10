<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
    <div class="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div class="flex flex-col md:flex-row">
        
        <!-- Sección de Login (Izquierda) -->
        <div class="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
          <!-- Logo -->
          <div class="flex items-center space-x-3 mb-8">
            <div class="bg-gradient-to-br from-emerald-600 to-emerald-700 p-2.5 rounded-xl">
              <Icon name="mdi:clipboard-text" class="w-7 h-7 text-white" />
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
              INVIGEX
            </span>
          </div>

          <div class="mb-8">
            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">¡Bienvenido de nuevo!</h1>
            <p class="text-gray-600">Inicia sesión para gestionar tu inventario</p>
          </div>
        
          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="mdi:email-outline" class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  v-model="email"
                  type="email"
                  placeholder="tu@email.com"
                  class="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                  required
                />
              </div>
            </div>

            <!-- Contraseña -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="mdi:lock-outline" class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  class="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                  required
                />
              </div>
            </div>

            <!-- Recordarme y Olvidaste contraseña -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer" 
                />
                <span class="ml-2 text-gray-700 group-hover:text-emerald-600 transition-colors">Recordarme</span>
              </label>
              <a href="#" class="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <!-- Botón de Login -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-emerald-400 disabled:to-emerald-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            >
              <Icon v-if="loading" name="mdi:loading" class="w-5 h-5 animate-spin mr-2" />
              {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
            </button>

            <!-- Mensaje de error -->
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start">
              <Icon name="mdi:alert-circle" class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span class="text-sm">{{ error }}</span>
            </div>

            <!-- Divisor -->
            <div class="relative my-8">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-gray-500">O conecta con</span>
              </div>
            </div>

            <!-- Redes Sociales -->
            <div class="grid grid-cols-4 gap-3">
              <button type="button" class="p-3 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                <Icon name="mdi:facebook" class="w-6 h-6 text-gray-600 group-hover:text-emerald-600 mx-auto" />
              </button>
              <button type="button" class="p-3 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                <Icon name="mdi:twitter" class="w-6 h-6 text-gray-600 group-hover:text-emerald-600 mx-auto" />
              </button>
              <button type="button" class="p-3 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                <Icon name="mdi:github" class="w-6 h-6 text-gray-600 group-hover:text-emerald-600 mx-auto" />
              </button>
              <button type="button" class="p-3 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                <Icon name="mdi:linkedin" class="w-6 h-6 text-gray-600 group-hover:text-emerald-600 mx-auto" />
              </button>
            </div>

            <!-- Link a Registro -->
            <p class="text-center text-gray-600 text-sm pt-4">
              ¿No tienes cuenta?
              <NuxtLink to="/register" class="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline ml-1">
                Regístrate gratis
              </NuxtLink>
            </p>
          </form>
        </div>

        <!-- Sección de Bienvenida (Derecha) -->
        <div class="w-full md:w-1/2 relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center text-white overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-teal-300 rounded-full blur-3xl"></div>
          </div>
          
          <!-- Contenido -->
          <div class="relative z-10 text-center">
            <div class="mb-8 inline-block">
              <div class="relative">
                <div class="absolute inset-0 bg-white rounded-full blur-2xl opacity-20"></div>
                <div class="relative w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                  <Icon name="mdi:package-variant" class="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <h2 class="text-3xl lg:text-4xl font-bold mb-4 tracking-wide">
              Gestiona tu Inventario
            </h2>
            <p class="text-lg text-emerald-100 mb-8 max-w-md mx-auto leading-relaxed">
              Accede a herramientas poderosas para controlar y optimizar los recursos de tu salón de clases
            </p>

            <!-- Features list -->
            <div class="space-y-4 mb-8 text-left max-w-sm mx-auto">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:check" class="w-5 h-5 text-white" />
                </div>
                <span class="text-emerald-100">Control en tiempo real</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:check" class="w-5 h-5 text-white" />
                </div>
                <span class="text-emerald-100">Reportes automáticos</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:check" class="w-5 h-5 text-white" />
                </div>
                <span class="text-emerald-100">Alertas inteligentes</span>
              </div>
            </div>

            <NuxtLink 
              to="/register"
              class="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Crear Cuenta Gratis
              <Icon name="mdi:arrow-right" class="w-5 h-5" />
            </NuxtLink>

            <p class="text-emerald-200 text-sm mt-6">
              ✓ Sin tarjeta de crédito • ✓ Configuración en minutos
            </p>
          </div>

          <!-- Decorative image -->
          <div class="absolute bottom-0 right-0 w-32 h-32 opacity-10">
            <Icon name="mdi:chart-line" class="w-full h-full" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'public'
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const { login } = useAuth()

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    if (!email.value || !password.value) {
      error.value = 'Por favor, completa todos los campos'
      return
    }

    await login({
      email: email.value,
      password: password.value
    })

    await router.push('/perfil')
  } catch (err) {
    console.error('Error durante el login:', err)
    error.value = err.message || 'Error durante el inicio de sesión. Verifica tus credenciales.'
  } finally {
    loading.value = false
  }
}
</script>