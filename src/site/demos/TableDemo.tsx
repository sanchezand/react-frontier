import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Table } from '../../components';

interface TableDemoProps{
	
}

var TableDemo = (props: TableDemoProps)=>{
	var { t } = useTranslation();
	useEffect(()=>{
		
	}, []);
	
	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Table details>
			<Table.Head title='LMAOO' titleRight={(
				<Button text='lol' size='tiny' />
			)} />
			<Table.Body>
				<Table.Row data={[ 'ID', 'ROW' ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
			</Table.Body>
		</Table>
		<Table style={{ marginTop: 15 }}>
			<Table.Head title='LMAOO' />
			<Table.Body>
				<Table.Row data={[ 'lmao', 'lmao', 'lmao' ]} />
				<Table.Row data={[ 'lmao', 'lmao', 'lmao' ]} />
				<Table.Row data={[ 'lmao', 'lmao', 'lmao' ]} />
				<Table.Row>
					<Table.Cell collapsing value={'hahaaaa'} />
					<Table.Cell>haha</Table.Cell>
					<Table.Cell>haha</Table.Cell>
				</Table.Row>
				<Table.Divider />
				<Table.Row data={[ 'lmao', 'lmao', 'lmao' ]} />
				<Table.Row data={[ 'lmao', 'lmao', 'lmao' ]} />
			</Table.Body>
			<Table.Footer actions={(
				<Button text='Test' color='black' />
			)} />
		</Table>
	</div>
}

export default TableDemo;