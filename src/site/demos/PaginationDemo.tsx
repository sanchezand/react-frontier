import React, { useEffect, useState } from 'react';
import { Groupper, Pagination, Table } from '../../components';

var PaginationDemo = ()=>{
	var [page, setPage] = useState<number>(0);
	var [page2, setPage2] = useState<number>(5);

	return <div style={{ margin: 'auto', maxWidth: 400, marginTop: 10 }}>
		<Pagination onPageChange={setPage} page={page} />
		<Pagination disabled onPageChange={setPage2} color='green' page={page2} style={{ marginTop: 15 }} pageCount={6} />

		<Table details style={{ marginTop: 15 }}>
			<Table.Head title='frontierO' />
			<Table.Body>
				<Table.Row data={[ 'ID', 'ROW' ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
				<Table.Row data={[ 'ID', 'ROW' ]} />
			</Table.Body>
			<Table.Footer>
				<Table.Cell colSpan={100} row>
					<Pagination onPageChange={setPage} page={page} pageCount={100} />
				</Table.Cell>
			</Table.Footer>
		</Table>

		<Groupper title={"testing"} style={{ marginTop: 15 }} actions={(
			<Pagination onPageChange={setPage} page={page} pageCount={100}  />
		)}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ratione eum animi fugiat suscipit repudiandae incidunt. Dolore id inventore quisquam tempora, ipsum eaque accusantium dolorem a hic eos fugit illum!
		</Groupper>
	</div>
}

export default PaginationDemo;