import { Popover } from '@base-ui/react';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import style from '../style/popup.module.scss';
import classNames from 'classnames';

interface PopupProps extends PropsWithChildren{
	trigger: any,
	style?: React.CSSProperties,
	basic?: boolean,
	containWidth?: boolean,
	containHeight?: boolean,
	className?: string,	
}

var Popup = (props: PopupProps)=>{
	useEffect(()=>{
		
	}, []);
	
	return <Popover.Root>
		<Popover.Trigger render={props.trigger} />
		<Popover.Portal>
			<Popover.Positioner sideOffset={8}>
				<Popover.Popup 
					className={classNames(style.popup, props.className)} 
					style={props.style} 
					data-basic={props.basic || undefined}
					data-contain-width={props.containWidth || undefined}
					data-contain-height={props.containHeight || undefined}
				>
					{props.children}
				</Popover.Popup>
			</Popover.Positioner>
		</Popover.Portal>
	</Popover.Root>
}

export default Popup;