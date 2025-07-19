import {
  RiShieldUserFill,     // Licensed PI
  RiMedalFill,          // ASIS Certified
  RiFilePaper2Fill,          // Court Qualified
  RiBankCardFill     // Bonded & Insured
} from "react-icons/ri";

const credentials = [
  {
    iconeCard: <RiShieldUserFill size={30} />,
    titleCard: "Licensed by SPF",
    textCard: "State licensed private investigator with full legal authority",
  },
  {
    iconeCard: <RiMedalFill size={30} />,
    titleCard: "ASIS Certified",
    textCard:
      "American Society for Industrial Security professional certification",
  },
  {
    iconeCard: <RiFilePaper2Fill size={30} />,
    titleCard: "Court Qualified",
    textCard: "Qualified to provide expert testimony in legal proceedings",
  },
  {
    iconeCard: <RiBankCardFill size={30} />,
    titleCard: "Bonded & Insured",
    textCard: "Fully bonded and insured for client protection",
  },
];

export default credentials