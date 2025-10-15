//composables/useApi.ts

import type { UseFetchOptions } from 'nuxt/app';

export function useApi<T>(url: string | (() => string), opts: UseFetchOptions<T> = {}) {
  const defaults: UseFetchOptions<T> = {
    baseURL: 'http://localhost:3001', // URL del backend en NestJS
    credentials: 'include', // La clave para enviar la cookie
  };
  

  // Combina las opciones predeterminadas con las opciones pasadas por el usuario
  const options = { ...defaults, ...opts };

  // Ahora, useFetch generará la clave única automáticamente
  return useFetch(url, options as any);
}