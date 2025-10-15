<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header
    <header class="bg-white shadow-md sticky top-0 z-50 py-4">
      <nav class="max-w-6xl mx-auto px-5 flex justify-between items-center">
        <a href="#" class="flex items-center">
          <!-- Logo 
      <div class="flex items-center gap-3 font-extrabold text-3xl">
        <Icon name="tabler:brand-nuxt" class="w-10 h-10 text-green-500 animate-bounce" />
        <span
          class="bg-gradient-to-r from-green-600 via-black-700 to-green-800 bg-clip-text text-transparent drop-shadow-lg tracking-wide hover:scale-105 transition-transform duration-300 ease-in-out">
          INVIGEX
        </span>
      </div>
        </a>
        
        <div :class="`lg:flex items-center gap-8 ${isMenuOpen ? 'flex' : 'hidden'} lg:static absolute top-20 left-0 w-full lg:w-auto bg-white lg:bg-transparent flex-col lg:flex-row p-5 lg:p-0 shadow-lg lg:shadow-none`">
          <ul class="flex flex-col lg:flex-row gap-8 lg:gap-8 text-center lg:text-left">
            <li><a href="#features" class="text-gray-700 font-medium hover:text-slate-400 transition-colors">Beneficios</a></li>
            <li><a href="#process" class="text-gray-700 font-medium hover:text-slate-400 transition-colors">¿Cómo funciona?</a></li>
            <li><a href="#testimonials" class="text-gray-700 font-medium hover:text-slate-400 transition-colors">Comentarios</a></li>
            <li><a href="#contact" class="text-gray-700 font-medium hover:text-slate-400 transition-colors">Soporte</a></li>
          </ul>
          <div class="flex flex-col lg:flex-row gap-4 lg:gap-4 mt-5 lg:mt-0">
            <a href="login" class="px-6 py-3 border-2 border-green-600 text-black-100 rounded hover:bg-green-600 hover:text-white transition-all">Inicia Sesión</a>
            <a href="#" class="px-6 py-3 border-2 border-green-600 text-black-100 rounded hover:bg-green-600 hover:text-white transition-all">Registrarse</a>
          </div>
        </div>
        
        <button 
          class="lg:hidden text-2xl"
          @click="toggleMenu"
        >
          <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </nav>
    </header> -->

    <main>
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-indigo-500 to-sky-400 text-white py-20 min-h-[90vh] flex items-center">
        <div class="max-w-6xl mx-auto px-5 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div class="lg:w-1/2 text-center lg:text-left">
            <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5">
              Gestión de Inventarios SENA
            </h1>
            <p class="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
              Controla, gestiona y optimiza los recursos de tus proyectos formativos y unidades productivas y diseñado para la comunidad SENA.
            </p>
            <!-- <p href="#" class="inline-block px-8 py-4 bg-purple-700 text-white rounded-lg text-lg font-semibold">
              Empieza a Gestionar Ahora
            </p> -->
          </div>
          <div class="lg:w-1/2 flex justify-center bg-gestion rounded-xl">
            <div class="w-full max-w-md h-64 bg-white bg-opacity-20 rounded-lg shadow-2xl animate-pulse flex items-center justify-center">
              <!-- <span class="text-2xl font-semibold">INVIGEX</span> -->
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section 
        id="features" 
        :class="`py-25 transition-all duration-800 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`"
      >
        <div class="max-w-6xl mx-auto px-5">
          <div class="text-center mb-15">
            <h2 class="text-3xl lg:text-4xl font-bold mb-3">
              Transforma la Gestión de tu Inventario
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre las herramientas que te ayudarán a tener un control total y eficiente.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="bg-white p-10 rounded-lg text-center shadow-md hover:-translate-y-3 hover:shadow-xl transition-all duration-300">
              <div class="text-5xl text-pink-500 mb-5">
                <i class="fas fa-boxes-stacked"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4">Control Total de Stock</h3>
              <p class="text-gray-600">
                Visualiza en tiempo real las entradas, salidas y existencias de todos tus productos y materiales.
              </p>
            </div>
            
            <div class="bg-white p-10 rounded-lg text-center shadow-md hover:-translate-y-3 hover:shadow-xl transition-all duration-300">
              <div class="text-5xl text-pink-500 mb-5">
                <i class="fas fa-chart-pie"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4">Reportes y Estadísticas</h3>
              <p class="text-gray-600">
                Genera informes automáticos para tomar decisiones basadas en datos y optimizar tus recursos.
              </p>
            </div>
            
            <div class="bg-white p-10 rounded-lg text-center shadow-md hover:-translate-y-3 hover:shadow-xl transition-all duration-300">
              <div class="text-5xl text-pink-500 mb-5">
                <i class="fas fa-bell"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4">Alertas Inteligentes</h3>
              <p class="text-gray-600">
                Configura notificaciones para niveles bajos de stock y nunca te quedes sin insumos para tus proyectos.
              </p>
            </div>
            
            <div class="bg-white p-10 rounded-lg text-center shadow-md hover:-translate-y-3 hover:shadow-xl transition-all duration-300">
              <div class="text-5xl text-pink-500 mb-5">
                <i class="fas fa-users"></i>
              </div>
              <h3 class="text-xl font-semibold mb-4">Gestión de Usuarios</h3>
              <p class="text-gray-600">
                Asigna permisos a los miembros de manera fácil y segura.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section 
        id="process" 
        :class="`py-25 bg-white transition-all duration-800 ${isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`"
      >
        <div class="max-w-4xl mx-auto px-5">
          <div class="text-center mb-15">
            <h2 class="text-3xl lg:text-4xl font-bold mb-3">
              Empieza en Menos de 5 Minutos
            </h2>
            <p class="text-lg text-gray-600">
              Nuestro sistema está diseñado para ser intuitivo y fácil de usar desde el primer día.
            </p>
          </div>
          
          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 hidden lg:block"></div>
            
            <div class="space-y-12">
              <div class="flex items-start relative">
                <div class="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10 border-4 border-white shadow-lg">
                  1
                </div>
                <div class="ml-8 flex-1">
                  <h3 class="text-xl font-semibold mb-2">Crea tu Cuenta</h3>
                  <p class="text-gray-600">
                    Regístrate con tu correo institucional @misena.edu.co y obtén acceso inmediato.
                  </p>
                </div>
              </div>
              
              <div class="flex items-start relative">
                <div class="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10 border-4 border-white shadow-lg">
                  2
                </div>
                <div class="ml-8 flex-1">
                  <h3 class="text-xl font-semibold mb-2">Carga tu Inventario</h3>
                  <p class="text-gray-600">
                    Importa tus productos y materiales fácilmente desde una plantilla de Excel o añádelos manualmente.
                  </p>
                </div>
              </div>
              
              <div class="flex items-start relative">
                <div class="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10 border-4 border-white shadow-lg">
                  3
                </div>
                <div class="ml-8 flex-1">
                  <h3 class="text-xl font-semibold mb-2">¡Listo para Gestionar!</h3>
                  <p class="text-gray-600">
                    Empieza a registrar movimientos, generar reportes y a tener el control total de tu inventario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section 
        id="testimonials" 
        :class="`py-25 transition-all duration-800 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`"
      >
        <div class="max-w-6xl mx-auto px-5">
          <div class="text-center mb-15">
            <h2 class="text-3xl lg:text-4xl font-bold mb-3">
              Lo que dicen nuestros usuarios
            </h2>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <p class="italic text-gray-700 mb-5 text-lg leading-relaxed">
                "Esta herramienta ha simplificado por completo la gestión de nuestro proyecto. Ahora sabemos exactamente qué tenemos y qué necesitamos. ¡Imprescindible!"
              </p>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <strong class="block text-gray-900">Rafael Petro Madera</strong>
                  <span class="text-gray-600 text-sm">Líder de Proyecto, TecnoADSO</span>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-8 rounded-lg shadow-md">
              <p class="italic text-gray-700 mb-5 text-lg leading-relaxed">
                "La facilidad para generar reportes nos ha ahorrado horas de trabajo. Es la solución perfecta para las unidades productivas del SENA."
              </p>
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <strong class="block text-gray-900">Aly Culchac</strong>
                  <span class="text-gray-600 text-sm">Instructor, Centro de Diseño y Programación</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section 
        id="contact" 
        :class="`py-20 bg-purple-600 text-white text-center transition-all duration-800 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`"
      >
        <div class="max-w-4xl mx-auto px-5">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">
            ¿Listo para tomar el control de tu inventario?
          </h2>
          <p class="text-lg mb-8 opacity-90">
            Únete a cientos de equipos del SENA que ya están optimizando sus recursos.
          </p>
          <a href="#" class="inline-block px-8 py-4 bg-pink-500 text-white rounded-lg text-lg font-semibold hover:bg-pink-600 hover:-translate-y-1 transition-all duration-300">
            Crear Mi Cuenta Ahora
          </a>
        </div>
      </section>
    </main>

    <!-- Footer
    <footer class="bg-gray-800 text-gray-300 pt-15">
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
              <li><a href="#features" class="hover:text-pink-500 transition-colors">Beneficios</a></li>
              <li><a href="#process" class="hover:text-pink-500 transition-colors">Proceso</a></li>
              <li><a href="#testimonials" class="hover:text-pink-500 transition-colors">Comentarios</a></li>
            </ul>
          </div>
          
          <div class="text-center">
            <h4 class="text-xl text-white mb-5">Soporte</h4>
            <ul class="space-y-3 inline-block text-left">
              <li><a href="#" class="hover:text-pink-500 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" class="hover:text-pink-500 transition-colors">Centro de Ayuda</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-700 py-5 text-center text-sm">
          <p>&copy; 2025 Inventario SENA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
definePageMeta({
  layout: 'public'
})

// Estados reactivos
const isMenuOpen = ref(false)
const isVisible = ref({})

// Métodos
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Observador de scroll para animaciones
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isVisible.value[entry.target.id] = true
        }
      })
    },
    { threshold: 0.2 }
  )

  const sections = document.querySelectorAll('section[id]')
  sections.forEach(section => {
    observer.observe(section)
  })

  // Limpiar observador al desmontar
  return () => observer.disconnect()
})
</script>

<style>
/* Clases personalizadas de Tailwind si necesitas alguna */
.py-25 {
  padding-top: 6.25rem;
  padding-bottom: 6.25rem;
}

.pt-15 {
  padding-top: 3.75rem;
}

.mb-15 {
  margin-bottom: 3.75rem;
}
</style>
























