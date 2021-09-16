import classes from "./AdminConsole.module.scss";

const TableHead = ({ isChecked, tab, toggleAllCheckboxHandler, columns, sort, sortByColHandler }) => {
	return (
		<div className={classes.tableHead}>
			<button className={`${classes.colName} ${classes.check} ${isChecked[tab] ? classes.checked : ""}`} onClick={toggleAllCheckboxHandler} title={isChecked[tab] ? "Deselect all" : "Select all"}>
				<i className="material-icons-outlined">remove</i>
			</button>
			{columns[tab].map((c) => {
				const col = c.replace(" ", "");
				return (
					<button
						key={c}
						className={`${classes.colName} ${classes[col]} ${sort.colName === col ? classes.active : ""}`}
						onClick={sortByColHandler.bind(this, c)}
						title={sort.colName === col && sort.ascending ? `Sort by ${c.toLowerCase()} (descending)` : `Sort by ${c.toLowerCase()} (ascending)`}>
						<span>{c}</span> <i className={`material-icons-outlined ${sort.ascending ? classes.ascending : classes.descending}`}>arrow_upward</i>
					</button>
				);
			})}
		</div>
	);
};

export default TableHead;
