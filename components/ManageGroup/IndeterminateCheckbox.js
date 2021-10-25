import { forwardRef, useRef, useEffect } from "react";

import classes from "./IndeterminateCheckbox.module.scss";

const IndeterminateCheckbox = forwardRef(({ indeterminate, checked, onChange, title }, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<div className={`${classes.checkbox} ${indeterminate ? classes.indeterminate : ""} ${checked ? classes.checked : ""}`} title={title}>
			{checked && <i className="material-icons-outlined">check</i>}
			{indeterminate && <div className={classes.bar} />}
			<input type="checkbox" ref={resolvedRef} onChange={onChange} />
		</div>
	);
});

export default IndeterminateCheckbox;
