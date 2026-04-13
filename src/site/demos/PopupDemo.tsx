import React, { useEffect, useState } from 'react';
import { Button, Popup } from '../../components';

interface PopupDemoProps{
	
}

var PopupDemo = (props: PopupDemoProps)=>{	
	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Popup
			trigger={
				<Button text='Frontier' />
			}
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. A vitae officia ipsam sed saepe cum aperiam soluta alias vero. Veritatis doloremque qui perspiciatis exercitationem quas dolorum nam officiis blanditiis repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates laborum ab perspiciatis natus odio quisquam corporis ipsa suscipit, repellat architecto commodi blanditiis facilis accusamus nostrum soluta explicabo eius dolorem ex.
		</Popup>
	</div>
}

export default PopupDemo;