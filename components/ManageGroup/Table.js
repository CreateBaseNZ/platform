import { memo, useEffect, useMemo } from "react";
import { useTable, usePagination, useColumnOrder, useRowSelect, useSortBy } from "react-table";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import PageNav from "./PageNav";
import PageSizeSelect from "./PageSizeSelect";
import classes from "./Table.module.scss";

const Table = ({ columns, data, pageSizes, tab, checkHandler, sort, search, isLoading, setIsLoading }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		setColumnOrder,
		state: { pageIndex, pageSize, selectedRowIds },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		useColumnOrder,
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.allColumns.push((columns) => [
				// Let's make a column for selection
				{
					id: "selection",
					disableResizing: true,
					minWidth: 35,
					width: 35,
					maxWidth: 35,
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			]);
		}
	);

	return (
		<div className={classes.container}>
			<div>{Object.keys(selectedRowIds).length}</div>
			<div className={classes.tableWrapper}>
				<table {...getTableProps()} className={classes.table}>
					<thead className={classes.thead}>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()} className={classes.tr}>
								{headerGroup.headers.map((column) => {
									// console.log(column);
									return (
										<th {...column.getHeaderProps(column.getSortByToggleProps())} className={`${classes.th} ${column.isSorted ? classes.sorted : ""}`}>
											{column.render("Header")}
											{column.canSort && (
												<i className={`material-icons-outlined ${classes.sortArrow} ${column.isSorted ? (column.isSortedDesc ? classes.descending : classes.ascending) : ""}`}>arrow_upward</i>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()} className={classes.tbody}>
						{page.map((row, _) => {
							prepareRow(row);
							// console.log(row);
							return (
								<tr {...row.getRowProps()} className={`${classes.tr} ${row.isSelected ? classes.trSelected : ""}`}>
									{row.cells.map((cell) => (
										<td {...cell.getCellProps()} className={classes.td}>
											{cell.render("Cell")}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className={classes.pagination}>
				<PageNav pageIndex={pageIndex} gotoPage={gotoPage} previousPage={previousPage} canPreviousPage={canPreviousPage} nextPage={nextPage} canNextPage={canNextPage} length={pageOptions.length} />
				<div className={classes.goTo}>
					Go to page:
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							gotoPage(e.target.value ? Number(e.target.value) - 1 : 0);
						}}
						className={classes.pageInput}
					/>
					<PageSizeSelect pageSize={pageSize} pageSizes={pageSizes} setPageSize={setPageSize} />
				</div>
			</div>
		</div>
	);
};

export default Table;
