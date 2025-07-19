import { useState, useEffect } from "react";
import { highlightKeywords } from "../../features/highLight";
import Background from "../ui/Background";
import Button from "../ui/Button";

interface ContentProps {
  backgroundImage: string,
  title: string,
  text: string,
  positionClassName?: string
}

export default function Content({
  backgroundImage,
  title,
  text,
  positionClassName
}: ContentProps) {

  const [parsedTitle, setParsedTitle] = useState<React.ReactNode[]>([]);
  const keywords = ["Professional", "Detective", "Services", "About"];

  useEffect(() => {
    setParsedTitle(highlightKeywords(title, keywords));
  }, [title]);

  return (
    <section className="w-6xl">
      <div className="clipped-container relative w-full overflow-hidden flex flex-col items-center">
        <img src={backgroundImage} alt="Private Detective Professional" />
        <article className={`clipped-content ${positionClassName}`}>
          <aside className="w-150">
            <h2 className="text-5xl">{parsedTitle}</h2>
            <p className="text-sm my-5">{text}</p>
          </aside>
          <Button buttonTxt="Contact Me" />
        </article>
      </div>
      <Background />
    </section>
  );
}


