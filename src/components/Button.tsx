import React, { CSSProperties, ElementType, useEffect, useMemo, useState } from 'react';
import { Button as BaseButton } from '@base-ui/react';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';
import styles from '../style/button.module.scss';
import Loader from './Loader';

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
	checkmark?: boolean,
	iconName?: IconName,
	iconStyle?: React.CSSProperties,
	iconRight?: IconName,
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
		loading: propsLoading,
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
			if(props.onLoadingChanged) props.onLoadingChanged(loading);
		});
	}

	var loaderSize = useMemo(()=>{
		switch(props.size){
			case 'big': return 30;
			case 'small': return 20;
			case 'tiny': return 15;
			default: return 20;
		}
	}, [props.size]);
	
	const ComponentType = props.as ?? 'div';
	return <ComponentType 
		className={classNames(styles.button, props.className)}
		data-size={props.size || undefined}
		data-disabled={props.disabled || undefined}
		data-loading={loading || undefined}
		data-checkmark={props.checkmark || undefined}
		data-fluid={props.fluid || undefined}
		data-icon={props.icon || undefined}
		data-basic={props.basic || undefined}
		color={color}
		onClick={onButtonClick} 
		style={props.style}
		{...restProps}
	>
		{props.loading ? (
			<Loader size={loaderSize} />
		) : <>
			{!!iconName && <Icon name={props.iconName!} style={props.iconStyle} />}
			{text}
			{!!iconRight && <Icon name={props.iconRight!} style={props.iconRightStyle} />}
		</>}
	</ComponentType>
}

export default Button;