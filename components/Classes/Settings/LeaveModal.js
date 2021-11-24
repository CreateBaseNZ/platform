import { useContext } from "react";
import GlobalSessionContext from "../../../store/global-session-context";
import VisualBellContext from "../../../store/visual-bell-context";
import axios from "axios";
import { PrimaryButton, TertiaryButton } from "../../UI/Buttons";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";
import classes from "./LeaveModal.module.scss";
import useHandleResponse from "../../../hooks/useHandleResponse";
import router from "next/router";

const LeaveModal = ({ setShow, classObject }) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { setVisualBell } = useContext(VisualBellContext);
	const { handleResponse } = useHandleResponse();

	const leaveHandler = async () => {
		const details = {
			classId: classObject.id,
			date: new Date().toString(),
			licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
		};
		let data = {};
		try {
			data = (await axios.post("/api/classes/leave", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {
					if (data.content === "teacher required") {
						setVisualBell({ type: "error", message: "Cannot leave as you are the only teacher in this group" });
						setShow(false);
					}
				},
				successHandler: () => {
					router.push("/classes");
					setVisualBell({ type: "neutral", message: "Class left" });
					setShow(false);
				},
			});
		}
	};

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setShow(false)} />
				<div className={classes.modal}>
					<h2>Are you sure you want to leave {classObject.name}?</h2>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setShow(false)}>
						close
					</i>
					<div className={classes.btnContainer}>
						<TertiaryButton mainLabel="Cancel" className={classes.cancelBtn} onClick={() => setShow(false)} />
						<PrimaryButton mainLabel="Leave" className={classes.leaveBtn} onClick={leaveHandler} />
					</div>
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default LeaveModal;
