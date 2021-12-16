import Link from "next/link";
import router from "next/router";
import { SecondaryButton } from "../UI/Buttons";

import classes from "./DummyBanner.module.scss";

const DummyBanner = () => {
	return (
		<div className={classes.banner}>
			<i className="material-icons-outlined">tips_and_updates</i>
			<div className={classes.bannerText}>
				<div className={classes.bannerHeading}>Welcome! You're viewing a class Progress demo</div>
				<div className={classes.bannerBody}>The class data you are seeing is a sample set so you can start exploring some of the features!</div>
			</div>
			<Link href={{ pathname: "/classes/[id]/manage-members", query: { id: router.query.id } }}>
				<div>
					<SecondaryButton className={classes.bannerBtn} mainLabel="Add students" iconLeft={<i className="material-icons-outlined">person_add</i>} />
				</div>
			</Link>
		</div>
	);
};

export default DummyBanner;
