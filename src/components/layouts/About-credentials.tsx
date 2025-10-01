import { useTranslation, Trans } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  RiShieldUserFill,
  RiMedalFill,
  RiFilePaper2Fill,
  RiBankCardFill,
} from "react-icons/ri";

export default function AboutCred() {
  const { t } = useTranslation();

  const getCredentials = [
    {
      iconeCard: <RiShieldUserFill size={30} />,
      titleCard: t("about.credentials.licensed.title"),
      textCard: t("about.credentials.licensed.text"),
    },
    {
      iconeCard: <RiMedalFill size={30} />,
      titleCard: t("about.credentials.asis.title"),
      textCard: t("about.credentials.asis.text"),
    },
    {
      iconeCard: <RiFilePaper2Fill size={30} />,
      titleCard: t("about.credentials.court.title"),
      textCard: t("about.credentials.court.text"),
    },
    {
      iconeCard: <RiBankCardFill size={30} />,
      titleCard: t("about.credentials.bonded.title"),
      textCard: t("about.credentials.bonded.text"),
    },
  ];

  return (
    <section className="max-w-6xl mx-8 mb-16 md:mb-32 space-y-8">

      <div className="text-center space-y-8">
        <h3>
          <Trans i18nKey="about.credentials.title">
            Credentials <span className="text-second">&</span> Certifications
          </Trans>
        </h3>
        <p>
          <Trans i18nKey="about.credentials.text">
            Professional <span className="font-bold">qualifications that ensure quality</span> service.
          </Trans>
        </p>
      </div>

      <div className="grid md:grid-cols-12 sm:grid-cols-4 grid-cols-1 gap-8">
        {getCredentials.map(({ iconeCard, titleCard, textCard }, index) => (
          <Card key={index} className="md:col-span-3 sm:col-span-2 *:text-center shadow-none rounded-second bg-background">
            <CardHeader className="space-y-4">
              <div className="flex flex-col items-center justify-center text-second">
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

    </section>
  );
}
