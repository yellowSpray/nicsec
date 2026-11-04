// static
import ServiceBg from "@/assets/images/service-background.png";

// components 
import Content from "@/components/common/Content";
import AudienceTabs from "@/components/layouts/Service-features";
import StepProcess from "@/components/layouts/Service-process";

// library
import { useTranslation } from "react-i18next";
import { scrollToSection, scrollToId } from "@/features/scrollButton";

export default function Service() {

  const { t } = useTranslation();

  return (
    <main className="w-full flex flex-col items-center">

      <Content
        backgroundImage={ServiceBg}
        title={t("services.mainTitle")}
        text={t("services.mainText")}
        highlight={t("services.highlight", { returnObjects: true }) as string[]}
        positionClassName="items-start text-start"
        primaryButton={{
          label: t("services.ctaPrimary"),
          onClick: scrollToSection,
        }}
        secondaryButton={{
          label: t("services.ctaSecondary"),
          // Same page: smooth scroll down to the method section
          onClick: () => scrollToId("methode"),
        }}
      />

      <AudienceTabs />

      <StepProcess />

    </main>
  );
}
