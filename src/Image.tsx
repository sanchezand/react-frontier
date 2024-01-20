import React, { useEffect, useState } from 'react';

interface ImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
	hideOnFail?: boolean,
	fallback?: string
}
var Image = (props: ImageProps)=>{
	var { hideOnFail, fallback, ...restProps } = props;
	var [error, setError] = useState<boolean>(false);
	var [fallbackError, setFallbackError] = useState<boolean>(false);
	var handleError = (ev: React.SyntheticEvent<HTMLImageElement, Event>)=>{
		if(fallback){
			if(error){
				ev.currentTarget.src = null;
				setFallbackError(true);
			}else{
				ev.currentTarget.src = fallback;
			}
		}
		setError(true);
	}

	useEffect(()=>{
		setError(false);
	}, [props.src]);
	
	if(hideOnFail && error) return null;
	return <img onClick={props.onClick} onError={handleError} {...restProps} />
}

export default Image;