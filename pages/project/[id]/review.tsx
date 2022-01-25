import { ReactElement } from "react";
import Img from "../../../components/UI/Img";
import NewProjectLayout from "../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { IProjectReadOnly } from "../../../types/projects";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../constants/projects";

import classes from "/styles/review.module.scss";

interface Props {
	data: IProjectReadOnly;
}

const Review = ({ data }: Props) => {
	return (
		<div className={`${classes.view} roundScrollbar`}>
			<div className={classes.imgContainer}>
				<div className={classes.imgWrapper}>
					<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/review.svg" layout="fill" objectFit="contain" label="Illustration by Storyset" />
				</div>
				<div className={classes.caption}>
					Share your thoughts and ideas with your friends and teacher. How did everything go? Were you able to complete all the challenges? How did you overcome any problems?
				</div>
			</div>
			<div className={classes.cardContainer}>
				<div className={`${classes.cardWrapper} ${classes.survey}`}>
					<span className="material-icons-outlined">thumb_up</span>
					<div className={classes.card}>
						<h3>Complete our survey</h3>
						Let us know how you found this project so we can make future projects even better
					</div>
					<a href="https://forms.gle/x9dXkBKe2JoewnHH8" target="_blank" title="CreateBase workshop survey">
						Complete our survey
					</a>
				</div>
				<div className={`${classes.cardWrapper} ${classes.message}`}>
					<span className="material-icons-outlined">sms</span>
					<div className={classes.card}>
						<h3>Send us a message</h3>
						Found a bug? Have some feedback? Just want to chat? We would love to hear from you
					</div>
					<a href="https://forms.gle/VJNUzpAhXG4KtiZz6" target="_blank" title="Send us a message!">
						Get in touch
					</a>
				</div>
			</div>
		</div>
	);
};

Review.getLayout = (page: ReactElement, data: any) => {
	return (
		<NewProjectLayout step="Review" data={data.data}>
			{page}
		</NewProjectLayout>
	);
};

Review.auth = "user";

export default Review;

interface Params {
	params: {
		id: string;
	};
}

export async function getStaticProps({ params }: Params) {
	console.log(params);
	return {
		props: {
			data: ALL_PROJECTS_OBJECT[params.id],
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: ALL_PROJECTS_ARRAY.map((project) => {
			return {
				params: {
					id: project.id,
				},
			};
		}),
		fallback: false,
	};
}
