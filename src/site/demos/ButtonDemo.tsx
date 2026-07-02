import React, { useEffect, useState } from 'react';
import { Button, IconsList } from '../../components';
import { Link } from 'react-router-dom';

var ButtonDemo = ()=>{
	useEffect(()=>{
		
	}, []);
	
	return <div>
		<div className="demo buttons">
			<Button text='Normal' />
			<Button text='Black' color={'black'} disabled={false} />
			<Button text='Blue' color={'blue'} />
			<Button text='Green' color={'green'} />
			<Button text='Orange' color={'orange'} />
			<Button text='Purple' color={'purple'} />
			<Button text='Red' color={'red'} />
			<Button text='White' color={'white'} />
			<Button text='Basic' basic />
		</div>
		<div className="section head">Sizes</div>
		<div className="demo buttons">
			<Button size='tiny' text='Tiny' />
			<Button size='small' text='Small' />
			<Button text='Normal' />
			<Button size='big' text='Big' />
		</div>
		<div className="section head">Loading</div>
		<div className="demo buttons">
			<Button loading color="black" size='tiny' text='Tiny' />
			<Button loading color="red" size='small' text='Small' />
			<Button loading color="orange" text='Normal' />
			<Button loading size='big' text='Big' />
		</div>
		<div className="section head">Disabled</div>
		<div className="demo buttons">
			<Button disabled color="black" size='tiny' text='Tiny' />
			<Button disabled color="black" size='small' text='Small' />
			<Button disabled color="black" text='Normal' />
			<Button disabled color="black" text='Big' />
		</div>
		<div className="section head">Icon</div>
		<div className="demo buttons">
			{[...IconsList].slice(Math.floor(Math.random()*50), Math.floor(Math.random()*50)+50).slice(0, 10).map((a, i)=>(
				<Button icon iconName={a} size={['big', 'normal', 'small', 'tiny'][i%4] as any} />
			))}
		</div>
		<div className="section head">Button menu</div>
		<div className="demo buttons">
			<Button text='Options' iconRight='caret-down' menu={[
				{ text: 'Test button', iconName: 'circle', iconSolid: false },
				{ text: 'Link item', as: Link, to: '/modal', iconName: 'plus' },
				{ text: 'Test 3', iconName: 'plus', items: [
					{ text: 'Sub 1', iconName: 'address-card' },
					{ text: 'Sub Link', as: Link, to: '/label' },
					{ separator: true },
					{ text: 'Sub 3' },
				]},
				{ text: 'Test 4' },
			]} />
			<Button icon iconName='ellipsis-h' size='tiny' menu={[
				{ text: 'Test button' },
				{ separator: true },
				{ text: 'Test 2' },
				{ text: 'Test 3' },
				{ text: 'Test 4' },
			]} />
		</div>
		{/* <Header text='Frontier' style={{ margin: 15 }} />
		<Groupper title='Buttons' width={600}>
		</Groupper> */}
	</div>
}

export default ButtonDemo;