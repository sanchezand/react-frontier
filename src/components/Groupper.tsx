import React, { CSSProperties, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import style from '../style/groupper.module.scss'
import classNames from 'classnames';
import Input, { InputProps } from './Input';

interface GroupperDividerProps extends PropsWithChildren{
	type?: 'solid' | 'text' | 'dashed' | 'dotted' | 'line text',
	text?: any,
	top?: boolean,
	style?: React.CSSProperties,
	textStyle?: React.CSSProperties,
	lineStyle?: React.CSSProperties
	size?: 'small' | 'normal',
	centered?: boolean,
	className?: string,
}
const GroupperDivider = (props: GroupperDividerProps)=>{
	var {
		centered,
		children,
		className,
		lineStyle,
		size,
		style: propStyle,
		text,
		textStyle,
		top,
		type,
		...restProps
	} = props;
	var divider_type = props.type || (typeof props.type==='undefined' && (!!props.text || !!props.children) ? 'text' : 'solid');
	return <div className={style.divider} data-top={!!props.top || undefined} style={props.style} data-centered={props.centered || undefined} data-type={divider_type} {...restProps}>
		{(divider_type==='text') ? (
			props.children || props.text
		) : divider_type==='line text' ? <>
			<div className={style.line} style={props.lineStyle}></div>
			<div className={style.text} style={props.textStyle}>{props.text}</div>
			<div className={style.line} style={props.lineStyle}></div>
		</> : null}
	</div>
}

interface GroupperDividerInput extends InputProps{
	removeBorder?: ('top' | 'bottom')[],
	removeMargin?: ('top' | 'bottom')[],
}

const GroupperDividerInput = (props: GroupperDividerInput)=>{
	var {
		removeBorder,
		removeMargin,
		...restProps
	} = props;

	var borders = useMemo(()=>{
		var top = false, bottom = false;
		if(!!props.removeBorder){
			top = props.removeBorder.indexOf('top')!=-1;
			bottom = props.removeBorder.indexOf('bottom')!=-1;
		}
		return { top, bottom }
	}, [props.removeBorder]);

	var margins = useMemo(()=>{
		var top = false, bottom = false;
		if(!!props.removeMargin){
			top = props.removeMargin.indexOf('top')!=-1;
			bottom = props.removeMargin.indexOf('bottom')!=-1;
		}
		return { top, bottom }
	}, [props.removeMargin]);

	return <Input 
		{...restProps} 
		label={null} 
		data-fitted 
		data-no-border-top={borders.top || undefined} 
		data-no-border-bottom={borders.bottom || undefined} 
		data-no-margin-top={margins.top || undefined} 
		data-no-margin-bottom={margins.bottom || undefined} 
	/>
}

interface GroupperProps extends PropsWithChildren{
	title?: any,
	titleRight?: any,
	style?: CSSProperties,
	actions?: any,
	fitted?: boolean,
	className?: string,
	titleSize?: 'small' | 'big' | 'normal',
	titleCentered?: boolean,
	titleStyle?: CSSProperties,
}

type GroupperSubComponents = {
	Divider: typeof GroupperDivider,
	DividerInput: typeof GroupperDividerInput,
}

const Groupper : React.FC<GroupperProps> & GroupperSubComponents = (props: GroupperProps)=>{
	var {
		actions,
		children,
		className,
		fitted,
		style: propsStyle,
		title,
		titleCentered,
		titleRight,
		titleSize,
		titleStyle,
		...restProps
	} = props;
	
	return <div className={classNames('fr2 groupper', style.groupper, props.className)} style={propsStyle} {...restProps}>
		{!!props.title && (
			<div className={style.title} style={props.titleStyle} data-size={props.titleSize || undefined} data-centered={props.titleCentered || undefined}>
				<div className={style.text}>{props.title}</div>
				{props.titleRight}
			</div>
		)}
		<div className={classNames(style.contents, 'contents')} data-fitted={props.fitted || undefined}>
			{props.children}
		</div>
		{!!props.actions && (
			<div className={style.actions}>
				{props.actions}
			</div>
		)}
	</div>
}

Groupper.Divider = GroupperDivider;
Groupper.DividerInput = GroupperDividerInput;

export default Groupper;