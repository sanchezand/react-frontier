import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../components';

interface CheckboxDemoProps{
	
}

var CheckboxDemo = (props: CheckboxDemoProps)=>{
	var [checked, setChecked] = useState<boolean>(false);
	
	return <div style={{
		padding: 20
	}}>
		<Checkbox color='orange' checked={checked} onChange={setChecked} />
	</div>
}

export default CheckboxDemo;