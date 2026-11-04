import AboutBg from "@/assets/images/about-background.png";
import Content from "@/components/common/Content";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AboutStory from "@/components/layouts/About-story";
import AboutValue from "@/components/layouts/About-value";
import AboutZone from "@/components/layouts/About-zone";
import { usePageMeta } from "@/hooks/usePageMeta";
import { scrollToSection } from "@/features/scrollButton";
import { fadeOutAndNavigate } from "@/features/pageTransition";

/** "Le cabinet" page (section 7 of the VESTIGE content document) */
export default function About() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  usePageMeta(t("about.seo.title"), t("about.seo.description"));

  return (
    <main className="w-full bg-white flex flex-col items-center">

      <Content
        backgroundImage={AboutBg}
        title={t("about.title")}
        text={t("about.intro")}
        highlight={t("about.highlight", { returnObjects: true }) as string[]}
        positionClassName="items-start text-start"
        primaryButton={{
          label: t("about.ctaPrimary"),
          onClick: scrollToSection,
        }}
        secondaryButton={{
          label: t("about.ctaSecondary"),
          onClick: () => fadeOutAndNavigate(navigate, "/service#methode"),
        }}
      />

      <AboutStory />

      <AboutValue />

      <AboutZone />

    </main>
  );
}
