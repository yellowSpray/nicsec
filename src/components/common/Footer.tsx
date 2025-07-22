import SvgFooter from "../ui/SvgFooter";
import { IoCall, IoCalendarClear, IoCompass } from "react-icons/io5";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import ContactForm from "../ui/ContactForm";
import { useTranslation } from "react-i18next";

export default function Footer() {

  const { t } = useTranslation();

  return (
    <footer className="w-6xl relative flex flex-col items-center">
      <div className="w-full h-154 absolute top-0 left-0 z-0">
        <SvgFooter />
      </div>

      <section className="w-full h-154 flex flex-row gap-14 px-16 pt-16 pb-12 z-10">
        <div className="w-2/5 h-2/3 flex flex-col items-start text-white">
          <h3 className="text-3xl mb-5">{t('footer.contactTitle')}</h3>
          <p className="text-sm mb-5">
            {t('footer.contactText')}
          </p>
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
        <div className="w-3/5 h-full">
          <ContactForm />
        </div>
      </section>

      <section className="w-full relative my-5 text-center">
        <div className="absolute bottom-20">
          <ul className="flex flex-row justify-center gap-8">
            <li><FaYoutube size={30} /></li>
            <li><FaXTwitter size={30} /></li>
            <li><FaInstagram size={30} /></li>
          </ul>
        </div>
        <p className="text-xs">{t('footer.copyright')}</p>
      </section>
    </footer>
  );
}
