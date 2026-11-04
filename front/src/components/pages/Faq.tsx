import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FaqBg from "@/assets/images/faq-background.png";
import Content from "@/components/common/Content";
import Paragraphs from "@/components/ui/paragraphs";
import { usePageMeta } from "@/hooks/usePageMeta";
import { scrollToSection } from "@/features/scrollButton";
import { fadeOutAndNavigate } from "@/features/pageTransition";

interface FaqGroup {
  title: string;
  questions: { question: string; answer: string }[];
}

/** FAQ page (section 8 of the VESTIGE content document) */
export default function Faq() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  usePageMeta(t("faq.seo.title"), t("faq.seo.description"));

  const groups = t("faq.groups", { returnObjects: true }) as FaqGroup[];

  return (
    <main className="w-full bg-white flex flex-col items-center">

      <Content
        backgroundImage={FaqBg}
        title={t("faq.title")}
        text={t("faq.description")}
        highlight={t("faq.highlight", { returnObjects: true }) as string[]}
        positionClassName="items-start text-start"
        primaryButton={{
          label: t("faq.ctaPrimary"),
          onClick: scrollToSection,
        }}
        secondaryButton={{
          label: t("faq.ctaSecondary"),
          onClick: () => fadeOutAndNavigate(navigate, "/service#methode"),
        }}
      />

      {/* One section per group, alternating white / grey band */}
      {Array.isArray(groups) && groups.map((group, groupIndex) => (
        <section
          key={groupIndex}
          className={`w-full mb-16 md:mb-32 flex flex-col items-center ${
            groupIndex % 2 === 1 ? "py-16 md:py-32 bg-background" : ""
          }`}
        >
          <div className="w-full max-w-6xl mx-auto px-8 space-y-8">
            <h4 className="text-center">{group.title}</h4>

            <Accordion type="single" className="w-full" collapsible>
              {group.questions.map(({ question, answer }, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="px-0 cursor-pointer">{question}</AccordionTrigger>
                  <AccordionContent>
                    <Paragraphs text={answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ))}

    </main>
  );
}
