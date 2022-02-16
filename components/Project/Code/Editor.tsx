import TextEditor from "./TextEditor";

import classes from "./Editor.module.scss";

interface Props {
	run: (code: string) => void;
	stop: () => void;
}

const Editor = ({ run, stop }: Props): JSX.Element => {
	return (
		<div className={classes.editor}>
			<TextEditor run={run} stop={stop} />
		</div>
	);
};

export default Editor;
