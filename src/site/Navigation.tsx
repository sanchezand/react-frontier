import React, { useEffect, useState } from 'react';
// import { Accordion, Button, Groupper, Header, Sidebar } from 'react-frontier';
import { createBrowserRouter, Link, Outlet, RouterProvider, useRouteError } from 'react-router-dom'
import './style/demo.scss'
import ButtonDemo from './demos/ButtonDemo';
import DropdownDemo from './demos/DropdownDemo';
import CheckboxDemo from './demos/CheckboxDemo';
import AccordionDemo from './demos/AccordionDemo';
import CalendarDemo from './demos/CalendarDemo';
import { LocaleProvider } from '../components/useLocale';
import { FrontierProvider } from '../components';


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
		return <div>
			<div className="fr centered header" style={{ fontSize: 100 }}>
				{error.status}
				<div className="sub header" style={{ fontSize: 20 }}>
					{error.status===404 ? 'Page not found' : (
						error.message
					)}
				</div>
			</div>
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
			{ path: '/accordion', element: <AccordionDemo /> }, 
			{ path: '/calendar', element: <CalendarDemo /> }, 
		]
	}])

	return <FrontierProvider locale='en'>
		<RouterProvider router={Router} />
	</FrontierProvider>
}

export default Navigation;