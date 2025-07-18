import { useState, useEffect } from "react";
import { highlightKeywords } from "../../features/highLight";
import Background from "../ui/Background";
import Button from "../ui/Button";

interface ContentProps {
  backgroundImage: string;
  title: string;
  text: string;
}

export default function Content({
  backgroundImage,
  title,
  text,
}: ContentProps) {

  const [parsedTitle, setParsedTitle] = useState<React.ReactNode[]>([]);
  const keywords = ["Professional", "Detective", "Services", "About"];

  useEffect(() => {
    setParsedTitle(highlightKeywords(title, keywords));
  }, [title]);

  return (
    <div className="content">
      <div className="clipped-container flex flex-col justify-center items-center">
        <img src={backgroundImage} alt="Private Detective Professional" />
        <article className="clipped-content">
          <aside className="w-150">
            <h2>{parsedTitle}</h2>
            <p>{text}</p>
          </aside>
          <Button buttonTxt="Contact Me" />
        </article>
      </div>
      <Background />
    </div>
  );
}


