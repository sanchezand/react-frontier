import React, { useEffect, useState } from 'react';
import { Switch } from '@base-ui/react';
import style from '../style/checkbox.module.scss';
import classNames from 'classnames';

interface CheckboxProps{
	label?: any,
	checked?: boolean,
	onChange?: (val: boolean)=>void,
	style?: React.CSSProperties,
	labelStyle?: React.CSSProperties,
	className?: string,
	labelClassName?: string,
	color?: 'green' | 'red' | 'purple' | 'black' | 'blue' | 'orange' | 'white' | 'yellow',
}

var Checkbox = (props: CheckboxProps)=>{
	useEffect(()=>{
		
	}, []);
	
	const SwitchElem = (
		<Switch.Root className={classNames(style.switch, props.className)} style={!props.label ? props.style : null} data-color={props.color || undefined} checked={props.checked} onCheckedChange={props.onChange} data-labeled={!!props.label || undefined}>
			<Switch.Thumb className={style.thumb} />
		</Switch.Root>
	)
	if(!props.label) return SwitchElem;
	return <div className={style.root} style={props.style}>
		{SwitchElem}
		<div className={classNames(style.label, props.labelClassName)} style={props.labelStyle} onClick={()=>{
			if(props.onChange) props.onChange(!props.checked);
		}}>{props.label}</div>
	</div>
}

export default Checkbox;