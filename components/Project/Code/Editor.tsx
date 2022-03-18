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

	// post("/api/profile/update-saves", {
	// 	profileId: globalSession.profileId,
	// 	update: { [`${projectId}-${subsystem}__files`]: [], [`${projectId}-${subsystem}__workspace`]: {} },
	// 	date: new Date().toString(),
	// });

	useEffect(() => {
		(async () => {
			const filesProp = `${projectId}-${subsystem}__files`;
			const workspaceProp = `${projectId}-${subsystem}__workspace`;
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [filesProp, workspaceProp] }, (data) => {
				console.log(data);
				if (!data.content[filesProp]?.[0]) {
					const newFile = { id: uuidv4(), name: "Untitled", lang: "js", code: "", created: new Date(), lastModified: new Date() };
					setFiles([newFile]);
					setActiveFile(newFile);
					setOpenTextFiles([{ id: newFile.id, name: newFile.name, lang: newFile.lang, lastSavedVersion: 1, isDirty: false }]);
					post("/api/profile/update-saves", {
						profileId: globalSession.profileId,
						update: { [`${projectId}-${subsystem}__files`]: [newFile], [`${projectId}-${subsystem}__workspace`]: { openTextFileIds: [newFile.id], activeFileId: newFile.id } },
						date: new Date().toString(),
					});
					return;
				}
				const _openTextFiles = data.content[workspaceProp]?.openTextFileIds?.reduce((arr: TOpenTextFile[], id: string) => {
					const file = data.content[filesProp]?.find((_f: TCodeFile) => _f.id === id);
					if (file) arr.push({ id: id, name: file.name, lang: file.lang, lastSavedVersion: 1, isDirty: false });
					return arr;
				}, []);
				if (!_openTextFiles?.[0]) {
					const newOpenTextFile = data.content[filesProp][0];
					setOpenTextFiles([{ id: newOpenTextFile.id, name: newOpenTextFile.name, lang: newOpenTextFile.lang, lastSavedVersion: 1, isDirty: false }]);
					setActiveFile(newOpenTextFile);
					return;
				}
				const _activeFile = data.content[filesProp]?.find((f: TCodeFile) => f.id === data.content[workspaceProp]?.activeFileId);
				if (!_activeFile) {
					setActiveFile(data.content[filesProp].find((f: TCodeFile) => f.id === _openTextFiles[0].id));
					return;
				}
				setFiles(data.content[filesProp]);
				setOpenTextFiles(_openTextFiles);
				setActiveFile(_activeFile);
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
