import { Dispatch, SetStateAction } from "react";
import { TextModal } from "../../pages/onboarding";
import ClientOnlyPortal from "../UI/ClientOnlyPortal";
import classes from "./OnboardingText.module.scss";

interface OnboardingTextProps {
	state: TextModal;
	setState: Dispatch<SetStateAction<TextModal>>;
}

const OnboardingText = ({ state, setState }: OnboardingTextProps): JSX.Element => {
	console.log(state);

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setState({ content: null, show: false })} />
				<div className={`${classes.container} roundScrollbar`}>
					<div className={classes.contents}>{state.content}</div>
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default OnboardingText;
