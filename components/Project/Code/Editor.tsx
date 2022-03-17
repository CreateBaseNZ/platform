import TextEditor from "./TextEditor";

import classes from "./Editor.module.scss";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";
import { useContext, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import CodeContext from "../../../store/code-context";

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
	const { setFiles } = useContext(CodeContext);

	useEffect(() => {
		(async () => {
			const prop = `${projectId}__${subsystem}`;
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [prop] }, (data) => setFiles(data.content[prop]));
		})();
	}, [globalSession.profileId, projectId, subsystem, setFiles, post]);

	return (
		<div className={classes.editor}>
			<TextEditor projectId={projectId} subsystem={subsystem} run={run} stop={stop} restart={restart} unlink={unlink} />
		</div>
	);
};

export default Editor;
