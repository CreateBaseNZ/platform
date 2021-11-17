import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import axios from "axios";
import classes from "./Notification.module.scss";
import useHandleResponse from "../../hooks/useHandleResponse";

const ClassRequestNotification = ({ notification, setNotifications }) => {
	const { handleResponse } = useHandleResponse();

	console.log(notification);

	const approveHandler = async () => {
		const DUMMY_STATUS = "succeeded";
		const inputs = { licenseId: notification.params.user.licenseId, classId: notification.params.class.id };
		let data = {};
		try {
			data = (await axios.post("/api/classes/approve-student", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
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
		const inputs = { licenseId: notification.params.user.licenseId, classId: notification.params.class.id, date: new Date().toString() };
		let data = {};
		try {
			data = (await axios.post("/api/classes/deny-student", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
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
					({notification.params.user.email}) would like to join your class <span className={`${classes.bold} ${classes.highlight}`}>{notification.params.class.name}</span>
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

export default ClassRequestNotification;
