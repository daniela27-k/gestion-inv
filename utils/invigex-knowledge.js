// utils/invigex-knowledge.js
// Base de conocimiento extraída del PDF de documentación INVIGEX

export const knowledge = `
DOCUMENTACIÓN DEL PROYECTO INVIGEX

INVIGEX es un sistema web orientado a la gestión de inventarios y control de elementos dentro de una organización. Este proyecto permite administrar equipos, registrar movimientos, asignaciones y realizar seguimiento completo de los recursos.

OBJETIVO DEL PROYECTO: Optimizar el control de inventarios mediante una plataforma digital que facilite la administración, consulta y actualización de información en tiempo real.

QUÉ HACE EL SISTEMA: El sistema permite registrar productos o equipos, clasificarlos por tipos, asignarlos a usuarios, controlar mantenimientos y generar reportes del estado del inventario.

CÓMO FUNCIONA: Funciona como una aplicación web desarrollada con tecnologías modernas como Vue y Nuxt. Los usuarios acceden mediante roles y cada uno tiene permisos específicos para interactuar con el sistema.

ROLES DEL SISTEMA:
- Administrador: Control total del sistema, gestiona usuarios, elementos y configuraciones.
- Técnico: Registra mantenimientos, revisa equipos y actualiza estados.
- Usuario: Consulta información y solicita asignaciones de equipos.

MÓDULOS PRINCIPALES:
- Dashboard: Visualización general del sistema.
- Inventario: Gestión de productos y equipos.
- Mantenimiento: Registro y control de reparaciones.
- Asignaciones: Control de entrega de equipos a usuarios.
- Usuarios: Administración de accesos y roles.

POR QUÉ ES IMPORTANTE: Permite reducir pérdidas, mejorar la organización, llevar trazabilidad de los elementos y optimizar procesos internos.

TECNOLOGÍAS UTILIZADAS: El proyecto utiliza tecnologías web modernas como JavaScript, Vue, Nuxt para el frontend, NestJS para el backend, MySQL como base de datos y JWT para autenticación.

CONCLUSIÓN: INVIGEX es una solución integral para la gestión de inventarios que mejora la eficiencia operativa y el control de recursos en cualquier organización.
`

// Divide el conocimiento en párrafos para búsqueda
export const paragraphs = knowledge
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 20)

// Busca los párrafos más relevantes según la pregunta
export function searchKnowledge(question) {
    const words = question.toLowerCase()
        .replace(/[¿?¡!.,]/g, '')
        .split(' ')
        .filter(w => w.length > 2)

    const scored = paragraphs.map(p => {
        const lower = p.toLowerCase()
        const score = words.reduce((acc, w) => acc + (lower.includes(w) ? 1 : 0), 0)
        return { text: p, score }
    })

    const results = scored
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(r => r.text)

    return results.length > 0 ? results.join('\n\n') : null
}