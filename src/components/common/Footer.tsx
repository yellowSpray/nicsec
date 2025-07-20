import SvgFooter from "../ui/SvgFooter";
import { IoCall, IoCalendarClear, IoCompass } from "react-icons/io5";
import ContactForm from "../ui/ContactForm";

export default function Footer() {
  return (
    <footer className="w-6xl relative flex flex-col items-center">
      <div className="w-full h-154 absolute top-0 left-0 z-0">
        <SvgFooter />
      </div>

      <section className="w-full h-154 flex flex-row gap-14 px-16 pt-16 pb-12 z-10">
        <div className="w-2/5 h-2/3 flex flex-col items-start text-white">
          <h3 className="text-3xl mb-5">Contact Me Today</h3>
          <p className="text-sm mb-5">
            With experience and precision, I offer professional investigative
            services tailored to meet your unique needs, with the utmost
            discretion.
          </p>
          <ul className="text-sm">
            <li className="flex flex-row items-center gap-5 mb-4">
              <IoCall size={15} />
              Call me today : 049XXXXXXX
            </li>
            <li className="flex flex-row items-center gap-5 mb-4">
              <IoCalendarClear size={15} />
              Mon - Sun: 06:00 AM - 22:00 PM
            </li>
            <li className="flex flex-row items-center gap-5 mb-4">
              <IoCompass size={15} />
              Belgium, Brussels - Walloon Brabant - Namur
            </li>
          </ul>
        </div>
        <div className="w-3/5 h-full">
          <ContactForm />
        </div>
      </section>

      <section className="w-full my-5 text-center">
        <p className="text-xs">© 2025 Nicosec. All rights reserved.</p>
      </section>
    </footer>
  );
}
