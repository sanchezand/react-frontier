import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import '../style/toast.scss';

const TOAST_SHOW_EVENT = 'react-frontier-toast_show!';

interface ToastProps extends PropsWithChildren{
	defaultOptions?: ToastShowOptions,
}

interface ToastShowOptions{
	text?: string,
	header?: string,
	duration?: number,
	type?: 'success' | 'info' | 'error',
	icon?: string,
}

interface ToastState{
	id: number,
	timer: any,
	options: ToastShowOptions,
}

enum ToastEvent{
	SHOW = 1,
	CLEAR = 2,
}

export enum ToastType{
	SUCCESS = 'success',
	ERROR = 'error',
	INFO = 'info'
}

interface ToastDetail{
	event: ToastEvent,
	data: ToastShowOptions
}

var ToastProvider = (props: ToastProps)=>{
	var [toasts, setToasts] = useState<ToastState[]>([]);
	var toastsRef = useRef<ToastState[]>();
	toastsRef.current = toasts;

	useEffect(()=>{
		window.addEventListener(TOAST_SHOW_EVENT, (onToastEvent as any), false);
		return ()=>{
			window.removeEventListener(TOAST_SHOW_EVENT, (onToastEvent as any), false);
		}
	}, [toasts]);

	var onToastEvent = (e: { detail: ToastDetail })=>{
		var new_toasts = [...toasts];

		if(e.detail.event===ToastEvent.CLEAR){
			for(var i of new_toasts){
				if(i.timer) clearTimeout(i.timer);
			}
			new_toasts = [];
		}else if(e.detail.event===ToastEvent.SHOW){
			var options : ToastShowOptions = {
				...props.defaultOptions,
				...e.detail.data,
			}

			var id = Math.floor(Math.random() * (999999999));
			var timer = setTimeout(()=>{
				setToasts(toastsRef.current.filter(a=>a.id!==id));
			}, (options.duration || 3000));
			new_toasts.push({ id, timer, options });
		}
		setToasts(new_toasts);
	}

	var deleteToast = (id: number)=>{
		return ()=>{
			var ts = [...toasts];
			var ix = ts.findIndex(a=>a.id===id);
			if(ix===-1) return;
			clearTimeout(ts[ix].timer);
			ts.splice(ix, 1);
			setToasts(ts);
		}
	}

	return <>
		{props.children}
		{createPortal(
			<div className="fr toasts">
				<TransitionGroup className={'bottom right'}>
					{toasts.map(a=>(
						<CSSTransition addEndListener={null} timeout={{
							appear: 0,
							enter: 0,
							exit: 500
						}} enter key={`toast-${a.id}`}>
							<div className={classNames('fr toast', a.options.type)} onClick={deleteToast(a.id)}>
								{!!a.options.icon && (
									<div className="icon">
										<i className={classNames('icon', a.options.icon)}></i>
									</div>
								)}
								<div className="text">{a.options.text}</div>
							</div>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
		, document.body)}
	</>
}

var show = (text: string, options?: ToastShowOptions)=>{
	window.dispatchEvent(new CustomEvent(TOAST_SHOW_EVENT, { detail: {
		event: ToastEvent.SHOW,
		data: {
			text,
			...options
		}
	}}));
}

var success = (text: string, options?: ToastShowOptions)=>{
	return show(text, {
		type: ToastType.SUCCESS,
		icon: 'check circle',
		...options,
	});
}

var error = (text: string, options?: ToastShowOptions)=>{
	return show(text, {
		icon: 'times circle',
		type: ToastType.ERROR,
		...options,
	});
}

var clear = ()=>{
	window.dispatchEvent(new CustomEvent(TOAST_SHOW_EVENT, { detail: {
		event: ToastEvent.CLEAR
	}}));
}

export default {
	show,
	success,
	error,
	clear,
	Provider: ToastProvider,
}