import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from '../../components';

const LabelColors = [null, 'black', 'blue', 'yellow', 'orange', 'green', 'red', 'transparent'];
var LabelDemo = ()=>{
	var { t } = useTranslation();
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
	
	return <div style={{ maxWidth: 500, margin: 'auto', marginTop: 20 }}>
		Colors <br />
		{LabelColors.map(a=>(
			<Label color={a as any}>test</Label>
		))}
		<br />
		Sizes <br />
		<Label size='small' value={'test'} />
		<Label size='normal' value={'test'} />
		<br />
		
		Loading <br />
		<Label size='small' loading value={'test'} />
		<Label size='normal' loading value={'test'} />
		<br />

	</div>
}

export default LabelDemo;