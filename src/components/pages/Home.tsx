// static
import Detective from "@/assets/images/detective_pic.png";

// components
import Content from "@/components/common/Content";
import Features from "@/components/layouts/Home-services";
import Preview from "@/components/layouts/Home-previews";
import TestimonialsAll from "@/components/layouts/Home-testimonials";

// library
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="w-full flex flex-col items-center">

      <Content
        backgroundImage={Detective}
        title={t("home.content.title")}
        text={t("home.content.text")}
        positionClassName="items-center text-center"
      />

      <Features />

      <Preview />

      <TestimonialsAll />
      
    </main>
  );
}
