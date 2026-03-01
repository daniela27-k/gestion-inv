<template>
  <!-- pages/perfil.vue -->
  <div class="perfil-page">

    <!-- ── LOADING ── -->
    <div v-if="pending" class="perfil-loading">
      <div class="loading-spinner"></div>
      <p>Cargando tu perfil...</p>
    </div>

    <!-- ── ERROR ── -->
    <div v-else-if="error" class="perfil-error-card">
      <div class="error-icon">⚠️</div>
      <h3>Error al cargar perfil</h3>
      <p>{{ error }}</p>
      <NuxtLink to="/login" class="btn-primary">Iniciar sesión</NuxtLink>
    </div>

    <!-- ── CONTENIDO PRINCIPAL ── -->
    <div v-else-if="profileData" class="perfil-content">

      <!-- BANNER SUPERIOR -->
      <div class="profile-banner">
        <div class="banner-bg"></div>
        <div class="banner-inner">
          
          <!-- Logo flotante INVIGEX -->
          <div class="banner-logo">
             <Icon name="mdi:shield-check" class="logo-icon" />
             <span>INVIGEX</span>
          </div>

          <!-- Avatar + Foto -->
          <div class="avatar-section">
            <div class="avatar-wrapper">
              <img
                v-if="avatarSrc"
                :src="avatarSrc"
                alt="Foto de perfil"
                class="avatar-img"
              />
              <div v-else class="avatar-placeholder">
                <span>{{ getInitials(profileData.nombre_completo) }}</span>
              </div>
              <!-- Botón cambiar foto -->
              <div @click="triggerFileInput" class="avatar-edit-btn" title="Cambiar foto">
                <Icon name="mdi:camera" />
              </div>
              <input 
                ref="fileInput"
                type="file" 
                accept="image/*" 
                class="hidden-input" 
                @change="handlePhotoChange" 
              />
            </div>
            <div v-if="photoSuccess" class="photo-success">✓ Foto actualizada</div>
          </div>

          <!-- Info del usuario -->
          <div class="banner-info">
            <h1 class="banner-name">{{ profileData.nombre_completo }}</h1>
            <p class="banner-email">{{ profileData.email }}</p>
            <div class="banner-badges">
              <span class="role-badge" :class="'role-' + profileData.rol_usuario?.toLowerCase()">
                 {{ profileData.rol_usuario }}
              </span>
              <span class="status-badge">● Activo</span>
            </div>
          </div>

          <!-- Botón editar (cabecera) -->
          <div class="banner-actions">
            <button v-if="!isEditing" class="btn-edit-header" @click="startEdit">
              ✏️ Editar Perfil
            </button>
          </div>
        </div>
      </div>

      <!-- GRID PRINCIPAL -->
      <div class="main-grid">

        <!-- ── COLUMNA IZQUIERDA: Formulario ── -->
        <div class="col-main">

          <!-- TARJETA EDITAR PERFIL -->
          <div class="card">
            <div class="card-header">
              <div class="card-icon card-icon--blue">
                <Icon name="mdi:account" />
              </div>
              <h2>Información Personal</h2>
              <div class="header-actions">
                <button v-if="!isEditing" class="btn-outline" @click="startEdit">Editar</button>
                <template v-else>
                  <button class="btn-cancel" @click="cancelEdit" :disabled="saving">Cancelar</button>
                  <button class="btn-save" @click="saveProfile" :disabled="saving">
                    <span v-if="saving" class="btn-spinner"></span>
                    {{ saving ? 'Guardando...' : 'Guardar' }}
                  </button>
                </template>
              </div>
            </div>

            <!-- Alertas -->
            <div v-if="saveSuccess" class="alert-success">✅ Perfil actualizado correctamente</div>
            <div v-if="saveError" class="alert-error">❌ {{ saveError }}</div>

            <div class="form-grid">
              <div class="form-group form-group--full">
                <label>Nombre Completo</label>
                <input
                  v-model="form.nombre_completo"
                  :disabled="!isEditing"
                  :class="['form-input', { 'form-input--error': errors.nombre_completo, 'form-input--active': isEditing }]"
                />
                <span v-if="errors.nombre_completo" class="form-error">{{ errors.nombre_completo }}</span>
              </div>

              <div class="form-group">
                <label>Correo Electrónico</label>
                <input
                  v-model="form.email"
                  type="email"
                  :disabled="!isEditing"
                  :class="['form-input', { 'form-input--error': errors.email, 'form-input--active': isEditing }]"
                />
                <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label>Teléfono</label>
                <input
                  v-model="form.telefono"
                  :disabled="!isEditing"
                  :class="['form-input', { 'form-input--error': errors.telefono, 'form-input--active': isEditing }]"
                />
                <span v-if="errors.telefono" class="form-error">{{ errors.telefono }}</span>
              </div>

              <div class="form-group">
                <label>ID Usuario</label>
                <input :value="profileData.id" disabled class="form-input form-input--readonly" />
              </div>

              <div class="form-group">
                <label>Rol del Sistema</label>
                <input :value="profileData.rol_usuario" disabled class="form-input form-input--readonly" />
              </div>
            </div>
          </div>

          <!-- TARJETA SEGURIDAD -->
          <div class="card">
            <div class="card-header">
              <div class="card-icon card-icon--purple">
                <Icon name="mdi:lock" />
              </div>
              <h2>Seguridad de la Cuenta</h2>
              <button class="btn-outline" @click="togglePasswordSection">
                {{ showPasswordSection ? 'Cancelar' : 'Cambiar Contraseña' }}
              </button>
            </div>

            <div v-if="showPasswordSection" class="form-grid">
               <div class="form-group form-group--full">
                <label>Nueva contraseña</label>
                <input v-model="passwordForm.new" type="password" class="form-input form-input--active" placeholder="Mínimo 8 caracteres" />
                <span v-if="passwordErrors.new" class="form-error">{{ passwordErrors.new }}</span>
              </div>
              <div class="form-group form-group--full">
                <button class="btn-save" @click="changePassword" :disabled="changingPassword">
                   {{ changingPassword ? 'Procesando...' : 'Actualizar Contraseña' }}
                </button>
                <div v-if="passwordSuccess" class="alert-success mt-2">✅ Contraseña actualizada</div>
              </div>
            </div>
            <p v-else class="about-text">Tu cuenta está protegida con cifrado JWT. Se recomienda cambiar la contraseña periódicamente.</p>
          </div>
        </div>

        <!-- ── COLUMNA DERECHA: Sidebar ── -->
        <div class="col-sidebar">
          
          <!-- RESUMEN ESTADÍSTICO -->
          <div class="stats-grid">
            <div class="stat-box blue" @click="router.push('/mis-asignaciones')">
              <div class="stat-icon"><Icon name="mdi:package-variant" /></div>
              <div class="stat-val">{{ stats.elementosAsignados }}</div>
              <div class="stat-lab">Asignaciones</div>
            </div>
            <div class="stat-box red" @click="router.push('/novedades')">
              <div class="stat-icon"><Icon name="mdi:alert-rhombus" /></div>
              <div class="stat-val">{{ stats.novedadesRegistradas }}</div>
              <div class="stat-lab">Novedades</div>
            </div>
          </div>

          <!-- ACCIONES RÁPIDAS -->
          <div class="card">
            <h3 class="sidebar-title">Navegación Rápida</h3>
            <div class="vertical-actions">
              <button class="action-row" @click="router.push('/inventario/consultar')">
                <Icon name="mdi:magnify" class="act-icon bg-blue" />
                <span>Consultar Inventario</span>
              </button>
              <button class="action-row" @click="router.push('/inventario/crear')">
                <Icon name="mdi:plus-box" class="act-icon bg-green" />
                <span>Agregar Elemento</span>
              </button>
              <button class="action-row" @click="router.push('/admin/ambientes')">
                <Icon name="mdi:office-building" class="act-icon bg-purple" />
                <span>Gestión de Ambientes</span>
              </button>
              <button class="action-row" @click="router.push('/reportes')">
                <Icon name="mdi:file-chart" class="act-icon bg-orange" />
                <span>Generar Reportes</span>
              </button>
            </div>
          </div>

          <!-- BOTÓN CERRAR SESIÓN -->
          <button class="logout-full" @click="handleLogout">
             <Icon name="mdi:logout" /> Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';
import { ref, reactive, computed, onMounted, watch } from 'vue';

definePageMeta({ layout: 'perfil-layout' });

const { logout, user, getProfile } = useAuth();
const router = useRouter();
const config = useRuntimeConfig();
const API = config.public.apiBaseUrl;

// ── Profile data ──────────────────────────────────────────────────────────────
const { data: apiData, pending, error } = useApi('/auth/profile', { credentials: 'include' });
const profileData = computed(() => apiData.value || user.value);

// ── Avatar Logic ─────────────────────────────────────────────────────────────
const fileInput = ref(null);
const customPhoto = ref(null);
const photoSuccess = ref(false);

const ROLE_PHOTOS = {
  'daniela': '/foto-dani.jpg',
  'hoyos': '/foto-dani.jpg'
};

const storageKey = computed(() => {
  const uid = profileData.value?.id || 'guest';
  return `invigex_avatar_${uid}`;
});

const loadSavedPhoto = () => {
  if (process.client) {
    const saved = localStorage.getItem(storageKey.value);
    if (saved) customPhoto.value = saved;
  }
};

const avatarSrc = computed(() => {
  if (customPhoto.value) return customPhoto.value;
  const nombre = (profileData.value?.nombre_completo || '').toLowerCase();
  const matchedKey = Object.keys(ROLE_PHOTOS).find(k => nombre.includes(k));
  return matchedKey ? ROLE_PHOTOS[matchedKey] : null;
});

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handlePhotoChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  if (file.size > 2 * 1024 * 1024) {
    alert('La imagen es demasiado pesada (máx 2MB)');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    customPhoto.value = reader.result;
    if (process.client) {
      localStorage.setItem(storageKey.value, reader.result);
    }
    photoSuccess.value = true;
    setTimeout(() => { photoSuccess.value = false; }, 3000);
  };
  reader.readAsDataURL(file);
};

// ── Form Edición ─────────────────────────────────────────────────────────────
const isEditing = ref(false);
const saving = ref(false);
const saveSuccess = ref(false);
const saveError = ref('');

const form = reactive({ nombre_completo: '', email: '', telefono: '' });
const errors = reactive({ nombre_completo: '', email: '', telefono: '' });

const startEdit = () => {
  form.nombre_completo = profileData.value?.nombre_completo || '';
  form.email = profileData.value?.email || '';
  form.telefono = profileData.value?.telefono || '';
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  saveError.value = '';
};

const saveProfile = async () => {
  saving.value = true;
  saveError.value = '';
  try {
    await $fetch(`${API}/auth/profile`, {
      method: 'PATCH',
      credentials: 'include',
      body: { ...form }
    });
    await getProfile();
    isEditing.value = false;
    saveSuccess.value = true;
    setTimeout(() => { saveSuccess.value = false; }, 4000);
  } catch (err) {
    saveError.value = err?.data?.message || 'Error al actualizar';
  } finally {
    saving.value = false;
  }
};

// ── Password ─────────────────────────────────────────────────────────────────
const showPasswordSection = ref(false);
const changingPassword = ref(false);
const passwordSuccess = ref(false);
const passwordForm = reactive({ new: '' });
const passwordErrors = reactive({ new: '' });

const togglePasswordSection = () => { showPasswordSection.value = !showPasswordSection.value; };

const changePassword = async () => {
  if (passwordForm.new.length < 8) {
    passwordErrors.new = 'Mínimo 8 caracteres';
    return;
  }
  changingPassword.value = true;
  try {
    await $fetch(`${API}/auth/profile`, {
      method: 'PATCH',
      credentials: 'include',
      body: { password: passwordForm.new }
    });
    passwordSuccess.value = true;
    setTimeout(() => { showPasswordSection.value = false; passwordSuccess.value = false; }, 3000);
  } catch (err) {
    alert('Error al cambiar contraseña');
  } finally {
    changingPassword.value = false;
  }
};

// ── Stats & Lifecycle ───────────────────────────────────────────────────────
const stats = ref({ elementosAsignados: 45, novedadesRegistradas: 8, ambientesGestionados: 3 });

onMounted(async () => {
  if (!user.value) await getProfile();
  loadSavedPhoto();
});

watch(() => profileData.value?.id, (newId) => { if (newId) loadSavedPhoto(); });

const handleLogout = async () => {
  try { await logout(); } catch { router.push('/login'); }
};

const formatDate = (date) => {
  if (!date) return 'Sin fecha';
  return new Date(date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
};
</script>

<style scoped>
.perfil-page {
  --primary: #059669;
  --bg: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
  min-height: 100vh;
  background: var(--bg);
  padding-bottom: 40px;
}

.perfil-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; }
.loading-spinner { width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Banner */
.profile-banner { position: relative; border-radius: 20px; overflow: hidden; margin-bottom: 30px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
.banner-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #059669, #0d9488); }
.banner-inner { position: relative; padding: 50px 40px; display: flex; align-items: center; gap: 30px; flex-wrap: wrap; }
.banner-logo { position: absolute; top: 20px; right: 25px; display: flex; align-items: center; gap: 8px; color: white; font-weight: 800; opacity: 0.8; letter-spacing: 1px; }
.logo-icon { font-size: 24px; }

.avatar-wrapper { position: relative; }
.avatar-img { width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; object-fit: cover; box-shadow: 0 8px 16px rgba(0,0,0,0.15); }
.avatar-placeholder { width: 120px; height: 120px; border-radius: 50%; background: #d1fae5; color: #059669; font-size: 40px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 4px solid white; }
.avatar-edit-btn { position: absolute; bottom: 5px; right: 5px; background: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #059669; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
.hidden-input { display: none; }

.banner-name { color: white; font-size: 32px; font-weight: 800; margin: 0; }
.banner-email { color: #d1fae5; font-size: 16px; margin: 5px 0 15px; }
.banner-badges { display: flex; gap: 10px; }
.role-badge { background: rgba(255,255,255,0.2); color: white; padding: 4px 12px; border-radius: 50px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
.status-badge { background: #d1fae5; color: #065f46; padding: 4px 12px; border-radius: 50px; font-size: 12px; font-weight: 700; }

.btn-edit-header { background: white; color: #059669; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
.btn-edit-header:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }

/* Main Grid */
.main-grid { display: grid; grid-template-columns: 1fr 350px; gap: 25px; }
@media (max-width: 1024px) { .main-grid { grid-template-columns: 1fr; } }

.card { background: white; border-radius: 18px; padding: 25px; margin-bottom: 25px; border: 1px solid #eef2f6; }
.card-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
.card-header h2 { font-size: 18px; font-weight: 700; margin: 0; flex: 1; }
.card-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.card-icon--blue { background: #eff6ff; color: #3b82f6; }
.card-icon--purple { background: #f5f3ff; color: #8b5cf6; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group--full { grid-column: 1 / -1; }
.form-group label { display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 8px; text-transform: uppercase; }
.form-input { width: 100%; padding: 12px 15px; border-radius: 10px; border: 1.5px solid #e2e8f0; font-size: 14px; background: #f8fafc; outline: none; transition: 0.2s; }
.form-input--active { background: white; border-color: #059669; }
.form-input--readonly { opacity: 0.7; }

.btn-outline { background: transparent; border: 1.5px solid #e2e8f0; padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; }
.btn-save { background: #059669; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; }
.btn-cancel { background: #f1f5f9; color: #64748b; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; }

/* Stats */
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; }
.stat-box { padding: 20px; border-radius: 18px; text-align: center; cursor: pointer; transition: 0.2s; }
.stat-box:hover { transform: translateY(-5px); }
.stat-box.blue { background: #eff6ff; color: #1d4ed8; }
.stat-box.red { background: #fef2f2; color: #dc2626; }
.stat-val { font-size: 28px; font-weight: 800; line-height: 1; }
.stat-lab { font-size: 12px; font-weight: 600; margin-top: 5px; opacity: 0.8; }

.vertical-actions { display: flex; flex-direction: column; gap: 10px; }
.action-row { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 12px; border-radius: 12px; border: none; background: #f8fafc; cursor: pointer; transition: 0.2s; }
.action-row:hover { background: #f1f5f9; padding-left: 15px; }
.act-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; }
.bg-blue { background: #3b82f6; }
.bg-green { background: #10b981; }
.bg-purple { background: #8b5cf6; }
.bg-orange { background: #f59e0b; }

.logout-full { width: 100%; padding: 15px; border-radius: 15px; background: #fee2e2; color: #dc2626; border: none; font-weight: 700; cursor: pointer; margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 10px; }
.logout-full:hover { background: #fecaca; }

.alert-success { background: #ecfdf5; color: #065f46; border: 1px solid #10b981; padding: 10px; border-radius: 10px; font-size: 13px; margin: 10px 0; }
</style>