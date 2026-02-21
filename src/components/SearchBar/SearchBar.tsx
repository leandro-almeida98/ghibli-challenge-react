import { Search } from 'lucide-react'
import { useMovieStore } from '../../store/useMovieStore'

export function SearchBar() {
    const { filters, setSearch, setIncludeDescription } = useMovieStore()

    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={filters.search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1a1a2e] border border-[#2a2a3e] text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer select-none whitespace-nowrap">
                <input
                    type="checkbox"
                    checked={filters.includeDescription}
                    onChange={(e) => setIncludeDescription(e.target.checked)}
                    className="w-4 h-4 accent-purple-500"
                />
                Incluir sinopse na busca
            </label>
        </div>
    )
}
