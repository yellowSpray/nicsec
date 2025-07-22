interface ButtonProps {
  buttonTxt: string,
  iconeButton?: React.ReactNode,
  className: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

export default function Button({ buttonTxt, iconeButton, className, onClick }: ButtonProps) {

  return (
    <button 
      onClick={onClick}
      className={`flex flex-row content-center items-center gap-1 rounded-second py-2 px-5 text-white text-sm ${className || ''}`}
    >
      <p className="relative top-0.5">{buttonTxt}</p>
      <span className="relative bottom-0">{iconeButton}</span>
    </button>
  );
}