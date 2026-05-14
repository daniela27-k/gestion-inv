// plugins/keep-alive.client.ts
export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const url = `${config.public.apiBaseUrl}/health`

    // Primer ping inmediato al cargar la app
    $fetch(url).catch(() => {})

    // Ping cada 8 minutos para evitar que Railway duerma
    setInterval(() => {
        $fetch(url).catch(() => {})
    }, 8 * 60 * 1000)
})