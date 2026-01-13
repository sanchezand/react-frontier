import React, { useEffect, useState } from 'react';
// import { Accordion, Button, Groupper, Header, Sidebar } from 'react-frontier';
import { createBrowserRouter, Link, Outlet, RouterProvider, useRouteError } from 'react-router-dom'
import './style/demo.scss'
import ButtonDemo from './demos/ButtonDemo';
import DropdownDemo from './demos/DropdownDemo';
import CheckboxDemo from './demos/CheckboxDemo';


var NavigationSidebar = (props: { outlet: any })=>{
	return <div>
		{/* <Sidebar title='Test'>
			<Sidebar.Item text='Test' />
			<Sidebar.Item text='Test' />
			<Sidebar.Item text='Test' />
		</Sidebar> */}
		{props.outlet}
	</div>
}

var Navigation = ()=>{
	var ErrorElement = ()=>{
		const error = (useRouteError() as any);
		// return <Header 
		// 	centered 
		// 	text={error.status} 
		// 	style={{ fontSize: 100 }} 
		// 	subtext={error.status===404 ? 'Page not found' : 'Unexpected error'}
		// 	subheaderStyle={{ fontSize: 20 }}
		// />
		return <div>
			test
		</div>
	}

	const Router = createBrowserRouter([{
		path: '/',
		errorElement: <NavigationSidebar outlet={<ErrorElement />} />,
		element: <NavigationSidebar outlet={<Outlet />} />,
		children: [
			{ path: '/', element: <ButtonDemo /> }, 
			{ path: '/dropdown', element: <DropdownDemo /> }, 
			{ path: '/checkbox', element: <CheckboxDemo /> }, 
		]
	}])

	return <RouterProvider router={Router} />
}

export default Navigation;