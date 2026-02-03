import React, { useEffect, useState } from 'react';
import './style/demo.scss'
import { createBrowserRouter, Link, Outlet, RouterProvider, useRouteError } from 'react-router-dom'
import { LocaleProvider } from '../components/useLocale';
import { FrontierProvider } from '../components';
import ButtonDemo from './demos/ButtonDemo';
import DropdownDemo from './demos/DropdownDemo';
import CheckboxDemo from './demos/CheckboxDemo';
import AccordionDemo from './demos/AccordionDemo';
import CalendarDemo from './demos/CalendarDemo';
import HeaderDemo from './demos/HeaderDemo';
import GroupperDemo from './demos/GroupperDemo';
import InputDemo from './demos/InputDemo';
import LabelDemo from './demos/LabelDemo';
import MessageDemo from './demos/MessageDemo';
import ModalDemo from './demos/ModalDemo';
import PaginationDemo from './demos/PaginationDemo';
import PlaceholderDemo from './demos/PlaceholderDemo';
import PopupDemo from './demos/PopupDemo';
import SegmentControlDemo from './demos/SegmentControlDemo';


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
			{ path: '/header', element: <HeaderDemo /> }, 
			{ path: '/groupper', element: <GroupperDemo /> },
			{ path: '/input', element: <InputDemo /> },
			{ path: '/label', element: <LabelDemo /> },
			{ path: '/message', element: <MessageDemo /> },
			{ path: '/modal', element: <ModalDemo /> },
			{ path: '/pagination', element: <PaginationDemo /> },
			{ path: '/placeholder', element: <PlaceholderDemo /> },
			{ path: '/popup', element: <PopupDemo /> },
			{ path: '/segmentcontrol', element: <SegmentControlDemo /> },
		]
	}])

	return <FrontierProvider locale='en'>
		<RouterProvider router={Router} />
	</FrontierProvider>
}

export default Navigation;