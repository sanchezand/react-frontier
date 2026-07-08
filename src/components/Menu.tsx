import React, { ElementType, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu as BaseMenu } from '@base-ui/react';
import DropdownStyle from '../style/dropdown.module.scss';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';

export type MenuItemProps<E extends ElementType=any> = {
	text?: any,
	items?: MenuItemProps[]
	className?: string,
	iconName?: IconName,
	iconSolid?: boolean,
	if?: boolean,
	disabled?: boolean,
	separator?: boolean,
	as?: E,
	onClick?: ()=>void,
	style?: React.CSSProperties,
} & React.ComponentPropsWithoutRef<E>;

interface MenuProps{
	trigger?: any,
	inline?: boolean,
	disabled?: boolean,
	openOnHover?: boolean,
	items: MenuItemProps[],
	style?: React.CSSProperties
}

var SubMenu = (props: { data: MenuItemProps })=>{
	return <BaseMenu.SubmenuRoot>
		<BaseMenu.SubmenuTrigger className={classNames(DropdownStyle.item, DropdownStyle.submenuItem)}>
			<div className={DropdownStyle.contents}>
				{!!props.data.iconName && (
					<Icon className={DropdownStyle.itemIcon} name={props.data.iconName} solid={props.data.iconSolid} />
				)}
				<div className={DropdownStyle.text}>{props.data.text}</div>
				<Icon name='caret-right' className={DropdownStyle.menuIcon} />
			</div>
		</BaseMenu.SubmenuTrigger>
		<BaseMenu.Portal>
			<BaseMenu.Positioner style={{ zIndex: 1001 }}>
				<BaseMenu.Popup className={DropdownStyle.popup}>
					{props.data.items.map(b=>{
						var {
							as, className, disabled, iconName, iconSolid, if: bIf, items, onClick, separator, style, text,
							...subItemRestProps
						} = b;
						const SubComp = b.as || 'div';
						return b.separator ? (
							<BaseMenu.Separator className={DropdownStyle.separator} />
						) : (
							<BaseMenu.Item render={<SubComp {...subItemRestProps} />} disabled={b.disabled} key={`ITMMENU-${props.data.text}-${b.text}`} className={classNames(DropdownStyle.item, b.className)} style={b.style} onClick={b.onClick}>
								<div className={DropdownStyle.contents}>
									{!!b.iconName && (
										<Icon className={DropdownStyle.itemIcon} name={b.iconName} solid={b.iconSolid} />
									)}
									{b.text}
								</div>
							</BaseMenu.Item>
						)
					})}
				</BaseMenu.Popup>
			</BaseMenu.Positioner>
		</BaseMenu.Portal>
	</BaseMenu.SubmenuRoot>
}

var MenuRoot = (props: MenuProps & { side?: 'bottom' | 'right', sideOffset?: number })=>{
	return <BaseMenu.Root disabled={!!props.disabled}>
		<BaseMenu.Trigger nativeButton={true} render={props.trigger} disabled={!!props.disabled} openOnHover={props.openOnHover} />
		<BaseMenu.Portal>
			<BaseMenu.Positioner sideOffset={props.sideOffset || 8} align='start' side={props.side} style={{ zIndex: 1001 }}>
				<BaseMenu.Popup className={DropdownStyle.popup} data-fluid>
					{props.items.filter(a=>a.if!==false).map((a, i)=>{
						var {
							as, className, disabled, iconName, iconSolid, if: aIf, items, onClick, separator, style, text,
							...itemRestProps
						} = a;
						var ItemComp = a.as || 'div';
						return a.separator ? (
							<BaseMenu.Separator className={DropdownStyle.separator} key={`ITMMENU-${a.text}`} />
						) : a.items && a.items.length>0 ? (
							<SubMenu data={a} key={`ITMMENU-${a.text}`} />
						) : (
							<BaseMenu.Item render={<ItemComp {...itemRestProps} />} key={`ITMMENU-${a.text}`} disabled={a.disabled} className={classNames(DropdownStyle.item, a.className)} style={a.style} onClick={a.onClick}>
								<div className={DropdownStyle.contents}>
									{!!a.iconName && (
										<Icon className={DropdownStyle.itemIcon} name={a.iconName} solid={a.iconSolid} />
									)}
									{a.text}
								</div>
							</BaseMenu.Item>
						)
					})}
				</BaseMenu.Popup>
			</BaseMenu.Positioner>
		</BaseMenu.Portal>
	</BaseMenu.Root>
}

var Menu = (props: MenuProps)=>{
	if(props.inline){
		return <div className={classNames('fr2 menu inline', DropdownStyle.popup)} data-inline style={props.style}>
			{props.items.filter(a=>a.if!==false).map(a=>{
				var ItemComp = a.as || 'div';
				var ItemRender = (
					<ItemComp key={`ITMMENU-${a.text}`} data-disabled={a.disabled || undefined} className={classNames(DropdownStyle.item, DropdownStyle.submenuItem, a.className)} style={a.style} onClick={a.onClick}>
						<div className={DropdownStyle.contents}>
							{!!a.iconName && (
								<Icon className={DropdownStyle.itemIcon} name={a.iconName} solid={a.iconSolid} />
							)}
							<div className={DropdownStyle.text}>{a.text}</div>
							{!!a.items && a.items.length>0 && (
								<Icon name='caret-right' className={DropdownStyle.menuIcon} />
							)}
						</div>
					</ItemComp>
				)
				
				return a.separator ? (
					<div className={DropdownStyle.separator} key={`ITMMENU-${a.text}`} />
				) : a.items && a.items.length>0 ? (
					<MenuRoot key={`ITMMENU-${a.text}`} items={a.items} disabled={a.disabled} trigger={ItemRender} side='right' sideOffset={-4} openOnHover />
				) : (
					ItemRender
				)
			})}
		</div>
	}
	return <MenuRoot {...props} />
}

export default Menu;