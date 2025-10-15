<template>
  <div class="max-w-md mx-auto bg-primary-blanco shadow-lg rounded-xl p-8 mt-10">
    <h1 class="text-2xl font-bold text-center text-blue-600 mb-6">Iniciar Sesión</h1>
    
    <form class="space-y-5" @submit.prevent="handleLogin">
      <!-- Email -->
      <div>
        <label class="block text-gray-700 mb-1">Correo electrónico</label>
        <div class="flex items-center border rounded-lg px-3 py-2">
          <Icon name="mdi:email-outline" class="w-5 h-5 text-gray-500 mr-2" />
          <input
            v-model="email"
            type="email"
            placeholder="correo@ejemplo.com"
            class="flex-1 outline-none"
            required
          />
        </div>
      </div>

      <!-- Contraseña -->
      <div>
        <label class="block text-gray-700 mb-1">Contraseña</label>
        <div class="flex items-center border rounded-lg px-3 py-2">
          <Icon name="mdi:lock-outline" class="w-5 h-5 text-gray-500 mr-2" />
          <input
            v-model="password"
            type="password"
            placeholder="********"
            class="flex-1 outline-none"
            required
          />
        </div>
      </div>

      <!-- Botón -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center"
      >
        <Icon v-if="loading" name="mdi:loading" class="w-5 h-5 animate-spin mr-2" />
        {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
      </button>

      <!-- Link a registro -->
      <p class="text-center text-gray-600 text-sm">
        ¿No tienes cuenta?
        <NuxtLink to="/register" class="text-blue-500 hover:underline">
          Regístrate
        </NuxtLink>
      </p>
    </form>

    <!-- Mostrar error si existe -->
    <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
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

    // Redirigir al dashboard después del login exitoso
    await router.push('/prueba')
  } catch (err) {
    console.error('Error durante el login:', err)
    error.value = err.message || 'Error durante el inicio de sesión. Verifica tus credenciales.'
  } finally {
    loading.value = false
  }
}
</script>
