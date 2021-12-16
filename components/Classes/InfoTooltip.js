import classes from "./InfoTooltip.module.scss";

const InfoTooltip = ({ content }) => {
	return (
		<div className={classes.helpContainer}>
			<button>
				<i className="material-icons-outlined">help_outline</i>
				How does this work?
			</button>
			<div className={classes.help}>{content}</div>
		</div>
	);
};

export default InfoTooltip;
