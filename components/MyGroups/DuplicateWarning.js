import { useContext, useState } from "react";
import router from "next/router";
import useApi from "../../hooks/useApi";
import GlobalSessionContext from "../../store/global-session-context";
import VisualBellContext from "../../store/visual-bell-context";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import Modal from "../UI/Modal";

import classes from "./DuplicateWarning.module.scss";

const DuplicateWarning = ({ setShow, duplicateParams, reset }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [selected, setSelected] = useState({});
	const [error, setError] = useState("");
	const { post } = useApi();
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { setVisualBell } = useContext(VisualBellContext);

	const selectHandler = (group) => {
		setError("");
		if (group.id === selected.id) {
			setSelected({});
		} else {
			setSelected(group);
		}
	};

	const joinHandler = async () => {
		setIsLoading(true);
		if (!selected.id) {
			setError("Please select a school to join");
			return setIsLoading(false);
		}
		await post({
			route: "/api/groups/join-school-teacher",
			input: {
				profileId: globalSession.profileId,
				schoolId: selected.id,
				alias: `${globalSession.firstName} ${globalSession.lastName}`,
				message: "",
				date: new Date().toString(),
			},
			failHandler: (data) => {
				if (data.content === "already joined") {
					setError("You are already in this school");
				} else if (data.content === "already requested") {
					setError("You have already sent a request to join this school");
				}
				setIsLoading(false);
			},
			successHandler: (data) => {
				setGlobalSession((state) => ({ ...state, groups: [...state.groups, data.content] }));
				setVisualBell({ type: "success", message: "Your request has been sent" });
				reset();
				setShow(false);
			},
		});
	};

	const registerHandler = async () => {
		setIsLoading(true);
		await post({
			route: "/api/groups/register-school",
			input: { ...duplicateParams.details, bypassDuplicate: true },
			successHandler: (data) => {
				setGlobalSession((state) => ({ ...state, groups: [...state.groups, data.content] }));
				setVisualBell({ type: "success", message: "Your registration has been submitted for verification" });
				router.push("/my-groups");
			},
		});
	};

	return (
		<Modal title={`We found another school with the same name from ${duplicateParams.otherGroups[0].location.country}`} setShow={setShow} backgroundColor="#fae8d880" width="calc(25rem + 10vw)">
			<div className={classes.description}>
				Someone from your school may have already registered it on CreateBase. If you see it below, you can request to join as a teacher. Otherwise, continue with the registration.
			</div>
			<div className={classes.results}>
				Showing {duplicateParams.otherGroups.length} match{duplicateParams.otherGroups.length > 1 ? "es" : ""}
			</div>
			<div className={`${classes.container} roundScrollbar`}>
				{duplicateParams.otherGroups.map((group) => (
					<button key={group.id} className={`${classes.item} ${selected.id === group.id ? classes.selected : ""}`} onClick={() => selectHandler(group)}>
						<div className={classes.name}>{group.name}</div>
						<div className={classes.location}>
							{group.location.cityState}, {group.location.country}
						</div>
						<i className="material-icons-outlined">check</i>
					</button>
				))}
			</div>
			<div className={classes.error}>{error}</div>
			<div className={classes.btnContainer}>
				<TertiaryButton mainLabel="Continue with registration" isLoading={isLoading} onClick={registerHandler} />
				<PrimaryButton mainLabel="Request to join" isLoading={isLoading} onClick={joinHandler} />
			</div>
		</Modal>
	);
};

export default DuplicateWarning;
