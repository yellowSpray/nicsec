import { RiFocus3Fill, RiEyeOffFill, RiCompass3Fill, RiScales3Fill, RiLock2Fill } from "react-icons/ri";
import { useTranslation, Trans } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";
import SteppedCardGrid from "../ui/steppedCardGrid";

/** Section 7.4 "Valeurs" (VESTIGE content document) */
export default function AboutValue() {
  const { t } = useTranslation();

  const values = [
    { key: "rigor", icon: <RiFocus3Fill size={30} /> },
    { key: "discretion", icon: <RiEyeOffFill size={30} /> },
    { key: "independence", icon: <RiCompass3Fill size={30} /> },
    { key: "proportionality", icon: <RiScales3Fill size={30} /> },
    { key: "confidentiality", icon: <RiLock2Fill size={30} /> },
  ];

  return (
    <section className="w-full px-8 py-16 md:py-32 mb-16 md:mb-32 bg-background flex justify-center">
      <div className="max-w-6xl w-full space-y-8">
        <div className="w-full space-y-8 text-center">
          <h3>
            <Trans i18nKey="about.values.title" components={{ h: <span className="text-second" /> }} />
          </h3>
          <p className="max-w-3xl mx-auto">
            <Trans i18nKey="about.values.text" components={{ b: <span className="font-bold" /> }} />
          </p>
        </div>

        {/* Same card style as the home page, on the same tint as the "compliance" block */}
        <SteppedCardGrid
          items={values}
          columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
          surfaceClassName="bg-surface"
          outsideClassName="bg-background"
          renderItem={({ key, icon }, dividers) => (
            <Card key={key} className={`*:text-center shadow-none rounded-none bg-transparent border-background ${dividers}`}>
              <CardHeader>
                <div className="flex flex-col items-center justify-center h-20 text-second">{icon}</div>
                <h4>{t(`about.values.items.${key}.title`)}</h4>
              </CardHeader>
              <CardContent>
                <p>{t(`about.values.items.${key}.text`)}</p>
              </CardContent>
            </Card>
          )}
        />
      </div>
    </section>
  );
}
