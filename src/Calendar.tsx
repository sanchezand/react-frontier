import React, { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';

type CalendarMode = 'date' | 'datetime';
type CalendarInternalMode = CalendarMode | 'hours' | 'minutes' | 'months' | 'years';

type CalendarLocales = 'es' | 'en';
const CALENDAR_LOCALE : {
	[x: string]: {
		months: string[],
		weekdays: string[]
	}
} = {
	'es': {
		months: [
			'Enero', 'Febrero', 'Marzo',
			'Abril', 'Mayo', 'Junio',
			'Julio', 'Agosto', 'Septiembre',
			'Octubre', 'Noviembre', 'Diciembre'
		],
		weekdays: [
			'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
		]
	},
	'en': {
		months: [
			'January', 'February', 'March',
			'April', 'May', 'June',
			'July', 'August', 'September',
			'October', 'November', 'December'
		],
		weekdays: [
			'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
		]
	}
}

type CalendarColors = 'green' | 'red' | 'purple' | 'gray' | 'blue' | 'orange';

const YEAR_SECTION_SIZE = 20;

export interface CalendarProps{
	mode?: CalendarMode
	format?: string,
	date: number,
	color?: CalendarColors,
	locale?: CalendarLocales,
	minDate?: number,
	maxDate?: number,
	activeDays?: number[],
	disabledDays?: number[],
	style?: React.CSSProperties,
	activeDayStyle?: React.CSSProperties,
	disabledDayStyle?: React.CSSProperties,
	initialDate?: number,
	limitActiveMonths?: boolean,
	onSelected?: (unix: number)=>void,
}

function partition<T>(a: T[], n: number) : T[][]{
	var array : T[] = [...a];
	return (array.length ? [array.splice(0, n)].concat(partition(array, n)) : []) as T[][];
}

var Calendar = (props: CalendarProps)=>{
	var min_date = props.minDate ? moment.unix(props.minDate) : null;
	var min_year = min_date ? min_date.get('year') : null;
	var min_month = min_date ? min_date.get('month') : null;
	var min_day = min_date ? min_date.get('D') : null;

	var max_date = props.maxDate ? moment.unix(props.maxDate) : null;
	var max_year = max_date ? max_date.get('year') : null;
	var max_month = max_date ? max_date.get('month') : null;
	var max_day = max_date ? max_date.get('D') : null;

	var active_days = props.activeDays ? props.activeDays.map(a=>{
		var mdate = moment.unix(a);
		return {
			day: mdate.get('D'),
			month: mdate.get('month'),
			year: mdate.get('year')
		}
	}) : [];
	var disabled_days = props.disabledDays ? props.disabledDays.map(a=>{
		var mdate = moment.unix(a);
		return {
			day: mdate.get('D'),
			month: mdate.get('month'),
			year: mdate.get('year')
		}
	}) : [];

	var active_min_month = [0, 0];
	var active_max_month = [11, 2100];

	if(active_days.length>0 && props.limitActiveMonths){
		active_min_month = [11, 2100];
		active_max_month = [0, 0];
		for(let i of active_days){
			let min_month = (active_min_month[1]*12)+active_min_month[0];
			let max_month = (active_max_month[1]*12)+active_max_month[0];
			let current_month = ((i.year*12)+i.month)
			if(current_month<min_month){
				active_min_month = [i.month, i.year];
			}
			if(current_month>max_month){
				active_max_month = [i.month, i.year];
			}
		}
	}

	var valid_date = (props.date && !Number.isNaN(props.date)) || (props.initialDate && !Number.isNaN(props.initialDate));
	var mdate = valid_date ? moment.unix(props.initialDate || props.date) : moment();
	
	var selected_year = valid_date ? mdate.get('year') : null;
	var selected_month = valid_date ? mdate.get('month') : null;
	var selected_day = valid_date ? mdate.get('D') : null;

	if(((active_min_month[1]*12)+active_min_month[0])>((selected_year*12)+selected_month)){
		selected_month = active_min_month[0];
		selected_year = active_min_month[1];
	}

	var [month, setMonth] = useState(selected_month);
	var [year, setYear] = useState(selected_year);
	var [currentMode, setCurrentMode] = useState<CalendarInternalMode>('date');
	var [selectedDay, setSelectedDay] = useState<number>(null);
	var [selectedHours, setSelectedHours] = useState<number>(null);
	var [yearSection, setYearSection] = useState<number>(null);

	var locale = CALENDAR_LOCALE[props.locale || 'en'] || CALENDAR_LOCALE['en'];
	var mode = props.mode || 'datetime';

	var today = new Date();
	var today_month = today.getMonth();
	var today_year = today.getFullYear();

	var first_day = new Date(year, month, 1, 12);
	var last_day = new Date(year, month+1, 0, 12);
	var month_days : number[][] = [[]];
	for(var i=0; i<first_day.getDay(); i++){
		month_days[0].push(null);
	}
	var current_week = 0;
	for(var d=0; d<last_day.getDate(); d++){
		month_days[current_week].push(d+1);
		if(month_days[current_week].length>=7 && (d+1)<last_day.getDate()){
			current_week++;
			month_days.push([]);
		}
	}

	var nextMonth = ()=>{
		if(props.limitActiveMonths){
			var max_month = (active_max_month[1]*12)+active_max_month[0];
			if(max_month<((year*12)+month+1)){
				return;
			}
		}
		if(month>=11){
			setMonth(0);
			setYear(year+1);
		}else setMonth(month+1);
	}

	var prevMonth = ()=>{
		if(props.limitActiveMonths){
			var min_month = (active_min_month[1]*12)+active_min_month[0];
			if(min_month>((year*12)+month-1)){
				return;
			}
		}
		if(month<=0){
			setMonth(11);
			setYear(year-1);
		}
		else setMonth(month-1);
	}

	var yearMove = (amt: number)=>{
		return ()=>{
			setYear(year+amt);
		}
	}
	
	var onSelectedDate = (day: number)=>{
		return ()=>{
			if(day===null) return;
			if(mode==='datetime'){
				setSelectedDay(day);
				setCurrentMode('hours');
			}else{
				var dt = new Date(year, month, day, 12);
				if(props.onSelected) props.onSelected(Math.floor(dt.getTime()/1000));
			}
		}
	}

	var onSelectedHours = (hrs: number)=>{
		return ()=>{
			if(hrs<0 || hrs>23) return;
			setSelectedHours(hrs);
			setCurrentMode('minutes');
		}
	}

	var onSelectedMinutes = (mins: number)=>{
		return ()=>{
			var dt = new Date(year, month, selectedDay, selectedHours, mins, mins===59 ? 59 : 0);
			if(props.onSelected) props.onSelected(Math.floor(dt.getTime()/1000));
		}
	}

	var showSelectYear = ()=>{
		setCurrentMode('years');
		setYearSection(Math.floor(year/YEAR_SECTION_SIZE)*YEAR_SECTION_SIZE);
	}

	var yearSectionMove = (amt: number)=>{
		return ()=>{
			setYearSection(yearSection+(YEAR_SECTION_SIZE*amt));
		}
	}

	var isDateActive = (day: number, month: number, year: number)=>{
		var active = true;
		if(min_date){
			active = year>min_year || (year==min_year && month>min_month) || (year==min_year && month==min_month && day>=min_day);
		}
		if(active && max_date){
			active = year<max_year || (year==max_year && month<max_month) || (year==max_year && month==max_month && day<=max_day);
		}
		if(active && active_days.length>0){
			active = false;
			for(var d of active_days){
				if(day===d.day && d.month===month && d.year===year){
					active = true;
					break;
				}
			}
		}
		if(active && disabled_days.length>0){
			for(var d of disabled_days){
				if(day===d.day && d.month===month && d.year===year){
					active = false;
					break;
				}
			}
		}
		return active;
	}

	var CALENDAR_MONTH = <>
		<thead>
			<tr>
				<th onClick={prevMonth} className='prev'>
					<i className="arrow left icon"></i>
				</th>
				<th colSpan={5} style={{ textAlign: 'center', fontSize: 14 }} onClick={()=>setCurrentMode('months')}>
					{locale.months[month]} {year}
				</th>
				<th onClick={nextMonth} className='next'>
					<i className="arrow right icon"></i>
				</th>
			</tr>
			<tr>{locale.weekdays.map((a, i)=><th key={`cal-wkd-${i}`}>{a.substring(0, 2)}</th>)}</tr>
		</thead>
		<tbody>
			{month_days.map((a, wx)=>(
				<tr key={`cal-week-${wx}`}>
					{a.map((b, i)=>{
						var active = b!==null && isDateActive(b, month, year);
						return <td key={`cal-day-${i}`} className={classNames({ 
							empty: b===null, 
							last: last_day.getDate()===b && i<6,
							today: b==today.getDate() && month==today.getMonth() && year==today.getFullYear(),
						})}>
							<div
							 	onClick={active ? onSelectedDate(b) : null}
								style={active ? props.activeDayStyle : props.disabledDayStyle}
								className={classNames('date', {
									empty: b===null,
									disabled: !active,
									active: b==selected_day && month==selected_month && year==selected_year,
									available: active,
								})}
							>{b}</div>
						</td>
					})}
				</tr>
			))}
		</tbody>
	</>;

	var CALENDAR_HOURS = <>
		<thead>
			<tr>
				<th onClick={()=>setCurrentMode(currentMode==='hours' ? 'date' : 'hours')} colSpan={6} style={{ textAlign: 'center' }}>
					{currentMode==='hours' ? (
						moment(new Date(year, month, selectedDay), null, (props.locale || 'en')).format('DD/MMM/YYYY')
					) : (
						moment(new Date(year, month, selectedDay, selectedHours), null, (props.locale || 'en')).format('DD/MMM/YYYY HH:00')
					)}
				</th>
			</tr>
		</thead>
		<tbody>
			{currentMode==='hours' ? (
				[0, 5, 9, 13, 17, 21].map(a=>(
					<tr key={`cal-hr-${a}`}>
						{Array.from(Array(4).keys()).map(b=>(
							<td className={(a+b)==24 ? 'empty' : ''} key={`cal-hr-${a+b}`}>
								{(a+b)==24 ? null : (
									<div onClick={onSelectedHours(a+b)} className={`time`}>{('0'+(a+b)).slice(-2)}:00</div>
								)}
							</td>
						))}
					</tr>
				))
			) : <>
				{[0, 20, 30, 40].map(a=>(
					<tr key={`cal-min-r${a}`}>
						{Array.from(Array(4).keys()).map(b=>(
							<td key={`cal-min-${a}${b}`}>
								<div onClick={onSelectedMinutes(a+(b*5))} className={`time`}>{('0'+selectedHours).slice(-2)}:{('0'+(a+(b*5))).slice(-2)}</div>
							</td>
						))}
					</tr>
				))}
				<tr>
					<td colSpan={4}>
						<div className="time" onClick={onSelectedMinutes(59)}>
							{selectedHours}:59
						</div>
					</td>
				</tr>
			</>}
		</tbody>
	</>

	var CALENDAR_YEAR_MONTHS = currentMode==='months' ? <>
		<thead>
			<tr>
				<th onClick={yearMove(-1)} className='prev'>
					<i className="arrow left icon"></i>
				</th>
				<th colSpan={4} style={{ textAlign: 'center', fontSize: 14 }} onClick={showSelectYear}>
					{year}
				</th>
				<th onClick={yearMove(1)} className='next'>
					<i className="arrow right icon"></i>
				</th>
			</tr>
		</thead>
		<tbody>
			{partition(new Array(12).fill(0), 3).map((a,i)=>(
				<tr key={`cal-mnth-${i}`}>
					{a.map((b, s)=>{
						var showing_month = s+(i*3);
						var active = true;
						if(min_date){
							active = year>min_year || (year==min_year && showing_month>=min_month);
						}
						if(active && max_date){
							active = year<max_year || (year==max_year && showing_month<=max_month);
						}
						return <td key={`cal-mnth-${i}-${s}`} colSpan={2} className={classNames({
							today: today_month===showing_month && today_year===year,
						})}>
							<div className={classNames("time", {
								active: selected_month===showing_month && selected_year===year,
								disabled: !active,
								available: active,
							})} onClick={()=>{
								setMonth(showing_month);
								setCurrentMode('date')
							}}>{locale.months[showing_month]}</div>
						</td>
					})}
				</tr>
			))}
		</tbody>
	</> : null;

	var CALENDAR_YEARS = currentMode==='years' ? <>
		<thead>
			<tr>
				<th onClick={yearSectionMove(-1)} className='prev'>
					<i className="arrow left icon"></i>
				</th>
				<th colSpan={3} style={{ textAlign: 'center', fontSize: 14 }}>
					{yearSection} <i className="arrow right icon" style={{ fontSize: 12 }}></i> {yearSection+(YEAR_SECTION_SIZE-1)}
				</th>
				<th onClick={yearSectionMove(1)} className='next'>
					<i className="arrow right icon"></i>
				</th>
			</tr>
		</thead>
		<tbody>
			{new Array(4).fill(0).map((a,i)=>(
				<tr key={`cal-year-${yearSection}-${i}`}>
					{new Array(5).fill(0).map((b, s)=>(
						<td key={`cal-year-${yearSection}-${i}-${s}`} className={classNames({
							today: today_year===yearSection+((i*5)+s)
						})}>
							<div className={classNames("time", {
								active: selected_year===yearSection+((i*5)+s)
							})} onClick={()=>{
								setYear(yearSection+((i*5)+s));
								setCurrentMode('months')
							}}>{yearSection+((i*5)+s)}</div>
						</td>
					))}
				</tr>
			))}
		</tbody>
	</> : null;

	return <table className={classNames('fr calendar table', currentMode, props.color)} style={props.style}>
		{currentMode==='date' ? (
			CALENDAR_MONTH
		) : currentMode==='hours' ? (
			CALENDAR_HOURS
		) : currentMode==='minutes' ? (
			CALENDAR_HOURS
		) : currentMode==='months' ? (
			CALENDAR_YEAR_MONTHS
		) : currentMode==='years' ? (
			CALENDAR_YEARS
		) : null}
	</table>
}

export default Calendar;