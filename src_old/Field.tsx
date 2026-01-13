import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

interface FieldProps extends PropsWithChildren{
	className?: string,
	label?: string,
	comment?: string,
	amount?: number,
	error?: boolean,
	style?: React.CSSProperties,
	labelStyle?: React.CSSProperties,
	required?: boolean,
}
var Field = (props: FieldProps)=>{
	var fields_name = props.amount==2 ? 'two' : (props.amount==3 ? 'three' : '');
	return <>
		{props.amount && props.amount>1 && props.label ? (
			<div className="fr fieldlabel" style={props.labelStyle}>
				{props.label}
				{props.required && <span style={{ marginLeft: 3, color: 'brown' }}>*</span>}
			</div>
		) : null}
		<div className={classNames('fr field', fields_name, {
			fields: props.amount && props.amount>1,
			error: props.error,
		}, props.className)} style={props.style}>
			{props.label && (!props.amount || props.amount<1) && (
				<label style={props.labelStyle}>
					{props.label}
					{props.required && <span style={{ marginLeft: 3, color: 'brown' }}>*</span>}
				</label>
			)}
			{props.comment && <div className="comment">{props.comment}</div>}
			{props.children}
		</div>
	</>
}

export default Field;