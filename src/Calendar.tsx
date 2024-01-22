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

interface CalendarProps{
	mode?: CalendarMode
	format?: string,
	date: number,
	color?: CalendarColors,
	locale?: CalendarLocales,
	activeDays?: number[],
	activeDaysStyle?: React.CSSProperties,
	onSelected?: (unix: number)=>void,
}

function partition<T>(a: T[], n: number) : T[][]{
	var array : T[] = [...a];
	return (array.length ? [array.splice(0, n)].concat(partition(array, n)) : []) as T[][];
}

var Calendar = (props: CalendarProps)=>{
	var valid_date = props.date && !Number.isNaN(props.date);
	var mdate = valid_date ? moment.unix(props.date) : moment();
	
	var selected_month = valid_date ? mdate.get('month') : null;
	var selected_day = valid_date ? mdate.get('D') : null;
	var selected_year = valid_date ? mdate.get('year') : null;

	var [month, setMonth] = useState(mdate.get('month'));
	var [year, setYear] = useState(mdate.get('year'));
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
		if(month>=11){
			setMonth(0);
			setYear(year+1);
		}else setMonth(month+1);
	}

	var prevMonth = ()=>{
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
					{a.map((b, i)=>(
						<td key={`cal-day-${i}`} className={classNames({ 
							empty: b===null, 
							last: last_day.getDate()===b && i<6,
							today: b==today.getDate() && month==today.getMonth() && year==today.getFullYear(),
						})}>
							<div
							 	onClick={onSelectedDate(b)}
								className={classNames({
									date: true,
									empty: b===null,
									active: b==selected_day && month==selected_month && year==selected_year,
								})}
							>{b}</div>
						</td>
					))}
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
					{a.map((b, s)=>(
						<td key={`cal-mnth-${i}-${s}`} colSpan={2} className={classNames({
							today: today_month===s+(i*3) && today_year===year,
						})}>
							<div className={classNames("time", {
								active: selected_month===s+(i*3) && selected_year===year
							})} onClick={()=>{
								setMonth(s+(i*3));
								setCurrentMode('date')
							}}>{locale.months[s+(i*3)]}</div>
						</td>
					))}
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

	return <table className={classNames('fr calendar table', currentMode, props.color)} style={{ borderRadius: 8 }}>
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