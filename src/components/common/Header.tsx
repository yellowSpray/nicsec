import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import logo from "../../assets/svg/logo.svg"

export default function Header () {
    return (
        <header className="w-6xl mb-4 flex flex-row justify-between items-center">
            <NavLink to="/" end>
                <img src={logo} alt="logo of nicsec" />
            </NavLink>
            <NavBar />
        </header>
    )
}