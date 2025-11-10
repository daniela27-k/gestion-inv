<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-4">
    <div class="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div class="flex flex-col md:flex-row-reverse">
        
        <!-- Sección de Registro (Izquierda en desktop) -->
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
            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Crea tu cuenta</h1>
            <p class="text-gray-600">Únete a la comunidad INVIGEX</p>
          </div>
        
          <form @submit.prevent="registro" class="space-y-4">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Nombre completo
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="mdi:account-outline" class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  v-model="nombre_completo"
                  type="text"
                  placeholder="Juan Pérez"
                  class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                  required
                />
              </div>
            </div>

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
                  placeholder="correo@misena.edu.co"
                  class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
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
                  class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                  required
                />
              </div>
            </div>

            <!-- Teléfono -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="mdi:phone-outline" class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  v-model="telefono"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                  required
                />
              </div>
            </div>

            <!-- Grid para Rol y Estado -->
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Rol de usuario -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Rol
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="mdi:shield-account-outline" class="w-5 h-5 text-gray-400" />
                  </div>
                  <select 
                    v-model="rol_usuario" 
                    class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Selecciona un rol</option>
                    <option value="USUARIO">Usuario</option>
                    <option value="INSTRUCTOR">Instructor</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Icon name="mdi:chevron-down" class="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <!-- Estado de usuario -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Estado
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="mdi:check-circle-outline" class="w-5 h-5 text-gray-400" />
                  </div>
                  <select 
                    v-model="estado_usuario" 
                    class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Selecciona estado</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Icon name="mdi:chevron-down" class="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón de Registro -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-emerald-400 disabled:to-emerald-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center mt-6"
            >
              <Icon v-if="loading" name="mdi:loading" class="w-5 h-5 animate-spin mr-2" />
              {{ loading ? 'Registrando...' : 'Crear Cuenta' }}
            </button>

            <!-- Mensaje de error -->
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start">
              <Icon name="mdi:alert-circle" class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span class="text-sm">{{ error }}</span>
            </div>

            <!-- Link a Login -->
            <p class="text-center text-gray-600 text-sm pt-4">
              ¿Ya tienes cuenta?
              <NuxtLink to="/login" class="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline ml-1">
                Inicia sesión
              </NuxtLink>
            </p>
          </form>
        </div>

        <!-- Sección de Bienvenida (Derecha en desktop) -->
        <div class="w-full md:w-1/2 relative bg-gradient-to-br from-teal-600 via-emerald-600 to-emerald-700 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center text-white overflow-hidden">
          <!-- Decorative elements -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-emerald-300 rounded-full blur-3xl"></div>
          </div>
          
          <!-- Contenido -->
          <div class="relative z-10 text-center">
            <div class="mb-8 inline-block">
              <div class="relative">
                <div class="absolute inset-0 bg-white rounded-full blur-2xl opacity-20"></div>
                <div class="relative w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                  <Icon name="mdi:clipboard-text-multiple" class="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <h2 class="text-3xl lg:text-4xl font-bold mb-4 tracking-wide">
              ¡Únete a INVIGEX!
            </h2>
            <p class="text-lg text-emerald-100 mb-8 max-w-md mx-auto leading-relaxed">
              Forma parte de la plataforma líder en gestión de inventarios para la comunidad SENA
            </p>

            <!-- Benefits list -->
            <div class="space-y-4 mb-8 text-left max-w-sm mx-auto">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="mdi:check-bold" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <div class="font-semibold mb-1">Control Total</div>
                  <div class="text-sm text-emerald-100">Gestiona tu inventario en tiempo real</div>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="mdi:check-bold" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <div class="font-semibold mb-1">Reportes Automáticos</div>
                  <div class="text-sm text-emerald-100">Genera estadísticas en segundos</div>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="mdi:check-bold" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <div class="font-semibold mb-1">Soporte 24/7</div>
                  <div class="text-sm text-emerald-100">Estamos aquí para ayudarte</div>
                </div>
              </div>
            </div>

            <NuxtLink 
              to="/login"
              class="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Ya Tengo Cuenta
              <Icon name="mdi:arrow-right" class="w-5 h-5" />
            </NuxtLink>

            <p class="text-emerald-200 text-sm mt-6">
              ✓ Gratis para siempre • ✓ Sin tarjeta de crédito
            </p>
          </div>

          <!-- Decorative icons -->
          <div class="absolute top-10 right-10 w-20 h-20 opacity-10">
            <Icon name="mdi:package" class="w-full h-full" />
          </div>
          <div class="absolute bottom-10 left-10 w-16 h-16 opacity-10">
            <Icon name="mdi:chart-bar" class="w-full h-full" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

definePageMeta({ layout: 'public' });

const nombre_completo = ref('');
const email = ref('');
const password = ref('');
const telefono = ref('');
const rol_usuario = ref('');
const estado_usuario = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();
const { register } = useAuth();

async function registro() {
  error.value = '';
  loading.value = true;
  
  try {
    if (!nombre_completo.value || !email.value || !password.value || !telefono.value || !rol_usuario.value || !estado_usuario.value) {
      error.value = 'Por favor, completa todos los campos';
      return;
    }

    await register({
      nombre_completo: nombre_completo.value,
      email: email.value,
      password: password.value,
      telefono: telefono.value,
      rol_usuario: rol_usuario.value,
      estado_usuario: estado_usuario.value
    });

    await router.push('/perfil');
    
  } catch (err) {
    console.error('Error durante el registro:', err);
    error.value = err.message || 'Error durante el registro. Inténtalo de nuevo.';
  } finally {
    loading.value = false;
  }
}
</script>