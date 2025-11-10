<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white">
      <!-- Decorative background -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-20 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="text-center lg:text-left space-y-8">
            <div class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              ✨ Plataforma #1 para el SENA
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Gestión de Inventarios
              <span class="block text-emerald-200">Simple y Eficiente</span>
            </h1>
            
            <p class="text-xl text-emerald-100 leading-relaxed max-w-2xl">
              Controla, gestiona y optimiza los recursos de tus proyectos formativos con la plataforma diseñada especialmente para la comunidad SENA.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NuxtLink to="/register" class="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Empezar Gratis
              </NuxtLink>
              <a href="/nosotros" class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all">
                Conocer Más
              </a>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div class="text-3xl font-bold">500+</div>
                <div class="text-emerald-200 text-sm">Usuarios Activos</div>
              </div>
              <div>
                <div class="text-3xl font-bold">50K+</div>
                <div class="text-emerald-200 text-sm">Productos Gestionados</div>
              </div>
              <div>
                <div class="text-3xl font-bold">99%</div>
                <div class="text-emerald-200 text-sm">Satisfacción</div>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80" 
                alt="Gestión de Inventarios" 
                class="w-full h-auto"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
            </div>
            
            <!-- Floating Card -->
            <div class="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-4 animate-float">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Icon name="mdi:chart-line" class="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div class="text-2xl font-bold text-gray-900">+85%</div>
                  <div class="text-sm text-gray-600">Eficiencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" class="w-full h-16 fill-current text-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 lg:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Todo lo que Necesitas en un Solo Lugar
          </h2>
          <p class="text-xl text-gray-600">
            Herramientas poderosas diseñadas para simplificar tu gestión de inventarios
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature Card 1 -->
          <div class="group relative bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300">
            <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-600 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div class="relative">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon name="mdi:package-variant" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Control Total de Stock</h3>
              <p class="text-gray-600 leading-relaxed">
                Visualiza en tiempo real las entradas, salidas y existencias de todos tus productos y materiales.
              </p>
            </div>
          </div>

          <!-- Feature Card 2 -->
          <div class="group relative bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-teal-100 hover:border-teal-300">
            <div class="absolute top-0 right-0 w-32 h-32 bg-teal-600 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div class="relative">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon name="mdi:chart-bar" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Reportes Inteligentes</h3>
              <p class="text-gray-600 leading-relaxed">
                Genera informes automáticos para tomar decisiones basadas en datos y optimizar recursos.
              </p>
            </div>
          </div>

          <!-- Feature Card 3 -->
          <div class="group relative bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300">
            <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-600 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div class="relative">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon name="mdi:bell-alert" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Alertas Automáticas</h3>
              <p class="text-gray-600 leading-relaxed">
                Notificaciones inteligentes para niveles bajos de stock y nunca quedarte sin insumos.
              </p>
            </div>
          </div>

          <!-- Feature Card 4 -->
          <div class="group relative bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-teal-100 hover:border-teal-300">
            <div class="absolute top-0 right-0 w-32 h-32 bg-teal-600 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div class="relative">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon name="mdi:account-group" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Gestión de Usuarios</h3>
              <p class="text-gray-600 leading-relaxed">
                Asigna permisos y roles a los miembros de tu equipo de manera fácil y segura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section id="process" class="py-20 lg:py-28 bg-gradient-to-b from-emerald-50 to-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comienza en 3 Simples Pasos
          </h2>
          <p class="text-xl text-gray-600">
            Tu inventario organizado en menos de 5 minutos
          </p>
        </div>

        <div class="relative">
          <!-- Timeline line -->
          <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-500 transform -translate-x-1/2"></div>

          <!-- Step 1 -->
          <div class="relative mb-16 lg:mb-24">
            <div class="flex flex-col lg:flex-row items-center gap-8">
              <div class="lg:w-1/2 lg:text-right lg:pr-16">
                <div class="inline-block lg:block">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl font-bold text-2xl shadow-lg mb-4">
                    1
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">Crea tu Cuenta</h3>
                  <p class="text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 lg:ml-auto">
                    Regístrate con tu correo institucional @misena.edu.co y obtén acceso inmediato a todas las funcionalidades.
                  </p>
                </div>
              </div>
              <div class="lg:w-1/2 lg:pl-16">
                <div class="relative rounded-2xl overflow-hidden shadow-xl">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" alt="Crear cuenta" class="w-full h-64 object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative mb-16 lg:mb-24">
            <div class="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div class="lg:w-1/2 lg:text-left lg:pl-16">
                <div class="inline-block lg:block">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl font-bold text-2xl shadow-lg mb-4">
                    2
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">Carga tu Inventario</h3>
                  <p class="text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                    Importa tus productos desde Excel o añádelos manualmente. Organiza por categorías y ubicaciones.
                  </p>
                </div>
              </div>
              <div class="lg:w-1/2 lg:pr-16">
                <div class="relative rounded-2xl overflow-hidden shadow-xl">
                  <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" alt="Cargar inventario" class="w-full h-64 object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative">
            <div class="flex flex-col lg:flex-row items-center gap-8">
              <div class="lg:w-1/2 lg:text-right lg:pr-16">
                <div class="inline-block lg:block">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl font-bold text-2xl shadow-lg mb-4">
                    3
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">¡Gestiona y Optimiza!</h3>
                  <p class="text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 lg:ml-auto">
                    Registra movimientos, genera reportes y mantén el control total de tu inventario en tiempo real.
                  </p>
                </div>
              </div>
              <div class="lg:w-1/2 lg:pl-16">
                <div class="relative rounded-2xl overflow-hidden shadow-xl">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" alt="Gestionar inventario" class="w-full h-64 object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 lg:py-28 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Historias de Éxito
          </h2>
          <p class="text-xl text-gray-600">
            Lo que dicen los usuarios de INVIGEX
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-emerald-100">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
                RP
              </div>
              <div class="ml-4">
                <div class="font-bold text-gray-900 text-lg">Rafael Petro</div>
                <div class="text-emerald-600 text-sm">Líder de Proyecto • TecnoADSO</div>
              </div>
            </div>
            <div class="flex mb-4">
              <Icon v-for="i in 5" :key="i" name="mdi:star" class="w-5 h-5 text-yellow-400" />
            </div>
            <p class="text-gray-700 leading-relaxed italic">
              "Esta herramienta ha simplificado completamente la gestión de nuestro proyecto. Ahora sabemos exactamente qué tenemos y qué necesitamos. ¡Imprescindible para cualquier instructor!"
            </p>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-teal-100">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
                AC
              </div>
              <div class="ml-4">
                <div class="font-bold text-gray-900 text-lg">Aly Culchac</div>
                <div class="text-teal-600 text-sm">Instructor • Centro de Diseño</div>
              </div>
            </div>
            <div class="flex mb-4">
              <Icon v-for="i in 5" :key="i" name="mdi:star" class="w-5 h-5 text-yellow-400" />
            </div>
            <p class="text-gray-700 leading-relaxed italic">
              "La facilidad para generar reportes nos ha ahorrado horas de trabajo. Es la solución perfecta para las unidades productivas del SENA. Muy recomendado."
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-20 lg:py-28 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 text-white overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl lg:text-5xl font-bold mb-6">
          ¿Listo para Optimizar tu Inventario?
        </h2>
        <p class="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
          Únete a cientos de equipos del SENA que ya están transformando la gestión de sus recursos con INVIGEX.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/register" class="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Crear Cuenta Gratis
          </NuxtLink>
          <NuxtLink to="/nosotros" class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all">
            Conocer Más
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
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'public'
})

const isVisible = ref({})

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

  return () => observer.disconnect()
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>