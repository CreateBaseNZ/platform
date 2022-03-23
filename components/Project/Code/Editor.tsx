import { memo } from "react";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";
import TextEditor from "./TextEditor";
import classes from "./Editor.module.scss";
import { TCodeStepState, TLang } from "../../../store/reducers/codeStepReducer";
import { useSelector } from "react-redux";
import { TState } from "../../../store/reducers/reducer";
import GetStarted from "./GetStarted";
import { DndContext, useDraggable } from "@dnd-kit/core";

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

	console.log("## editor rerendered ##");

	const renderEditor = (lang: TLang | undefined) => {
		switch (lang) {
			case "js":
				return <TextEditor projectId={projectId} subsystem={subsystem} run={run} stop={stop} restart={restart} unlink={unlink} />;
			default:
				return <GetStarted projectId={projectId} subsystem={subsystem} />;
		}
	};

	return (
		<DndContext>
			<div className={classes.editor}>{renderEditor(allFiles?.[activeFileId]?.lang)}</div>
		</DndContext>
	);
};

export default memo(Editor);
