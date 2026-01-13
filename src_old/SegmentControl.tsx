import React, { CSSProperties } from 'react';
import classNames from 'classnames';

interface SegmentControlProps{
	selected: number[],
	className?: string,
	style?: CSSProperties,
	segmentStyle?: CSSProperties,
	color?: 'green' | 'red' | 'purple' | 'black' | 'blue' | 'orange' | 'white' | 'yellow'
	segments: {
		value: number,
		text: string,
	}[],
	onClick: (ix: number)=>void,
}

var SegmentControl = (props: SegmentControlProps)=>{
	return <div className={classNames('fr segments', props.color, props.className)} style={props.style}>
		{props.segments.map(a=>(
			<div onClick={()=>props.onClick(a.value)} className={classNames('segment', {
				active: props.selected.indexOf(a.value)!=-1
			})} key={`SGMT-${a.value}`} style={props.segmentStyle}>{a.text}</div>
		))}
	</div>
}

export default SegmentControl;