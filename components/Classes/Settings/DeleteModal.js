import { useContext } from "react";
import router from "next/router";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import { useSetVisualBell } from "../../../store/visual-bell-context";
import { PrimaryButton, TertiaryButton } from "../../UI/Buttons";
import Modal from "../../UI/Modal";

import classes from "./DeleteModal.module.scss";

const DeleteModal = ({ setShow, classObject }) => {
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);
	const setVisualBell = useSetVisualBell();

	const deleteHandler = async () => {
		await post(
			"/api/classes/delete",
			{
				classId: classObject.id,
				date: new Date().toString(),
				licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			},
			() => {
				router.push("/classes");
				setVisualBell("neutral", "Class deleted");
			},
			(data) => {
				if (data.content === "unauthorised") {
					setVisualBell("error", "You do not have permission to delete this class");
					setShow(false);
				}
			}
		);
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
