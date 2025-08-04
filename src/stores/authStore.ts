// src/stores/authStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
    isLoggedIn: boolean
    accessToken: string | null
    setAccessToken: (token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            accessToken: null,
            setAccessToken: (token) => {
                set({ accessToken: token, isLoggedIn: true })
            },
            logout: () => {
                set({ isLoggedIn: false, accessToken: null })
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                accessToken: state.accessToken,
            }),
        }
    )
)
