import TextEditor from "./TextEditor";

import classes from "./Editor.module.scss";

interface Props {
	run: (code: string) => void;
}

const Editor = ({ run }: Props): JSX.Element => {
	return (
		<div className={classes.editor}>
			<TextEditor run={run} />
		</div>
	);
};

export default Editor;
