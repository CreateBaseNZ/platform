import { ReactElement, useContext, useEffect } from "react";
import NewProjectLayout from "../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { TProject } from "../../../types/projects";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../constants/projects";

import classes from "../../../styles/review.module.scss";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";

interface Props {
	data: TProject;
}

const Review = ({ data }: Props) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();

	useEffect(() => {
		if (!globalSession.loaded) return;
		console.log("review page saved");
		post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [data.id]: { step: "review" } }, date: new Date().toString() });
	}, [globalSession.loaded, globalSession.profileId, data.id, post]);

	return (
		<div className={`${classes.page} roundScrollbar`}>
			<div className={classes.caption}>
				Share your thoughts and ideas with your friends and teacher. How did everything go? Were you able to complete all the challenges? How did you overcome any problems?
			</div>
			<div className={`${classes.cardWrapper} ${classes.survey}`}>
				<i className="material-icons-outlined">thumb_up</i>
				<div className={classes.card}>
					<h3>Complete our survey</h3>
					Let us know how you found this project so we can make future projects even better
				</div>
				<a href="https://forms.gle/x9dXkBKe2JoewnHH8" target="_blank" title="CreateBase workshop survey" rel="noreferrer">
					Complete our survey
				</a>
			</div>
			<div className={`${classes.cardWrapper} ${classes.message}`}>
				<i className="material-icons-outlined">sms</i>
				<div className={classes.card}>
					<h3>Send us a message</h3>
					Found a bug? Have some feedback? Just want to chat? We would love to hear from you
				</div>
				<a href="https://forms.gle/VJNUzpAhXG4KtiZz6" target="_blank" title="Send us a message!" rel="noreferrer">
					Get in touch
				</a>
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
