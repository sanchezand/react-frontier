import React, { useEffect, useState } from 'react';
import { Header, Groupper, Button } from 'react-frontier';

var ButtonDemo = ()=>{
	useEffect(()=>{
		
	}, []);
	
	return <div>
		<Header text='Frontier' style={{ margin: 15 }} />
		<Groupper title='Buttons' width={600}>
			<div className="demo buttons">
				<Button text='Normal' />
				<Button text='Black' color={'black'} />
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
				<Button disabled color="purple" size='tiny' text='Tiny' />
				<Button disabled color="blue" size='small' text='Small' />
				<Button disabled color="red" text='Normal' />
				<Button disabled color="white" text='Big' />
			</div>
		</Groupper>
	</div>
}

export default ButtonDemo;