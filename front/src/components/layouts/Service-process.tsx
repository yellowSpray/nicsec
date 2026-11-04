import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import { TiArrowDown } from "react-icons/ti";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Button from "@/components/ui/button";
import Paragraphs from "@/components/ui/paragraphs";
import { scrollToSection } from "@/features/scrollButton";
import imageDetective from "@/assets/images/detective_pic.png";
import imageBoard from "@/assets/images/service-preview.jpg";
import imageMagnifier from "@/assets/images/service-preview2.jpg";
import imageReading from "@/assets/images/service-preview3.jpg";

// Steps of the VESTIGE method (content document, sections 1.5 and 6)
const STEPS = [
    { key: "qualification", image: imageDetective },
    { key: "admissibility", image: imageMagnifier },
    { key: "mandate", image: imageBoard },
    { key: "collection", image: imageReading },
    { key: "crosscheck", image: imageBoard },
    { key: "report", image: imageDetective },
];

/** Section "La méthode VESTIGE" on the services page (id="methode") */
export default function StepProcess() {

    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(STEPS[0].key);
    const activeImage = STEPS.find((step) => step.key === activeStep)?.image ?? STEPS[0].image;

    // Grey band to separate the method from the tabs section above
    return (
        <section id="methode" className="w-full px-8 py-16 md:py-32 mb-16 md:mb-32 bg-background flex justify-center">
            <div className="max-w-6xl w-full space-y-8">

                <div className="text-center space-y-8">
                    <h3>
                        <Trans i18nKey="services.method.title" components={{ h: <span className="text-second" /> }} />
                    </h3>
                    <p className="max-w-4xl mx-auto">
                        <Trans i18nKey="services.method.text" components={{ b: <span className="font-bold" /> }} />
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">

                    {/* Controlled + not collapsible: one step is always open, so the image always matches */}
                    <Accordion
                        type="single"
                        className="w-full"
                        value={activeStep}
                        onValueChange={(value) => value && setActiveStep(value)}
                    >
                        {STEPS.map(({ key }, index) => (
                            <AccordionItem key={key} value={key}>
                                <AccordionTrigger className="cursor-pointer py-5 !no-underline transition flex flex-row items-center">
                                    <span
                                        className={`shrink-0 flex items-center justify-center size-7 rounded-full border text-xs font-bold transition-colors ${
                                            key === activeStep ? "bg-second border-second text-white" : "border-second text-second"
                                        }`}
                                        aria-hidden="true"
                                    >
                                        <span className="relative top-px">{index + 1}</span>
                                    </span>
                                    <h4 className={key === activeStep ? "text-foreground" : "text-muted-foreground"}>
                                        {t(`services.method.steps.${key}.title`)}
                                    </h4>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Paragraphs
                                        className="mt-3"
                                        paragraphClassName="text-muted-foreground"
                                        text={t(`services.method.steps.${key}.text`)}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="w-full overflow-hidden rounded-second">
                        <img
                            key={activeImage}
                            src={activeImage}
                            alt=""
                            className="rounded-second object-cover w-full h-full max-h-[480px] animate-in fade-in duration-300"
                        />
                    </div>

                </div>

                {/* 6.7: compliance is not a step, it applies to the whole mission */}
                <div className="bg-surface rounded-second p-6 md:p-8 flex flex-col sm:flex-row gap-4 sm:items-start">
                    <ShieldCheck className="size-6 shrink-0 text-second" aria-hidden="true" />
                    <div className="space-y-2">
                        <h4>{t("services.method.compliance.title")}</h4>
                        <Paragraphs text={t("services.method.compliance.text")} />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button
                        buttonTxt={t("services.method.cta")}
                        iconeButton={<TiArrowDown size={20} />}
                        className="btn-primary"
                        onClick={() => scrollToSection()}
                    />
                </div>

            </div>
        </section>
    )
}
