import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { highlightKeywords } from "../../features/highLight";
import { TiArrowDown, TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import SvgContent from "../ui/svgContent";
import Button from "../ui/button";
import { scrollToSection } from "../../features/scrollButton";

interface ContentButton {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface ContentProps {
  /** Optional: without an image, a plain brand background is used */
  backgroundImage?: string;
  imageAlt?: string;
  title: string;
  text: string;
  positionClassName?: string;
  is404?: boolean;
  /** Overrides the default "contact" button */
  primaryButton?: ContentButton;
  secondaryButton?: ContentButton;
}

export default function Content({
  backgroundImage,
  imageAlt = "",
  title,
  text,
  positionClassName,
  is404,
  primaryButton,
  secondaryButton,
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

  const primary: ContentButton = primaryButton ?? {
    label: t("button.content"),
    onClick: scrollToSection,
  };

  return (
    <section className="w-full mb-16 md:mb-32 px-8">
      <div className="mx-auto max-w-6xl space-y-8 z-0">
        <div className="clipped-container relative w-full h-150 sm:h-140 overflow-hidden flex flex-col items-center">
          <SvgContent />
          {backgroundImage ? (
            <img src={backgroundImage} alt={imageAlt} />
          ) : (
            <div className="clipped-bg" aria-hidden="true" />
          )}
          <article className={`clipped-content space-y-8 ${positionClassName}`}>
            <aside className="md:w-150 sm:w-100 w-70 space-y-8">
              <h2 className="text-3xl sm:text-5xl">{parsedTitle}</h2>
              <p className="text-sm">{text}</p>
            </aside>
            <div className="flex flex-row flex-wrap justify-center items-center gap-5">
              {is404 && (
                <Button
                  buttonTxt={t("button.404")}
                  iconeButton={<TiArrowBack size={20} />}
                  className="btn-secondary"
                  onClick={() => navigate(-1)}
                />
              )}
              <Button
                buttonTxt={primary.label}
                iconeButton={primary.icon ?? <TiArrowDown size={20} />}
                className="btn-primary"
                onClick={() => primary.onClick?.()}
              />
              {secondaryButton && (
                <Button
                  buttonTxt={secondaryButton.label}
                  iconeButton={secondaryButton.icon}
                  className="btn-secondary"
                  onClick={() => secondaryButton.onClick?.()}
                />
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
