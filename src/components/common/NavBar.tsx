import { NavLink } from "react-router-dom";
import { useMediaQuery } from "../../hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription } from "../ui/drawer";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaSuitcaseRolling, FaIdCard } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import SwitchLng from "../ui/Switch";

export default function NavBar() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 960px)");

  return isDesktop ? (
    <nav className="flex flex-row content-center items-center gap-1 p-1 text-sm font-medium">
      <NavLink
        to="/service"
        className={({ isActive }) =>
          `py-2 lg:px-4 px-3 flex flex-row items-center gap-2 ${
            isActive ? "text-second" : ""
          }`
        }
      >
        <FaSuitcaseRolling size={18} />
        {t("navbar.service")}
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `py-2 lg:px-4 px-3 flex flex-row items-center gap-2 ${
            isActive ? "text-second" : ""
          }`
        }
      >
        <FaIdCard size={18} />
        {t("navbar.about")}
      </NavLink>

      <NavLink
        to="/faq"
        className={({ isActive }) =>
          `py-2 lg:px-4 px-3 flex flex-row items-center gap-2 ${
            isActive ? "text-second" : ""
          }`
        }
      >
        <FaQuestionCircle size={18} />
        {t("navbar.faq")}
      </NavLink>
      <SwitchLng className="ml-2" />
    </nav>
  ) : (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <HiOutlineMenuAlt3 size={30} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>            
        </DrawerHeader>
        <nav className="flex flex-col items-center gap-10 pt-10 text-sm font-medium">
          <NavLink
            to="/service"
            className={({ isActive }) =>
              `py-2 lg:px-4 px-3 flex flex-row items-center gap-2 ${
                isActive ? "text-second" : ""
              }`
            }
          >
            <FaSuitcaseRolling size={18} />
            {t("navbar.service")}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `py-2 lg:px-4 px-3 flex flex-row items-center gap-2 ${
                isActive ? "text-second" : ""
              }`
            }
          >
            <FaIdCard size={18} />
            {t("navbar.about")}
          </NavLink>

          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `py-2 lg:px-4 px-3 flex flex-row items-center gap-2 ${
                isActive ? "text-second" : ""
              }`
            }
          >
            <FaQuestionCircle size={18} />
            {t("navbar.faq")}
          </NavLink>
          <SwitchLng />
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
