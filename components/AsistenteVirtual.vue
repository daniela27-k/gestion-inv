<template>
  <div class="ivi-container">
    <!-- Botón flotante -->
    <Transition name="bounce">
      <button v-if="!isOpen" @click="toggleChat" class="ivi-trigger" aria-label="Abrir asistente Invi">
        <div class="ivi-trigger-pulse"></div>
        <div class="ivi-trigger-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            <path d="M8 12h.01M12 12h.01M16 12h.01" stroke-linecap="round" stroke-width="3"/>
          </svg>
        </div>
        <div class="ivi-tooltip">
          <span>👋</span>
          <div>
            <p class="font-bold text-xs">¡Hola! Soy IVI</p>
            <p class="text-[10px] opacity-75">Asistente INVIGEX</p>
          </div>
        </div>
      </button>
    </Transition>

    <!-- Panel de chat -->
    <Transition name="slide-up">
      <div v-if="isOpen" class="ivi-panel">
        <!-- Header -->
        <div class="ivi-header">
          <div class="ivi-header-left">
            <div class="ivi-avatar">
              <span class="ivi-avatar-emoji">⚡</span>
              <div class="ivi-online-dot"></div>
            </div>
            <div>
              <h3 class="ivi-name">Invi <span>AI</span></h3>
              <p class="ivi-status">{{ isTyping ? 'Escribiendo...' : 'En línea · INVIGEX' }}</p>
            </div>
          </div>
          <button @click="toggleChat" class="ivi-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Mensajes -->
        <div ref="messagesEl" class="ivi-messages">
          <div v-if="messages.length < 2" class="ivi-welcome">
            <div class="ivi-welcome-icon">⚡</div>
            <h4>Bienvenido a INVIGEX</h4>
            <p>Soy Invi, tu asistente inteligente. Pregúntame lo que quieras sobre el sistema.</p>
          </div>

          <TransitionGroup name="msg">
            <div v-for="(msg, i) in messages" :key="i" :class="['ivi-msg', msg.sender]">
              <div v-if="msg.sender === 'bot'" class="ivi-msg-avatar">⚡</div>
              <div class="ivi-msg-content">
                <div class="ivi-bubble" v-html="formatMsg(msg.text)"></div>
                <span class="ivi-time">{{ msg.time }}</span>
              </div>
            </div>
          </TransitionGroup>

          <div v-if="isTyping" class="ivi-msg bot">
            <div class="ivi-msg-avatar">⚡</div>
            <div class="ivi-msg-content">
              <div class="ivi-bubble ivi-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Chips -->
        <div v-if="messages.length < 4" class="ivi-chips">
          <button v-for="chip in chips" :key="chip.label" @click="sendChip(chip.label)" class="ivi-chip">
            {{ chip.emoji }} {{ chip.label }}
          </button>
        </div>

        <!-- Input -->
        <div class="ivi-footer">
          <form @submit.prevent="sendMessage" class="ivi-form">
            <input v-model="input" type="text" placeholder="Escribe tu pregunta..." class="ivi-input" />
            <button type="submit" :disabled="!input.trim()" class="ivi-send">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            </button>
          </form>
          <p class="ivi-footer-note">INVIGEX · Sistema de Gestión de Inventario</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { searchKnowledge } from '~/utils/invigex-knowledge.js'

const isOpen = ref(false)
const input = ref('')
const messages = ref([])
const isTyping = ref(false)
const messagesEl = ref(null)

const chips = [
  { emoji: '📦', label: '¿Qué es INVIGEX?' },
  { emoji: '🎯', label: '¿Cuál es el objetivo?' },
  { emoji: '👤', label: '¿Qué roles existen?' },
  { emoji: '🧩', label: '¿Qué módulos tiene?' },
  { emoji: '⚙️', label: '¿Qué tecnologías usa?' },
  { emoji: '❓', label: '¿Por qué es importante?' },
]

const greetings = ['hola', 'buenas', 'hi', 'hey', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos']
const thanks = ['gracias', 'ok', 'listo', 'perfecto', 'excelente', 'genial', 'entendi', 'entendí']

const getAnswer = (text) => {
  const lower = text.toLowerCase().trim()

  if (greetings.some(g => lower.includes(g))) {
    return `¡Hola! 👋 Soy **Invi ⚡**, el asistente de **INVIGEX**.\n\nPuedo responder tus preguntas sobre el sistema de gestión de inventario. ¿En qué puedo ayudarte?`
  }

  if (thanks.some(t => lower.includes(t))) {
    return `¡Con gusto! 😊 Si tienes más preguntas sobre INVIGEX, aquí estaré.`
  }

  const result = searchKnowledge(text)

  if (result) {
    return `📄 Según la documentación de INVIGEX:\n\n${result}`
  }

  return `No encontré información específica sobre **"${text}"** en la documentación.\n\nPuedes preguntarme sobre:\n• ¿Qué es INVIGEX?\n• Roles del sistema\n• Módulos disponibles\n• Tecnologías utilizadas\n• Cómo funciona`
}

const formatMsg = (text) =>
  text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')

const scrollDown = async () => {
  await nextTick()
  if (messagesEl.value) messagesEl.value.scrollTo({ top: messagesEl.value.scrollHeight, behavior: 'smooth' })
}

const addMsg = (sender, text) => {
  messages.value.push({ sender, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
  scrollDown()
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && messages.value.length === 0) {
    setTimeout(() => addMsg('bot', `¡Hola! 👋 Soy **Invi ⚡**, el asistente de **INVIGEX**.\n\nPuedo responder tus preguntas sobre el sistema. ¿En qué puedo ayudarte?`), 300)
  }
}

const sendMessage = async () => {
  if (!input.value.trim()) return
  const text = input.value.trim()
  input.value = ''
  addMsg('user', text)
  isTyping.value = true
  await new Promise(r => setTimeout(r, 700 + Math.random() * 500))
  isTyping.value = false
  addMsg('bot', getAnswer(text))
}

const sendChip = (label) => { input.value = label; sendMessage() }
</script>

<style scoped>
.ivi-container {
  font-family: 'Inter', 'Outfit', system-ui, sans-serif;
  --green: #059669; --green-light: #10b981; --green-dark: #047857;
  --white: #ffffff; --text: #1e293b; --muted: #64748b; --border: #e2e8f0;
}
.ivi-trigger {
  position: fixed; bottom: 28px; right: 28px; width: 64px; height: 64px;
  border-radius: 20px; background: linear-gradient(135deg, var(--green), var(--green-dark));
  border: none; cursor: pointer; z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 25px rgba(5,150,105,0.45);
  transition: transform 0.3s cubic-bezier(0.175,0.885,0.32,1.275);
}
.ivi-trigger:hover { transform: scale(1.12) rotate(8deg); }
.ivi-trigger-pulse {
  position: absolute; inset: 0; border-radius: inherit;
  border: 3px solid var(--green-light); animation: ivi-pulse 2s infinite;
}
@keyframes ivi-pulse { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.6);opacity:0} }
.ivi-trigger-icon svg { width: 28px; height: 28px; color: white; }
.ivi-tooltip {
  position: absolute; bottom: 75px; right: 0; background: white;
  border-radius: 14px; padding: 10px 14px; display: flex; align-items: center; gap: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12); white-space: nowrap;
  pointer-events: none; border: 1px solid var(--border);
  opacity: 0; transform: translateY(6px); transition: all 0.3s;
}
.ivi-trigger:hover .ivi-tooltip { opacity: 1; transform: translateY(0); }
.ivi-tooltip::after {
  content: ''; position: absolute; bottom: -6px; right: 20px;
  width: 12px; height: 12px; background: white;
  border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
  transform: rotate(45deg);
}
.ivi-panel {
  position: fixed; bottom: 28px; right: 28px; width: 390px; height: 620px;
  background: var(--white); border-radius: 28px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.18); z-index: 1001;
  display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--border);
}
.ivi-header {
  display: flex; align-items: center; justify-content: space-between; padding: 16px 20px;
  background: linear-gradient(135deg, var(--green-dark) 0%, var(--green) 100%); flex-shrink: 0;
}
.ivi-header-left { display: flex; align-items: center; gap: 12px; }
.ivi-avatar {
  width: 44px; height: 44px; background: rgba(255,255,255,0.2); border-radius: 14px;
  display: flex; align-items: center; justify-content: center; position: relative; font-size: 22px;
}
.ivi-online-dot {
  position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px;
  background: #22c55e; border: 2.5px solid white; border-radius: 50%;
}
.ivi-name { color: white; font-weight: 800; font-size: 16px; margin: 0; }
.ivi-name span { background: rgba(255,255,255,0.25); padding: 1px 7px; border-radius: 6px; font-size: 11px; margin-left: 4px; }
.ivi-status { color: rgba(255,255,255,0.8); font-size: 11px; margin: 0; }
.ivi-close {
  width: 32px; height: 32px; background: rgba(255,255,255,0.2); border: none;
  border-radius: 10px; cursor: pointer; color: white;
  display: flex; align-items: center; justify-content: center; transition: background 0.2s;
}
.ivi-close:hover { background: rgba(255,255,255,0.35); }
.ivi-messages {
  flex: 1; padding: 16px; overflow-y: auto;
  display: flex; flex-direction: column; gap: 12px; background: #f8fafc;
}
.ivi-messages::-webkit-scrollbar { width: 4px; }
.ivi-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
.ivi-welcome {
  background: white; border-radius: 18px; padding: 20px; text-align: center;
  border: 1px solid var(--border); box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.ivi-welcome-icon { font-size: 36px; margin-bottom: 8px; }
.ivi-welcome h4 { font-weight: 800; color: var(--text); font-size: 15px; margin: 0 0 6px; }
.ivi-welcome p { color: var(--muted); font-size: 12px; margin: 0; line-height: 1.5; }
.ivi-msg { display: flex; align-items: flex-end; gap: 8px; }
.ivi-msg.user { flex-direction: row-reverse; }
.ivi-msg-avatar {
  width: 30px; height: 30px; background: linear-gradient(135deg, var(--green), var(--green-dark));
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  font-size: 14px; flex-shrink: 0;
}
.ivi-msg-content { display: flex; flex-direction: column; gap: 3px; max-width: 78%; }
.ivi-msg.user .ivi-msg-content { align-items: flex-end; }
.ivi-bubble { padding: 10px 14px; border-radius: 18px; font-size: 13px; line-height: 1.55; word-break: break-word; }
.ivi-msg.bot .ivi-bubble {
  background: white; color: var(--text); border-bottom-left-radius: 4px;
  border: 1px solid var(--border); box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.ivi-msg.user .ivi-bubble {
  background: linear-gradient(135deg, var(--green), var(--green-dark));
  color: white; border-bottom-right-radius: 4px;
}
.ivi-time { color: var(--muted); font-size: 10px; padding: 0 4px; }
.ivi-typing { display: flex; align-items: center; gap: 4px; padding: 14px 18px !important; }
.ivi-typing span { width: 7px; height: 7px; background: var(--muted); border-radius: 50%; animation: ivi-dot 1.4s infinite; }
.ivi-typing span:nth-child(2) { animation-delay: 0.2s; }
.ivi-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes ivi-dot { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
.ivi-chips {
  padding: 8px 16px; display: flex; gap: 6px; overflow-x: auto;
  flex-shrink: 0; background: #f8fafc; border-top: 1px solid var(--border);
}
.ivi-chips::-webkit-scrollbar { display: none; }
.ivi-chip {
  padding: 6px 12px; background: white; border: 1.5px solid var(--border);
  border-radius: 50px; font-size: 11px; font-weight: 600; color: var(--muted);
  cursor: pointer; white-space: nowrap; transition: all 0.2s; flex-shrink: 0;
}
.ivi-chip:hover { border-color: var(--green); color: var(--green); background: #f0fdf4; }
.ivi-footer { padding: 12px 16px 16px; background: white; border-top: 1px solid var(--border); flex-shrink: 0; }
.ivi-form {
  display: flex; gap: 8px; background: #f8fafc; padding: 6px 6px 6px 14px;
  border-radius: 16px; border: 1.5px solid var(--border); transition: border-color 0.2s;
}
.ivi-form:focus-within { border-color: var(--green); }
.ivi-input { flex: 1; border: none; background: transparent; outline: none; font-size: 13px; color: var(--text); }
.ivi-input::placeholder { color: #94a3b8; }
.ivi-send {
  width: 36px; height: 36px; background: linear-gradient(135deg, var(--green), var(--green-dark));
  border: none; border-radius: 11px; color: white; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: opacity 0.2s;
}
.ivi-send:disabled { opacity: 0.4; cursor: not-allowed; }
.ivi-footer-note { text-align: center; color: #94a3b8; font-size: 10px; margin: 6px 0 0; }
.bounce-enter-active { animation: bounce-in 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
.bounce-leave-active { animation: bounce-in 0.3s reverse; }
@keyframes bounce-in { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
.slide-up-enter-active { animation: slide-up 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
.slide-up-leave-active { animation: slide-up 0.3s reverse ease-in; }
@keyframes slide-up { from{transform:translateY(20px) scale(0.95);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }
.msg-enter-active { animation: msg-in 0.3s ease; }
@keyframes msg-in { from{transform:translateY(8px);opacity:0} to{transform:translateY(0);opacity:1} }
</style>