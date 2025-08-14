import SvgFooter from "../ui/SvgFooter";
import { IoCall, IoCalendarClear, IoCompass } from "react-icons/io5";
import { FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import ContactForm from "../ui/ContactForm";
import { useTranslation } from "react-i18next";

export default function Footer() {

  const { t } = useTranslation();

  return (
    <footer className="xl:w-6xl lg:w-5xl md:w-4xl smd:w-3xl sm:w-xl w-90 relative flex flex-col items-center" id="footer">
      <div className="w-full xl:h-154 lg:h-138 md:h-200 smd:h-170 h-240 absolute top-0 left-0 z-0">
        <SvgFooter />
      </div>

      <section className="w-full xl:h-154 lg:h-138 md:h-200 smd:h-170 h-240 flex md:flex-row flex-col md:gap-14 smd:gap-0 gap-22 px-16 xl:py-16 py-10 z-10 hidden">
        <div className="md:w-2/5 w-full smd:h-2/3 h-1/3 flex md:flex-col smd:flex-row sm:flex-col md:items-start smd:items-center smd:gap-10 md:gap-0 text-white">
          <article className="md:w-full smd:w-2/3">
            <h3 className="text-3xl mb-5">{t('footer.contactTitle')}</h3>
            <p className="text-sm mb-5">
              {t('footer.contactText')}
            </p>
          </article>
          <ul className="text-sm">
            <li className="flex flex-row items-center gap-5 mb-4">
              <IoCall size={15} />
              {t('footer.call')}
            </li>
            <li className="flex flex-row items-center gap-5 mb-4">
              <IoCalendarClear size={15} />
              {t('footer.hours')}
            </li>
            <li className="flex flex-row items-center gap-5 mb-4">
              <IoCompass size={15} />
              {t('footer.location')}
            </li>
          </ul>
        </div>
        <div className="md:w-3/5 w-full md:pl-0 sm:pl-14 h-full">
          <ContactForm />
        </div>
      </section>

      <section className="w-full relative my-5 text-center">
        <div className="absolute xl:bottom-12 lg:bottom-10 md:bottom-60 smd:bottom-48 sm:bottom-117 left-0">
          <ul className="flex flex-col items-center gap-5">
            <li><FaYoutube size={21} /></li>
            <li><FaXTwitter size={21} /></li>
            <li><FaInstagram size={21} /></li>
            <li><FaLinkedinIn size={21} /></li>
          </ul>
        </div>
        <p className="text-xs">{t('footer.copyright')}</p>
      </section>
    </footer>
  );
}
