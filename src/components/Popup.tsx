import { Popover } from '@base-ui/react';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import style from '../style/popup.module.scss';
import classNames from 'classnames';

interface PopupProps extends PropsWithChildren{
	trigger: any,
	style?: React.CSSProperties,
	basic?: boolean,
	openOnHover?: boolean,
	containWidth?: boolean,
	containHeight?: boolean,
	className?: string,
	zIndex?: number
}

var Popup = (props: PopupProps)=>{
	return <Popover.Root>
		<Popover.Trigger openOnHover={props.openOnHover} render={props.trigger} />
		<Popover.Portal>
			<Popover.Positioner sideOffset={8} style={{ zIndex: props.zIndex || 1000 }}>
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