import { NavLink } from "react-router-dom";
import { useMediaQuery } from "../../hooks/use-media-query";
import NavBar from "./NavBar";
import logo from "../../assets/svg/logo.svg";
import symbol from "../../assets/svg/logo-symbol.svg";

export default function Header() {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  
  return (
    <header className="xl:w-6xl lg:w-5xl md:w-4xl smd:w-3xl w-xl relative top-11 flex flex-row justify-between items-center z-10">
      <NavLink to="/" end>
        <img
          src={`${isDesktop ? logo : symbol}`}
          alt="logo of nicsec"
          className={`${isDesktop ? "w-30" : "w-7"}`}
        />
      </NavLink>

      <NavBar />

    </header>
  );
}
