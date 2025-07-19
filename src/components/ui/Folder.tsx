import BgFolder from "../ui/BgFolder";
import { FaCheck } from "react-icons/fa";

interface ServiceProps {
  icone: React.ReactNode;
  title: string;
  text: string;
  listService: string[];
}

export default function Folder({
  icone,
  title,
  text,
  listService,
}: ServiceProps) {
  return (
    <div className="col-span-3 relative">
      <article className="absolute">
        <div className="w-full flex flex-row items-center">
          <span className=" relative top-2 text-second">{icone}</span>
          <h4 className="w-full pl-3 text-center text-sm relative top-3">{title}</h4>
        </div>
        <div className="p-7">
            <p className="text-sm mb-4">{text}</p>
            <ul className="text-sm">
            {listService.map((item, idx) => (
                <li key={idx} className="flex flex-row items-center gap-3 py-1">
                <span className="text-second">
                    <FaCheck size={10} />
                </span>
                {item}
                </li>
            ))}
            </ul>
        </div>
      </article>
      <BgFolder />
    </div>
  );
}
