import React from 'react';
import ReactDOM from 'react-dom/client';
import Navigation from './Navigation';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Navigation />
	</React.StrictMode>
);