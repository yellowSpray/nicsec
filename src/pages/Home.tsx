import Detective from "../assets/images/detective_pic.png";
import Content from "../components/common/Content";
import BgService from "../components/ui/BgService";

export default function Home() {
  return (
    <section className="w-6xl">
      <Content
        backgroundImage={Detective}
        title="Professional & Friendly Private Detective."
        text="Providing discreet, thorough, and results-driven investigative services that empower individuals, businesses, and legal professionals, to make informed decisions."
      />

      <div className="w-6xl my-30">
        <div className="w-1/3 mb-10">
          <h3 className="text-3xl mb-5">
            What <span>Service</span> I Offer
          </h3>
          <p className="text-sm">
            My experience delivers reliable, discreet solutions that enable my
            clients to make informed, effective decisions.
          </p>
        </div>
        <div className="content-wrapper w-full h-100 relative">
          <div className="w-full h-full absolute top-0 left-0">
            <BgService />
          </div>
          <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-8">
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
      </div>
    </section>
  );
}
