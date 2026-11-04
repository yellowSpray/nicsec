import { useTranslation } from "react-i18next";
import Paragraphs from "@/components/ui/paragraphs";
import { usePageMeta } from "@/hooks/usePageMeta";
import { LEGAL_INFO } from "@/data/legalInfo";

interface LegalSection {
  title: string;
  text: string;
}

interface LegalPageProps {
  /** Key of the page in i18n: legal.<page> */
  page: "notice" | "privacy" | "cookies";
}

/**
 * Legal notice, privacy policy and cookies pages (content document, sections 10.3 to 10.5).
 * The legal identity comes from data/legalInfo.ts and is injected in the texts.
 */
export default function LegalPage({ page }: LegalPageProps) {
  const { t } = useTranslation();

  const values = {
    legalName: LEGAL_INFO.legalName,
    bce: LEGAL_INFO.bce,
    vat: LEGAL_INFO.vat,
    address: LEGAL_INFO.address,
    email: LEGAL_INFO.email,
    phone: LEGAL_INFO.phone,
    // Never claim a licence before it is granted
    authorization: LEGAL_INFO.authorizationNumber
      ? t("footer.legal.authorization", { number: LEGAL_INFO.authorizationNumber })
      : t("legal.pendingAuthorization"),
  };

  usePageMeta(t(`legal.${page}.seo.title`), t(`legal.${page}.seo.description`));

  const sections = t(`legal.${page}.sections`, { returnObjects: true, ...values }) as LegalSection[];

  return (
    <main className="w-full flex justify-center px-8">
      <article className="max-w-3xl w-full my-16 md:my-24 space-y-12">
        <h2 className="text-4xl sm:text-5xl">{t(`legal.${page}.title`)}</h2>

        {Array.isArray(sections) && sections.map(({ title, text }, index) => (
          <section key={index} className="space-y-3">
            <h4>{title}</h4>
            <Paragraphs text={text} />
          </section>
        ))}
      </article>
    </main>
  );
}
