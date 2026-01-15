import React, { useEffect, useState } from 'react';
import { Calendar } from '../../components';

interface CalendarDemoProps{
	
}

var CalendarDemo = (props: CalendarDemoProps)=>{
	var [selected, setSelected] = useState<Date>(null);
	return <div style={{ maxWidth: 400, margin: 'auto', marginTop: 15 }}>
		<Calendar onSelected={setSelected} mode={'year'} date={selected} minDate={new Date(2026, 3, 13)} maxDate={new Date(2027, 8, 28)} />
		<Calendar style={{ marginTop: 15 }} date={new Date(2024, 8, 13)} onSelected={console.log} />
	</div>
}

export default CalendarDemo;