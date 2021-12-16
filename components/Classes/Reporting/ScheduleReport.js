import { Fragment } from "react";
import classes from "./ScheduleReport.module.scss";
import ScheduleRow from "./ScheduleRow";

const LEGEND = [
	{ label: "Research", color: "#E8368B" },
	{ label: "Plan", color: "#B835CF" },
	{ label: "Code", color: "#4E4ED6" },
	{ label: "Other", color: "#969696" },
];

const X_LABELS = ["12AM", "3AM", "6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"];

export const Y_LABEL_WIDTH = 200;
export const HOUR_WIDTH = 60;
export const INTERVAL_WIDTH = 3 * HOUR_WIDTH;

const ScheduleReport = ({ data, date }) => {
	console.log(data);

	return (
		<div className={classes.container}>
			<div className={classes.legendContainer}>
				{LEGEND.map((l) => (
					<div key={l.label} className={classes.legend}>
						<span style={{ backgroundColor: l.color }} />
						<label>{l.label}</label>
					</div>
				))}
			</div>
			<div className={`${classes.scheduleContainer} roundScrollbar`}>
				<div className={classes.xLabels}>
					{X_LABELS.map((l, i) => (
						<Fragment key={i}>
							<div className={classes.xLabel} style={{ left: i * INTERVAL_WIDTH + Y_LABEL_WIDTH }}>
								{l}
							</div>
							<div className={classes.verticalLine} style={{ left: i * INTERVAL_WIDTH + Y_LABEL_WIDTH }} />
							{i < X_LABELS.length - 1 && (
								<>
									<div className={classes.verticalLine} style={{ left: i * INTERVAL_WIDTH + Y_LABEL_WIDTH + HOUR_WIDTH, backgroundColor: "#f9f9f9" }} />
									<div className={classes.verticalLine} style={{ left: i * INTERVAL_WIDTH + Y_LABEL_WIDTH + HOUR_WIDTH * 2, backgroundColor: "#f9f9f9" }} />
								</>
							)}
						</Fragment>
					))}
				</div>
				<div className={classes.scheduleWrapper} style={{ width: Y_LABEL_WIDTH + HOUR_WIDTH * 24 + HOUR_WIDTH }}>
					{data.map((row, i) => (
						<ScheduleRow key={row.label} data={row} alt={Boolean(i % 2)} date={date} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ScheduleReport;
