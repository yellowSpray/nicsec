import { useTranslation, Trans } from "react-i18next";
import { FaShield } from "react-icons/fa6";
import { MdComputer } from "react-icons/md";
import { BiSolidBinoculars } from "react-icons/bi";
import { Card, CardContent, CardHeader } from '../ui/card'

export default function Specialized () {

    const { t } = useTranslation();

    const specialized = [
        {
          iconeCard: <FaShield size={30} />,
          titleCard: t("services.specialized.corporate.title"),
          textCard: t("services.specialized.corporate.text"),
        },
        {
          iconeCard: <MdComputer size={30} />,
          titleCard: t("services.specialized.digital.title"),
          textCard: t("services.specialized.digital.text"),
        },
        {
          iconeCard: <BiSolidBinoculars size={30} />,
          titleCard: t("services.specialized.insurance.title"),
          textCard: t("services.specialized.insurance.text"),
        },
      ];

    return (
        <section className="w-full py-16 md:py-32 mb-16 md:mb-32 bg-background flex flex-col items-center">

            <div className="max-w-6xl space-y-8 mx-8">

                <div className="w-full space-y-8 text-center">
                    <h3>
                      <Trans i18nKey="services.specialized.title">
                        Specialized <span className="text-second">Investigations</span>
                      </Trans>
                    </h3>
                    <p>
                      <Trans i18nKey="services.specialized.text">
                        Advanced investigative services <span className="font-bold">for complex cases</span>.
                      </Trans>
                    </p>
                </div>

                <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
                    {specialized.map(({ iconeCard, titleCard, textCard }, index) => (
                      <Card key={index} className="col-span-4 *:text-center shadow-none">
                        <CardHeader className="space-y-4">
                            <div className='flex flex-col items-center justify-center text-second'>
                                {iconeCard}
                            </div>
                            <h4>{titleCard}</h4>
                        </CardHeader>
                        <CardContent>
                            <p>{textCard}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>

            </div>

        </section>
    )
}