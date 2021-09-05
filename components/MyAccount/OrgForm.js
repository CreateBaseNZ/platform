import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import Input from "../UI/Input";

import VisualBellContext from "../../store/visual-bell-context";
import { querySchoolAPI } from "../../utils/formValidation";

import axios from "axios";

import classes from "./OrgForm.module.scss";
import { getOrgData } from "../../utils/authHelpers";

const JoinOrgForm = ({ resetCta, setUser, ctx }) => {
	const [showConfirm, setShowConfirm] = useState(false);
	const [loadingQueryOrg, setLoadingQueryOrg] = useState(false);
	const [loadingJoinOrg, setLoadingJoinOrg] = useState(false);
	const [showInvalidCode, setShowInvalidCode] = useState(false);
	const [queriedOrg, setQueriedOrg] = useState({});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		// delete this ------------------------------------
		setLoadingQueryOrg(true);
		const orgValues = {
			name: input.orgName,
			code: input.orgCode,
			type: "school",
			country: "New Zealand",
			date: new Date().toString(),
			metadata: { id: input.orgId },
		};
		let data;
		try {
			data = (await axios.post("/api/organisation/join-educator", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: orgValues }))["data"];
		} catch (error) {
			// TODO error handler
			if (error.response) {
				data = error.response.data;
			} else if (error.request) {
				data = { status: "error", content: error.request };
			} else {
				data = { status: "error", content: error.message };
			}
			alert("there was an error");
			return setLoadingQueryOrg(false);
		}

		const org = await getOrgData();

		setUser((state) => ({ ...state, org: org }));
		setLoadingQueryOrg(false);
		resetCta();
		ctx.setBell({
			type: "success",
			message: `Successfully joined ${queriedOrg.name}`,
		});

		// uncomment this ---------------------------------

		// setLoadingQueryOrg(true);
		// // TODO query if code is valid
		// const notValid = false;
		// if (notValid) {
		// 	setShowInvalidCode(true);
		// 	return setLoadingQueryOrg(false);
		// }
		// setQueriedOrg({
		// 	name: "Lorem",
		// 	city: "Auckland",
		// 	country: "New Zealand",
		// 	educators: 8,
		// 	learners: 143,
		// });
		// setLoadingQueryOrg(false);
		// setShowConfirm(true);

		// ------------------------------------------------
	};

	const joinOrgHandler = () => {
		setLoadingJoinOrg(true);
		// TODO join the org
		const joinError = true;
		if (joinError) {
			// TODO fail handler
			setLoadingJoinOrg(false);
			resetCta();
			return alert("something went wrong");
		}
		setUser((state) => ({ ...state, org: queriedOrg }));
		setLoadingJoinOrg(false);
		resetCta();
		ctx.setBell({
			type: "success",
			message: `Successfully joined ${queriedOrg.name}`,
		});
	};

	return (
		<>
			{showConfirm ? (
				<div className={classes.joinConfirm}>
					<div className={classes.instruction}>You are joining</div>
					<div className={classes.orgPreview}>
						<div className={classes.orgName}>{queriedOrg.name}</div>
						<div className={classes.orgLoc}>
							{queriedOrg.city}, {queriedOrg.country}
						</div>
						<div className={classes.orgUsers}>
							<div>
								<i className="material-icons-outlined">school</i>
								{queriedOrg.educators} educator
								{(queriedOrg.educators > 1 || queriedOrg.educators === 0) && "s"}
							</div>
							<div>
								<i className="material-icons-outlined">backpack</i>
								{queriedOrg.learners} learner
								{(queriedOrg.learners > 1 || queriedOrg.learners === 0) && "s"}
							</div>
						</div>
					</div>
					<div className={classes.joinConfirmBtnContainer}>
						{!loadingJoinOrg && <SecondaryButton className={classes.joinCancelBtn} onClick={() => setShowConfirm(false)} mainLabel="Cancel" />}
						<PrimaryButton className={classes.joinBtn} isLoading={loadingJoinOrg} mainLabel="Confirm" onClick={joinOrgHandler} />
					</div>
				</div>
			) : (
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<p className={classes.instruction}>Enter your organisation code below:</p>
					<Input
						className={classes.input}
						onFocus={() => setShowInvalidCode(false)}
						inputProps={{
							className: classes.joinInput,
							type: "text",
							placeholder: "Organisation code*",
							...register("orgCode", {
								required: "Please enter an organisation code",
							}),
						}}
						error={errors.orgCode || showInvalidCode}
					/>
					<Input
						className={classes.input}
						onFocus={() => setShowInvalidCode(false)}
						inputProps={{
							className: classes.joinInput,
							type: "number",
							maxLength: 254,
							placeholder: "School ID*",
							...register("orgId", {
								required: "Please enter the organisation ID",
							}),
						}}
						error={errors.orgId || showInvalidCode}
					/>
					<Input
						className={classes.input}
						onFocus={() => setShowInvalidCode(false)}
						inputProps={{
							className: classes.joinInput,
							type: "text",
							maxLength: 254,
							placeholder: "School Name*",
							...register("orgName", {
								required: "Please enter the organisation name",
							}),
						}}
						error={errors.orgName || showInvalidCode}
					/>
					<PrimaryButton className={classes.joinBtn} isLoading={loadingQueryOrg} type="submit" mainLabel="Join" />
					{showInvalidCode && <div className={classes.invalidCode}>The details you entered are invalid</div>}
				</form>
			)}
		</>
	);
};

const CreateOrgForm = ({ resetCta, setUser, ctx }) => {
	const [creatingOrg, setCreatingOrg] = useState(false);
	const [invalidId, setInvalidId] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		setCreatingOrg(true);

		const govData = await querySchoolAPI(input.orgId, input.orgName);

		if (!govData.success) {
			setInvalidId("An unexpected error occurred - please try again");
			return setCreatingOrg(false);
		}
		if (govData.result.records.length === 0) {
			setInvalidId("Incorrect details - make sure they match official records");
			return setCreatingOrg(false);
		}
		if (govData.result.records.length > 1) {
			setInvalidId("Error - more than one result was found");
			return setCreatingOrg(false);
		}
		if (govData.result.records[0].School_Id.toString() !== input.orgId || govData.result.records[0].Org_Name.toLowerCase() !== input.orgName.toLowerCase()) {
			setInvalidId("Incorrect details - make sure they match official records");
			return setCreatingOrg(false);
		}

		const newOrg = {
			name: govData.result.records[0].Org_Name,
			type: "school",
			city: govData.result.records[0].Add1_City,
			country: "New Zealand",
			date: new Date().toString(),
			metadata: { id: govData.result.records[0].School_Id.toString() },
		};
		let data;
		try {
			data = (await axios.post("/api/organisation/create", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: newOrg }))["data"];
		} catch (error) {
			// TODO handle error
			if (error.response) {
				data = error.response.data;
			} else if (error.request) {
				data = { status: "error", content: error.request };
			} else {
				data = { status: "error", content: error.message };
			}
			console.log(data);
			alert("TODO an error occurred");
			return resetCta();
		}

		console.log("hello");
		console.log(data);

		// TODO check if taken
		const taken = false;
		if (taken) {
			setInvalidId(
				<>
					This organisation has already registered. If this is a mistake, please
					<a href="https://createbase.co.nz/contact" target="_blank" className={classes.contact}>
						contact us
					</a>
				</>
			);
			return setCreatingOrg(false);
		}

		setUser((state) => ({ ...state, type: "admin", org: { ...newOrg, admins: 1, educators: 0, learners: 0 } }));
		resetCta();
		ctx.setBell({
			type: "success",
			message: `Successfully created and joined ${newOrg.name}`,
		});
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<p className={classes.instruction}>
				To sign up your organisation for the first time, enter its details below.
				<br />
				The ID and name must both match official records.
			</p>
			<Input
				className={classes.input}
				onFocus={() => setInvalidId(false)}
				style={{ margin: "3vh 0 0.5vh 0" }}
				inputProps={{
					className: classes.createInput,
					type: "text",
					placeholder: "School ID*",
					...register("orgId", {
						required: "Please enter your organisation ID",
					}),
				}}
				error={errors.orgId || invalidId}
			/>
			<Input
				className={classes.input}
				onFocus={() => setInvalidId(false)}
				style={{ margin: "0.5vh 0 3vh 0" }}
				inputProps={{
					className: classes.createInput,
					type: "text",
					placeholder: "School Name*",
					...register("orgName", {
						required: "Please enter your organisation name",
					}),
				}}
				error={errors.orgName || invalidId}
			/>
			<PrimaryButton className={classes.createBtn} isLoading={creatingOrg} type="submit" mainLabel="Create Organisation" />
			{invalidId && <div className={classes.invalidCode}>{invalidId}</div>}
		</form>
	);
};

const OrgForm = ({ access, action, setCta, setUser }) => {
	const ctx = useContext(VisualBellContext);

	const resetCta = () => setCta(false);

	return (
		<div className={classes.container}>
			<div className={classes.tabContainer}>
				<button className={`${classes.tab} ${action === "join" ? classes.joinActive : ""}`} onClick={() => setCta("join")}>
					Join an org
				</button>
				{access !== "learner" && (
					<button className={`${classes.tab} ${action === "create" ? classes.createActive : ""}`} onClick={() => setCta("create")}>
						Create an org
					</button>
				)}
			</div>
			{action === "join" ? <JoinOrgForm resetCta={resetCta} setUser={setUser} ctx={ctx} /> : <CreateOrgForm resetCta={resetCta} setUser={setUser} ctx={ctx} />}
		</div>
	);
};

export default OrgForm;
