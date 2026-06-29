import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, Input, Table, Toolbar } from '../../components';
import Modal from '../../components/Modal';

interface ModalDemoProps{
	
}

var ModalDemo = (props: ModalDemoProps)=>{
	var { t } = useTranslation();
	var [simpleModal, setSimpleModal] = useState<boolean>(false);
	var [secondModal, setSecondModal] = useState<boolean>(false);
	useEffect(()=>{
		
	}, []);
	
	return <div style={{ maxWidth: 500, margin: 'auto', paddingTop: 20 }}>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum libero vel blanditiis, sequi dicta exercitationem dolorum, aperiam magni quia officia eius, dolor sapiente alias est maxime molestiae rem praesentium accusantium!
		<Button text='Open modal' onClick={()=>setSimpleModal(true)} />
		<Modal open={simpleModal} onClose={setSimpleModal}>
			<Modal.Header text='Test' actions={(
				<Button text='Test button' menu={[
					{ text: 'Frontier' },
					{ text: 'frontier', disabled: true },
					{ text: 'menu', items: [
						{ text: 'Frontier' },
						{ text: 'Frontier', disabled: true },
						{ text: 'Frontier' },
					] }
				]} />
			)} />
			<Modal.Input placeholder='Search' />
			<Toolbar>
				<Toolbar.Item text='Open second modal' iconName='wrench' onClick={()=>setSecondModal(true)} />
				<Toolbar.Dropdown text='Dropdown' iconName='pen' items={[
					{ text: 'Frontier' },
					{ text: 'Frontier', disabled: true },
				]} />
				<Toolbar.Item text='Frontier' iconName='wrench' />
			</Toolbar>
			<Modal.Content>
				<Dropdown search
					style={{ marginBottom: 15 }}
					iconName='search-dollar'
					label='Search'
					value={null}
					items={[
						{ text: 'TEst' },
						{ text: 'TEst' },
						{ text: 'TEst' },
					]}
				/>

				<Input label='Calendar' calendar={{
					
				}} />
				
				<Table details fitted>
					<Table.Head title='frontierO' titleRight={(
						<Button text='button' size='tiny' iconName='wrench' color='blue' />
					)} />
					<Table.Body>
						<Table.Row data={[ 'ID', 'ROW' ]} />
						<Table.Row data={[ 'ID', 'ROW' ]} />
						<Table.Row data={[ 'ID', 'ROW' ]} />
						<Table.Row data={[ 'ID', 'ROW' ]} />
					</Table.Body>
				</Table>
				
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
			</Modal.Content>
			<Modal.Actions>
				<Button text='Close?' onClick={()=>setSimpleModal(false)} />
			</Modal.Actions>
		</Modal>

		<Modal open={secondModal} onClose={()=>setSecondModal(false)}>
			<Modal.Header>test</Modal.Header>
			<Modal.Content>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quod, a esse ut delectus molestias, eius dolorum quisquam ducimus, obcaecati mollitia aliquid accusantium repellat fugit voluptatum perspiciatis! Error, recusandae distinctio.
			</Modal.Content>
			<Modal.Actions>
				<Button text='Close' onClick={()=>setSecondModal(false)} />
			</Modal.Actions>
		</Modal>
	</div>
}

export default ModalDemo;