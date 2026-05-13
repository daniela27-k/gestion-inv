//composables/useApi.ts
import type { UseFetchOptions } from 'nuxt/app';

export function useApi<T>(url: string | (() => string), opts: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl || 'http://localhost:3001',
    credentials: 'include',
  };

  const options = { ...defaults, ...opts };
  return useFetch(url, options as any);
}