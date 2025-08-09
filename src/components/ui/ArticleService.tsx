interface ArticleProps {
    title: string,
    text: string,
    className?: string
}
export default function ArticleService ({ title , text, className }: ArticleProps) {
    return (
        <article className={`grid md:col-span-3 ${className}`}>
            <h4 className="text-lg xl:mb-3 lg:mb-1 mb-3">{title}</h4>
            <p className="text-sm">{text}</p>
        </article>
    )
}