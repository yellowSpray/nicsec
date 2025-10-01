import ProfilPic from "@/assets/images/service-preview3.jpg";
import { useTranslation, Trans } from "react-i18next";

export default function AboutStory() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-8 mb-16 md:mb-32 space-y-8 grid gap-12 md:grid-cols-2">
      <div className="w-full space-y-8">
        <h3 className="text-start">
          <Trans i18nKey="about.story.title">
            My <span className="text-second">Story</span>
          </Trans>
        </h3>
        <p>{t("about.story.text1")}</p>
        <p>{t("about.story.text2")}</p>
        <p>{t("about.story.text3")}</p>
      </div>

      <div className="w-full rounded-second overflow-hidden">
        <img
          src={ProfilPic}
          loading="lazy"
          alt="Profile Picture of Detective"
          className="rounded-second object-cover w-full"
        />
      </div>
    </section>
  );
}
