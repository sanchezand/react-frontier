import React, { PropsWithChildren, CSSProperties } from 'react';
import classnames from 'classnames';

interface MessageProps extends PropsWithChildren{
	text?: string,
	list?: string[],
	header?: string,
	centered?: boolean,
	type?: 'error' | 'success' | 'warning' | 'info' | 'orange',
	className?: string,
	size?: 'small',
	textStyle?: CSSProperties,
	headerStyle?: CSSProperties,
	listStyle?: CSSProperties,
	listItemStyle?: CSSProperties,
	style?: CSSProperties
}
var Message = (props: MessageProps)=>{
	if(typeof props.list!=='undefined' && (props.list===null || props.list.length==0) && props.type=='error'){
		return null;
	}
	return <div className={classnames('fr message', props.type, props.size, props.className)} style={props.style}>
		{props.header ? (
			<div className="header" style={{
				...(props.centered ? { textAlign: 'center' } : {}),
				marginBottom: (props.text || props.list || props.children) ? 5 : 0,
				...props.headerStyle
			}}>{props.header}</div>
		) : null}
		<div style={{ ...(props.centered ? { textAlign: 'center' } : {}), ...props.textStyle }}>{props.text}</div>
		{props.list ? (
			props.list.length==1 && !props.text ? (
				props.list[0]
			) : props.list.length>0 ? (
				<ul className="list" style={props.listStyle}>
					{props.list.map((a, i)=>(
						<li key={`msg-itm-${i}`} style={props.listItemStyle}>{a}</li>
					))}
				</ul>
			) : null
		) : null}
		{props.children ? (
			<div style={{ ...(props.centered ? { textAlign: 'center' } : {}), ...props.textStyle }} className='contents'>{props.children}</div>
		) : null}
	</div>
}

export default Message;