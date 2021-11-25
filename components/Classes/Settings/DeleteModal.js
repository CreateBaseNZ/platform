import { useContext } from "react";
import router from "next/router";
import axios from "axios";
import useHandleResponse from "../../../hooks/useHandleResponse";
import { PrimaryButton, TertiaryButton } from "../../UI/Buttons";
import Modal from "../../UI/Modal";
import GlobalSessionContext from "../../../store/global-session-context";
import VisualBellContext from "../../../store/visual-bell-context";
import classes from "./DeleteModal.module.scss";

const DeleteModal = ({ setShow, classObject }) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { setVisualBell } = useContext(VisualBellContext);
	const { handleResponse } = useHandleResponse();

	const deleteHandler = async () => {
		const details = {
			classId: classObject.id,
			date: new Date().toString(),
			licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
		};
		let data = {};
		const DUMMY_STATUS = "succeeded";
		try {
			data = (await axios.post("/api/classes/delete", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {
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
		}
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
