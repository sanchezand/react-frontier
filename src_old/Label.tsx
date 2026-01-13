import React, { ElementType, PropsWithChildren } from 'react';
import classNames from 'classnames';
import Icon, { IconName } from './Icon'

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
		style,
		children,
		iconName,
		iconStyle,
		...restProps
	} = props;

	const Component = as ?? 'div';

	return <Component className={classNames('fr label', color, size, {
		circular: circle,
		selectable: selectable,
		loading: loading,
	}, className)} style={style} onClick={onClick} {...restProps}>
		{!!iconName && (
			<Icon name={iconName} style={iconStyle} />
		)}
		{value}
		{children}
	</Component>
}

export default Label;