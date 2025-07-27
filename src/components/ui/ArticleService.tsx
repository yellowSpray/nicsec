interface ArticleProps {
    title: string,
    text: string,
    className?: string
}
export default function ArticleService ({ title , text, className }: ArticleProps) {
    return (
        <article className={`grid col-span-1 items-start px-4 pt-5 ${className}`}>
            <h4 className="text-lg">{title}</h4>
            <p className="text-sm">{text}</p>
        </article>
    )
}