import React, { PropsWithChildren, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';

interface GroupperDividerProps{
	type?: 'solid' | 'text' | 'dashed' | 'dotted',
	text?: string,
	top?: boolean,
	style?: React.CSSProperties,
	size?: 'small' | 'normal',
	centered?: boolean,
	className?: string,
}
const GroupperDivider = (props: GroupperDividerProps)=>{
	if(props.text || props.type==='text'){
		return <div className={classNames('section head', props.size, {
			top: props.top,
			centered: props.centered,
		}, props.className)} style={props.style}>{props.text}</div>
	}
	return <div className={classNames("divider", {
		solid: !props.type || props.type==='solid',
		dashed: props.type==='dashed',
		dotted: props.type==='dotted',
	}, props.className)} style={props.style}></div>
}

type GroupperSubComponents = {
	Divider: typeof GroupperDivider,
}

interface GroupperProps extends PropsWithChildren{
	title?: string,
	titleRight?: string,
	style?: CSSProperties,
	width?: number,
	actions?: ReactNode,
	fitted?: boolean,
	className?: string,
	titleSize?: 'big' | 'normal',
	titleCentered?: boolean,
	titleStyle?: CSSProperties,
	defaultStyle?: boolean,
}

const Groupper : React.FC<GroupperProps> & GroupperSubComponents = (props: GroupperProps)=>{
	return <div className={classNames('fr groupper', props.className, {
		fitted: props.fitted,
	})} style={{
		...props.defaultStyle!==false ? {
			margin: 'auto',
			maxWidth: props.width || 1000,
			width: '100%',
		} : null,
		...props.style
	}}>
		{props.title && <div style={props.titleStyle} className={classNames('head', props.titleSize, {
			centered: props.titleCentered,
		})}>
			<div className="left">
				{props.title}
			</div>
			{props.titleRight ? (
				<div className="right" style={{ fontSize: 14 }}>{props.titleRight}</div>
			) : null}
		</div>}
		{props.children}
		{props.actions ? (
			<div className="actions">
				{props.actions}
			</div>
		) : null}
	</div>
}

Groupper.Divider = GroupperDivider;

export default Groupper;