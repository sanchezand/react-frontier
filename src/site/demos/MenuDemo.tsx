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

		<Menu
			inline
			style={{ position: 'absolute', left: 40, top: 100 }}
			items={[
				{ text: 'Test frontier2' },
				{ separator: true },
				{ text: 'Test frontier2', items: [
					{ text: 'Submenu!' },
					{ text: 'Submenu!' },
					{ separator: true },
					{ text: 'Submenu!', items: [
						{ text: 'Submenu 2!!!!!' },
						{ text: 'Submenu 2!!!!!' },
						{ separator: true },
						{ text: 'Submenu 2!!!!!' },
						{ text: 'Submenu 2!!!!!' }
					] },
				] },
				{ text: 'Test frontier2' },
			]}
		/>
	</div>
}

export default ButtonDemo;