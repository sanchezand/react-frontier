import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stat } from '../../components';

interface StatDemoProps{
	
}

var StatDemo = (props: StatDemoProps)=>{
	var { t } = useTranslation();
	useEffect(()=>{
		
	}, []);
	
	return <div>
		<Stat>
			<Stat.Value>10,000</Stat.Value>
			<Stat.Label>Label</Stat.Label>
		</Stat>

		<Stat>
			<Stat.Value>10,000</Stat.Value>
			<Stat.Label>Label</Stat.Label>
		</Stat>

		<Stat.Group>
			<Stat>
				<Stat.Value>10,000</Stat.Value>
				<Stat.Label>Label</Stat.Label>
			</Stat>
			<Stat>
				<Stat.Value>10,000</Stat.Value>
				<Stat.Label>Label</Stat.Label>
			</Stat>
			<Stat>
				<Stat.Value>10,000</Stat.Value>
				<Stat.Label>Label</Stat.Label>
			</Stat>
		</Stat.Group>

		<Stat size='big'>
			<Stat.Value>10,000</Stat.Value>
			<Stat.Label>Label</Stat.Label>
		</Stat>
	</div>
}

export default StatDemo;