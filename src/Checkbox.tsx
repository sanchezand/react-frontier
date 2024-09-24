import React, { useRef } from 'react';
import classNames from 'classnames';

interface CheckboxProps{
	label?: string,
	checked?: boolean,
	onChange?: (val: boolean)=>void,
	style?: React.CSSProperties,
	labelStyle?: React.CSSProperties,
	className?: string,
	labelClassName?: string,
	color?: 'green' | 'red' | 'purple' | 'black' | 'blue' | 'orange' | 'white' | 'yellow',
}

var Checkbox = (props: CheckboxProps)=>{
	var inputRef = useRef<HTMLInputElement>(null);

	var toggleCheckbox = ()=>{
		if(props.onChange) props.onChange(!props.checked);
		inputRef.current?.select();
		inputRef.current?.focus();
	}
	
	return <div className={classNames('fr checkbox', {
		checked: props.checked
	}, props.color, props.className)} style={props.style}>
		<input ref={inputRef} type="checkbox" checked={props.checked} onChange={toggleCheckbox} />
		<label onClick={toggleCheckbox} className={props.labelClassName} style={props.labelStyle}>{props.label}</label>
	</div>
}

export default Checkbox;