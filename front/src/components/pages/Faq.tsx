import { useTranslation, Trans } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FaqBg from "@/assets/images/faq-background.png";
import Content from "@/components/common/Content";
import { getQuestionGeneral } from "@/data/questions";
import { getQuestionService } from "@/data/questions";

export default function Faq() {

  const { t } = useTranslation();
  const questionGeneral = getQuestionGeneral(t)
  const questionService = getQuestionService(t)

  return (
    <main className="w-full bg-white flex flex-col items-center">

      <Content
        backgroundImage={FaqBg}
        title={t("faq.title")}
        text={t("faq.description")}
        positionClassName="items-start text-start"
      />

      <section className="max-w-6xl mx-8 mb-16 md:mb-32 space-y-8 text-center flex flex-col items-center">

        <div className="w-full space-y-8">
          <h3>
            <Trans i18nKey="faq.intro.title">
              How Can I <span className="text-second">Help</span> You?
            </Trans>
          </h3>
          <p>{t("faq.intro.text")}</p>
          <p>{t("faq.intro.note")}</p>
        </div>

      </section>
      
      <section className="w-full py-16 md:py-32 mb-16 md:mb-32 bg-background flex flex-col items-center">

        <div className="w-full max-w-6xl mx-auto px-8 space-y-8">

          <h4 className="text-center">{t("faq.general.title")}</h4>

          <Accordion type="single" className="w-full" collapsible>
            {questionGeneral.map(({ question, answer }, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="px-0">{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        </div>

      </section>

      <section className="w-full mb-16 md:mb-32 flex flex-col items-center">  

        <div className="w-full max-w-6xl mx-auto px-8 space-y-8">

          <h4 className="text-center">{t("faq.process.title")}</h4>

          <Accordion type="single" className="w-full" collapsible>
          {questionService.map(({ question, answer }, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="px-0">{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
          </Accordion>

        </div>

      </section>


    </main>
  );
}
