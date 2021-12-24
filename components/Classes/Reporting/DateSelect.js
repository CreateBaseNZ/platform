import { useRef, useState } from "react";
import Calendar from "react-calendar";

import classes from "./DateSelect.module.scss";

const DateSelect = ({ dateSelect, setDateSelect }) => {
	const [show, setShow] = useState(false);
	const timer = useRef();

	console.log(show);

	const blurHandler = () => {
		timer.current = setTimeout(() => setShow(false));
	};

	const focusHandler = () => {
		clearTimeout(timer.current);
	};

	return (
		<div tabIndex={-1} className={classes.container} onFocus={focusHandler} onBlur={blurHandler}>
			<button className={classes.btn} onClick={() => setShow((state) => !state)} title="Select a date">
				<i className="material-icons-outlined">today</i>
			</button>
			<div className={`${classes.calendarWrapper} ${show ? "" : classes.hide}`}>
				<Calendar
					value={dateSelect}
					onChange={setDateSelect}
					className={classes.calendar}
					prevLabel={<i className="material-icons-outlined">keyboard_arrow_left</i>}
					prev2Label={<i className="material-icons-outlined">keyboard_double_arrow_left</i>}
					nextLabel={<i className="material-icons-outlined">keyboard_arrow_right</i>}
					next2Label={<i className="material-icons-outlined">keyboard_double_arrow_right</i>}
					formatShortWeekday={(_, date) => new Date(date).toString().substring(0, 2)}
					onClickDay={() => setShow(false)}
				/>
			</div>
		</div>
	);
};

export default DateSelect;
