import TextEditor from "./TextEditor";

import classes from "./Editor.module.scss";

const Editor = (): JSX.Element => {
	return (
		<div className={classes.editor}>
			<TextEditor text="" />
		</div>
	);
};

export default Editor;
