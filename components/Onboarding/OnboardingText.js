import Link from "next/link";
import ClientOnlyPortal from "../UI/ClientOnlyPortal";
import classes from "./OnboardingText.module.scss";

const OnboardingText = ({ state, setState }) => {
	console.log(state);

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setState({ show: false })} />
				<div className={`${classes.container} roundScrollbar`}>
					<div className={classes.contents}>{state.content}</div>
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default OnboardingText;
