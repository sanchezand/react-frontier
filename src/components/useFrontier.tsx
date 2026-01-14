import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { LocaleProvider } from './useLocale';

var FrontierContext = createContext<{
	
}>(null);
var useFrontier = ()=>useContext(FrontierContext);

interface FrontierProviderProps extends PropsWithChildren{
	locale?: string
}

var FrontierProvider = (props: FrontierProviderProps)=>{
	return <FrontierContext.Provider value={{

	}}>
		<LocaleProvider locale={props.locale}>
			{props.children}
		</LocaleProvider>
	</FrontierContext.Provider>
}

export {
	FrontierProvider,
	useFrontier,
}