import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChartBarIncreasingIcon, Database, Fingerprint, IdCard } from 'lucide-react'
import { useState } from 'react'
import { useTranslation, Trans } from "react-i18next";
// import { gsap } from 'gsap'
import imageDetective from '@/assets/images/detective_pic.png'
import imageService from '@/assets/images/service-preview.jpg'
import imageTest from '@/assets/images/service-preview3.jpg'
 

export default function StepProcess() {

    const { t } = useTranslation(); 

    const defaultProcess = [
        {
            id: 1,
            icons: <ChartBarIncreasingIcon className='text-second size-4'/>,
            title: t("services.process.initial.title"),
            image: imageDetective,
            description: t("services.process.initial.text"),
        },
        {
            id: 2,
            icons: <Database className='text-second size-4' />,
            title: t("services.process.strategy.title"),
            image: imageService,
            description: t("services.process.strategy.text"),
        },
        {
            id: 3,
            icons: <Fingerprint className='text-second size-4' />,
            title: t("services.process.evidence.title"),
            image: imageTest,
            description: t("services.process.strategy.text"),
        },
        {
            id: 4,
            icons: <IdCard className='text-second size-4' />,
            title: t("services.process.reporting.title"),
            image: imageDetective,
            description: t("services.process.strategy.text"),
        },
    ] 

    const [activeTabId, setActiveTabId] = useState<number | null>(1);
    const [activeImage, setActiveImage] = useState(defaultProcess[0].image);

    

    return (
        <section className="max-w-6xl mx-8 mb-16 md:mb-32 space-y-8">

            <div className="text-center space-y-8">
                <h3 className="text-center">
                    <Trans i18nKey="services.process.title">
                        My investigation <span className="text-second">Process</span>
                    </Trans>
                </h3>
                <p>
                    <Trans i18nKey="services.process.text">
                        A systematic approach <span className='font-bold'>ensuring thorough and reliable</span> results.
                    </Trans>
                </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">

                <Accordion type='single' className='w-full' defaultValue='"item-1'>

                    {defaultProcess.map((tab) => (
                        <AccordionItem key={tab.id} value={`item-${tab.id}`}>
                                <AccordionTrigger 
                                    onClick={() => {
                                        setActiveImage(tab.image)
                                        setActiveTabId(tab.id)
                                    }}
                                    className="cursor-pointer py-5 !no-underline transition flex flex-row"
                                >
                                    <span className="shrink-0">{tab.icons}</span>
                                    <h4 className={`${tab.id === activeTabId ? "text-foreground" : "text-muted-foreground"}`}>
                                        {tab.title}
                                    </h4>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="mt-3 text-muted-foreground">
                                        {tab.description}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                    ))}

                </Accordion>

                                        
                <div className="w-full overflow-hidden rounded-second">
                    <img
                        src={activeImage}
                        alt="Feature preview"
                        className="rounded-second object-cover w-full"
                    />
                </div>

            </div>
            
        </section>
    )
}