import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Popup, { PopupElement } from './Popup';
import Calendar, { CalendarProps } from './Calendar';

interface InputProps{
	value?: string | number,
	readonly?: boolean,
	onChange?: (val: any)=>void,
	label?: string,
	placeholder?: string,
	error?: boolean
	className?: string,
	comment?: string,
	inputType?: React.HTMLInputTypeAttribute,
	icon?: string,
	autoFocus?: boolean,
	style?: React.CSSProperties,
	inputStyle?: React.CSSProperties,
	labelStyle?: React.CSSProperties,
	commentStyle?: React.CSSProperties,
	required?: boolean,
	calendar?: CalendarProps,
	valueFormat?: (val: string)=>string,
	onFocus?: (ev: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>)=>void,
	onSubmit?: (setLoading: (loading: boolean)=>void, ...params: any)=>void,
	submitOnEnter?: boolean,
	button?: JSX.Element,
	type?: 'error' | 'warning' | 'normal',
	as?: string,
	onKeyUp?: (ev: React.KeyboardEvent<HTMLInputElement|HTMLTextAreaElement>)=>void,
	maxLength?: number,
	textarea?: boolean,
	textareaRows?: number,
	onClick?: ()=>void,
}

var Input = React.forwardRef((props: InputProps, ref: LegacyRef<HTMLInputElement|HTMLTextAreaElement>)=>{
	var [calendarOpen, setCalendarOpen] = useState<boolean>(false);
	var [loading, setLoading] = useState<boolean>(false);
	var popupRef = useRef<PopupElement>();
	var containerRef = useRef<HTMLDivElement>();

	useEffect(()=>{
		var keyup : any = null;
		if(props.submitOnEnter){
			keyup = (ev: KeyboardEvent)=>{
				if(ev.key==='Enter'){
					onSubmit();
				}
			}
			document.addEventListener('keyup', keyup);
		}
		return ()=>{
			if(keyup){
				document.removeEventListener('keyup', keyup);
			}
		}
	}, [containerRef.current, calendarOpen, props.value]);
	
	var onFocus = (ev: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
		if(props.onFocus) props.onFocus(ev);
		setCalendarOpen(true);
	}

	var onCalendarSelect = (unix: number)=>{
		if(props.onChange) props.onChange(unix);
		setCalendarOpen(false);
	}

	var onChange = (ev: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
		if(props.onChange){
			return props.onChange(ev.target.value);
		}
	}

	var onSubmit = ()=>{
		if(loading || !props.onSubmit) return;
		return props.onSubmit(setLoading);
	}

	var InputElem = !props.textarea ? (
		<input
			ref={ref as LegacyRef<HTMLInputElement>} 
			type={props.inputType || 'text'} 
			readOnly={props.readonly || !!props.calendar || false} 
			placeholder={props.placeholder || props.label} 
			onChange={onChange} 
			onKeyUp={props.onKeyUp}
			value={props.calendar && props.value && !Number.isNaN(parseInt(props.value as string)) ? (
				moment.unix(parseInt(props.value as string)).format(props.calendar?.format || ('DD/MM/YY'+(props.calendar?.mode && props.calendar.mode=='date' ? '' : ' HH:mm')))
			) : (
				props.value!==null ? (
					props.valueFormat ? props.valueFormat(props.value.toString()) : props.value
				) : ''
			)} 
			onFocus={onFocus}
			autoFocus={props.autoFocus}
			style={props.inputStyle}
			maxLength={props.maxLength}
			onClick={props.onClick}
		/>
	) : (
		<textarea 
			ref={ref as LegacyRef<HTMLTextAreaElement>}
			readOnly={props.readonly}
			placeholder={props.placeholder || props.label}
			onChange={onChange}
			onKeyUp={props.onKeyUp}
			onFocus={onFocus}
			autoFocus={props.autoFocus}
			style={props.inputStyle}
			maxLength={props.maxLength}
			rows={props.textareaRows || 3}
			value={props.value!==null ? (
				props.valueFormat ? props.valueFormat(props.value.toString()) : props.value
			) : ''} 
		/>
	)
	return <div className={props.as || "fr field"} style={props.style}>
		{props.label && (
			<label style={props.labelStyle}>
				{props.label}
				{props.required && <span style={{ marginLeft: 3, color: 'brown' }}>*</span>}
			</label>
		)}
		<div ref={containerRef} className={classNames('fr input', props.type, props.className, {
			action: !!props.button,
			error: !!props.error,
			icon: props.icon,
			loading,
		})}>
			{props.comment && <div className="comment" style={props.commentStyle}>{props.comment}</div>}
			{props.icon && <i className={classNames(props.icon, 'icon')}></i>}
			{props.calendar ? (
				<Popup trigger={InputElem} basic popupWidth={320} ref={popupRef}>
					<Calendar date={parseInt(props.value as string)} {...props.calendar} onSelected={d=>{
						if(props.calendar?.onSelected) props.calendar?.onSelected(d);
						if(props.onChange) props.onChange(d);
						if(popupRef.current){
							popupRef.current.close();
						}
					}} />
				</Popup>
			) : (
				InputElem
			)}
			{props.button}
		</div>
	</div>
});

export default Input;