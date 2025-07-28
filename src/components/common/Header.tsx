import { NavLink } from "react-router-dom";
import { useState } from "react";
import NavBar from "./NavBar";
import logo from "../../assets/svg/logo.svg"
import symbol from "../../assets/svg/logo-symbol.svg"
import useWindowDimensions from "../../hooks/SizeWindow";

export default function Header () {
    const { width } = useWindowDimensions();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="xl:w-6xl lg:w-5xl md:w-4xl smd:w-3xl w-xl relative top-11 flex flex-row justify-between items-center z-10">
            <NavLink to="/" end>
                { width >= 960 ? (
                    <img src={logo} alt="logo of nicsec" className="w-30" />
                ) : (
                    <img src={symbol} alt="logo of nicsec" className="w-7" />
                )}
            </NavLink>

            {/* Menu burger button */}
            <button
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className={`w-6 h-0.5 bg-current rounded-second transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-current rounded-second transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-current rounded-second transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>

            {/* Navigation normale pour desktop */}
            <div className="hidden md:block">
                <NavBar />
            </div>


            {/* Menu mobile overlay */}
            {isMenuOpen && (
                <div className="z-20 md:hidden" onClick={toggleMenu}>
                    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-30" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4">
                            <button
                                className="absolute top-4 right-4 w-8 h-8 flex flex-col justify-center items-center"
                                onClick={toggleMenu}
                                aria-label="Close menu"
                            >
                                <span className="w-6 h-0.5 bg-current rotate-45 translate-y-0.5"></span>
                                <span className="w-6 h-0.5 bg-current -rotate-45 -translate-y-0.5"></span>
                            </button>
                            <div className="mt-12">
                                <NavBar isMobile={true} onLinkClick={toggleMenu} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}