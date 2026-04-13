import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Pagination, Table } from '../../components';

interface TableDemoProps{
	
}

var TableDemo = (props: TableDemoProps)=>{
	var { t } = useTranslation();
	useEffect(()=>{
		
	}, []);
	
	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Table details>
			<Table.Head title='frontierO' titleRight={(
				<Button text='button' size='tiny' iconName='wrench' color='blue' />
			)} />
			<Table.Body>
				<Table.Row data={[ 'ID', 'ROW' ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
			</Table.Body>
			<Table.Footer actions={(
				<Pagination inline page={3} onPageChange={()=>{}} />
			)}>
			</Table.Footer>
		</Table>
		<Table style={{ marginTop: 15 }}>
			<Table.Head title='frontier'>
				<Table.Row>
					<Table.Cell rowSpan={2} header>
						Col1
					</Table.Cell>
					<Table.Cell header colSpan={2} centered>
						Col1
					</Table.Cell>
					<Table.Cell rowSpan={2} header>
						Col1
					</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell header>
						Row 2
					</Table.Cell>
					<Table.Cell header>
						Row 2
					</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.Row data={[ 'frontier', 'frontier', 'frontier', 'frontier' ]} />
				<Table.Row data={[ 'frontier', 'frontier', 'frontier', 'frontier' ]} />
				<Table.Row data={[ 'frontier', 'frontier', 'frontier', 'frontier' ]} />
				<Table.Row>
					<Table.Cell collapsing value={'test'} />
					<Table.Cell>testt</Table.Cell>
					<Table.Cell>Testtt</Table.Cell>
					<Table.Cell>Testttt</Table.Cell>
				</Table.Row>
				<Table.Divider />
				<Table.Row header data={[ 'frontier', 'frontier', 'frontier', 'frontier' ]} />
				<Table.Row data={[ 'frontier', 'frontier', 'frontier', 'frontier' ]} />
			</Table.Body>
			<Table.Footer actions={(
				<Button text='Test' color='black' />
			)} />
		</Table>
	</div>
}

export default TableDemo;