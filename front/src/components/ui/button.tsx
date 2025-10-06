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
      className={className || ''}
    >
      <p className="relative top-0.5">{buttonTxt}</p>
      <span className="relative bottom-0">{iconeButton}</span>
    </button>
  );
}