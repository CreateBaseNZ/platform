import axios from "axios";
import useHandleResponse from "../../hooks/useHandleResponse";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import classes from "./Notification.module.scss";

const GroupRequestNotification = ({ notification, setNotifications }) => {
	const { handleResponse } = useHandleResponse();

	const approveHandler = async () => {
		const DUMMY_STATUS = "succeeded";
		const inputs = { accountId: notification.params.user.accountId, groupId: notification.params.group.id };
		let data = {};
		try {
			data = (await axios.post("/api/groups/approve-teacher", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => setNotifications((state) => state.filter((notif) => notif.id !== notification.id)),
			});
		}
	};

	const denyHandler = async () => {
		const DUMMY_STATUS = "succeeded";
		const inputs = { accountId: notification.params.user.accountId, groupId: notification.params.group.id };
		let data = {};
		try {
			data = (await axios.post("/api/groups/deny-teacher", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => setNotifications((state) => state.filter((notif) => notif.id !== notification.id)),
			});
		}
	};

	return (
		<div className={classes.notification}>
			<div className={classes.contents}>
				<div className={classes.tag}>{notification.params.group.name}</div>
				<div className={classes.message}>
					<span className={classes.bold}>
						{notification.params.user.firstName} {notification.params.user.lastName}
					</span>{" "}
					({notification.params.user.email}) would like to join your group <span className={`${classes.bold} ${classes.highlight}`}>{notification.params.group.name}</span>
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
