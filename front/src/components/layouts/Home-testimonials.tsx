import { useTranslation, Trans } from "react-i18next";
import Testimonial from "@/components/ui/testimonial";

export default function TestimonialsAll() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl my-16 md:my-32 space-y-8 mx-8">
      <div className="*:text-center space-y-8">
        <h3 className="text-3xl">
          <Trans i18nKey="home.testimonialsIntro.title">
            Client <span className="text-second">Testimonials</span>
          </Trans>
        </h3>
        <p>
          <Trans i18nKey="home.testimonialsIntro.text">
            Trusted by <span className='font-bold'>hundreds of satisfied</span> clients.
          </Trans>
        </p>
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
  );
}
