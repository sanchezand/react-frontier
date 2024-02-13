import React, { useEffect, useState } from 'react';
import { randomRange } from './Util';

interface PlaceholderProps{
	width?: number,
	minWidth?: number,
	height?: number,
	value?: any,
	random?: boolean,
	check?: boolean,
	style?: React.CSSProperties,
	variance?: number,
}

var Placeholder = (props: PlaceholderProps)=>{
	var variance = props.variance || 80;
	var [random, setRandom] = useState(randomRange(Math.floor(variance*0.3), Math.ceil(variance*0.7)));

	useEffect(()=>{
		setRandom(randomRange(Math.floor(variance*0.3), Math.ceil(variance*0.7)));
	}, [props.variance]);

	var width = (props.width || 100) + (props.random!==false ? random : 0);
	if(typeof props.minWidth!=='undefined'){
		width = Math.max(props.minWidth, width);
	}
	var height = props.height || 18;
	var value = props.value;

	if((value || value===0) && (typeof props.check==='undefined' || props.check)){
		return value;
	}else{
		return <div className="fr placeholder" style={{
			display: 'inline-block',
			backgroundColor: 'rgb(234, 234, 234)',
			borderRadius: height,
			width, height,
			marginBottom: -4,
			...props.style,
		}}></div>
	}

}

export default Placeholder;