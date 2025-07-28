import { NavLink } from "react-router-dom";
import { FaSuitcaseRolling, FaIdCard } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import SwitchLng from "../ui/Switch";

interface NavBarProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavBar({ isMobile = false, onLinkClick }: NavBarProps) {
  const { t } = useTranslation();

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  if (isMobile) {
    return (
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/service"
          className={({ isActive }) =>
            `py-3 px-4 flex flex-row items-center gap-3 text-base border-b border-gray-200 ${
              isActive ? "text-second" : ""
            }`
          }
          onClick={handleLinkClick}
        >
          <FaSuitcaseRolling size={20} />
          {t("navbar.service")}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `py-3 px-4 flex flex-row items-center gap-3 text-base border-b border-gray-200 ${
              isActive ? "text-second" : ""
            }`
          }
          onClick={handleLinkClick}
        >
          <FaIdCard size={20} />
          {t("navbar.about")}
        </NavLink>

        <NavLink
          to="/faq"
          className={({ isActive }) =>
            `py-3 px-4 flex flex-row items-center gap-3 text-base border-b border-gray-200 ${
              isActive ? "text-second" : ""
            }`
          }
          onClick={handleLinkClick}
        >
          <FaQuestionCircle size={20} />
          {t("navbar.faq")}
        </NavLink>
        
        <div className="px-4 pt-2">
          <SwitchLng />
        </div>
      </nav>
    );
  }

  return (
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
      <SwitchLng />
    </nav>
  );
}
