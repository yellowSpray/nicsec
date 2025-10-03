import { RiShieldCheckFill, RiLock2Fill, RiTimeFill, RiAwardFill } from "react-icons/ri";
import ServicePreview from "@/assets/images/service-preview.jpg";
import { Trans, useTranslation } from "react-i18next";

export default function ContentPreview() {

    const { t } = useTranslation();

    const reasons = [
        {
            icon: <RiShieldCheckFill className="size-4 text-second relative bottom-0.5" />,
            title: t("home.reasons.licensed.title"),
            description: t("home.reasons.licensed.text"),
        },
        {
            icon: <RiLock2Fill className="size-4 text-second relative bottom-0.5" />,
            title: t("home.reasons.confidential.title"),
            description: t("home.reasons.confidential.text"),
        },
        {
            icon: <RiTimeFill className="size-4 text-second relative bottom-0.5" />,
            title: t("home.reasons.availability.title"),
            description: t("home.reasons.availability.text"),
        },
        {
            icon: <RiAwardFill className="size-4 text-second relative bottom-0.5" />,
            title: t("home.reasons.proven.title"),
            description: t("home.reasons.proven.text"),
        }
    ];

    return (
        <section className="w-full py-16 md:py-32 bg-background flex flex-col items-center">
            <div className="max-w-6xl space-y-8 mx-8">
                <div className="text-center sm:text-left space-y-8">
                    <h3>
                        <Trans i18nKey="home.reasonsIntro.title">
                            Why <span className="text-second">Choose</span> Nicsec investigations ?
                        </Trans>
                    </h3>
                    <p>
                        <Trans i18nKey="home.reasonsIntro.text">
                            Trusted expertise delivering <span className="font-bold">confidential, accurate, and professional</span> investigative solutions.
                        </Trans>
                    </p>
                </div>
                <div className="grid gap-6 smd:grid-cols-2 md:gap-12 lg:gap-24 space-y-8">
                        
                    <div className="grid grid-cols-2 gap-8 sm:gap-16">
                        {reasons.map(({ icon, title, description }, index) => (
                            <div className="space-y-3" key={index}>
                                <div className="flex items-center gap-2">
                                    {icon}
                                    <h4 className="text-sm">{title}</h4>
                                </div>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="relative mt-6 sm:mt-0">
                        <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                            <img src={ServicePreview} className="rounded-second shadow" alt="service preview image" loading="lazy"/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}
