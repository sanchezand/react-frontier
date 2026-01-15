import React, { PropsWithChildren, ReactNode, useEffect, useMemo, useState } from 'react';
import Icon, { IconName } from './Icon';
import style from '../style/header.module.scss'
import classNames from 'classnames';
import Loader from './Loader';

interface HeaderProps extends PropsWithChildren{
	loading?: boolean,
	iconName?: IconName,
	text?: any,
	subtext?: any
	size?: 'small' | 'normal' | 'big' | 'huge'
	style?: React.CSSProperties,
	loaderStyle?: React.CSSProperties,
	iconStyle?: React.CSSProperties,
	textStyle?: React.CSSProperties,
	subtextStyle?: React.CSSProperties,
	actionsStyle?: React.CSSProperties,
	loaderSize?: number,
	className?: string,
	actions?: ReactNode,
	centered?: boolean,
}

var Header = (props: HeaderProps)=>{
	useEffect(()=>{
		
	}, []);

	var loader_size = useMemo(()=>{
		if(props.loaderSize) return props.loaderSize;
		switch(props.size){
			case 'small': return 30;
			case 'normal': return 40;
			case 'big': return 50;
			case 'huge': return 60;
			default: return 40;
		}
	}, [props.loaderSize, props.size]);
	
	return <div
		className={classNames(style.header, props.className)}
		data-loading={props.loading || undefined}
		data-size={props.size || 'normal'}
		data-centered={props.centered!==false || undefined}
		style={props.style}
	>
		{!!props.loading ? (
			<Loader size={loader_size} inline style={props.loaderStyle} />
		) : !!props.iconName ? (
			<Icon name={props.iconName} style={props.iconStyle} className={style.icon} />
		) : null}
		<div className={style.text} style={props.textStyle}>{props.text}</div>
		<div className={style.subtext} style={props.subtextStyle}>{props.subtext}</div>
		{!!props.actions && (
			<div className={style.actions} style={props.actionsStyle}>
				{props.actions}
			</div>
		)}
	</div>
}

export default Header;