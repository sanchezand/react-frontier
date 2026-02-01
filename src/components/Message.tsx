import React, { PropsWithChildren, CSSProperties } from 'react';
import style from '../style/message.module.scss'
import classNames from 'classnames';

type MessageType = 'default' | 'error' | 'success' | 'warning' | 'info' | 'orange';
interface MessageProps extends PropsWithChildren{
	text?: string,
	list?: string[],
	header?: string,
	centered?: boolean,
	type?: MessageType,
	className?: string,
	size?: 'normal' | 'small',
	textStyle?: CSSProperties,
	headerStyle?: CSSProperties,
	listStyle?: CSSProperties,
	listItemStyle?: CSSProperties,
	style?: CSSProperties
}
var Message = (props: MessageProps)=>{
	var {
		centered,
		children,
		className,
		header,
		headerStyle,
		list,
		listItemStyle,
		listStyle,
		size,
		style: propsStyle,
		text,
		textStyle,
		type,
		...restProps
	} = props;

	if(typeof props.list!=='undefined' && (props.list===null || props.list.length==0) && props.type=='error'){
		return null;
	}

	return <div 
		className={classNames('fr message', style.message, props.className)}
		style={props.style}
		data-color={props.type || 'default'}
		data-centered={!!props.centered || undefined}
		data-size={props.size}
		{...restProps}
	>
		{props.header ? (
			<div className={style.header} style={headerStyle} data-margin={!!(props.text || props.list || props.children) || undefined}>{props.header}</div>
		) : null}
		<div className={style.text} style={props.textStyle}>
			{props.text}
		</div>
		{props.list ? (
			props.list.length==1 && !props.text ? (
				props.list[0]
			) : props.list.length>0 ? (
				<ul className={style.list} style={props.listStyle}>
					{props.list.map((a, i)=>(
						<li key={`msg-itm-${i}`} style={props.listItemStyle}>{a}</li>
					))}
				</ul>
			) : null
		) : null}
		{props.children ? (
			<div className={style.text} style={props.textStyle}>{props.children}</div>
		) : null}
	</div>
}

export default Message;