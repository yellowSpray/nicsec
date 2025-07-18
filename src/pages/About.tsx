import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";

export default function About() {
  return (
    <section className="w-6xl">
      <Content
        backgroundImage={Detective}
        title="About Nicsec Investigation."
        text="25+ years of experience delivering truth with integrity, discretion, and unwavering professionalism."
      />
    </section>
  );
}
