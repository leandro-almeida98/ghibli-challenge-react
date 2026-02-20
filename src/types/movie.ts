export interface Movie {
    id: string
    title: string
    original_title: string
    original_title_romanised: string
    image: string
    movie_banner: string
    description: string
    director: string
    producer: string
    release_date: string
    running_time: string
    rt_score: string
    people: string[]
    species: string[]
    locations: string[]
    vehicles: string[]
    url: string
}

export interface MovieMeta {
    id: string
    watched: boolean
    favorite: boolean
    annotation: string
    starRating: number // 0 = sem avaliação, 1-5
}

export interface MovieWithMeta extends Movie {
    meta: MovieMeta
}

export type SortField = 'title' | 'running_time' | 'rt_score' | 'starRating'
export type SortDirection = 'asc' | 'desc'

export interface Filters {
    search: string
    includeDescription: boolean
    onlyWatched: boolean
    onlyFavorites: boolean
    onlyWithAnnotation: boolean
    minStars: number
    sortField: SortField
    sortDirection: SortDirection
}
