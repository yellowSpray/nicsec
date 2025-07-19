import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";

export default function Contact() {
  return (
    <section className="w-6xl">
      <Content
        backgroundImage={Detective}
        title="Contact form."
        text="Providing discreet, thorough, and results-driven investigative services that empower individuals, businesses, and legal professionals, to make informed decisions."
        positionClassName="items-center text-center"
      />
    </section>
  );
}
