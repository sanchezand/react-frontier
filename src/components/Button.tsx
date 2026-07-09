import React, { CSSProperties, ElementType, useEffect, useMemo, useState } from 'react';
import { Button as BaseButton } from '@base-ui/react';
import { FrontierColors } from './Classes';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';
import styles from '../style/button.module.scss';
import Loader from './Loader';
import Menu, { MenuItemProps } from './Menu';

type ButtonProps<E extends ElementType> = {
	as?: E,
	text?: string,
	onClick?: (setLoading: (loading: boolean)=>void)=>void,
	nativeOnClick?: (ev?: React.MouseEvent)=>void,
	basic?: boolean,
	color?: FrontierColors,
	loading?: boolean,
	className?: string
	icon?: boolean,
	checkmark?: boolean,
	iconName?: IconName,
	iconSolid?: boolean,
	iconStyle?: React.CSSProperties,
	iconRight?: IconName,
	iconRightSolid?: boolean,
	iconRightStyle?: React.CSSProperties,
	size?: 'small' | 'tiny' | 'big',
	disabled?: boolean,
	fluid?: boolean,
	style?: React.CSSProperties,
	onLoadingChanged?: (v: boolean)=>void,
	menu?: MenuItemProps[]
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
		iconSolid,
		icon,
		iconRightSolid,
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
		checkmark,
		menu,
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
	const ButtonComponent = <ComponentType 
		className={classNames("fr2 button", styles.button, props.className)}
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
		{loading ? (
			<Loader size={loaderSize} inline />
		) : checkmark ? (
			<Icon name='check' fitted />
		) : <>
			{!!iconName && <Icon name={props.iconName} solid={props.iconSolid} style={props.iconStyle} />}
			{text}
			{!!iconRight && <Icon name={props.iconRight} solid={props.iconRightSolid} style={props.iconRightStyle} className={styles.iconRight} />}
		</>}
	</ComponentType>

	if(props.menu && props.menu.length>0){
		return <Menu trigger={ButtonComponent} items={props.menu} />
	}

	return ButtonComponent;
}

export default Button;