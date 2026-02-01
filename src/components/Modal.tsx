import { Dialog, ScrollArea } from '@base-ui/react';
import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import style from '../style/modal.module.scss';
import classNames from 'classnames';
import Input, { InputProps } from './Input';


interface ModalContentProps extends PropsWithChildren{
	shown?: boolean,
	className?: string,
	style?: React.CSSProperties,
}
var ModalContent = (props: ModalContentProps)=>{
	if(props.shown===false) return null;
	return <div className={classNames(style.content, props.className)} style={props.style}>
		{props.children}
	</div>
}

interface ModalHeaderProps extends PropsWithChildren{
	className?: string,
	actions?: ReactNode,
	text?: string,
	style?: React.CSSProperties,
	textStyle?: React.CSSProperties,
	actionsStyle?: React.CSSProperties,
}
var ModalHeader = (props: ModalHeaderProps)=>{
	return <div className={classNames(style.header, props.className)} style={props.style}>
		<div className={style.text} style={props.textStyle}>{props.children || props.text}</div>
		{!!props.actions && (
			<div className={style.actions} style={props.actionsStyle}>{props.actions}</div>
		)}
	</div>
}

interface ModalActionsProps extends PropsWithChildren{
	className?: string,
	style?: React.CSSProperties,
}
var ModalActions = (props: ModalActionsProps)=>{
	return <div className={classNames(style.actions, props.className)} style={props.style}>
		{props.children}
	</div>
}

// interface ModalDividerProps extends PropsWithChildren{
// 	className?: string,
// 	style?: React.CSSProperties,
// 	centered?: boolean,
// 	text?: string,
// }
// var ModalDivider = (props: ModalDividerProps)=>{
// 	return <div className={classNames("modal-divider", {
// 		centered: props.centered,
// 	}, props.className)} style={props.style}>
// 		{props.text}
// 		{props.children}
// 	</div>
// }

interface ModalInputProps extends InputProps{

}
var ModalInput = (props: ModalInputProps)=>{
	return <Input fluid {...props} className={style.input} />
}

type ModalSubComponents = {
	Header: typeof ModalHeader,
	Actions: typeof ModalActions,
	Content: typeof ModalContent,
	Input: typeof ModalInput
	// Divider: typeof ModalDivider,
}

type ModalSize = 'large' | 'normal' | 'small' | 'tiny' | 'mini';
interface ModalProps extends PropsWithChildren{
	open?: boolean,
	size?: ModalSize,
	className?: string,
	onClose?: (v: any)=>void,
}

const Modal : React.FC<ModalProps> & ModalSubComponents = (props: ModalProps)=>{
	return <Dialog.Root open={props.open} onOpenChange={(o, ev)=>{
		if(!o && props.onClose) return props.onClose(o);
	}}>
		<Dialog.Portal>
			<Dialog.Backdrop className={style.backdrop} />
			<Dialog.Viewport className={style.viewport}>
				<ScrollArea.Root style={{ position: undefined }} className={style.scrollViewport}>
					<ScrollArea.Viewport className={style.scrollViewport}>
						<ScrollArea.Content className={style.scrollContent}>
							<Dialog.Popup className={style.modal} data-size={props.size}>
								{props.children}
							</Dialog.Popup>
						</ScrollArea.Content>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar className={style.scrollbar}>
						<ScrollArea.Thumb className={style.scrollbarHandle} />
					</ScrollArea.Scrollbar>
				</ScrollArea.Root>
			</Dialog.Viewport>
		</Dialog.Portal>
	</Dialog.Root>
}

Modal.Actions = ModalActions;
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Input = ModalInput;

export default Modal;