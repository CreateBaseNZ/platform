import { Fragment } from "react";
import classes from "./ScheduleReport.module.scss";
import ScheduleRow from "./ScheduleRow";
import { Y_LABEL_WIDTH, HOUR_WIDTH, INTERVAL_WIDTH, SAFE_MARGIN } from "../../../constants/classesConstants";

const LEGEND = [
	{ label: "Research", color: "#E8368B" },
	{ label: "Plan", color: "#B835CF" },
	{ label: "Code", color: "#4E4ED6" },
	{ label: "Other", color: "#969696" },
];

const X_LABELS = ["12AM", "3AM", "6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"];

const ScheduleReport = ({ data, date }) => {
	console.log(data);

	return (
		<div className={classes.container}>
			<div className={classes.legendContainer}>
				<div className={classes.viewing}>{date.toDateString()}</div>
				{LEGEND.map((l) => (
					<div key={l.label} className={classes.legend}>
						<span style={{ backgroundColor: l.color }} />
						<label>{l.label}</label>
					</div>
				))}
			</div>
			<div className={classes.scheduleWrapper} style={{ width: Y_LABEL_WIDTH + HOUR_WIDTH * 24 + HOUR_WIDTH }}>
				<div className={classes.yLabels}>
					{data.map((row, i) => (
						<div key={row.label} className={`${classes.yLabel} ${Boolean(i % 2) ? classes.alt : ""}`} style={{ width: Y_LABEL_WIDTH }}>
							{row.label}
						</div>
					))}
				</div>
				<div className={`${classes.schedule} roundScrollbar`}>
					<div className={classes.xLabels}>
						{X_LABELS.map((l, i) => (
							<Fragment key={i}>
								<div className={classes.xLabel} style={{ left: i * INTERVAL_WIDTH + SAFE_MARGIN }}>
									{l}
								</div>
								<div className={classes.verticalLine} style={{ left: i * INTERVAL_WIDTH + SAFE_MARGIN }} />
								{i < X_LABELS.length - 1 && (
									<>
										<div className={classes.verticalLine} style={{ left: i * INTERVAL_WIDTH + HOUR_WIDTH + SAFE_MARGIN, backgroundColor: "#f9f9f9" }} />
										<div className={classes.verticalLine} style={{ left: i * INTERVAL_WIDTH + HOUR_WIDTH * 2 + SAFE_MARGIN, backgroundColor: "#f9f9f9" }} />
									</>
								)}
							</Fragment>
						))}
					</div>
					{data.map((row, i) => (
						<ScheduleRow key={row.label} data={row} alt={Boolean(i % 2)} date={date} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ScheduleReport;
