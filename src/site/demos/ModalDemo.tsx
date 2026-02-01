import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components';
import Modal from '../../components/Modal';

interface ModalDemoProps{
	
}

var ModalDemo = (props: ModalDemoProps)=>{
	var { t } = useTranslation();
	var [simpleModal, setSimpleModal] = useState<boolean>(false);
	useEffect(()=>{
		
	}, []);
	
	return <div style={{ maxWidth: 500, margin: 'auto', paddingTop: 20 }}>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum libero vel blanditiis, sequi dicta exercitationem dolorum, aperiam magni quia officia eius, dolor sapiente alias est maxime molestiae rem praesentium accusantium!
		<Button text='Open modal' onClick={()=>setSimpleModal(true)} />
		<Modal open={simpleModal} onClose={setSimpleModal}>
			<Modal.Header text='Test' actions={(
				<Button text='Test button' />
			)} />
			<Modal.Input placeholder='Search' />
			<Modal.Content>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius amet tempore sit explicabo omnis soluta iusto numquam reprehenderit similique, saepe doloremque nihil et sapiente ab magni ex adipisci temporibus!
				<br />
			</Modal.Content>
			<Modal.Actions>
				<Button text='Close?' onClick={()=>setSimpleModal(false)} />
			</Modal.Actions>
		</Modal>
	</div>
}

export default ModalDemo;