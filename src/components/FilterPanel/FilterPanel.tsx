import { RotateCcw, ArrowUpDown } from 'lucide-react'
import { useMovieStore } from '../../store/useMovieStore'
import type { SortField, SortDirection } from '../../types/movie'

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

    return (
        <div className="flex flex-wrap gap-3 items-center">
            {/* Filtros de status */}
            <div className="flex flex-wrap gap-2">
                {[
                    { label: '✅ Assistidos', key: 'onlyWatched', value: filters.onlyWatched, fn: setOnlyWatched },
                    { label: '❤️ Favoritos', key: 'onlyFavorites', value: filters.onlyFavorites, fn: setOnlyFavorites },
                    { label: '📝 Com nota', key: 'onlyWithAnnotation', value: filters.onlyWithAnnotation, fn: setOnlyWithAnnotation },
                ].map(({ label, value, fn }) => (
                    <button
                        key={label}
                        onClick={() => fn(!value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 ${value
                                ? 'bg-purple-600/20 text-purple-300 border-purple-500/50'
                                : 'bg-[#1a1a2e] text-slate-400 border-[#2a2a3e] hover:border-purple-500/30'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Mínimo de estrelas */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-xs">⭐ Mín:</span>
                <select
                    value={filters.minStars}
                    onChange={(e) => setMinStars(Number(e.target.value))}
                    className="bg-[#1a1a2e] border border-[#2a2a3e] text-slate-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-500"
                >
                    <option value={0}>Todas</option>
                    {[1, 2, 3, 4, 5].map((s) => (
                        <option key={s} value={s}>{s}★</option>
                    ))}
                </select>
            </div>

            {/* Divisor */}
            <div className="w-px h-6 bg-[#2a2a3e] hidden sm:block" />

            {/* Ordenação */}
            <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <select
                    value={filters.sortField}
                    onChange={(e) => setSortField(e.target.value as SortField)}
                    className="bg-[#1a1a2e] border border-[#2a2a3e] text-slate-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-500"
                >
                    {SORT_FIELDS.map((f) => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                </select>
                <button
                    onClick={() => setSortDirection(filters.sortDirection === 'asc' ? 'desc' : 'asc')}
                    title="Inverter ordem"
                    className="px-2.5 py-1.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-slate-400 hover:border-purple-500/30 hover:text-purple-400 transition-all text-xs font-mono"
                >
                    {filters.sortDirection === 'asc' ? '↑ A-Z' : '↓ Z-A'}
                </button>
            </div>

            {/* Reset */}
            <button
                onClick={resetFilters}
                title="Limpar todos os filtros"
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-500 hover:text-slate-300 border border-transparent hover:border-[#2a2a3e] transition-all"
            >
                <RotateCcw className="w-3 h-3" /> Limpar
            </button>
        </div>
    )
}
