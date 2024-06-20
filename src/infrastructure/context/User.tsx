import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultUser = {
    id: 0,
    nombre_completo: '',
    token: '',
    username: '',
    user_id: 0,
    admin: false,
}

export interface IUser {
    id: number,
    nombre_completo: string,
    token: string,
    username: string,
    user_id: number,
    admin: boolean,
}

interface State extends IUser {
    setUser: (data: IUser) => void;
    resetUser: () => void;
}

const useUserStore = create<State>()(persist(
    (set) => ({ ...defaultUser,
        setUser: (data: IUser) => set({ ...data }),
        resetUser: () => set(defaultUser)
    }), {
        name: 'user'
    }
))

export default useUserStore;