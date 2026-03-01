// middleware/auth.ts
// Protege todas las rutas que usen este middleware.
// Se aplica globalmente a las rutas privadas (layout perfil-layout).

export default defineNuxtRouteMiddleware(async (to) => {
    // Rutas que NO requieren autenticación
    const publicRoutes = ['/login', '/register', '/nosotros', '/']
    if (publicRoutes.includes(to.path)) return

    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'

    // Usamos useState para acceder al estado global del usuario (compartido con useAuth)
    const user = useState('user')

    // Si ya hay usuario en el estado global, no hacemos fetch adicional
    if (user.value) return

    // Intentamos obtener el perfil desde el backend (cookie httpOnly incluida automáticamente)
    try {
        const profile = await $fetch(`${baseURL}/auth/profile`, {
            credentials: 'include',
        })
        user.value = profile
    } catch {
        // Si la cookie es inválida o expiró, redirigimos al login
        return navigateTo('/login')
    }
})
