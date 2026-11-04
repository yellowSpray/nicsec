import { Trans, useTranslation } from "react-i18next";
import { TiArrowDown } from "react-icons/ti";
import Button from "@/components/ui/button";
import { scrollToSection } from "@/features/scrollButton";

/** Section 1.6 "Appel à l'action" (VESTIGE content document) */
export default function CallToAction() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl my-16 md:my-32 mx-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-8">
        <h3>
          <Trans i18nKey="home.cta.title">
            Facing an uncertain situation and wondering whether an <span className="text-second">investigation</span> is possible?
          </Trans>
        </h3>
        <p>
          <Trans i18nKey="home.cta.text">
            Briefly describe the context. A first conversation helps <span className="font-bold">assess your request before any commitment</span>.
          </Trans>
        </p>
        <Button
          buttonTxt={t("home.cta.button")}
          iconeButton={<TiArrowDown size={20} />}
          className="btn-primary"
          onClick={() => scrollToSection()}
        />
      </div>
    </section>
  );
}
