import {
  RiSpyFill,
  RiUserSearchFill,
  RiFileSearchFill,
  RiShieldUserFill,
  RiMapPinUserFill,
  RiLockFill,
  RiAccountPinBoxFill,
  RiTeamFill,
} from "react-icons/ri";
import type { TFunction } from "i18next";

export const getInfoService = (t: TFunction) => [
  {
    icone: <RiSpyFill />,
    title: t("services.surveillance.title"),
    text: t("services.surveillance.text"),
    listService: [
      t("services.surveillance.items.0"),
      t("services.surveillance.items.1"),
      t("services.surveillance.items.2"),
      t("services.surveillance.items.3"),
    ],
  },
  {
    icone: <RiUserSearchFill />,
    title: t("services.background.title"),
    text: t("services.background.text"),
    listService: [
      t("services.background.items.0"),
      t("services.background.items.1"),
      t("services.background.items.2"),
      t("services.background.items.3"),
    ],
  },
  {
    icone: <RiFileSearchFill />,
    title: t("services.fraud.title"),
    text: t("services.fraud.text"),
    listService: [
      t("services.fraud.items.0"),
      t("services.fraud.items.1"),
      t("services.fraud.items.2"),
      t("services.fraud.items.3"),
    ],
  },
  {
    icone: <RiShieldUserFill />,
    title: t("services.legal.title"),
    text: t("services.legal.text"),
    listService: [
      t("services.legal.items.0"),
      t("services.legal.items.1"),
      t("services.legal.items.2"),
      t("services.legal.items.3"),
    ],
  },
  {
    icone: <RiMapPinUserFill />,
    title: t("services.missing.title"),
    text: t("services.missing.text"),
    listService: [
      t("services.missing.items.0"),
      t("services.missing.items.1"),
      t("services.missing.items.2"),
      t("services.missing.items.3"),
    ],
  },
  {
    icone: <RiLockFill />,
    title: t("services.digital.title"),
    text: t("services.digital.text"),
    listService: [
      t("services.digital.items.0"),
      t("services.digital.items.1"),
      t("services.digital.items.2"),
      t("services.digital.items.3"),
    ],
  },
  {
    icone: <RiAccountPinBoxFill />,
    title: t("services.identity.title"),
    text: t("services.identity.text"),
    listService: [
      t("services.identity.items.0"),
      t("services.identity.items.1"),
      t("services.identity.items.2"),
      t("services.identity.items.3"),
    ],
  },
  {
    icone: <RiTeamFill />,
    title: t("services.corporate.title"),
    text: t("services.corporate.text"),
    listService: [
      t("services.corporate.items.0"),
      t("services.corporate.items.1"),
      t("services.corporate.items.2"),
      t("services.corporate.items.3"),
    ],
  },
  {
    icone: <RiTeamFill />,
    title: t("services.corporate.title"),
    text: t("services.corporate.text"),
    listService: [
      t("services.corporate.items.0"),
      t("services.corporate.items.1"),
      t("services.corporate.items.2"),
      t("services.corporate.items.3"),
    ],
  },
];
