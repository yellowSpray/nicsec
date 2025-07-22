import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Process() {
  const { t } = useTranslation();
  const [openStep, setOpenStep] = useState<string | null>(null);

  const steps = ["initial", "strategy", "evidence", "reporting"];

  const toggleStep = (key: string) => {
    setOpenStep((prev) => (prev === key ? null : key));
  };

  return (
    <div className="flex flex-row items-center relative">
      <span className="bg-background w-3 h-full rounded-full absolute top-0 left-3.5 z-0"></span>

      <div className="w-full flex flex-col items-center justify-between z-10 gap-8">
        {steps.map((stepkey, index) => {
          const title = t(`services.process.${stepkey}.title`);
          const text = t(`services.process.${stepkey}.text`);
          const isOpen = openStep === stepkey;

          return (
            <div key={stepkey} className="w-full flex flex-row items-start">
              <p className="text-xs">
                <span className="flex flex-col items-center justify-center rounded-full bg-background w-10 h-10 mr-8">
                  {index + 1}
                </span>
              </p>
              <div
                onClick={() => toggleStep(stepkey)}
                className={`w-3/4 p-0 rounded-second cursor-pointer ${
                  isOpen ? "p-5 border border-second" : ""
                }`}
              >
                <h3 className="py-2 text-sm">{title}</h3>
                {isOpen && <p className="text-sm">{text}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
