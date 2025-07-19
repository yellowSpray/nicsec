import Detective from "../assets/images/detective_pic.png";
import ProfilPic from "../assets/images/service-preview3.jpg";
import Content from "../components/common/Content";
import Card from "../components/ui/Card";
import credentials from "../data/credentials";
import coreValue from "../data/coreValue";

export default function About() {
  return (
    <div className="w-full flex flex-col items-center">
      <Content
        backgroundImage={Detective}
        title="About Nicsec Investigation."
        text="25+ years of experience delivering truth with integrity, discretion, and unwavering professionalism."
        positionClassName="items-start text-start"
      />

      <section className="w-6xl my-30 flex flex-row justify-center gap-8">
        <div className="w-1/2">
          <h3 className="text-3xl mb-5 text-start">
            My <span className="text-second">Story</span>
          </h3>
          <p className="text-sm mb-8">
            Founded in 1999, Elite Investigations was born from a simple
            mission: to provide individuals and businesses with the truth they
            need to make informed decisions. What started as a one-person
            operation has grown into a full-service investigative agency trusted
            by attorneys, corporations, and families across the region.
          </p>
          <p className="text-sm mb-8">
            Our founder, a former law enforcement officer with over 15 years of
            experience, recognized the need for professional, ethical, and
            discreet investigative services in the private sector. Today, we
            continue to uphold those same values while leveraging cutting-edge
            technology and proven methodologies.
          </p>
          <p className="text-sm">
            We believe that everyone deserves access to the truth, and we're
            committed to uncovering it with the highest standards of
            professionalism and confidentiality.
          </p>
        </div>
        <div className="w-1/2 rounded-second overflow-hidden">
          <img src={ProfilPic} alt="Profile Picture of Detective" />
        </div>
      </section>

      <section className="w-full mb-30 py-16 flex flex-col items-center bg-background">
        <div className="w-6xl">
          <div className="w-full mb-10">
            <h3 className="mb-5 text-3xl text-center">
              My <span className="text-second">Core</span> Value
            </h3>
            <p className="text-sm text-center">
              The principles that guide every investigation we undertake
            </p>
          </div>
          <div className="grid grid-cols-12 gap-8">
            {coreValue.map(({ iconeCard, titleCard, textCard }, index) => (
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

      <section className="w-6xl mb-30 flex flex-col items-center gap-8">
        <div className="w-full mb-10">
          <h3 className="mb-5 text-3xl text-center">
            Credentials <span className="text-second">&</span> Certifications
          </h3>
          <p className="text-sm text-center">
            Professional qualifications that ensure quality service
          </p>
        </div>
        <div className="grid grid-cols-12 gap-8">
          {credentials.map(({ iconeCard, titleCard, textCard }, index) => (
            <Card
              key={index}
              iconeCard={iconeCard}
              titleCard={titleCard}
              textCard={textCard}
              className="col-span-3 bg-background rounded-second p-5"
            />
          ))}
        </div>
      </section>

      <section className="w-full mb-30 py-16 flex flex-col items-center bg-background">
        <div className="w-6xl">
          <div className="grid grid-cols-12 gap-8">
            <article className="col-span-3 flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-3">2500+</span>
              <p className="text-sm">Cases Completed</p>
            </article>
            <article className="col-span-3 flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-3">95%</span>
              <p className="text-sm">Success Rate</p>
            </article>
            <article className="col-span-3 flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-3">25+</span>
              <p className="text-sm">Years Experience</p>
            </article>
            <article className="col-span-3 flex flex-col items-center text-center">
              <span className="text-4xl font-bold mb-3">24/7</span>
              <p className="text-sm">Available Support</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
