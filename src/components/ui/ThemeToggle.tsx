import { Moon, Sun } from 'lucide-react'
import { useMovieStore } from '../../store/useMovieStore'

export function ThemeToggle() {
    const { theme, toggleTheme } = useMovieStore()

    return (
        <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            className="p-2 rounded-xl border transition-all duration-200 border-[#2a2a3e] bg-[#1a1a2e] text-slate-400 hover:text-purple-400 hover:border-purple-500/40
        dark:border-[#2a2a3e] dark:bg-[#1a1a2e]
        light:border-slate-200 light:bg-white light:text-slate-600"
        >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
    )
}
