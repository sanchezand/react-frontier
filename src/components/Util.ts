function randomRange(min: number, max: number){
	return Math.floor(Math.random() * (max-min+1)+min);
}

const bindClick = <T>(setVal: (val: T)=>void, val: T=null)=>{
	return ()=>{
		setVal(val);
	}
}

function removeAccents(s: string){
	if(!s) return '';
	return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export {
	bindClick,
	randomRange,
	removeAccents,
}