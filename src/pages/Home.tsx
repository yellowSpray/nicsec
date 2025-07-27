import Detective from "../assets/images/detective_pic.png";
import ServicePreview from "../assets/images/service-preview.jpg";
import Content from "../components/common/Content";
import BgService from "../components/ui/SvgService";
import Testimonial from "../components/ui/Testimonial";
import ArticleService from "../components/ui/ArticleService";
import { useTranslation, Trans } from "react-i18next";
import { RiShieldCheckFill, RiLock2Fill, RiTimeFill } from "react-icons/ri";

export default function Home() {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: <RiShieldCheckFill size={19} />,
      title: t("home.reasons.licensed.title"),
      description: t("home.reasons.licensed.text"),
    },
    {
      icon: <RiLock2Fill size={19} />,
      title: t("home.reasons.confidential.title"),
      description: t("home.reasons.confidential.text"),
    },
    {
      icon: <RiTimeFill size={19} />,
      title: t("home.reasons.availability.title"),
      description: t("home.reasons.availability.text"),
    },
  ];

  return (
    <main className="w-full bg-white flex flex-col items-center">
      <Content
        backgroundImage={Detective}
        title={t("home.content.title")}
        text={t("home.content.text")}
        positionClassName="items-center text-center"
      />

      <section className="w-6xl mb-25">
        <div className="w-1/3 mb-10">
          <h3 className="text-3xl mb-5">
            <Trans i18nKey="home.servicesIntro.title">
              What <span className="text-second">Service</span> I Offer
            </Trans>
          </h3>
          <p className="text-sm">{t("home.servicesIntro.text")}</p>
        </div>
        <div className="content-wrapper w-full h-100 relative">
          <div className="w-full h-full absolute top-0 left-0 z-0">
            <BgService />
          </div>
          <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-8 relative z-20">
            <ArticleService
              className="col-start-2"
              title={t("home.services.surveillance.title")}
              text={t("home.services.surveillance.text")}
            />
            <ArticleService
            className="col-start-4"
              title={t("home.services.peopleTracing.title")}
              text={t("home.services.peopleTracing.text")}
            />
            <ArticleService
            className="col-start-1 row-start-2"
              title={t("home.services.insuranceFraud.title")}
              text={t("home.services.insuranceFraud.text")}
            />
            <ArticleService
            className="col-start-3 row-start-2"
              title={t("home.services.privateInvestigations.title")}
              text={t("home.services.privateInvestigations.text")}
            />
          </div>
        </div>
      </section>

      <section className="w-full mb-25 flex flex-col items-center bg-background">
        <div className="w-6xl flex flex-row py-16 gap-32">
          <article className="w-2/5 flex flex-col justify-between">
            <h3 className="text-3xl">
              <Trans i18nKey="home.reasonsTitle">
                Why <span className="text-second">Choose</span> Nicsec
                investigations ?
              </Trans>
            </h3>
            {reasons.map(({ icon, title, description }, index) => (
              <div key={index}>
                <ul className="flex flex-row items-center gap-4 mb-1">
                  <li className="relative bottom-0.5 text-second">{icon}</li>
                  <li>
                    <h4 className="text-lg">{title}</h4>
                  </li>
                </ul>
                <p className="text-sm">{description}</p>
              </div>
            ))}
          </article>

          <div className="w-3/5 rounded-second overflow-hidden">
            <img
              src={ServicePreview}
              alt="service preview image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="w-6xl mb-25 flex flex-col items-center">
        <div className="mb-10">
          <h3 className="text-3xl mb-5">
            <Trans i18nKey="home.testimonialsTitle">
              Client <span className="text-second">Testimonials</span>
            </Trans>
          </h3>
          <p className="text-sm text-center">{t("home.testimonialsSubtitle")}</p>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <Testimonial
            name={t("home.testimonials.sarah.name")}
            role={t("home.testimonials.sarah.role")}
            comment={t("home.testimonials.sarah.comment")}
          />
          <Testimonial
            name={t("home.testimonials.james.name")}
            role={t("home.testimonials.james.role")}
            comment={t("home.testimonials.james.comment")}
          />
          <Testimonial
            name={t("home.testimonials.lisa.name")}
            role={t("home.testimonials.lisa.role")}
            comment={t("home.testimonials.lisa.comment")}
          />
        </div>
      </section>
    </main>
  );
}
