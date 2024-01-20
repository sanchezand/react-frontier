import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

export interface AccordionItemProps{
	_onSelected?: (value: number)=>(()=>void),
	title: string | JSX.Element,
	rightTitle?: string | JSX.Element,
	children?: JSX.Element | string,
	_active?: boolean,
	_disabled?: boolean,
	_iconActive?: string,
	_iconInactive?: string,
	_toggle?: string,
	value?: number,
	bold?: boolean,
	className?: string,
}
var AccordionItem : React.FC<AccordionItemProps> = (props: AccordionItemProps)=>{
	return <div className={classNames('item', { toggle: props._toggle }, props.className, {
		active: props._active,
		disabled: props._disabled,
	})}>
		<div className="header" onClick={props._onSelected(props.value)} style={{ fontWeight: props.bold ? 'bold' : 'normal' }}>
			<div className="left">{props.title}</div>
			{props.rightTitle ? (
				<div className="right">{props.rightTitle}</div>
			) : null}
		</div>
		{props._active && props.children ? (
			<div className="content">
				{props.children}
			</div>
		) : null}
	</div>
}

type AccordionSubComponents = {
	Item: typeof AccordionItem
}

interface AccordionProps{
	children: React.ReactNode | string,
	className?: string,
	selectable?: boolean,
	striped?: boolean,
	divided?: boolean,
	active?: number,
	toggle?: boolean,
	style?: React.CSSProperties,
	greyout?: boolean,
	onSelected?: (value: number)=>void,
}

const Accordion : React.FC<AccordionProps> & AccordionSubComponents = (props)=>{
	var [activeItem, setActiveItem] = useState<number>(null);

	useEffect(()=>{
		if(props.active && activeItem!=props.active){
			setActiveItem(props.active);
			if(props.onSelected) props.onSelected(props.active);
		}
	}, [props.active])

	var onSelected = (value: number)=>{
		return ()=>{
			if(activeItem===value){
				setActiveItem(null);
				if(props.onSelected) props.onSelected(null);
			}else{
				setActiveItem(value);
				if(props.onSelected) props.onSelected(value);
			}
		}
	}

	var childs = (Array.isArray(props.children) ? props.children : [props.children]).map((a,i)=>{
		if(React.isValidElement(a)){
			var value = ((a.props as any)?.value || i);
			return React.cloneElement(a, { 
				value,
				_toggle: props.toggle,
				_onSelected: onSelected, 
				_active: activeItem==value,
				_disabled: props.greyout!==false && activeItem!=value && activeItem!==null,
			} as unknown)
		}
	});

	return (
		<div className={classNames('fr accordion', {
			selectable: props.selectable,
			divided: props.divided,
			striped: props.striped,
			toggle: props.toggle,
		})} style={props.style}>
			{childs}
		</div>
	)
}

Accordion.Item = AccordionItem;

export default Accordion;