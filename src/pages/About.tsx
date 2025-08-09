import AboutBg from "../assets/images/about-background.png";
import ProfilPic from "../assets/images/service-preview3.jpg";
import Content from "../components/common/Content";
import Card from "../components/ui/Card";
import { useTranslation } from "react-i18next";
import { getCoreValues } from "../data/coreValue";
import { getCredentials } from "../data/credentials";

export default function About() {

  const { t } = useTranslation();
  const coreValues = getCoreValues(t);
  const credentialsValues = getCredentials(t)

  return (
    <main className="w-full bg-white flex flex-col items-center">
      <Content
        backgroundImage={AboutBg}
        title={t("about.title")}
        text={t("about.intro")}
        positionClassName="items-start text-start"
      />

      <section className="w-6xl mb-25 flex flex-row justify-center gap-8">
        <div className="w-1/2">
          <h3 className="text-3xl mb-5 text-start">
            {t("about.story.title").split(" ")[0]}{" "}
            <span className="text-second">
              {t("about.story.title").split(" ")[1]}
            </span>
          </h3>
          <p className="text-sm mb-8">{t("about.story.text1")}</p>
          <p className="text-sm mb-8">{t("about.story.text2")}</p>
          <p className="text-sm">{t("about.story.text3")}</p>
        </div>
        <div className="w-1/2 rounded-second overflow-hidden">
          <img src={ProfilPic} loading="lazy" alt="Profile Picture of Detective" />
        </div>
      </section>

      <section className="w-full mb-25 py-16 flex flex-col items-center bg-background">
        <div className="w-6xl">
          <div className="w-full mb-10">
            <h3 className="mb-5 text-3xl text-center">
              {t("about.core.mainTitle").split(" ")[0]}{" "} 
                <span className="text-second">
                  {t("about.core.mainTitle").split(" ")[1]}{" "} 
                </span>
               {t("about.core.mainTitle").split(" ")[2]}
            </h3>
            <p className="text-sm text-center">
              {t("about.core.textCore")}
            </p>
          </div>
          <div className="grid grid-cols-12 gap-8">
            {coreValues.map(({ iconeCard, titleCard, textCard }, index) => (
              <Card
                key={index}
                iconeCard={iconeCard}
                titleCard={titleCard}
                textCard={textCard}
                className="col-span-4"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-6xl mb-25 flex flex-col items-center gap-8">
        <div className="w-full mb-10">
          <h3 className="mb-5 text-3xl text-center">
            {t("about.credentials.mainTitle").split(" ")[0]}{" "} 
            <span className="text-second">
              {t("about.credentials.mainTitle").split(" ")[1]}{" "} 
            </span> 
            {t("about.credentials.mainTitle").split(" ")[2]} 
          </h3>
          <p className="text-sm text-center">
            {t("about.credentials.textCore")}
          </p>
        </div>
        <div className="grid grid-cols-12 gap-8">
          {credentialsValues.map(({ iconeCard, titleCard, textCard }, index) => (
            <Card
              key={index}
              iconeCard={iconeCard}
              titleCard={titleCard}
              textCard={textCard}
              className="col-span-3 bg-background rounded-second p-5"
            />
          ))}
        </div>
      </section>

      <section className="w-full mb-25 py-16 flex flex-col items-center bg-background">
        <div className="w-6xl">
          <div className="grid grid-cols-12 gap-8">
            <article className="col-span-3 flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-3">{t("about.credentials.cases.title")}</span>
              <p className="text-sm">{t("about.credentials.cases.text")}</p>
            </article>
            <article className="col-span-3 flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-3">{t("about.credentials.success.title")}</span>
              <p className="text-sm">{t("about.credentials.success.text")}</p>
            </article>
            <article className="col-span-3 flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-3">{t("about.credentials.years.title")}</span>
              <p className="text-sm">{t("about.credentials.years.text")}</p>
            </article>
            <article className="col-span-3 flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-3">{t("about.credentials.support.title")}</span>
              <p className="text-sm">{t("about.credentials.support.text")}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
