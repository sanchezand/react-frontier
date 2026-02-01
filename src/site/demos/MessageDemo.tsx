import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Message } from '../../components';

var MessageDemo = ()=>{
	var { t } = useTranslation();
	return <div style={{ maxWidth: 500, margin: 'auto', marginTop: 20 }}>
		<Message header="Message header">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius ullam dignissimos quis? Numquam odit obcaecati alias dolorum est dolore maxime, quasi, ducimus error dolor, sunt explicabo aut quibusdam aliquam. Veniam.
		</Message>
		<Message type='error' header="Message header">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. At, commodi officia esse dignissimos dolorum, cumque, saepe libero ex reprehenderit minus possimus facere odio fugiat culpa omnis animi inventore suscipit fuga!
		</Message>
		<Message type='success' header="Message header">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur consectetur molestias, error aperiam sit saepe facilis. Necessitatibus ex voluptatum dolorum delectus vero? Ab quibusdam beatae nostrum autem repellat facilis repellendus.
		</Message>
		<Message type='info' header="Message header">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet nam voluptas consequatur nemo! Voluptatem nostrum placeat obcaecati et repudiandae tempore necessitatibus nesciunt repellendus aut, quod dolores, exercitationem repellat optio cupiditate.
		</Message>
		<Message type='warning' header="Message header">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita sint in vero. Quia culpa excepturi dignissimos dolore totam temporibus non repudiandae fuga impedit qui, a perferendis officiis iste, nulla ipsum.
		</Message>
		<Message type='orange' header="Message header">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita sint in vero. Quia culpa excepturi dignissimos dolore totam temporibus non repudiandae fuga impedit qui, a perferendis officiis iste, nulla ipsum.
		</Message>

		<Message type='error' header='Errors' style={{ marginTop: 20 }} list={[
			'Nesciunt, fugit est ipsum voluptatem, quis modi atque ipsa iusto mollitia quos tempore omnis, asperiores quisquam.',
			'Molestias, expedita? Esse dicta quidem excepturi?'
		]} />
		<Message size='small' type='info' header='Alert! Small message' style={{ marginTop: 20 }} list={[
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
			'Sed adipisci consequatur repellat, voluptatem, perspiciatis ratione aut perferendis totam officiis',
			'Dolorum nobis quas nemo accusantium animi at exercitationem quia quisquam labore.'
		]} />
	</div>
}

export default MessageDemo;