import { Fragment, memo, useState, useEffect } from "react";
import classes from "./ProgressTable.module.scss";

const ProgressTable = ({ data, view, setTooltip }) => {
	console.log("*** rerendered ***");
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const updateDimensions = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};
	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const clearTooltip = () => setTooltip();

	const hoverHandler = (title, step, status, duration, label, e) => {
		let position = {};
		let styleProp = "border";
		if (height - e.target.getBoundingClientRect().bottom < 200) {
			position.bottom = height - e.target.getBoundingClientRect().top;
			styleProp += "Bottom";
		} else {
			position.top = e.target.getBoundingClientRect().bottom;
			styleProp += "Top";
		}
		if (width - e.target.getBoundingClientRect().right < 200) {
			position.right = width - e.target.getBoundingClientRect().right;
			styleProp += "Right";
		} else {
			position.left = e.target.getBoundingClientRect().left;
			styleProp += "Left";
		}
		styleProp += "Radius";
		setTooltip({
			title: title,
			step: step,
			status: status,
			duration: duration,
			position: position,
			label: label,
			style: { [styleProp]: 0 },
		});
	};

	return (
		<div className={classes.table} style={{ gridTemplateRows: `repeat(${data.length},2.5rem)` }} onMouseLeave={() => setTooltip()}>
			<div className={classes.header} onMouseOver={clearTooltip} style={{ borderTopLeftRadius: 12, justifyContent: "flex-start" }}>
				{view.id === "student" ? "Project" : "Student"}
			</div>
			<div className={classes.header} onMouseOver={clearTooltip}>
				Define
			</div>
			<div className={classes.header} onMouseOver={clearTooltip}>
				Imagine
			</div>
			<div className={classes.header} onMouseOver={clearTooltip}>
				Create
			</div>
			<div className={classes.header} onMouseOver={clearTooltip} style={{ borderTopRightRadius: 12 }}>
				Improve
			</div>
			{data.map((item) => (
				<Fragment key={item.id}>
					<div onMouseOver={clearTooltip}>{item.name}</div>
					<div
						className={`${classes.hoverable} ${classes[item.define.status]}`}
						onMouseOver={hoverHandler.bind(this, item.name, "Define", item.define.status, item.define.printDuration, item.define.label)}
					/>
					<div
						className={`${classes.hoverable} ${classes[item.imagine.status]}`}
						onMouseOver={hoverHandler.bind(this, item.name, "Imagine", item.imagine.status, item.imagine.printDuration, item.imagine.label)}
					/>
					<div className={classes.createStep}>
						{Object.keys(item.create).map((key) => (
							<div key={`${item.id}${key}`} className={classes.subsystem}>
								<div
									className={`${classes.hoverable} ${classes[item.create[key].research.status]}`}
									onMouseOver={hoverHandler.bind(
										this,
										item.name,
										`${item.create[key].name} [Research]`,
										item.create[key].research.status,
										item.create[key].research.printDuration,
										item.create[key].research.label
									)}
								/>
								<div
									className={`${classes.hoverable} ${classes[item.create[key].plan.status]}`}
									onMouseOver={hoverHandler.bind(this, item.name, `${item.create[key].name} [Plan]`, item.create[key].plan.status, item.create[key].plan.printDuration, item.create[key].plan.label)}
								/>
								<div
									className={`${classes.hoverable} ${classes[item.create[key].code.status]}`}
									onMouseOver={hoverHandler.bind(this, item.name, `${item.create[key].name} [Code]`, item.create[key].code.status, item.create[key].code.printDuration, item.create[key].code.label)}
								/>
							</div>
						))}
					</div>
					<div
						className={`${classes.hoverable} ${classes[item.improve.status]}`}
						onMouseOver={hoverHandler.bind(this, item.name, "Improve", item.improve.status, item.improve.printDuration, item.improve.label)}
					/>
				</Fragment>
			))}
		</div>
	);
};

export default memo(ProgressTable);
