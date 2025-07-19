import {
  RiSpyFill,
  RiUserSearchFill,
  RiFileSearchFill,
  RiShieldUserFill,
  RiMapPinUserFill,
  RiLockFill,
  RiAccountPinBoxFill,
  RiTeamFill,
} from "react-icons/ri";

const infoService = [
  {
    icone: <RiSpyFill size={30} />,
    title: "Surveillance Services",
    text: "Discrete, effective surveillance using proven methods and modern equipment.",
    listService: [
      "Infidelity investigations",
      "Insurance fraud detection",
      "Employee misconduct monitoring",
      "Child custody documentation",
    ],
  },
  {
    icone: <RiUserSearchFill size={30} />,
    title: "Background Checks",
    text: "Detailed background checks for personal, business, or legal matters.",
    listService: [
      "Employment screening",
      "Criminal record checks",
      "Identity verification",
      "Tenant background checks",
    ],
  },
  {
    icone: <RiFileSearchFill size={30} />,
    title: "Fraud Investigations",
    text: "Investigating fraud with accuracy, discretion, and legal insight.",
    listService: [
      "Insurance claim fraud",
      "Corporate fraud analysis",
      "Document verification",
      "Internal employee fraud",
    ],
  },
  {
    icone: <RiShieldUserFill size={30} />,
    title: "Legal Support Services",
    text: "Trusted investigation support for attorneys, clients, and legal cases.",
    listService: [
      "Witness location",
      "Evidence gathering",
      "Litigation support",
      "Court case documentation",
    ],
  },
  {
    icone: <RiMapPinUserFill size={30} />,
    title: "Missing Persons",
    text: "Finding missing individuals with care, discretion, and experience.",
    listService: [
      "Runaway teens",
      "Lost relatives",
      "Debtor location",
      "Adoption reunions",
    ],
  },
  {
    icone: <RiLockFill size={30} />,
    title: "Digital Investigations",
    text: "Uncover digital evidence and trace online behavior with precision.",
    listService: [
      "Social media tracking",
      "Email tracing",
      "Online fraud detection",
      "Cyber harassment cases",
    ],
  },
  {
    icone: <RiAccountPinBoxFill size={30} />,
    title: "Identity Verification",
    text: "Confirm identities discreetly using trusted tools and proven methods.",
    listService: [
      "Online dating verification",
      "Pre-marital investigations",
      "Business partner screening",
      "Alias detection",
    ],
  },
  {
    icone: <RiTeamFill size={30} />,
    title: "Corporate Investigations",
    text: "Protect your business with internal investigations and risk control.",
    listService: [
      "Internal theft",
      "Employee background checks",
      "Policy violations",
      "Asset misuse tracking",
    ],
  },
];

export default infoService;
