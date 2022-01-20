import { useContext } from "react";
import router from "next/router";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import { useSetVisualBell } from "../../../store/visual-bell-context";
import Modal from "../../UI/Modal";
import { PrimaryButton, TertiaryButton } from "../../UI/Buttons";
import classes from "./LeaveModal.module.scss";

const LeaveModal = ({ setShow, classObject }) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const setVisualBell = useSetVisualBell();
	const { post } = useApi();

	const leaveHandler = async () => {
		await post(
			"/api/classes/leave",
			{
				classId: classObject.id,
				date: new Date().toString(),
				licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			},
			() => {
				router.push("/classes");
				setVisualBell("neutral", "Class left");
				setShow(false);
			},
			(data) => {
				if (data.content === "teacher required") {
					setVisualBell("error", "Cannot leave as you are the only teacher in this group");
					setShow(false);
				}
			}
		);
	};

	return (
		<Modal setShow={setShow} title={`Are you sure you want to leave ${classObject.name}?`} backgroundColor="#faf2d880">
			<div className={classes.btnContainer}>
				<TertiaryButton mainLabel="Cancel" className={classes.cancelBtn} onClick={() => setShow(false)} />
				<PrimaryButton mainLabel="Leave" className={classes.leaveBtn} onClick={leaveHandler} />
			</div>
		</Modal>
	);
};

export default LeaveModal;
