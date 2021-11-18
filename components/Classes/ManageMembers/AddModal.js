// TODO make modals a component [FRONTEND]
// TODO add enter transition animation to modals [FRONTEND]

import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
import axios from "axios";
import useHandleResponse from "../../../hooks/useHandleResponse";
import GlobalSessionContext from "../../../store/global-session-context";
import VisualBellContext from "../../../store/visual-bell-context";
import { PrimaryButton } from "../../UI/Buttons";
import ClientOnlyPortal from "../../UI/ClientOnlyPortal";
import { SearchBar } from "../../UI/Input";

import classes from "./AddModal.module.scss";

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
			classId: classObject.id,
			licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			groupId: globalSession.groups[globalSession.recentGroups[0]].id,
		};
		let data = {};
		const DUMMY_STATUS = "succeeded";
		try {
			data = (await axios.post("/api/classes/fetch-users", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
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
				successHandler: () => ref.current && setUserList(data.content.filter((user) => !user.status).map((user) => ({ ...user, name: `${user.firstName} ${user.lastName}` }))),
			});
		}
		return () => (ref.current = null);
	}, []);

	const onSubmit = async (inputs) => {
		setIsLoading(true);
		const { searchValue, ...licenseIds } = inputs;
		const details = {
			classId: classObject.id,
			licenseIds: Object.keys(licenseIds).filter((key) => licenseIds[key]),
			date: new Date().toString(),
		};
		if (!details.licenseIds.length) return setIsLoading(false);
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
					setVisualBell({ type: "success", message: `${details.users.length} new user${details.licenseIds.length === 1 ? "" : "s"} added` });
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
										<div key={user.profileId} className={`${classes.item} ${user.joined ? classes.disabled : ""}`}>
											<input type="checkbox" id={user.profileId} name={user.profileId} {...register(user.profileId)} />
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
