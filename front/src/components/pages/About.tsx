import AboutBg from "@/assets/images/about-background.png";
import Content from "@/components/common/Content";
import { useTranslation } from "react-i18next";
import AboutStory from "@/components/layouts/About-story";
import AboutValue from "@/components/layouts/About-value"
import AboutCred from "@/components/layouts/About-credentials";
// import AboutStats from "@/components/layouts/About-stats";

export default function About() {

  const { t } = useTranslation();

  return (
    <main className="w-full bg-white flex flex-col items-center">

      <Content
        backgroundImage={AboutBg}
        title={t("about.title")}
        text={t("about.intro")}
        positionClassName="items-start text-start"
      />

      <AboutStory />

      <AboutValue />

      <AboutCred />

      {/* <AboutStats /> */}
    </main>
  );
}
