import { PolymorphicProps } from 'Classes';
import classNames from 'classnames';
import React, { ElementType, PropsWithChildren, useEffect, useState } from 'react';

const defaultItemElement = 'div';

type SidebarItemProps<E extends ElementType> = PolymorphicProps<E> & {
	text: string,
	iconName?: string,
	active?: boolean,
	className?: string,
}

const SidebarItem = <E extends ElementType = typeof defaultItemElement>(props: SidebarItemProps<E>)=>{
	var { text, iconName, active, as, ...restProps }  = props;
	const Component = as ?? defaultItemElement;
	return <Component className={classNames("item", props.className)} {...restProps}>
		{!!props.iconName && <i className={classNames(props.iconName, 'icon')}></i>}
		{props.text}
	</Component>
}

interface SidebarProps extends PropsWithChildren{
	title: string,
	fixed?: boolean,
	header?: string,
	headerIcon?: string,
	responsive?: boolean,
	breakpoint?: number,
	hideOnBreakpoint?: boolean,
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
							{props.headerIcon && <i className={classNames(props.headerIcon, 'icon')}></i>}
							{props.header}
						</div>
					)}
					{props.children}
				</div>
			) : (
				<div className={`drawer ${drawer ? 'active' : ''}`} style={props.drawerStyle}>
					<div className="header" onClick={toggleDrawer}>
						<div className="text">{props.title}</div>
						<i className="caret down icon"></i>
					</div>
					{props.children}
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