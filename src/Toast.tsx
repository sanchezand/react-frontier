import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createPortal } from 'react-dom';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';

const TOAST_SHOW_EVENT = 'react-frontier-toast_show!';

interface ToastProps extends PropsWithChildren{
	defaultOptions?: ToastShowOptions,
}

interface ToastShowOptions{
	id?: number,
	text?: string,
	header?: string,
	duration?: number,
	infinite?: boolean,
	dismissable?: boolean,
	type?: ToastType,
	icon?: IconName,
	loading?: boolean,
}

interface ToastState{
	id: number,
	timer: any,
	options: ToastShowOptions,
}

enum ToastEvent{
	SHOW = 1,
	CLEAR = 2,
	DISMISS = 3,
}

export enum ToastType{
	SUCCESS = 'green',
	ERROR = 'red',
	INFO = 'blue'
}

interface ToastDetail{
	event: ToastEvent,
	data: ToastShowOptions
}

var generateToastId = ()=>Math.floor(Math.random() * (999999999));

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
		if(e.detail.event===ToastEvent.CLEAR){
			for(var i of toastsRef.current){
				if(i.timer) clearTimeout(i.timer);
			}
			setToasts([]);
		}else if(e.detail.event===ToastEvent.SHOW){
			var new_toasts = [...toastsRef.current];
			if(!e.detail.data.id) return;
			var id = e.detail.data.id;

			var options : ToastShowOptions = {
				...props.defaultOptions,
				...e.detail.data,
			}

			var timer = null;
			if(!e.detail.data.loading || e.detail.data.infinite===false){
				timer = setTimeout(()=>{
					setToasts(toastsRef.current.filter(a=>a.id!==id));
				}, (options.duration || 3000));
			}

			new_toasts.push({ id, timer, options });
			setToasts(new_toasts);
		}else if(e.detail.event===ToastEvent.DISMISS){
			if(e.detail.data.id){
				dismiss(e.detail.data.id)()
			}
		}
	}

	var dismiss = (id: number)=>{
		return ()=>{
			var ts = [...toastsRef.current];
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
							<div className={classNames('fr toast', a.options.type || 'black')} onClick={!a.options.loading || a.options.dismissable===true ? dismiss(a.id) : null}>
								{a.options.loading ? (
									<div className="fr inline loading" style={{ width: 120, marginLeft: -10 }}></div>
								) : a.options.icon ? (
									<div className="icon">
										<Icon name={a.options.icon} />
									</div>
								) : null}
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
	var id = generateToastId();
	window.dispatchEvent(new CustomEvent(TOAST_SHOW_EVENT, { detail: {
		event: ToastEvent.SHOW,
		data: {
			text,
			...options,
			id,
		}
	}}));
	return id;
}

var success = (text: string, options?: ToastShowOptions)=>{
	return show(text, {
		type: ToastType.SUCCESS,
		icon: 'check-circle',
		...options,
	});
}

var error = (text: string, options?: ToastShowOptions)=>{
	return show(text, {
		icon: 'times-circle',
		type: ToastType.ERROR,
		...options,
	});
}

var clear = ()=>{
	window.dispatchEvent(new CustomEvent(TOAST_SHOW_EVENT, { detail: {
		event: ToastEvent.CLEAR
	}}));
}

var dismiss = (toast_id: number)=>{
	window.dispatchEvent(new CustomEvent(TOAST_SHOW_EVENT, { detail: {
		event: ToastEvent.DISMISS,
		data: {
			id: toast_id
		}
	}}));
}

export default {
	show,
	success,
	error,
	dismiss,
	clear,
	Provider: ToastProvider,
}