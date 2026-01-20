import React, { Ref, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';
import style from '../style/input.module.scss';
import { Field, Popover } from '@base-ui/react';
import Calendar, { CalendarProps } from './Calendar';
import moment from 'moment';
import Loader from './Loader';

interface InputProps{
	value?: string,
	readonly?: boolean,
	fluid?: boolean,
	onChange?: (val: any)=>void,
	label?: string,
	placeholder?: string,
	className?: string,
	comment?: string,
	inputType?: React.HTMLInputTypeAttribute,
	iconName?: IconName,
	iconStyle?: React.CSSProperties,
	autoFocus?: boolean,
	style?: React.CSSProperties,
	inputStyle?: React.CSSProperties,
	labelStyle?: React.CSSProperties,
	commentStyle?: React.CSSProperties,
	required?: boolean,
	valueFormat?: (val: string)=>string,
	onFocus?: (ev: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>)=>void,
	onSubmit?: (setLoading: (loading: boolean)=>void, ...params: any)=>void,
	loading?: boolean,
	onLoadingChanged?: (v: boolean)=>void,
	submitOnEnter?: boolean,
	error?: boolean
	type?: 'error' | 'warning' | 'normal',
	calendar?: CalendarProps,
	onKeyUp?: (ev: React.KeyboardEvent<HTMLInputElement|HTMLTextAreaElement>)=>void,
	maxLength?: number,
	textarea?: boolean,
	textareaRows?: number,
	onClick?: ()=>void,
}

var Input = React.forwardRef((props: InputProps, ref: Ref<HTMLInputElement|HTMLTextAreaElement>)=>{
	var { t } = useTranslation();
	var [loading, setLoading] = useState<boolean>(false);
	var [calendarOpen, setCalendarOpen] = useState<boolean>(false);
	var [handle, setHandle] = useState<Popover.Handle<unknown>>(Popover.createHandle());

	useEffect(()=>{
		if(typeof props.loading!=='undefined' && props.loading!=loading){
			setLoading(props.loading);
			if(props.onLoadingChanged) props.onLoadingChanged(props.loading);
		}
	}, [props]);

	var onInputKeyUp = (ev: React.KeyboardEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
		if(props.onKeyUp) props.onKeyUp(ev);
		if(ev.key==='Enter' && props.submitOnEnter){
			onInputSubmit();
		}
	}

	var onInputFocus = (ev: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
		if(props.onFocus) props.onFocus(ev);
	}

	var onInputChange = (ev: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
		if(props.onChange){
			return props.onChange(ev.target.value);
		}
	}

	var onInputSubmit = ()=>{
		if(loading || !props.onSubmit) return;
		return props.onSubmit(setLoading);
	}

	var onInputClick = ()=>{
		if(props.onClick) props.onClick();
		if(props.calendar) setCalendarOpen(true);
	}

	var InputElem = (!props.textarea || !!props.calendar) ? (
		<input
			className={style.input}
			ref={ref as Ref<HTMLInputElement>} 
			type={props.inputType || 'text'} 
			readOnly={props.readonly || !!props.calendar || false} 
			placeholder={props.placeholder || props.label} 
			onChange={onInputChange} 
			onKeyUp={(props.onKeyUp || props.submitOnEnter) ? onInputKeyUp : null}
			value={!!props.calendar ? (
				props.calendar.date ? (
					moment(props.calendar.date).format(props.calendar.format || 'DD/MM/YY'+(props.calendar?.mode && props.calendar.mode=='date' ? '' : ' HH:mm'))
				) : ''
			) : (
				props.value!==null ? (
					props.valueFormat ? props.valueFormat(props.value.toString()) : props.value
				) : ''
			)} 
			onFocus={onInputFocus}
			autoFocus={props.autoFocus}
			style={props.inputStyle}
			maxLength={props.maxLength}
			onClick={onInputClick}
			required={props.required}
		/>
	) : (
		<textarea 
			className={style.input}
			ref={ref as Ref<HTMLTextAreaElement>}
			readOnly={props.readonly}
			placeholder={props.placeholder || props.label}
			onChange={onInputChange}
			onKeyUp={(props.onKeyUp || props.submitOnEnter) ? onInputKeyUp : null}
			onFocus={onInputFocus}
			onClick={onInputClick}
			autoFocus={props.autoFocus}
			style={props.inputStyle}
			maxLength={props.maxLength}
			rows={props.textareaRows || 3}
			required={props.required}
			value={props.value!==null ? (
				props.valueFormat ? props.valueFormat(props.value.toString()) : props.value
			) : ''} 
		/>
	);

	var input_type = useMemo(()=>{
		if(props.error) return 'error';
		else return props.type;
	}, [props.type, props.error]);
	
	return <>
		<Field.Root 
			className={classNames("fr input", style.root, props.className)} 
			data-icon={!!props.iconName || !!loading || undefined} 
			data-loading={!!loading || undefined} 
			data-fluid={props.fluid || undefined} 
			data-type={input_type || undefined}
			style={props.style}
		>
			{!!props.label && (
				<Field.Label className={style.label} style={props.labelStyle}>
					{props.label}
					{!!props.required && (
						<span className={style.required}> *</span>
					)}
				</Field.Label>
			)}
			{!!props.comment && (
				<div className={classNames("comment", style.comment)} style={props.commentStyle}>{props.comment}</div>
			)}
			{loading ? (
				<Loader size={15} inline className={style.loader} />
			) : !!props.iconName && (
				<Icon name={props.iconName} style={props.iconStyle} className={style.icon} data-placeholder={(props.calendar ? !props.calendar.date : !props.value) || undefined} />
			)}
			{props.calendar ? (
				<Popover.Trigger handle={handle} render={<div />}>
					{InputElem}
				</Popover.Trigger>
			) : InputElem}
		</Field.Root>
		{!!props.calendar && (
			<Popover.Root handle={handle}>
				<Popover.Portal>
					<Popover.Positioner className={style.positioner} sideOffset={8} align='start'>
						<Popover.Popup className={style.popup}>
							<Calendar {...props.calendar} onSelected={v=>{
								if(handle) handle.close();
								if(props.calendar.onSelected) props.calendar.onSelected(v)
							}} />
						</Popover.Popup>
					</Popover.Positioner>
				</Popover.Portal>
			</Popover.Root>
		)}
	</>
})

export default Input;