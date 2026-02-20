import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../services/ghibliService'
import type { Movie } from '../types/movie'

export const useMovies = () => {
    return useQuery<Movie[], Error>({
        queryKey: ['movies'],
        queryFn: fetchMovies,
    })
}
