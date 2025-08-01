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

      <section className="xl:w-6xl lg:w-5xl md:w-4xl smd:w-3xl w-xl mb-25">
        <div className="lg:w-1/3 w-1/2 mb-10">
          <h3 className="text-3xl mb-5">
            <Trans i18nKey="home.servicesIntro.title">
              What <span className="text-second">Service</span> I Offer
            </Trans>
          </h3>
          <p className="text-sm">{t("home.servicesIntro.text")}</p>
        </div>
        <div className="content-wrapper w-full relative">
          <div className="w-full h-full absolute top-0 left-0 z-0">
            <BgService />
          </div>
          <div className="w-full xl:h-95 lg:h-85 md:h-110 h-255 grid grid-cols-12 grid-rows-4 items-start relative z-20">
            <ArticleService
              className="md:col-start-4 col-start-7 md:px-6 pl-10 pt-0"
              title={t("home.services.surveillance.title")}
              text={t("home.services.surveillance.text")}
            />
            <ArticleService
              className="md:col-start-10 col-start-1 md:row-start-1 row-start-2 md:px-6 pl-0 md:pt-0 pt-14"
              title={t("home.services.peopleTracing.title")}
              text={t("home.services.peopleTracing.text")}
            />
            <ArticleService
              className="md:col-start-1 col-start-7 md:row-start-3 row-start-3 md:pr-6 md:pl-0 pl-10 md:pt-8 pt-10"
              title={t("home.services.insuranceFraud.title")}
              text={t("home.services.insuranceFraud.text")}
            />
            <ArticleService
              className="md:col-start-7 col-start-1 md:row-start-3 row-start-4 md:px-6 pl-0 md:pt-8 pt-14"
              title={t("home.services.privateInvestigations.title")}
              text={t("home.services.privateInvestigations.text")}
            />
          </div>
        </div>
      </section>

      <section className="w-full mb-25 flex flex-col items-center bg-background">
        <div className="xl:w-6xl lg:w-5xl md:w-4xl smd:w-3xl w-xl flex sm:flex-col py-16">
          <h3 className="text-3xl mb-5 md:text-left text-center">
            <Trans i18nKey="home.reasonsTitle">
              Why <span className="text-second">Choose</span> Nicsec
              investigations ?
            </Trans>
          </h3>
          <div className="w-full flex md:flex-row flex-col md:justify-between items-center">
            <article className="md:w-2/6 w-full flex flex-col md:gap-2 gap-4 md:order-1 order-2 md:mt-0 mt-10">
              {reasons.map(({ icon, title, description }, index) => (
                <div key={index} className="mb-5 md:text-left text-center">
                  <ul className="flex flex-row justify-center gap-4 md:mb-1 mb-2">
                    <li className="relative bottom-0.5 text-second">{icon}</li>
                    <li>
                      <h4 className="text-lg">{title}</h4>
                    </li>
                  </ul>
                  <p className="text-sm">{description}</p>
                </div>
              ))}
            </article>

            <div className="md:w-3/6 w-1/2 rounded-second overflow-hidden md:order-2 order-1">
              <img
                src={ServicePreview}
                alt="service preview image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="xl:w-6xl lg:w-5xl md:w-4xl smd:w-3xl w-xl mb-25 flex flex-col items-center">
        <div className="mb-10">
          <h3 className="text-3xl mb-5">
            <Trans i18nKey="home.testimonialsTitle">
              Client <span className="text-second">Testimonials</span>
            </Trans>
          </h3>
          <p className="text-sm text-center">{t("home.testimonialsSubtitle")}</p>
        </div>
        <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
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
