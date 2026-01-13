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
		<Switch.Root className={classNames(style.switch, props.className)} style={props.style} data-color={props.color || undefined} checked={props.checked} onCheckedChange={props.onChange}>
			<Switch.Thumb className={style.thumb} />
		</Switch.Root>
	)
	
	return SwitchElem;
}

export default Checkbox;