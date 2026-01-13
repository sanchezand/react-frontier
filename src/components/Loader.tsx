import React, { CSSProperties, ElementType, useEffect, useState } from 'react';
import style from '../style/loader.module.scss';
import classNames from 'classnames';

interface LoaderProps{
	inline?: boolean,
	size?: number,
	style?: CSSProperties,
}

var Loader = (props: LoaderProps)=>{
	return <div 
		className={style.loader}
		style={props.style}
		data-inline={props.inline || undefined} 
		data-size={props.size ? Math.floor(props.size / 5) * 5 : 20}
	/>
}

export default Loader;