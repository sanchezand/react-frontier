import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon, { IconName } from './Icon';
import { bindClick } from 'Util';

export type DropdownValueChange = (v: any, d: DropdownItemProps)=>boolean | void;

interface DropdownProps{
	label?: string,
	placeholder?: string,
	onSearchChange?: (v: string)=>void,
	onSearchClear?: ()=>void,
	minSearchLength?: number,
	searchTimeout?: number,
	items: DropdownItemProps[],
	value: any,
	loading?: boolean,
	onValueChange?: DropdownValueChange,
	iconName?: IconName,
	menuStyle?: React.CSSProperties,
	itemStyle?: React.CSSProperties,
	style?: React.CSSProperties,
	closeOnSelect?: boolean,
	position?: 'auto' | 'top' | 'bottom',
	emptyText?: string,
}

export interface DropdownItemProps{
	value: any,
	text: any,
	meta?: any,
	className?: string,
	iconName?: IconName,
	style?: React.CSSProperties,
}

var Dropdown = (props: DropdownProps)=>{
	var dropdownRef = useRef(null);
	var menuRef = useRef<HTMLDivElement>(null);
	var [active, setActive] = useState<boolean>(false);
	var [autoPosition, setAutoPosition] = useState<DropdownProps["position"]>('bottom');
	var [inputFocus, setInputFocus] = useState<boolean>(false);
	var [searching, setSearching] = useState<boolean>(false);
	var [searchValue, setSearchValue] = useState<string>('');
	var [searchTimeout, setSearchTimeout] = useState<any>(null);

	useEffect(()=>{
		if(!active || props.position=='top' || props.position=='bottom'){
			setAutoPosition((props.position as any) || 'bottom');
			return;
		}

		var menu_height = menuRef.current.clientHeight;
		var dropdown_pos = dropdownRef.current.getBoundingClientRect();
		var dropdown_bottom = dropdown_pos.y+dropdown_pos.height+menu_height+15;

		setAutoPosition(dropdown_bottom>=window.innerHeight ? 'top' : 'bottom');
	}, [props.items, active, props.position]);

	useEffect(()=>{
		return ()=>{
			if(searchTimeout){
				clearTimeout(searchTimeout);
			}
		}
	}, [searchTimeout]);

	useEffect(()=>{
		setSearchValue('');
		// if(!inputFocus){
		// 	// setActive(false);
		// }
	}, [inputFocus]);

	var showActive = ()=>{
		setActive(!active);
	}

	var itemSelected = (val: any, dr: DropdownItemProps)=>{
		return ()=>{
			if(props.onValueChange){
				setSearchValue('');
				if(props.onSearchClear) props.onSearchClear();
				var v = props.onValueChange(val, dr);
				if(v!==false){
					setActive(false);
				}
			}else if(props.closeOnSelect!==false){
				setActive(false);
			}
		}
	}

	var active_value = useMemo(()=>{
		if(!props.items) return null;
		return props.items.find(a=>a.value===props.value);
	}, [props.value, props.items]);

	var shown_position = useMemo(()=>{
		return props.position || autoPosition;
	}, [props.position, autoPosition]);

	var childs = !!props.items && props.items.map(a=>(
		<div className={classNames("item", a.className)} style={{ ...a.style, ...props.itemStyle }} onClick={itemSelected(a.value, a)}>
			{a.iconName && <Icon name={a.iconName} />}
			<div className="text">{a.text}</div>
			{!!a.meta && (
				<div className="meta">{a.meta}</div>
			)}
		</div>
	));

	var onSearchChange = (v: string)=>{
		setSearchValue(v);
		if(!props.onSearchChange) return;
		if(v && v.length>=(props.minSearchLength || 3)){
			if(searchTimeout) clearTimeout(searchTimeout);
			setSearchTimeout(setTimeout(()=>{
				props.onSearchChange(v);
			}, props.searchTimeout || 500));
		}else{
			if(props.onSearchClear) props.onSearchClear();
		}
	}

	return <div className="fr field" style={props.style}>
		{!!props.label && (
			<div className="fr fieldlabel">{props.label}</div>
		)}
		<div className="fr dropdown" ref={dropdownRef}>
			<div className={classNames("contents", { active })} onClick={showActive}>
				{!!props?.iconName && <Icon name={props.iconName} className='value-icon' />}
				{props.onSearchChange ? (
					<input type="text" onChange={v=>{
						onSearchChange(v.target.value);
					}} value={inputFocus ? searchValue : (active_value?.text || active_value?.value || searchValue)} placeholder={props.label || props.placeholder} onFocus={bindClick(setInputFocus, true)} onBlur={bindClick(setInputFocus, false)} />
				) : (
					<div className={classNames("text", { placeholder: !props.value })}>{active_value?.text || props.value || props.placeholder || props.label}</div>
				)}
				{/* {!!active_value?.meta && (
					<div className="meta">
						{active_value.meta}
					</div>
				)} */}
				{!!(props.loading || searching) ? (
					<div className="fr inline loader"></div>
				) : (
					<Icon name='caret-down' className='dropdown-icon' />
				)}
			</div>
				<div className={classNames("menu", {
					active: (active || inputFocus),
					top: shown_position==='top',
					bottom: shown_position==='bottom',
				})} ref={menuRef} style={props.menuStyle}>
					{(!!props.items && props.items.length>0) ? (
						childs
					) : (props.emptyText) ? (
						<div className="empty header">
							{props.emptyText}
						</div>
					) : null}	
				</div>
		</div>
	</div>
}

export default Dropdown;