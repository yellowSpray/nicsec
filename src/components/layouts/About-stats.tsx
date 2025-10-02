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

              <div className="w-full grid md:grid-cols-12 sm:grid-cols-4 grid-cols-1 gap-8">

                  {getStats.map(({ titleCard, textCard }, index) => (
                      <Card key={index} className="w-full md:col-span-3 sm:col-span-2 *:text-center shadow-none">
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