interface HighlightTextProps {
    text: string
    term: string
    className?: string
}

export function HighlightText({ text, term, className = '' }: HighlightTextProps) {
    if (!term.trim()) return <span className={className}>{text}</span>

    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)

    return (
        <span className={className}>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-yellow-400 text-black rounded px-0.5">
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    )
}
