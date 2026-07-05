import React, { useEffect, useState } from 'react';
import './style/demo.scss'
import { createBrowserRouter, Link, Outlet, RouterProvider, useRouteError } from 'react-router-dom'
import { FrontierProvider, IconName } from '../components';
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
import SiteContainer from './SiteContainer';
import StatDemo from './demos/StatDemo';
import TableDemo from './demos/TableDemo';
import ToolbarDemo from './demos/ToolbarDemo';
import ToastDemo from './demos/ToastDemo';
import MenuDemo from './demos/MenuDemo';

const NavigationRoutes : {
	path: string,
	element: React.JSX.Element,
	title: string,
	iconName: IconName,
}[] = [
	{ path: '/dropdown', 			title: 'Dropdown',			iconName: null, 		element: <DropdownDemo /> 			}, 
	{ path: '/button', 				title: 'Button',				iconName: null, 		element: <ButtonDemo /> 			}, 
	{ path: '/checkbox', 			title: 'Checkbox',			iconName: null, 		element: <CheckboxDemo /> 			}, 
	{ path: '/accordion', 			title: 'Accordion',			iconName: null, 		element: <AccordionDemo /> 		}, 
	{ path: '/calendar', 			title: 'Calendar',			iconName: null, 		element: <CalendarDemo /> 			}, 
	{ path: '/header', 				title: 'Header',				iconName: null, 		element: <HeaderDemo /> 			}, 
	{ path: '/groupper', 			title: 'Groupper',			iconName: null, 		element: <GroupperDemo />			},
	{ path: '/input', 				title: 'Input',				iconName: null, 		element: <InputDemo />				},
	{ path: '/label', 				title: 'Label',				iconName: null, 		element: <LabelDemo />				},
	{ path: '/menu',	 				title: 'Menu',					iconName: null, 		element: <MenuDemo />				},
	{ path: '/message', 				title: 'Message',				iconName: null, 		element: <MessageDemo />			},
	{ path: '/modal', 				title: 'Modal',				iconName: null, 		element: <ModalDemo />				},
	{ path: '/pagination', 			title: 'Pagination',			iconName: null, 		element: <PaginationDemo />		},
	{ path: '/placeholder', 		title: 'Placeholder',		iconName: null, 		element: <PlaceholderDemo />		},
	{ path: '/popup', 				title: 'Popup',				iconName: null, 		element: <PopupDemo />				},
	{ path: '/segmentcontrol', 	title: 'Segment Control',	iconName: null, 		element: <SegmentControlDemo />	},
	{ path: '/stat', 					title: 'Stats',				iconName: null, 		element: <StatDemo />				},
	{ path: '/table', 				title: 'Table',				iconName: null, 		element: <TableDemo />				},
	{ path: '/toolbar', 				title: 'Toolbar',				iconName: null, 		element: <ToolbarDemo />			},
	{ path: '/toast', 				title: 'Toast',				iconName: null, 		element: <ToastDemo />				},
]


var Navigation = ()=>{
	var ErrorElement = ()=>{
		const error = (useRouteError() as any);
		return <div>
			<div className="fr2 centered header" style={{ fontSize: 100 }}>
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
		errorElement: <SiteContainer items={NavigationRoutes} outlet={<ErrorElement />} />,
		element: <SiteContainer items={NavigationRoutes} outlet={<Outlet />} />,
		children: [
			{ path: '/', element: <ButtonDemo /> }, 
			...NavigationRoutes.map(a=>({
				path: a.path,
				element: a.element
			}))
		]
	}])

	return <FrontierProvider locale='en'>
		<RouterProvider router={Router} />
	</FrontierProvider>
}

export default Navigation;