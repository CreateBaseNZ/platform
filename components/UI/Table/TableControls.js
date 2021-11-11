import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { SearchBar } from "../Input";

import classes from "./TableControls.module.scss";

const TableControls = ({ numOfSelected, globalFilter, setGlobalFilter }) => {
	const [value, setValue] = useState(globalFilter);

	const debounceFn = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	const changeHandler = (e) => {
		setValue(e.target.value);
		debounceFn(e.target.value);
	};

	return (
		<div className={classes.controls}>
			{numOfSelected ? (
				<div className={classes.selectedControls}>
					<div className={classes.num}>{numOfSelected} selected</div>
				</div>
			) : null}
			<SearchBar inputProps={{ placeholder: "Search", className: classes.input, value: value || "", onChange: changeHandler }} className={classes.search} />
		</div>
	);
};

export default TableControls;
