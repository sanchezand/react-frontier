import React, { PropsWithChildren } from 'react';
import { InputType } from './Input';
import classNames from 'classnames';
import style from '../style/input.module.scss';

interface FieldProps extends PropsWithChildren{
	className?: string,
	label?: string,
	comment?: string,
	commentStyle?: React.CSSProperties,
	amount?: number,
	type?: InputType,
	style?: React.CSSProperties,
	labelStyle?: React.CSSProperties,
	required?: boolean,
}
var Field = (props: FieldProps)=>{
	var {
		amount,
		children,
		className,
		comment,
		commentStyle,
		type,
		label,
		labelStyle,
		required,
		style: propStyle,
		...restProps
	} = props;

	return <div className={classNames("fr2 fields", style.field, props.className)} data-type={props.type} style={propStyle} {...restProps}>
		{props.label && (
			<label className={style.label} style={props.labelStyle}>
				{props.label}
				{!!props.required && (
					<span className={style.required}> *</span>
				)}
			</label>
		)}
		{!!props.comment && (
			<div className={classNames("comment", style.comment)} style={props.commentStyle}>{props.comment}</div>
		)}
		<div className={style.content} data-amount={props.amount || 1}>
			{props.children}
		</div>
	</div>
}

export default Field;