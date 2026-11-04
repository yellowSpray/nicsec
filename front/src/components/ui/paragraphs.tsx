import type { ReactNode } from "react";

interface ParagraphsProps {
  /** Text where "\n" marks a new paragraph and <b>…</b> a bold part (set in the i18n files) */
  text: string;
  className?: string;
  paragraphClassName?: string;
}

/** Turns "<b>…</b>" parts of a line into bold spans */
const renderBold = (line: string): ReactNode[] =>
  line.split(/(<b>.*?<\/b>)/g).map((part, index) =>
    part.startsWith("<b>") && part.endsWith("</b>")
      ? <span key={index} className="font-bold">{part.slice(3, -4)}</span>
      : part
  );

/** Renders each line of a text as its own paragraph, with a small gap between them */
export default function Paragraphs({ text, className = "", paragraphClassName = "" }: ParagraphsProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {text.split("\n").map((line, index) => (
        <p key={index} className={paragraphClassName}>{renderBold(line)}</p>
      ))}
    </div>
  );
}
