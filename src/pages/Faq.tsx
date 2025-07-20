import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";
import Accordion from "../components/ui/Accordion";
import { questionGeneral } from "../data/questions";
import { questionService } from "../data/questions";

export default function Faq() {
  return (
    <div className="w-full flex flex-col items-center">
      <Content
        backgroundImage={Detective}
        title="Faq for all the question."
        text="Providing discreet, thorough, and results-driven investigative services that empower individuals, businesses, and legal professionals, to make informed decisions."
        positionClassName="items-start text-start"
      />

      <section className="w-6xl my-30 flex flex-col items-center gap-8 text-center">
        <div className="w-1/2">
          <h3 className="text-3xl mb-5">
            How Can I <span className="text-second">Help</span> You?
          </h3>
          <p className="text-sm mb-5">
            I understand that hiring a private investigator can raise many
            questions. Below are answers to the most common inquiries we receive
            from our clients.
          </p>
          <aside className="">
            <p className="text-sm">
              Don't see your question answered below? Contact me for a free
              consultation where we can discuss your specific needs and
              concerns.
            </p>
          </aside>
        </div>
      </section>

      <section className="w-full mb-30 flex flex-col items-center">
        <div className="w-full py-16 flex flex-col items-center bg-background">
          <h4 className="text-lg mb-5">General Questions</h4>
          { questionGeneral.map( ( {question, answer} , index) => (
            <Accordion
              key={index}
              className="bg-gray-200 mb-4"
              question={question}
              answer={answer}
            />
          ))}
        </div>
        <div className="w-6xl pt-16 flex flex-col items-center">
          <h4 className="text-lg mb-5">Process & Confidentiality</h4>
          { questionService.map (({ question , answer }, index) => (
            <Accordion
              key={index}
              className="bg-background mb-4"
              question={question}
              answer={answer}
            />
          ))}
          
        </div>
      </section>
    </div>
  );
}
