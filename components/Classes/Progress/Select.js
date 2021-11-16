import classes from "./Select.module.scss";

const Select = ({ state, setState, label, options, width }) => {
	return (
		<div className={classes.selectContainer} onBlur={() => setState((state) => ({ ...state, isOpen: false }))}>
			<div className={classes.selectLabel}>{label}:</div>
			<div className={classes.select} style={{ width: width }}>
				<button className={`${classes.selected} ${state.isOpen ? classes.active : ""}`} onClick={() => setState((state) => ({ ...state, isOpen: !state.isOpen }))}>
					<span>{state.selected.name}</span> <i className="material-icons-outlined">expand_more</i>
				</button>
				{state.isOpen && (
					<div className={classes.options}>
						{options.map((option) => (
							<button key={option.id} className={classes.option} onMouseDown={() => setState({ isOpen: false, selected: option })}>
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
