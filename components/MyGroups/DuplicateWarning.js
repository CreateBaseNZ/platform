import { useState } from "react";
import axios from "axios";
import useHandleResponse from "../../hooks/useHandleResponse";
import Modal from "../UI/Modal";

import classes from "./DuplicateWarning.module.scss";

const DuplicateWarning = ({ setShow, duplicateParams, reset }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { handleResponse } = useHandleResponse();

	const continueHandler = async () => {
		setIsLoading(true);
		const DUMMY_STATUS = "succeeded";
		let data;
		try {
			data = (await axios.post("/api/groups/register-school", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...duplicateParams.details, bypassDuplicate: true }, status: DUMMY_STATUS }))[
				"data"
			];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => {
					setGlobalSession((state) => ({ ...state, groups: [...state.groups, data.content] }));
					reset();
					setShow(false);
				},
			});
		}
	};

	return (
		<Modal title={`We found another school with the same name from ${duplicateParams.details.country}`} setShow={setShow} backgroundColor="#faf2d880">
			<div className={classes.description}>Someone from your school may have already registered it on CreateBase. Please select an option below to continue.</div>
			<div className={classes.container}>
				{duplicateParams.otherGroups.map((group) => (
					<div>{group.name}</div>
				))}
			</div>
		</Modal>
	);
};

export default DuplicateWarning;
