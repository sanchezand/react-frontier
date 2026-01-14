
import './style/global.scss';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from "i18next-resources-to-backend";
import Accordion from './components/Accordion';
import Button from "./components/Button";
import Checkbox from './components/Checkbox';
import Calendar from './components/Calendar';
import Dropdown, { DropdownItemProps as CompDrItPr, DropdownSearchResult as CompDropdownSearchResult, DropdownProps as CompDropdownProps, DropdownValueChange as CompDropdownValueChange } from './components/Dropdown';
import Loader from './components/Loader';
import Icon, { IconName as CompIconName, IconsList } from "./components/Icon"
import { FrontierProvider } from './components/useFrontier';

export type IconName = CompIconName;
export type DropdownItemProps = CompDrItPr;
export type DropdownSearchResult = CompDropdownSearchResult;
export type DropdownProps = CompDropdownProps;
export type DropdownValueChange = CompDropdownValueChange;

i18n.use(initReactI18next).use(resourcesToBackend(async (language: string)=>{
	var lang = (await import(`./locale/${language}.json`)).default;
	return lang;
})).init({
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	}
});

export {
	Accordion,
	Button,
	Calendar,
	Checkbox,
	Dropdown,
	FrontierProvider,
	Icon,
	IconsList,
	Loader,
}