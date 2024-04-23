import React, { useState } from 'react';
import classNames from 'classnames';

export interface StatProps{
	value?: any,
	label?: any,
	className?: string,
	style?: React.CSSProperties
	labelStyle?: React.CSSProperties,
	valueStyle?: React.CSSProperties,
	size?: 'big' | 'small',
	_inGroup?: boolean,
}

interface StatGroupProps extends StatProps{
	children: React.ReactNode[] | React.ReactNode
}

const StatGroup : React.FC<StatGroupProps> = (props: StatGroupProps)=>{
	var [randomCode, setRandomCode] = useState<number>(Math.floor(Math.random()*100000));
	var childs = (Array.isArray(props.children) ? props.children : [props.children]).map((a,i)=>{
		if(React.isValidElement(a)){
			return React.cloneElement(a, {
				...a.props,
				key: `stgr-${randomCode}-${i}`,
				_inGroup: true,
			} as unknown)
		}
	});

	return <div className={classNames('fr stats', props.size)}>
		{childs}
	</div>
}

type StatSubComponents = {
	Group: typeof StatGroup
}

const Stat : React.FC<StatProps> & StatSubComponents = (props: StatProps)=>{
	return (
		<div 
			className={classNames({
				fr: !props._inGroup
			}, props.className, 'stat', props.size)} 
			style={props.style}
		>
			<div className="value" style={props.valueStyle}>{props.value}</div>
			<div className="label" style={props.labelStyle}>{props.label}</div>
		</div>
	)
}

Stat.Group = StatGroup;

export default Stat;