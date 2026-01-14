import React, { createContext, PropsWithChildren, useContext } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

var LocaleContext = createContext<{
	locale: string,
	t: typeof t
}>(null);
var useLocale = ()=>useContext(LocaleContext);

interface LocaleProviderProps extends PropsWithChildren{
	locale: string,
}
var LocaleProvider = (props: LocaleProviderProps)=>{
	var { t } = useTranslation(null, {
		lng: props.locale
	});

	var tr = (...params: any)=>{
		return t(...params);
	}

	return <LocaleContext.Provider value={{
		locale: props.locale,
		t: tr as any
	}}>
		{props.children}
	</LocaleContext.Provider>
}

export {
	LocaleProvider,
	useLocale,
};