import { Toast } from '@base-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from '../style/toast.module.scss';
import Icon from './Icon';
import Loader from './Loader';

var ToastList = ()=>{
	var { t } = useTranslation();
	var { toasts, close } = Toast.useToastManager();
	
	return <React.Fragment>
		{toasts.map(a=>(
			<Toast.Root key={a.id} toast={a} className={style.toast} swipeDirection={(a.data.dismissable===false || a.data.loading) ? null : undefined} onClick={(a.data.dismissable===false || a.data.loading) ? null : ()=>close(a.id)} data-color={a.data.color || undefined} data-loading={!!a.data.loading || undefined}>
				<Toast.Content className={style.container} data-loading={!!a.data.loading || undefined}>
					<Toast.Title className={style.title}>
						{a.data.header}
					</Toast.Title>
					<Toast.Description className={style.contents}>
						{a.data.text}
					</Toast.Description>
					{(a.data.dismissable!==false && !a.data.loading) && (
						<Toast.Close className={style.dismiss}>
							<Icon name='times' />
						</Toast.Close>
					)}
					{a.data.loading && (
						<Loader size={25} />
					)}
				</Toast.Content>
			</Toast.Root>
		))}
	</React.Fragment>
}

export default ToastList