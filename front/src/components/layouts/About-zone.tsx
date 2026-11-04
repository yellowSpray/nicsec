import { RiMapPin2Fill } from "react-icons/ri";
import { useTranslation, Trans } from "react-i18next";
import Paragraphs from "@/components/ui/paragraphs";

/** Section 7.5 "Zone d'intervention" (VESTIGE content document) */
export default function AboutZone() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-8 mb-16 md:mb-32">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-8">
        <RiMapPin2Fill size={30} className="text-second" aria-hidden="true" />
        <h3>
          <Trans i18nKey="about.zone.title" components={{ h: <span className="text-second" /> }} />
        </h3>
        <Paragraphs text={t("about.zone.text")} />
      </div>
    </section>
  );
}
