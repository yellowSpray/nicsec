import {
  RiShieldUserFill,     // Licensed PI
  RiMedalFill,          // ASIS Certified
  RiFilePaper2Fill,          // Court Qualified
  RiBankCardFill     // Bonded & Insured
} from "react-icons/ri";
import type { TFunction } from "i18next";


export const getCredentials = (t: TFunction) => [
  {
    iconeCard: <RiShieldUserFill size={30} />,
    titleCard: t("about.credentials.licensed.title"),
    textCard: t("about.credentials.licensed.text"),
  },
  {
    iconeCard: <RiMedalFill size={30} />,
    titleCard: t("about.credentials.asis.title"),
    textCard: t("about.credentials.asis.text"),
  },
  {
    iconeCard: <RiFilePaper2Fill size={30} />,
    titleCard: t("about.credentials.court.title"),
    textCard: t("about.credentials.court.text"),
  },
  {
    iconeCard: <RiBankCardFill size={30} />,
    titleCard: t("about.credentials.bonded.title"),
    textCard: t("about.credentials.bonded.text"),
  },
];