import React, { ElementType } from 'react';
import classNames from 'classnames';
import Dropdown from './Dropdown';
import Icon, { IconName } from './Icon';
import { PropsWithChilds } from 'Classes';

const defaultItemElement = 'div';

type ToolbarItemProps<E extends ElementType> = {
	as?: E,
	text?: string,
	onClick?: ()=>void,
	iconName?: IconName,
	className?: string,
	disabled?: boolean,
	if?: boolean,
	space?: boolean,
	style?: React.CSSProperties,
} & React.ComponentPropsWithoutRef<E>;

function ToolbarItem<E extends ElementType = typeof defaultItemElement>(props: ToolbarItemProps<E>){
	var { text, onClick, iconName, className, if: propIf, as, items, children, style, space, ...restProps } = props;

	if(typeof propIf!=='undefined' && !propIf) return null;
	if(space) return <div style={{ flexGrow: 1 }} />
	
	var contents = (children && !items) ? children : <>
		{!!iconName && <Icon name={props.iconName} style={!text || text.length==0 ? { marginRight: 0 } : null} />}
		<div className="text">
			{text}
		</div>
	</>

	var item_class = classNames("item", {
		disabled: props.disabled,
	}, className);
	var Component = as ?? 'div';
	return <Component className={item_class} onClick={props.onClick} style={style} {...restProps}>
		{contents}
	</Component>
}

interface ToolbarDropdownProps extends PropsWithChilds{
	text?: string,
	onClick?: ()=>void,
	iconName?: IconName,
	className?: string,
	disabled?: boolean,
	if?: boolean,
	style?: React.CSSProperties,
	iconRight?: IconName,
	position?: 'auto' | 'top' | 'bottom',
}
var ToolbarDropdown = (props: ToolbarDropdownProps)=>{
	return <Dropdown className={classNames('item', {
		disabled: props.disabled,
	})} contents={<>
		{!!props.iconName && <Icon name={props.iconName} style={!props.text || props.text.length==0 ? { marginRight: 0 } : null} />}
		<div className="text">
			{props.text}
		</div>
		{props.iconRight!==null && (
			<Icon name={props.iconRight || 'caret-down'} style={{ marginLeft: 8, fontSize: 12, lineHeight: '11px' }} />
		)}
	</>}>
		{props.children}
	</Dropdown>
}

type ToolbarSubComponents = {
	Item: typeof ToolbarItem,
	Dropdown: typeof ToolbarDropdown,
}

interface ToolbarProps<E extends ElementType = typeof defaultItemElement> extends PropsWithChilds{
	style?: React.CSSProperties,
	className?: string,
	divided?: boolean,
	stretch?: boolean,
	fitted?: boolean,
	items?: (ToolbarItemProps<E> | 'space')[],
}

const Toolbar : React.FC<ToolbarProps> & ToolbarSubComponents = (props: ToolbarProps)=>{
	return <div style={props.style} className={classNames('fr toolbar', {
		divided: props.divided,
		stretch: props.stretch,
		fitted: props.fitted,
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
Toolbar.Dropdown = ToolbarDropdown;

export default Toolbar;