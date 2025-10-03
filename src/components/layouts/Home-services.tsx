import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Eye, Search, UserSearch, ShieldAlert } from 'lucide-react'
import { useTranslation, Trans } from "react-i18next";


export default function Features() {

    const { t } = useTranslation();

    const previewServices = [
        {
            icon: <Eye className='size-8 text-second'/>,
            title: t("home.services.surveillance.title"),
            description : t("home.services.surveillance.text")
        },
        {
            icon: <Search className='size-8 text-second'/>,
            title: t("home.services.peopleTracing.title"),
            description : t("home.services.peopleTracing.text")
        },
        {
            icon: <UserSearch className='size-8 text-second'/>,
            title: t("home.services.privateInvestigations.title"),
            description : t("home.services.privateInvestigations.text")
        },
        {
            icon: <ShieldAlert className='size-8 text-second'/>,
            title: t("home.services.insuranceFraud.title"),
            description : t("home.services.insuranceFraud.text")
        }
    ]

    return (
        <section className="max-w-6xl mx-8 mb-16 md:mb-32 space-y-8">
                <div className="text-center space-y-8">
                    <h3>
                        <Trans i18nKey="home.servicesIntro.title">
                            What <span className="text-second">Service</span> I Offer
                        </Trans>
                    </h3>
                    <p>
                        <Trans i18nKey="home.servicesIntro.text">
                            My experience delivers reliable, <span className='font-bold'>discreet solutions that enable my clients to make informed</span>, effective decisions.
                        </Trans>
                    </p>
                </div>
                <div className="mx-auto *:text-center grid border-card sm:max-w-full sm:grid-cols-2 md:grid-cols-4">
                    {previewServices.map(({icon, title, description}, index) => (
                        <Card 
                            key={index} 
                            className={`
                                group shadow-none border-background
                                ${index % 2 === 0 ? 'sm:border-r-1' : 'sm:border-r-0'} 
                                ${index < 3 ? 'md:border-r-1' : 'md:border-r-0'}
                                ${index >= 1 ? 'border-t-1' : ''} 
                                ${index >= 2 ? 'sm:border-t-1' : index >= 1 ? 'sm:border-t-0' : ''}
                                ${index >= 0 ? 'md:border-t-0' : ''}
                            `}>
                            <CardHeader>
                                <div className='flex flex-col items-center justify-center h-20'>
                                    {icon}
                                </div>
                                <h4>{title}</h4>
                            </CardHeader>
                            <CardContent>
                                <p>{description}</p>
                            </CardContent>
                            <CardFooter className='mt-auto justify-center'>
                                <Link to="/service" className='btn-outline'>Read more</Link>
                            </CardFooter>
                        </Card>
                    ))}


                </div>
        </section>
    )
}



