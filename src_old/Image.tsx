import React, { useEffect, useState } from 'react';

interface ImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
	hideOnFail?: boolean,
	onFallback?: ()=>void,
	fallback?: string,
	fallbackComponent?: any,
}
var Image = (props: ImageProps)=>{
	var { hideOnFail, fallback, fallbackComponent, ...restProps } = props;
	var [error, setError] = useState<boolean>(false);
	var [fallbackError, setFallbackError] = useState<boolean>(false);
	var handleError = (ev: React.SyntheticEvent<HTMLImageElement, Event>)=>{
		if(fallback){
			if(error){
				ev.currentTarget.src = null;
				setFallbackError(true);
			}else{
				if(!fallbackComponent){
					ev.currentTarget.src = fallback;
				}
			}
		}
		if(props.onFallback) props.onFallback();
		setError(true);
	}

	useEffect(()=>{
		setError(false);
	}, [props.src]);
	
	if(hideOnFail && error) return null;
	if(fallbackComponent && error) return fallbackComponent;
	return <img onClick={props.onClick} onError={handleError} {...restProps} />
}

export default Image;