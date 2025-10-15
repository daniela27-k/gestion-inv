# Sistema de Gestión de Inventario SENA

## Descripción
Sistema completo de gestión de inventario desarrollado para la comunidad SENA, con autenticación de usuarios, roles y permisos, y gestión completa de ambientes, elementos y usuarios.

## Tecnologías
- **Frontend**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeORM, SQLite, JWT
- **Autenticación**: JWT con cookies HTTP-only

## Instalación y Configuración

### Instalación Completa (Recomendado)
```bash
# Instalar dependencias de frontend y backend
pnpm run install:all

# Ejecutar frontend y backend simultáneamente
pnpm run dev:full
```

### Instalación Manual

#### Backend
```bash
cd ../backend/inventario-app
pnpm install
pnpm run dev
```

#### Frontend
```bash
pnpm install
pnpm run dev
```

### Verificación
```bash
# Verificar que todo esté configurado correctamente
pnpm run verify
```

Una vez que ambos servicios estén ejecutándose:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

Puedes probar el registro y login desde la interfaz del frontend.

## Características

### Autenticación
- Registro de usuarios con roles (ADMIN, INSTRUCTOR, USUARIO)
- Login seguro con JWT
- Cookies HTTP-only para seguridad
- Roles y permisos dinámicos

### Gestión de Ambientes
- CRUD completo de ambientes
- Estados: activo, inactivo, mantenimiento
- Control de capacidad y ubicación

### Sistema de Roles
- **ADMIN**: Acceso completo a todas las funciones
- **INSTRUCTOR**: Puede crear/editar, sin eliminar
- **USUARIO**: Solo lectura

## API Endpoints

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `POST /auth/logout` - Cierre de sesión
- `GET /auth/profile` - Perfil del usuario (requiere auth)

### Ambientes
- `GET /ambiente` - Listar ambientes
- `GET /ambiente/:id` - Obtener ambiente por ID
- `POST /ambiente` - Crear ambiente
- `PATCH /ambiente/:id` - Actualizar ambiente
- `DELETE /ambiente/:id` - Eliminar ambiente

## Base de Datos
El proyecto usa SQLite para desarrollo, con sincronización automática de tablas. Las tablas se crean automáticamente al iniciar el servidor.

## Variables de Entorno
```env
# Backend
JWT_SECRET=superSecretKey123
JWT_EXPIRES_IN=1d
NODE_ENV=development

# Frontend
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Desarrollo
1. Instalar dependencias en ambos proyectos
2. Iniciar el backend: `npm run start:dev` en `../backend/inventario-app`
3. Iniciar el frontend: `npm run dev` en la raíz del proyecto
4. Acceder a `http://localhost:3000`

## Problemas Solucionados

### Autenticación
- ✅ **Cookies JWT**: Configurada estrategia JWT para leer tokens desde cookies HTTP-only
- ✅ **Flujo de autenticación**: Optimizado para evitar peticiones innecesarias al profile
- ✅ **Registro automático**: El backend hace login automático después del registro
- ✅ **Roles y permisos**: Sistema completo de roles (ADMIN, INSTRUCTOR, USUARIO)

### Base de Datos
- ✅ **SQLite**: Cambiada de MySQL a SQLite para facilitar el desarrollo
- ✅ **Sincronización**: Habilitada la sincronización automática de tablas
- ✅ **Enums**: Corregidos los tipos de enum para compatibilidad con SQLite

### API y Frontend
- ✅ **Configuración CORS**: Múltiples orígenes permitidos para desarrollo
- ✅ **Gestión de ambientes**: CRUD completo con permisos por rol
- ✅ **Interfaz de usuario**: Sidebar dinámico según permisos del usuario

## Notas Importantes
- El backend usa SQLite para facilitar el desarrollo
- Las cookies JWT son HTTP-only para mayor seguridad
- La sincronización de BD está habilitada solo en desarrollo
- Los roles se validan tanto en frontend como backend
