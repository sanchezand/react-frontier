import React, { useEffect, useMemo, useState, useTransition } from 'react';
import { Combobox } from '@base-ui/react';
import Icon, { IconName } from './Icon';
import style from '../style/dropdown.module.scss';
import Loader from './Loader';
import classNames from 'classnames';
import { useLocale } from './useLocale';
import { InputType } from './Input';

export type DropdownValueChange = (v: any, d: DropdownItemProps)=>boolean | void;

export interface DropdownSearchResult{
	error: string,
	items: DropdownItemProps[],
}

export interface DropdownProps{
	label?: string,
	placeholder?: string,
	className?: string,
	search?: boolean,
	onAsyncSearch?: (v: string)=>Promise<DropdownSearchResult>
	minSearchLength?: number,
	searchTimeout?: number,
	items?: DropdownItemProps[],
	value: any,
	required?: boolean,
	disabled?: boolean,
	loading?: boolean,
	type?: InputType,
	onValueChange?: DropdownValueChange,
	iconName?: IconName,
	menuStyle?: React.CSSProperties,
	itemStyle?: React.CSSProperties,
	style?: React.CSSProperties,
	closeOnSelect?: boolean,
	emptyText?: string,
	searchingText?: string,
	comment?: string,
	commentStyle?: React.CSSProperties,
}

export interface DropdownItemProps{
	value?: any,
	text: any,
	meta?: any,
	className?: string,
	iconName?: IconName,
	if?: boolean,
	onClick?: ()=>void,
	style?: React.CSSProperties,
}

var Dropdown = (props: DropdownProps)=>{
	var { t } = useLocale()
	var {
		value,
		className,
		closeOnSelect,
		disabled,
		emptyText,
		iconName,
		items,
		itemStyle,
		label,
		loading,
		menuStyle,
		minSearchLength,
		onAsyncSearch,
		onValueChange,
		placeholder,
		search,
		searchTimeout: propsSearchTimeout,
		searchingText,
		style: propsStyle,
		type: inputType,
		required,
		comment,
		commentStyle,
		...restProps
	} = props;
	var [searchValue, setSearchValue] = useState<string>('');
	var [searchResults, setSearchResults] = useState<DropdownItemProps[]>(null);
	var [searchError, setSearchError] = useState<string>(null);
	var [searchTimeout, setSearchTimeout] = useState<any>(null);
	var [selectedSearch, setSelectedSearch] = useState<DropdownItemProps>(null);
	var [searching, setSearching] = useState<boolean>(false);

	var shown_items = useMemo(()=>{
		if(!props.onAsyncSearch) return props.items;
		if(props.value == null || (!!searchResults && searchResults.findIndex(a=>a.value===props.value)>-1)){
			return searchResults;
		}
		var result = [];
		if(searchResults) result.push(...searchResults);
		if(props.value != null && !!selectedSearch && selectedSearch.value===props.value){
			result.push(selectedSearch);
		}
		return result;
	}, [props.items, searchResults, props.value, selectedSearch]);

	var shown_value = useMemo(()=>{
		if((props.value!==null && typeof props.value!=='undefined') && props.items){
			var it = props.items.find(a=>a.value===props.value && a.if!==false);
			if(it){
				return it.text || it.value;
			}
		}
		return props.placeholder || props.label;
	}, [props.placeholder, props.label, props.value, props.items]);

	var real_val = useMemo(()=>{
		if(props.items){
			var found = props.items.find(a=>a.value===props.value);
			if(found) return found;
		}
		if(shown_items){
			var found = shown_items.find(a=>a.value===props.value);
			if(found) return found;
		}
		if(props.value != null && selectedSearch?.value===props.value){
			return selectedSearch;
		}
		return null;
	}, [props.items, shown_items, props.value, selectedSearch]);

	var has_icons = useMemo(()=>{
		if(!props.items) return false;
		for(var i of props.items){
			if(!!i.iconName) return true;
		}
		return false;
	}, [props.items]);

	var is_placeholder = (props.value == null && !!(props.placeholder || props.label));
	var search_length = (props.minSearchLength || 3);

	var getEmptyMessage = ()=>{
		if(props.onAsyncSearch){
			if(searching) return null;
			return props.emptyText || t('dropdown.no_results');
		}else{
			return props.emptyText || t('dropdown.no_results');
		}
	}

	return <div className={classNames("fr2 dropdown", props.className)} style={props.style} {...restProps}>
		<Combobox.Root 
			items={shown_items}
			value={real_val || null}
			disabled={props.disabled}
			filter={props.onAsyncSearch ? null : undefined}
			isItemEqualToValue={(a, v)=>{
				if(a === v) return true;
				if(!a || !v) return false;
				return a.value === v.value || a.value === v;
			}}
			itemToStringLabel={(a: DropdownItemProps)=>(a.text || a.value)}
			itemToStringValue={(a: DropdownItemProps)=>(a.value || a.text)}
			openOnInputClick={!props.onAsyncSearch || !!props.value}
			onInputValueChange={!props.onAsyncSearch ? null : (v, { reason })=>{
				setSearchValue(v);
				if(reason!=='input-change') return;
				if(v.length<=0){
					setSearchResults(null);
					setSearchError(null);
					setSearching(false);
					return;
				}
				if(searchTimeout) clearTimeout(searchTimeout);
				if(v.length<search_length) return setSearching(false);
				setSearchError(null);
				setSearching(true)
				setSearchResults(null);
				setSearchTimeout(setTimeout(()=>{
					props.onAsyncSearch(v).then(res=>{
						if(res.error) return setSearchError(res.error);
						return setSearchResults(res.items);
					}).finally(()=>{
						setSearching(false);
					})
				}, (props.searchTimeout || 500)))
			}}
			onValueChange={(a, e)=>{
				if(!!props.onAsyncSearch){
					setSelectedSearch(a);
				}
				if(props.onValueChange){
					if(!a) props.onValueChange(null, null);
					else props.onValueChange(a.value, a);
				}
			}}
		>
			{!!props.label && (
				<label className={style.label} data-type={props.type}>
					{props.label}
					{!!props.required && (
						<span className={style.required}> *</span>
					)}
				</label>
			)}
			{!!props.comment && (
				<div className={classNames("comment", style.comment)} style={props.commentStyle} data-type={props.type}>{props.comment}</div>
			)}
			{!!(props.search || props.onAsyncSearch) ? (
				<div className={style.trigger} data-search data-disabled={props.disabled || undefined} data-type={props.type}>
					{!!props.iconName && (
						<Combobox.Trigger className={style.iconLeft} nativeButton={false} render={<Icon name={props.iconName} />} data-absolute data-placeholder={is_placeholder || undefined} />
					)}
					<Combobox.Input className={style.input} placeholder={props.placeholder || props.label} data-loading={props.loading || undefined} data-icon={!!props.iconName || undefined} />
					{!!props.loading ? (
						<Loader inline size={20} style={{ marginTop: 1, marginRight: 10 }} />
					) : (
						<Combobox.Trigger className={style.iconRight} data-padding nativeButton={false} render={<div />}>
							<Icon name='caret-down'/>
						</Combobox.Trigger>
					)}
				</div>
			) : (
				<Combobox.Trigger className={style.trigger} data-type={props.type}>
					{!!props.iconName && (
						<Icon className={style.iconLeft} name={props.iconName} data-placeholder={is_placeholder || undefined} />
					)}
					<div className={style.text} data-empty={(props.value===null && !(props.placeholder || props.label)) || undefined} data-placeholder={is_placeholder || undefined}>
						{shown_value}
					</div>
					{!!props.loading ? (
						<Loader inline size={20} style={{ marginTop: 1 }} />
					) : (
						<Icon className={style.iconRight} name='caret-down' />
					)}
				</Combobox.Trigger>
			)}
			<Combobox.Portal>
				<Combobox.Positioner sideOffset={5}>
					<Combobox.Popup className={style.popup} style={props.menuStyle} hidden={!!props.onAsyncSearch && !(searchValue && searchValue.length>=search_length) && !searchResults && !searchError && props.value == null}>
						<Combobox.Empty className={style.empty}>{getEmptyMessage()}</Combobox.Empty>
						{!!props.onAsyncSearch && ((!!searchValue && searchValue.length>=search_length) || searchError) && (
							<Combobox.Status className={style.empty}>
								{(!!searching || !!searchError) ? (
									!searchError ? (
										<div className={style.searchLoading}>
											<Loader inline size={15} />
											{props.searchingText || t('common.loading')}
										</div> 
									) : (
										<div>
											<div className={style.searchLoading}>
												<Icon className={style.searchErrorIcon} name='triangle-exclamation' />
												{t('common.error')}
											</div>
											<div className={style.searchErrorText}>
												{searchError}
											</div>
										</div>
									)
								) : null}
							</Combobox.Status>
						)}
						<Combobox.List className={style.list}>
							{(a: DropdownItemProps)=>(
								<Combobox.Item key={a.value} value={a} className={classNames(style.item, a.className)} style={{...props.itemStyle, ...a.style}}>
									<div className={style.contents}>
										{has_icons ? (
											a.iconName ? (
												<Icon name={a.iconName} className={style.itemIcon} />
											) : (
												<span className={style.itemIcon} data-empty />
											)
										) : (
											null
										)}
										<Combobox.ItemIndicator>
											<Icon name='check' />
										</Combobox.ItemIndicator>
										<div className={style.text}>
											{a.text || a.value}
										</div>
										{!!a.meta && (
											<div className={style.meta}>Frontier</div>
										)}
									</div>
								</Combobox.Item>
							)}
						</Combobox.List>
					</Combobox.Popup>
				</Combobox.Positioner>
			</Combobox.Portal>
		</Combobox.Root>
	</div>
}

export default Dropdown;