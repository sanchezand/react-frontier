import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { randomRange } from './Util';
import classNames from 'classnames';
import style from '../style/placeholder.module.scss';

interface PlaceholderProps{
	width?: number,
	minWidth?: number,
	height?: number,
	block?: boolean,
	value?: any,
	random?: boolean,
	check?: boolean,
	style?: React.CSSProperties,
	color?: string,
	className?: string,
	variance?: number,
}

var Placeholder = (props: PlaceholderProps)=>{
	var {
		width: propWidth,
		height: propHeight,
		minWidth,
		block,
		value,
		random: propRandom,
		check,
		style: propStyle,
		color: propColor,
		className,
		variance: propVariance,
		...restProps
	} = props;

	var variance = props.variance || 100;
	var random = useMemo(()=>{
		return randomRange(Math.floor(variance*0.1), Math.ceil(variance*0.9))
	}, [props.variance]);

	var placeholder_height = props.height || 18;
	var placeholder_width = (props.width || 80) + (props.random!==false ? random : 0);
	if(typeof props.minWidth!=='undefined') placeholder_width = Math.max(props.minWidth, placeholder_width);

	var value = props.value;

	if((value || value===0) && (typeof props.check==='undefined' || props.check)){
		return value;
	}else{
		return <div
			className={classNames('fr placeholder', props.className, style.placeholder)}
			style={{
				'--placeholder-height': `${placeholder_height}px`,
				'--placeholder-width': `${placeholder_width}px`,
				...props.style,
			} as CSSProperties}
			data-block={props.block || undefined}
			{...restProps}
		>
		</div>
	}

}

export default Placeholder;