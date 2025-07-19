import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";

export default function Faq() {
  return (
    <section className="w-6xl">
      <Content
        backgroundImage={Detective}
        title="Faq for all the question."
        text="Providing discreet, thorough, and results-driven investigative services that empower individuals, businesses, and legal professionals, to make informed decisions."
        positionClassName="items-start text-start"
      />
    </section>
  );
}
