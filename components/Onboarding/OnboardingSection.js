import { Fragment } from "react";
import OnboardingTask from "./OnboardingTask";

import classes from "./OnboardingSection.module.scss";

const OnboardingSection = ({ section, checkHandler, statuses, setVideoModal, setTextModal }) => {
	return (
		<section className={classes.section}>
			<div className={classes.sectionHeading}>
				<h3>{section.caption}</h3>
				<h4>
					{section.orId ? Number(statuses[section.orId] || 0) : section.tasks.filter((task) => statuses[task.id]).length} of {section.orId ? 1 : section.tasks.length} completed
				</h4>
			</div>
			<div className={classes.taskContainer}>
				{section.tasks.map((task, i) => (
					<Fragment key={task.id}>
						<OnboardingTask
							task={task}
							isCompleted={section.orId ? statuses[section.orId] : statuses[task.id]}
							checkHandler={() => checkHandler(section.orId ? section.orId : task.id)}
							setVideoModal={setVideoModal}
							setTextModal={setTextModal}
						/>
						{section.orId && i < section.tasks.length - 1 && <div className={classes.or}>OR</div>}
					</Fragment>
				))}
			</div>
		</section>
	);
};

export default OnboardingSection;
