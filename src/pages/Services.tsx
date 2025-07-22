import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";
import SvgFolder from "../components/ui/Folder";
import Card from "../components/ui/Card";
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
    <div className="w-full flex flex-col items-center">
      <Content
        backgroundImage={Detective}
        title={t("services.mainTitle")}
        text={t("services.mainText")}
        positionClassName="items-start text-start"
      />

      <section className="w-6xl my-30 flex flex-col items-center">
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

      <section className="w-full mb-30 py-16 flex flex-col items-center bg-background">
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
    </div>
  );
}
