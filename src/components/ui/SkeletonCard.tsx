interface SkeletonCardProps {
    count?: number
}

export function SkeletonCard({ count = 8 }: SkeletonCardProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1a1a2e] animate-pulse"
                >
                    <div className="w-full h-64 bg-gray-200 dark:bg-[#2a2a3e]" />
                    <div className="p-4 space-y-3">
                        <div className="h-5 bg-gray-200 dark:bg-[#2a2a3e] rounded w-3/4" />
                        <div className="h-4 bg-gray-200 dark:bg-[#2a2a3e] rounded w-1/2" />
                        <div className="h-16 bg-gray-200 dark:bg-[#2a2a3e] rounded" />
                    </div>
                </div>
            ))}
        </>
    )
}
