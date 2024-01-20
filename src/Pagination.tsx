import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

interface Props{
	leftIcon?: string,
	rightIcon?: string,
	page: number,
	previewCount?: number,
	pageCount?: number,
	disabled?: boolean,
	hasNext?: boolean,
	onPageChange: (page: number)=>void,
	style?: React.CSSProperties,
	pageStyle?: React.CSSProperties,
}

var Pagination = (props: Props)=>{
	var onPage = (page: number)=>{
		return ()=>{
			if(page===props.page || props.disabled) return;
			if(page<0 || (props.pageCount && (page+1)>props.pageCount)) return;
			props.onPageChange(page);
		}
	}

	var prev_pages : number[] = [];
	var next_pages : number[] = [];
	if(props.pageCount){
		var preview = props.previewCount || 5;
		var preview_left = Math.floor((preview-1)/2);
		var preview_right = Math.ceil((preview-1)/2);

		var prev_count = preview_left;
		if((props.page-prev_count)<0){
			prev_count += (props.page-prev_count);
		}
		if(prev_count<preview_left){
			preview_right += preview_left-prev_count;
		}
		
		var next_count = Math.min(preview_right, (props.pageCount-(props.page+1)));
		if(next_count<preview_right){
			prev_count = Math.min(prev_count+(preview_right-next_count), 111111)
		}
		
		if(prev_count>0){
			for(var i=Math.max((props.page-prev_count+1), 1); i<=props.page; i++){
				prev_pages.push(i);
			}
		}
		if(next_count>0){
			for(var i=props.page+1; i<Math.min(props.page+next_count+1, props.pageCount); i++){
				next_pages.push(i+1);
			}
		}
	}
	
	var has_next = !(props.hasNext===false || (props.pageCount && (props.pageCount-1)<=props.page));

	return <div className="fr pagination" style={props.style}>
		<div className={classNames("prev page", { disabled: props.page<=0 })} onClick={onPage(Math.max(props.page-1, 0))}>
			<i className={`${props.leftIcon || 'chevron left'} icon`}></i>
		</div>
		{prev_pages.map(a=>(
			<div className="page" style={props.pageStyle} onClick={onPage(a-1)}>{a}</div>
		))}
		<div className="page active" style={props.pageStyle} onClick={onPage(props.page)}>{props.page+1}</div>
		{next_pages.map(a=>(
			<div className="page" style={props.pageStyle} onClick={onPage(a-1)}>{a}</div>
		))}
		<div className={classNames("right page", { 
			disabled: !has_next
		})} onClick={has_next ? onPage(props.page+1) : null}>
			<i className={`${props.leftIcon || 'chevron right'} icon`}></i>
		</div>
	</div>
}

export default Pagination;