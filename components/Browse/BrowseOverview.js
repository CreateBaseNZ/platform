import Link from "next/link";
import { SecondaryButton } from "../UI/Buttons";

import classes from "./BrowseOverview.module.scss";

const BrowseOverview = ({ project, userType }) => {
	return (
		<>
			<div className={classes.caption}>
				{project.caption}
				{userType === "guest" && <p className={classes.createAccount}>To view lesson plans and teaching content, please create or log into a FREE educator account.</p>}
			</div>
		</>
	);
};

export default BrowseOverview;
