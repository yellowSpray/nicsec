import { getInfoService } from "@/data/infoService";
import { useTranslation, Trans } from "react-i18next";
import { Card, CardContent, CardHeader } from '../ui/card'
import { FaCheck } from "react-icons/fa";

export default function AllFeatures () {

    const { t } = useTranslation();
    const infoServiceValues = getInfoService(t);

    return (
        <section className="max-w-6xl mx-8 mb-16 md:mb-32 space-y-8">

                <div className="text-center space-y-8">
                    <h3>
                        <Trans i18nKey="services.servicesIntro.title">
                            My Investigation <span className="text-second">Services</span>
                        </Trans>
                    </h3>
                    <p>
                        <Trans i18nKey="services.servicesIntro.title">
                            I provide professional investigative services <span className='font-bold'>tailored to your needs</span>. Every case is approached with <span className='font-bold'>confidentiality and personal attention</span>.
                        </Trans>
                    </p>
                </div>
                {/* TODO */}
                <div className="mx-auto grid border-card sm:max-w-full sm:grid-cols-2 md:grid-cols-3">
                    {infoServiceValues.map(({icone, title, text, listService }, index) => (
                        <Card 
                            key={index}
                            className=
                            {`
                                group shadow-none border-background p-4
                                ${index % 2 === 0 ? 'sm:border-r-1' : 'sm:border-r-0'} 
                                ${index !== 3 && index !== infoServiceValues.length - 1 ? 'md:border-r-1' : 'md:border-r-0'}
                                ${index >= 1 ? 'border-t-1' : ''} 
                                ${index >= 2 ? 'sm:border-t-1' : index >= 1 ? 'sm:border-t-0' : ''}
                                ${index >= 0 ? 'md:border-t-0' : ''}
                                ${index <= 3 ? 'border-b-1 sm:border-b-0 md:border-b-0' : ''}
                            `}
                        > 
                            <CardHeader className="flex items-center gap-2 pt-4">
                                <div className='flex flex-col items-center justify-center relative bottom-0.5'>{icone}</div>
                                <h4 className="w-full">{title}</h4>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-5 h-15">{text}</p>
                                <ul>
                                    {listService.map((item, id) => (
                                        <li key={id} className="text-sm text-left flex flex-row items-center gap-2 py-1">
                                            <span className="text-second relative bottom-0.5"><FaCheck size={10} /></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

        </section>
    )
}

