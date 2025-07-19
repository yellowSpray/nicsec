interface CardProps {
  iconeCard: React.ReactNode;
  titleCard: string;
  textCard: string;
  className?: string;
}

export default function Card({
  iconeCard,
  titleCard,
  textCard,
  className,
}: CardProps) {
  return (
    <article
      className={`flex flex-col items-center justify-between ${className}`}
    >
      <div className="text-second mb-2">{iconeCard}</div>
      <h4 className="text-lg mb-2">{titleCard}</h4>
      <p className="text-sm text-center">{textCard}</p>
    </article>
  );
}
