import { useTranslation, Trans } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function AboutStats () {

    const { t } = useTranslation();

    const getStats = [
        {
          titleCard: t("about.stats.cases.title"),
          textCard: t("about.stats.cases.text"),
        },
        {
          titleCard: t("about.stats.success.title"),
          textCard: t("about.stats.success.text"),
        },
        {
          titleCard: t("about.stats.years.title"),
          textCard: t("about.stats.years.text"),
        },
        {
          titleCard: t("about.stats.support.title"),
          textCard: t("about.stats.support.text"),
        }
      ];

    return (
        <section className="w-full py-16 md:py-32 mb-16 md:mb-32 bg-background flex flex-col items-center">

            <div className="w-full max-w-6xl space-y-8 mx-8">

              <div className="w-full space-y-8 text-center">
                  <h3>
                    <Trans i18nKey="about.stats.title">
                      Nicsec In<span className="text-second">Numbers</span>
                    </Trans>
                  </h3>
                  <p>
                    <Trans i18nKey="about.stats.text">
                      Text to fill <span className="font-bold">or not</span>.
                    </Trans>
                  </p>
              </div>

              <div className="w-full *:text-center grid sm:max-w-full sm:grid-cols-2 md:grid-cols-4 border-main border-1 rounded-second">

                  {getStats.map(({ titleCard, textCard }, index) => (
                      <Card 
                        key={index} 
                        className={`
                                group shadow-none border-main
                                ${index % 2 === 0 ? 'sm:border-r-1' : 'sm:border-r-0'} 
                                ${index < 3 ? 'md:border-r-1' : 'md:border-r-0'}
                                ${index >= 1 ? 'border-t-1' : ''} 
                                ${index >= 2 ? 'sm:border-t-1' : index >= 1 ? 'sm:border-t-0' : ''}
                                ${index >= 0 ? 'md:border-t-0' : ''}
                        `}>
                        <CardHeader className="space-y-4">
                            <h3>{titleCard}</h3>
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