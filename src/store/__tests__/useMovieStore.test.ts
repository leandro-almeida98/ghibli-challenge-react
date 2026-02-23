import { describe, it, expect, beforeEach } from 'vitest'
import { act } from 'react'
import { useMovieStore } from '../useMovieStore'

describe('useMovieStore', () => {
    beforeEach(() => {
        // Reset o store entre testes
        act(() => {
            useMovieStore.setState({ moviesMeta: {} })
        })
    })

    describe('toggleFavorite', () => {
        it('deve marcar o filme como favorito', () => {
            act(() => {
                useMovieStore.getState().toggleFavorite('movie-1')
            })
            expect(useMovieStore.getState().getMeta('movie-1').favorite).toBe(true)
        })

        it('deve desmarcar o filme como favorito ao chamar novamente', () => {
            act(() => {
                useMovieStore.getState().toggleFavorite('movie-1')
                useMovieStore.getState().toggleFavorite('movie-1')
            })
            expect(useMovieStore.getState().getMeta('movie-1').favorite).toBe(false)
        })

        it('nao deve afetar outros filmes ao favoritar um', () => {
            act(() => {
                useMovieStore.getState().toggleFavorite('movie-1')
            })
            expect(useMovieStore.getState().getMeta('movie-2').favorite).toBe(false)
        })
    })

    describe('toggleWatched', () => {
        it('deve marcar o filme como assistido', () => {
            act(() => {
                useMovieStore.getState().toggleWatched('movie-1')
            })
            expect(useMovieStore.getState().getMeta('movie-1').watched).toBe(true)
        })
    })

    describe('setAnnotation', () => {
        it('deve salvar anotacao e avaliacao por estrelas', () => {
            act(() => {
                useMovieStore.getState().setAnnotation('movie-1', 'Incrivel!', 5)
            })
            const meta = useMovieStore.getState().getMeta('movie-1')
            expect(meta.annotation).toBe('Incrivel!')
            expect(meta.starRating).toBe(5)
        })
    })

    describe('removeAnnotation', () => {
        it('deve remover anotacao e zerar estrelas', () => {
            act(() => {
                useMovieStore.getState().setAnnotation('movie-1', 'Teste', 3)
                useMovieStore.getState().removeAnnotation('movie-1')
            })
            const meta = useMovieStore.getState().getMeta('movie-1')
            expect(meta.annotation).toBe('')
            expect(meta.starRating).toBe(0)
        })
    })

    describe('toggleTheme', () => {
        it('deve alternar entre dark e light', () => {
            const initial = useMovieStore.getState().theme
            act(() => {
                useMovieStore.getState().toggleTheme()
            })
            const toggled = useMovieStore.getState().theme
            expect(toggled).not.toBe(initial)
        })
    })
})
