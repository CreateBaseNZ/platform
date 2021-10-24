import { memo, useEffect } from "react";
import classes from "./ManageUsers.module.scss";

const Table = ({ allUsers, tab, page, size, checkHandler, columns, sort, search, isLoading, setIsLoading }) => {
	useEffect(() => allUsers.admins.length && setIsLoading(false));

	const getState = (data, inputValue, state = false) => {
		for (const value of Object.values(data)) {
			if (typeof value === "object" && value !== null && Object.keys(value).length > 0 && state === false) {
				state = getState(value, inputValue, state);
			} else {
				if (state === false) {
					state = JSON.stringify(value)?.toLowerCase()?.includes(inputValue.toLowerCase());
				} else {
					return state;
				}
			}
		}
		return state;
	};

	const filter = (data, inputValue) => {
		return data.filter((element) => getState(element, inputValue));
	};

	let view;
	if (search) {
		view = filter([...allUsers[tab]], search);
	} else {
		view = [...allUsers[tab]];
	}

	if (sort.colName === "index") {
		view.sort((a, b) => {
			return a[sort.colName] - b[sort.colName];
		});
	} else {
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

	return (
		<div className={`${classes.table} roundScrollbar`}>
			{view.slice(page * size, page * size + size).map((values, i) => (
				<div
					key={i}
					className={`${classes.row} ${values.checked ? classes.checkedRow : ""} ${view[i + 1] && view[i + 1].checked ? classes.sharpBottom : ""}`}
					onClick={checkHandler.bind(this, values.index)}>
					<button className={` ${classes.check} ${values.checked ? classes.checked : ""}`}>
						<i className="material-icons-outlined">done</i>
					</button>
					{columns[tab].map((c) => (
						<div key={`${c}-${i}`} className={`${classes.cell} ${classes[c.replace(" ", "")]}`}>
							{values[c.replace(" ", "")]}
						</div>
					))}
				</div>
			))}
			{isLoading && <div className={classes.loadingScreen}>Processing user data ...</div>}
		</div>
	);
};

export default memo(Table);
