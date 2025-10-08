import { IoCall, IoCalendarClear, IoCompass } from "react-icons/io5";
import { FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import ContactForm from "./ContactForm";
import { useTranslation } from "react-i18next";

export default function Footer() {

  const { t } = useTranslation();

  return (
    <footer className="w-full flex flex-col items-center" id="footer">
        <section className="max-w-6xl p-10 mx-8 bg-main rounded-second grid grid-cols-12 gap-8 max-md:grid-cols-4 max-sm:grid-cols-1">
          <div className="flex flex-col text-white space-y-8 col-span-5 max-md:col-span-4 max-sm:col-span-1">
            <article className="space-y-8">
              <h3 className="text-3xl">{t('footer.contactTitle')}</h3>
              <p>{t('footer.contactText')}</p>
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
          <div className="h-full col-span-7 max-md:col-span-4 max-sm:col-span-1">
            <ContactForm />
          </div>
        </section>

        <section className="max-w-6xl my-5 text-center space-y-6">
          <ul className="flex flex-row justify-center gap-5">
            <li><FaYoutube size={21} /></li>
            <li><FaXTwitter size={21} /></li>
            <li><FaInstagram size={21} /></li>
            <li><FaLinkedinIn size={21} /></li>
          </ul>
          <p className="text-xs">{t('footer.copyright')}</p>
        </section>
    </footer>
  );
}
