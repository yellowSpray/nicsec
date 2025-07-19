import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";
import Folder from "../components/ui/Folder";
import infoService from "../features/infoService";

export default function Service() {

  return (
    <div className="w-full flex flex-col items-center">
      <Content
        backgroundImage={Detective}
        title="Expert Private Investigation Services"
        text="Discreet and results-driven solutions tailored to your specific needs.Trust our expertise to uncover the truth with professionalism and integrity."
        positionClassName="items-start text-start"
      />

      <section className="w-6xl my-30 flex flex-col items-center">
        <div className="w-full mb-16">
          <h3 className="text-3xl mb-5 text-center">
            My Investigation <span className="text-second">Services</span>
          </h3>
          <p className="text-sm text-center">
            I provide professional investigative services tailored to your
            needs. <br/>Every case is approached with confidentiality and personal
            attention.
          </p>
        </div>
        <div className="w-full grid grid-cols-12 grid-rows-2 gap-8">
          {infoService.map(({icone, title, text, listService },  index) => (
            <Folder
              key={index} 
              icone={icone}
              title={title}
              text={text}
              listService={listService}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
