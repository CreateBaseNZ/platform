import { SearchBar } from "../UI/Input";

import classes from "./TableControls.module.scss";

const TableControls = ({ numOfSelected }) => {
	console.log(numOfSelected);
	return (
		<div className={classes.controls}>
			{numOfSelected ? (
				<div className={classes.selectedControls}>
					<div className={classes.num}>{numOfSelected} selected</div>
				</div>
			) : null}
			<SearchBar inputProps={{ placeholder: "Search", className: classes.input }} className={classes.search} />
		</div>
	);
};

export default TableControls;
