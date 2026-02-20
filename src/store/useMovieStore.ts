import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Filters, MovieMeta, SortDirection, SortField } from '../types/movie'

interface MovieStore {
    moviesMeta: Record<string, MovieMeta>
    filters: Filters
    toggleFavorite: (id: string) => void
    toggleWatched: (id: string) => void
    setAnnotation: (id: string, annotation: string, starRating: number) => void
    removeAnnotation: (id: string) => void
    getMeta: (id: string) => MovieMeta
    setSearch: (search: string) => void
    setIncludeDescription: (val: boolean) => void
    setOnlyWatched: (val: boolean) => void
    setOnlyFavorites: (val: boolean) => void
    setOnlyWithAnnotation: (val: boolean) => void
    setMinStars: (val: number) => void
    setSortField: (field: SortField) => void
    setSortDirection: (dir: SortDirection) => void
    resetFilters: () => void
}

const defaultMeta = (id: string): MovieMeta => ({
    id,
    watched: false,
    favorite: false,
    annotation: '',
    starRating: 0,
})

const defaultFilters: Filters = {
    search: '',
    includeDescription: false,
    onlyWatched: false,
    onlyFavorites: false,
    onlyWithAnnotation: false,
    minStars: 0,
    sortField: 'title',
    sortDirection: 'asc',
}

export const useMovieStore = create<MovieStore>()(
    persist(
        (set, get) => ({
            moviesMeta: {},
            filters: { ...defaultFilters },

            getMeta: (id) => get().moviesMeta[id] ?? defaultMeta(id),

            toggleFavorite: (id) =>
                set((state) => {
                    const current = state.moviesMeta[id] ?? defaultMeta(id)
                    return {
                        moviesMeta: {
                            ...state.moviesMeta,
                            [id]: { ...current, favorite: !current.favorite },
                        },
                    }
                }),

            toggleWatched: (id) =>
                set((state) => {
                    const current = state.moviesMeta[id] ?? defaultMeta(id)
                    return {
                        moviesMeta: {
                            ...state.moviesMeta,
                            [id]: { ...current, watched: !current.watched },
                        },
                    }
                }),

            setAnnotation: (id, annotation, starRating) =>
                set((state) => {
                    const current = state.moviesMeta[id] ?? defaultMeta(id)
                    return {
                        moviesMeta: {
                            ...state.moviesMeta,
                            [id]: { ...current, annotation, starRating },
                        },
                    }
                }),

            removeAnnotation: (id) =>
                set((state) => {
                    const current = state.moviesMeta[id] ?? defaultMeta(id)
                    return {
                        moviesMeta: {
                            ...state.moviesMeta,
                            [id]: { ...current, annotation: '', starRating: 0 },
                        },
                    }
                }),

            setSearch: (search) =>
                set((state) => ({ filters: { ...state.filters, search } })),
            setIncludeDescription: (val) =>
                set((state) => ({ filters: { ...state.filters, includeDescription: val } })),
            setOnlyWatched: (val) =>
                set((state) => ({ filters: { ...state.filters, onlyWatched: val } })),
            setOnlyFavorites: (val) =>
                set((state) => ({ filters: { ...state.filters, onlyFavorites: val } })),
            setOnlyWithAnnotation: (val) =>
                set((state) => ({ filters: { ...state.filters, onlyWithAnnotation: val } })),
            setMinStars: (val) =>
                set((state) => ({ filters: { ...state.filters, minStars: val } })),
            setSortField: (field) =>
                set((state) => ({ filters: { ...state.filters, sortField: field } })),
            setSortDirection: (dir) =>
                set((state) => ({ filters: { ...state.filters, sortDirection: dir } })),
            resetFilters: () => set({ filters: { ...defaultFilters } }),
        }),
        {
            name: 'ghibli-movie-store',
            partialize: (state) => ({
                moviesMeta: state.moviesMeta,
                filters: state.filters,
            }),
        }
    )
)
