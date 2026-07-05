import React, { ElementType, PropsWithChildren } from 'react';
import { Menu, Menubar } from '@base-ui/react';
import Icon, { IconName } from './Icon';
import style from '../style/dropdown.module.scss';
import classNames from 'classnames';

const defaultItemElement = 'div';

type ToolbarItemProps<E extends ElementType> = {
	as?: E,
	text?: string,
	onClick?: ()=>void,
	iconName?: IconName,
	iconSolid?: boolean,
	className?: string,
	active?: boolean,
	disabled?: boolean,
	if?: boolean,
	space?: boolean,
	style?: React.CSSProperties,
} & React.ComponentPropsWithoutRef<E>;
function ToolbarItem<E extends ElementType = typeof defaultItemElement>(props: ToolbarItemProps<E>){
	var { text, onClick, iconName, className, if: propIf, as, items, children, style: propStyle, space, active, disabled, iconSolid, ...restProps } = props;

	if(typeof propIf!=='undefined' && !propIf) return null;
	if(space) return <div className={classNames(style.item, props.className)} style={props.style} data-space={props.space || undefined} />

	var contents = (children && !items) ? children : <>
		{!!iconName && (
			<Icon name={props.iconName} solid={props.iconSolid} className={style.toolbarIcon} data-single={!props.text || props.text.length==0 || undefined} />
		)}
		<div className={style.toolbarText}>
			{text}
		</div>
	</>

	var item_class = classNames('item', style.toolbarItem, className);
	var Component = props.as ?? 'div';
	return <Component 
		className={item_class} 
		onClick={props.onClick} 
		style={props.style} 
		data-active={props.active || undefined}
		data-disabled={props.disabled || undefined} 
		{...restProps}
	>
		{contents}
	</Component>
}

function ToolbarDropdownItem<E extends ElementType = typeof defaultItemElement, K extends ElementType = typeof defaultItemElement>(props: ToolbarDropdownItemProps<E, K>){
	var { text, onClick, iconName, className, active, disabled, if: propIf, space, items, as, style: compStyle, divider, iconSolid, ...restProps } = props;
	if(props.divider){
		return <Menu.Separator className={style.separator} />
	}
	if(props.items){
		return <Menu.SubmenuRoot>
			<Menu.SubmenuTrigger className={classNames(style.item, 'item', props.className)}>
				<div className={classNames(style.contents, style.submenuItem)}>
					{!!props.iconName && (
						<Icon name={props.iconName} solid={props.iconSolid} className={style.toolbarIcon} />
					)}
					<div className={style.text}>
						{props.text}
					</div>
					<Icon name={'caret-right'} className={style.menuIcon} />
				</div>
			</Menu.SubmenuTrigger>
			<Menu.Portal style={{ zIndex: 1000 }}>
				<Menu.Positioner alignOffset={-4} style={{ zIndex: 1000 }}>
					<Menu.Popup className={classNames(style.popup, style.list)}>
						{props.items.filter(a=>a.if!==false).map((a, ix)=>(
							<ToolbarDropdownItem key={`TBDSRPI-${ix}`} {...a} />
						))}
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.SubmenuRoot>
	}
	const ItemComp = props.as ?? 'div';
	return <Menu.Item 
		className={classNames(style.item, 'item', props.className)} 
		style={props.style}
		disabled={props.disabled || undefined}
		data-disabled={props.disabled || undefined}
		data-active={props.active || undefined}
		onClick={props.onClick}
		render={<ItemComp {...restProps} />}
		{...restProps}
	>
		<div className={style.contents}>
			{!!props.iconName && (
				<Icon name={props.iconName} solid={props.iconSolid} className={style.toolbarIcon} />
			)}
			{props.text}
		</div>
	</Menu.Item>
}

type ToolbarDropdownItemProps<E extends ElementType, K extends ElementType, V extends ElementType = any> = ToolbarItemProps<E> & { items?: ToolbarDropdownItemProps<K, V>[], divider?: boolean }
type ToolbarDropdownProps<E extends ElementType = typeof defaultItemElement, K extends ElementType = any, V extends ElementType = any> = {
	text?: string,
	onClick?: ()=>void,
	iconName?: IconName,
	iconSolid?: boolean,
	className?: string,
	disabled?: boolean,
	if?: boolean,
	style?: React.CSSProperties,
	items: ToolbarDropdownItemProps<K, V>[]
}
var ToolbarDropdown = (props: ToolbarDropdownProps)=>{
	return <Menu.Root disabled={props.disabled}>
		<Menu.Trigger className={classNames(style.toolbarItem, 'item')} render={<div />} nativeButton={false} data-disabled={props.disabled || undefined}>
			{!!props.iconName && (
				<Icon name={props.iconName} solid={props.iconSolid} className={style.toolbarIcon} />
			)}
			<div className={style.toolbarText}>
				{props.text}
			</div>
			<Icon name={'caret-down'} className={style.dropdownIcon} />
		</Menu.Trigger>
		{!!props.items && (
			<Menu.Portal style={{ zIndex: 1000 }}>
				<Menu.Positioner sideOffset={5} style={{ zIndex: 1000 }}>
					<Menu.Popup className={classNames(style.popup, style.list)}>
						{props.items.filter(a=>a.if!==false).map((a, ix)=>(
							<ToolbarDropdownItem key={`TBDRPI-${ix}`} {...a} />
						))}
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		)}
	</Menu.Root>
}


type ToolbarSubComponents = {
	Item: typeof ToolbarItem,
	Dropdown: typeof ToolbarDropdown,
}


interface ToolbarProps<E extends ElementType = typeof defaultItemElement> extends PropsWithChildren{
	style?: React.CSSProperties,
	className?: string,
	divided?: boolean,
	stretch?: boolean,
	fitted?: boolean,
	items?: ToolbarItemProps<E>[],
}

const Toolbar : React.FC<ToolbarProps> & ToolbarSubComponents = (props: ToolbarProps)=>{
	var { children, className, divided, fitted, items, stretch, style: propStyle, ...restProps } = props;
	return <Menubar 
		className={classNames('fr2 toolbar', style.toolbar, props.className)}
		style={props.style}
		data-divided={props.divided || undefined}
		data-fitted={props.fitted || undefined}
		data-stretch={props.stretch || undefined}
		{...restProps}
	>
		{!!props.items && props.items.map((a, ix)=>(
			<ToolbarItem key={a.key || `TBR-${ix}`} {...a} />
		))}
		{props.children}
	</Menubar>
}

Toolbar.Item = ToolbarItem;
Toolbar.Dropdown = ToolbarDropdown;


export default Toolbar;