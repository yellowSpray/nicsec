import ProfilPic from "@/assets/images/service-preview3.jpg";
import { useTranslation, Trans } from "react-i18next";
import Paragraphs from "@/components/ui/paragraphs";

/** Sections 7.2 "Positionnement" and 7.3 "Le fondateur" (VESTIGE content document) */
export default function AboutStory() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-8 mb-16 md:mb-32 grid gap-12 md:grid-cols-2">
      <div className="w-full space-y-8">
        <h3 className="text-start">
          <Trans i18nKey="about.cabinet.title" components={{ h: <span className="text-second" /> }} />
        </h3>
        <Paragraphs text={t("about.cabinet.text")} />

        <div className="space-y-4">
          <h4>{t("about.cabinet.founderTitle")}</h4>
          <Paragraphs text={t("about.cabinet.founderText")} />
        </div>
      </div>

      {/* Temporary picture: to be replaced by a photo of the founder */}
      <div className="w-full rounded-second overflow-hidden">
        <img
          src={ProfilPic}
          loading="lazy"
          alt=""
          className="rounded-second object-cover w-full h-full"
        />
      </div>
    </section>
  );
}
