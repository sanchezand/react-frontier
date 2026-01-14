import React, { useMemo, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Icon from './Icon';
import style from '../style/calendar.module.scss';
import { useLocale } from './useLocale';

type CalendarMode = 'date' | 'datetime';
const YEAR_SECTION_SIZE = 20;

interface MonthDay{
	day: number,
	month: number, // Uses base 1
	year: number,
	weekday: number,
	hour: number,
	minute: number,
	second: number,
}

var toMonthDay = (date: Date) : MonthDay=>{
	if(!date) return null;
	return {
		day: date.getDate(),
		month: date.getMonth()+1,
		year: date.getFullYear(),
		weekday: date.getDay(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds()
	}
}

var fromMonthDay = (date: MonthDay)=>{
	return new Date(date.year, date.month-1, date.day, date.hour, date.minute, date.second);
}

var moveMonthDay = (md: MonthDay, type: 'day' | 'month' | 'year', amt: number) : MonthDay=>{
	var dt = fromMonthDay(md);
	if(type==='day'){
		dt.setDate(dt.getDate()+amt);
	}else if(type=='month'){
		dt.setMonth(dt.getMonth()+amt);
	}else if(type==='year'){
		dt.setFullYear(dt.getFullYear()+amt);
	}
	return toMonthDay(dt);
}

var betweenMonthDay = (date: MonthDay, start: MonthDay, end: MonthDay)=>{
	return (date.year>=start.year && (date.month>start.month || (date.month==start.month && date.day>=start.day))) && (date.year<=end.year && (date.month<end.month || (date.month==end.month && date.day<=end.day)));
}

var isMonthDay = (a: MonthDay, b: MonthDay)=>{
	if(a===null || b===null) return false;
	return a.day===b.day && a.month===b.month && a.year===b.year;
}

enum SelectMode{
	DAY = 1,
	MONTHS = 2,
	YEARS = 3,
	HOUR = 4,
	MINUTES = 5
}

export interface CalendarProps{
	mode?: CalendarMode
	format?: string,
	date?: Date,
	initialDate?: Date,
	minDate?: Date,
	maxDate?: Date,
	activeDays?: Date[],
	showAdjacentMonths?: boolean,
	disabledDays?: Date[],
	style?: React.CSSProperties,
	activeDayStyle?: React.CSSProperties,
	disabledDayStyle?: React.CSSProperties,
	className?: string,
	onSelected?: (date: Date)=>void,
}

var Calendar = (props: CalendarProps)=>{
	var { t } = useLocale();
	var [selectedDate, setSelectedDate] = useState<MonthDay>(null);
	var [mode, setMode] = useState<SelectMode>(SelectMode.DAY);
	var [shownMonth, setShownMonth] = useState<MonthDay>(null);

	var selected_date = useMemo(()=>{
		if(!props.date) return null;
		return toMonthDay(props.date);
	}, [props.date]);

	var initial_date = useMemo(()=>{
		if(!props.initialDate) return null;
		return toMonthDay(props.initialDate);
	}, [props.initialDate]);

	var today = useMemo(()=>{
		return toMonthDay(new Date());
	}, []);

	var min_date = useMemo(()=>{
		if(!props.minDate) return null;
		return toMonthDay(props.minDate);
	}, []);

	var max_date = useMemo(()=>{
		if(!props.minDate) return null;
		return toMonthDay(props.maxDate);
	}, []);

	var active_days = useMemo(()=>{
		if(!props.activeDays) return [];
		return props.activeDays.map(toMonthDay);
	}, [props.activeDays]);

	var disabled_days = useMemo(()=>{
		if(!props.disabledDays) return [];
		return props.disabledDays.map(toMonthDay);
	}, [props.disabledDays]);

	var shown_month = useMemo(()=>{
		if(shownMonth) return shownMonth;
		if(selected_date) return selected_date;
		return initial_date || today;
	}, [shownMonth, selected_date, initial_date]);

	var current_month = useMemo(()=>{
		var month = shown_month.month;
		var year = shown_month.year;
		var start_date = toMonthDay(new Date(year, month-1, 1, 12));
		var end_date = toMonthDay(new Date(year, month, 0, 12));
		
		var days : MonthDay[][] = [], current_week : MonthDay[] = [];
		for(let i=start_date.weekday-1; i>=0; i--){
			var prev_day = moveMonthDay(start_date, 'day', -i-1);
			current_week.push(prev_day);
		}

		var loop_count = 0;
		while(start_date.day<=end_date.day && start_date.month<=end_date.month && start_date.year<=end_date.year){
			current_week.push(start_date);
			start_date = moveMonthDay(start_date, 'day', 1);
			if(current_week.length>=7){
				days.push(current_week);
				current_week = [];
			}
			loop_count++;
			if(loop_count>=100){
				break;
			}
		}

		if(current_week.length>0){
			if(current_week.length<7){
				var next_month = end_date.month>=12 ? 1 : end_date.month+1;
				var next_year = end_date.month>=12 ? end_date.year+1 : end_date.year;

				var i = 0;
				while(current_week.length<7){
					current_week.push({
						day: i+1,
						month: next_month,
						year: next_year,
						weekday: end_date.weekday+(i+1),
						hour: 12,
						minute: 0,
						second: 0,
					});
					i++;
				}
			}
			days.push(current_week);
		}
		return {
			month,
			year,
			days
		};
	}, [shown_month]);

	var goPrev = ()=>{
		if(mode===SelectMode.DAY){
			setShownMonth(moveMonthDay(shown_month, 'month', -1));
		}
	}
	var goNext = ()=>{
		if(mode===SelectMode.DAY){
			setShownMonth(moveMonthDay(shown_month, 'month', 1));
			// console.log(shown_month, moveMonthDay(shown_month, 1));
			// setShownMonth(moveMonthDay(shown_month, 1));
		}
	}

	var isDateAvailable = (md: MonthDay)=>{
		var active = true;
		if(active && min_date){
			active = md.year>min_date.year || (md.year==min_date.year && md.month>min_date.month) || (md.year==min_date.year && md.month==min_date.month && md.day>=min_date.day);
		}
		if(active && max_date){
			active = md.year<max_date.year || (md.year==max_date.year && md.month<max_date.month) || (md.year==max_date.year && md.month==max_date.month && md.day<=max_date.day);
		}
		if(active && active_days.length>0){
			active = false;
			for(var d of active_days){
				if(md.day===d.day && d.month===md.month && d.year===md.year){
					active = true;
					break;
				}
			}
		}
		if(active && disabled_days.length>0){
			for(var d of disabled_days){
				if(md.day===d.day && d.month===md.month && d.year===md.year){
					active = false;
					break;
				}
			}
		}
		return active;
	}
	
	var changeMode = ()=>{
		switch(mode){
			case SelectMode.MONTHS: return setMode(SelectMode.YEARS);
			case SelectMode.DAY: return setMode(SelectMode.MONTHS);
			case SelectMode.HOUR: return setMode(SelectMode.DAY);
			case SelectMode.MINUTES: return setMode(SelectMode.HOUR);
		}
	}

	var onSelectedDate = (d: MonthDay)=>{
		return ()=>{
			if(d===null) return;
			var is_same_month = !!d && d.month==current_month.month && d.year==current_month.year;
			if(!is_same_month){
				setShownMonth(d);
			}
			if(props.mode==='date'){
				if(props.onSelected) props.onSelected(fromMonthDay(d));
			}else{
				setSelectedDate({
					...d,
					hour: null,
					minute: null,
					second: null
				});
				setMode(SelectMode.HOUR);
			}
		}
	}
	
	var onSelectedHours = (hr: number)=>{
		return ()=>{
			if(!selectedDate) return setMode(SelectMode.DAY);
			setSelectedDate({
				...selectedDate,
				hour: hr,
				minute: 0,
				second: 0
			});
			setMode(SelectMode.MINUTES);
		}
	}

	var onSelectedMinutes = (min: number)=>{
		return ()=>{
			if(!selectedDate) return setMode(SelectMode.DAY);
			if(selectedDate.hour===null) return setMode(SelectMode.HOUR);
			var new_date : MonthDay = {
				...selectedDate,
				minute: min,
				second: 0
			};
			setSelectedDate(new_date);
			if(props.onSelected) props.onSelected(fromMonthDay(new_date));
		}
	}

	var MonthDays = useMemo(()=>(
		current_month.days.map((a,i)=>{
			return <tr key={`cal-week${current_month.month}-${i}`}>
				{a.map(d=>{
					var disabled = d!==null && !isDateAvailable(d);
					var is_same_month = !!d && d.month==current_month.month && d.year==current_month.year;
					
					return <td 
						onClick={!disabled ? onSelectedDate(d) : null}
						key={`cal-day-${d.month}-${d.day}`}
						data-today={isMonthDay(today, d) || undefined} 
						data-empty={d===null || undefined}
					>
						<div
							className={style.date}
							data-empty={d===null || undefined}
							data-active={undefined}
							data-disabled={disabled || undefined}
							data-adjacent={!is_same_month || undefined}
						>
							{props.showAdjacentMonths===false && !is_same_month ? null : (
								d.day
							)}
						</div>
					</td>
				})}
			</tr>
		})
	), [current_month, today, props.showAdjacentMonths, props.mode])
	var DayTimes = useMemo(()=>(
		[0, 5, 9, 13, 17, 21].map(a=>(
			<tr key={`cal-hr-${a}`}>
				{Array.from(Array(4).keys()).map(b=>(
					<td data-empty={(a+b)==24 || undefined} key={`cal-hr-${a+b}`}>
						{(a+b)==24 ? null : (
							<div onClick={onSelectedHours(a+b)} className={style.time}>{('0'+(a+b)).slice(-2)}:00</div>
						)}
					</td>
				))}
			</tr>
		))
	), [selectedDate, props.mode]);
	var DayMinutes = useMemo(()=>{
		if(!selectedDate || selectedDate?.hour===null) return null;
		var formatted_hour = ('0'+selectedDate.hour).slice(-2);
		return <>
			{[0, 20, 30, 40].map(a=>(
				<tr key={`cal-min-r${a}`}>
					{Array.from(Array(4).keys()).map(b=>(
						<td key={`cal-min-${a}${b}`}>
							<div onClick={onSelectedMinutes(a+(b*5))} className={style.time}>{formatted_hour}:{('0'+(a+(b*5))).slice(-2)}</div>
						</td>
					))}
				</tr>
			))}
			<tr>
				<td colSpan={4}>
					<div className={style.time} onClick={onSelectedMinutes(59)}>
						{formatted_hour}:59
					</div>
				</td>
			</tr>
		</>
	}, [selectedDate, props.mode]);

	var show_move_buttons = mode===SelectMode.DAY || mode===SelectMode.MONTHS || mode==SelectMode.YEARS;

	return <table className={classNames(style.calendar, props.className)} style={props.style}>
		<thead>
			<tr>
				{show_move_buttons && (
					<th onClick={goPrev} className={style.prevButton}>
						<Icon name='arrow-left' />
					</th>
				)}
				<th colSpan={show_move_buttons ? 5 : 7} className={style.headerButton} onClick={changeMode}>
					{mode===SelectMode.DAY ? (
						`${t(`calendar.months.month_${shown_month.month-1}`)} ${shown_month.year}`
					) : (mode===SelectMode.HOUR || mode===SelectMode.MINUTES) && !!selectedDate ? <>
						{`00${selectedDate.day}`.slice(-2)}/{t(`calendar.months_short.month_${selectedDate.month-1}`)}/{selectedDate.year}
						{mode===SelectMode.MINUTES && selectedDate?.hour!==null && (
							` ${`00${selectedDate.hour}`.slice(-2)}:00`
						)}
					</> : null}
				</th>
				{show_move_buttons && (
					<th onClick={goNext} className={style.nextButton}>
						<Icon name='arrow-right' />
					</th>
				)}
			</tr>
			{mode===SelectMode.DAY && (
				<tr>{new Array(7).fill(0).map((a, i)=><th key={`cal-wkd-${i}`}>{t(`calendar.days_short.day_${i}`)}</th>)}</tr>
			)}
		</thead>
		<tbody>
			{mode===SelectMode.DAY ? (
				MonthDays
			) : mode===SelectMode.HOUR ? (
				DayTimes
			) : mode===SelectMode.MINUTES ? (
				DayMinutes
			) : null}
		</tbody>
	</table>
	// return <div className={style.calendar}>

	// </div>
}

export default Calendar;