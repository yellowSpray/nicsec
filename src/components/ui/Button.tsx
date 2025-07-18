type ButtonProps = {
    buttonTxt: string;
};

export default function Button({buttonTxt}: ButtonProps) {
    return (
        <button className="rounded-second bg-second py-3 px-10 text-white">
            {buttonTxt}
        </button>
    );
}