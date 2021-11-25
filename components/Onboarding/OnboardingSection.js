import { Fragment } from "react";
import OnboardingTask from "./OnboardingTask";

import classes from "./OnboardingSection.module.scss";

const OnboardingSection = ({ section, checkHandler, statuses, setVideoModal }) => {
	return (
		<section className={classes.section}>
			<div className={classes.sectionHeading}>
				<h3>{section.caption}</h3>
				<h4>
					{section.hasOr ? Number(statuses[section.orId]) : section.tasks.filter((task) => statuses[task.id]).length} of {section.hasOr ? 1 : section.tasks.length} completed
				</h4>
			</div>
			<div className={classes.taskContainer}>
				{section.tasks.map((task, i) => (
					<Fragment key={task.id}>
						<OnboardingTask
							task={task}
							isCompleted={section.hasOr ? statuses[section.orId] : statuses[task.id]}
							checkHandler={() => checkHandler(section.hasOr ? section.orId : task.id)}
							setVideoModal={setVideoModal}
						/>
						{section.hasOr && i < section.tasks.length - 1 && <div className={classes.or}>OR</div>}
					</Fragment>
				))}
			</div>
		</section>
	);
};

export default OnboardingSection;
