import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';

export interface ItemsProps<T>{
	data: Array<T>,
	render: (item: T, active: boolean)=>JSX.Element,
	valueExtractor?: (item: T)=>any,
	className?: string,
	selectable?: boolean,
	striped?: boolean,
	disabled?: boolean,
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
			if(props.disabled) return;
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

	if(!props.data) return null;

	return <div style={props.style} className={classNames('fr items', props.className, {
		selectable: props.selectable,
		striped: props.striped,
		interacted: props.single ? !!props.selected : (props.selected?.length>0)
	})}>
		{props.data.map((a, i)=>{
			var active = props.valueExtractor && (typeof props.selected!=='undefined') && (props.single ? (props.selected==props.valueExtractor(a)) : (props.selected.indexOf(props.valueExtractor(a))>-1));
			return <div className={classNames("item", {
				active,
			})} style={props.itemStyle} key={`ITMS-I-${props.valueExtractor ? props.valueExtractor(a) : `K${i}`}`} onClick={onClick(a)}>
				{props.toggle ? (
					<Icon name={active ? 'circle-check' : 'circle'} solid={active} style={props.toggleIconStyle} />
				) : null}
				{props.render(a, active)}
			</div>
		})}
	</div>
}

export default Items;