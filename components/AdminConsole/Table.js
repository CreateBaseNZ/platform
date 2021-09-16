import { memo } from "react";
import classes from "./AdminConsole.module.scss";

const Table = ({ allUsers, tab, page, size, checkHandler, columns, sort }) => {
	let view = [...allUsers[tab]];
	if (sort.colName) {
		view.sort((a, b) => {
			if (sort.ascending) {
				if (a[sort.colName].toUpperCase() < b[sort.colName].toUpperCase()) {
					return -1;
				}
				if (a[sort.colName].toUpperCase() > b[sort.colName].toUpperCase()) {
					return 1;
				}
			} else {
				if (a[sort.colName].toUpperCase() < b[sort.colName].toUpperCase()) {
					return 1;
				}
				if (a[sort.colName].toUpperCase() > b[sort.colName].toUpperCase()) {
					return -1;
				}
			}
		});
	}

	return view.slice(page * size, page * size + size).map((values, i) => (
		<div
			key={i}
			className={`${classes.row} ${values.checked ? classes.checkedRow : ""} ${allUsers[tab][i + 1] && allUsers[tab][i + 1].checked ? classes.sharpBottom : ""}`}
			onClick={checkHandler.bind(this, i)}>
			<button className={` ${classes.check} ${values.checked ? classes.checked : ""}`}>
				<i className="material-icons-outlined">done</i>
			</button>
			{columns[tab].map((c) => (
				<div key={`${c}-${i}`} className={`${classes.cell} ${classes[c.replace(" ", "")]}`}>
					{c === "joined" ? new Date(values[c.replace(" ", "")]).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : values[c.replace(" ", "")]}
				</div>
			))}
		</div>
	));
};

export default memo(Table);
