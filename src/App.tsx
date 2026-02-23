import { useState, useEffect } from 'react'
import { useMovies } from './hooks/useMovies'
import { useMovieStore } from './store/useMovieStore'
import { useFilteredMovies } from './hooks/useFilteredMovies'
import { MovieGrid } from './components/MovieCard/MovieGrid'
import { SearchBar } from './components/SearchBar/SearchBar'
import { FilterPanel } from './components/FilterPanel/FilterPanel'
import { AnnotationModal } from './components/AnnotationModal/AnnotationModal'
import { ThemeToggle } from './components/ui/ThemeToggle'
import type { Movie } from './types/movie'

function App() {
  const { data: movies = [], isLoading, isError } = useMovies()
  const { filters, moviesMeta, theme } = useMovieStore()
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const filteredMovies = useFilteredMovies({ movies, moviesMeta, filters })

  // Aplica classe de tema no <html>
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
  }, [theme])

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

  const isDark = theme === 'dark'

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f0f1a] text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-8 py-4 transition-colors duration-300 ${isDark ? 'bg-[#0f0f1a]/90 border-[#1a1a2e]' : 'bg-white/90 border-gray-200'}`}>
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                🎬 Ghibli Movies
              </h1>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                {isLoading ? 'Carregando...' : `${filteredMovies.length} de ${movies.length} filmes`}
              </p>
            </div>
            <ThemeToggle />
          </div>
          <SearchBar />
        </div>
      </header>

      {/* Filtros */}
      <div className={`px-4 sm:px-8 py-3 border-b transition-colors duration-300 ${isDark ? 'bg-[#0d0d1a] border-[#1a1a2e]' : 'bg-gray-100 border-gray-200'}`}>
        <div className="max-w-screen-2xl mx-auto">
          <FilterPanel />
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-8">
        <MovieGrid
          movies={filteredMovies}
          isLoading={isLoading}
          searchTerm={filters.search}
          includeDescription={filters.includeDescription}
          onOpenAnnotation={setSelectedMovie}
        />
      </section>

      <AnnotationModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </main>
  )
}

export default App
