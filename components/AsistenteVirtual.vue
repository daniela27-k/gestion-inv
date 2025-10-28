<template>
  <div>
    <!-- Botón flotante para abrir el chat -->
    <Transition name="bounce">
      <button
        v-if="!isOpen"
        @click="toggleChat"
        class="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Abrir asistente virtual"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        <!-- Badge de notificación -->
        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          !
        </span>
        <!-- Tooltip -->
        <span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          ¿Necesitas ayuda? 👋
        </span>
      </button>
    </Transition>

    <!-- Ventana del chat -->
    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
      >
        <!-- Header del chat -->
        <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span class="text-2xl">🤖</span>
              </div>
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h3 class="font-bold text-lg">IVI</h3>
              <p class="text-xs text-green-100">Asistente Virtual de INVIGEX</p>
            </div>
          </div>
          <button
            @click="toggleChat"
            class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            aria-label="Cerrar chat"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Área de mensajes -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        >
          <TransitionGroup name="message">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="[
                'flex',
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              ]"
            >
              <div
                :class="[
                  'max-w-[75%] rounded-2xl px-4 py-3 shadow-sm',
                  message.sender === 'user'
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none'
                ]"
              >
                <p class="text-sm leading-relaxed">{{ message.text }}</p>
                <span class="text-xs opacity-70 mt-1 block">
                  {{ message.time }}
                </span>
              </div>
            </div>
          </TransitionGroup>

          <!-- Indicador de escritura -->
          <Transition name="fade">
            <div v-if="isTyping" class="flex justify-start">
              <div class="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                <div class="flex gap-1">
                  <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                  <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Preguntas rápidas -->
        <div v-if="showQuickQuestions" class="px-4 py-2 bg-white border-t border-gray-200">
          <p class="text-xs text-gray-500 mb-2">Preguntas frecuentes:</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(question, index) in quickQuestions"
              :key="index"
              @click="selectQuickQuestion(question)"
              class="text-xs bg-gray-100 hover:bg-green-100 text-gray-700 px-3 py-2 rounded-full transition-colors"
            >
              {{ question }}
            </button>
          </div>
        </div>

        <!-- Input de mensaje -->
        <div class="p-4 bg-white border-t border-gray-200">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input
              v-model="userInput"
              type="text"
              placeholder="Escribe tu pregunta..."
              class="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              :disabled="!userInput.trim()"
              class="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Enviar mensaje"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

const isOpen = ref(false)
const userInput = ref('')
const messages = ref([])
const isTyping = ref(false)
const messagesContainer = ref(null)
const showQuickQuestions = ref(true)

const quickQuestions = [
  '¿Cómo registro un producto?',
  '¿Cómo doy de baja un elemento?',
  '¿Cómo genero reportes?',
  'Precios y planes'
]

// Base de conocimientos de IVI
const responses = {
  'registrar': {
    keywords: ['registrar', 'agregar', 'añadir', 'crear', 'nuevo', 'producto', 'elemento', 'item'],
    answer: '¡Registrar productos en INVIGEX es muy fácil! 📦\n\n1. Ve al módulo "Inventario"\n2. Haz clic en "Agregar Producto"\n3. Completa los datos: nombre, código, cantidad, ubicación\n4. ¡Listo! Tu producto está registrado.\n\n¿Necesitas ayuda con algo más?'
  },
  'baja': {
    keywords: ['baja', 'eliminar', 'borrar', 'quitar', 'retirar', 'dar de baja'],
    answer: 'Para dar de baja un elemento: 🗑️\n\n1. Busca el producto en tu inventario\n2. Haz clic en el botón "Acciones"\n3. Selecciona "Dar de Baja"\n4. Indica el motivo (vendido, dañado, etc.)\n5. Confirma la operación\n\nEl sistema mantendrá un historial de la baja.'
  },
  'reportes': {
    keywords: ['reporte', 'informe', 'estadística', 'análisis', 'exportar', 'generar'],
    answer: 'INVIGEX ofrece varios tipos de reportes: 📊\n\n• Inventario actual\n• Productos más vendidos\n• Stock bajo\n• Historial de movimientos\n• Valoración de inventario\n\nAccede desde el módulo "Reportes" y exporta en PDF o Excel.'
  },
  'precios': {
    keywords: ['precio', 'costo', 'plan', 'pagar', 'cuánto', 'tarifa', 'suscripción'],
    answer: 'Nuestros planes de INVIGEX: 💰\n\n🆓 GRATIS: Hasta 100 productos\n⭐ BÁSICO: $29/mes - Hasta 1,000 productos\n🚀 PROFESIONAL: $79/mes - Productos ilimitados\n💎 EMPRESARIAL: Contacta ventas\n\n¡Prueba gratis por 14 días!'
  },
  'funciona': {
    keywords: ['funciona', 'cómo', 'usar', 'utilizar', 'empezar', 'comenzar', 'tutorial'],
    answer: 'INVIGEX es muy intuitivo: 🎯\n\n1. Crea tu cuenta (¡2 minutos!)\n2. Agrega tu primer producto\n3. Gestiona entradas y salidas\n4. Consulta reportes en tiempo real\n\n¿Quieres ver un video tutorial?'
  },
  'contacto': {
    keywords: ['contacto', 'ayuda', 'soporte', 'hablar', 'comunicar', 'teléfono', 'email'],
    answer: 'Puedes contactarnos por: 📞\n\n📧 Email: soporte@invigex.com\n💬 WhatsApp: +57 300 123 4567\n🕐 Lun-Vie: 8am - 6pm\n\nNuestro equipo responde en menos de 2 horas.'
  },
  'beneficios': {
    keywords: ['beneficio', 'ventaja', 'qué ofrece', 'características', 'por qué'],
    answer: 'Beneficios de INVIGEX: ✨\n\n✅ Control en tiempo real\n✅ Alertas de stock bajo\n✅ Múltiples ubicaciones\n✅ App móvil incluida\n✅ Código de barras\n✅ Integración con ventas\n\n¡Aumenta tu eficiencia en un 85%!'
  },
  'saludo': {
    keywords: ['hola', 'buenas', 'buenos días', 'buenas tardes', 'hey', 'saludos'],
    answer: '¡Hola! 👋 Soy IVI, tu asistente virtual de INVIGEX.\n\nEstoy aquí para ayudarte con:\n• Registro de productos\n• Gestión de inventarios\n• Reportes y análisis\n• Información sobre planes\n\n¿En qué puedo ayudarte hoy?'
  },
  'default': {
    keywords: [],
    answer: 'Hmm, no estoy seguro de entender tu pregunta. 🤔\n\n¿Podrías reformularla? O selecciona una de las preguntas frecuentes.\n\nTambién puedes contactar a nuestro equipo de soporte para ayuda personalizada.'
  }
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && messages.value.length === 0) {
    // Mensaje de bienvenida
    setTimeout(() => {
      addMessage('bot', '¡Hola! 👋 Soy IVI, tu asistente virtual de INVIGEX. ¿En qué puedo ayudarte hoy?')
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

const findResponse = (input) => {
  const lowerInput = input.toLowerCase()
  
  for (const [key, data] of Object.entries(responses)) {
    if (key === 'default') continue
    
    const hasKeyword = data.keywords.some(keyword => 
      lowerInput.includes(keyword.toLowerCase())
    )
    
    if (hasKeyword) {
      return data.answer
    }
  }
  
  return responses.default.answer
}

const sendMessage = async () => {
  if (!userInput.value.trim()) return
  
  const message = userInput.value
  userInput.value = ''
  showQuickQuestions.value = false
  
  // Agregar mensaje del usuario
  addMessage('user', message)
  
  // Simular que el bot está escribiendo
  isTyping.value = true
  
  // Esperar un momento para simular procesamiento
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
  
  // Encontrar y agregar respuesta
  const response = findResponse(message)
  isTyping.value = false
  addMessage('bot', response)
}

const selectQuickQuestion = (question) => {
  userInput.value = question
  sendMessage()
}

onMounted(() => {
  // Animación de entrada del badge
  setTimeout(() => {
    // Lógica adicional si es necesaria
  }, 1000)
})
</script>

<style scoped>
/* Animaciones */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.3s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.slide-up-enter-active {
  animation: slide-up 0.4s ease-out;
}
.slide-up-leave-active {
  animation: slide-down 0.3s ease-in;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-down {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}

.message-enter-active {
  animation: message-in 0.3s ease-out;
}

@keyframes message-in {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Scroll personalizado */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>