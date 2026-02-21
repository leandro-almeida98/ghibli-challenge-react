import { motion } from 'framer-motion'
import { Heart, Eye, Star, Clock, CalendarDays, User, StickyNote } from 'lucide-react'
import { useMovieStore } from '../../store/useMovieStore'
import { HighlightText } from '../ui/HighlightText'
import type { Movie } from '../../types/movie'
import { toast } from 'sonner'

interface MovieCardProps {
    movie: Movie
    searchTerm: string
    includeDescription: boolean
    onOpenAnnotation: (movie: Movie) => void
}

export function MovieCard({ movie, searchTerm, includeDescription, onOpenAnnotation }: MovieCardProps) {
    const { getMeta, toggleFavorite, toggleWatched } = useMovieStore()
    const meta = getMeta(movie.id)

    const handleFavorite = () => {
        toggleFavorite(movie.id)
        toast.success(meta.favorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos', {
            icon: meta.favorite ? '💔' : '❤️',
        })
    }

    const handleWatched = () => {
        toggleWatched(movie.id)
        toast.success(meta.watched ? 'Marcado como não assistido' : 'Marcado como assistido', {
            icon: meta.watched ? '👁️' : '✅',
        })
    }

    const scoreColor =
        parseInt(movie.rt_score) >= 90
            ? 'text-green-400'
            : parseInt(movie.rt_score) >= 70
                ? 'text-yellow-400'
                : 'text-red-400'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col rounded-2xl overflow-hidden bg-[#1a1a2e] border border-[#2a2a3e] hover:border-[#4a4a6e] transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-purple-900/20"
        >
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex gap-1">
                {meta.watched && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-sm">
                        Assistido
                    </span>
                )}
                {meta.favorite && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-pink-600/90 text-white backdrop-blur-sm">
                        Favorito
                    </span>
                )}
            </div>

            {/* Poster */}
            <div className="relative overflow-hidden">
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                {/* Score badge */}
                <div className={`absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-bold ${scoreColor}`}>
                    <Star className="w-3 h-3 fill-current" />
                    {movie.rt_score}%
                </div>
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                {/* Título */}
                <h2 className="text-lg font-bold text-white leading-tight line-clamp-2">{movie.title}</h2>

                {/* Metadados */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" /> {movie.release_date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {movie.running_time} min
                    </span>
                </div>

                <div className="text-xs text-slate-400 flex flex-col gap-0.5">
                    <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> Dir: {movie.director}
                    </span>
                    <span className="flex items-center gap-1 pl-4">Prod: {movie.producer}</span>
                </div>

                {/* Sinopse */}
                <p className="text-sm text-slate-300 line-clamp-4 flex-1">
                    {includeDescription && searchTerm ? (
                        <HighlightText text={movie.description} term={searchTerm} />
                    ) : (
                        movie.description
                    )}
                </p>

                {/* Avaliação pessoal */}
                {meta.starRating > 0 && (
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < meta.starRating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`}
                            />
                        ))}
                        <span className="text-xs text-slate-400 ml-1">Minha avaliação</span>
                    </div>
                )}

                {/* Anotação prévia */}
                {meta.annotation && (
                    <p className="text-xs text-slate-400 italic border-l-2 border-purple-500 pl-2 line-clamp-2">
                        "{meta.annotation}"
                    </p>
                )}

                {/* Ações */}
                <div className="flex items-center gap-2 pt-1 border-t border-[#2a2a3e]">
                    <button
                        onClick={handleFavorite}
                        title={meta.favorite ? 'Remover dos favoritos' : 'Favoritar'}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${meta.favorite
                                ? 'bg-pink-600/20 text-pink-400 border border-pink-600/40 hover:bg-pink-600/30'
                                : 'bg-[#2a2a3e] text-slate-400 border border-transparent hover:border-pink-600/40 hover:text-pink-400'
                            }`}
                    >
                        <Heart className={`w-3.5 h-3.5 ${meta.favorite ? 'fill-current' : ''}`} />
                        {meta.favorite ? 'Favorito' : 'Favoritar'}
                    </button>

                    <button
                        onClick={handleWatched}
                        title={meta.watched ? 'Desmarcar assistido' : 'Marcar como assistido'}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${meta.watched
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/40 hover:bg-blue-600/30'
                                : 'bg-[#2a2a3e] text-slate-400 border border-transparent hover:border-blue-600/40 hover:text-blue-400'
                            }`}
                    >
                        <Eye className={`w-3.5 h-3.5 ${meta.watched ? 'fill-current' : ''}`} />
                        {meta.watched ? 'Assistido' : 'Assistir'}
                    </button>

                    <button
                        onClick={() => onOpenAnnotation(movie)}
                        title="Adicionar anotação"
                        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2a2a3e] text-slate-400 border border-transparent hover:border-purple-600/40 hover:text-purple-400 transition-all duration-200"
                    >
                        <StickyNote className="w-3.5 h-3.5" />
                        {meta.annotation ? 'Editar nota' : 'Anotar'}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
