import { useState, useEffect } from "react";
import router from "next/router";
import Head from "next/head";
import ProjectLayout from "../../../components/Layouts/ProjectLayout/ProjectLayout";
import getProjectData from "../../../utils/getProjectData";
import Img from "../../../components/UI/Img";

import classes from "/styles/review.module.scss";

const Review = () => {
	const [data, setData] = useState();

	useEffect(() => {
		if (router.query.id) {
			setData(getProjectData(router.query.id));
		}
	}, [router.query.id]);

	if (!data) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Improve • {data.name} | CreateBase</title>
				<meta name="description" content={data.caption} />
			</Head>
			<div className={classes.imgContainer}>
				<div className={classes.imgWrapper}>
					<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/project-pages/review.svg" layout="fill" objectFit="contain" label="Illustration by Storyset" />
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

Review.getLayout = (page) => {
	return <ProjectLayout activeStep="review">{page}</ProjectLayout>;
};

Review.auth = "user";

export default Review;
