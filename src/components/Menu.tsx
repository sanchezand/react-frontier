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
	trigger: any,
	disabled?: boolean,
	items: MenuItemProps[],
}

var Menu = (props: MenuProps)=>{
	var { t } = useTranslation();
	useEffect(()=>{
		
	}, []);
	
	return <BaseMenu.Root disabled={!!props.disabled}>
		<BaseMenu.Trigger nativeButton={true} render={props.trigger} disabled={!!props.disabled} />
		<BaseMenu.Portal>
			<BaseMenu.Positioner sideOffset={8} align='start' style={{ zIndex: 1001 }}>
				<BaseMenu.Popup className={DropdownStyle.popup} data-fluid>
					{props.items.filter(a=>a.if!==false).map((a, i)=>{
						var {
							as, className, disabled, iconName, iconSolid, if: aIf, items, onClick, separator, style, text,
							...itemRestProps
						} = a;
						var ItemComp = a.as || 'div';
						return a.separator ? (
							<BaseMenu.Separator className={DropdownStyle.separator} />
						) : a.items && a.items.length>0 ? (
							<BaseMenu.SubmenuRoot>
								<BaseMenu.SubmenuTrigger className={classNames(DropdownStyle.item, DropdownStyle.submenuItem)}>
									<div className={DropdownStyle.contents}>
										{!!a.iconName && (
											<Icon className={DropdownStyle.itemIcon} name={a.iconName} solid={a.iconSolid} />
										)}
										<div className={DropdownStyle.text}>{a.text}</div>
										<Icon name='caret-right' className={DropdownStyle.menuIcon} />
									</div>
								</BaseMenu.SubmenuTrigger>
								<BaseMenu.Portal>
									<BaseMenu.Positioner style={{ zIndex: 1001 }}>
										<BaseMenu.Popup className={DropdownStyle.popup}>
											{a.items.map(b=>{
												var {
													as, className, disabled, iconName, iconSolid, if: bIf, items, onClick, separator, style, text,
													...subItemRestProps
												} = b;
												const SubComp = b.as || 'div';
												return b.separator ? (
													<BaseMenu.Separator className={DropdownStyle.separator} />
												) : (
													<BaseMenu.Item render={<SubComp {...subItemRestProps} />} disabled={b.disabled} key={`ITMMENU-${a.text}-${b.text}`} className={classNames(DropdownStyle.item, b.className)} style={b.style} onClick={b.onClick}>
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

export default Menu;