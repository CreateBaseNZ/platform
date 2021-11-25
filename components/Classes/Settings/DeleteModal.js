import { useContext } from "react";
import router from "next/router";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import VisualBellContext from "../../../store/visual-bell-context";
import { PrimaryButton, TertiaryButton } from "../../UI/Buttons";
import Modal from "../../UI/Modal";

import classes from "./DeleteModal.module.scss";

const DeleteModal = ({ setShow, classObject }) => {
	const post = useApi();
	const { globalSession } = useContext(GlobalSessionContext);
	const { setVisualBell } = useContext(VisualBellContext);

	const deleteHandler = async () => {
		await post({
			route: "/api/classes/delete",
			input: {
				classId: classObject.id,
				date: new Date().toString(),
				licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			},
			failHandler: (data) => {
				if (data.content === "unauthorised") {
					setVisualBell({ type: "error", message: "You do not have permission to delete this class" });
					setShow(false);
				}
			},
			successHandler: () => {
				router.push("/classes");
				setVisualBell({ type: "neutral", message: "Class deleted" });
			},
		});
	};

	return (
		<Modal setShow={setShow} title={`Are you sure you want to delete ${classObject.name}?`} backgroundColor="#fae3d880">
			<div className={classes.p}>All members will be removed and class data deleted permanently</div>
			<div className={classes.btnContainer}>
				<TertiaryButton mainLabel="Cancel" className={classes.cancelBtn} onClick={() => setShow(false)} />
				<PrimaryButton mainLabel="Delete" className={classes.deleteBtn} onClick={deleteHandler} />
			</div>
		</Modal>
	);
};

export default DeleteModal;
