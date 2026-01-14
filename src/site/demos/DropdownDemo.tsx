import React, { useEffect, useState } from 'react';
import { Dropdown } from '../../components';

interface DropdownDemoProps{
	
}

var DropdownDemo = (props: DropdownDemoProps)=>{
	var [val, setVal] = useState<number>(null);
	var [val2, setVal2] = useState<number>(null);
	var [val3, setVal3] = useState<number>(null);

	const TEST_ITEMS = new Array(30).fill(0).map((a, i)=>({
		text: `Item ${i}`,
		value: i
	}))
	
	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Dropdown
			iconName='address-book'
			label='Simple dropdown'
			value={val}
			onValueChange={a=>setVal(a)}
			items={TEST_ITEMS}
		/>
		<Dropdown search
			style={{ marginTop: 15 }}
			iconName='search-dollar'
			label='Search'
			value={val2}
			onValueChange={a=>setVal2(a)}
			items={TEST_ITEMS}
		/>
		<Dropdown
			label='Async search'
			value={val3}
			onValueChange={a=>setVal3(a)}
			style={{ marginTop: 15 }}
			onAsyncSearch={v=>{
				return new Promise(resolve=>{
					setTimeout(()=>{
						return resolve({
							items: TEST_ITEMS.filter(a=>a.text.toLowerCase().indexOf(v.toLowerCase())>-1),
							error: null
						})
					}, 500);
				})
			}}
		/>
	</div>
}

export default DropdownDemo;