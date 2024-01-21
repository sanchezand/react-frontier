import React, { ElementType, PropsWithChildren, useState } from 'react';
import classNames from 'classnames';
import { randomRange } from './Util';
import { PolymorphicProps } from './Classes'

type TableCellProps<E extends ElementType = any> = PolymorphicProps<E> & {
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
	return row ? <tr>{Element}</tr> : Element
}

type TableRowProps<E extends ElementType = any> = PolymorphicProps<E> & {
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
		children,
		...restProps
	} = props;

	var childs = (Array.isArray(children) ? children : [children]).map((a,i)=>{
		if(React.isValidElement(a)){
			console.log(restProps)
			return React.cloneElement(a, { 
				...(a.props as any),
				as: (a.props as any).as || props.as,
				...restProps
			} as unknown)
		}
	});

	const Component : ElementType = props.as || null;

	return <tr style={style} className={classNames({
		noselect: selectable===false,
		selectable: selectable,
		compact: compact,
		empty: empty,
		header: header,
		details: details,
	})}>
		{data && data.map((b, bi)=>{
			var ComponentRender = Component ? <Component {...restProps}>{b}</Component> : b;
			return (
				<td key={`TD-${id}-${bi}`} className={classNames({
					collapsing: collapsingIndexes && collapsingIndexes.indexOf(bi)!=-1,
					centered: centeredIndexes && centeredIndexes.indexOf(bi)!=-1,
				})}>
					{ComponentRender}
				</td>
			)
		})}
		{childs}
	</tr>
}

interface TableRowDividerProps{
	rowStyle?: React.CSSProperties,
	cellStyle?: React.CSSProperties,
}

const TableRowDivider : React.FC = (props: TableRowDividerProps)=>{
	return <tr className='divider' style={props.rowStyle}>
		<td colSpan={999} style={props.cellStyle}></td>
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
	celled?: boolean,
	details?: boolean,
	fitted?: boolean,
	className?: string,
	headers?: any[],
	headersStyle?: React.CSSProperties,
	emptyText?: string,
	emptyStyle?: React.CSSProperties,
	title?: string,
	titleSize?: 'small' | 'normal' | 'big',
	titleCentered?: boolean,
	selectable?: boolean,
	collapsingIndexes?: number[],
	centeredIndexes?: number[],
	onClick?: (v: any[], i: number)=>any,
	linkTarget?: '_self' | '_blank' | '_parent' | '_top',
	data?: any[][]
	footer?: any,
	style?: React.CSSProperties,
	button?: JSX.Element,
	actions?: React.ReactNode,
	actionsStyle?: React.CSSProperties,
	footerStyle?: React.CSSProperties,
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
		celled: props.celled,
		fitted: props.fitted,
		selectable: props.selectable,
	})} style={props.style}>
		<thead>
			{!!props.title && (
				<tr>
					<th className={classNames('title', {
						button: !!props.button,
					}, props.titleSize)} colSpan={colspan}>
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
						})} style={props.headersStyle} key={`TH-${id}-${i}`}>{a}</th>
					))}
				</tr>
			)}
		</thead>
		<tbody>
			{props.children}
			{props.data && props.data.length>0 ? props.data.map((a,i)=>{
				return (
					<tr key={`TR-${id}-${i}`} className={classNames({ 
						divider: a===null || a.length==0,
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
								{b}
							</td>
						))}
					</tr>
				)
			}) : props.emptyText ? (
				<tr>
					<td className='empty' style={props.emptyStyle} colSpan={colspan}>{props.emptyText}</td>
				</tr>
			) : null}
		</tbody>
		{(props.footer || props.actions) && (
			<tfoot>
				{!!props.footer && (
					<tr>
						<td colSpan={colspan} style={props.footerStyle}>{props.footer}</td>
					</tr>
				)}
				{!!props.actions && (
					<tr>
						<td colSpan={colspan} className='actions' style={props.actionsStyle}>
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