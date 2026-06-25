import classNames from 'classnames';
import React, { PropsWithChildren, useMemo } from 'react';
import { randomRange } from './Util';
import style from '../style/table.module.scss';

type TableColors = 'red' | 'green' | 'yellow';

type TableCellProps<E extends React.ElementType=any> = {
	as?: E,
	className?: string,
	children?: React.ReactNode | string,
	collapsing?: boolean,
	centered?: boolean,
	colSpan?: number,
	rowSpan?: number,
	row?: boolean,
	header?: boolean,
	compact?: boolean,
	value?: any,
	style?: React.CSSProperties,
	empty?: boolean,
	color?: TableColors,
	onClick?: ()=>void,
} & React.ComponentPropsWithoutRef<E>;

const TableCell : React.FC<TableCellProps> = (props: TableCellProps)=>{
	var {
		className,
		children,
		collapsing,
		centered,
		colSpan,
		rowSpan,
		row,
		compact,
		style: compStyle,
		onClick,
		empty,
		as,
		value,
		color,
		header,
		...restProps
	} = props
	const CellElement = props.header ? 'th' : 'td';
	const Component : React.ElementType = props.as || null;

	var Element = (
		<CellElement
			colSpan={colSpan}
			rowSpan={rowSpan}
			style={props.style} 
			onClick={onClick}
			className={props.className}
			color={props.color || undefined}
			data-collapsing={props.collapsing || undefined}
			data-compact={(compact || props.as==='a') || undefined}
			data-normal={compact===false || undefined}
			data-empty={props.empty || undefined}
			data-centered={props.centered || undefined}
		>
			{Component ? (
				<Component {...restProps}>
					{value}
					{children}
				</Component>
			) : <>
				{value}
				{children}
			</>}
		</CellElement>
	)
	return row ? <tr>{Element}</tr> : Element
}

type TableRowProps<E extends React.ElementType = any> = {
	as?: E,
	style?: React.CSSProperties,
	className?: string,
	selectable?: boolean,
	collapsingIndexes?: number[],
	centeredIndexes?: number[],
	onClick?: ()=>any,
	data?: any[]
	header?: boolean,
	empty?: boolean,
	details?: boolean,
	compact?: boolean,
	color?: TableColors,
} & React.ComponentPropsWithoutRef<E>;

const TableRow : React.FC<TableRowProps> = (props: TableRowProps)=>{
	var {
		style: compStyle,
		selectable,
		className,
		collapsingIndexes,
		centeredIndexes,
		onClick,
		data,
		header,
		empty,
		details,
		compact,
		as,
		children,
		color,
		...restProps
	} = props;
	var id = useMemo(()=>{
		return randomRange(0, 256682)
	}, []);

	var childs = (Array.isArray(children) ? children : [children]).map((a,i)=>{
		if(React.isValidElement(a)){
			return React.cloneElement(a, { 
				...restProps,
				key: `TD-TC-${id}-${i}`,
				...(a.props as any),
				as: (a.props as any).as || props.as,
			} as unknown)
		}
	});

	const Component : React.ElementType = props.as || null;

	return <tr
		style={props.style} 
		data-noselect={selectable===false || undefined}
		data-selectable={!!selectable || undefined}
		data-compact={compact || undefined}
		data-normal={compact===false || undefined}
		data-empty={empty || undefined}
		data-header={header || undefined}
		data-details={details || undefined}
		color={props.color || undefined}
		className={className}
		onClick={onClick}>
		{data && data.map((b, bi)=>{
			var ComponentRender = Component ? <Component {...restProps}>{b}</Component> : b;
			return (
				<td 
					key={`TD-${id}-${bi}`} 
					data-collapsing={collapsingIndexes && collapsingIndexes.indexOf(bi)!=-1 || undefined}
					data-centered={centeredIndexes && centeredIndexes.indexOf(bi)!=-1 || undefined}
				>
					{ComponentRender}
				</td>
			)
		})}
		{childs}
	</tr>
}

interface TableRowDividerProps extends React.PropsWithChildren{
	rowStyle?: React.CSSProperties,
	cellStyle?: React.CSSProperties,
	header?: boolean,
	text?: string,
}

const TableRowDivider : React.FC<TableRowDividerProps> = (props: TableRowDividerProps)=>{
	return <tr className={classNames(style.divider, {
		header: props.header
	})} style={props.rowStyle}>
		<td colSpan={999} style={props.cellStyle}>{props.children || props.text}</td>
	</tr>
}

interface TableSubComponentProps extends PropsWithChildren{
	className?: string,
	data?: any[][],
	style?: React.CSSProperties
	collapsingIndexes?: number[],
	centeredIndexes?: number[],
}

interface TableHeaderProps{
	title?: string,
	titleSize?: 'small' | 'normal' | 'big',
	titleCentered?: boolean,
	titleRight?: any,
}
const TableHeader = (props: TableSubComponentProps & TableHeaderProps)=>{
	var { centeredIndexes, children, className, collapsingIndexes, data, style: propStyle, title, titleCentered, titleRight, titleSize, ...restProps } = props;
	var id = useMemo(()=>{
		return randomRange(0, 256682)
	}, []);
	return <thead className={props.className} style={props.style} {...restProps}>
		{!!props.title && (
			<tr>
				<th 
					className={classNames('title', style.title)} 
					data-size={props.titleSize || undefined}
					data-button={props.titleRight || undefined} 
					colSpan={1000}
				>
					<div className={style.titleContent} data-centered={props.titleCentered || undefined}>
						{props.title}
						{props.titleRight}
					</div>
				</th>
			</tr>
		)}
		{props.data && props.data.map((a, r)=>(
			<tr key={`TH-${id}-${r}`}>
				{a.map((b, i)=>(
					<th 
						key={`TH-${id}-${i}`} 
						data-normal={(!!props.title && r==0 && i==0) || undefined}
						data-collapsing={(!!props.collapsingIndexes && props.collapsingIndexes.indexOf(i)!=-1) || undefined}
						data-centered={(!!props.centeredIndexes && props.centeredIndexes.indexOf(i)!=-1) || undefined}
					>{b}</th>
				))}
			</tr>
		))}
		{props.children}
	</thead>
}
const TableBody = (props: TableSubComponentProps)=>{
	var { centeredIndexes, children, className, collapsingIndexes, data, style, ...restProps } = props;
	var id = useMemo(()=>{
		return randomRange(0, 256682)
	}, []);
	return <tbody className={props.className} style={props.style} {...restProps}>
		{props.data && props.data.map((a, r)=>(
			<tr key={`TB-${id}-${r}`}>
				{a.map((b, i)=>(
					<td 
						key={`TB-${id}-${i}`} 
						data-collapsing={(!!props.collapsingIndexes && props.collapsingIndexes.indexOf(i)!=-1) || undefined}
						data-centered={(!!props.centeredIndexes && props.centeredIndexes.indexOf(i)!=-1) || undefined}
					>{b}</td>
				))}
			</tr>
		))}
		{props.children}
	</tbody>
}

interface TableFootProps extends TableSubComponentProps{
	actions?: any,
	actionsStyle?: React.CSSProperties,
}
const TableFooter = (props: TableFootProps)=>{
	var {
		actions,
		actionsStyle,
		centeredIndexes,
		children,
		className,
		collapsingIndexes,
		data,
		style: propsStyle,
		...restProps
	} = props;
	var id = useMemo(()=>{
		return randomRange(0, 256682)
	}, []);
	return <tfoot className={props.className} style={props.style} {...restProps}>
		{props.data && props.data.map((a, r)=>(
			<tr key={`TF-${id}-${r}`}>
				{a.map((b, i)=>(
					<td
						key={`TF-${id}-${i}`} 
						data-collapsing={(!!props.collapsingIndexes && props.collapsingIndexes.indexOf(i)!=-1) || undefined}
						data-centered={(!!props.centeredIndexes && props.centeredIndexes.indexOf(i)!=-1) || undefined}
					>{a}</td>
				))}
			</tr>
		))}
		{!!props.actions && (
			<tr>
				<td className={style.actions} style={props.actionsStyle} colSpan={999}>
					{props.actions}
				</td>
			</tr>
		)}
		{props.children}
	</tfoot>
}

type TableSubComponents = {
	Head: typeof TableHeader,
	Body: typeof TableBody,
	Footer: typeof TableFooter,
	Cell: typeof TableCell,
	Row: typeof TableRow,
	Divider: typeof TableRowDivider,
}

interface TableProps extends PropsWithChildren{
	striped?: boolean,
	divided?: boolean,
	celled?: boolean,
	details?: boolean,
	fitted?: boolean,
	className?: string,
	selectable?: boolean,
	bordered?: boolean,
	style?: React.CSSProperties,
}

const Table : React.FC<TableProps> & TableSubComponents = (props: TableProps)=>{
	var {
		striped,
		divided,
		celled,
		details,
		fitted,
		className,
		selectable,
		bordered,
		style: propsStyle,
		...restProps
	} = props;
	return <table 
		style={props.style}
		className={classNames('fr2 table', style.table, props.className)} 
		data-bordered={props.bordered}
		data-striped={props.striped!==false || undefined}
		data-divided={props.divided || undefined}
		data-celled={props.celled || undefined}
		data-details={props.details || undefined}
		data-fitted={props.fitted || undefined}
		data-selectable={props.selectable || undefined}
		{...restProps}
	>
		{props.children}
	</table>
}

Table.Head = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Cell = TableCell;
Table.Row = TableRow;
Table.Divider = TableRowDivider;

export default Table;