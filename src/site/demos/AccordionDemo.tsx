import React, { useEffect, useState } from 'react';
import { Accordion } from '../../components';

interface AccordionDemoProps{
	
}

var AccordionDemo = (props: AccordionDemoProps)=>{
	useEffect(()=>{
		
	}, []);
	
	return <div style={{ maxWidth: 400, margin: 'auto', marginTop: 10 }}>
		<Accordion>
			<Accordion.Item title={'Item First one'}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi exercitationem aspernatur, illo voluptas corporis architecto amet ea mollitia cum nam dicta beatae quasi autem eum natus officiis sed ratione laborum.
			</Accordion.Item>
			<Accordion.Item title={'Item 2!!'}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis libero eaque laborum nobis hic distinctio corporis? Vel omnis quas deserunt, officiis asperiores laboriosam eos obcaecati quos fuga quam atque magnam.
			</Accordion.Item>
			<Accordion.Item title={'Item very last one'}>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accusantium, nisi error cupiditate veritatis commodi officia voluptatum nostrum velit dolorem ipsam, omnis veniam ipsum laborum voluptates possimus repellat. Nam, est?
			</Accordion.Item>
		</Accordion>
		<Accordion style={{ marginTop: 15 }} separate={false} multiple>
			<Accordion.Item title={'Item First one'}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi exercitationem aspernatur, illo voluptas corporis architecto amet ea mollitia cum nam dicta beatae quasi autem eum natus officiis sed ratione laborum.
			</Accordion.Item>
			<Accordion.Item title={'Item 2!!'}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis libero eaque laborum nobis hic distinctio corporis? Vel omnis quas deserunt, officiis asperiores laboriosam eos obcaecati quos fuga quam atque magnam.
			</Accordion.Item>
			<Accordion.Item title={'Item very last one'}>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla accusantium, nisi error cupiditate veritatis commodi officia voluptatum nostrum velit dolorem ipsam, omnis veniam ipsum laborum voluptates possimus repellat. Nam, est?
			</Accordion.Item>
		</Accordion>
	</div>
}

export default AccordionDemo;