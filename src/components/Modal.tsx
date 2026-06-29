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
	var { shown, className, style: propsStyle, ...restProps } = props;
	if(props.shown===false) return null;
	return <div className={classNames("content", style.content, props.className)} style={props.style} {...restProps}>
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
	var {
		className,
		actions,
		actionsStyle,
		children,
		style: propsStyle,
		text,
		textStyle,
		...restProps
	} = props;
	return <div className={classNames("header", style.header, props.className)} style={props.style} {...restProps}>
		<div className={classNames("test", style.text)} style={props.textStyle}>{props.children || props.text}</div>
		{!!props.actions && (
			<div className={classNames("actions", style.actions)} style={props.actionsStyle}>{props.actions}</div>
		)}
	</div>
}

interface ModalActionsProps extends PropsWithChildren{
	className?: string,
	style?: React.CSSProperties,
}
var ModalActions = (props: ModalActionsProps)=>{
	var { className, style: propsStyle, ...restProps } = props;
	return <div className={classNames(style.actions, props.className)} style={props.style} {...restProps}>
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

var ModalInput = (props: InputProps)=>{
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
	var {
		open,
		children,
		className,
		onClose,
		size,
		...restProps
	} = props;
	return <Dialog.Root open={props.open} onOpenChange={(o, ev)=>{
		if(!o && props.onClose) return props.onClose(o);
	}}>
		<Dialog.Portal className={style.root}>
			<Dialog.Backdrop className={style.backdrop} />
			<Dialog.Viewport className={style.viewport}>
				<ScrollArea.Root style={{ position: undefined }} className={style.scrollViewport}>
					<ScrollArea.Viewport className={style.scrollViewport}>
						<ScrollArea.Content className={style.scrollContent}>
							<Dialog.Popup className={classNames(style.modal, props.className)} data-size={props.size} {...restProps}>
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