import router from "next/router";
import STEPS from "../../../constants/projectSteps";
import classes from "./ProjectLayout.module.scss";

const ProjectLayout = ({ children, activeStep }) => {
	return (
		<div className={classes.projectView}>
			<div className={classes.tabContainer}>
				<button className={classes.backBtn} onClick={() => router.push("/browse")} title="Back to Browse">
					<i className="material-icons-outlined">arrow_back_ios</i>
					Browse
				</button>
				{STEPS.map((step) => (
					<button
						key={step.name}
						className={`${classes.tabWrapper} ${activeStep === step.name ? classes.activeTab : ""}`}
						onClick={() => router.push({ pathname: `/project/[id]/${step.name}`, query: router.query })}>
						<div className={classes.tab}>
							<i className="material-icons-outlined">{step.icon}</i>
							{step.title}
						</div>
					</button>
				))}
			</div>
			<div className={classes.viewContainer}>{children}</div>
		</div>
	);
};

export default ProjectLayout;
