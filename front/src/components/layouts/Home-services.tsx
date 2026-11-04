import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { User, Building2, ShieldCheck, Scale } from 'lucide-react'
import { useTranslation, Trans } from "react-i18next";

/**
 * Sections 1.2 "Une approche factuelle" + 1.3 "Entrées par type de client"
 * (VESTIGE content document)
 */
export default function Features() {

    const { t } = useTranslation();

    // TODO: point each card to its own page (/particuliers, /entreprises,
    // /assurances, /professionnels) once those pages exist
    const audiences = [
        {
            icon: <User className='size-8 text-second'/>,
            title: t("home.audiences.individuals.title"),
            description: t("home.audiences.individuals.text"),
            to: "/service",
        },
        {
            icon: <Building2 className='size-8 text-second'/>,
            title: t("home.audiences.companies.title"),
            description: t("home.audiences.companies.text"),
            to: "/service",
        },
        {
            icon: <ShieldCheck className='size-8 text-second'/>,
            title: t("home.audiences.insurers.title"),
            description: t("home.audiences.insurers.text"),
            to: "/service",
        },
        {
            icon: <Scale className='size-8 text-second'/>,
            title: t("home.audiences.professionals.title"),
            description: t("home.audiences.professionals.text"),
            to: "/service",
        }
    ]

    return (
        <section className="max-w-6xl mx-8 mb-16 md:mb-32 space-y-8">
                <div className="text-center space-y-8">
                    <h3>
                        <Trans i18nKey="home.servicesIntro.title">
                            A <span className="text-second">fact-based</span> approach
                        </Trans>
                    </h3>
                    <p>
                        <Trans
                            i18nKey="home.servicesIntro.text"
                            components={{ b: <span className="font-bold" /> }}
                        />
                    </p>
                    <p className="font-semibold">
                        {t("home.audiences.intro")}
                    </p>
                </div>
                <div className="mx-auto *:text-center grid border-card sm:max-w-full sm:grid-cols-2 md:grid-cols-4">
                    {audiences.map(({icon, title, description, to}, index) => (
                        <Card 
                            key={index} 
                            className={`
                                group relative shadow-none border-background
                                transition-colors duration-200 hover:bg-background/60
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
                                {/* Stretched link: the whole card is clickable */}
                                <Link
                                    to={to}
                                    className='btn-outline after:absolute after:inset-0 after:content-[""]'
                                    aria-label={`${title} : ${t("home.audiences.cta")}`}
                                >
                                    {t("home.audiences.cta")}
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
        </section>
    )
}
