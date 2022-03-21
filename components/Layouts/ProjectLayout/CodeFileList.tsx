import Image from "next/image";
import { Dispatch, FormEvent, KeyboardEvent, memo, MouseEvent, RefObject, SetStateAction, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalSessionContext from "../../../store/global-session-context";
import { renameFile, setActiveFile, TCodeStepState } from "../../../store/reducers/codeStepReducer";
import { TState } from "../../../store/reducers/reducer";

import classes from "./CodeFileList.module.scss";

interface Props {
	projectId: string;
	subsystem: string;
	renameRef: RefObject<HTMLInputElement>;
	renameId: string;
	setRenameId: Dispatch<SetStateAction<string>>;
	setDeletingFile: Dispatch<SetStateAction<string>>;
}

const CodeFileList = ({ projectId, subsystem, renameRef, renameId, setRenameId, setDeletingFile }: Props): JSX.Element => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { allFiles, activeFileId, ctxMenu } = useSelector<TState, TCodeStepState>((state) => state.codeStep);
	const dispatch = useDispatch();

	const setCtxHandler = (id: string, e: MouseEvent) => {
		e.preventDefault();
		dispatch({ type: "code-step/SET_CTX", payload: { x: e.clientX, y: e.clientY, id: id } });
	};

	const submitRenameHandler = (id: string, e?: FormEvent) => {
		e?.preventDefault();
		console.log("yeap");
		if (renameRef.current?.value) {
			dispatch(renameFile(globalSession.profileId, projectId, subsystem, id, renameRef.current.value));
		}
		setRenameId("");
	};

	const keyDownHandler = (id: string, e: KeyboardEvent) => {
		e.preventDefault();
		if (e.key === "Delete") setDeletingFile(id);
	};

	console.log("rerendered");

	return (
		<div className={classes.fileList}>
			{Object.keys(allFiles)
				.sort((a, b) => allFiles[a].name.localeCompare(allFiles[b].name))
				.map((id) => (
					<button
						key={id}
						tabIndex={-1}
						className={`${classes.file} ${ctxMenu?.id === id && classes.toggled} ${activeFileId === id && classes.activeFile} ${renameId === id && classes.renaming}`}
						onClick={() => dispatch(setActiveFile(globalSession.profileId, projectId, subsystem, id))}
						onContextMenu={(e) => setCtxHandler(id, e)}
						onBlur={() => dispatch({ type: "code-step/SET_CTX", payload: null })}
						onKeyDown={(e) => keyDownHandler(id, e)}>
						<div className={classes.fileIcon}>
							<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/${allFiles[id].lang}.svg`} alt={allFiles[id].lang} />
						</div>
						{renameId === id ? (
							<form key={`${id}-rename`} onSubmit={(e) => submitRenameHandler(id, e)}>
								<input ref={renameRef} onBlur={() => submitRenameHandler(id)} />
							</form>
						) : (
							<span>{allFiles[id].name}</span>
						)}
					</button>
				))}
		</div>
	);
};

export default memo(CodeFileList);
