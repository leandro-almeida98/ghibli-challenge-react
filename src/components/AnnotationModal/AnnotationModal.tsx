import { useState, useEffect } from 'react'
import { X, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMovieStore } from '../../store/useMovieStore'
import type { Movie } from '../../types/movie'
import { toast } from 'sonner'

interface AnnotationModalProps {
    movie: Movie | null
    onClose: () => void
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const [hovered, setHovered] = useState(0)
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
                const star = i + 1
                const filled = star <= (hovered || value)
                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        className={`text-2xl transition-transform hover:scale-125 ${filled ? 'text-yellow-400' : 'text-slate-600'}`}
                    >
                        ★
                    </button>
                )
            })}
        </div>
    )
}

export function AnnotationModal({ movie, onClose }: AnnotationModalProps) {
    const { getMeta, setAnnotation, removeAnnotation } = useMovieStore()
    const [text, setText] = useState('')
    const [stars, setStars] = useState(0)

    useEffect(() => {
        if (movie) {
            const meta = getMeta(movie.id)
            setText(meta.annotation)
            setStars(meta.starRating)
        }
    }, [movie, getMeta])

    if (!movie) return null

    const meta = getMeta(movie.id)
    const isEditing = !!meta.annotation

    const handleSave = () => {
        if (!text.trim()) return
        setAnnotation(movie.id, text.trim(), stars)
        toast.success(isEditing ? 'Anotação atualizada!' : 'Anotação adicionada!', { icon: '📝' })
        onClose()
    }

    const handleRemove = () => {
        removeAnnotation(movie.id)
        toast.success('Anotação removida', { icon: '🗑️' })
        onClose()
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="w-full max-w-lg bg-[#1a1a2e] border border-[#2a2a3e] rounded-2xl shadow-2xl p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-white">{movie.title}</h2>
                            <p className="text-xs text-slate-400 mt-0.5">{isEditing ? 'Editar anotação' : 'Nova anotação'}</p>
                        </div>
                        <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Avaliação */}
                    <div className="mb-4">
                        <label className="text-xs text-slate-400 mb-2 block">Minha avaliação</label>
                        <StarRating value={stars} onChange={setStars} />
                    </div>

                    {/* Textarea */}
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Escreva sua anotação sobre o filme..."
                        rows={5}
                        className="w-full bg-[#0f0f1a] border border-[#2a2a3e] rounded-xl p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 resize-none transition-colors"
                    />

                    {/* Ações */}
                    <div className="flex items-center gap-2 mt-4">
                        <button
                            onClick={handleSave}
                            disabled={!text.trim()}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
                        >
                            {isEditing ? 'Salvar alterações' : 'Salvar anotação'}
                        </button>
                        {isEditing && (
                            <button
                                onClick={handleRemove}
                                className="px-3 py-2.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-600/30 transition-colors"
                                title="Remover anotação"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
