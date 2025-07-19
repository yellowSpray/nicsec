import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface QuestionProps {
  question: string;
  answer: string;
  className?: string
}

export default function Accordion({ question, answer, className }: QuestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="w-6xl">
      <div
        onClick={toggle}
        className={`w-full rounded-second py-4 px-6 cursor-pointer flex flex-row items-center justify-between gap-2 z-10 ${className}`}
      >
        <strong className="flex flex-row items-center gap-4 text-sm">
          <FaQuestionCircle /> {question}
        </strong>
        <span>
            { isOpen ? (
                <AiOutlineMinus />
            ):(
                <AiOutlinePlus />
            )}
        </span>
      </div>
      {isOpen && (
        <div className={`relative bottom-5 px-7 py-16 rounded-b-second ${className} z-0`}>
          <p className="text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}
