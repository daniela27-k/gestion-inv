// export type Rol = 'ADMIN' | 'INSTRUCTOR' | 'USUARIO'

// export interface Permisos {
//   ver: boolean
//   crear: boolean
//   editar: boolean
//   eliminar: boolean
//   gestionar_usuarios: boolean
// }

// export interface MenuItem {
//   id: string
//   name: string
//   icon: string
//   visible: boolean
//   permisos: Permisos
// }

// export interface BotonAccion {
//   id: string
//   label: string
//   icon: string
//   color: string
//   visible: boolean
//   disabled?: boolean
// }

// // Configuración de permisos por rol
// export const permisosPorRol: Record<Rol, Permisos> = {
//   ADMIN: {
//     ver: true,
//     crear: true,
//     editar: true,
//     eliminar: true,
//     gestionar_usuarios: true
//   },
//   INSTRUCTOR: {
//     ver: true,
//     crear: true,
//     editar: true,
//     eliminar: false,
//     gestionar_usuarios: false
//   },
//   USUARIO: {
//     ver: true,
//     crear: false,
//     editar: false,
//     eliminar: false,
//     gestionar_usuarios: false
//   }
// }

// // Configuración del sidebar
// export const menuItems: MenuItem[] = [
//   {
//     id: 'dashboard',
//     name: 'Dashboard',
//     icon: 'mdi:view-dashboard',
//     visible: true,
//     permisos: { ver: true, crear: false, editar: false, eliminar: false, gestionar_usuarios: false }
//   },
//   {
//     id: 'ver-inventario',
//     name: 'Ver Inventario',
//     icon: 'mdi:eye-outline',
//     visible: true,
//     permisos: { ver: true, crear: false, editar: false, eliminar: false, gestionar_usuarios: false }
//   },
//   {
//     id: 'agregar-elemento',
//     name: 'Agregar Elemento',
//     icon: 'mdi:plus',
//     visible: false,
//     permisos: { ver: false, crear: true, editar: false, eliminar: false, gestionar_usuarios: false }
//   },
//   {
//     id: 'dar-baja',
//     name: 'Dar de Baja',
//     icon: 'mdi:trash-can-outline',
//     visible: false,
//     permisos: { ver: false, crear: false, editar: false, eliminar: true, gestionar_usuarios: false }
//   },
//   {
//     id: 'ambiente',
//     name: 'Gestión de Ambientes',
//     icon: 'mdi:office-building',
//     visible: false,
//     permisos: { ver: true, crear: true, editar: true, eliminar: true, gestionar_usuarios: false }
//   },
//   {
//     id: 'tipo-elemento',
//     name: 'Tipos de Elemento',
//     icon: 'mdi:tag-multiple',
//     visible: false,
//     permisos: { ver: true, crear: true, editar: true, eliminar: true, gestionar_usuarios: false }
//   },
//   {
//     id: 'usuarios',
//     name: 'Gestión Usuarios',
//     icon: 'mdi:account-multiple',
//     visible: false,
//     permisos: { ver: false, crear: false, editar: false, eliminar: false, gestionar_usuarios: true }
//   }
// ]

// // Función para filtrar menú según rol
// export function getMenuItemsForRol(rol: Rol): MenuItem[] {
//   const permisos = permisosPorRol[rol]
//   return menuItems.filter(item => {
//     // Dashboard y ver-inventario siempre visibles si tienen permiso ver
//     if (item.id === 'dashboard' || item.id === 'ver-inventario') {
//       return permisos.ver
//     }
//     // Otros items según sus permisos específicos
//     return (
//       (item.permisos.ver && permisos.ver) ||
//       (item.permisos.crear && permisos.crear) ||
//       (item.permisos.editar && permisos.editar) ||
//       (item.permisos.eliminar && permisos.eliminar) ||
//       (item.permisos.gestionar_usuarios && permisos.gestionar_usuarios)
//     )
//   })
// }

// // Botones de acción para CRUD de ambientes
// export function getBotonesAmbiente(rol: Rol): BotonAccion[] {
//   const permisos = permisosPorRol[rol]
//   return [
//     {
//       id: 'ver',
//       label: 'Ver',
//       icon: 'mdi:eye',
//       color: 'blue',
//       visible: permisos.ver
//     },
//     {
//       id: 'crear',
//       label: 'Crear Ambiente',
//       icon: 'mdi:plus',
//       color: 'green',
//       visible: permisos.crear
//     },
//     {
//       id: 'editar',
//       label: 'Editar',
//       icon: 'mdi:pencil',
//       color: 'yellow',
//       visible: permisos.editar
//     },
//     {
//       id: 'eliminar',
//       label: 'Eliminar',
//       icon: 'mdi:delete',
//       color: 'red',
//       visible: permisos.eliminar
//     }
//   ].filter(boton => boton.visible)
// }

// // Función para obtener color del badge de rol
// export function getRoleBadgeColor(rol: Rol): string {
//   switch (rol) {
//     case 'ADMIN':
//       return 'bg-red-100 text-red-800'
//     case 'INSTRUCTOR':
//       return 'bg-blue-100 text-blue-800'
//     case 'USUARIO':
//       return 'bg-green-100 text-green-800'
//     default:
//       return 'bg-gray-100 text-gray-800'
//   }
// }

// // Función para obtener color del estado del ambiente
// export function getEstadoAmbienteColor(estado: string): string {
//   switch (estado) {
//     case 'activo':
//       return 'bg-green-100 text-green-800'
//     case 'inactivo':
//       return 'bg-gray-100 text-gray-800'
//     case 'mantenimiento':
//       return 'bg-yellow-100 text-yellow-800'
//     default:
//       return 'bg-gray-100 text-gray-800'
//   }
// }

export type Rol = 'ADMIN' | 'INSTRUCTOR' | 'USUARIO'

export interface Permisos {
  // Permisos generales de inventario
  ver_inventario: boolean
  agregar_elemento: boolean
  editar_elemento: boolean
  dar_baja_elemento: boolean
  
  // Permisos de asignaciones
  crear_asignacion: boolean
  editar_asignacion: boolean
  ver_asignaciones_propias: boolean
  ver_todas_asignaciones: boolean
  
  // Permisos de ambientes
  ver_ambientes: boolean
  crear_ambiente: boolean
  editar_ambiente: boolean
  eliminar_ambiente: boolean
  ver_solo_mis_ambientes: boolean
  
  // Permisos de tipos de elemento
  gestionar_tipos_elemento: boolean
  
  // Permisos de estados
  gestionar_estados: boolean
  
  // Permisos de novedades
  registrar_novedad: boolean
  ver_novedades_propias: boolean
  ver_todas_novedades: boolean
  
  // Permisos de usuarios
  gestionar_usuarios: boolean
  
  // Permisos de reportes
  generar_reportes_propios: boolean
  generar_reportes_globales: boolean
}

export interface MenuItem {
  id: string
  name: string
  icon: string
  requiredPermissions: (keyof Permisos)[]
  description?: string
}

export interface BotonAccion {
  id: string
  label: string
  icon: string
  color: string
  requiredPermission: keyof Permisos
  disabled?: boolean
}

// Configuración de permisos por rol
export const permisosPorRol: Record<Rol, Permisos> = {
  ADMIN: {
    // Inventario completo
    ver_inventario: true,
    agregar_elemento: true,
    editar_elemento: true,
    dar_baja_elemento: true,
    
    // Asignaciones globales
    crear_asignacion: true,
    editar_asignacion: true,
    ver_asignaciones_propias: true,
    ver_todas_asignaciones: true,
    
    // Ambientes completos
    ver_ambientes: true,
    crear_ambiente: true,
    editar_ambiente: true,
    eliminar_ambiente: true,
    ver_solo_mis_ambientes: false, // Ve todos
    
    // Configuración del sistema
    gestionar_tipos_elemento: true,
    gestionar_estados: true,
    
    // Novedades globales
    registrar_novedad: true,
    ver_novedades_propias: true,
    ver_todas_novedades: true,
    
    // Usuarios
    gestionar_usuarios: true,
    
    // Reportes globales
    generar_reportes_propios: true,
    generar_reportes_globales: true
  },
  
  INSTRUCTOR: {
    // Inventario de consulta y gestión limitada
    ver_inventario: true,
    agregar_elemento: false, // Solo admin da de alta
    editar_elemento: true, // Puede actualizar ubicación, estado
    dar_baja_elemento: false, // Solo puede reportar, no dar de baja
    
    // Asignaciones de sus ambientes
    crear_asignacion: true,
    editar_asignacion: true,
    ver_asignaciones_propias: true,
    ver_todas_asignaciones: false,
    
    // Solo sus ambientes
    ver_ambientes: true,
    crear_ambiente: false,
    editar_ambiente: false,
    eliminar_ambiente: false,
    ver_solo_mis_ambientes: true,
    
    // Sin permisos de configuración
    gestionar_tipos_elemento: false,
    gestionar_estados: false,
    
    // Novedades de sus ambientes
    registrar_novedad: true,
    ver_novedades_propias: true,
    ver_todas_novedades: false,
    
    // Sin gestión de usuarios
    gestionar_usuarios: false,
    
    // Solo reportes de sus ambientes
    generar_reportes_propios: true,
    generar_reportes_globales: false
  },
  
  USUARIO: {
    // Solo consulta básica
    ver_inventario: true,
    agregar_elemento: false,
    editar_elemento: false,
    dar_baja_elemento: false,
    
    // Puede ver sus asignaciones
    crear_asignacion: false,
    editar_asignacion: false,
    ver_asignaciones_propias: true,
    ver_todas_asignaciones: false,
    
    // Consulta básica de ambientes
    ver_ambientes: true,
    crear_ambiente: false,
    editar_ambiente: false,
    eliminar_ambiente: false,
    ver_solo_mis_ambientes: true,
    
    // Sin configuración
    gestionar_tipos_elemento: false,
    gestionar_estados: false,
    
    // Puede reportar novedades
    registrar_novedad: true,
    ver_novedades_propias: true,
    ver_todas_novedades: false,
    
    // Sin gestión de usuarios
    gestionar_usuarios: false,
    
    // Sin reportes
    generar_reportes_propios: false,
    generar_reportes_globales: false
  }
}

// Configuración del menú lateral
export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'mdi:view-dashboard',
    requiredPermissions: ['ver_inventario'],
    description: 'Vista general del sistema'
  },
  {
    id: 'ver-inventario',
    name: 'Consultar Inventario',
    icon: 'mdi:package-variant',
    requiredPermissions: ['ver_inventario'],
    description: 'Ver elementos del inventario'
  },
  {
    id: 'agregar-elemento',
    name: 'Agregar Elemento',
    icon: 'mdi:plus-circle',
    requiredPermissions: ['agregar_elemento'],
    description: 'Registrar nuevos elementos'
  },
  {
    id: 'dar-baja',
    name: 'Dar de Baja Elementos',
    icon: 'mdi:archive-arrow-down',
    requiredPermissions: ['dar_baja_elemento'],
    description: 'Eliminar elementos del inventario'
  },
  {
    id: 'asignaciones',
    name: 'Gestión de Asignaciones',
    icon: 'mdi:transfer',
    requiredPermissions: ['crear_asignacion'],
    description: 'Asignar elementos a ambientes'
  },
  {
    id: 'mis-asignaciones',
    name: 'Mis Asignaciones',
    icon: 'mdi:clipboard-list',
    requiredPermissions: ['ver_asignaciones_propias'],
    description: 'Ver elementos asignados a mí'
  },
  {
    id: 'ambientes',
    name: 'Gestión de Ambientes',
    icon: 'mdi:door',
    requiredPermissions: ['crear_ambiente', 'editar_ambiente', 'eliminar_ambiente'],
    description: 'Administrar salones y espacios'
  },
  {
    id: 'mis-ambientes',
    name: 'Mis Ambientes',
    icon: 'mdi:home-account',
    requiredPermissions: ['ver_solo_mis_ambientes'],
    description: 'Ver ambientes asignados'
  },
  {
    id: 'novedades',
    name: 'Registrar Novedad',
    icon: 'mdi:alert-circle',
    requiredPermissions: ['registrar_novedad'],
    description: 'Reportar incidentes o cambios'
  },
  {
    id: 'tipo-elemento',
    name: 'Tipos de Elemento',
    icon: 'mdi:tag-multiple',
    requiredPermissions: ['gestionar_tipos_elemento'],
    description: 'Configurar categorías'
  },
  {
    id: 'estados',
    name: 'Estados de Elemento',
    icon: 'mdi:state-machine',
    requiredPermissions: ['gestionar_estados'],
    description: 'Configurar estados del inventario'
  },
  {
    id: 'reportes',
    name: 'Reportes',
    icon: 'mdi:chart-bar',
    requiredPermissions: ['generar_reportes_propios', 'generar_reportes_globales'],
    description: 'Generar informes'
  },
  {
    id: 'usuarios',
    name: 'Gestión de Usuarios',
    icon: 'mdi:account-multiple',
    requiredPermissions: ['gestionar_usuarios'],
    description: 'Administrar usuarios del sistema'
  }
]

// Función para filtrar menú según rol
export function getMenuItemsForRol(rol: Rol): MenuItem[] {
  const permisos = permisosPorRol[rol]
  
  return menuItems.filter(item => {
    // El item es visible si el usuario tiene AL MENOS uno de los permisos requeridos
    return item.requiredPermissions.some(permiso => permisos[permiso] === true)
  })
}

// Botones de acción para elementos del inventario
export function getBotonesInventario(rol: Rol): BotonAccion[] {
  const permisos = permisosPorRol[rol]
  
  const botones: BotonAccion[] = [
    {
      id: 'ver-detalle',
      label: 'Ver Detalle',
      icon: 'mdi:eye',
      color: 'blue',
      requiredPermission: 'ver_inventario'
    },
    {
      id: 'editar',
      label: 'Editar',
      icon: 'mdi:pencil',
      color: 'yellow',
      requiredPermission: 'editar_elemento'
    },
    {
      id: 'asignar',
      label: 'Asignar',
      icon: 'mdi:arrow-right-circle',
      color: 'green',
      requiredPermission: 'crear_asignacion'
    },
    {
      id: 'dar-baja',
      label: 'Dar de Baja',
      icon: 'mdi:delete',
      color: 'red',
      requiredPermission: 'dar_baja_elemento'
    }
  ]
  
  return botones.filter(boton => permisos[boton.requiredPermission])
}

// Botones de acción para ambientes
export function getBotonesAmbiente(rol: Rol): BotonAccion[] {
  const permisos = permisosPorRol[rol]
  
  const botones: BotonAccion[] = [
    {
      id: 'ver',
      label: 'Ver Inventario',
      icon: 'mdi:eye',
      color: 'blue',
      requiredPermission: 'ver_ambientes'
    },
    {
      id: 'crear',
      label: 'Crear Ambiente',
      icon: 'mdi:plus',
      color: 'green',
      requiredPermission: 'crear_ambiente'
    },
    {
      id: 'editar',
      label: 'Editar',
      icon: 'mdi:pencil',
      color: 'yellow',
      requiredPermission: 'editar_ambiente'
    },
    {
      id: 'eliminar',
      label: 'Eliminar',
      icon: 'mdi:delete',
      color: 'red',
      requiredPermission: 'eliminar_ambiente'
    }
  ]
  
  return botones.filter(boton => permisos[boton.requiredPermission])
}

// Verificar si un usuario tiene un permiso específico
export function tienePermiso(rol: Rol, permiso: keyof Permisos): boolean {
  return permisosPorRol[rol][permiso]
}

// Verificar si un usuario puede realizar una acción sobre un elemento
export function puedeRealizarAccion(
  rol: Rol, 
  accion: 'ver' | 'crear' | 'editar' | 'eliminar',
  contexto: 'inventario' | 'ambiente' | 'asignacion' | 'usuario'
): boolean {
  const permisos = permisosPorRol[rol]
  
  const mapaPermisos: Record<string, keyof Permisos> = {
    'ver-inventario': 'ver_inventario',
    'crear-inventario': 'agregar_elemento',
    'editar-inventario': 'editar_elemento',
    'eliminar-inventario': 'dar_baja_elemento',
    'ver-ambiente': 'ver_ambientes',
    'crear-ambiente': 'crear_ambiente',
    'editar-ambiente': 'editar_ambiente',
    'eliminar-ambiente': 'eliminar_ambiente',
    'ver-asignacion': 'ver_asignaciones_propias',
    'crear-asignacion': 'crear_asignacion',
    'editar-asignacion': 'editar_asignacion',
    'eliminar-asignacion': 'editar_asignacion',
    'gestionar-usuario': 'gestionar_usuarios'
  }
  
  const key = `${accion}-${contexto}`
  const permisoRequerido = mapaPermisos[key]
  
  return permisoRequerido ? permisos[permisoRequerido] : false
}

// Función para obtener color del badge de rol
export function getRoleBadgeColor(rol: Rol): string {
  switch (rol) {
    case 'ADMIN':
      return 'bg-red-100 text-red-800 border border-red-300'
    case 'INSTRUCTOR':
      return 'bg-blue-100 text-blue-800 border border-blue-300'
    case 'USUARIO':
      return 'bg-green-100 text-green-800 border border-green-300'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Función para obtener descripción del rol
export function getRolDescription(rol: Rol): string {
  switch (rol) {
    case 'ADMIN':
      return 'Acceso total al sistema. Gestiona inventario, ambientes y usuarios.'
    case 'INSTRUCTOR':
      return 'Gestiona inventario de sus ambientes asignados. Registra asignaciones y novedades.'
    case 'USUARIO':
      return 'Consulta inventario y sus asignaciones. Puede reportar novedades.'
    default:
      return 'Usuario sin rol definido'
  }
}

// Función para obtener color del estado del elemento
export function getEstadoElementoColor(estado: string): string {
  switch (estado.toLowerCase()) {
    case 'activo':
    case 'disponible':
      return 'bg-green-100 text-green-800'
    case 'asignado':
    case 'en uso':
      return 'bg-blue-100 text-blue-800'
    case 'mantenimiento':
    case 'reparación':
      return 'bg-yellow-100 text-yellow-800'
    case 'inactivo':
    case 'dado de baja':
      return 'bg-gray-100 text-gray-800'
    case 'dañado':
    case 'extraviado':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Función para obtener color del estado del ambiente
export function getEstadoAmbienteColor(estado: string): string {
  switch (estado.toLowerCase()) {
    case 'activo':
    case 'disponible':
      return 'bg-green-100 text-green-800'
    case 'ocupado':
      return 'bg-blue-100 text-blue-800'
    case 'mantenimiento':
      return 'bg-yellow-100 text-yellow-800'
    case 'inactivo':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}