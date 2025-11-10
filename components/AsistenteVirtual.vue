<template>
  <div>
    <!-- Botón flotante -->
    <Transition name="bounce">
      <button
        v-if="!isOpen"
        @click="toggleChat"
        class="fixed bottom-6 right-6 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white rounded-full p-5 shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Abrir asistente virtual"
      >
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <!-- Badge animado -->
        <span class="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-pulse shadow-lg">
          1
        </span>
        <!-- Tooltip mejorado -->
        <div class="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div class="bg-gray-900 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap shadow-xl">
            <p class="font-semibold">¿Necesitas ayuda? 👋</p>
            <p class="text-xs text-gray-300 mt-1">Pregúntame lo que quieras</p>
          </div>
          <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900"></div>
        </div>
      </button>
    </Transition>

    <!-- Ventana del chat mejorada -->
    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="fixed bottom-6 right-6 w-[420px] h-[680px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
      >
        <!-- Header premium -->
        <div class="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white p-5 relative overflow-hidden">
          <!-- Patrón decorativo -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
          </div>
          
          <div class="relative flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
                  <span class="text-3xl">🤖</span>
                </div>
                <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></span>
              </div>
              <div>
                <h3 class="font-bold text-xl tracking-tight">IVI</h3>
                <p class="text-xs text-emerald-50 flex items-center gap-1">
                  <span class="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                  Asistente Virtual INVIGEX
                </p>
              </div>
            </div>
            <button
              @click="toggleChat"
              class="text-white/90 hover:text-white hover:bg-white/20 rounded-xl p-2.5 transition-all duration-200 hover:rotate-90"
              aria-label="Cerrar chat"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Área de mensajes -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white"
        >
          <TransitionGroup name="message">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="[
                'flex gap-2',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              ]"
            >
              <!-- Avatar del bot -->
              <div v-if="message.sender === 'bot'" class="flex-shrink-0">
                <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
                  <span class="text-sm">🤖</span>
                </div>
              </div>

              <!-- Mensaje -->
              <div
                :class="[
                  'max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm',
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                ]"
              >
                <p class="text-sm leading-relaxed whitespace-pre-line" v-html="formatMessage(message.text)"></p>
                <span :class="[
                  'text-xs mt-2 block',
                  message.sender === 'user' ? 'text-emerald-100' : 'text-gray-400'
                ]">
                  {{ message.time }}
                </span>
              </div>

              <!-- Avatar del usuario -->
              <div v-if="message.sender === 'user'" class="flex-shrink-0">
                <div class="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center shadow-sm">
                  <span class="text-sm">👤</span>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- Indicador de escritura -->
          <Transition name="fade">
            <div v-if="isTyping" class="flex justify-start gap-2">
              <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
                <span class="text-sm">🤖</span>
              </div>
              <div class="bg-white rounded-2xl rounded-bl-md px-5 py-4 shadow-sm border border-gray-100">
                <div class="flex gap-1.5">
                  <span class="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce"></span>
                  <span class="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                  <span class="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Sugerencias inteligentes -->
        <Transition name="fade">
          <div v-if="showSuggestions && currentSuggestions.length > 0" class="px-5 py-3 bg-white border-t border-gray-100">
            <p class="text-xs font-semibold text-gray-500 mb-2.5 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
              </svg>
              Sugerencias para ti
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(suggestion, index) in currentSuggestions"
                :key="index"
                @click="selectSuggestion(suggestion)"
                class="text-xs bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-700 font-medium px-4 py-2.5 rounded-full transition-all duration-200 border border-emerald-200 hover:border-emerald-300 hover:shadow-sm"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
        </Transition>

        <!-- Input mejorado -->
        <div class="p-5 bg-white border-t border-gray-100">
          <form @submit.prevent="sendMessage" class="flex gap-3">
            <input
              v-model="userInput"
              type="text"
              placeholder="Escribe tu pregunta aquí..."
              class="flex-1 border border-gray-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 text-sm transition-all"
              @input="updateSuggestions"
            />
            <button
              type="submit"
              :disabled="!userInput.trim()"
              class="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl px-5 py-3.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              aria-label="Enviar mensaje"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </form>
          <p class="text-xs text-gray-400 mt-2 text-center">
            IVI responde en base a información de INVIGEX
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed } from 'vue'

const isOpen = ref(false)
const userInput = ref('')
const messages = ref([])
const isTyping = ref(false)
const messagesContainer = ref(null)
const showSuggestions = ref(true)

// Sugerencias dinámicas basadas en el contexto
const allSuggestions = {
  initial: [
    '¿Cómo registro productos?',
    '¿Qué planes ofrecen?',
    '¿Cómo genero reportes?',
    'Características principales'
  ],
  products: [
    'Editar productos',
    'Importar desde Excel',
    'Códigos de barras',
    'Categorías de productos'
  ],
  reports: [
    'Exportar a Excel',
    'Reportes personalizados',
    'Gráficos y estadísticas',
    'Programar reportes'
  ],
  pricing: [
    'Comparar planes',
    'Método de pago',
    'Cancelar suscripción',
    'Descuentos anuales'
  ],
  support: [
    'Tutoriales en video',
    'Horarios de atención',
    'Chat en vivo',
    'Centro de ayuda'
  ]
}

const currentSuggestionType = ref('initial')
const currentSuggestions = computed(() => allSuggestions[currentSuggestionType.value] || allSuggestions.initial)

// Base de conocimientos expandida
const knowledgeBase = {
  // Gestión de productos
  registro: {
    keywords: ['registrar', 'agregar', 'añadir', 'crear', 'nuevo', 'producto', 'elemento', 'item', 'alta'],
    answer: `<strong>📦 Registro de Productos en INVIGEX</strong>

<strong>Método 1: Manual</strong>
1️⃣ Ingresa a "Inventario" → "Nuevo Producto"
2️⃣ Completa los campos:
   • Nombre del producto
   • Código/SKU (único)
   • Categoría
   • Precio de compra/venta
   • Stock inicial
   • Ubicación en almacén
3️⃣ Guarda y ¡listo!

<strong>Método 2: Importación masiva</strong>
• Descarga la plantilla Excel
• Llena los datos
• Importa en un solo clic

<strong>Tip:</strong> Puedes escanear códigos de barras con nuestra app móvil 📱`,
    suggestions: 'products'
  },

  edicion: {
    keywords: ['editar', 'modificar', 'cambiar', 'actualizar', 'corregir'],
    answer: `<strong>✏️ Edición de Productos</strong>

Para modificar un producto:
1️⃣ Busca el producto en el inventario
2️⃣ Clic en el ícono de lápiz ✏️
3️⃣ Actualiza los campos necesarios
4️⃣ Guarda los cambios

<strong>Edición masiva:</strong>
• Selecciona múltiples productos
• Clic en "Acciones masivas"
• Actualiza precio, categoría o ubicación

Todos los cambios quedan registrados en el historial.`,
    suggestions: 'products'
  },

  baja: {
    keywords: ['baja', 'eliminar', 'borrar', 'quitar', 'retirar', 'dar de baja', 'desactivar'],
    answer: `<strong>🗑️ Dar de Baja Productos</strong>

<strong>Proceso:</strong>
1️⃣ Busca el producto
2️⃣ "Acciones" → "Dar de Baja"
3️⃣ Selecciona motivo:
   • Vendido
   • Dañado/Obsoleto
   • Pérdida
   • Devolución
   • Otro (especifica)
4️⃣ Confirma la operación

<strong>Importante:</strong>
✅ Se mantiene historial completo
✅ Puedes reactivar productos después
✅ Afecta valoración de inventario`,
    suggestions: 'products'
  },

  // Reportes y análisis
  reportes: {
    keywords: ['reporte', 'informe', 'estadística', 'análisis', 'exportar', 'generar', 'gráfico'],
    answer: `<strong>📊 Sistema de Reportes INVIGEX</strong>

<strong>Reportes disponibles:</strong>

📈 <strong>Inventario:</strong>
• Stock actual por producto
• Valoración total del inventario
• Productos con stock bajo
• Productos sin movimiento

📉 <strong>Movimientos:</strong>
• Entradas y salidas
• Historial de transacciones
• Rotación de productos
• Productos más vendidos

💰 <strong>Financieros:</strong>
• Valor de compra vs venta
• Margen de ganancia
• Rentabilidad por categoría

<strong>Formatos:</strong> PDF, Excel, CSV
<strong>Programación:</strong> Diaria, semanal, mensual automática`,
    suggestions: 'reports'
  },

  exportar: {
    keywords: ['exportar', 'descargar', 'excel', 'pdf', 'csv', 'guardar'],
    answer: `<strong>💾 Exportación de Datos</strong>

<strong>Formatos disponibles:</strong>
• 📄 PDF - Ideal para impresión
• 📊 Excel - Para análisis profundo
• 📋 CSV - Compatible con otros sistemas

<strong>Cómo exportar:</strong>
1️⃣ Ve al reporte deseado
2️⃣ Clic en "Exportar"
3️⃣ Selecciona formato
4️⃣ Descarga automática

<strong>Exportación personalizada:</strong>
• Filtra por fechas
• Selecciona columnas específicas
• Agrupa por categorías`,
    suggestions: 'reports'
  },

  // Planes y precios
  precios: {
    keywords: ['precio', 'costo', 'plan', 'pagar', 'cuánto', 'tarifa', 'suscripción', 'mensualidad'],
    answer: `<strong>💰 Planes INVIGEX 2025</strong>

🆓 <strong>GRATIS</strong>
• Hasta 100 productos
• 1 usuario
• Reportes básicos
• Soporte por email

⭐ <strong>BÁSICO - $29/mes</strong>
• Hasta 1,000 productos
• 3 usuarios
• Todos los reportes
• App móvil incluida
• Soporte prioritario

🚀 <strong>PROFESIONAL - $79/mes</strong>
• Productos ilimitados
• 10 usuarios
• Múltiples bodegas
• API integración
• Códigos de barras
• Soporte 24/7

💎 <strong>EMPRESARIAL - Personalizado</strong>
• Todo incluido
• Usuarios ilimitados
• Servidor dedicado
• Capacitación presencial
• Gerente de cuenta

<strong>🎁 Descuento anual:</strong> 20% OFF
<strong>🎯 Prueba gratis:</strong> 14 días sin tarjeta`,
    suggestions: 'pricing'
  },

  // Funcionalidades
  funcionalidades: {
    keywords: ['funciona', 'cómo', 'usar', 'utilizar', 'empezar', 'comenzar', 'tutorial', 'características', 'funciones'],
    answer: `<strong>🎯 Características Principales</strong>

✅ <strong>Gestión de Inventario</strong>
• Control en tiempo real
• Múltiples ubicaciones/bodegas
• Alertas de stock bajo automáticas
• Transferencias entre bodegas

✅ <strong>Códigos de Barras</strong>
• Generación automática
• Escaneo con app móvil
• Impresión de etiquetas

✅ <strong>Trazabilidad</strong>
• Historial completo de movimientos
• Lotes y fechas de vencimiento
• Números de serie

✅ <strong>Integraciones</strong>
• Tiendas online (Shopify, WooCommerce)
• Sistemas de facturación
• Contabilidad
• API REST

✅ <strong>Seguridad</strong>
• Roles y permisos personalizados
• Backup automático diario
• Cifrado de datos`,
    suggestions: 'initial'
  },

  // Soporte
  soporte: {
    keywords: ['contacto', 'ayuda', 'soporte', 'hablar', 'comunicar', 'teléfono', 'email', 'asistencia', 'problema'],
    answer: `<strong>📞 Canales de Soporte</strong>

<strong>Contacto directo:</strong>
📧 Email: soporte@invigex.com
💬 WhatsApp: +57 300 123 4567
📱 Chat en vivo: Lun-Vie 8am-6pm

<strong>Recursos de autoayuda:</strong>
📚 Centro de ayuda: help.invigex.com
🎥 Video tutoriales: YouTube INVIGEX
📖 Documentación: docs.invigex.com

<strong>Tiempos de respuesta:</strong>
• Plan Gratis: 24-48 horas
• Plan Básico: 8-12 horas
• Plan Profesional: 2-4 horas
• Plan Empresarial: Inmediato

<strong>Soporte técnico especializado disponible!</strong>`,
    suggestions: 'support'
  },

  integracion: {
    keywords: ['integrar', 'conectar', 'api', 'sincronizar', 'shopify', 'woocommerce', 'tienda'],
    answer: `<strong>🔌 Integraciones INVIGEX</strong>

<strong>Tiendas Online:</strong>
✅ Shopify - Sync automático
✅ WooCommerce - Plugin oficial
✅ Mercado Libre - API directa
✅ Tiendanube/Nube Shop

<strong>Contabilidad:</strong>
✅ Alegra
✅ Siigo
✅ Colppy
✅ QuickBooks

<strong>Facturación:</strong>
✅ DIAN Colombia
✅ Facturación electrónica

<strong>API REST:</strong>
• Documentación completa
• Webhooks en tiempo real
• SDK para PHP, Python, Node.js

¿Necesitas integración personalizada? Contáctanos.`,
    suggestions: 'support'
  },

  // Seguridad y permisos
  seguridad: {
    keywords: ['seguridad', 'seguro', 'permiso', 'usuario', 'rol', 'acceso', 'contraseña', 'privacidad'],
    answer: `<strong>🔒 Seguridad y Permisos</strong>

<strong>Protección de datos:</strong>
🛡️ Cifrado SSL/TLS
🛡️ Backup automático diario
🛡️ Servidores en AWS
🛡️ Certificación ISO 27001

<strong>Control de acceso:</strong>
👤 Roles personalizables:
• Administrador
• Gerente
• Operador
• Auditor (solo lectura)

<strong>Permisos granulares:</strong>
✅ Ver inventario
✅ Editar productos
✅ Dar de baja
✅ Ver reportes financieros
✅ Exportar datos
✅ Gestionar usuarios

<strong>Autenticación:</strong>
• 2FA (dos factores)
• Single Sign-On (SSO)
• Sesiones seguras`,
    suggestions: 'support'
  },

  movil: {
    keywords: ['app', 'móvil', 'celular', 'aplicación', 'android', 'ios', 'smartphone'],
    answer: `<strong>📱 App Móvil INVIGEX</strong>

<strong>Disponible para:</strong>
📲 Android (Google Play)
🍎 iOS (App Store)

<strong>Funciones principales:</strong>
✅ Escaneo de códigos de barras
✅ Consulta de stock en tiempo real
✅ Registro rápido de productos
✅ Alertas push de stock bajo
✅ Toma de inventario física
✅ Fotos de productos
✅ Trabajo offline (sincroniza después)

<strong>Ideal para:</strong>
• Registro en bodega
• Inventarios cíclicos
• Recepciones de mercancía
• Ventas en campo

<strong>Descarga gratis desde tu tienda de apps!</strong>`,
    suggestions: 'products'
  },

  // Capacitación
  capacitacion: {
    keywords: ['capacitación', 'entrenamiento', 'curso', 'aprender', 'tutorial', 'enseñar', 'formación'],
    answer: `<strong>🎓 Capacitación y Recursos</strong>

<strong>Onboarding incluido:</strong>
✅ Sesión de configuración inicial (30 min)
✅ Tour guiado por la plataforma
✅ Configuración de tu primer inventario

<strong>Recursos gratuitos:</strong>
📚 Guías paso a paso
🎥 +50 video tutoriales
📖 Base de conocimientos
💡 Webinars mensuales

<strong>Capacitación personalizada:</strong>
(Plan Empresarial)
• Sesiones presenciales/virtuales
• Material impreso
• Certificación de usuarios
• Soporte durante implementación

<strong>Academia INVIGEX:</strong>
Cursos avanzados de gestión de inventarios`,
    suggestions: 'support'
  },

  saludos: {
    keywords: ['hola', 'buenas', 'buenos días', 'buenas tardes', 'hey', 'saludos', 'qué tal', 'cómo estás'],
    answer: `<strong>¡Hola! 👋 Soy IVI</strong>

Tu Asistente Virtual de INVIGEX, aquí para ayudarte con:

✨ <strong>Gestión de inventarios</strong>
• Registro y edición de productos
• Control de stock
• Transferencias entre bodegas

📊 <strong>Reportes y análisis</strong>
• Estadísticas en tiempo real
• Exportación de datos
• Indicadores de gestión

💰 <strong>Información comercial</strong>
• Planes y precios
• Características del sistema
• Demostraciones

🛠️ <strong>Soporte técnico</strong>
• Resolución de dudas
• Tutoriales
• Contacto con equipo humano

<strong>¿En qué puedo ayudarte hoy?</strong>`,
    suggestions: 'initial'
  },

  despedida: {
    keywords: ['gracias', 'chao', 'adiós', 'hasta luego', 'bye', 'nos vemos'],
    answer: `<strong>¡Ha sido un placer ayudarte! 😊</strong>

Recuerda que estoy disponible 24/7 para resolver tus dudas sobre INVIGEX.

Si necesitas asistencia personalizada:
📧 soporte@invigex.com
💬 WhatsApp: +57 300 123 4567

<strong>¡Que tengas un excelente día! 🌟</strong>

<em>Tip: Guarda este chat para consultar después</em>`,
    suggestions: 'initial'
  },

  default: {
    keywords: [],
    answer: `<strong>🤔 No estoy seguro de entender</strong>

¿Podrías reformular tu pregunta?

<strong>Algunas cosas en las que puedo ayudarte:</strong>
• Registro y gestión de productos
• Generación de reportes
• Información sobre planes
• Integraciones y API
• Soporte técnico
• App móvil
• Seguridad y permisos

También puedes usar las sugerencias que aparecen abajo 👇`,
    suggestions: 'initial'
  }
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && messages.value.length === 0) {
    setTimeout(() => {
      addMessage('bot', knowledgeBase.saludos.answer)
    }, 500)
  }
}

const addMessage = (sender, text) => {
  const now = new Date()
  const time = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
  
  messages.value.push({
    sender,
    text,
    time
  })
  
  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatMessage = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

const findResponse = (input) => {
  const lowerInput = input.toLowerCase()
  
  for (const [key, data] of Object.entries(knowledgeBase)) {
    if (key === 'default') continue
    
    const hasKeyword = data.keywords.some(keyword => 
      lowerInput.includes(keyword.toLowerCase())
    )
    
    if (hasKeyword) {
      if (data.suggestions) {
        currentSuggestionType.value = data.suggestions
      }
      return data.answer
    }
  }
  
  currentSuggestionType.value = 'initial'
  return knowledgeBase.default.answer
}

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  
  const message = userInput.value
  userInput.value = ''
  showSuggestions.value = false
  
  addMessage('user', message)
  
  isTyping.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800))
  
  const response = findResponse(message)
  isTyping.value = false
  addMessage('bot', response)
  
  setTimeout(() => {
    showSuggestions.value = true
  }, 500)
}

const selectSuggestion = (suggestion) => {
  userInput.value = suggestion
  sendMessage()
}

const updateSuggestions = () => {
  const input = userInput.value.toLowerCase()
  
  if (input.length > 3) {
    if (input.includes('precio') || input.includes('plan') || input.includes('cost')) {
      currentSuggestionType.value = 'pricing'
    } else if (input.includes('report') || input.includes('estadist') || input.includes('export')) {
      currentSuggestionType.value = 'reports'
    } else if (input.includes('producto') || input.includes('registr') || input.includes('agregar')) {
      currentSuggestionType.value = 'products'
    } else if (input.includes('ayuda') || input.includes('soport') || input.includes('contact')) {
      currentSuggestionType.value = 'support'
    }
  }
}

onMounted(() => {
  // Inicialización si es necesaria
})
</script>

<style scoped>
/* Animaciones mejoradas */
.bounce-enter-active {
  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.bounce-leave-active {
  animation: bounce-out 0.4s ease-in;
}

@keyframes bounce-in {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.15) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
}

.slide-up-enter-active {
  animation: slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slide-up-leave-active {
  animation: slide-down 0.35s ease-in;
}

@keyframes slide-up {
  from {
    transform: translateY(120%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes slide-down {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(120%) scale(0.8);
    opacity: 0;
  }
}

.message-enter-active {
  animation: message-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes message-in {
  from {
    transform: translateY(30px) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.25s ease-in;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Scroll personalizado elegante */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f7f7f7;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #14b8a6);
  border-radius: 10px;
  border: 2px solid #f7f7f7;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #0d9488);
}

/* Efectos hover mejorados */
button:active {
  transform: scale(0.95);
}

/* Animación de pulso personalizada */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Estilos para HTML formateado en mensajes */
:deep(strong) {
  font-weight: 600;
  color: inherit;
}

:deep(.bg-white strong) {
  color: #059669;
}

/* Responsive */
@media (max-width: 640px) {
  .fixed.bottom-6.right-6.w-\[420px\] {
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
    bottom: 1rem;
    right: 1rem;
  }
}
</style>