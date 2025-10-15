// // composables/useAuth.ts
// import { navigateTo } from "#app";
// import { useState, useRuntimeConfig } from "#imports";

// interface UserCredentials {
//     nombre_completo?: string;
//     email: string;
//     password?: string;
//     telefono?: string;
//     rol?: string;
//     estado: string;
// }

// interface AuthUser {
//     nombre_completo?: string;
//     email: string;
//     password?: string;
//     telefono?: string;
//     rol?: string;
//     estado: string;
// }

// interface AuthResponse {
//     access_token: string;
//     user: AuthUser
// }

// interface LoginResponse {
//     user: AuthUser;
// }

// interface ProfileResponse {
//     id: number;
//     nombre_completo: string;
//     email: string;
//     telefono: string;
//     rol: string;
//     estado: string;
// }

// export const useAuth = () => {
//     const runtimeConfig = useRuntimeConfig();
//     const user = useState<ProfileResponse | null>('user');

//     const fetchWithCredentials = async <T>(url: string, options: any = {}): Promise<T> => {
//         return $fetch<T>(url, {
//             ...options,
//             credentials: 'include',
//         });
//     };

//     const register = async (credentials: UserCredentials): Promise<AuthResponse> => {
//         const response = await fetchWithCredentials<AuthResponse>(`${runtimeConfig.public.apiBaseUrl}/auth/register`,{
//             method: 'POST',
//             body: credentials,
//         });

//         if (!response) {
//             throw new Error('Error en el servidor');
//         }
//         // id se obtendra despues de profile
//         user.value = null; // Temporal hasta profile
//         return response;
//     };

//     const login = async (Credentials: UserCredentials): Promise<AuthUser> => {
//         const response = await fetchWithCredentials<LoginResponse>(`${runtimeConfig.public.apiBaseUrl}/auth/login`, {
//             method: 'POST',
//             body: Credentials,
//         });
        
//         if (!response || !response.user) {
//             throw new Error('Error en el servidor o usuario no retornado')
//         }
//         // obtener el perfil despues del login para concluir id
//         const profile = await fetchWithCredentials<ProfileResponse>(`${runtimeConfig.public.apiBaseUrl}/auth/profile`);
//         user.value = profile;
//         return response.user;
//     };

//     const logout = async () => {
//         try {
//             await fetchWithCredentials(`${runtimeConfig.public.apiBaseUrl}/auth/logout`, {
//                 method: 'POST',
//             });
//             user.value = null;
//             await navigateTo('/login');
//         }catch(error){
//             console.error('Error al cerrar sesion:', error);
//             user.value = null;
//             await navigateTo('/login');
//         }
//     };

//     return {
//         user,
//         register,
//         login,
//         logout
//     };

// };


// composables/useAuth.ts
import { navigateTo } from "#app";
import { useState, useRuntimeConfig } from "#imports";
import { toRaw } from "vue"; // ✅ Importa toRaw

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
    created_at?: string;
    updated_at?: string;
}

interface AuthResponse {
    usuario: AuthUser;
}

interface LoginResponse {
    usuario: AuthUser;
}

interface ProfileResponse {
    id: number;
    nombre_completo: string;
    email: string;
    telefono: string;
    rol_usuario: string;
    estado_usuario: string;
}

export const useAuth = () => {
    const runtimeConfig = useRuntimeConfig();
    const user = useState<ProfileResponse | null>('user');

    const fetchWithCredentials = async <T>(url: string, options: any = {}): Promise<T> => {
        return $fetch<T>(url, {
            ...options,
            credentials: 'include',
        });
    };

    const register = async (credentials: UserCredentials): Promise<AuthUser> => {
        // ✅ Convierte objetos reactivos a objetos planos antes de enviar
        const plainCredentials = toRaw(credentials);

        const response = await fetchWithCredentials<AuthResponse>(`${runtimeConfig.public.apiBaseUrl}/auth/register`,{
            method: 'POST',
            body: plainCredentials, // ✅ Usa el objeto plano
        });

        if (!response || !response.usuario) {
            throw new Error('Error en el servidor');
        }
        // El backend ya hace login automático, usar la información devuelta
        user.value = {
            id: response.usuario.id,
            nombre_completo: response.usuario.nombre_completo,
            email: response.usuario.email,
            telefono: response.usuario.telefono,
            rol_usuario: response.usuario.rol_usuario,
            estado_usuario: response.usuario.estado_usuario
        };
        return response.usuario;
    };

    const login = async (credentials: UserCredentials): Promise<AuthUser> => {
        // ✅ Convierte objetos reactivos a objetos planos antes de enviar
        const plainCredentials = toRaw(credentials);

        const response = await fetchWithCredentials<LoginResponse>(`${runtimeConfig.public.apiBaseUrl}/auth/login`, {
            method: 'POST',
            body: plainCredentials, // ✅ Usa el objeto plano
        });

        if (!response || !response.usuario) {
            throw new Error('Error en el servidor o usuario no retornado')
        }
        console.log(response)
        // Usar la información del usuario devuelta por el login
        user.value = {
            id: response.usuario.id,
            nombre_completo: response.usuario.nombre_completo,
            email: response.usuario.email,
            telefono: response.usuario.telefono,
            rol_usuario: response.usuario.rol_usuario,
            estado_usuario: response.usuario.estado_usuario
        };
        return response.usuario;
    };

    const logout = async () => {
        try {
            await fetchWithCredentials(`${runtimeConfig.public.apiBaseUrl}/auth/logout`, {
                method: 'POST',
            });
            user.value = null;
            await navigateTo('/login');
        } catch(error) {
            console.error('Error al cerrar sesion:', error);
            user.value = null;
            await navigateTo('/login');
        }
    };

    const getProfile = async (): Promise<ProfileResponse | null> => {
        try {
            const profile = await fetchWithCredentials<ProfileResponse>(`${runtimeConfig.public.apiBaseUrl}/auth/profile`);
            user.value = profile;
            return profile;
        } catch (error) {
            console.error('Error obteniendo perfil:', error);
            user.value = null;
            return null;
        }
    };

    return {
        user,
        register,
        login,
        logout,
        getProfile
    };
};