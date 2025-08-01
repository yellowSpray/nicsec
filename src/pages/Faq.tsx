import { useTranslation, Trans } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import FaqBg from "../assets/images/faq-background.png";
import Content from "../components/common/Content";
import { getQuestionGeneral } from "../data/questions";
import { getQuestionService } from "../data/questions";

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

      <section className="w-6xl mb-25 flex flex-col items-center gap-8 text-center">
        <div className="w-1/2">
          <h3 className="text-3xl mb-5">
            <Trans i18nKey="faq.intro.title">
              How Can I <span className="text-second">Help</span> You?
            </Trans>
          </h3>
          <p className="text-sm mb-5">{t("faq.intro.text")}</p>
          <aside>
            <p className="text-sm">{t("faq.intro.note")}</p>
          </aside>
        </div>
      </section>
      
      <section className="w-full mb-25 flex flex-col items-center">

        <div className="w-full py-16 flex flex-col items-center bg-background">
          <h4 className="text-lg mb-5">{t("faq.general.title")}</h4>
          <Accordion type="single" className="w-6xl" collapsible>
            {questionGeneral.map(({ question, answer }, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="w-6xl pt-16 flex flex-col items-center">
          <h4 className="text-lg mb-5">{t("faq.process.title")}</h4>
          <Accordion type="single" className="w-full" collapsible>
          {questionService.map(({ question, answer }, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
          ))}
          </Accordion>
        </div>

      </section>


    </main>
  );
}
