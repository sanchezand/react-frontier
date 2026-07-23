import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Label, Pagination, Table } from '../../components';
import { Link } from 'react-router-dom';

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
				<Table.Row data={[ 'ID', <Label value={'Testing'} /> ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
			</Table.Body>
			<Table.Footer actions={(
				<Pagination inline page={3} onPageChange={()=>{}} />
			)}>
			</Table.Footer>
		</Table>
		<Table style={{ marginTop: 15 }}>
			<Table.Head title='Test icons' />
			<Table.Body>
				<Table.Row
					collapsingIndexes={[1]}
					data={[
						'Test',
						<Button icon iconName='pencil' size='tiny' menu={[
							{ text: 'test' }
						]} />
					]}
				/>
			</Table.Body>
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
				<Table.Row color='red' data={[ 'frontier', 'frontier', 'frontier', 'frontier' ]} />
				<Table.Row data={[ 'frontier', 'frontier', 'frontier', 'frontier' ]} />
				<Table.Row>
					<Table.Cell color='green' collapsing value={'test'} />
					<Table.Cell>testt</Table.Cell>
					<Table.Cell color='yellow'>Testtt</Table.Cell>
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

		<Table style={{ marginTop: 15 }}>
			<Table.Head title='Links' />
			<Table.Body>
				<Table.Row selectable compact 
					as={Link} 
					to={'/button'}
					data={['Link', 'Link', 'Link']}
				/>
				<Table.Row>
					<Table.Cell selectable compact as={Link} to={'/dropdown'}>Link cell</Table.Cell>
					<Table.Cell>
						<Link to={'/label'} className='compact'>
							Normal link
						</Link>
					</Table.Cell>
					<Table.Cell selectable>Selectable</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell compact as={Link} to={'/test'}>
						<Label value={'test'} />
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
		<Table selectable style={{ marginTop: 15 }}>
			<Table.Head title='Sectable table' />
			<Table.Body
				data={[
					['Test', 'Test'],
					['Test', 'Test'],
					['Test', 'Test'],
				]}
			/>
		</Table>
		<Table style={{ marginTop: 15 }}>
			<Table.Head title='Sectable some rows' />
			<Table.Body>
				<Table.Row data={['Test', 'Test']} />
				<Table.Row data={['Test', 'Test']} selectable />
				<Table.Row>
					<Table.Cell value={'test'} selectable />
					<Table.Cell value={'test'} />
				</Table.Row>
				<Table.Row data={['Test', 'Test']} selectable />
				<Table.Row>
					<Table.Cell value={'test'} selectable />
					<Table.Cell value={'test'} selectable />
				</Table.Row>
			</Table.Body>
		</Table>
	</div>
}

export default TableDemo;