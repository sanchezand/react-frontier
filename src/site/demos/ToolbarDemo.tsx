import React, { useEffect, useState } from 'react';
import { Groupper, Toolbar } from '../../components';
import { Link } from 'react-router-dom';

interface ToolbarDemoProps{
	
}

var ToolbarDemo = (props: ToolbarDemoProps)=>{
	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Toolbar>
			<Toolbar.Item text='Frontier' iconName='wrench' as={Link} to={'/modal'} />
			<Toolbar.Dropdown text='Dropdown' iconName='pen' items={[
				{ text: 'Frontier', iconName: 'address-book', as: Link, to: '/dropdown' },
				{ text: 'Submenu', items: [
					{ text: 'Submenu 1' },
					{ text: 'Submenu 2' },
					{ text: 'Submenu 3', items: [
						{ text: 'Subsubmenu!!', as: Link, to: '/button' },
						{ text: 'Subsubmenu!!' },
						{ text: 'Subsubmenu!!' },
					] },
					{ text: 'Submenu 4' },
				] },
				{ text: 'Frontier' },
				{ text: 'Frontier' }
			]} />
			<Toolbar.Dropdown disabled text='Dropdown' iconName='pen' items={[
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
		<Groupper title={'Frontier'}>
			<Toolbar fitted>
				<Toolbar.Item text='Frontier' iconName='wrench' />
				<Toolbar.Dropdown text='Dropdown' iconName='pen' items={[
					{ text: 'Frontier' },
					{ text: 'Frontier', disabled: true },
					{ text: 'Link', as: Link, to: '/dropdown' }
				]} />
				<Toolbar.Item text='Frontier' iconName='wrench' />
			</Toolbar>

			Lorem ipsum dolor sit amet consectetur adipisicing elit. Non aliquid, ex enim accusamus, consequuntur dolorem expedita incidunt ipsa id nulla, dolore impedit sed possimus! Vitae facilis laudantium natus! Quaerat, dolor?
			<Groupper.Divider />
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae libero modi eaque ipsum eius a dolor eum sed. Accusamus, commodi minus! Dolorem, explicabo eveniet! Iusto quidem provident ea nisi deleniti.
		</Groupper>
	</div>
}

export default ToolbarDemo;