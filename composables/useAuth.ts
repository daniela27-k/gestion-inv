import { navigateTo } from "#app";
import { useState, useRuntimeConfig } from "#imports";
import { toRaw } from "vue";

interface UserCredentials {
    nombre_completo?: string;
    email: string;
    password?: string;
    telefono?: string;
    rol?: string;
    estado?: string;
}

interface AuthUser {
    id: number;
    nombre_completo: string;
    email: string;
    telefono: string;
    rol_usuario: string;
    estado_usuario: string;
}

interface ProfileResponse {
    id: number;
    nombre_completo: string;
    email: string;
    telefono: string;
    rol_usuario: string;
    estado_usuario: string;
}

const getToken = () => {
    if (process.client) return localStorage.getItem('access_token');
    return null;
};

const setToken = (token: string) => {
    if (process.client) localStorage.setItem('access_token', token);
};

const removeToken = () => {
    if (process.client) localStorage.removeItem('access_token');
};

export const useAuth = () => {
    const runtimeConfig = useRuntimeConfig();
    const user = useState<ProfileResponse | null>('user');

    const fetchWithAuth = async <T>(url: string, options: any = {}): Promise<T> => {
        const token = getToken();
        return $fetch<T>(url, {
            ...options,
            headers: {
                ...options.headers,
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
    };

    const register = async (credentials: UserCredentials): Promise<AuthUser> => {
        const plainCredentials = toRaw(credentials);
        const response = await $fetch<{ usuario: AuthUser; access_token: string }>(
            `${runtimeConfig.public.apiBaseUrl}/auth/register`,
            { method: 'POST', body: plainCredentials }
        );
        if (!response || !response.usuario) throw new Error('Error en el servidor');
        user.value = null;
        removeToken();
        setToken(response.access_token);
        user.value = response.usuario;
        return response.usuario;
    };

    const login = async (credentials: UserCredentials): Promise<AuthUser> => {
        const plainCredentials = toRaw(credentials);
        const response = await $fetch<{ usuario: AuthUser; access_token: string }>(
            `${runtimeConfig.public.apiBaseUrl}/auth/login`,
            { method: 'POST', body: plainCredentials }
        );
        if (!response || !response.usuario) throw new Error('Error en el servidor');
        // Limpiar estado anterior antes de setear el nuevo usuario
        user.value = null;
        removeToken();
        setToken(response.access_token);
        user.value = response.usuario;
        return response.usuario;
    };

    const logout = async () => {
        try {
            await fetchWithAuth(`${runtimeConfig.public.apiBaseUrl}/auth/logout`, { method: 'POST' });
        } catch (error) {
            console.error('Error al cerrar sesion:', error);
        } finally {
            removeToken();
            user.value = null;
            await navigateTo('/login');
        }
    };

    const getProfile = async (): Promise<ProfileResponse | null> => {
        try {
            const profile = await fetchWithAuth<ProfileResponse>(`${runtimeConfig.public.apiBaseUrl}/auth/profile`);
            user.value = profile;
            return profile;
        } catch {
            user.value = null;
            return null;
        }
    };

    return { user, register, login, logout, getProfile, fetchWithAuth };
};