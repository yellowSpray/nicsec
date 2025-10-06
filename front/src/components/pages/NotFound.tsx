import Detective404 from "@/assets/images/detective404.jpg"
import { useTranslation } from "react-i18next";
import Content from "@/components/common/Content";

export default function NotFoundPage(){

    const { t } = useTranslation();

    return (
        <div className="w-full flex flex-col items-center">
        <Content
            backgroundImage={Detective404}
            title={t("404.mainTitle")}
            text={t("404.mainText")}
            positionClassName="items-center text-center"
            is404={true}
        />
      </div>
    )
}