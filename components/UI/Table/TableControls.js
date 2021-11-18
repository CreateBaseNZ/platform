import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { SearchBar } from "../Input";

import classes from "./TableControls.module.scss";

const TableControls = ({ data, selectedRowIds, globalFilter, setGlobalFilter, renderBtns }) => {
	const [value, setValue] = useState(globalFilter);
	const numOfSelected = Object.keys(selectedRowIds).length;

	const debounceFn = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	const changeHandler = (e) => {
		setValue(e.target.value);
		debounceFn(e.target.value);
	};

	return (
		<div className={classes.controls}>
			{numOfSelected ? <div className={classes.num}>{numOfSelected} selected</div> : null}
			<div className={classes.btnContainer} style={{ opacity: numOfSelected ? 1 : 0.25, pointerEvents: numOfSelected ? "auto" : "none" }}>
				{renderBtns.map((fn, i) => fn(i, data, selectedRowIds))}
			</div>
			<SearchBar inputProps={{ placeholder: "Search", className: classes.input, value: value || "", onChange: changeHandler }} className={classes.search} />
		</div>
	);
};

export default TableControls;
