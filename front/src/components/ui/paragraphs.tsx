interface ParagraphsProps {
  /** Text where "\n" marks a new paragraph (set in the i18n files) */
  text: string;
  className?: string;
  paragraphClassName?: string;
}

/** Renders each line of a text as its own paragraph, with a small gap between them */
export default function Paragraphs({ text, className = "", paragraphClassName = "" }: ParagraphsProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {text.split("\n").map((line, index) => (
        <p key={index} className={paragraphClassName}>{line}</p>
      ))}
    </div>
  );
}
