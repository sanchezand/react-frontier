import { IconName } from "./Icon";

export type FrontierColors = 'green' | 'red' | 'purple' | 'black' | 'blue' | 'orange' | 'basic' | 'white' | 'yellow';

export enum ToastType{
	SUCCESS = 'green',
	ERROR = 'red',
	INFO = 'blue'
}

export interface ToastShowOptions{
	id?: string,
	header?: string,
	duration?: number,
	infinite?: boolean,
	dismissable?: boolean,
	type?: FrontierColors,
	icon?: IconName,
	loading?: boolean,
}