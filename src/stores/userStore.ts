import { create } from "zustand";

import type { UserInfoResponseDto } from "@/apis/response/user";

// interface User {
//     userId: string;
//     nickname: string;
//     email: string;
//     profileImageUrl?: string;

// }

interface UserStoreState {
    user: UserInfoResponseDto | null;
    setUser: (user: UserInfoResponseDto) => void
    clearUser: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}))