import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { highlightKeywords } from "../../features/highLight";
import { TiArrowDown, TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import SvgContent from "../ui/SvgContent";
import Button from "../ui/Button";
import { scrollToSection } from "../../features/scrollButton";

interface ContentProps {
  backgroundImage: string;
  title: string;
  text: string;
  positionClassName?: string;
  is404?: boolean;
}

export default function Content({
  backgroundImage,
  title,
  text,
  positionClassName,
  is404,
}: ContentProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [parsedTitle, setParsedTitle] = useState<React.ReactNode[]>([]);
  const keywords = [
    "Professional",
    "Professionnel",
    "Professionele",
    "Detective",
    "Détective",
    "Privédetective",
    "Services",
    "Deskundige",
    "About",
    "À propos",
    "Over",
    "Faq",
    "Contact",
  ];

  useEffect(() => {
    setParsedTitle(highlightKeywords(title, keywords));
  }, [title]);

  return (
    <section className="xl:w-6xl lg:w-5xl md:w-4xl smd:w-3xl w-xl mb-25">
      <div className="clipped-container relative w-full h-140 overflow-hidden flex flex-col items-center">
         <SvgContent />
        <img src={backgroundImage} alt="Private Detective Professional" />
        <article className={`clipped-content ${positionClassName}`}>
          <aside className="md:w-150 w-100">
            <h2 className="text-5xl">{parsedTitle}</h2>
            <p className="text-sm my-5">{text}</p>
          </aside>
          <div className="flex flex-row items-center gap-5">
            {is404 && (
              <Button
                buttonTxt={t("button.404")}
                iconeButton={<TiArrowBack size={20} />}
                className="border-2 border-white"
                onClick={() => navigate(-1)}
              />
            )}
            <Button
              buttonTxt={t("button.content")}
              iconeButton={<TiArrowDown size={20} />}
              className="bg-second"
              onClick={() => scrollToSection()}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
