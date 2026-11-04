import { IoLocationSharp } from "react-icons/io5";
import ContactForm from "./ContactForm";
import Paragraphs from "../ui/paragraphs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { scrollToSection } from "@/features/scrollButton";
import { LEGAL_INFO } from "@/data/legalInfo";

export default function Footer() {

  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full flex flex-col items-center" id="footer">
        {/* Contact block (content document, section 9) */}
        <section className="max-w-6xl p-6 sm:p-10 mx-8 bg-main rounded-second grid grid-cols-12 gap-8 max-md:grid-cols-4 max-sm:grid-cols-1">
          <div className="flex flex-col text-white space-y-8 col-span-5 max-md:col-span-4 max-sm:col-span-1">
            <article className="space-y-8">
              <h3 className="text-3xl">{t("footer.contactTitle")}</h3>
              <Paragraphs text={t("footer.contactText")} />
            </article>
            <ul className="text-sm">
              <li className="flex flex-row items-center gap-5 mb-4">
                <IoLocationSharp size={15} aria-hidden="true" />
                {t("footer.location")}
              </li>
            </ul>
          </div>
          <div className="h-full col-span-7 max-md:col-span-4 max-sm:col-span-1">
            <ContactForm />
          </div>
        </section>

        {/* Legal information (content document, sections 10.1 and 10.2) */}
        <section className="max-w-6xl mx-8 my-8 text-center space-y-2 text-xs text-main/80">
          <p>
            <span className="font-bold">VESTIGE</span>
            {" · "}{LEGAL_INFO.legalName}
            {" · "}{t("footer.legal.bce")} {LEGAL_INFO.bce}
            {" · "}{t("footer.legal.vat")} {LEGAL_INFO.vat}
          </p>
          <p>
            {LEGAL_INFO.address}
            {" · "}{t("footer.legal.email")} {LEGAL_INFO.email}
            {" · "}{t("footer.legal.phone")} {LEGAL_INFO.phone}
          </p>
          {LEGAL_INFO.authorizationNumber && (
            <p>{t("footer.legal.authorization", { number: LEGAL_INFO.authorizationNumber })}</p>
          )}
          <p>{t("footer.boip")}</p>
          <p>© {year} VESTIGE. {t("footer.rights")}</p>
          <nav aria-label={t("legal.linksLabel")} className="pt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link to="/mentions-legales" className="underline-offset-2 hover:underline">{t("legal.links.notice")}</Link>
            <Link to="/vie-privee" className="underline-offset-2 hover:underline">{t("legal.links.privacy")}</Link>
            <Link to="/cookies" className="underline-offset-2 hover:underline">{t("legal.links.cookies")}</Link>
            <a
              href="#footer"
              className="underline-offset-2 hover:underline"
              onClick={(event) => { event.preventDefault(); scrollToSection(); }}
            >
              {t("legal.links.contact")}
            </a>
          </nav>
        </section>
    </footer>
  );
}
