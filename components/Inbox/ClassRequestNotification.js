import useApi from "../../hooks/useApi";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import classes from "./Notification.module.scss";

const ClassRequestNotification = ({ notification, setNotifications }) => {
	const { post } = useApi();

	const approveHandler = async () => {
		await post("/api/classes/approve-student", { licenseId: notification.params.user.licenseId, classId: notification.params.class.id }, () =>
			setNotifications((state) => state.filter((notif) => notif.id !== notification.id))
		);
	};

	const denyHandler = async () => {
		await post("/api/classes/deny-student", { licenseId: notification.params.user.licenseId, classId: notification.params.class.id, date: new Date().toString() }, () =>
			setNotifications((state) => state.filter((notif) => notif.id !== notification.id))
		);
	};

	return (
		<div className={classes.notification}>
			<div className={classes.contents}>
				<div className={classes.tag}>{notification.params.group.name}</div>
				<div className={classes.title}>
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
