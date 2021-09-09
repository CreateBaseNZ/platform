import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../UI/Buttons";
import Input from "../UI/Input";

import VisualBellContext from "../../store/visual-bell-context";
import { querySchoolAPI } from "../../utils/formValidation";

import classes from "./OrgForm.module.scss";
import useOrganisationHelper from "../../hooks/useOrganisationHelper";

const JoinOrgForm = ({ resetCta, setUser, ctx }) => {
	const { getOrgData, joinOrgEducator } = useOrganisationHelper({ ...ctx });
	const [isLoading, setIsLoading] = useState(false);
	const [invalidDetails, setInvalidDetails] = useState(false);
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
					setInvalidDetails("Incorrect organisation details");
				}
				setIsLoading(false);
			},
			successHandler: async () => {
				const org = await getOrgData();
				setUser((state) => ({ ...state, org: org }));
				setIsLoading(false);
				resetCta();
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
				onFocus={() => setInvalidDetails(false)}
				inputProps={{
					className: classes.joinInput,
					type: "text",
					maxLength: 254,
					placeholder: "Organisation code*",
					...register("orgCode", {
						required: "Please enter an organisation code",
					}),
				}}
				error={errors.orgCode}
			/>
			<Input
				className={classes.input}
				onFocus={() => setInvalidDetails(false)}
				inputProps={{
					className: classes.joinInput,
					type: "number",
					maxLength: 254,
					placeholder: "School ID*",
					...register("orgId", {
						required: "Please enter the organisation ID",
					}),
				}}
				error={errors.orgId || invalidDetails}
			/>
			<Input
				className={classes.input}
				onFocus={() => setInvalidDetails(false)}
				inputProps={{
					className: classes.joinInput,
					type: "text",
					maxLength: 254,
					placeholder: "School Name*",
					...register("orgName", {
						required: "Please enter the organisation name",
					}),
				}}
				error={errors.orgName || invalidDetails}
			/>
			<PrimaryButton className={classes.joinBtn} isLoading={isLoading} type="submit" mainLabel="Join" />
			{invalidDetails && <div className={classes.invalidCode}>The details you entered are invalid</div>}
		</form>
	);
};

const CreateOrgForm = ({ resetCta, setUser, ctx }) => {
	const { getOrgData, createOrg } = useOrganisationHelper({ ...ctx });
	const [isLoading, setIsLoading] = useState(false);
	const [invalidId, setInvalidId] = useState(false);
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
			setInvalidId("An unexpected error occurred - please try again");
			return setIsLoading(false);
		}
		if (govData.result.records.length === 0) {
			setInvalidId("Incorrect details - make sure they match official records");
			return setIsLoading(false);
		}
		if (govData.result.records.length > 1) {
			setInvalidId("Error - more than one result was found");
			return setIsLoading(false);
		}
		if (govData.result.records[0].School_Id.toString() !== input.orgId || govData.result.records[0].Org_Name.toLowerCase() !== input.orgName.toLowerCase()) {
			setInvalidId("Incorrect details - make sure they match official records");
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
					setInvalidId(
						<>
							This organisation has already registered. If this is a mistake, please
							<a href="https://createbase.co.nz/contact" title="https://createbase.co.nz/contact" target="_blank" className={classes.contact}>
								contact us
							</a>
						</>
					);
				setIsLoading(false);
			},
			successHandler: async () => {
				const org = await getOrgData();
				setUser((state) => ({ ...state, type: "admin", org: org }));
				setIsLoading(false);
				resetCta();
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
			<PrimaryButton className={classes.createBtn} isLoading={isLoading} type="submit" mainLabel="Create Organisation" />
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
