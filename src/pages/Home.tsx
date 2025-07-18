import Detective from "../assets/images/detective_pic.png";
import ServicePreview from "../assets/images/service-preview.jpg"
import Content from "../components/common/Content";
import BgService from "../components/ui/BgService";
import Testimonial from "../components/ui/Testimonial";
import { RiShieldCheckFill, RiLock2Fill, RiTimeFill } from "react-icons/ri";

export default function Home() {

  const reasons = [
    {
      icon: <RiShieldCheckFill size={19} />,
      title: "Licensed & Insured",
      description: "Fully Licensed private investigator with comprehensive insurance coverage."
    },
    {
      icon: <RiLock2Fill size={19} />,
      title: "100% Confidential",
      description: "Your privacy and case details are protected with the highest level of discretion."
    },
    {
      icon: <RiTimeFill size={19} />,
      title: "24/7 Availability",
      description: "Available around the clock for urgent cases and emergency situations."
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <Content
        backgroundImage={Detective}
        title="Professional & Friendly Private Detective."
        text="Providing discreet, thorough, and results-driven investigative services that empower individuals, businesses, and legal professionals, to make informed decisions."
      />

      <section className="w-6xl my-30">
        <div className="w-1/3 mb-10">
          <h3 className="text-3xl mb-5">
            What <span className="text-second">Service</span> I Offer
          </h3>
          <p className="text-sm">
            My experience delivers reliable, discreet solutions that enable my
            clients to make informed, effective decisions.
          </p>
        </div>
        <div className="content-wrapper w-full h-100 relative">
          <div className="w-full h-full absolute top-0 left-0 z-0">
            <BgService />
          </div>
          <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-8 relative z-20">
            <article className="grid col-start-2 content-center px-4">
              <h4 className="text-lg">Surveillance</h4>
              <p className="text-xs">
                Gain critical insights with our expert surveillance services,
                which are carried out with absolute discretion and
                professionalism.
              </p>
            </article>
            <article className="grid col-span-1 col-start-4 content-center px-4">
              <h4 className="text-lg">People Tracing</h4>
              <p className="text-xs">
                Identify the location and assets of a debtor in support of a
                debt recovery case
              </p>
            </article>
            <article className="grid col-span-1 col-start-1 row-start-2 content-center">
              <h4 className="text-lg">Insurance Fraud</h4>
              <p className="text-xs">
                Professional gathering of evidence and intelligence to uncover
                fraudulent insurance claims.
              </p>
            </article>
            <article className="grid col-span-1 col-start-3 row-start-2 content-center px-4">
              <h4 className="text-lg">Private Investigations</h4>
              <p className="text-xs">
                Professional gathering of information and evidence for
                individuals in a discreet, ethical and lawful manner.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col items-center mb-30 bg-background">
        <div className="w-6xl flex flex-row py-16 gap-32">

          <article className="w-2/5 flex flex-col justify-between">

            <h3 className="text-3xl">Why <span className="text-second">Choose</span> Nicsec investigations ?</h3>
            {reasons.map(({ icon, title, description }, index) => (
              <div key={index}>
                <ul className="flex flex-row items-center gap-4 mb-1">
                  <li className="relative bottom-0.5 text-second">{icon}</li>
                  <li><h4 className="text-lg">{title}</h4></li>
                </ul>
                <p className="text-sm">{description}</p>
              </div>
            ))}
          </article>
          
          <div className="w-3/5">
            <img src={ServicePreview} alt="service preview image" loading="lazy"/>
          </div>
        </div>
      </section>

      <section className="w-6xl mb-30 flex flex-col items-center">
        <div className="mb-10">
          <h3 className="text-3xl mb-5">Client <span className="text-second">Testimonials</span></h3>
          <p className="text-sm text-center">Trusted by hundreds of satisfied clients</p>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <Testimonial 
            name="Sarah M." 
            role="Corporate Client" 
            comment="We hired him for a sensitive internal investigation. His professionalism, discretion, and swift results exceeded all our expectations. Highly reliable." 
          />
          <Testimonial 
            name="James R." 
            role="Personal Client" 
            comment="He helped me uncover the truth in a very personal matter. Attentive, empathetic, and incredibly efficient. I can’t thank him enough and would recommend him without hesitation." 
          />
          <Testimonial 
            name="Lisa K." 
            role="Attorney" 
            comment="A trusted partner for sensitive legal cases. His thorough work has strengthened several of my cases with clear, admissible evidence. An invaluable asset in legal proceedings." 
          />
        </div>
      </section>
    </div>
  );
}
