import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Placeholder } from '../../components';

interface PlaceholderDemoProps{
	
}

var PlaceholderDemo = (props: PlaceholderDemoProps)=>{
	var { t } = useTranslation();
	useEffect(()=>{
		
	}, []);
	
	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Placeholder width={50} />
		<Placeholder width={50} />
		<Placeholder width={50} />
		<Placeholder width={50} />
		<Placeholder width={50} />
		<Placeholder width={50} />
	</div>
}

export default PlaceholderDemo;