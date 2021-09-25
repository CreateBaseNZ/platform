import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { PrimaryButton, SecondaryButton } from "../UI/Buttons";
import Input from "../UI/Input";
import Img from "../UI/Img";

import VisualBellContext from "../../store/visual-bell-context";
import useOrganisationHelper from "../../hooks/useOrganisationHelper";
import { querySchoolAPI } from "../../utils/formValidation";

import classes from "./MyAccount.module.scss";
import router from "next/router";
import InviteOrgContext from "../../store/invite-org-context";

const JoinOrg = ({ setUser }) => {
	const ctx = useContext(VisualBellContext);
	const { getOrgData, joinOrgEducator, getEducatorLink, getLearnerLink } = useOrganisationHelper({ ...ctx });
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState();
	const {
		register,
		handleSubmit,
		setError,
		setFocus,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		setIsLoading(true);
		const orgValues = {
			name: input.orgName,
			code: input.orgCode,
			type: "school",
			country: "New Zealand",
			metadata: { id: input.orgId },
		};
		joinOrgEducator({
			details: orgValues,
			failHandler: (content) => {
				if (content.code) {
					setError("orgCode", { type: "manual", message: "Invalid code" }, { shouldFocus: true });
				}
				if (content.organisation) {
					setFocus("orgId");
					setErrorMessage("Incorrect organisation details");
				}
				setIsLoading(false);
			},
			successHandler: async () => {
				let org = await getOrgData();
				const educatorLink = await getEducatorLink();
				const learnerLink = await getLearnerLink();
				org = { ...org, educatorLink: educatorLink, learnerLink: learnerLink };
				setUser((state) => ({ ...state, org: org }));
				setIsLoading(false);
				ctx.setBell({
					type: "success",
					message: `Successfully joined ${org.name}`,
				});
			},
		});
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<p className={classes.instruction}>Enter your organisation code below:</p>
			<Input
				className={classes.input}
				label="Organisation code*"
				onFocus={() => setErrorMessage()}
				inputProps={{
					type: "text",
					maxLength: 254,
					...register("orgCode", {
						required: "Please enter an organisation code",
					}),
				}}
				error={errors.orgCode}
			/>
			<Input
				className={classes.input}
				label="Organisation ID*"
				onFocus={() => setErrorMessage()}
				inputProps={{
					type: "number",
					maxLength: 254,
					...register("orgId", {
						required: "Please enter the organisation ID",
					}),
				}}
				error={errors.orgId || errorMessage}
			/>
			<Input
				className={classes.input}
				label="Organisation name*"
				onFocus={() => setErrorMessage()}
				inputProps={{
					type: "text",
					maxLength: 254,
					...register("orgName", {
						required: "Please enter the organisation name",
					}),
				}}
				error={errors.orgName || errorMessage}
			/>
			<div className={classes.errorMessage} style={{ opacity: errorMessage && 1 }}>
				{errorMessage}
			</div>
			<PrimaryButton
				className={classes.submit}
				isLoading={isLoading}
				type="submit"
				mainLabel="Join"
				loadingLabel="Joining ..."
				iconRight={<i className={`material-icons-outlined ${classes.right}`}>arrow_forward</i>}
			/>
		</form>
	);
};

const RegisterOrg = ({ setUser }) => {
	const ctx = useContext(VisualBellContext);
	const { getOrgData, createOrg, getEducatorLink, getLearnerLink } = useOrganisationHelper({ ...ctx });
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = async (input) => {
		setIsLoading(true);

		const govData = await querySchoolAPI(input.orgId, input.orgName);

		if (!govData.success) {
			setErrorMessage("An unexpected error occurred - please try again");
			return setIsLoading(false);
		}
		if (govData.result.records.length === 0) {
			setErrorMessage("Incorrect details - make sure they match official records");
			return setIsLoading(false);
		}
		if (govData.result.records.length > 1) {
			setErrorMessage("Error - more than one result was found");
			return setIsLoading(false);
		}
		if (govData.result.records[0].School_Id.toString() !== input.orgId || govData.result.records[0].Org_Name.toLowerCase() !== input.orgName.toLowerCase()) {
			setErrorMessage("Incorrect details - make sure they match official records");
			return setIsLoading(false);
		}

		const newOrg = {
			name: govData.result.records[0].Org_Name,
			type: "school",
			city: govData.result.records[0].Add1_City,
			country: "New Zealand",
			metadata: { id: govData.result.records[0].School_Id.toString() },
		};

		createOrg({
			details: newOrg,
			failHandler: (content) => {
				if (content.organisation)
					setErrorMessage(
						<>
							Organisation already registered. If this is a mistake, please
							<a href="https://createbase.co.nz/contact" title="https://createbase.co.nz/contact" target="_blank" className={classes.contact}>
								contact us
							</a>
						</>
					);
				setIsLoading(false);
			},
			successHandler: async () => {
				let org = await getOrgData();
				const educatorLink = await getEducatorLink();
				const learnerLink = await getLearnerLink();
				org = { ...org, educatorLink: educatorLink, learnerLink: learnerLink };
				setUser((state) => ({ ...state, type: "admin", org: org }));
				setIsLoading(false);
				ctx.setBell({
					type: "success",
					message: `Successfully created and joined ${org.name}`,
				});
			},
		});
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<p className={classes.instruction}>
				To register your organisation for the first time, enter its details below.
				<br />
				The ID and name must both match official records.
			</p>
			<Input
				className={classes.input}
				label="Organisation ID*"
				onFocus={() => setErrorMessage(false)}
				inputProps={{
					type: "number",
					...register("orgId", {
						required: "Please enter your organisation ID",
					}),
				}}
				error={errors.orgId || errorMessage}
			/>
			<Input
				className={classes.input}
				label="Organisation name*"
				onFocus={() => setErrorMessage(false)}
				inputProps={{
					type: "text",
					...register("orgName", {
						required: "Please enter your organisation name",
					}),
				}}
				error={errors.orgName || errorMessage}
			/>
			<div className={classes.errorMessage} style={{ opacity: errorMessage && 1 }}>
				{errorMessage}
			</div>
			<PrimaryButton
				className={classes.submit}
				isLoading={isLoading}
				type="submit"
				mainLabel="Register"
				iconRight={<i className={`material-icons-outlined ${classes.right}`}>arrow_forward</i>}
				loadingLabel="Registering ..."
			/>
		</form>
	);
};

const MyOrg = ({ user, setUser }) => {
	const ctx = useContext(InviteOrgContext);

	return (
		<div className={classes.myView}>
			<Head>
				<title>Organisation • {user.displayName} | CreateBase</title>
				<meta name="description" content="Join an organisation, register an organisation, or view your organisations here. CreateBase" />
			</Head>
			{!user.verified && (
				<div className={classes.section}>
					<h2>Organisation</h2>
					<div className={classes.instruction} style={{ marginTop: "1rem" }}>
						Your account must be verified before viewing, joining or registering your organistion.
					</div>
					<PrimaryButton
						className={classes.submit}
						mainLabel="Verify account"
						iconLeft={<i className={`material-icons-outlined ${classes.left}`}>how_to_reg</i>}
						onClick={() => router.replace("/user/my-account/verification")}
					/>
				</div>
			)}
			{user.verified && !user.org && (
				<div className={classes.section}>
					<h2>Join an organisation</h2>
					<JoinOrg setUser={setUser} />
				</div>
			)}
			{user.verified && !user.org && (
				<div className={classes.section}>
					<h2>Register an organisation</h2>
					<RegisterOrg setUser={setUser} />
				</div>
			)}
			{user.verified && user.org && (
				<div className={classes.section}>
					<h2>Your organisation</h2>
					<div className={`${classes.card} ${classes.orgCard}`}>
						<div className={classes.cardHeader}>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<h3>🎉 {user.org.name}</h3>
								<div className={classes.smallText}>
									{user.org.city}, {user.org.country}
								</div>
							</div>
							{user.type !== "learner" && <SecondaryButton className={classes.inviteBtn} mainLabel="Invite" title={`Invite people to ${user.org.name}`} onClick={() => ctx.setShow(true)} />}
						</div>
						<div className={classes.cardContent} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
							<div className={classes.orgContent}>
								{user.type === "admin" && (
									<div className={classes.mediumText}>
										<i className="material-icons-outlined">verified_user</i>
										{user.org.admins || "No"} admin{(user.org.admins > 1 || user.org.admins === 0) && "s"}
									</div>
								)}
								{user.type !== "educator" && (
									<div className={classes.mediumText}>
										<i className="material-icons-outlined">school</i>
										{user.org.educators || "No"} educator{(user.org.educators > 1 || user.org.educators === 0) && "s"}
									</div>
								)}
								<div className={classes.mediumText}>
									<i className="material-icons-outlined">backpack</i>
									{user.org.learners || "No"} learner{(user.org.learners > 1 || user.org.learners === 0) && "s"}
								</div>
							</div>
							<div style={{ height: 150, width: 250 }}>
								<Img src={"/my-account/org.svg"} layout="fill" />
							</div>
						</div>
					</div>
					{(user.type === "admin" || user.type === "educator") && (
						<div className={`${classes.card} ${classes.orgDetails}`}>
							<div className={classes.mediumText}>
								<span>ID:</span> <span>{user.org.id}</span>
							</div>
							<div className={classes.mediumText}>
								<span>Name:</span> <span>{user.org.name}</span>
							</div>
							<div className={classes.mediumText}>
								<span>Educator code:</span> <span>{user.org.educatorLink.split("__").slice(-1)}</span>
							</div>
							<div className={classes.mediumText}>
								<span>Learner code:</span> <span>{user.org.learnerLink.split("__").slice(-1)}</span>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default MyOrg;
