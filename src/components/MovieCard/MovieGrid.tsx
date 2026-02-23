import type { Movie } from '../../types/movie'
import { MovieCard } from './MovieCard'
import { SkeletonCard } from '../ui/SkeletonCard'

interface MovieGridProps {
    movies: Movie[]
    isLoading: boolean
    searchTerm: string
    includeDescription: boolean
    onOpenAnnotation: (movie: Movie) => void
}

export function MovieGrid({ movies, isLoading, searchTerm, includeDescription, onOpenAnnotation }: MovieGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <SkeletonCard count={8} />
            </div>
        )
    }

    if (movies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400 dark:text-slate-400">
                <span className="text-6xl mb-4">🎬</span>
                <p className="text-lg font-medium text-gray-700 dark:text-slate-300">Nenhum filme encontrado</p>
                <p className="text-sm mt-1">Tente ajustar os filtros ou a busca</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    searchTerm={searchTerm}
                    includeDescription={includeDescription}
                    onOpenAnnotation={onOpenAnnotation}
                />
            ))}
        </div>
    )
}
