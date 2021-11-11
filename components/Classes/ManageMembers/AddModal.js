// TODO make modals a component

import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useHandleResponse from "../../../hooks/useHandleResponse";
import GlobalSessionContext from "../../../store/global-session-context";
import VisualBellContext from "../../../store/visual-bell-context";
import { PrimaryButton } from "../../UI/Buttons";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";
import { SearchBar } from "../../UI/Input";

import classes from "./AddModal.module.scss";
import router from "next/router";

const AddModal = ({ setShow, classObject, setClassObject }) => {
	const ref = useRef();
	const { globalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const [isLoading, setIsLoading] = useState(false);
	const [userList, setUserList] = useState([]);
	const { setVisualBell } = useContext(VisualBellContext);
	const { register, handleSubmit, watch } = useForm();
	const searchValue = watch("searchValue");

	useEffect(async () => {
		const details = {
			licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			schoolId: globalSession.groups[globalSession.recentGroups[0]].id,
		};
		let data = {};
		const DUMMY_STATUS = "succeeded";
		// TODO move api's into hooks (make reusable) [FRONTEND]
		try {
			data = (await axios.post("/api/groups/fetch-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			console.log(data);
			handleResponse({
				data,
				failHandler: () => {
					if (data.content === "unauthorised") {
						router.replace("/404");
					}
				},
				// TODO either query all with an extra "joined" prop (preferred) [TBD]
				// or only query users not already in class
				successHandler: () => ref.current && setUserList(data.content.map((user) => ({ ...user, name: `${user.firstName} ${user.lastName}` }))),
			});
		}
		return () => (ref.current = null);
	}, []);

	const onSubmit = async (inputs) => {
		setIsLoading(true);
		const { searchValue, ...licenseIds } = inputs;
		// TODO: Integration - Backend (continued)
		// licenseIds is an object where keys are licenseIds and values are checkbox booleans
		// e.g. { abc123: true, xyz789: false, ijk456: true }
		const details = {
			id: classObject.id,
			licenseIds: Object.keys(licenseIds).filter((key) => licenseIds[key]), // convert licenseIds object to an array of licenseIds
			date: new Date().toString(),
		};
		// continuing the example above, details.licenseIds would now look like this [ abc123, ijk456 ]
		console.log(details);
		if (!details.users.length) return setIsLoading(false);
		let data = {};
		const DUMMY_STATUS = "succeeded";
		try {
			data = (await axios.post("/api/classes/add-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => {
					setClassObject((state) => ({ ...state, ...data.content }));
					setShow(false);
					setVisualBell({ type: "success", message: `${details.users.length} new user${details.users.length === 1 ? "" : "s"} added` });
				},
			});
		}
	};

	return (
		<ClientOnlyPortal selector="#modal-root">
			<div className={classes.view}>
				<div className={classes.overlay} onClick={() => setShow(false)} />
				<div className={classes.modal}>
					<h2>Add members to {classObject.name}</h2>
					<i className={`material-icons-outlined ${classes.close}`} onClick={() => setShow(false)}>
						close
					</i>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<SearchBar
							className={classes.input}
							label={`Add members from ${globalSession.groups[globalSession.recentGroups[0]].name}`}
							labelProps={{ className: classes.inputLabel }}
							inputProps={{ placeholder: "Search for members", type: "text", maxLength: 254, ...register("searchValue") }}
						/>
						<div ref={ref} className={`${classes.container} roundScrollbar`}>
							{userList.map(
								(user) =>
									user.name.toLowerCase().includes((searchValue || "").toLowerCase()) && (
										<div key={user.licenseId} className={`${classes.item} ${user.joined ? classes.disabled : ""}`} key={user.licenseId}>
											<input type="checkbox" id={user.licenseId} name={user.licenseId} {...register(user.licenseId)} />
											<label>
												<div>
													<p>{user.name}</p>
													<p>{user.role}</p>
												</div>
												<i className={`material-icons-outlined ${classes.addIcon}`}>add_circle_outline</i>
												<i className={`material-icons ${classes.checkIcon}`}>check_circle</i>
												<span>Already in this class</span>
											</label>
										</div>
									)
							)}
						</div>
						<PrimaryButton className={classes.submitBtn} isLoading={isLoading} type="submit" mainLabel="Add" iconLeft={<i className="material-icons-outlined">person_add</i>} loadingLabel="Adding" />
					</form>
				</div>
			</div>
		</ClientOnlyPortal>
	);
};

export default AddModal;
