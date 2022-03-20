import { Dispatch, SetStateAction } from "react";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";
import NewFile from "./NewFile";

import classes from "./NewFileModal.module.scss";

interface Props {
	projectId: string;
	subsystem: string;
	setIsCreatingNewFile: Dispatch<SetStateAction<boolean>>;
}

const NewFileModal = ({ projectId, subsystem, setIsCreatingNewFile }: Props): JSX.Element => {
	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.wrapper}>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setIsCreatingNewFile(false)} title="Close">
						close
					</i>
					<NewFile projectId={projectId} subsystem={subsystem} submitCallback={() => setIsCreatingNewFile(false)} />
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default NewFileModal;
