import { RiShieldCheckFill, RiScales3Fill, RiRouteFill, RiLock2Fill } from "react-icons/ri";
import ServicePreview from "@/assets/images/service-preview.jpg";
import { Trans, useTranslation } from "react-i18next";

/** Section 1.4 "Les principes VESTIGE" (VESTIGE content document) */
export default function ContentPreview() {

    const { t } = useTranslation();

    const principles = [
        {
            icon: <RiShieldCheckFill className="size-4 text-second relative bottom-0.5" />,
            title: t("home.principles.admissibility.title"),
            description: t("home.principles.admissibility.text"),
        },
        {
            icon: <RiScales3Fill className="size-4 text-second relative bottom-0.5" />,
            title: t("home.principles.proportionality.title"),
            description: t("home.principles.proportionality.text"),
        },
        {
            icon: <RiRouteFill className="size-4 text-second relative bottom-0.5" />,
            title: t("home.principles.traceability.title"),
            description: t("home.principles.traceability.text"),
        },
        {
            icon: <RiLock2Fill className="size-4 text-second relative bottom-0.5" />,
            title: t("home.principles.confidentiality.title"),
            description: t("home.principles.confidentiality.text"),
        }
    ];

    // 2x2 grid separated by a cross: borders depend on the cell position
    const cellBorders = [
        "pr-4 sm:pr-8 pb-8 border-r border-b",
        "pl-4 sm:pl-8 pb-8 border-b",
        "pr-4 sm:pr-8 pt-8 border-r",
        "pl-4 sm:pl-8 pt-8",
    ];

    return (
        <section className="w-full px-8 py-16 md:py-32 bg-background flex flex-col items-center">
            <div className="max-w-6xl w-full grid gap-12 smd:grid-cols-2 lg:gap-24 items-stretch">

                <div className="space-y-8">
                    <div className="text-center sm:text-left space-y-8">
                        <h3>
                            <Trans i18nKey="home.principlesIntro.title">
                                The VESTIGE <span className="text-second">principles</span>
                            </Trans>
                        </h3>
                        <p>
                            <Trans i18nKey="home.principlesIntro.text">
                                Each assignment is built around <span className="font-bold">four principles</span>:
                            </Trans>
                        </p>
                    </div>

                    <div className="grid grid-cols-2">
                        {principles.map(({ icon, title, description }, index) => (
                            <div className={`space-y-3 border-zinc-300 ${cellBorders[index]}`} key={index}>
                                <div className="flex items-center gap-2">
                                    {icon}
                                    <h4 className="text-sm">{title}</h4>
                                </div>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative aspect-67/34 smd:aspect-auto smd:h-full">
                    <img
                        src={ServicePreview}
                        className="absolute inset-0 w-full h-full object-cover rounded-second shadow"
                        alt=""
                        loading="lazy"
                    />
                </div>

            </div>
        </section>
    )
}
