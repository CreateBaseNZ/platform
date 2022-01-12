import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addLocale(en);

import classes from "./ResyncButton.module.scss";

const ResyncButton = ({ data, syncHandler, lastSynced }) => {
	return (
		<button className={`${classes.sync} ${data ? "" : classes.syncing}`} onClick={syncHandler} title="Click to resync">
			<i className="material-icons-outlined">sync</i>
			{data ? (
				<>
					Last synced <ReactTimeAgo date={lastSynced} locale={navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language} style={{ marginLeft: "0.25em" }} />
				</>
			) : (
				`Syncing, please wait ...`
			)}
		</button>
	);
};

export default ResyncButton;
