
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
import Header from './components/Header';
import Groupper from './components/Groupper';
import Input from './components/Input';
import Field from './components/Field';
import Image from './components/Image';
import Label from './components/Label';
import Message from './components/Message';
import Pagination from './components/Pagination';
import Placeholder from './components/Placeholder';
import Popup from './components/Popup';
import SegmentControl from './components/SegmentControl';
import Sidebar from './components/Sidebar';
import { FrontierColors as CompFrontierColors } from './components/Classes';

export type IconName = CompIconName;
export type DropdownItemProps = CompDrItPr;
export type DropdownSearchResult = CompDropdownSearchResult;
export type DropdownProps = CompDropdownProps;
export type DropdownValueChange = CompDropdownValueChange;
export type FrontierColors = CompFrontierColors

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
	Field,
	FrontierProvider,
	Groupper,
	Header,
	Icon,
	IconsList,
	Image,
	Input,
	Label,
	Loader,
	Message,
	Pagination,
	Placeholder,
	Popup,
	SegmentControl,
	Sidebar,
}