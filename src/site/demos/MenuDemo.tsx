import React, { useEffect, useState } from 'react';
import { Button, IconsList, Label, Menu } from '../../components';
import { Link } from 'react-router-dom';

var ButtonDemo = ()=>{
	useEffect(()=>{
		
	}, []);
	
	return <div>
		<Menu
			trigger={(
				<Label value={'TEst label!'} />
			)}
			items={[
				{ text: 'Test frontier' }
			]}
		/>
	</div>
}

export default ButtonDemo;