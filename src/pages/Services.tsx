import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";

export default function Service() {
  return (
    <section className="w-6xl">
      <Content
        backgroundImage={Detective}
        title="Professional Investigation Services."
        text="Comprehensive solutions tailored to your specific needs with discretion and expertise."
      />
    </section>
  );
}
