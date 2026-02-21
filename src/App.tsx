import { useState } from 'react'
import { useMovies } from './hooks/useMovies'
import { useMovieStore } from './store/useMovieStore'
import { useFilteredMovies } from './hooks/useFilteredMovies'
import { MovieGrid } from './components/MovieCard/MovieGrid'
import { SearchBar } from './components/SearchBar/SearchBar'
import { FilterPanel } from './components/FilterPanel/FilterPanel'
import { AnnotationModal } from './components/AnnotationModal/AnnotationModal'
import type { Movie } from './types/movie'

function App() {
  const { data: movies = [], isLoading, isError } = useMovies()
  const { filters, moviesMeta } = useMovieStore()
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const filteredMovies = useFilteredMovies({ movies, moviesMeta, filters })

  if (isError) {
    return (
      <main className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <div className="text-center text-slate-400">
          <p className="text-5xl mb-4">⚠️</p>
          <p className="text-lg font-medium text-white">Erro ao carregar filmes</p>
          <p className="text-sm mt-1">Verifique sua conexão e tente novamente.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0f0f1a] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0f0f1a]/90 backdrop-blur-md border-b border-[#1a1a2e] px-4 sm:px-8 py-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                🎬 Ghibli Movies
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {isLoading ? 'Carregando...' : `${filteredMovies.length} de ${movies.length} filmes`}
              </p>
            </div>
          </div>

          {/* Busca */}
          <SearchBar />
        </div>
      </header>

      {/* Filtros */}
      <div className="px-4 sm:px-8 py-3 border-b border-[#1a1a2e] bg-[#0d0d1a]">
        <div className="max-w-screen-2xl mx-auto">
          <FilterPanel />
        </div>
      </div>

      {/* Grid de filmes */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-8">
        <MovieGrid
          movies={filteredMovies}
          isLoading={isLoading}
          searchTerm={filters.search}
          includeDescription={filters.includeDescription}
          onOpenAnnotation={setSelectedMovie}
        />
      </section>

      {/* Modal de anotações */}
      <AnnotationModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </main>
  )
}

export default App
