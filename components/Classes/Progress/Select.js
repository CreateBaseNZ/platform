import { useState } from "react";
import classes from "./Select.module.scss";

const Select = ({ state, setState, label, options, width }) => {
	const [isOpen, setIsOpen] = useState(false);

	const selectHandler = (option) => {
		setState(option);
		setIsOpen(false);
	};

	return (
		<div className={classes.selectContainer} onBlur={() => setIsOpen(false)}>
			<div className={classes.selectLabel}>{label}:</div>
			<div className={classes.select} style={{ width: width }}>
				<button className={`${classes.selected} ${isOpen ? classes.active : ""}`} onClick={() => setIsOpen((state) => !state)}>
					<span>{state.name}</span> <i className="material-icons-outlined">expand_more</i>
				</button>
				{isOpen && (
					<div className={classes.options}>
						{options.map((option) => (
							<button key={option.id} className={classes.option} onMouseDown={() => selectHandler(option)}>
								{option.name}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Select;
