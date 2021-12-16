import { HOUR_WIDTH, Y_LABEL_WIDTH } from "./ScheduleReport";
import classes from "./ScheduleRow.module.scss";

const MS_PER_DAY = 86400000;
const S_PER_DAY = 86400;

const WIDTH = HOUR_WIDTH * 24;

const ScheduleRow = ({ alt, data, date }) => {
	return (
		<div className={`${classes.row} ${alt ? classes.alt : ""}`}>
			<div className={classes.label} style={{ width: Y_LABEL_WIDTH }}>
				{data.label}
			</div>
			{data.bars
				.filter((bar) => bar.start.getDate() === date.getDate())
				.map((bar, i) => (
					<div
						key={`${data.name}${i}`}
						className={`${classes.bar} ${classes[bar.type]}`}
						style={{ left: ((bar.start.getTime() - date.getTime()) / MS_PER_DAY) * WIDTH + Y_LABEL_WIDTH, width: (bar.duration / S_PER_DAY) * WIDTH }}
					/>
				))}
		</div>
	);
};

export default ScheduleRow;
