import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';

interface DropdownItemProps extends PropsWithChildren{
	value?: any,
	text: any,
	iconName?: IconName,
	style?: React.CSSProperties,
	className?: string,
	meta?: any,
	active?: boolean,
	onClick?: (value: any)=>void,
}

const DropdownItem = (props: DropdownItemProps)=>{
	var onClick = ()=>{
		if(!props.onClick) return;
		props.onClick(props.value);
	}
	return <div className={classNames("item", { active: props.active }, props.className)} style={props.style} onClick={onClick}>
		{props.iconName && <Icon name={props.iconName} />}
		<div className="text">{props.children || props.text}</div>
		{!!props.meta && (
			<div className="meta">{props.meta}</div>
		)}
	</div>
}

interface DropdownProps extends PropsWithChildren{
	label?: string,
	placeholder?: string,
	selection?: boolean,
	position?: 'auto' | 'top' | 'bottom',
	style?: React.CSSProperties,
	menuStyle?: React.CSSProperties,
	className?: string,
	contents?: JSX.Element,
	onChange?: (v: any, i: DropdownItemProps)=>void,
}

type DropdownSubComponents = {
	Item: typeof DropdownItem
}

const Dropdown : React.FC<DropdownProps> & DropdownSubComponents = (props: DropdownProps)=>{
	var dropdownRef = useRef(null);
	var menuRef = useRef<HTMLDivElement>(null);
	var [active, setActive] = useState<boolean>(false);
	var [value, setValue] = useState<any>(null);
	var [position, setPosition] = useState<'top' | 'bottom'>('bottom');

	useEffect(()=>{
		if(!active || props.position=='top' || props.position=='bottom'){
			setPosition((props.position as any) || 'bottom');
			return;
		}

		var menu_height = menuRef.current.clientHeight;
		var dropdown_pos = dropdownRef.current.getBoundingClientRect();
		var dropdown_bottom = dropdown_pos.y+dropdown_pos.height+menu_height+15;

		setPosition(dropdown_bottom>=window.innerHeight ? 'top' : 'bottom');
	}, [props.children, active, props.position]);

	useEffect(()=>{
		var evl = (ev: MouseEvent) : any=>{
			setTimeout(()=>{
				setActive(false);
			}, 5);
		};

		if(active){
			document.addEventListener('mouseup', evl as any);
		}
		return ()=>{
			document.removeEventListener('mouseup', evl as any);
		}
	}, [active]);

	var getActiveValue = ()=>{
		if(!value) return null;
		var children_items : ({ props: DropdownItemProps })[] = (Array.isArray(props.children) ? props.children : [props.children]).flat();
		for(var i of children_items){
			if(!i || !i.props || !i.props.value) continue;
			if(i.props.value===value) return i.props;
		}
	}

	useEffect(()=>{
		if(props.onChange){
			var active_value = getActiveValue();
			props.onChange(value || null, active_value);
		}
	}, [value]);

	var showActive = ()=>{
		setActive(true);
	}

	var childs = useMemo(()=>{
		return (Array.isArray(props.children) ? props.children : [props.children]).flat().map((a: { props: DropdownItemProps & { key: string } },i)=>{
			if(React.isValidElement(a)){
				return React.cloneElement(a, { 
					key: a.key || `DRP-IT-${a.props.value || i}`,
					...a.props,
					active: value && (value===a.props.value),
					onClick: (v: any)=>{
						setActive(false);
						setValue(typeof a.props.value==='undefined' ? a.props.text : a.props.value);
						return a.props.onClick;
					}
				} as unknown)
			}
		});
	}, [value, props.children, active]);

	var active_value = useMemo(()=>{
		return getActiveValue();
	}, [value, props.children]);

	return <div className={classNames("fr dropdown", { active, container: !!props.contents }, props.className)} style={props.style} ref={dropdownRef}> 
		{props.contents ? (
			<div className="container" onClick={showActive}>
				{props.contents}
			</div>
		) : <>
			{!!props.label && (
				<div className="fr fieldlabel">{props.label}</div>
			)}
			<div className={classNames("contents", { active })} onClick={showActive}>
				{!!active_value?.iconName && <Icon name={active_value.iconName} className='value-icon' />}
				<div className={classNames("text", { placeholder: !value })}>{active_value?.text || value || props.placeholder || props.label}</div>
				{!!active_value?.meta && (
					<div className="meta">
						{active_value.meta}
					</div>
				)}
				<Icon name='caret-down' className='dropdown-icon' />
			</div>
		</>}
		<div className={classNames("menu", {
			active,
			top: position==='top',
			bottom: position==='bottom',
		})} ref={menuRef} style={props.menuStyle}>
			{childs}
		</div>
	</div>
}

Dropdown.Item = DropdownItem;

export default Dropdown;