import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import logo from "../../assets/svg/logo.svg"

export default function Header () {
    return (
        <header className="w-6xl relative top-11 flex flex-row justify-between items-center z-10">
            <NavLink to="/" end>
                <img src={logo} alt="logo of nicsec" className="w-35" />
            </NavLink>
            <NavBar />
        </header>
    )
}