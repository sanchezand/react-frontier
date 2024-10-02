import classNames from 'classnames';
import Icon, { IconName } from 'Icon';
import React, { ElementType, PropsWithChildren, useEffect, useState } from 'react';

const defaultItemElement = 'div';

type SidebarItemProps<E extends ElementType> = {
	as?: E,
	content?: any,
	iconName?: IconName,
	iconStyle?: React.CSSProperties,
	active?: boolean,
	className?: string,
	text?: string,
} & React.ComponentPropsWithoutRef<E> & React.PropsWithChildren;

const SidebarItem = <E extends ElementType>(props: SidebarItemProps<E>)=>{
	var { text, iconName, active, as, children, content, ...restProps }  = props;
	const Component = as ?? defaultItemElement;
	return <Component className={classNames("item", props.className)} {...restProps}>
		{children || <>
			{!!iconName && <Icon name={props.iconName} style={props.iconStyle} />}
			{content}
		</>}
	</Component>
}

interface SidebarProps extends PropsWithChildren{
	title: string,
	fixed?: boolean,
	header?: string,
	headerIcon?: IconName,
	headerIconStyle?: React.CSSProperties,
	responsive?: boolean,
	breakpoint?: number,
	hideOnBreakpoint?: boolean,
	closeDrawerOnClick?: boolean,
	sidebarStyle?: React.CSSProperties
	drawerStyle?: React.CSSProperties,
	contentsStyle?: React.CSSProperties,
	contents?: any,
}

type SidebarType = React.FC<SidebarProps> & { Item: typeof SidebarItem };

const Sidebar : SidebarType = (props: SidebarProps) : JSX.Element=>{
	const SIDEBAR_BREAKPOINT = props.breakpoint || 675;
	var [mobile, setMobile] = useState<boolean>(false);
	var [drawer, setDrawer] = useState<boolean>(false);

	useEffect(()=>{
		var onResize = ()=>{
			if(!mobile && window.innerWidth<=SIDEBAR_BREAKPOINT){
				setMobile(true);
			}else if(mobile && window.innerWidth>SIDEBAR_BREAKPOINT){
				setMobile(false);
			}
		}
		window.addEventListener('resize', onResize);
		setMobile(window.innerWidth<=SIDEBAR_BREAKPOINT)

		return ()=>{
			window.removeEventListener('resize', onResize);
		}
	}, [mobile, props.breakpoint]);

	var toggleDrawer = ()=>{
		setDrawer(!drawer);
	}

	return <div className={classNames('fr sidebar', { 
		mobile,
		fixed: props.fixed,
	})} style={props.sidebarStyle}>
		{mobile && props.hideOnBreakpoint ? null : (
			!mobile ? (
				<div className="sidebar">
					{!!(props.header || props.headerIcon) && (
						<div className="header item" onClick={toggleDrawer}>
							{props.headerIcon && <Icon name={props.headerIcon} style={props.headerIconStyle} />}
							{props.header}
						</div>
					)}
					{props.children}
				</div>
			) : (
				<div className={`drawer ${drawer ? 'active' : ''}`} style={props.drawerStyle}>
					<div className="header" onClick={toggleDrawer}>
						<div className="text">{props.title}</div>
						<Icon name={'caret-down'} />
					</div>
					<div onClick={()=>{
						if(props.closeDrawerOnClick) setDrawer(false);
					}}>
						{props.children}
					</div>
				</div>
			)
		)}
		{!!props.contents && (
			<div className={classNames("contents", {
				normal: props.hideOnBreakpoint && mobile
			})} style={props.contentsStyle}>
				{props.contents}
			</div>
		)}
	</div>
}

Sidebar.Item = SidebarItem;

export default Sidebar;