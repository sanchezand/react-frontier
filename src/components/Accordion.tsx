import React, { Children, CSSProperties, PropsWithChildren, ReactElement, ReactNode, useEffect, useState } from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react';
import style from '../style/accordion.module.scss'
import classNames from 'classnames';
import Icon from './Icon';

export interface AccordionItemProps extends PropsWithChildren{
	onSelected?: (value: number, open: boolean)=>(()=>void),
	title: string | ReactNode,
	value?: any,
	className?: string,
	style?: CSSProperties
}
var AccordionItem : React.FC<AccordionItemProps> = (props: AccordionItemProps)=>{
	return <BaseAccordion.Item 
		data-childless={!props.children || undefined}
		className={classNames(style.item, props.className)} 
		style={props.style} 
		value={props.value} 
		onOpenChange={(!!props.value && !!props.onSelected) ? o=>{
			props.onSelected(props.value, o);
		} : null}
	>
		<BaseAccordion.Header className={style.header}>
			<BaseAccordion.Trigger className={style.trigger}>
				<div className={style.headerText}>{props.title}</div>
				<Icon name='caret-down' className={style.headerIcon} />
			</BaseAccordion.Trigger>
		</BaseAccordion.Header>
		{props.children && (
			<BaseAccordion.Panel keepMounted className={style.panel}>
				<div className="content">
					{props.children}
				</div>
			</BaseAccordion.Panel>
		)}
	</BaseAccordion.Item>
}


type AccordionSubComponents = {
	Item: typeof AccordionItem
}

interface AccordionProps extends PropsWithChildren{
	className?: string,
	separate?: boolean,
	striped?: boolean,
	multiple?: boolean,
	style?: React.CSSProperties,
	greyout?: boolean,
	value?: any[],
	onSelected?: (value: number[])=>void,
}

const Accordion : React.FC<AccordionProps> & AccordionSubComponents = (props)=>{
	return <BaseAccordion.Root
		multiple={props.multiple}
		data-striped={props.striped || undefined}
		data-separate={props.separate!==false || undefined}
		className={classNames(style.accordion, props.className)}
		style={props.style}
		value={props.value}
		onValueChange={!!props.onSelected ? v=>{
			props.onSelected(v);
		} : null}
	>
		{props.children}
	</BaseAccordion.Root>
}

Accordion.Item = AccordionItem;

export default Accordion;