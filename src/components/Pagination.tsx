import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FrontierColors } from './Classes';
import Icon, { IconName } from './Icon';
import classNames from 'classnames';
import style from '../style/pagination.module.scss';

interface PaginationProps{
	className?: string,
	leftIcon?: IconName,
	rightIcon?: IconName,
	page: number,
	pageCount?: number,
	disabled?: boolean,
	hasNext?: boolean,
	hasPrev?: boolean,
	color?: FrontierColors,
	onPageChange: (page: number)=>void,
	style?: React.CSSProperties,
	pageStyle?: React.CSSProperties,
}

const MOVE_WIDTH = 35;
const BUTTON_WIDTH = 45;
const BUTTON_GAP = 5;

var Pagination = (props: PaginationProps)=>{
	var {
		className,
		leftIcon,
		rightIcon,
		page,
		pageCount,
		disabled,
		hasNext,
		hasPrev,
		onPageChange,
		style: propsStyle,
		pageStyle,
		...restProps
	} = props;
	var ref = useRef<HTMLDivElement>(null);
	var [width, setWidth] = useState<number>(null);

	useLayoutEffect(()=>{
		if(!ref.current) return;
		setWidth(ref.current.getBoundingClientRect().width);
		var onResize = ()=>{
			setWidth(ref.current.getBoundingClientRect().width);
		}
		window.addEventListener('resize', onResize)
		return ()=>{
			window.removeEventListener('resize', onResize);
		}
	}, [ref.current]);

	var pages : number[] = useMemo(()=>{
		if(!width) return [];
		var effective_width = width - ((MOVE_WIDTH*2)+(BUTTON_GAP*2));
		var button_count = Math.floor(effective_width/(BUTTON_WIDTH+BUTTON_GAP));

		var pages = [];
		var offset = Math.floor((button_count-1)/2);
		for(var i=0; i<button_count; i++){
			pages.push(((props.page || 0)-offset) + i);
		}

		var new_pages = pages.filter(a=>a>=0);
		var left_crop = Math.max(pages.length-new_pages.length, 0), right_crop = 0;
		if(props.pageCount){
			var new_pages_right = new_pages.filter(a=>a<props.pageCount);
			right_crop = Math.max(new_pages.length-new_pages_right.length, 0);
			new_pages = new_pages_right;
		}

		if(left_crop>0 && right_crop==0){
			var right_most_number = new_pages[new_pages.length-1];
			for(var i=0; i<left_crop; i++){
				var np = (right_most_number+1)+i;
				if(props.pageCount && (np+1)>props.pageCount) break;
				new_pages.push(np);
			}
		}else if(right_crop>0 && left_crop==0){
			var left_most_number = new_pages[0];
			for(var i=0; i<right_crop; i++){
				var np = left_most_number-1-i;
				if(np<0) break;
				new_pages.unshift(np);
			}
		}

		return new_pages;
	}, [props.page, props.pageCount, width]);

	var pageChange = (p: number)=>{
		if(props.disabled) return null;
		return ()=>{
			if(props.onPageChange) props.onPageChange(p);
		}
	}

	var next_disabled = !!props.disabled || props.hasNext===false || (props.pageCount && props.page>=(pageCount-1));
	var prev_disabled = !!props.disabled || props.hasPrev===false || props.page===0;

	return <div ref={ref} className={classNames("fr pagination", style.pagination, props.className)} style={props.style} data-color={props.color || 'black'} data-disabled={props.disabled || undefined} {...restProps}>
		<div className={classNames("prev page", style.move)} onClick={(prev_disabled || props.page<=0) ? null : pageChange(props.page-1)} data-disabled={prev_disabled || undefined}>
			<Icon name={props.leftIcon || 'chevron-left'} />
		</div>
		<div className={style.pages}>
			{pages.map(a=>(
				<div 
					key={`PG-${a}`} 
					className={classNames("page", style.page)} 
					data-active={props.page===a || undefined} 
					onClick={pageChange(a)}
					style={props.pageStyle}
				>
					{a+1}
				</div>
			))}
		</div>
		<div className={classNames("next page", style.move)} onClick={next_disabled ? null : pageChange((props.page || 0)+1)} data-disabled={next_disabled || undefined}>
			<Icon name={props.rightIcon || 'chevron-right'} />
		</div>
	</div>
}

export default Pagination;