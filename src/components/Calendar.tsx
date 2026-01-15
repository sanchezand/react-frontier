import React, { useMemo, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Icon from './Icon';
import style from '../style/calendar.module.scss';
import { useLocale } from './useLocale';

type CalendarMode = 'date' | 'datetime' | 'month' | 'year' | 'time';
const YEAR_SECTION_COLUMNS = 5;
const YEAR_SECTION_ROWS = 4;

function partition<T>(a: T[], n: number) : T[][]{
	var array : T[] = [...a];
	return (array.length ? [array.splice(0, n)].concat(partition(array, n)) : []) as T[][];
}

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

	var current_mode = useMemo(()=>{
		if(!props.mode || props.mode==='date'){
			if([SelectMode.HOUR, SelectMode.MINUTES].indexOf(mode)!==-1) return SelectMode.DAY;
		}else if(props.mode==='month'){
			if([SelectMode.DAY, SelectMode.HOUR, SelectMode.MINUTES].indexOf(mode)!==-1) return SelectMode.MONTHS;
		}else if(props.mode==='year'){
			return SelectMode.YEARS;
		}

		return mode;
	}, [mode, props.mode]);

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
	}, [props.minDate]);

	var max_date = useMemo(()=>{
		if(!props.minDate) return null;
		return toMonthDay(props.maxDate);
	}, [props.maxDate]);

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
		if(current_mode===SelectMode.DAY){
			setShownMonth(moveMonthDay(shown_month, 'month', -1));
		}else if(current_mode===SelectMode.MONTHS){
			setShownMonth(moveMonthDay(shown_month, 'year', -1));
		}else if(current_mode===SelectMode.YEARS){
			shown_month.year = shown_month.year-(shown_month.year%(YEAR_SECTION_COLUMNS*YEAR_SECTION_ROWS));
			setShownMonth(moveMonthDay(shown_month, 'year', -(YEAR_SECTION_COLUMNS*YEAR_SECTION_ROWS)));
		}
	}
	var goNext = ()=>{
		if(current_mode===SelectMode.DAY){
			setShownMonth(moveMonthDay(shown_month, 'month', 1));
		}else if(current_mode===SelectMode.MONTHS){
			setShownMonth(moveMonthDay(shown_month, 'year', 1));
		}else if(current_mode===SelectMode.YEARS){
			shown_month.year = shown_month.year-(shown_month.year%(YEAR_SECTION_COLUMNS*YEAR_SECTION_ROWS));
			setShownMonth(moveMonthDay(shown_month, 'year', (YEAR_SECTION_COLUMNS*YEAR_SECTION_ROWS)));
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
		switch(current_mode){
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
			setSelectedDate({
				...d,
				hour: null,
				minute: null,
				second: null
			});
			if(!props.mode || props.mode==='date'){
				if(props.onSelected) props.onSelected(fromMonthDay(d));
			}else{
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
	
	var onSelectedMonth = (month: number, year: number)=>{
		return ()=>{
			var md : MonthDay = {
				month,
				year,
				day: 1,
				hour: 12,
				minute: 0,
				second: 0,
				weekday: 0
			}
			if(props.mode==='month'){
				if(props.onSelected) return props.onSelected(fromMonthDay(md));
			}else{
				setMode(SelectMode.DAY);
				return setShownMonth(md);
			}
		}
	}

	var onSelectedYear = (year: number)=>{
		return ()=>{
			var md : MonthDay = {
				month: 1,
				year,
				day: 1,
				hour: 12,
				minute: 0,
				second: 0,
				weekday: 0,
			}
			if(props.mode==='year'){
				if(props.onSelected) return props.onSelected(fromMonthDay(md));
			}else{
				setMode(SelectMode.MONTHS);
				return setShownMonth(md);
			}
		}
	}

	var MonthDays = useMemo(()=>(
		current_month.days.map((a,i)=>{
			return <tr key={`cal-week${current_month.month}-${i}`}>
				{a.map(d=>{
					var disabled = d===null || !isDateAvailable(d);
					var is_same_month = !!d && d.month==current_month.month && d.year==current_month.year;
					
					return <td 
						onClick={!disabled ? onSelectedDate(d) : null}
						key={`cal-day-${d.month}-${d.day}`}
						data-today={isMonthDay(today, d) || undefined} 
						data-empty={d===null || undefined}
						data-disabled={disabled || undefined}
					>
						<div
							className={style.date}
							data-empty={d===null || undefined}
							data-active={isMonthDay(d, selected_date) || undefined}
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
	), [current_month, today, props.showAdjacentMonths, current_mode, props.date, props.minDate, props.maxDate])

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
	), [selectedDate, current_mode, props.minDate, props.maxDate]);

	var DayMinutes = useMemo(()=>{
		if(!selectedDate || selectedDate?.hour===null) return null;
		var formatted_hour = ('0'+selectedDate.hour).slice(-2);
		return <>
			{[0, 20, 30, 40].map(a=>(
				<tr key={`cal-min-r${a}`}>
					{Array.from(Array(4).keys()).map(b=>(
						<td key={`cal-min-${a}${b}`} onClick={onSelectedMinutes(a+(b*5))}>
							<div className={style.time}>{formatted_hour}:{('0'+(a+(b*5))).slice(-2)}</div>
						</td>
					))}
				</tr>
			))}
			<tr>
				<td colSpan={4} onClick={onSelectedMinutes(59)}>
					<div className={style.time}>
						{formatted_hour}:59
					</div>
				</td>
			</tr>
		</>
	}, [selectedDate, current_mode, props.minDate, props.maxDate]);

	var YearMonths = useMemo(()=>(
		partition(new Array(12).fill(0), 3).map((a,i)=>(
			<tr key={`cal-mnth-${i}`}>
				{a.map((b, s)=>{
					var showing_month = s+(i*3);
					var active = true;
					if(min_date){
						active = shown_month.year>min_date.year || (shown_month.year==min_date.year && (showing_month+1)>=min_date.month);
					}
					if(active && max_date){
						active = shown_month.year<max_date.year || (shown_month.year==max_date.year && (showing_month+1)<=max_date.month);
					}
					return <td 
						key={`cal-mnth-${i}-${s}`} 
						colSpan={2} 
						data-today={(today.month===showing_month+1 && today.year===shown_month.year) || undefined}
						onClick={active ? onSelectedMonth(showing_month+1, shown_month.year) : null}
						data-disabled={!active || undefined}
					>
						<div
							className={style.time}
							data-active={selected_date && selected_date.month===(showing_month+1) && selected_date.year===shown_month.year || undefined}
						>
							{t(`calendar.months.month_${showing_month}`)}
						</div>
					</td>
				})}
			</tr>
		))
	), [selectedDate, today, shown_month, props.date, props.minDate, props.maxDate]);

	var YearList = useMemo(()=>{
		var start_year = (shown_month.year-(shown_month.year%20))+1;
		return new Array(YEAR_SECTION_ROWS).fill(0).map((a,i)=>(
			<tr key={`cal-year-${start_year}-${i}`}>
				{new Array(YEAR_SECTION_COLUMNS).fill(0).map((b, s)=>{
					var shown_year = start_year+((i*YEAR_SECTION_COLUMNS)+s);
					var active = true;
					if(min_date){
						active = shown_year>=min_date.year;
					}
					if(active && max_date){
						active = shown_year<=max_date.year;
					}
					return (
						<td 
							colSpan={2}
							key={`cal-year-${start_year}-${i}-${s}`} 
							data-today={today.year===shown_year || undefined}
							data-disabled={!active || undefined}
							onClick={onSelectedYear(shown_year)}
						>
							<div
								className={style.time}
								data-active={selected_date?.year===shown_year || undefined}
							>
								{shown_year}
							</div>
						</td>
					)
				})}
			</tr>
		))
	}, [selectedDate, shown_month, today, props.date, props.minDate, props.maxDate])


	var middle_col_span = useMemo(()=>{
		switch(current_mode){
			case SelectMode.DAY: return 5;
			case SelectMode.HOUR: return 4;
			case SelectMode.MINUTES: return 4;
			case SelectMode.MONTHS: return 4;
			case SelectMode.YEARS: return (YEAR_SECTION_COLUMNS*2)-2;
		}
	}, [current_mode]);

	var show_move_buttons = current_mode===SelectMode.DAY || current_mode===SelectMode.MONTHS || current_mode==SelectMode.YEARS;

	return <table className={classNames(style.calendar, props.className)} style={props.style}>
		<thead>
			<tr>
				{show_move_buttons && (
					<th onClick={goPrev} className={style.prevButton}>
						<Icon name='arrow-left' />
					</th>
				)}
				<th colSpan={middle_col_span} className={style.headerButton} onClick={changeMode}>
					{current_mode===SelectMode.DAY ? (
						`${t(`calendar.months.month_${shown_month.month-1}`)} ${shown_month.year}`
					) : (current_mode===SelectMode.HOUR || current_mode===SelectMode.MINUTES) && !!selectedDate ? <>
						{`00${selectedDate.day}`.slice(-2)}/{t(`calendar.months_short.month_${selectedDate.month-1}`)}/{selectedDate.year}
						{current_mode===SelectMode.MINUTES && selectedDate?.hour!==null && (
							` ${`00${selectedDate.hour}`.slice(-2)}:00`
						)}
					</> : current_mode===SelectMode.MONTHS ? (
						current_month.year
					) : current_mode===SelectMode.YEARS ? <>
						{shown_month.year-(shown_month.year%(YEAR_SECTION_COLUMNS*YEAR_SECTION_ROWS))+1}
						<Icon name='arrow-right' style={{ marginLeft: 5 }} />
						{(shown_month.year-(shown_month.year%(YEAR_SECTION_COLUMNS*YEAR_SECTION_ROWS))+1) + (YEAR_SECTION_COLUMNS*YEAR_SECTION_ROWS)-1}
					</> : null}
				</th>
				{show_move_buttons && (
					<th onClick={goNext} className={style.nextButton}>
						<Icon name='arrow-right' />
					</th>
				)}
			</tr>
			{current_mode===SelectMode.DAY && (
				<tr>{new Array(7).fill(0).map((a, i)=><th key={`cal-wkd-${i}`}>{t(`calendar.days_short.day_${i}`)}</th>)}</tr>
			)}
		</thead>
		<tbody>
			{current_mode===SelectMode.DAY ? (
				MonthDays
			) : current_mode===SelectMode.HOUR ? (
				DayTimes
			) : current_mode===SelectMode.MINUTES ? (
				DayMinutes
			) : current_mode===SelectMode.MONTHS ? (
				YearMonths
			) : current_mode===SelectMode.YEARS ? (
				YearList
			) : null}
		</tbody>
	</table>
	// return <div className={style.calendar}>

	// </div>
}

export default Calendar;