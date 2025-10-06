import { useState } from "react";
import { useTranslation } from "react-i18next";

interface switchProps {
  className?: string
}

export default function SwitchLng({ className }: switchProps) {

  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "En" },
    { code: "fr", label: "Fr" },
    { code: "nl", label: "Nl" },
  ];

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center w-full rounded-md border border-main bg-white px-4 py-2 text-sm font-medium text-main hover:bg-gray-50 focus:outline-none"
      >
        {languages.find((l) => l.code === i18n.language)?.label || "Language"}
        <svg
          className="ml-2 -mr-1 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l3 3 3-3" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleChange(lang.code)}
                className={`${
                  i18n.language === lang.code ? "bg-gray-100 font-semibold" : ""
                } block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
