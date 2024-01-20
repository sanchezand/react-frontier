import React, { PropsWithChildren } from 'react';

interface FieldProps extends PropsWithChildren{
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
		<div className={`fr ${props.error ? 'error' : ''} ${fields_name} field${props.amount && props.amount>1 ? 's' : ''}`} style={props.style}>
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