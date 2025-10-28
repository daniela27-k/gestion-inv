<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Conoce a <span class="text-yellow-300">INVIGEX</span>
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Innovación y excelencia en gestión empresarial
          </p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" class="w-full h-12 md:h-20">
          <path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>

    <!-- Quiénes Somos -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-gray-800 mb-6">
              ¿Quiénes <span class="text-blue-600">Somos?</span>
            </h2>
            <p class="text-lg text-gray-600 mb-4 leading-relaxed">
              INVIGEX es una plataforma innovadora diseñada para transformar la manera en que las empresas gestionan sus recursos, proyectos y operaciones diarias.
            </p>
            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
              Fundada con la visión de simplificar la complejidad empresarial, combinamos tecnología de vanguardia con una interfaz intuitiva para ofrecer soluciones que realmente funcionan.
            </p>
            <div class="flex gap-4">
              <NuxtLink to="/registro" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Crear Cuenta
              </NuxtLink>
              <NuxtLink to="/login" class="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Iniciar Sesión
              </NuxtLink>
            </div>
          </div>
          <div class="relative">
            <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
              <div class="grid grid-cols-2 gap-4 text-white">
                <div class="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                  <div class="text-4xl font-bold mb-2">500+</div>
                  <div class="text-sm">Empresas Activas</div>
                </div>
                <div class="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                  <div class="text-4xl font-bold mb-2">10K+</div>
                  <div class="text-sm">Usuarios Felices</div>
                </div>
                <div class="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                  <div class="text-4xl font-bold mb-2">99.9%</div>
                  <div class="text-sm">Uptime</div>
                </div>
                <div class="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                  <div class="text-4xl font-bold mb-2">24/7</div>
                  <div class="text-sm">Soporte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestros Valores -->
    <section class="py-20 px-4 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Nuestros <span class="text-blue-600">Valores</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Los principios que guían cada decisión y acción en INVIGEX
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-blue-600">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Innovación</h3>
            <p class="text-gray-600">
              Buscamos constantemente nuevas formas de mejorar y evolucionar nuestras soluciones.
            </p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-indigo-600">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Colaboración</h3>
            <p class="text-gray-600">
              Creemos en el poder del trabajo en equipo y la comunicación efectiva.
            </p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-purple-600">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Excelencia</h3>
            <p class="text-gray-600">
              Nos comprometemos a ofrecer la más alta calidad en cada servicio.
            </p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-cyan-600">
            <div class="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">Confianza</h3>
            <p class="text-gray-600">
              La seguridad y privacidad de tus datos son nuestra máxima prioridad.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Por Qué Elegir INVIGEX -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            ¿Por Qué Elegir <span class="text-blue-600">INVIGEX?</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre las ventajas que nos hacen diferentes
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-xl transition-shadow">
            <div class="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl font-bold">
              1
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Fácil de Usar</h3>
            <p class="text-gray-600 mb-4">
              Interfaz intuitiva diseñada para que cualquier persona pueda empezar a trabajar en minutos, sin necesidad de capacitación extensa.
            </p>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Dashboard personalizable
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Navegación intuitiva
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Onboarding guiado
              </li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transition-shadow">
            <div class="bg-indigo-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl font-bold">
              2
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Potente y Flexible</h3>
            <p class="text-gray-600 mb-4">
              Herramientas robustas que se adaptan a las necesidades específicas de tu negocio, desde startups hasta empresas consolidadas.
            </p>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-indigo-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Automatización avanzada
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-indigo-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Integraciones ilimitadas
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-indigo-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Escalabilidad garantizada
              </li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-xl transition-shadow">
            <div class="bg-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl font-bold">
              3
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Soporte Excepcional</h3>
            <p class="text-gray-600 mb-4">
              Un equipo dedicado listo para ayudarte en cada paso del camino. Tu éxito es nuestro éxito.
            </p>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-purple-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Chat en vivo 24/7
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-purple-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Documentación completa
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-purple-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Capacitación personalizada
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestro Impacto -->
    <section class="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">
            Nuestro <span class="text-yellow-300">Impacto</span>
          </h2>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            Transformando empresas y vidas en todo el mundo
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-5xl font-bold mb-2 text-yellow-300">85%</div>
            <div class="text-lg text-blue-100">Aumento en Productividad</div>
            <p class="text-sm text-blue-200 mt-2">Promedio reportado por nuestros usuarios</p>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold mb-2 text-yellow-300">40h</div>
            <div class="text-lg text-blue-100">Ahorradas al Mes</div>
            <p class="text-sm text-blue-200 mt-2">Por equipo de trabajo</p>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold mb-2 text-yellow-300">92%</div>
            <div class="text-lg text-blue-100">Satisfacción del Cliente</div>
            <p class="text-sm text-blue-200 mt-2">Calificación promedio de 4.6/5</p>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold mb-2 text-yellow-300">50+</div>
            <div class="text-lg text-blue-100">Países</div>
            <p class="text-sm text-blue-200 mt-2">Presencia global en expansión</p>
          </div>
        </div>
        <div class="mt-16 text-center">
          <p class="text-xl mb-8 text-blue-100">
            Únete a miles de empresas que ya están transformando su forma de trabajar
          </p>
          <NuxtLink to="/registro" class="inline-block bg-yellow-400 text-blue-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-2xl hover:shadow-yellow-400/50">
            Comienza Gratis Ahora
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="py-20 px-4 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Lo Que Dicen <span class="text-blue-600">Nuestros Clientes</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Historias reales de éxito con INVIGEX
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div class="flex items-center mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                MC
              </div>
              <div class="ml-4">
                <div class="font-bold text-gray-800">María Contreras</div>
                <div class="text-sm text-gray-500">CEO, TechStart Inc.</div>
              </div>
            </div>
            <div class="flex mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <p class="text-gray-600 italic">
              "INVIGEX transformó completamente nuestra operación. En 3 meses aumentamos nuestra productividad en un 70% y redujimos costos significativamente."
            </p>
          </div>
          <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div class="flex items-center mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                JR
              </div>
              <div class="ml-4">
                <div class="font-bold text-gray-800">Javier Rodríguez</div>
                <div class="text-sm text-gray-500">Director, Logística Global</div>
              </div>
            </div>
            <div class="flex mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <p class="text-gray-600 italic">
              "La facilidad de uso es increíble. Todo el equipo se adaptó en días, no en semanas. El soporte técnico es excepcional, siempre disponibles."
            </p>
          </div>
          <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div class="flex items-center mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                AS
              </div>
              <div class="ml-4">
                <div class="font-bold text-gray-800">Ana Silva</div>
                <div class="text-sm text-gray-500">Gerente, Innovación Corp</div>
              </div>
            </div>
            <div class="flex mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <p class="text-gray-600 italic">
              "ROI positivo desde el primer mes. Las herramientas de análisis nos ayudaron a tomar mejores decisiones estratégicas. Altamente recomendado."
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-20 px-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl"></div>
      </div>
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          ¿Listo para Transformar tu Empresa?
        </h2>
        <p class="text-xl md:text-2xl mb-10 text-blue-100">
          Únete a más de 10,000 usuarios que ya confían en INVIGEX
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink to="/registro" class="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl w-full sm:w-auto">
            Crear Cuenta Gratis
          </NuxtLink>
          <NuxtLink to="/login" class="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors w-full sm:w-auto">
            Ya Tengo Cuenta
          </NuxtLink>
        </div>
        <p class="text-sm text-blue-200 mt-6">
          Sin tarjeta de crédito • Configuración en 2 minutos • Cancela cuando quieras
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'public'
})
// Metadata para SEO
useHead({
  title: 'Nosotros - INVIGEX',
  meta: [
    { name: 'description', content: 'Conoce más sobre INVIGEX, nuestros valores, impacto y por qué somos la mejor opción para la gestión empresarial.' }
  ]
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>