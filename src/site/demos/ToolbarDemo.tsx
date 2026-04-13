import React, { useEffect, useState } from 'react';
import { Toolbar } from '../../components';
import { Link } from 'react-router-dom';

interface ToolbarDemoProps{
	
}

var ToolbarDemo = (props: ToolbarDemoProps)=>{
	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Toolbar>
			<Toolbar.Item text='Frontier' iconName='wrench' />
			<Toolbar.Dropdown text='Dropdown' iconName='pen' items={[
				{ text: 'Frontier', iconName: 'address-book' },
				{ text: 'Submenu', items: [
					{ text: 'Submenu 1' },
					{ text: 'Submenu 2' },
					{ text: 'Submenu 3', items: [
						{ text: 'Subsubmenu!!' },
						{ text: 'Subsubmenu!!' },
						{ text: 'Subsubmenu!!' },
					] },
					{ text: 'Submenu 4' },
				] },
				{ text: 'Frontier' },
				{ text: 'Frontier' }
			]} />
			<Toolbar.Dropdown text='Dropdown' iconName='pen' items={[
				{ text: 'Frontier' },
				{ text: 'Frontier', disabled: true },
				{ text: 'Link', as: Link, to: '/dropdown' }
			]} />
		</Toolbar>
		<Toolbar divided stretch items={[
			{ text: 'Frontier' },
			{ text: 'Item 2' },
			{ text: 'Item 4' },
		]} />
	</div>
}

export default ToolbarDemo;