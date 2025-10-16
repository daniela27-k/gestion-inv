<!-- //desde aqui comience a editar lo nuevo -->
 <template>
  <div class="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
    <h1 class="text-2xl font-bold text-center text-black mb-6">Crear Cuenta</h1>

    <!-- formulario -->
    <form class="space-y-5" @submit.prevent="registro">
      <!-- Nombre -->
      <div>
        <label class="block text-gray-700 mb-1">Nombre</label>
        <div class="flex items-center border rounded-lg px-3 py-2">
          <input type="text" placeholder="Tu nombre" class="flex-1 outline-none" v-model="nombre_completo" />
        </div>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-gray-700 mb-1">Correo electronico</label>
        <div class="flex items-center border rounded-lg px-3 py-2">
          <input type="email" placeholder="correo@ejemplo.com" class="flex-1 outline-none" v-model="email" />
        </div>
      </div>

      <!-- Contraseña -->
      <div>
        <label class="block text-gray-700 mb-1">Contraseña</label>
        <div class="flex items-center border rounded-lg px-3 py-2">
          <input type="password" placeholder="********" class="flex-1 outline-none" v-model="password" />
        </div>
      </div>

      <!-- telefono -->
      <div>
        <label class="block text-gray-700 mb-1">Telefono</label>
        <div class="flex items-center border rounded-lg px-3 py-2">
          <input type="tel" placeholder="telefono" class="flex-1 outline-none" v-model="telefono" />
        </div>
      </div>

      <!-- rol_usuario-->
      <div>
        <label class="block text-gray-700 mb-1">Seleccione su rol</label>
        <select v-model="rol_usuario" class="w-full border rounded-lg px-3 py-2">
          <option value="">-- Selecciona un rol --</option>
          <option value="USUARIO">Usuario</option>
          <option value="INSTRUCTOR">Instructor</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>

      <!-- estado_usuario-->
      <div>
        <label class="block text-gray-700 mb-1">Seleccione su estado</label>
        <select v-model="estado_usuario" class="w-full border rounded-lg px-3 py-2">
          <option value="">-- Selecciona un estado --</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <!-- Botón -->
      <button type="submit"
        class="w-full bg-gradient-to-t from-emerald-600 to-green-400 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
        Registrarse
      </button>

      <!-- Link a login -->
      <p class="text-center text-gray-600 text-sm">
        ¿Ya tienes cuenta?
        <NuxtLink to="/login" class="text-green-500 hover:underline">
          Inicia sesión
        </NuxtLink>
      </p>
    </form>
    
    <!-- ✅ Mostrar error si existe -->
    <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
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
const router = useRouter();
const { register } = useAuth();

async function registro() {
  error.value = '';
  
  try {
    // ✅ Validación básica
    if (!nombre_completo.value || !email.value || !password.value || !telefono.value || !rol_usuario.value || !estado_usuario.value) {
      error.value = 'Por favor, completa todos los campos';
      return;
    }

    // ✅ Pasar todos los valores correctamente (con .value)
    await register({
      nombre_completo: nombre_completo.value,
      email: email.value,
      password: password.value,
      telefono: telefono.value,
      rol: rol_usuario.value, // El backend espera 'rol' en el DTO
      estado: estado_usuario.value // El backend espera 'estado' en el DTO
    });

    // ✅ El backend ya hace login automático, redirigir al dashboard
    await router.push('/perfil');
    
  } catch (err) {
    console.error('Error durante el registro:', err);
    // ✅ Mostrar mensaje de error más amigable
    error.value = err.message || 'Error durante el registro. Inténtalo de nuevo.';
  }
}
</script>