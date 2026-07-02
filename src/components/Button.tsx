import React, { CSSProperties, ElementType, useEffect, useMemo, useState } from 'react';
import { Button as BaseButton, Menu } from '@base-ui/react';
import { FrontierColors } from './Classes';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';
import styles from '../style/button.module.scss';
import DropdownStyle from '../style/dropdown.module.scss';
import Loader from './Loader';

type ButtonMenuProps<E extends ElementType=any> = {
	text?: any,
	items?: ButtonMenuProps[]
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

type ButtonProps<E extends ElementType> = {
	as?: E,
	text?: string,
	onClick?: (setLoading: (loading: boolean)=>void)=>void,
	nativeOnClick?: (ev?: React.MouseEvent)=>void,
	basic?: boolean,
	color?: FrontierColors,
	loading?: boolean,
	className?: string
	icon?: boolean,
	checkmark?: boolean,
	iconName?: IconName,
	iconSolid?: boolean,
	iconStyle?: React.CSSProperties,
	iconRight?: IconName,
	iconRightSolid?: boolean,
	iconRightStyle?: React.CSSProperties,
	size?: 'small' | 'tiny' | 'big',
	disabled?: boolean,
	fluid?: boolean,
	style?: React.CSSProperties,
	onLoadingChanged?: (v: boolean)=>void,
	menu?: ButtonMenuProps[]
} & React.ComponentPropsWithoutRef<E>;

var Button = <E extends ElementType>(props: ButtonProps<E>)=>{
	var { 
		text,
		onClick,
		nativeOnClick,
		basic,
		color,
		loading: propsLoading,
		className,
		iconSolid,
		icon,
		iconRightSolid,
		iconName,
		size,
		disabled,
		fluid,
		style,
		iconStyle,
		iconRight,
		iconRightStyle,
		onLoadingChanged,
		as,
		checkmark,
		menu,
		...restProps
	} = props;
	var [loading, setLoading] = useState(false);

	useEffect(()=>{
		if(typeof props.loading!=='undefined' && props.loading!=loading){
			setLoading(props.loading);
			if(props.onLoadingChanged) props.onLoadingChanged(props.loading);
		}
	}, [props]);

	var onButtonClick = (ev: React.MouseEvent)=>{
		if(props.nativeOnClick) props.nativeOnClick(ev);
		if(props.onClick) props.onClick(loading=>{
			setLoading(loading);
			if(props.onLoadingChanged) props.onLoadingChanged(loading);
		});
	}

	var loaderSize = useMemo(()=>{
		switch(props.size){
			case 'big': return 30;
			case 'small': return 20;
			case 'tiny': return 15;
			default: return 20;
		}
	}, [props.size]);
	
	const ComponentType = props.as ?? 'div';
	const ButtonComponent = <ComponentType 
		className={classNames("fr2 button", styles.button, props.className)}
		data-size={props.size || undefined}
		data-disabled={props.disabled || undefined}
		data-loading={loading || undefined}
		data-checkmark={props.checkmark || undefined}
		data-fluid={props.fluid || undefined}
		data-icon={props.icon || undefined}
		data-basic={props.basic || undefined}
		color={color}
		onClick={onButtonClick} 
		style={props.style}
		{...restProps}
	>
		{loading ? (
			<Loader size={loaderSize} />
		) : <>
			{!!iconName && <Icon name={props.iconName} solid={props.iconSolid} style={props.iconStyle} />}
			{text}
			{!!iconRight && <Icon name={props.iconRight} solid={props.iconRightSolid} style={props.iconRightStyle} className={styles.iconRight} />}
		</>}
	</ComponentType>

	if(props.menu && props.menu.length>0){
		return <Menu.Root>
			<Menu.Trigger render={ButtonComponent} />
			<Menu.Portal>
				<Menu.Positioner sideOffset={8} align='start' style={{ zIndex: 1001 }}>
					<Menu.Popup className={DropdownStyle.popup} data-fluid>
						{props.menu.filter(a=>a.if!==false).map((a, i)=>{
							var {
								as, className, disabled, iconName, iconSolid, if: aIf, items, onClick, separator, style, text,
								...itemRestProps
							} = a;
							var ItemComp = a.as || 'div';
							return a.separator ? (
								<Menu.Separator className={DropdownStyle.separator} />
							) : a.items && a.items.length>0 ? (
								<Menu.SubmenuRoot>
									<Menu.SubmenuTrigger className={classNames(DropdownStyle.item, DropdownStyle.submenuItem)}>
										<div className={DropdownStyle.contents}>
											{!!a.iconName && (
												<Icon className={DropdownStyle.itemIcon} name={a.iconName} solid={a.iconSolid} />
											)}
											<div className={DropdownStyle.text}>{a.text}</div>
											<Icon name='caret-right' className={DropdownStyle.menuIcon} />
										</div>
									</Menu.SubmenuTrigger>
									<Menu.Portal>
										<Menu.Positioner style={{ zIndex: 1001 }}>
											<Menu.Popup className={DropdownStyle.popup}>
												{a.items.map(b=>{
													var {
														as, className, disabled, iconName, iconSolid, if: bIf, items, onClick, separator, style, text,
														...subItemRestProps
													} = b;
													const SubComp = b.as || 'div';
													return b.separator ? (
														<Menu.Separator className={DropdownStyle.separator} />
													) : (
														<Menu.Item render={<SubComp {...subItemRestProps} />} disabled={b.disabled} key={`BTNMENU-${a.text}-${b.text}`} className={classNames(DropdownStyle.item, b.className)} style={b.style} onClick={b.onClick}>
															<div className={DropdownStyle.contents}>
																{!!b.iconName && (
																	<Icon className={DropdownStyle.itemIcon} name={b.iconName} solid={b.iconSolid} />
																)}
																{b.text}
															</div>
														</Menu.Item>
													)
												})}
											</Menu.Popup>
										</Menu.Positioner>
									</Menu.Portal>
								</Menu.SubmenuRoot>
							) : (
								<Menu.Item render={<ItemComp {...itemRestProps} />} key={`BTNMENU-${a.text}`} disabled={a.disabled} className={classNames(DropdownStyle.item, a.className)} style={a.style} onClick={a.onClick}>
									<div className={DropdownStyle.contents}>
										{!!a.iconName && (
											<Icon className={DropdownStyle.itemIcon} name={a.iconName} solid={a.iconSolid} />
										)}
										{a.text}
									</div>
								</Menu.Item>
							)
						})}
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.Root>
	}

	return ButtonComponent;
}

export default Button;