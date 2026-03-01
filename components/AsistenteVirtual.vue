<template>
  <div class="asistente-container">
    <!-- Botón flotante Premium -->
    <Transition name="bounce">
      <button v-if="!isOpen" @click="toggleChat" class="floating-trigger group" aria-label="Abrir asistente">
        <div class="glow-effect"></div>
        <div class="icon-container">
          <Icon name="mdi:robot-happy" class="main-icon" />
          <span class="pulse-ring"></span>
        </div>
        <!-- Tooltip -->
        <div class="creative-tooltip">
          <div class="tooltip-content">
            <span class="wave">👋</span>
            <div><p class="font-bold">¡Hola! Soy IVI</p><p class="text-[10px] opacity-80">¿Hablamos de tu inventario?</p></div>
          </div>
        </div>
      </button>
    </Transition>

    <!-- Ventana de Chat -->
    <Transition name="panel">
      <div v-if="isOpen" class="chat-panel">
        <!-- BOTÓN CERRAR (X) DEFinitivo - Siempre encima -->
        <button @click="toggleChat" class="ivi-close-x" title="Cerrar">✕</button>

        <div class="panel-decor">
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
        </div>

        <!-- Header -->
        <header class="chat-header">
          <div class="header-left">
            <div class="bot-avatar-premium">
              <Icon name="mdi:robot-confused-outline" v-if="isTyping" class="avatar-icon-anim" />
              <Icon name="mdi:robot-excited-outline" v-else class="avatar-icon" />
              <div class="online-indicator"></div>
            </div>
            <div class="header-info">
              <h3>Invi <span>AI</span></h3>
              <p>{{ isTyping ? 'Pensando...' : 'En línea ahora' }}</p>
            </div>
          </div>
        </header>

        <!-- Mensajes -->
        <div ref="messagesContainer" class="messages-area">
          <div class="welcome-card" v-if="messages.length < 2">
            <div class="sparkles">⚡</div>
            <h4>¡Hola! Soy Invi</h4>
            <p>Estoy aquí para ayudarte con cualquier duda técnica o de servicios que tengas sobre Invigex. ¿Cómo puedo asistirte hoy?</p>
          </div>

          <TransitionGroup name="list">
            <div v-for="(msg, index) in messages" :key="index" :class="['message-wrapper', msg.sender]">
              <div class="message-bubble" v-html="formatMessage(msg.text)"></div>
              <span class="message-time">{{ msg.time }}</span>
            </div>
          </TransitionGroup>

          <div v-if="isTyping" class="typing-indicator"><span></span><span></span><span></span></div>
        </div>

        <!-- Sugerencias -->
        <div class="suggestions-bar" v-if="showSuggestions && messages.length < 5">
          <button v-for="sug in suggestions" :key="sug" @click="selectSuggestion(sug)" class="sug-pill">{{ sug }}</button>
        </div>

        <!-- Input -->
        <footer class="chat-footer">
          <form @submit.prevent="sendMessage" class="input-form">
            <input v-model="userInput" type="text" placeholder="Escribe un mensaje..." />
            <button type="submit" :disabled="!userInput.trim()" class="send-btn">
              <Icon name="mdi:send-variant" />
            </button>
          </form>
        </footer>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue';

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([]);
const isTyping = ref(false);
const showSuggestions = ref(true);
const messagesContainer = ref(null);

const { user, getProfile } = useAuth();
const config = useRuntimeConfig();
const API = config.public.apiBaseUrl;

const suggestions = ['Servicios Invigex', 'Ver Planes', 'Contactar Soporte', 'Pedir Demo'];

// ── Base de Conocimientos Local (Respaldo / Failsafe) ────────────────────────
const localKnowledge = {
  saludo: { keywords: ['hola', 'que tal', 'quien eres', 'quién eres'], answer: '¡Hola! Soy **Invi** ⚡, asistente de Invigex. Estoy aquí para conectarte con la mejor tecnología de software.' },
  servicios: { keywords: ['servicios', 'que hacen', 'ofrecen', 'qué es', 'que es', 'invigex es', 'invigex'], answer: 'En Invigex ofrecemos desarrollo de software a medida, gestión de inventarios y consultoría tecnológica avanzada.' },
  precios: { keywords: ['precio', 'plan', 'cuanto cuesta', 'cuánto cuesta', 'planes', 'costo'], answer: 'Tenemos planes flexibles para cada necesidad. Puedes verlos en nuestra web o hablar con ventas en **ventas@invigex.com**.' },
  soporte: { keywords: ['soporte', 'ayuda', 'problema', 'error', 'fallo'], answer: 'Si tienes un problema técnico, déjame conectarte con el equipo de Invigex: **soporte@invigex.com**.' },
  demo: { keywords: ['demo', 'prueba', 'probar', 'ver'], answer: '¡Claro! Puedes solicitar una demo escribiendo a **ventas@invigex.com** o usando el botón "Empezar Gratis" en nuestra web.' },
  contacto: { keywords: ['contacto', 'contactar', 'hablar', 'comunicar'], answer: 'Puedes contactarnos en **soporte@invigex.com** o **ventas@invigex.com**. ¡Respondemos rápido!' },
  default: 'Entiendo. Como experto de Invigex, te sugiero hablar con uno de nuestros especialistas para info detallada: **soporte@invigex.com**.'
};

const findLocalResponse = (input) => {
  const low = input.toLowerCase();
  for (const k in localKnowledge) {
    if (k === 'default') continue;
    if (localKnowledge[k].keywords.some(word => low.includes(word))) return localKnowledge[k].answer;
  }
  return localKnowledge.default;
};

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && messages.value.length === 0) {
    addMessage('bot', `¡Hola! Soy **Invi** ⚡, el asistente de Invigex. ¿En qué puedo ayudarte hoy?`);
  }
};

const addMessage = (sender, text) => {
  messages.value.push({
    sender,
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  scrollToBottom();
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({ top: messagesContainer.value.scrollHeight, behavior: 'smooth' });
  }
};

const formatMessage = (text) => text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

const sendMessage = async () => {
  if (!userInput.value.trim()) return;
  const text = userInput.value;
  userInput.value = '';
  addMessage('user', text);
  isTyping.value = true;

  try {
    // 1. Intentar llamar a la IA en el Backend
    const data = await $fetch(`${API}/asistente/preguntar`, {
      method: 'POST',
      credentials: 'include',
      body: { pregunta: text }
    });
    
    isTyping.value = false;
    // Si la IA respondió algo nulo o vacío, usar respaldo local
    if (!data.respuesta) {
      addMessage('bot', findLocalResponse(text));
    } else {
      addMessage('bot', data.respuesta);
    }
  } catch (err) {
    // 2. FALLBACK: Si la conexión falla, NO mostrar error, usar cerebro local
    console.warn('Backend desconectado, usando cerebro local...');
    setTimeout(() => {
      isTyping.value = false;
      addMessage('bot', findLocalResponse(text));
    }, 1000);
  }
};

const selectSuggestion = (sug) => { userInput.value = sug; sendMessage(); };
</script>

<style scoped>
.asistente-container {
  --p: #059669;
  --p-light: #10b981;
  --glass: rgba(255, 255, 255, 0.95);
  font-family: 'Outfit', sans-serif;
}

/* Trigger */
.floating-trigger {
  position: fixed; bottom: 30px; right: 30px;
  width: 70px; height: 70px; border-radius: 24px;
  background: linear-gradient(135deg, var(--p), #0d9488);
  border: none; cursor: pointer; z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 30px rgba(5, 150, 105, 0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.floating-trigger:hover { transform: scale(1.1) rotate(5deg); }

.pulse-ring {
  position: absolute; width: 100%; height: 100%; border-radius: inherit;
  border: 4px solid var(--p-light); animation: pulse 2s infinite;
}
@keyframes pulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }

/* Cerrar X - DISEÑO MEJORADO */
.ivi-close-x {
  position: absolute; top: 15px; right: 15px;
  width: 34px; height: 34px; background: #ff4757;
  color: white; border: none; border-radius: 10px;
  font-size: 18px; font-weight: bold; cursor: pointer;
  z-index: 9999; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.5);
  transition: 0.3s;
}
.ivi-close-x:hover { transform: rotate(90deg) scale(1.2); background: #ff6b81; }

/* Panel */
.chat-panel {
  position: fixed; bottom: 30px; right: 30px;
  width: 400px; height: 650px; background: var(--glass);
  backdrop-filter: blur(20px); border-radius: 32px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  z-index: 1001; display: flex; flex-direction: column;
  overflow: hidden; border: 1px solid white;
}

.chat-header {
  height: 80px; padding: 0 20px; display: flex; align-items: center;
  background: white; border-bottom: 2px solid #f1f5f9; flex-shrink: 0;
}

.bot-avatar-premium {
  width: 50px; height: 50px; background: #f1f5f9; border-radius: 16px;
  display: flex; align-items: center; justify-content: center; position: relative;
}
.avatar-icon { font-size: 28px; color: var(--p); }
.online-indicator {
  position: absolute; bottom: -2px; right: -2px; width: 14px; height: 14px;
  background: #22c55e; border: 3px solid white; border-radius: 50%;
}

.header-info h3 { font-weight: 800; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 6px; }
.ai-badge { font-size: 10px; background: var(--p); color: white; padding: 2px 6px; border-radius: 6px; }

.messages-area { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
.message-bubble { padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.5; }
.bot .message-bubble { background: #f1f5f9; border-bottom-left-radius: 2px; }
.user .message-bubble { background: var(--p); color: white; border-bottom-right-radius: 2px; align-self: flex-end; }

.suggestions-bar { padding: 0 20px 10px; display: flex; gap: 8px; overflow-x: auto; }
.sug-pill {
  padding: 8px 16px; background: white; border: 1.5px solid #e2e8f0;
  border-radius: 50px; font-size: 12px; font-weight: 700; color: #64748b;
  cursor: pointer; white-space: nowrap; transition: 0.2s;
}
.sug-pill:hover { border-color: var(--p); color: var(--p); }

.chat-footer { padding: 15px 20px 20px; }
.input-form {
  display: flex; gap: 10px; background: #f8fafc; padding: 6px 6px 6px 15px;
  border-radius: 18px; border: 1.5px solid #e2e8f0;
}
.input-form input { flex: 1; border: none; background: transparent; outline: none; font-size: 14px; }
.send-btn {
  width: 40px; height: 40px; border-radius: 12px; background: var(--p);
  color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
</style>