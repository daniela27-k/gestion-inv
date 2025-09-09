<template>
  <div class="max-w-md mx-auto bg-primary-blanco shadow-lg rounded-xl p-8 mt-10">
    <h1 class="text-2xl font-bold text-center text-blue-600 mb-6">Iniciar Sesión</h1>
    
    <form class="space-y-5">
      <!-- Email -->
      <div>
        <label class="block text-gray-700 mb-1">Correo electrónico</label>
        <div class="flex items-center border rounded-lg px-3 py-2">
          <Icon name="mdi:email-outline" class="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            class="flex-1 outline-none"
          />
        </div>
      </div>

      <!-- Contraseña -->
      <div>
        <label class="block text-gray-700 mb-1">Contraseña</label>
        <div class="flex items-center border rounded-lg px-3 py-2">
          <Icon name="mdi:lock-outline" class="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="********"
            class="flex-1 outline-none"
          />
        </div>
      </div>

      <!-- Botón -->
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
      >
        Iniciar Sesión
      </button>

      <!-- Link a registro -->
      <p class="text-center text-gray-600 text-sm">
        ¿No tienes cuenta?
        <NuxtLink to="/register" class="text-blue-500 hover:underline">
          Regístrate
        </NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'public'
})
</script>
