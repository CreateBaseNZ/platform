import Img from "../UI/Img";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";

import classes from "./OrgCard.module.scss";

const OrgCard = ({ user, leavingOrg, leaveOrgHandler, setLeavingOrg }) => {
	return (
		<div className={`${classes.orgCard} ${leavingOrg ? classes.leavingOrg : ""}`}>
			<div className={classes.orgDetails}>
				<div className={classes.orgCaption}>Your organisation</div>
				<div className={classes.orgName}>{user.org.name}</div>
				<div className={classes.orgLocation}>
					{user.org.city}, {user.org.country}
				</div>
				<div className={classes.orgUsers}>
					{user.type === "admin" && (
						<div>
							<i className="material-icons-outlined">verified_user</i>
							{user.org.admins} admin
							{(user.org.admins > 1 || user.org.admins === 0) && "s"}
						</div>
					)}
					{user.type !== "learner" && (
						<div>
							<i className="material-icons-outlined">school</i>
							{user.org.educators} educator
							{(user.org.educators > 1 || user.org.educators === 0) && "s"}
						</div>
					)}
					<div>
						<i className="material-icons-outlined">backpack</i>
						{user.org.learners} learner
						{(user.org.learners > 1 || user.org.learners === 0) && "s"}
					</div>
				</div>
				{/* <SecondaryButton className={classes.leaveOrgBtn} mainLabel="Leave" onClick={() => setLeavingOrg(true)} /> */}
			</div>
			<div className={classes.img}>
				<Img src="/my-org.svg" layout="responsive" height={300} width={300} />
			</div>
			<div className={classes.leaveConfirm}>
				<div className={classes.leaveH1}>
					Are you sure you want to leave <span>{user.org.name}</span>?
				</div>
				<div className={classes.leaveH2}>You will not be able to view contents available to the organisation</div>
				<div style={{ display: "flex" }}>
					<SecondaryButton className={classes.leaveCancelBtn} mainLabel="Cancel" onClick={() => setLeavingOrg(false)} />
					<PrimaryButton className={classes.leaveYesBtn} mainLabel="Yes, I want to leave" onClick={leaveOrgHandler} />
				</div>
			</div>
		</div>
	);
};

export default OrgCard;
