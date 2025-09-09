<template>
  <div class="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
    <h1 class="text-2xl font-bold text-center text-blue-600 mb-6">Crear Cuenta</h1>
    
    <form class="space-y-5">
      <!-- Nombre -->
      <div>
        <label class="block text-gray-700 mb-1">Nombre</label>
        <div class="flex items-center border rounded-lg px-3 py-2">
          <Icon name="mdi:account-outline" class="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Tu nombre"
            class="flex-1 outline-none"
          />
        </div>
      </div>

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
        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
      >
        Registrarse
      </button>

      <!-- Link a login -->
      <p class="text-center text-gray-600 text-sm">
        ¿Ya tienes cuenta?
        <NuxtLink to="/login" class="text-blue-500 hover:underline">
          Inicia sesión
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
