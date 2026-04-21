import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components';
import { ToastType } from '../../components/Classes';
import { useFrontier } from '../../components/useFrontier';

interface ToastDemoProps{
	
}

var ToastDemo = (props: ToastDemoProps)=>{
	var { t } = useTranslation();
	var { Toast } = useFrontier();
	
	var showToast = ()=>{
		var id = Toast.show('Loading!', {
			type: ToastType.INFO
		})
	}
	var showToastLoading = ()=>{
		var id = Toast.show('Lorem ipsum dolor, sit amet consectetur adipisicing elit.', {
			loading: true
		});
		setTimeout(()=>{
			Toast.dismiss(id);
		}, 4000);
	}
	
	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Button text='Test toast' onClick={showToast} />
		<Button text='Test loading' color='purple' onClick={showToastLoading} />
	</div>
}

export default ToastDemo;