import React, { useEffect, useState } from 'react';
import { Calendar } from '../../components';

interface CalendarDemoProps{
	
}

var CalendarDemo = (props: CalendarDemoProps)=>{
	useEffect(()=>{
		
	}, []);
	
	return <div style={{ maxWidth: 400, margin: 'auto', marginTop: 15 }}>
		<Calendar onSelected={console.log} mode={'date'} />
		<Calendar style={{ marginTop: 15 }} date={new Date(2024, 8, 13)} onSelected={console.log} />
	</div>
}

export default CalendarDemo;