import React, { ElementType, PropsWithChildren } from 'react';
import { Dropdown } from 'semantic-ui-react'
import classNames from 'classnames';

const defaultItemElement = 'div';

type ToolbarItemProps<E extends ElementType> = {
	as?: E,
	text?: string,
	onClick?: ()=>void,
	icon?: string,
	className?: string,
	if?: boolean,
	style?: React.CSSProperties,
	items?: React.ComponentPropsWithoutRef<E> & {
		as?: E
		text: string,
		className?: string,
		if?: boolean,
		icon?: string,
		onClick?: ()=>void,
		style?: React.CSSProperties,
	}[]
} & React.ComponentPropsWithoutRef<E>;

function ToolbarItem<E extends ElementType = typeof defaultItemElement>(props: ToolbarItemProps<E>){
	var { text, onClick, icon, className, if: propIf, as, items, children, style, ...restProps } = props;

	if(typeof propIf!=='undefined' && !propIf) return null;
	var contents = (children && !items) ? children : <>
		{!!icon && <i className={`${icon} icon`} style={!text || text.length==0 ? { marginRight: 0 } : null}></i>}
		{text}
	</>

	var item_class = classNames("item", className);
	var Component = as ?? 'div';

	if(items){
		var renderItems = props.items.map(({
			as, if: propIf, icon, text: itemText, className, onClick, style, ...restProps
		}, i)=>(
			(typeof propIf==='undefined' || !!propIf) ? (
				<Dropdown.Item as={as} icon={icon} text={itemText} onClick={onClick} className={className} key={`drptl-${text}-${i}`} style={style} {...restProps} />
			) : null
		))
		if(renderItems.length==0) return null;
		return <Dropdown className={item_class} trigger={<div>{contents}</div>} as={as}>
			<Dropdown.Menu>{renderItems}</Dropdown.Menu>
		</Dropdown>
	}else{
		return <Component className={item_class} onClick={props.onClick} style={style} {...restProps}>{contents}</Component>
	}
}

type ToolbarSubComponents = {
	Item: typeof ToolbarItem
}

interface ToolbarProps<E extends ElementType = typeof defaultItemElement> extends PropsWithChildren{
	style?: React.CSSProperties,
	className?: string,
	divided?: boolean,
	stretch?: boolean,
	items?: (ToolbarItemProps<E> | 'space')[],
}

const Toolbar : React.FC<ToolbarProps> & ToolbarSubComponents = (props: ToolbarProps)=>{
	return <div style={props.style} className={classNames('fr toolbar', {
		divided: props.divided,
		stretch: props.stretch,
	}, props.className)}>
		{props.items && props.items.length>0 && props.items.map((a, i)=>(
			a==='space' ? (
				<div style={{ flexGrow: 1 }} key={`TLBRI-${i}`} />
			) : (
				<ToolbarItem {...(a as ToolbarItemProps<any>)} key={`TLBRI-${i}`} />
			)
		))}
		{props.children}
	</div>
}

Toolbar.Item = ToolbarItem;

export default Toolbar;