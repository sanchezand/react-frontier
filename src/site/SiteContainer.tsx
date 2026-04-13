import React, { ElementType, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Icon, IconName, Sidebar } from '../components';
import style from './style/site.module.scss';
import classNames from 'classnames';

interface SiteContainerProps{
	outlet: any,
	items: {
		path: string,
		iconName: IconName,
		title: string,
	}[]
}

var SiteContainer = (props: SiteContainerProps)=>{
	var { t } = useTranslation();
	var location = useLocation();

	var items = useMemo(()=>{
		if(!props.items) return [];
		return props.items.sort((a: any,b: any)=>a.title>b.title ? 1 : -1);
	}, [props.items]);

	var active_index : number = useMemo(()=>{
		if(!items) return null;
		for(var i=0; i<items.length; i++){
			var real_path = `${items[i].path.endsWith('/') ? items[i].path.substring(0, items[i].path.length-1) : items[i].path}(\\/*)?`;
			var path_tmpl = new RegExp(real_path.replace(/\:([a-z0-9_]+)/g, (m, p)=>`(?<${p}>[^/]+)`));
			if(path_tmpl.test(location.pathname)){
				return i;
			}
		}
		return -1;
	}, [items, location.pathname]);

	return <Sidebar>
		<Sidebar.Menu header={'Frontier'}>
			{props.items.map((a, ix)=>(
				<Sidebar.Item key={`SBR${ix}`} text={a.title} as={Link} to={a.path} iconName={a.iconName} active={ix===active_index} />
			))}
		</Sidebar.Menu>
		<Sidebar.Contents header={active_index!=-1 ? props.items[active_index]?.title : null}>
			{props.outlet}
		</Sidebar.Contents>
	</Sidebar>
	
	// return <div className={style.root}>
	// 	<div className={style.sidebar}>
	// 		<Link className={classNames(style.header, style.icon)} to={'/'}>
	// 			<div className={style.text}>Frontier</div>
	// 			{/* <img src={`${CDN_URL}/logo/LogoWH_Large.webp`} alt="Logo" /> */}
	// 		</Link>
	// 		<div className={style.contents}>
	// 			{props.items.map((a, ix)=>(
	// 				<SidebarItem text={a.title} as={Link} to={a.path} iconName={a.iconName} active={ix===active_index} />
	// 			))}
	// 		</div>
	// 	</div>
	// 	<div className={style.contents}>
	// 		<div className={style.header}>
	// 			<div className={style.text}>
	// 				{active_index!=-1 ? props.items[active_index]?.title : null}
	// 			</div>
	// 		</div>
	// 		<div className={style.contents}>
	// 			{props.outlet}
	// 		</div>
	// 	</div>
	// </div>
}

export default SiteContainer;