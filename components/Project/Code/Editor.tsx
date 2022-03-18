import { memo, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";
import TextEditor from "./TextEditor";
import classes from "./Editor.module.scss";
import { TCodeFile, TCodeStepState, TOpenTextFile } from "../../../store/reducers/codeStepReducer";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../../store/reducers/reducer";

interface Props {
	run: Run;
	stop: Stop;
	restart: Restart;
	unlink: Unlink;
	projectId: string;
	subsystem: string;
}

const Editor = ({ projectId, subsystem, run, stop, restart, unlink }: Props): JSX.Element => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const { activeFile } = useSelector<TState, TCodeStepState>((state) => state.codeStep);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const filesProp = `${projectId}-${subsystem}__files`;
			const workspaceProp = `${projectId}-${subsystem}__workspace`;
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [filesProp, workspaceProp] }, (data) => {
				console.log(data);

				if (!data.content[filesProp]?.[0]) {
					const newFile = { id: uuidv4(), name: "Untitled", lang: "js", code: "", created: new Date(), lastModified: new Date() };
					dispatch({
						type: "INIT_EDITOR",
						payload: {
							allFiles: [newFile],
							openTextFiles: [{ id: newFile.id, name: newFile.name, lang: newFile.lang, lastSavedVersion: 1, isDirty: false }],
							activeFile: newFile,
						},
					});
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
					dispatch({
						type: "INIT_EDITOR",
						payload: {
							allFiles: [data.content[filesProp]],
							openTextFiles: [{ id: newOpenTextFile.id, name: newOpenTextFile.name, lang: newOpenTextFile.lang, lastSavedVersion: 1, isDirty: false }],
							activeFile: newOpenTextFile,
						},
					});
					return;
				}

				const _activeFile = data.content[filesProp]?.find((f: TCodeFile) => f.id === data.content[workspaceProp]?.activeFileId);
				if (!_activeFile) {
					dispatch({
						type: "INIT_EDITOR",
						payload: {
							allFiles: [data.content[filesProp]],
							openTextFiles: _openTextFiles,
							activeFile: _openTextFiles[0],
						},
					});
					return;
				}

				dispatch({
					type: "INIT_EDITOR",
					payload: {
						allFiles: [data.content[filesProp]],
						openTextFiles: _openTextFiles,
						activeFile: _activeFile,
					},
				});
			});
		})();
	}, [globalSession.profileId, projectId, subsystem, post, dispatch]);

	return <div className={classes.editor}>{activeFile.lang === "js" && <TextEditor projectId={projectId} subsystem={subsystem} run={run} stop={stop} restart={restart} unlink={unlink} />}</div>;
};

export default memo(Editor);
