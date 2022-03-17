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

const Editor = ({ projectId, subsystem, run, stop, restart, unlink }: Props): JSX.Element => {
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);
	const { files, setFiles, activeFile, setActiveFile } = useContext(CodeContext);

	useEffect(() => {
		(async () => {
			const prop = `${projectId}__${subsystem}`;
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [prop] }, (data) => {
				console.log(data);
				if (data.content[prop].length) {
					setFiles(data.content[prop]);
					setActiveFile(data.content[prop][0]);
				} else {
					const newFile = { id: uuidv4(), name: "Untitled", lang: "js", code: "", created: new Date(), lastModified: new Date() };
					setFiles([newFile]);
					setActiveFile(newFile);
				}
			});
		})();
	}, [globalSession.profileId, projectId, subsystem, setFiles, setActiveFile, post]);

	return <div className={classes.editor}>{activeFile.lang === "js" && <TextEditor projectId={projectId} subsystem={subsystem} run={run} stop={stop} restart={restart} unlink={unlink} />}</div>;
};

export default memo(Editor);
