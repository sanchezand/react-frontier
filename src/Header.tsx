import React, { PropsWithChildren, useEffect, useState } from 'react';
import classNames from 'classnames';

interface ComponentProps extends PropsWithChildren{
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
	button?: JSX.Element,
	centered?: boolean,
	minHeight?: number,
}
var Header = (props: ComponentProps)=>{
	return <div style={{ ...(props.loading ? { paddingTop: 20 } : {}), ...(props.horizontal ? { display: 'flex', alignItems: 'center' } : {}), ...(props.minHeight ? { minHeight: props.minHeight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } : {}), ...(props.containerStyle || {})}}>
		{props.loading ? (
			<div className={classNames('ui active loader inline', props.loaderSize || props.size || 'big')} style={{ margin: 'auto', display: 'block', marginBottom: 10, ...props.loadingStyle }}></div>
		) : null}
		<div className={classNames('fr header', props.size, { centered: props.centered!==false }, props.className, {
			size: props.size
		})} style={{ ...(props.loading ? { fontWeight: 'bold', fontSize: 18, color: '#888' } : {}), ...(props.horizontal ? { marginBottom: 8, marginLeft: 10 } : {}), ...props.style,}}>
			{props.iconName ? (
				<i className={classNames('icon', props.iconName)} style={{ marginRight: 0, textAlign: 'center', margin: 0, marginBottom: 5, ...props.iconStyle }}></i>
			) : null}
			<div className="content" style={props.contentStyle}>
				{props.children || <>
					{props.text}
					{props.subtext ? (
						<div className="sub header" style={props.subheaderStyle}>
							{props.subtext}
						</div>
					) : null}
				</>}
			</div>
		</div>
		{props.button ? (
			<div style={{ textAlign: 'center' }}>
				{props.button}
			</div>
		) : null}
	</div>
}

export default Header;