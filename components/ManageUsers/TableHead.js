import classes from "./ManageUsers.module.scss";

const TableHead = ({ isChecked, tab, toggleAllCheckboxHandler, columns, sort, sortByColHandler }) => {
	console.log(isChecked);

	return (
		<div className={classes.tableHead}>
			<button className={`${classes.colName} ${classes.check} ${isChecked[tab] ? classes.checked : ""}`} onClick={toggleAllCheckboxHandler} title={isChecked[tab] ? "Deselect all" : "Select all"}>
				<i className="material-icons-outlined">remove</i>
				<div className={classes.title} style={{ left: "0" }}>
					{isChecked[tab] ? "Deselect all" : "Select all"}
				</div>
			</button>
			{columns[tab].map((c) => {
				const col = c.replace(" ", "");
				return (
					<button key={c} className={`${classes.colName} ${classes[col]} ${sort.colName === col ? classes.active : ""}`} onClick={sortByColHandler.bind(this, c)}>
						<span>{c}</span> <i className={`material-icons-outlined ${sort.ascending ? classes.ascending : classes.descending}`}>arrow_upward</i>
						<div className={classes.title}>{sort.colName === col ? (sort.ascending ? `Sorted in ascending order` : `Sorted in descending order`) : `Click to sort by ${c.toLowerCase()}`}</div>
					</button>
				);
			})}
		</div>
	);
};

export default TableHead;
