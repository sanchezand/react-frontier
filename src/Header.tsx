import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

interface ComponentProps{
	loading?: boolean,
	iconName?: string,
	text?: string,
	subtext?: string
	size?: string
	style?: React.CSSProperties,
	iconStyle?: React.CSSProperties,
	subheaderStyle?: React.CSSProperties,
	loadingStyle?: React.CSSProperties,
	loaderSize?: string,
	containerStyle?: React.CSSProperties,
	contentStyle?: React.CSSProperties,
	horizontal?: boolean,
	className?: string,
	actions?: JSX.Element,
	centered?: boolean,
	minHeight?: number,
}

var Header = (props: ComponentProps)=>{
	var style : React.CSSProperties = { 
		...(props.loading ? { paddingTop: 20 } : {}), 
		...(props.horizontal ? { display: 'flex', alignItems: 'center' } : {}), 
		...(props.minHeight ? { minHeight: props.minHeight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } : {}), 
		...(props.containerStyle || {})
	}

	return <div 
		className={classNames('fr header', { 
			centered: props.centered!==false,
			loading: props.loading
		}, props.size, props.className)} 
		style={{ 
			...(props.horizontal ? { marginBottom: 8, marginLeft: 10 } : {}),
			...style,
			...props.style
		}}
	>
		{props.loading ? (
			<div className={classNames('ui active loader inline', props.loaderSize || props.size || 'big')} style={{ margin: 'auto', display: 'block', marginBottom: 10, ...props.loadingStyle }}></div>
		) : null}
		{props.iconName ? (
			<i className={classNames('icon', props.iconName)} style={{ marginRight: 0, textAlign: 'center', margin: 0, marginBottom: 5, ...props.iconStyle }}></i>
		) : null}
		<div className="content" style={props.contentStyle}>
			{props.text}
			{props.subtext ? (
				<div className="sub header" style={props.subheaderStyle}>
					{props.subtext}
				</div>
			) : null}
		</div>
		{props.actions ? (
			<div className='actions'>
				{props.actions}
			</div>
		) : null}
	</div>
}

export default Header;