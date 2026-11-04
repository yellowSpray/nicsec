// static
import ServiceBg from "@/assets/images/service-background.png";

// components 
import Content from "@/components/common/Content";
import AudienceTabs from "@/components/layouts/Service-features";
import StepProcess from "@/components/layouts/Service-process";

// library
import { useTranslation } from "react-i18next";

export default function Service() {

  const { t } = useTranslation();

  return (
    <main className="w-full flex flex-col items-center">

      <Content
        backgroundImage={ServiceBg}
        title={t("services.mainTitle")}
        text={t("services.mainText")}
        positionClassName="items-start text-start"
      />

      <AudienceTabs />

      <StepProcess />

    </main>
  );
}
