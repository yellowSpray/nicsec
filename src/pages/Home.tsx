import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";

export default function Home() {
  return (
    <section className="w-6xl">
      <Content
        backgroundImage={Detective}
        title="Professional & Friendly Private Detective."
        text="Providing discreet, thorough, and results-driven investigative services that empower individuals, businesses, and legal professionals, to make informed decisions."
      />
    </section>
  );
}
