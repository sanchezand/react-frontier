import classNames from 'classnames';
import React, { PropsWithChildren, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';

interface PopupProps extends PropsWithChildren{
	trigger: any,
	popupStyle?: React.CSSProperties,
	popupWidth?: number,
	basic?: boolean,
	containerStyle?: React.CSSProperties,
	className?: string,
	containerClassName?: string,
}

export interface PopupElement{
	close: ()=>void,
	open: ()=>void,
}

var Popup = React.forwardRef((props: PopupProps, ref: Ref<PopupElement>)=>{
	var [shown, setShown] = useState<boolean>(false);
	var popupRef = useRef(null);
	var containerRef = useRef(null);

	useImperativeHandle(ref, ()=>({
		open: ()=>{
			setShown(true);
		},
		close: ()=>{
			setShown(false);
		}
	}), [shown]);

	useEffect(()=>{
		var mdown : any = null;
		if(shown && popupRef.current && containerRef.current){
			mdown = (ev: MouseEvent)=>{
				if(!popupRef.current.contains(ev.target as Node) && !containerRef.current.contains(ev.target as Node)){
					setShown(false);
				}
			}
			document.addEventListener('mousedown', mdown);
		}
		return ()=>{
			if(mdown){
				document.removeEventListener('mousedown', mdown);
			}
		}
	}, [shown, popupRef, containerRef]);

	var showPopup = ()=>{
		if(shown) return;
		setShown(true);
	}

	return <div onClick={showPopup} onFocus={showPopup} ref={containerRef} style={{ position: 'relative', width: 'inherit', ...props.containerStyle }} className={classNames('fr popup-container', props.containerClassName)}>
		{props.trigger}
		{shown && (
			<div className={classNames('fr popup', {
				basic: props.basic
			}, props.className)} ref={popupRef} style={{
				...(props.popupWidth ? { width: props.popupWidth } : {}),
				...props.popupStyle
			}}>
				{props.children}
			</div>
		)}
	</div>
});

export default Popup;