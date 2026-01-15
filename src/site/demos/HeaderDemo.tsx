import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Header } from '../../components';

interface HeaderDemoProps{
	
}

var HeaderDemo = (props: HeaderDemoProps)=>{
	var { t } = useTranslation();
	useEffect(()=>{
		
	}, []);
	
	return <div style={{ maxWidth: 500, margin: 'auto', marginTop: 15 }}>
		<Header text={'Header'} subtext={'Header subtext here'} size='small' />
		<Header text={'Header'} subtext={'Header subtext here'} />
		<Header text={'Header'} subtext={'Header subtext here'} size='big' />
		<Header text={'Header'} subtext={'Header subtext here'} size='huge' />
		<div style={{ marginTop: 50 }} />
		<Header text={'Header'} subtext={'Header subtext here'} iconName='ban' size='small' />
		<Header text={'Header'} subtext={'Header subtext here'} iconName='ban' />
		<Header text={'Header'} subtext={'Header subtext here'} iconName='ban' size='big' />
		<Header text={'Header'} subtext={'Header subtext here'} iconName='ticket' size='huge' />
		<div style={{ marginTop: 50 }} />
		<Header text={'Header'} subtext={'Header subtext here'} size='small' loading />
		<Header text={'Header'} subtext={'Header subtext here'} loading />
		<Header text={'Header'} subtext={'Header subtext here'} size='big' loading actions={<>
			<Button text='Retry' />	
		</>} />
		<Header text={'Header'} subtext={'Header subtext here'} size='huge' loading />
	</div>
}

export default HeaderDemo;