import React, { ElementType, PropsWithChildren, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import Icon, { IconName } from './Icon';

const MODAL_CONTAINER_CLICK_EVENT = 'react-frontier-modal-container-click'

interface ModalContentProps extends PropsWithChildren{
	shown?: boolean,
	className?: string,
	style?: React.CSSProperties,
}
var ModalContent = (props: ModalContentProps)=>{
	if(props.shown===false) return null;
	return <div className={classNames('content', props.className)} style={props.style}>
		{props.children}
	</div>
}

interface ModalHeaderProps extends PropsWithChildren{
	className?: string,
	actions?: JSX.Element,
	text?: string,
	style?: React.CSSProperties,
	textStyle?: React.CSSProperties,
	actionsStyle?: React.CSSProperties,
}
var ModalHeader = (props: ModalHeaderProps)=>{
	return <div className={classNames('header', props.className)} style={props.style}>
		<div className="text" style={props.textStyle}>{props.children || props.text}</div>
		{!!props.actions && (
			<div className="actions" style={props.actionsStyle}>{props.actions}</div>
		)}
	</div>
}

interface ModalActionsProps extends PropsWithChildren{
	className?: string,
	style?: React.CSSProperties,
}
var ModalActions = (props: ModalActionsProps)=>{
	return <div className={classNames("actions", props.className)} style={props.style}>
		{props.children}
	</div>
}

interface ModalToolbarProps extends PropsWithChildren{
	className?: string,
	style?: React.CSSProperties,
}
var ModalToolbar = (props: ModalToolbarProps)=>{
	return <div className={classNames('toolbar', props.className)} style={props.style}>
		{props.children}
	</div>
}

const defaultItemElement = 'div';
type ModalToolbarItemProps<E extends ElementType> = {
	as?: E,
	text?: string,
	onClick?: ()=>void,
	disabled?: boolean,
	icon?: IconName,
	className?: string,
	style?: React.CSSProperties,
} & React.ComponentPropsWithoutRef<E> & PropsWithChildren;

function ModalToolbarItem<E extends ElementType = typeof defaultItemElement>(props: ModalToolbarItemProps<E>){
	var { text, onClick, icon, className, as, children, style, ...restProps } = props;

	var contents = children ? children : <>
		{!!icon && <Icon name={props.icon} style={!text || text.length==0 ? { marginRight: 0 } : null} />}
		{text}
	</>

	var item_class = classNames("item", className, {
		disabled: props.disabled
	});
	var Component = as ?? 'div';
	return <Component className={item_class} onClick={props.onClick} style={style} {...restProps}>{contents}</Component>
}

type ModalSubComponents = {
	Header: typeof ModalHeader,
	Actions: typeof ModalActions,
	Content: typeof ModalContent,
	Toolbar: typeof ModalToolbar,
	ToolbarItem: typeof ModalToolbarItem,
}

type ModalSize = 'large' | 'normal' | 'small' | 'tiny' | 'mini';
interface ModalProps extends PropsWithChildren{
	open?: boolean,
	size?: ModalSize,
	className?: string,
	onClose?: (v: any)=>void,
}

const Modal : React.FC<ModalProps> & ModalSubComponents = (props: ModalProps)=>{
	var modalRef = useRef<HTMLDivElement>(null);
	var rootElem = document.querySelector('body > .fr.modals');
	var [exceeds, setExceeds] = useState<boolean>(false);

	useEffect(()=>{
		if(!props.open && rootElem){
			if(rootElem.children.length==0){
				rootElem.classList.remove('active');
			}
		}else if(props.open && rootElem){
			rootElem.classList.add('active');
		}
		if(exceeds){
			rootElem.classList.add('exceeds')
		}else if(props.open){
			rootElem.classList.remove('exceeds')
		}
		if(props.open && props.onClose){
			window.addEventListener(MODAL_CONTAINER_CLICK_EVENT, closeModal);
		}
		return ()=>{
			if(props.open && props.onClose){
				window.removeEventListener(MODAL_CONTAINER_CLICK_EVENT, closeModal);
			}
		}
	}, [props.open, props.onClose, exceeds]);

	useEffect(()=>{
		if(modalRef.current && props.open){
			var rect = modalRef.current.getBoundingClientRect();
			var padding = 20;
			var height = rect.height, view_height = window.innerHeight;
			setExceeds(height>(view_height-(padding*2)));
		}
	}, [modalRef.current, props.open]);

	useEffect(()=>{
		// On unmount, check if all modals are closed
		return ()=>{
			if(rootElem && rootElem.children.length==0){
				rootElem.classList.remove('active');
			}
		}
	}, []);

	var closeModal = ()=>{
		if(props.open && props.onClose) props.onClose(null);
	}
	
	if(!props.open) return null;
	if(!rootElem){
		rootElem = document.createElement('div');
		rootElem.className = 'fr modals';
		(rootElem as any).onmouseup = function(e: any){
			if(e.target===rootElem){
				window.dispatchEvent(new Event(MODAL_CONTAINER_CLICK_EVENT));
			}
		}
		document.body.append(rootElem);
	}

	return createPortal((
		<div ref={modalRef} className={classNames("fr modal", props.size, props.className, {
			exceeds,
		})}>
			{props.children}
		</div>
	), rootElem);
}

Modal.Actions = ModalActions;
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Toolbar = ModalToolbar;
Modal.ToolbarItem = ModalToolbarItem;

export default Modal;