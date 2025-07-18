import Button from "../ui/Button";
import { IoCall, IoCalendarClear , IoCompass } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="w-6xl h-115 mt-20 flex flex-col items-center">
      <section className="bg-footer flex flex-row gap-14 px-16 py-14">
        <div className="w-1/2 h-full flex flex-col items-start justify-between text-white">
          <h3>Contact Me Today</h3>
          <p>
            We are a team of skilled investigators and support staff, working
            together to ensure you receive the highest quality investigative
            services.
          </p>
          <ul>
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
          <Button buttonTxt="Contact Me" />
        </div>
        <div className="w-1/2 h-full bg-gray-600">
          <p>future map.</p>
        </div>
      </section>
      <section className="my-5">
        <p>© 2025 Nicosec. All rights reserved.</p>
      </section>
    </footer>
  );
}
