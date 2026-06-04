import classNames from 'classnames';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { randomRange } from './Util';
import style from '../style/table.module.scss';

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
					>{a}</td>
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
	style?: React.CSSProperties,
}

const Table : React.FC<TableProps> & TableSubComponents = (props: TableProps)=>{
	return <table 
		style={props.style}
		className={classNames(style.table, props.className)} 
		data-striped={props.striped!==false || undefined}
		data-divided={props.divided || undefined}
		data-celled={props.celled || undefined}
		data-details={props.details || undefined}
		data-fitted={props.fitted || undefined}
		data-selectable={props.selectable || undefined}
	>
		{props.children}
	</table>
	// var [id, setId] = useState<number>(randomRange(0, 256682));

	// var clickRow = (a: any, i: number)=>{
	// 	return ()=>{
	// 		if(props.onClick) props.onClick(a, i);
	// 	}
	// }

	// var colspan = props.headers ? props.headers.length : (props.data && props.data.length>0 ? props.data[0].length : 999);
	
	// return <table className={classNames("fr2 table", props.className, {
	// 	striped: props.striped,
	// 	divided: props.divided,
	// 	details: props.details,
	// 	celled: props.celled,
	// 	fitted: props.fitted,
	// 	selectable: props.selectable,
	// })} style={props.style}>
	// 	<thead>
	// 		{!!props.title && (
	// 			<tr>
	// 				<th className={classNames('title', {
	// 					button: !!props.button,
	// 				}, props.titleSize)} colSpan={colspan}>
	// 					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: props.titleCentered ? 'center' : 'space-between', alignItems: 'center', }}>
	// 						{props.title}
	// 						{props.button}
	// 					</div>
	// 				</th>
	// 			</tr>
	// 		)}
	// 		{props.headers && props.headers.length>0 && (
	// 			<tr>
	// 				{props.headers.map((a,i)=>(
	// 					<th className={classNames({
	// 						collapsing: props.collapsingIndexes && props.collapsingIndexes.indexOf(i)!=-1,
	// 						centered: props.centeredIndexes && props.centeredIndexes.indexOf(i)!=-1
	// 					})} style={props.headersStyle} key={`TH-${id}-${i}`}>{a}</th>
	// 				))}
	// 			</tr>
	// 		)}
	// 	</thead>
	// 	<tbody>
	// 		{props.children}
	// 		{((props.data && props.data.length===0) || props.empty) ? (
	// 			<tr>
	// 				<td className='empty' style={props.emptyStyle} colSpan={colspan}>{props.emptyText}</td>
	// 			</tr>
	// 		) : props.data ? props.data.map((a,i)=>{
	// 			return (
	// 				<tr key={`TR-${id}-${i}`} className={classNames({ 
	// 					divider: props.nullIsDivider!==false && (a===null || a.length==0),
	// 				})} onClick={clickRow(a, i)}>
	// 					{(a===null || a.length===0) ? (
	// 						new Array(props.headers ? props.headers.length : (props.details ? 2 : 1)).fill('a').map((d,bi)=>(
	// 							<td key={`TD-${id}-${i}${bi}`}></td>
	// 						))
	// 					) : a.map((b, bi)=>(
	// 						<td key={`TD-${id}-${i}${bi}`} className={classNames({
	// 							collapsing: props.collapsingIndexes && props.collapsingIndexes.indexOf(bi)!=-1,
	// 							centered: props.centeredIndexes && props.centeredIndexes.indexOf(bi)!=-1
	// 						})}>
	// 							{b}
	// 						</td>
	// 					))}
	// 				</tr>
	// 			)
	// 		}) : null}
	// 	</tbody>
	// 	{(props.footer || props.actions) && (
	// 		<tfoot>
	// 			{props.footer}
	// 			{!!props.actions && (
	// 				<tr>
	// 					<td colSpan={colspan} className='actions' style={props.actionsStyle}>
	// 						{props.actions}
	// 					</td>
	// 				</tr>	
	// 			)}
	// 		</tfoot>	
	// 	)}
	// </table>
}

Table.Head = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Cell = TableCell;
Table.Row = TableRow;
Table.Divider = TableRowDivider;

export default Table;