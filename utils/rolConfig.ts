export type Rol = 'ADMIN' | 'INSTRUCTOR' | 'USUARIO'

export interface Permisos {
  ver: boolean
  crear: boolean
  editar: boolean
  eliminar: boolean
  gestionar_usuarios: boolean
}

export interface MenuItem {
  id: string
  name: string
  icon: string
  visible: boolean
  permisos: Permisos
}

export interface BotonAccion {
  id: string
  label: string
  icon: string
  color: string
  visible: boolean
  disabled?: boolean
}

// Configuración de permisos por rol
export const permisosPorRol: Record<Rol, Permisos> = {
  ADMIN: {
    ver: true,
    crear: true,
    editar: true,
    eliminar: true,
    gestionar_usuarios: true
  },
  INSTRUCTOR: {
    ver: true,
    crear: true,
    editar: true,
    eliminar: false,
    gestionar_usuarios: false
  },
  USUARIO: {
    ver: true,
    crear: false,
    editar: false,
    eliminar: false,
    gestionar_usuarios: false
  }
}

// Configuración del sidebar
export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'mdi:view-dashboard',
    visible: true,
    permisos: { ver: true, crear: false, editar: false, eliminar: false, gestionar_usuarios: false }
  },
  {
    id: 'ver-inventario',
    name: 'Ver Inventario',
    icon: 'mdi:eye-outline',
    visible: true,
    permisos: { ver: true, crear: false, editar: false, eliminar: false, gestionar_usuarios: false }
  },
  {
    id: 'agregar-elemento',
    name: 'Agregar Elemento',
    icon: 'mdi:plus',
    visible: false,
    permisos: { ver: false, crear: true, editar: false, eliminar: false, gestionar_usuarios: false }
  },
  {
    id: 'dar-baja',
    name: 'Dar de Baja',
    icon: 'mdi:trash-can-outline',
    visible: false,
    permisos: { ver: false, crear: false, editar: false, eliminar: true, gestionar_usuarios: false }
  },
  {
    id: 'ambiente',
    name: 'Gestión de Ambientes',
    icon: 'mdi:office-building',
    visible: false,
    permisos: { ver: true, crear: true, editar: true, eliminar: true, gestionar_usuarios: false }
  },
  {
    id: 'tipo-elemento',
    name: 'Tipos de Elemento',
    icon: 'mdi:tag-multiple',
    visible: false,
    permisos: { ver: true, crear: true, editar: true, eliminar: true, gestionar_usuarios: false }
  },
  {
    id: 'usuarios',
    name: 'Gestión Usuarios',
    icon: 'mdi:account-multiple',
    visible: false,
    permisos: { ver: false, crear: false, editar: false, eliminar: false, gestionar_usuarios: true }
  }
]

// Función para filtrar menú según rol
export function getMenuItemsForRol(rol: Rol): MenuItem[] {
  const permisos = permisosPorRol[rol]
  return menuItems.filter(item => {
    // Dashboard y ver-inventario siempre visibles si tienen permiso ver
    if (item.id === 'dashboard' || item.id === 'ver-inventario') {
      return permisos.ver
    }
    // Otros items según sus permisos específicos
    return (
      (item.permisos.ver && permisos.ver) ||
      (item.permisos.crear && permisos.crear) ||
      (item.permisos.editar && permisos.editar) ||
      (item.permisos.eliminar && permisos.eliminar) ||
      (item.permisos.gestionar_usuarios && permisos.gestionar_usuarios)
    )
  })
}

// Botones de acción para CRUD de ambientes
export function getBotonesAmbiente(rol: Rol): BotonAccion[] {
  const permisos = permisosPorRol[rol]
  return [
    {
      id: 'ver',
      label: 'Ver',
      icon: 'mdi:eye',
      color: 'blue',
      visible: permisos.ver
    },
    {
      id: 'crear',
      label: 'Crear Ambiente',
      icon: 'mdi:plus',
      color: 'green',
      visible: permisos.crear
    },
    {
      id: 'editar',
      label: 'Editar',
      icon: 'mdi:pencil',
      color: 'yellow',
      visible: permisos.editar
    },
    {
      id: 'eliminar',
      label: 'Eliminar',
      icon: 'mdi:delete',
      color: 'red',
      visible: permisos.eliminar
    }
  ].filter(boton => boton.visible)
}

// Función para obtener color del badge de rol
export function getRoleBadgeColor(rol: Rol): string {
  switch (rol) {
    case 'ADMIN':
      return 'bg-red-100 text-red-800'
    case 'INSTRUCTOR':
      return 'bg-blue-100 text-blue-800'
    case 'USUARIO':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Función para obtener color del estado del ambiente
export function getEstadoAmbienteColor(estado: string): string {
  switch (estado) {
    case 'activo':
      return 'bg-green-100 text-green-800'
    case 'inactivo':
      return 'bg-gray-100 text-gray-800'
    case 'mantenimiento':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}