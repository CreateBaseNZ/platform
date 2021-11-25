import { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import useHandleResponse from "../../hooks/useHandleResponse";
import GlobalSessionContext from "../../store/global-session-context";
import Input from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import { SecondaryButton } from "../../components/UI/Buttons";
import DuplicateWarning from "../../components/MyGroups/DuplicateWarning";

import classes from "/styles/myGroups.module.scss";

const NewSchool = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
	const [duplicateParams, setDuplicateParams] = useState();
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { handleResponse } = useHandleResponse();
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	const onSubmit = async (inputs) => {
		setIsLoading(true);
		const details = {
			profileId: globalSession.profileId,
			alias: `${globalSession.firstName} ${globalSession.lastName}`,
			bypassDuplicate: false,
			name: inputs.name,
			address: inputs.address,
			city: inputs.city,
			country: inputs.country,
			date: new Date().toString(),
		};
		const DUMMY_STATUS = "duplicate";
		let data;
		try {
			data = (await axios.post("/api/groups/register-school", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: async () => {
					if (data.content === "duplicate") {
						let _data;
						try {
							_data = (await axios.post("/api/groups/query", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { query: details.name }, status: DUMMY_STATUS }))["data"];
						} catch (error) {
							_data.status = "error";
						} finally {
							handleResponse({
								_data,
								failHandler: () => {},
								successHandler: () => {
									setDuplicateParams({ details: details, otherGroups: _data.content.filter((group) => group.country === details.country) });
									setShowDuplicateWarning(true);
								},
							});
						}
					}
					setIsLoading(false);
				},
				successHandler: () => {
					setGlobalSession((state) => ({ ...state, groups: [...state.groups, data.content] }));
					setHasSubmitted(true);
					setIsLoading(false);
					reset();
				},
			});
		}
	};

	return (
		<div className={classes.view}>
			<Head>
				<title>Register a School | CreateBase</title>
				<meta name="description" content="Register your school as a group on CreateBase" />
			</Head>
			<Link href="/my-groups">
				<button className={classes.backBtn}>
					<i className="material-icons-outlined">chevron_left</i>Back
				</button>
			</Link>
			<div className={`${classes.container} roundScrollbar`}>
				<div className={`${classes.wrapper} ${classes.formWrapper}`}>
					<div className={classes.h2Container}>
						<h2>Register a school</h2>
					</div>
					{hasSubmitted ? (
						<div className={classes.hasSubmitted}>
							<div className={classes.successMessage}>
								<i className="material-icons-outlined">check_circle</i>
							</div>
							<div className={classes.successMessage}>
								Your registration has been successfully submitted, please allow up to 24 hours for us to process it. We will contact you using the email registered with this account.
							</div>
							<SecondaryButton className={classes.joinAnotherBtn} mainLabel="Register another school" onClick={() => setHasSubmitted(false)} />
						</div>
					) : (
						<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
							<Input
								className={classes.input}
								label="School name*"
								labelProps={{ className: classes.inputLabel }}
								inputProps={{ placeholder: "School name", type: "text", maxLength: 254, ...register("name", { required: "Please enter your school's name" }) }}
								error={errors.name}
							/>
							<Input
								className={classes.input}
								label="Address*"
								labelProps={{ className: classes.inputLabel }}
								inputProps={{ placeholder: "Address", type: "text", maxLength: 254, ...register("address", { required: "Please enter your school's address" }) }}
								error={errors.address}
							/>
							<Input
								className={classes.input}
								label="City/State*"
								labelProps={{ className: classes.inputLabel }}
								inputProps={{ placeholder: "City/State", type: "text", maxLength: 254, ...register("city", { required: "Please enter your school's city/state" }) }}
								error={errors.city}
							/>
							<Input
								className={classes.input}
								label="Country*"
								labelProps={{ className: classes.inputLabel }}
								inputProps={{ placeholder: "Country", type: "text", maxLength: 254, ...register("country", { required: "Please enter your school's country" }) }}
								error={errors.country}
							/>
							<div className={classes.caption}>The email registered with your account will be the primary point of contact. Please allow up to 24 hours for us to be verify your registration.</div>
							<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Registering ..." mainLabel="Register" />
						</form>
					)}
				</div>
			</div>
			{showDuplicateWarning && <DuplicateWarning setShow={setShowDuplicateWarning} duplicateParams={duplicateParams} reset={reset} />}
		</div>
	);
};

NewSchool.getLayout = (page) => {
	return <MainLayout page="my-groups">{page}</MainLayout>;
};

NewSchool.auth = "user";

export default NewSchool;
