import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Groupper } from '../../components';

interface GroupperDemoProps{
	
}

var GroupperDemo = (props: GroupperDemoProps)=>{
	var { t } = useTranslation();
	useEffect(()=>{
		
	}, []);
	
	return <div style={{ maxWidth: 800, margin: 'auto', marginTop: 15 }}>
		<Groupper style={{ maxWidth: 400, margin: 'auto', marginBottom: 15 }} title={'testing'} actions={(
			<Button text='lmao' />
		)}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ad nam, fugiat pariatur debitis sed rem doloribus, sint reiciendis quibusdam fuga dolorem explicabo ducimus culpa et molestiae facere ipsam id? <br />
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus illo, recusandae itaque consectetur non ipsam sunt repellat iste vitae veniam dolor deleniti repudiandae culpa quisquam, adipisci, quos officiis dolores rem. <br />
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum architecto voluptatibus optio quaerat nobis obcaecati eaque commodi, suscipit, earum, nihil consectetur? Ipsa blanditiis rem beatae natus dolorem. Totam, fugit sunt. <br />
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum reiciendis dolore animi hic suscipit placeat voluptatem maiores sint. Ea similique dolore veritatis ad modi architecto aspernatur aperiam est illo impedit.
		</Groupper>
		<Groupper fitted titleSize='small' style={{ maxWidth: 400, margin: 'auto', marginBottom: 15 }} title={'testing'} actions={(
			<Button text='lmao' />
		)}>
			<Groupper.Divider text={'test2'} top />
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, veritatis. Quaerat quod obcaecati eveniet porro suscipit dicta illum accusamus vel esse, expedita facere consectetur laudantium iusto fuga ipsa molestias mollitia!
			<Groupper.Divider text={'line test!'} type='line text' />
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio vitae, consequatur nostrum ut non officia quas impedit quos nemo hic assumenda minus sunt possimus iure. Accusamus velit perferendis illo voluptatibus?
			<Groupper.Divider type='dashed' />
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum, veniam. Hic animi dolore minus distinctio ratione eos at culpa optio soluta earum, mollitia provident deserunt error incidunt voluptate, nobis fugiat!
			<Groupper.Divider type='solid' />
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat saepe cum dolorem distinctio eveniet iusto dignissimos animi recusandae, eaque commodi sed incidunt. A aliquid porro, nisi aspernatur rerum doloribus facilis.
			<Groupper.Divider type='dotted' />
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure assumenda minus voluptates ipsam dolorum recusandae! Unde dolorem blanditiis, dicta iste animi ut eum fugiat. Aperiam hic magnam quod obcaecati placeat!
		</Groupper>
		<Groupper titleCentered titleSize='big' style={{ maxWidth: 400, margin: 'auto' }} title={'testing'}  actions={(
			<Button text='lmao' />
		)}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ad nam, fugiat pariatur debitis sed rem doloribus, sint reiciendis quibusdam fuga dolorem explicabo ducimus culpa et molestiae facere ipsam id? <br />
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus illo, recusandae itaque consectetur non ipsam sunt repellat iste vitae veniam dolor deleniti repudiandae culpa quisquam, adipisci, quos officiis dolores rem. <br />
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum architecto voluptatibus optio quaerat nobis obcaecati eaque commodi, suscipit, earum, nihil consectetur? Ipsa blanditiis rem beatae natus dolorem. Totam, fugit sunt. <br />
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum reiciendis dolore animi hic suscipit placeat voluptatem maiores sint. Ea similique dolore veritatis ad modi architecto aspernatur aperiam est illo impedit.
		</Groupper>
	</div>
}

export default GroupperDemo;