export default defineNuxtRouteMiddleware(async (to) => {
    const publicRoutes = ['/login', '/register', '/nosotros', '/']
    if (publicRoutes.includes(to.path)) return

    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'
    const user = useState('user')

    if (process.client) {
        const token = localStorage.getItem('access_token')

        if (!token) {
            user.value = null
            return navigateTo('/login')
        }

        // Si no hay usuario en memoria, cargar desde el token actual
        if (!user.value) {
            try {
                const profile = await $fetch(`${baseURL}/auth/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                user.value = profile
            } catch {
                localStorage.removeItem('access_token')
                user.value = null
                return navigateTo('/login')
            }
        }
    }
})