<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white py-24">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            Conoce Nuestra Historia
          </div>
          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            Sobre <span class="text-emerald-200">INVIGEX</span>
          </h1>
          <p class="text-xl text-emerald-100 leading-relaxed">
            Innovación y excelencia en gestión de inventarios para la comunidad educativa SENA
          </p>
        </div>
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" class="w-full h-16 fill-current text-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>

    <!-- Quiénes Somos -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-gray-900 mb-6">
              ¿Quiénes <span class="text-emerald-600">Somos?</span>
            </h2>
            <p class="text-lg text-gray-600 mb-4 leading-relaxed">
              INVIGEX es una plataforma innovadora diseñada específicamente para transformar la gestión de inventarios en instituciones educativas del SENA.
            </p>
            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
              Creada por y para instructores, combinamos tecnología de vanguardia con una interfaz intuitiva que simplifica el control de recursos, materiales y equipos en proyectos formativos.
            </p>
            <div class="flex gap-4">
              <NuxtLink to="/register" class="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all">
                Crear Cuenta
              </NuxtLink>
              <NuxtLink to="/login" class="px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all">
                Iniciar Sesión
              </NuxtLink>
            </div>
          </div>
          
          <div class="relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                alt="Equipo trabajando" 
                class="w-full h-auto"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
            </div>
            
            <!-- Stats floating cards -->
            <div class="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-2xl p-6">
              <div class="text-3xl font-bold text-emerald-600 mb-1">500+</div>
              <div class="text-sm text-gray-600">Usuarios Activos</div>
            </div>
            <div class="absolute -top-8 -right-8 bg-white rounded-xl shadow-2xl p-6">
              <div class="text-3xl font-bold text-teal-600 mb-1">99%</div>
              <div class="text-sm text-gray-600">Satisfacción</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestros Valores -->
    <section class="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Nuestros <span class="text-emerald-600">Valores</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Los principios que guían cada decisión en INVIGEX
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-emerald-100 hover:border-emerald-300">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Icon name="mdi:lightbulb-on" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Innovación</h3>
            <p class="text-gray-600 leading-relaxed">
              Buscamos constantemente nuevas formas de mejorar y evolucionar nuestras soluciones.
            </p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-teal-100 hover:border-teal-300">
            <div class="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Icon name="mdi:account-group" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Colaboración</h3>
            <p class="text-gray-600 leading-relaxed">
              Creemos en el poder del trabajo en equipo y la comunicación efectiva.
            </p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-emerald-100 hover:border-emerald-300">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Icon name="mdi:star-circle" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Excelencia</h3>
            <p class="text-gray-600 leading-relaxed">
              Nos comprometemos a ofrecer la más alta calidad en cada servicio.
            </p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-teal-100 hover:border-teal-300">
            <div class="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Icon name="mdi:shield-check" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Confianza</h3>
            <p class="text-gray-600 leading-relaxed">
              La seguridad y privacidad de tus datos son nuestra máxima prioridad.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Por Qué Elegir INVIGEX -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            ¿Por Qué Elegir <span class="text-emerald-600">INVIGEX?</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Ventajas que nos hacen la mejor opción para tu institución
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Benefit 1 -->
          <div class="relative bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-emerald-100">
            <div class="absolute top-6 right-6 w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
              1
            </div>
            <div class="mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                <Icon name="mdi:speedometer" class="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Fácil de Usar</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Interfaz intuitiva diseñada para que cualquier instructor pueda empezar en minutos.
            </p>
            <ul class="space-y-2">
              <li class="flex items-center text-gray-600">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-600 mr-2" />
                Dashboard personalizable
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-600 mr-2" />
                Navegación intuitiva
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-600 mr-2" />
                Guía paso a paso
              </li>
            </ul>
          </div>

          <!-- Benefit 2 -->
          <div class="relative bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-teal-100">
            <div class="absolute top-6 right-6 w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
              2
            </div>
            <div class="mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center">
                <Icon name="mdi:cog" class="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Potente y Flexible</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Herramientas robustas que se adaptan a las necesidades de cada proyecto.
            </p>
            <ul class="space-y-2">
              <li class="flex items-center text-gray-600">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-teal-600 mr-2" />
                Automatización inteligente
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-teal-600 mr-2" />
                Reportes personalizados
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-teal-600 mr-2" />
                Escalabilidad total
              </li>
            </ul>
          </div>

          <!-- Benefit 3 -->
          <div class="relative bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-emerald-100">
            <div class="absolute top-6 right-6 w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
              3
            </div>
            <div class="mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                <Icon name="mdi:headset" class="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Soporte Dedicado</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Un equipo comprometido para ayudarte en cada paso del camino.
            </p>
            <ul class="space-y-2">
              <li class="flex items-center text-gray-600">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-600 mr-2" />
                Chat en vivo
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-600 mr-2" />
                Documentación completa
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="mdi:check-circle" class="w-5 h-5 text-emerald-600 mr-2" />
                Tutoriales en video
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestro Impacto -->
    <section class="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">
            Nuestro <span class="text-emerald-200">Impacto</span>
          </h2>
          <p class="text-xl text-emerald-100 max-w-2xl mx-auto">
            Transformando la educación en todo Colombia
          </p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="text-5xl font-bold mb-2">85%</div>
            <div class="text-lg text-emerald-100">Aumento en Eficiencia</div>
            <p class="text-sm text-emerald-200 mt-2">Reportado por instructores</p>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="text-5xl font-bold mb-2">40h</div>
            <div class="text-lg text-emerald-100">Ahorradas al Mes</div>
            <p class="text-sm text-emerald-200 mt-2">Por cada proyecto</p>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="text-5xl font-bold mb-2">98%</div>
            <div class="text-lg text-emerald-100">Satisfacción</div>
            <p class="text-sm text-emerald-200 mt-2">Calificación promedio</p>
          </div>
          <div class="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div class="text-5xl font-bold mb-2">15+</div>
            <div class="text-lg text-emerald-100">Centros SENA</div>
            <p class="text-sm text-emerald-200 mt-2">Usando INVIGEX</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Lo Que Dicen <span class="text-emerald-600">Nuestros Usuarios</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Historias reales de instructores que confían en INVIGEX
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-emerald-100">
            <div class="flex mb-4">
              <Icon v-for="i in 5" :key="i" name="mdi:star" class="w-5 h-5 text-yellow-400" />
            </div>
            <p class="text-gray-700 mb-6 leading-relaxed italic">
              "INVIGEX transformó completamente nuestra operación. En 3 meses aumentamos la eficiencia en un 70%."
            </p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                MC
              </div>
              <div class="ml-4">
                <div class="font-bold text-gray-900">María Contreras</div>
                <div class="text-sm text-gray-600">Instructora • SENA</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-teal-100">
            <div class="flex mb-4">
              <Icon v-for="i in 5" :key="i" name="mdi:star" class="w-5 h-5 text-yellow-400" />
            </div>
            <p class="text-gray-700 mb-6 leading-relaxed italic">
              "La facilidad de uso es increíble. Todo el equipo se adaptó en días. El soporte es excepcional."
            </p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center text-white font-bold">
                JR
              </div>
              <div class="ml-4">
                <div class="font-bold text-gray-900">Javier Rodríguez</div>
                <div class="text-sm text-gray-600">Coordinador • SENA</div>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-emerald-100">
            <div class="flex mb-4">
              <Icon v-for="i in 5" :key="i" name="mdi:star" class="w-5 h-5 text-yellow-400" />
            </div>
            <p class="text-gray-700 mb-6 leading-relaxed italic">
              "Los reportes automáticos nos ahorraron horas de trabajo. Es la solución perfecta para el SENA."
            </p>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                AS
              </div>
              <div class="ml-4">
                <div class="font-bold text-gray-900">Ana Silva</div>
                <div class="text-sm text-gray-600">Instructora • SENA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          ¿Listo para Transformar tu Gestión?
        </h2>
        <p class="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
          Únete a cientos de instructores que ya están optimizando sus inventarios con INVIGEX
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/register" class="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Crear Cuenta Gratis
          </NuxtLink>
          <NuxtLink to="/login" class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all">
            Iniciar Sesión
          </NuxtLink>
        </div>
        <p class="text-emerald-200 text-sm mt-8">
          ✓ Sin tarjeta de crédito • ✓ Configuración en minutos • ✓ Soporte incluido
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'public'
})

useHead({
  title: 'Nosotros - INVIGEX',
  meta: [
    { name: 'description', content: 'Conoce más sobre INVIGEX, nuestros valores y por qué somos la mejor opción para la gestión de inventarios en el SENA.' }
  ]
})
</script>