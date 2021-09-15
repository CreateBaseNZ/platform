import { memo } from "react";
import classes from "./AdminConsole.module.scss";

const Table = ({ allUsers, tab, page, size, checkHandler, columns }) => {
	return allUsers[tab].slice(page * size, page * size + size).map((values, i) => (
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
