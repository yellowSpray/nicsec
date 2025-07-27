import ServiceBg from "../assets/images/service-background.png";
import ServiceProcess from "../assets/images/service-background2.jpg";
import Content from "../components/common/Content";
import SvgFolder from "../components/ui/Folder";
import Card from "../components/ui/Card";
import Process from "../components/ui/Process";
import { FaShield } from "react-icons/fa6";
import { MdComputer } from "react-icons/md";
import { BiSolidBinoculars } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { getInfoService } from "../data/infoService";

export default function Service() {
  const { t } = useTranslation();
  const infoServiceValues = getInfoService(t);

  const specialized = [
    {
      iconeCard: <FaShield size={30} />,
      titleCard: t("services.specialized.corporate.title"),
      textCard: t("services.specialized.corporate.text"),
    },
    {
      iconeCard: <MdComputer size={30} />,
      titleCard: t("services.specialized.digital.title"),
      textCard: t("services.specialized.digital.text"),
    },
    {
      iconeCard: <BiSolidBinoculars size={30} />,
      titleCard: t("services.specialized.insurance.title"),
      textCard: t("services.specialized.insurance.text"),
    },
  ];

  return (
    <main className="w-full bg-white flex flex-col items-center">
      <Content
        backgroundImage={ServiceBg}
        title={t("services.mainTitle")}
        text={t("services.mainText")}
        positionClassName="items-start text-start"
      />

      <section className="w-6xl mb-25 flex flex-col items-center">
        <div className="w-full mb-10">
          <h3 className="text-3xl mb-5 text-center">
            {t("services.textServices.title.titleA")}
            <span className="text-second">{t("services.textServices.title.titleB")}</span>
          </h3>
          <p className="text-sm text-center">
            {t("services.textServices.text1")}
            <br />
            {t("services.textServices.text2")}
          </p>
        </div>
        <div className="w-full grid grid-cols-12 grid-rows-2 gap-8">
          {infoServiceValues.map(
            ({ icone, title, text, listService }, index) => (
              <SvgFolder
                key={index}
                icone={icone}
                title={title}
                text={text}
                listService={listService}
              />
            )
          )}
        </div>
      </section>

      <section className="w-full mb-25 py-16 flex flex-col items-center bg-background">
        <div className="w-6xl">
          <div className="w-full mb-10">
            <h3 className="mb-5 text-3xl text-center">
              <span className="text-second">{t("services.specialized.title.titleA")}</span> {t("services.specialized.title.titleB")}
            </h3>
            <p className="text-sm text-center">
              {t("services.specialized.text")}
            </p>
          </div>
          <div className="grid grid-cols-12 gap-8">
            {specialized.map(({ iconeCard, titleCard, textCard }, index) => (
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

      <section className="w-full mb-25 flex flex-col items-center">
        <div className="w-6xl grid grid-cols-12 gap-8 h-full items-center">
          <div className="col-span-6 row-span-1 h-full">
            <h3 className="mb-5 text-3xl text-start">
              {t("services.process.maintitle.titleA")}<span className="text-second">{t("services.process.maintitle.titleB")}</span>
            </h3>
            <p className="text-sm text-start mb-10">
              {t("services.process.mainText")}
            </p>
            <Process />
          </div>
          <div className="h-full col-span-6 row-span-1">
            <img src={ServiceProcess} alt="image of the process investigation" className="rounded-second"/>
          </div>
        </div>
      </section>
    </main>
  );
}
