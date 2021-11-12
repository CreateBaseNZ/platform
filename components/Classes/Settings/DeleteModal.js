import { useContext } from "react";
import GlobalSessionContext from "../../../store/global-session-context";
import VisualBellContext from "../../../store/visual-bell-context";
import axios from "axios";
import { PrimaryButton, TertiaryButton } from "../../UI/Buttons";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";
import useHandleResponse from "../../../hooks/useHandleResponse";
import classes from "./DeleteModal.module.scss";
import router from "next/router";

const DeleteModal = ({ setShow, classObject }) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { setVisualBell } = useContext(VisualBellContext);
	const { handleResponse } = useHandleResponse();

	const deleteHandler = async () => {
		const details = {
			licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			classId: classObject.id,
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
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setShow(false)} />
				<div className={classes.modal}>
					<h2>Are you sure you want to delete {classObject.name}?</h2>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setShow(false)}>
						close
					</i>
					<div className={classes.p}>All members will be removed and class data deleted permanently</div>
					<div className={classes.btnContainer}>
						<TertiaryButton mainLabel="Cancel" className={classes.cancelBtn} onClick={() => setShow(false)} />
						<PrimaryButton mainLabel="Delete" className={classes.deleteBtn} onClick={deleteHandler} />
					</div>
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default DeleteModal;
