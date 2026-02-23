import { RotateCcw, ArrowUpDown } from 'lucide-react'
import { useMovieStore } from '../../store/useMovieStore'
import type { SortField } from '../../types/movie'

const SORT_FIELDS: { value: SortField; label: string }[] = [
    { value: 'title', label: 'Título' },
    { value: 'running_time', label: 'Duração' },
    { value: 'rt_score', label: 'Nota Ghibli' },
    { value: 'starRating', label: 'Minha Nota' },
]

export function FilterPanel() {
    const {
        filters,
        setOnlyWatched,
        setOnlyFavorites,
        setOnlyWithAnnotation,
        setMinStars,
        setSortField,
        setSortDirection,
        resetFilters,
    } = useMovieStore()

    const btnBase = 'px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200'
    const btnOff = `${btnBase} bg-white dark:bg-[#1a1a2e] text-gray-500 dark:text-slate-400 border-gray-200 dark:border-[#2a2a3e] hover:border-purple-300 dark:hover:border-purple-500/30`
    const btnOn = `${btnBase} bg-purple-50 dark:bg-purple-600/20 text-purple-600 dark:text-purple-300 border-purple-300 dark:border-purple-500/50`

    const selectClass = `
    bg-white dark:bg-[#1a1a2e]
    border border-gray-200 dark:border-[#2a2a3e]
    text-gray-700 dark:text-slate-300
    rounded-lg px-2 py-1.5 text-xs
    focus:outline-none focus:border-purple-400 dark:focus:border-purple-500`

    return (
        <div className="flex flex-wrap gap-3 items-center">
            <div className="flex flex-wrap gap-2">
                {[
                    { label: '✅ Assistidos', value: filters.onlyWatched, fn: setOnlyWatched },
                    { label: '❤️ Favoritos', value: filters.onlyFavorites, fn: setOnlyFavorites },
                    { label: '📝 Com nota', value: filters.onlyWithAnnotation, fn: setOnlyWithAnnotation },
                ].map(({ label, value, fn }) => (
                    <button key={label} onClick={() => fn(!value)} className={value ? btnOn : btnOff}>
                        {label}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-slate-400">⭐ Mín:</span>
                <select value={filters.minStars} onChange={(e) => setMinStars(Number(e.target.value))} className={selectClass}>
                    <option value={0}>Todas</option>
                    {[1, 2, 3, 4, 5].map((s) => <option key={s} value={s}>{s}★</option>)}
                </select>
            </div>

            <div className="w-px h-6 bg-gray-200 dark:bg-[#2a2a3e] hidden sm:block" />

            <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
                <select value={filters.sortField} onChange={(e) => setSortField(e.target.value as SortField)} className={selectClass}>
                    {SORT_FIELDS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
                <button
                    onClick={() => setSortDirection(filters.sortDirection === 'asc' ? 'desc' : 'asc')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all
            bg-white dark:bg-[#1a1a2e]
            border border-gray-200 dark:border-[#2a2a3e]
            text-gray-600 dark:text-slate-400
            hover:border-purple-300 dark:hover:border-purple-500/30
            hover:text-purple-600 dark:hover:text-purple-400`}
                >
                    {filters.sortDirection === 'asc' ? '↑ A-Z' : '↓ Z-A'}
                </button>
            </div>

            <button
                onClick={resetFilters}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs
          text-gray-400 dark:text-slate-500
          hover:text-gray-700 dark:hover:text-slate-300
          border border-transparent hover:border-gray-200 dark:hover:border-[#2a2a3e] transition-all"
            >
                <RotateCcw className="w-3 h-3" /> Limpar
            </button>
        </div>
    )
}
