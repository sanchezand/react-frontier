import React, { ElementType, PropsWithChildren } from 'react';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';
import style from '../style/sidebar.module.scss';
import { Collapsible } from '@base-ui/react';

const defaultItemElement = 'div';
type SidebarSubItemProps<E extends ElementType=any> = {
	text?: string,
	style?: React.CSSProperties,
	iconName?: IconName,
	iconSolid?: boolean,
	className?: string,
	active?: boolean,
	as?: E,
	onClick?: ()=>void,
} & React.PropsWithChildren & React.ComponentPropsWithoutRef<E>

type SidebarItemProps<E extends ElementType, K extends ElementType> = {
	text?: string,
	style?: React.CSSProperties,
	iconName?: IconName,
	iconSolid?: boolean,
	className?: string,
	active?: boolean,
	as?: E,
	items?: SidebarSubItemProps<K>[],
	onClick?: ()=>void,
} & React.PropsWithChildren & React.ComponentPropsWithoutRef<E>

var SidebarItem = <E extends ElementType = typeof defaultItemElement, K extends ElementType = typeof defaultItemElement>(props: SidebarItemProps<E, K>)=>{
	var { text, iconName, className, as, active, style: compStyle, children, iconSolid, items, ...restProps } = props;
	const Elem = as || 'div';
	const Contents = <>
		{!!iconName && (
			<Icon name={iconName} solid={props.iconSolid} />
		)}
		{text}
		{props.children}
	</>
	if(props.items && props.items.length>0){
		return <Collapsible.Root render={<div />} open={props.active} onClick={props.onClick}>
			<Collapsible.Trigger className={classNames(style.item, className)} render={<div />} onClick={props.onClick}>
				{Contents}
			</Collapsible.Trigger>
			<Collapsible.Panel>
				lmao
			</Collapsible.Panel>
		</Collapsible.Root>
	}

	return <Elem className={classNames(style.item, className)} data-active={props.active || undefined} style={props.style} {...restProps}>
		{Contents}
	</Elem>
}

interface SidebarMenuProps extends PropsWithChildren{
	header?: any,
	className?: string,
	style?: React.CSSProperties,
	contentsStyle?: React.CSSProperties,
	headerStyle?: React.CSSProperties,
}
var SidebarMenu = (props: SidebarMenuProps)=>{
	var { header, className, children, style: compStyle, ...restProps } = props;
	return <div className={classNames(style.sidebar, props.className)} style={props.style} {...restProps}>
		{!!props.header && (
			<div className={classNames(style.header, {
				[style.text]: typeof props.header === 'string'
			})} style={props.headerStyle}>
				{props.header}
			</div>
		)}
		<div className={style.contents} style={props.style}>
			{props.children}
		</div>
	</div>
}

interface SidebarContentsProps extends PropsWithChildren{
	header?: any,
	style?: React.CSSProperties,
}
var SidebarContents = (props: SidebarContentsProps)=>{
	var { header, children, style: compStyle, ...restProps } = props;
	return <div className={style.contents} style={props.style} {...restProps}>
		{!!props.header && (
			<div className={classNames(style.header, {
				[style.text]: typeof props.header === 'string'
			})}>
				{props.header}
			</div>
		)}
		<div className={style.contents}>
			{props.children}
		</div>
	</div>
}

type SidebarSubComponents = {
	Menu: typeof SidebarMenu,
	Item: typeof SidebarItem,
	Contents: typeof SidebarContents
}

interface SidebarProps extends PropsWithChildren{
	className?: string,
	style?: React.CSSProperties,
}

const Sidebar : React.FC<SidebarProps> & SidebarSubComponents = (props: SidebarProps)=>{
	var { children, style: compStyle, className, ...restProps } = props;
	return <div className={classNames(style.root, props.className)} style={props.style} {...restProps}>
		{props.children}
	</div>
}

Sidebar.Item = SidebarItem;
Sidebar.Menu = SidebarMenu;
Sidebar.Contents = SidebarContents;

export default Sidebar;