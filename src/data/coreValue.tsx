import {
  RiShieldCheckFill,
  RiAwardFill,
  RiFingerprintFill,
} from "react-icons/ri";
import type { TFunction } from "i18next";

export const getCoreValues = (t: TFunction) => [
  {
    iconeCard: <RiShieldCheckFill size={30} />,
    titleCard: t("about.core.integrity.title"),
    textCard: t("about.core.integrity.text"),
  },
  {
    iconeCard: <RiFingerprintFill size={30} />,
    titleCard: t("about.core.discretion.title"),
    textCard: t("about.core.discretion.text"),
  },
  {
    iconeCard: <RiAwardFill size={30} />,
    titleCard: t("about.core.excellence.title"),
    textCard: t("about.core.excellence.text"),
  },
];