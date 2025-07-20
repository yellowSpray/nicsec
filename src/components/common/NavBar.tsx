import { NavLink } from "react-router-dom";
import { FaSuitcaseRolling, FaIdCard } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="flex flex-row content-center items-center gap-4 p-1 text-sm font-medium">
      <NavLink
        to="/service"
        className={({ isActive }) =>
          `py-2 px-4 flex flex-row items-center gap-2 ${
            isActive ? "text-second" : ""
          }`
        }
      >
        <FaSuitcaseRolling size={18} />
        Service
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `py-2 px-4 flex flex-row items-center gap-2 ${
            isActive ? "text-second" : ""
          }`
        }
      >
        <FaIdCard size={18} />
        About
      </NavLink>

      <NavLink
        to="/faq"
        className={({ isActive }) =>
          `py-2 px-4 flex flex-row items-center gap-2 ${
            isActive ? "text-second" : ""
          }`
        }
      >
        <FaQuestionCircle size={18} />
        Faq
      </NavLink>
    </nav>
  );
}
