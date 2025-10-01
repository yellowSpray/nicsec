interface ArticleProps {
    title: string,
    text: string,
    className?: string
}
export default function ArticleService ({ title , text, className }: ArticleProps) {
    return (
        <article className={`service-article ${className}`}>
            <h4 className="text-lg xl:mb-3 lg:mb-1 mb-3">{title}</h4>
            <p className="text-sm">{text}</p>
        </article>
    )
}