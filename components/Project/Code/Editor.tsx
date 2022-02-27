import TextEditor from "./TextEditor";

import classes from "./Editor.module.scss";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";

interface Props {
	run: Run;
	stop: Stop;
	restart: Restart;
	unlink: Unlink;
}

const Editor = ({ run, stop, restart, unlink }: Props): JSX.Element => {
	return (
		<div className={classes.editor}>
			<TextEditor run={run} stop={stop} restart={restart} unlink={unlink} />
		</div>
	);
};

export default Editor;
