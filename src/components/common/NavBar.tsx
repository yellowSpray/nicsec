import { NavLink } from "react-router-dom";
import { IdCard, Briefcase, CircleQuestionMark, Mail } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="flex flex-row content-center items-center gap-4 p-1 text-sm font-bold">
      
      <NavLink
        to="/service"
        className={({ isActive }) =>
          `py-2 px-4 flex flex-row items-center gap-2 ${
            isActive ? "text-white bg-green rounded-perso" : ""
          }`
        }
      >
        <Briefcase size={18} />
        Service
      </NavLink>
      
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `py-2 px-4 flex flex-row items-center gap-2 ${
            isActive ? "text-white bg-green rounded-perso" : ""
          }`
        }
      >
        <IdCard size={20} />
        About
      </NavLink>
      
      <NavLink
        to="/faq"
        className={({ isActive }) =>
          `py-2 px-4 flex flex-row items-center gap-2 ${
            isActive ? "text-white bg-green rounded-perso" : ""
          }`
        }
      >
        <CircleQuestionMark size={18} />
        Faq
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `py-2 px-4 flex flex-row items-center gap-2 ${
            isActive ? "text-white bg-green rounded-perso" : ""
          }`
        }
      >
        <Mail size={18} />
        Contact
      </NavLink>

    </nav>
  );
}
