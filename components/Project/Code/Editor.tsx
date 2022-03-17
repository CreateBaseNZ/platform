import { memo, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import CodeContext from "../../../store/code-context";
import { TCodeFile } from "../../../types/code";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";
import TextEditor from "./TextEditor";
import classes from "./Editor.module.scss";

interface Props {
	run: Run;
	stop: Stop;
	restart: Restart;
	unlink: Unlink;
	projectId: string;
	subsystem: string;
}

export interface TOpenTextFile {
	id: string;
	name: string;
	lang: string;
	lastSavedVersion: number | undefined;
	isDirty: boolean;
}

const Editor = ({ projectId, subsystem, run, stop, restart, unlink }: Props): JSX.Element => {
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);
	const { files, setFiles, activeFile, setActiveFile } = useContext(CodeContext);
	const [openTextFiles, setOpenTextFiles] = useState<TOpenTextFile[]>([]);

	useEffect(() => {
		(async () => {
			const filesProp = `${projectId}-${subsystem}__files`;
			const workspaceProp = `${projectId}-${subsystem}__workspace`;
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [filesProp, workspaceProp] }, (data) => {
				console.log(data);
				const newFile = { id: uuidv4(), name: "Untitled", lang: "js", code: "", created: new Date(), lastModified: new Date() };
				if (data.content[filesProp]?.length) {
					setFiles(data.content[filesProp]);
				} else {
					setFiles([newFile]);
				}
				const _activeFile = data.content[filesProp]?.find((f: TCodeFile) => f.id === data.content[workspaceProp]?.activeFileId);
				if (_activeFile) {
					setActiveFile(_activeFile);
				} else {
					setActiveFile(newFile);
				}
				setOpenTextFiles(
					data.content[workspaceProp].openTextFileIds?.map((fileId: string) => {
						const file = data.content[filesProp]?.find((_f: TCodeFile) => _f.id === fileId);
						return { id: fileId, name: file.name, lang: file.lang, lastSavedVersionId: 1, isDirty: false };
					}) || []
				);
			});
		})();
	}, [globalSession.profileId, projectId, subsystem, setFiles, setActiveFile, post]);

	return (
		<div className={classes.editor}>
			{activeFile.lang === "js" && (
				<TextEditor projectId={projectId} subsystem={subsystem} openTextFiles={openTextFiles} setOpenTextFiles={setOpenTextFiles} run={run} stop={stop} restart={restart} unlink={unlink} />
			)}
		</div>
	);
};

export default memo(Editor);
