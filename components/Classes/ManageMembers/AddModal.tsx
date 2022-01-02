import { Dispatch, RefObject, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import router from "next/router";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import VisualBellContext from "../../../store/visual-bell-context";
import { PrimaryButton } from "../../UI/Buttons";
import { SearchBar } from "../../UI/Input";
import Modal from "../../UI/Modal";

import classes from "./AddModal.module.scss";
import { IFullClassObject } from "../../../hooks/useClass";

interface IAddModalProps {
	setShow: (_: boolean) => void;
	classObject: IFullClassObject;
	setClassObject: Dispatch<SetStateAction<IFullClassObject>>;
}

const AddModal = ({ setShow, classObject, setClassObject }: IAddModalProps): JSX.Element => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { globalSession } = useContext(GlobalSessionContext);
	const [isLoading, setIsLoading] = useState(false);
	const [userList, setUserList] = useState([]);
	const { setVisualBell } = useContext(VisualBellContext);
	const { register, handleSubmit, watch } = useForm();
	const searchValue = watch("searchValue");
	const { post } = useApi();

	useEffect(() => {
		(async () => {
			await post(
				"/api/classes/fetch-users",
				{
					classId: classObject.id,
					licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
					groupId: globalSession.groups[globalSession.recentGroups[0]].id,
				},
				(data) => ref.current && setUserList(data.content.filter((user) => !user.status).map((user) => ({ ...user, name: `${user.firstName} ${user.lastName}` }))),
				(data) => {
					if (data.content === "unauthorised") {
						router.replace("/404");
					}
				}
			);
		})();
		return () => {
			ref.current = null;
		};
	}, []);

	const onSubmit = async (inputs) => {
		setIsLoading(true);
		const { searchValue, ...rest } = inputs;
		const selectedUsers = Object.keys(rest)
			.filter((key) => rest[key])
			.map((key) => userList[key.split("_")[0]]);
		const details = {
			classId: classObject.id,
			licenseId: globalSession.groups[globalSession.recentGroups[0]].licenseId,
			groupId: globalSession.groups[globalSession.recentGroups[0]].id,
			licenseIds: selectedUsers.map((user) => user.licenseId),
			date: new Date().toString(),
		};
		if (!details.licenseIds.length) return setIsLoading(false);
		await post("/api/classes/add-users", details, () => {
			let students = [];
			let teachers = [];
			for (let i = 0; i < selectedUsers.length; i++) {
				const user = selectedUsers[i];
				if (user.role === "student") {
					students.push({ email: user.email, firstName: user.firstName, lastName: user.lastName, licenseId: user.licenseId, role: user.role });
				} else if (user.role === "teacher" || user.role === "admin") {
					teachers.push(user.alias);
				}
			}
			setClassObject((state) => ({
				...state,
				teachers: [...state.teachers, ...teachers],
				students: [...state.students, ...students],
			}));
			setShow(false);
			setVisualBell("success", `${details.licenseIds.length} new user${details.licenseIds.length === 1 ? "" : "s"} added`);
		});
	};

	return (
		<Modal setShow={setShow} title={`Add members to ${classObject.name}`}>
			<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<SearchBar
					className={classes.input}
					label={`Add members from ${globalSession.groups[globalSession.recentGroups[0]].name}`}
					labelProps={{ className: classes.inputLabel }}
					inputProps={{ placeholder: "Search for members", type: "text", maxLength: 254, ...register("searchValue") }}
				/>
				<div ref={ref} className={`${classes.container} roundScrollbar`}>
					{userList.map(
						(user, i) =>
							user.name.toLowerCase().includes((searchValue || "").toLowerCase()) && (
								<div key={user.licenseId} className={`${classes.item} ${user.joined ? classes.disabled : ""}`}>
									<input type="checkbox" id={user.licenseId} name={user.licenseId} {...register(`${i}_user`)} />
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
		</Modal>
	);
};

export default AddModal;
