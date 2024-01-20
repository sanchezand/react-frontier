import React, { ElementType, useEffect, useState } from 'react';
import classNames from 'classnames';
import { PolymorphicProps } from 'Classes';

const defaultType = 'div';
type ButtonProps<E extends ElementType = typeof defaultType> = PolymorphicProps<E> & {
	text?: string,
	onClick?: (setLoading: (loading: boolean)=>void)=>void,
	nativeOnClick?: (ev?: React.MouseEvent)=>void,
	href?: string,
	basic?: boolean,
	color?: 'green' | 'red' | 'purple' | 'black' | 'blue' | 'orange' | 'basic' | 'white',
	loading?: boolean,
	className?: string
	icon?: boolean,
	iconName?: '',
	target?: '_blank' | '_self' | '_parent' | '_top',
	size?: 'small' | 'tiny' | 'big',
	disabled?: boolean,
	fluid?: boolean,
	style?: React.CSSProperties,
	iconStyle?: React.CSSProperties,
	onLoadingChanged?: (v: boolean)=>void,
}
var Button = (props: ButtonProps)=>{
	var { 
		text,
		onClick,
		nativeOnClick,
		href,
		basic,
		color,
		loading,
		className,
		icon,
		iconName,
		target,
		size,
		disabled,
		fluid,
		style,
		iconStyle,
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
	
	const ComponentType = props.as ?? defaultType;
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
		{iconName && <i className={`${iconName} icon`} style={iconStyle}></i>}
		{text}
	</ComponentType>
}

export default Button;