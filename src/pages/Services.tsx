import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";
import SvgFolder from "../components/ui/Folder";
import Card from "../components/ui/Card"
import infoService from "../data/infoService";
import { FaShield } from "react-icons/fa6";
import { MdComputer } from "react-icons/md";
import { BiSolidBinoculars } from "react-icons/bi";

export default function Service() {
  const specialized = [
    {
      iconeCard: <FaShield size={30} />,
      titleCard: "Corporate Security",
      textCard:
        "Internal theft, corporate espionage, and workplace investigations for businesses of all sizes.",
    },
    {
      iconeCard: <MdComputer size={30} />,
      titleCard: "Digital Forensics",
      textCard:
        "Computer and mobile device investigations, data recovery, and cybercrime analysis.",
    },
    {
      iconeCard: <BiSolidBinoculars size={30} />,
      titleCard: "Insurance Claims",
      textCard:
        "Workers' compensation fraud, disability claims verification, and accident reconstruction.",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <Content
        backgroundImage={Detective}
        title="Expert Private Investigation Services"
        text="Discreet and results-driven solutions tailored to your specific needs.Trust our expertise to uncover the truth with professionalism and integrity."
        positionClassName="items-start text-start"
      />

      <section className="w-6xl my-30 flex flex-col items-center">
        <div className="w-full mb-10">
          <h3 className="text-3xl mb-5 text-center">
            My Investigation <span className="text-second">Services</span>
          </h3>
          <p className="text-sm text-center">
            I provide professional investigative services tailored to your
            needs. <br />
            Every case is approached with confidentiality and personal
            attention.
          </p>
        </div>
        <div className="w-full grid grid-cols-12 grid-rows-2 gap-8">
          {infoService.map(({ icone, title, text, listService }, index) => (
            <SvgFolder
              key={index}
              icone={icone}
              title={title}
              text={text}
              listService={listService}
            />
          ))}
        </div>
      </section>

      <section className="w-full mb-30 py-16 flex flex-col items-center bg-background">
        <div className="w-6xl">
          <div className="w-full mb-10">
            <h3 className="mb-5 text-3xl text-center">
              <span className="text-second">Specialized</span> Investigations
            </h3>
            <p className="text-sm text-center">
              Advanced investigative services for complex cases
            </p>
          </div>
          <div className="grid grid-cols-12 gap-8">
            {specialized.map(({ iconeCard, titleCard, textCard }, index) => (
              <Card
                key={index} 
                iconeCard={iconeCard}
                titleCard={titleCard}
                textCard={textCard}
                className="col-span-4"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
