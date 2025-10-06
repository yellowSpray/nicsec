import {
  RiShieldCheckFill,
  RiAwardFill,
  RiFingerprintFill,
} from "react-icons/ri";
import { useTranslation, Trans } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function AboutValue() {
  const { t } = useTranslation();

  const getCoreValues = [
    {
      iconeCard: <RiShieldCheckFill size={30} />,
      titleCard: t("about.core.integrity.title"),
      textCard: t("about.core.integrity.text"),
    },
    {
      iconeCard: <RiFingerprintFill size={30} />,
      titleCard: t("about.core.discretion.title"),
      textCard: t("about.core.discretion.text"),
    },
    {
      iconeCard: <RiAwardFill size={30} />,
      titleCard: t("about.core.excellence.title"),
      textCard: t("about.core.excellence.text"),
    },
  ];

  return (
    <section className="w-full py-16 md:py-32 mb-16 md:mb-32 bg-background flex flex-col items-center">

      <div className="max-w-6xl space-y-8 mx-8">

        <div className="w-full space-y-8 text-center">
          <h3>
            <Trans i18nKey="about.core.title">
              My <span className="text-second">Core</span> Value
            </Trans>
          </h3>
          <p>
            <Trans i18nKey="about.core.text">
              The principles <span className="font-bold">that guide every investigation</span> we undertake.
            </Trans>
          </p>
        </div>

        <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
          {getCoreValues.map(({ iconeCard, titleCard, textCard }, index) => (
            <Card key={index} className="col-span-4 *:text-center shadow-none">
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

      </div>
      
    </section>
  );
}
