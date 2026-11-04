// static
import Detective from "@/assets/images/detective_pic.png";

// components
import Content from "@/components/common/Content";
import Features from "@/components/layouts/Home-services";
import Preview from "@/components/layouts/Home-previews";
import CallToAction from "@/components/layouts/Home-cta";

// library
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { scrollToSection } from "@/features/scrollButton";
import { fadeOutAndNavigate } from "@/features/pageTransition";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  usePageMeta(t("home.seo.title"), t("home.seo.description"));

  return (
    <main className="w-full flex flex-col items-center">

      <Content
        backgroundImage={Detective}
        title={t("home.content.title")}
        text={t("home.content.text")}
        highlight={t("home.content.highlight", { returnObjects: true }) as string[]}
        positionClassName="items-center text-center"
        primaryButton={{
          label: t("home.content.ctaPrimary"),
          onClick: scrollToSection,
        }}
        secondaryButton={{
          label: t("home.content.ctaSecondary"),
          // The method section lives on the services page
          onClick: () => fadeOutAndNavigate(navigate, "/service#methode"),
        }}
      />

      <Features />

      <Preview />

      <CallToAction />
      
    </main>
  );
}
