import { memo } from "react";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";
import TextEditor from "./TextEditor";
import classes from "./Editor.module.scss";
import { TCodeStepState } from "../../../store/reducers/codeStepReducer";
import { useSelector } from "react-redux";
import { TState } from "../../../store/reducers/reducer";

interface Props {
	projectId: string;
	subsystem: string;
	run: Run;
	stop: Stop;
	restart: Restart;
	unlink: Unlink;
}

const Editor = ({ projectId, subsystem, run, stop, restart, unlink }: Props): JSX.Element => {
	const { allFiles, activeFileId } = useSelector<TState, TCodeStepState>((state) => state.codeStep);

	return (
		<div className={classes.editor}>
			{allFiles?.[activeFileId]?.lang === "js" && <TextEditor projectId={projectId} subsystem={subsystem} run={run} stop={stop} restart={restart} unlink={unlink} />}
		</div>
	);
};

export default memo(Editor);
