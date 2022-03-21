import NewFile from "./NewFile";
import classes from "./GetStarted.module.scss";

interface Props {
	projectId: string;
	subsystem: string;
}

const EmptyEditor = ({ projectId, subsystem }: Props): JSX.Element => {
	return (
		<div className={classes.view}>
			<NewFile projectId={projectId} subsystem={subsystem} />
		</div>
	);
};

export default EmptyEditor;
