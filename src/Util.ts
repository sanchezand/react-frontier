function randomRange(min: number, max: number){
	return Math.floor(Math.random() * (max-min+1)+min);
}

const bindClick = <T>(setVal: (val: T)=>void, val: T=null)=>{
	return ()=>{
		setVal(val);
	}
}

export {
	bindClick,
	randomRange,
}