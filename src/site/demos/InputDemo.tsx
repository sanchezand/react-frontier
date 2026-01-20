import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Input } from '../../components';

interface InputDemoProps{
	
}

var InputDemo = (props: InputDemoProps)=>{
	var { t } = useTranslation();
	var [calVal, setCalVal] = useState<Date>(null);
	var [valTest, setValTest] = useState<string>('');
	var [valTest2, setValTest2] = useState<string>('');
	var [valTest3, setValTest3] = useState<string>('');
	var [test, setTest] = useState<boolean>(false);

	useEffect(()=>{
		var t = false;
		var int = setInterval(()=>{
			t = !t;
			setTest(t);
		}, 500);
		return ()=>{
			clearInterval(int);
		}
	}, []);

	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Input label='Testing' placeholder='Placeholder test' iconName='calendar' fluid calendar={{
			mode: 'time',
			onSelected: setCalVal,
			date: calVal,
			format: 'YYYY-MM-DD HH:mm'
		}} />
		<Input label='Test' value={valTest} onChange={setValTest} iconName='ticket' comment='Comment test' style={{ marginTop: 15 }} />
		<Input label='Test' required textarea style={{ marginTop: 15 }} />
		<Dropdown value={1} label='lmao' required items={[
			{ text: 'Test 1', value: 1 },
			{ text: 'Test 2', value: 2 },
			{ text: 'Test 3', value: 3 },
		]} />
		<Input label='Test' comment='test' type={test ? 'warning' : 'normal'} value={valTest2} onChange={setValTest2} iconName='ticket' fluid style={{ marginTop: 15 }} />
		<Input iconName='search' label='Test' comment='test' type={test ? 'error' : 'normal'} value={valTest3} onChange={setValTest3} fluid style={{ marginTop: 15 }} />
	</div>
}

export default InputDemo;