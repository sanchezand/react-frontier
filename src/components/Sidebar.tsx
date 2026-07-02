import React, { ElementType, PropsWithChildren } from 'react';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';
import style from '../style/sidebar.module.scss';

type SidebarItemProps<E extends ElementType=any> = {
	text: string,
	style?: React.CSSProperties,
	iconName?: IconName,
	iconSolid?: boolean,
	className?: string,
	active?: boolean,
	as?: E
} & React.PropsWithChildren & React.PropsWithoutRef<E>

var SidebarItem = (props: SidebarItemProps)=>{
	var { text, iconName, className, as, active, style: compStyle, children, iconSolid, ...restProps } = props;
	const Elem = as || 'div';
	return <Elem className={classNames(style.item, className)} data-active={props.active || undefined} style={props.style} {...restProps}>
		{!!iconName && (
			<Icon name={iconName} solid={props.iconSolid} />
		)}
		{text}
		{props.children}
	</Elem>
}

interface SidebarMenuProps extends PropsWithChildren{
	header?: any,
	className?: string,
	style?: React.CSSProperties,
}
var SidebarMenu = (props: SidebarMenuProps)=>{
	var { header, className, children, style: compStyle, ...restProps } = props;
	return <div className={classNames(style.sidebar, props.className)} style={props.style} {...restProps}>
		<div className={style.header}>
			{typeof props.header === 'string' ? (
				<div className={style.text}>{props.header}</div>
			) : props.header}
		</div>
		<div className={style.contents}>
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
		<div className={style.header}>
			{typeof props.header === 'string' ? (
				<div className={style.text}>{props.header}</div>
			) : props.header}
		</div>
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