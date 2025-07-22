import { useTranslation } from "react-i18next"

export default function SwitchLng () {

    const { i18n } = useTranslation()

    const changeLanguage = (lng: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = lng.target.value;
        i18n.changeLanguage(selectedLang);
        console.log('switch language :', selectedLang)
    };

    return (
        <select name="language" id="language" onChange={changeLanguage} value={i18n.language}>
            <option value="en">En</option>
            <option value="fr">Fr</option>
            <option value="nl">Nl</option>
        </select>
    )
}