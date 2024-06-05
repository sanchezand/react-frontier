import React, { PropsWithChildren, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';

interface GroupperDividerProps extends PropsWithChildren{
	type?: 'solid' | 'text' | 'dashed' | 'dotted',
	text?: any,
	top?: boolean,
	style?: React.CSSProperties,
	size?: 'small' | 'normal',
	centered?: boolean,
	className?: string,
}
const GroupperDivider = (props: GroupperDividerProps)=>{
	if(props.text || props.type==='text' || props.children){
		return <div className={classNames('section head', props.size, {
			top: props.top,
			centered: props.centered,
		}, props.className)} style={props.style}>
			{props.children || props.text}
		</div>
	}
	return <div className={classNames("divider", {
		solid: !props.type || props.type==='solid',
		dashed: props.type==='dashed',
		dotted: props.type==='dotted',
	}, props.className)} style={props.style}></div>
}

interface InputDividerProps extends InputProps{
	top?: boolean,
	dividerStyle?: React.CSSProperties,
	dividerClassName?: string,
}

const GroupperInputDivider = (props: InputDividerProps)=>{
	var { dividerClassName, top, dividerStyle, ...restProps } = props;
	return <div className={classNames('section head', { top }, props.dividerClassName)} style={{
		padding: 0,
		...dividerStyle,
	}}>
		<Input {...restProps} style={{ margin: 0, width: '100%', ...props.style }} inputStyle={{ height: 45, borderRadius: 0, border: 0, backgroundColor: 'transparent', ...props.inputStyle }} />
	</div>
}

type GroupperSubComponents = {
	Divider: typeof GroupperDivider,
	DividerInput: typeof GroupperInputDivider,
}

interface GroupperProps extends PropsWithChildren{
	title?: any,
	titleRight?: any,
	style?: CSSProperties,
	width?: number,
	actions?: any,
	fitted?: boolean,
	className?: string,
	titleSize?: 'small' | 'big' | 'normal',
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
Groupper.DividerInput = GroupperInputDivider;

export default Groupper;