import React, { useEffect, useState } from 'react';
import { randomRange } from './Util';

interface PlaceholderProps{
	width?: number,
	height?: number,
	value?: any,
	random?: boolean,
	check?: boolean,
	style?: React.CSSProperties,
}

var Placeholder = (props: PlaceholderProps)=>{
	var [random, setRandom] = useState(randomRange(-20, 50))

	var width = (props.width || 100) + (props.random!==false ? random : 0);
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