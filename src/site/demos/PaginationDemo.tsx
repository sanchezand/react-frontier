import React, { useEffect, useState } from 'react';
import { Pagination } from '../../components';

var PaginationDemo = ()=>{
	var [page, setPage] = useState<number>(0);
	var [page2, setPage2] = useState<number>(5);

	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Pagination onPageChange={setPage} page={page} />
		<Pagination disabled onPageChange={setPage2} color='green' page={page2} style={{ marginTop: 15 }} pageCount={6} />
	</div>
}

export default PaginationDemo;