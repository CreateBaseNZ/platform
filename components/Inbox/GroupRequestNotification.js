import axios from "axios";
import { useContext } from "react";
import useHandleResponse from "../../hooks/useHandleResponse";
import GlobalSessionContext from "../../store/global-session-context";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import classes from "./Notification.module.scss";

const GroupRequestNotification = ({ notification, setNotifications }) => {
	const { setGlobalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();

	const approveHandler = async () => {
		const DUMMY_STATUS = "succeeded";
		const inputs = { licenseId: notification.params.user.licenseId, groupId: notification.params.group.id, date: new Date().toString() };
		let data = {};
		try {
			data = (await axios.post("/api/groups/approve-teacher", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => {
					setNotifications((state) => state.filter((notif) => notif.id !== notification.id));
					setGlobalSession((state) => ({ ...state, numOfNotifications: state.numOfNotifications - 1 }));
				},
			});
		}
	};

	const denyHandler = async () => {
		const DUMMY_STATUS = "succeeded";
		const inputs = { licenseId: notification.params.user.licenseId, groupId: notification.params.group.id, date: new Date().toString() };
		let data = {};
		try {
			data = (await axios.post("/api/groups/deny-teacher", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => {
					setNotifications((state) => state.filter((notif) => notif.id !== notification.id));
					setGlobalSession((state) => ({ ...state, numOfNotifications: state.numOfNotifications - 1 }));
				},
			});
		}
	};

	return (
		<div className={classes.notification}>
			<div className={classes.contents}>
				<div className={classes.tag}>{notification.params.group.name}</div>
				<div className={classes.title}>
					<span className={classes.bold}>
						{notification.params.user.firstName} {notification.params.user.lastName}
					</span>{" "}
					({notification.params.user.email}) would like to join your group <span className={`${classes.bold} ${classes.highlight}`}>{notification.params.group.name}</span>
				</div>
				<div className={classes.message}>
					<i className="material-icons-outlined">chat</i>
					{notification.params.message || "No message"}
				</div>
				<div className={classes.btnContainer}>
					<PrimaryButton mainLabel="Approve" onClick={approveHandler} />
					<TertiaryButton mainLabel="Deny" className={classes.deny} onClick={denyHandler} />
				</div>
			</div>
			{/* <button className={classes.delete} title="Clear" onClick={denyHandler}>
				<i className="material-icons-outlined">delete</i>
			</button> */}
		</div>
	);
};

export default GroupRequestNotification;
