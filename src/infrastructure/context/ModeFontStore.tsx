import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    darkMode: boolean,
    setMode: () => void, 
}

const useModeStore = create<State>()(persist(
    (set) => ({
        darkMode: false,
        setMode: () => set((state)=> {
            const newDarkMode = !state.darkMode;
            document.body.classList.toggle('dark', newDarkMode)
            return { darkMode: newDarkMode }
        })
    }), {
        name: 'mode'
    },
))

if (useModeStore.getState().darkMode) {
    document.body.classList.add('dark');
}

export default useModeStore;