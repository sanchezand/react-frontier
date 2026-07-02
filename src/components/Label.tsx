import React, { ElementType, PropsWithChildren } from 'react';
import classNames from 'classnames';
import Icon, { IconName } from './Icon'
import style from '../style/label.module.scss';
import Loader from './Loader';

const defaultElement = 'div';
type LabelColor = 'black' | 'blue' | 'yellow' | 'orange' | 'green' | 'red' | 'transparent';

type LabelProps<E extends ElementType> = PropsWithChildren & {
	as?: E,
	color?: LabelColor,
	size?: 'small' | 'normal'
	circle?: boolean,
	value?: any,
	selectable?: boolean,
	loading?: boolean,
	className?: string,
	onClick?: ()=>void,
	iconName?: IconName,
	iconSolid?: boolean,
	iconStyle?: React.CSSProperties,
	style?: React.CSSProperties,
} & React.ComponentPropsWithoutRef<E>;

var Label = <E extends ElementType = typeof defaultElement>(props: LabelProps<E>)=>{
	var {
		as,
		color,
		size,
		circle,
		value,
		selectable,
		loading,
		className,
		onClick,
		style: propsStyle,
		children,
		iconName,
		iconSolid,
		iconStyle,
		...restProps
	} = props;

	const Component = as ?? 'div';
	return <Component 
		className={classNames('fr2 label', style.label, props.className)}
		onClick={props.onClick}
		style={props.style}
		data-loading={loading || undefined}
		data-circle={props.circle || undefined}
		data-color={color || undefined}
		data-size={size || undefined}
		data-selectable={!!selectable || undefined}
		{...restProps}
	>
		{props.loading ? (
			<Loader inline size={props.size==='small' ? 10 : 15} />
		) : <>
			{!!iconName && (
				<Icon name={iconName} solid={props.iconSolid===false ? undefined : true} style={iconStyle} />
			)}
			{value}
			{children}
		</>}
	</Component>
}

export default Label;