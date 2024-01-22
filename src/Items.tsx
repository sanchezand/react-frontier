import React from 'react';
import classNames from 'classnames';

export interface ItemsProps<T>{
	data: Array<T>,
	render: (item: T)=>JSX.Element,
	keyExtractor: (item: T)=>any,
	valueExtractor?: (item: T)=>any,
	selectable?: boolean,
	striped?: boolean,
	toggle?: boolean,
	selected?: any | any[],
	single?: boolean,
	onToggle?: (selected: any)=>void,
	onSelected?: (selected: T)=>void,
	style?: React.CSSProperties,
	itemStyle?: React.CSSProperties,
	toggleIconStyle?: React.CSSProperties,
}

function Items<T>(props: ItemsProps<T>){
	var onClick = (val: T)=>{
		return (ev: React.MouseEvent)=>{
			if(props.onSelected) props.onSelected(val);
			if(!props.valueExtractor || !props.onToggle) return;
			var real_val = props.valueExtractor(val);
			if(props.single){
				props.onToggle(real_val);
			}else{
				var sel = [...(props.selected || [])];
				var ix = sel.indexOf(real_val);
				if(ix==-1){
					sel.push(real_val)
				}else{
					sel.splice(ix, 1);
				}
				props.onToggle(sel);
			}
		}
	}

	return <div style={props.style} className={classNames('fr items', {
		selectable: props.selectable,
		striped: props.striped
	})}>
		{props.data.map(a=>(
			<div className="item" style={props.itemStyle} key={props.keyExtractor(a)} onClick={onClick(a)}>
				{props.toggle ? (
					<i className={`circle ${props.valueExtractor && (typeof props.selected!=='undefined') && (props.single ? (props.selected==props.valueExtractor(a)) : (props.selected.indexOf(props.valueExtractor(a))>-1)) ? 'check' : 'outline'} icon`} style={props.toggleIconStyle}></i>
				) : null}
				{props.render(a)}
			</div>
		))}
	</div>
}

export default Items;