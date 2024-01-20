import classNames from 'classnames';
import React, { ElementType, PropsWithChildren, useEffect, useState } from 'react';
import { randomRange } from './Util';
import { PolymorphicProps } from 'Classes';


type TableCellProps<E extends ElementType = null> = PolymorphicProps<E> & {
	className?: string,
	children?: React.ReactNode | string,
	collapsing?: boolean,
	centered?: boolean,
	colSpan?: number,
	row?: boolean,
	compact?: boolean,
	style?: React.CSSProperties,
	empty?: boolean,
}

const TableCell : React.FC<TableCellProps> = (props: TableCellProps)=>{
	var {
		className,
		children,
		collapsing,
		centered,
		colSpan,
		row,
		compact,
		style,
		empty,
		as,
		...restProps
	} = props
	const Component : ElementType = props.as || null;

	var Element = (
		<td 
			colSpan={colSpan} 
			style={style} 
			className={classNames(className, {
				collapsing: collapsing,
				compact: compact || props.as==='a',
				empty: empty,
				centered: centered,
			})}
		>
			{Component ? (
				<Component {...restProps}>{children}</Component>
			) : children}
		</td>
	)
	return props.row ? <tr>{Element}</tr> : Element
}

type TableRowProps<E extends ElementType = null> = PolymorphicProps<E> & {
	style?: React.CSSProperties,
	selectable?: boolean,
	collapsingIndexes?: number[],
	centeredIndexes?: number[],
	onClick?: (v: any, i: number)=>any,
	data?: any[]
	header?: boolean,
	empty?: boolean,
	details?: boolean,
	compact?: boolean,
}

const TableRow : React.FC<TableRowProps> = (props: TableRowProps)=>{
	var [id, setId] = useState<number>(randomRange(0, 2563682));
	var {
		style,
		selectable,
		collapsingIndexes,
		centeredIndexes,
		onClick,
		data,
		header,
		empty,
		details,
		compact,
		as,
		...restProps
	} = props;

	var childs = (Array.isArray(props.children) ? props.children : [props.children]).map((a,i)=>{
		if(React.isValidElement(a)){
			return React.cloneElement(a, { 
				...(a.props as any),
				as: (a.props as any).as || props.as,
				...restProps
			} as unknown)
		}
	});

	const Component : ElementType = props.as || null;

	return <tr style={props.style} className={classNames({
		noselect: selectable===false,
		selectable: selectable,
		compact: compact || props.as==='a',
		empty: empty,
		header: header,
		details: details,
	})}>
		{data && data.map((b, bi)=>(
			<td key={`TD-${id}-${bi}`} className={classNames({
				collapsing: collapsingIndexes && collapsingIndexes.indexOf(bi)!=-1,
				centered: centeredIndexes && centeredIndexes.indexOf(bi)!=-1,
			})}>
				{Component ? (
					<Component {...restProps}>{b}</Component>
				) : b}
			</td>
		))}
		{childs}
	</tr>
}

const TableRowDivider : React.FC = ()=>{
	return <tr className='divider'>
		<td colSpan={999}></td>
	</tr>
}

type TableSubComponents = {
	Cell: typeof TableCell,
	Row: typeof TableRow,
	Divider: typeof TableRowDivider,
}

interface TableProps extends PropsWithChildren{
	striped?: boolean,
	divided?: boolean,
	details?: boolean,
	fitted?: boolean,
	className?: string,
	headers?: any[]
	emptyText?: string,
	title?: string,
	titleSmall?: boolean,
	titleCentered?: boolean,
	selectable?: boolean,
	collapsingIndexes?: number[],
	centeredIndexes?: number[],
	onClick?: (v: any[], i: number)=>any,
	rowUrl?: (v: any[], i: number)=>string,
	linkTarget?: '_self' | '_blank' | '_parent' | '_top',
	data?: any[][]
	footer?: any,
	style?: React.CSSProperties,
	button?: JSX.Element,
	actions?: React.ReactNode,
}

const Table : React.FC<TableProps> & TableSubComponents = (props: TableProps)=>{
	var [id, setId] = useState<number>(randomRange(0, 256682));

	var clickRow = (a: any, i: number)=>{
		return ()=>{
			if(props.onClick) props.onClick(a, i);
		}
	}

	var colspan = props.headers ? props.headers.length : (props.data && props.data.length>0 ? props.data[0].length : 999);
	
	return <table className={classNames("fr table", props.className, {
		striped: props.striped,
		divided: props.divided,
		details: props.details,
		fitted: props.fitted,
		selectable: props.selectable,
	})} style={props.style}>
		<thead>
			{!!props.title && (
				<tr>
					<th className={classNames('title', {
						small: props.titleSmall,
						button: !!props.button,
					})} colSpan={colspan}>
						<div style={{ display: 'flex', flexDirection: 'row', justifyContent: props.titleCentered ? 'center' : 'space-between', alignItems: 'center', }}>
							{props.title}
							{props.button}
						</div>
					</th>
				</tr>
			)}
			{props.headers && props.headers.length>0 && (
				<tr>
					{props.headers.map((a,i)=>(
						<th className={classNames({
							collapsing: props.collapsingIndexes && props.collapsingIndexes.indexOf(i)!=-1,
							centered: props.centeredIndexes && props.centeredIndexes.indexOf(i)!=-1
						})} key={`TH-${id}-${i}`}>{a}</th>
					))}
				</tr>
			)}
		</thead>
		<tbody>
			{props.children}
			{props.data && props.data.length>0 ? props.data.map((a,i)=>{
				var url = (a!==null && a.length>0 && props.rowUrl) ? props.rowUrl(a, i) : null;
				return (
					<tr key={`TR-${id}-${i}`} className={classNames({ 
						divider: a===null || a.length==0,
						selectable: !!url,
						compact: !!url,
					})} onClick={clickRow(a, i)}>
						{(a===null || a.length===0) ? (
							new Array(props.headers ? props.headers.length : (props.details ? 2 : 1)).fill('a').map((d,bi)=>(
								<td key={`TD-${id}-${i}${bi}`}></td>
							))
						) : a.map((b, bi)=>(
							<td key={`TD-${id}-${i}${bi}`} className={classNames({
								collapsing: props.collapsingIndexes && props.collapsingIndexes.indexOf(bi)!=-1,
								centered: props.centeredIndexes && props.centeredIndexes.indexOf(bi)!=-1
							})}>
								{url ? (
									<Link to={url} target={props.linkTarget}>{b}</Link>
								) : b}
							</td>
						))}
					</tr>
				)
			}) : props.emptyText ? (
				<tr>
					<td className='empty' colSpan={colspan}>{props.emptyText}</td>
				</tr>
			) : null}
		</tbody>
		{(props.footer || props.actions) && (
			<tfoot>
				{!!props.footer && (
					<tr>
						<td colSpan={colspan}>{props.footer}</td>
					</tr>
				)}
				{!!props.actions && (
					<tr>
						<td colSpan={colspan} className='actions'>
							{props.actions}
						</td>
					</tr>	
				)}
			</tfoot>	
		)}
	</table>
}

Table.Cell = TableCell;
Table.Row = TableRow;
Table.Divider = TableRowDivider;

export default Table;