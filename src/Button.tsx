import React, { ElementType, useEffect, useState } from 'react';
import classNames from 'classnames';

type ButtonProps<E extends ElementType> = {
	as?: E,
	text?: string,
	onClick?: (setLoading: (loading: boolean)=>void)=>void,
	nativeOnClick?: (ev?: React.MouseEvent)=>void,
	basic?: boolean,
	color?: 'green' | 'red' | 'purple' | 'black' | 'blue' | 'orange' | 'basic' | 'white' | 'yellow',
	loading?: boolean,
	className?: string
	icon?: boolean,
	iconName?: string,
	iconStyle?: React.CSSProperties,
	iconRight?: string,
	iconRightStyle?: React.CSSProperties,
	size?: 'small' | 'tiny' | 'big',
	disabled?: boolean,
	fluid?: boolean,
	style?: React.CSSProperties,
	onLoadingChanged?: (v: boolean)=>void,
} & React.ComponentPropsWithoutRef<E>;

var Button = <E extends ElementType>(props: ButtonProps<E>)=>{
	var { 
		text,
		onClick,
		nativeOnClick,
		basic,
		color,
		loading,
		className,
		icon,
		iconName,
		size,
		disabled,
		fluid,
		style,
		iconStyle,
		iconRight,
		iconRightStyle,
		onLoadingChanged,
		as,
		...restProps
	} = props;
	var [loading, setLoading] = useState(false);

	useEffect(()=>{
		if(typeof props.loading!=='undefined' && props.loading!=loading){
			setLoading(props.loading);
			if(props.onLoadingChanged) props.onLoadingChanged(props.loading);
		}
	}, [props]);

	var onButtonClick = (ev: React.MouseEvent)=>{
		if(props.nativeOnClick) props.nativeOnClick(ev);
		if(props.onClick) props.onClick(loading=>{
			setLoading(loading);
			if(props.onLoadingChanged) onLoadingChanged(loading);
		});
	}
	
	const ComponentType = props.as ?? 'div';
	return <ComponentType 
		className={classNames('fr button', {
			icon,
			loading,
			basic,
			disabled,
			fluid,
		}, size, color, className)} 
		style={style} 
		onClick={onButtonClick} 
		{...restProps}
	>
		{!!iconName && <i className={`${iconName} icon`} style={iconStyle}></i>}
		{text}
		{!!iconRight && <i className={`${iconRight} icon`} style={iconRightStyle}></i>}
	</ComponentType>
}

export default Button;