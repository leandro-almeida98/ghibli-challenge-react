import { useMemo } from 'react'
import type { Movie } from '../types/movie'
import type { Filters, MovieMeta } from '../types/movie'

interface UseFilteredMoviesParams {
    movies: Movie[]
    moviesMeta: Record<string, MovieMeta>
    filters: Filters
}

function highlightMatch(text: string, term: string): boolean {
    return text.toLowerCase().includes(term.toLowerCase())
}

export const useFilteredMovies = ({ movies, moviesMeta, filters }: UseFilteredMoviesParams) => {
    return useMemo(() => {
        const term = filters.search.trim().toLowerCase()

        let result = movies.filter((movie) => {
            const meta = moviesMeta[movie.id]

            // Busca por texto
            if (term) {
                const matchTitle = movie.title.toLowerCase().includes(term)
                const matchDesc =
                    filters.includeDescription && movie.description.toLowerCase().includes(term)
                if (!matchTitle && !matchDesc) return false
            }

            // Filtros de status
            if (filters.onlyWatched && !meta?.watched) return false
            if (filters.onlyFavorites && !meta?.favorite) return false
            if (filters.onlyWithAnnotation && !meta?.annotation) return false
            if (filters.minStars > 0 && (meta?.starRating ?? 0) < filters.minStars) return false

            return true
        })

        // Ordenação
        result = [...result].sort((a, b) => {
            const metaA = moviesMeta[a.id]
            const metaB = moviesMeta[b.id]
            let comparison = 0

            switch (filters.sortField) {
                case 'title':
                    comparison = a.title.localeCompare(b.title)
                    break
                case 'running_time':
                    comparison = parseInt(a.running_time) - parseInt(b.running_time)
                    break
                case 'rt_score':
                    comparison = parseInt(a.rt_score) - parseInt(b.rt_score)
                    break
                case 'starRating':
                    comparison = (metaA?.starRating ?? 0) - (metaB?.starRating ?? 0)
                    break
            }

            return filters.sortDirection === 'asc' ? comparison : -comparison
        })

        return result
    }, [movies, moviesMeta, filters])
}

export { highlightMatch }
