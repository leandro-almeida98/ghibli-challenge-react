import axios from 'axios'
import type { Movie } from '../types/movie'

const api = axios.create({
    baseURL: 'https://ghibliapi.vercel.app',
    timeout: 10000,
})

export const fetchMovies = async (): Promise<Movie[]> => {
    const { data } = await api.get<Movie[]>('/films')
    return data
}
