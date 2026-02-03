import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SegmentControl } from '../../components';

interface SegmentControlDemoProps{
	
}

var SegmentControlDemo = (props: SegmentControlDemoProps)=>{
	var [val, setVal] = useState<number>(null);
	
	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<SegmentControl selected={[val]} onClick={setVal} style={{ marginBottom: 10 }} segments={[
			{ value: 1, text: 'Test1' },
			{ value: 2, text: 'Test2' },
			{ value: 3, text: 'Test3' }
		]} />
		<SegmentControl selected={[]} onClick={setVal} divided={false} style={{ marginBottom: 10 }} segments={[
			{ value: 1, text: 'Test1' },
			{ value: 2, text: 'Test2' },
			{ value: 3, text: 'Test3' }
		]} />
		<SegmentControl selected={val} onClick={setVal} segments={[
			{ value: 1, text: 'Test1' },
			{ value: 2, text: 'Test2' },
			{ value: 3, text: 'Test3' }
		]} />
	</div>
}

export default SegmentControlDemo;