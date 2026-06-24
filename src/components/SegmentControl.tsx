import React, { useEffect, useState } from 'react';
import { Tabs } from '@base-ui/react';
import { FrontierColors } from './Classes';
import style from '../style/segments.module.scss';
import classNames from 'classnames';

interface SegmentControlProps{
	selected: number[] | number,
	className?: string,
	style?: React.CSSProperties,
	segmentStyle?: React.CSSProperties,
	color?: FrontierColors,
	divided?: boolean,
	segments: {
		value: number,
		text: string,
	}[],
	onClick: (ix: number)=>void,
}

var SegmentControl = (props: SegmentControlProps)=>{
	var {
		selected,
		className,
		style: propsStyle,
		segmentStyle,
		color,
		divided,
		segments,
		onClick,
		...restProps
	} = props;

	var is_array = Array.isArray(props.selected);
	if(is_array){
		return <div className={classNames(style.list, props.className)} data-multiple data-color={props.color || 'black'} style={props.style} data-divided={props.divided!==false || undefined} {...restProps}>
			{props.segments && props.segments.map(a=>(
				<div className={style.segment} style={props.segmentStyle} data-active={(props.selected as number[]).indexOf(a.value)!=-1 || undefined} onClick={props.onClick ? ()=>props.onClick(a.value) : null}>
					{a.text}
				</div>
			))}
		</div>
	}

	return <Tabs.Root value={props.selected} onValueChange={v=>{
		props.onClick(v)
	}}>
		<Tabs.List className={classNames(style.list, props.className)} style={props.style} data-color={props.color || 'black'} data-divided={props.divided!==false || undefined} {...restProps}>
			{props.segments && props.segments.map(a=>(
				<Tabs.Tab value={a.value} render={<div />} style={props.segmentStyle} className={style.segment}>
					{a.text}
				</Tabs.Tab>
			))}
			{props.segments && props.segments.length>0 ? (
				<Tabs.Indicator className={style.indicator} />
			) : null}
		</Tabs.List>
	</Tabs.Root>
}

export default SegmentControl;