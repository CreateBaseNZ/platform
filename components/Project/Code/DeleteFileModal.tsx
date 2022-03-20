import { Dispatch, SetStateAction, useContext } from "react";
import { useDispatch } from "react-redux";
import GlobalSessionContext from "../../../store/global-session-context";
import { deleteFile } from "../../../store/reducers/codeStepReducer";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";
import { DeleteI } from "../../UI/CustomIcon";
import classes from "./DeleteFileModal.module.scss";

interface Props {
	projectId: string;
	subsystem: string;
	id: string;
	setIsDeletingFile: Dispatch<SetStateAction<string>>;
}

const DeleteFileModal = ({ projectId, subsystem, id, setIsDeletingFile }: Props): JSX.Element => {
	const { globalSession } = useContext(GlobalSessionContext);
	const dispatch = useDispatch();

	const deleteHandler = () => {
		dispatch(deleteFile(globalSession.profileId, projectId, subsystem, id));
		setIsDeletingFile("");
	};

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.modal}>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setIsDeletingFile("")} title="Close">
						close
					</i>
					<div className={classes.h1}>You are about to delete a file</div>
					<div className={classes.h2}>
						Your file will be <b>permanently</b> deleted
					</div>
					<div className={classes.h2}>Are you sure?</div>
					<div className={classes.btnContainer}>
						<button className={classes.cancel} onClick={() => setIsDeletingFile("")}>
							Cancel
						</button>
						<button className={classes.confirm} onClick={deleteHandler}>
							<DeleteI color="white" />
							Delete
						</button>
					</div>
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default DeleteFileModal;
