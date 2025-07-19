import { TiArrowRight } from "react-icons/ti";

interface ButtonProps {
  buttonTxt: string;
};

export default function Button({ buttonTxt }: ButtonProps) {
  return (
    <button className="flex flex-row align-center gap-1 rounded-second bg-second py-2 px-5 text-white text-sm">
      {buttonTxt}
      <TiArrowRight size={20} />
    </button>
  );
}
