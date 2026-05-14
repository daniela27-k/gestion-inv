export default defineNuxtRouteMiddleware(async (to) => {
    const publicRoutes = ['/login', '/register', '/nosotros', '/']
    if (publicRoutes.includes(to.path)) return

    const config = useRuntimeConfig()
    const baseURL = config.public.apiBaseUrl || 'http://localhost:3001'
    const user = useState('user')

    if (user.value) return

    if (process.client) {
        const token = localStorage.getItem('access_token')
        if (!token) return navigateTo('/login')

        try {
            const profile = await $fetch(`${baseURL}/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            user.value = profile
        } catch {
            localStorage.removeItem('access_token')
            return navigateTo('/login')
        }
    }
})