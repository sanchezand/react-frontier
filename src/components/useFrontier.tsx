import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { LocaleProvider } from './useLocale';
import { Toast as BaseToast } from '@base-ui/react';
import { ToastShowOptions, ToastType } from './Classes';
import Toast from './Toast';
import ToastStyle from '../style/toast.module.scss';

var FrontierContext = createContext<{
	Toast: {
		show: (text: string, options?: ToastShowOptions)=>string,
		success: (text: string, options?: ToastShowOptions)=>string,
		error: (text: string, options?: ToastShowOptions)=>string,
		info: (text: string, options?: ToastShowOptions)=>string,
		dismiss: (id: string)=>void,
	}
}>(null);
var useFrontier = ()=>useContext(FrontierContext);

interface FrontierProviderProps extends PropsWithChildren{
	locale?: string
}

var FrontierProvider = (props: FrontierProviderProps)=>{
	var tm = useMemo(()=>BaseToast.createToastManager(), []);

	var showToast = (text: string, options?: ToastShowOptions)=>{
		return tm.add({
			id: options?.id,
			type: options?.type,
			data: {
				text,
				...options,
			},
			timeout: (options.loading || options.dismissable===false) ? 0 : (options?.duration || 5000)
		});
	}
	var dismissToast = (id: string)=>{
		return tm.close(id);
	}

	return <FrontierContext.Provider value={{
		Toast: {
			show: showToast,
			success: (t, o)=>showToast(t, { type: ToastType.SUCCESS, ...o }),
			error: (t, o)=>showToast(t, { type: ToastType.ERROR, ...o }),
			info: (t, o)=>showToast(t, { type: ToastType.INFO, ...o }),
			dismiss: dismissToast,
		}
	}}>
		<BaseToast.Provider toastManager={tm}>
			<LocaleProvider locale={props.locale}>
				{props.children}
				<BaseToast.Portal>
					<BaseToast.Viewport className={ToastStyle.viewport}>
						<Toast />
					</BaseToast.Viewport>
				</BaseToast.Portal>
			</LocaleProvider>
		</BaseToast.Provider>
	</FrontierContext.Provider>
}

export {
	FrontierProvider,
	useFrontier,
}