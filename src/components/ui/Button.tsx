import { scrollToSection } from "../../features/scrollButton";

interface ButtonProps {
  buttonTxt: string,
  iconeButton: React.ReactNode,
  className: string,
};

export default function Button({ buttonTxt, iconeButton, className }: ButtonProps) {

  return (
    <button 
      onClick={scrollToSection}
      className={`flex flex-row content-center items-center gap-1 rounded-second bg-second py-2 px-5 text-white text-sm ${className || ''}`}
    >
      {buttonTxt}
      <span className="relative bottom-0.5">{iconeButton}</span>
    </button>
  );
}