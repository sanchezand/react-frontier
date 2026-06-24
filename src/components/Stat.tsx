import React, { ElementType, PropsWithChildren, useState } from 'react';
import classNames from 'classnames';
import style from '../style/stat.module.scss';

const defaultElement = 'div';

interface StatGroupProps extends PropsWithChildren{
	style?: React.CSSProperties,
	className?: string,
}

const StatGroup : React.FC<StatGroupProps> = (props: StatGroupProps)=>{
	var { className, children, style: compStyle, ...restProps } = props;
	return <div className={classNames('fr2 stats', style.group, props.className)} style={props.style} {...restProps}>
		{props.children}
	</div>
}

type StatComponent<E extends ElementType> = {
	style?: React.CSSProperties,
	className?: string,
	text?: any,
	as?: E
} & React.ComponentPropsWithoutRef<E> & React.PropsWithChildren
var StatLabel = <E extends ElementType = typeof defaultElement>(props: StatComponent<E>)=>{
	var { children, as, text, className, style: compStyle, ...restProps } = props;
	const Elem = props.as || defaultElement;
	return <Elem className={classNames('label', style.label, props.className)} style={props.style} {...restProps}>
		{props.text}
		{children}
	</Elem>
}

var StatValue = <E extends ElementType = typeof defaultElement>(props: StatComponent<E>)=>{
	var { children, as, text, className, style: compStyle, ...restProps } = props;
	const Elem = props.as || defaultElement;
	return <Elem className={classNames('value', style.value, props.className)} style={props.style} {...restProps}>
		{props.text}
		{children}
	</Elem>
}

type StatSubComponents = {
	Group: typeof StatGroup,
	Label: typeof StatLabel,
	Value: typeof StatValue
}

interface StatProps extends PropsWithChildren{
	className?: string,
	label?: any,
	value?: any,
	style?: React.CSSProperties
	size?: 'big' | 'small',
}
const Stat : React.FC<StatProps> & StatSubComponents = (props: StatProps)=>{
	var { children, className, size, label, value, style: compStyle, ...restProps } = props;
	return <div className={classNames('fr2 stat', style.stat, className)} style={props.style} data-size={props.size} {...restProps}>
		{props.children}
		{typeof props.value!=='undefined' && (
			<StatValue text={props.value} />
		)}
		{typeof props.label!=='undefined' && (
			<StatLabel text={props.label} />
		)}
	</div>
}

Stat.Group = StatGroup;
Stat.Label = StatLabel;
Stat.Value = StatValue;

export default Stat;