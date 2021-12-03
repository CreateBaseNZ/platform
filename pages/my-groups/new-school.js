import { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import GlobalSessionContext from "../../store/global-session-context";
import VisualBellContext from "../../store/visual-bell-context";
import Input, { SearchBar } from "../../components/UI/Input";
import { PrimaryButton } from "../../components/UI/Buttons";
import MainLayout from "../../components/Layouts/MainLayout/MainLayout";
import { SecondaryButton } from "../../components/UI/Buttons";
import DuplicateWarning from "../../components/MyGroups/DuplicateWarning";
import COUNTRIES from "../../constants/countries";

import classes from "../../styles/myGroups.module.scss";
import { schoolNameMaxLength, schoolNameMinLength } from "../../utils/formValidation";

const NewSchool = () => {
	const { post } = useApi();
	const [isLoading, setIsLoading] = useState(false);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
	const [showCountries, setShowCountries] = useState(false);
	const [duplicateParams, setDuplicateParams] = useState();
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { setVisualBell } = useContext(VisualBellContext);
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		clearErrors,
		setError,
		formState: { errors },
	} = useForm({ mode: "onTouched" });
	const countrySearchValue = watch("country");

	const renderDropdown = (value) => {
		const results = COUNTRIES.filter((country) => country.name.toLowerCase().includes(value.toLowerCase()));

		return (
			<div className={`${classes.countryDropdown} roundScrollbar`}>
				{results.length ? (
					results.map((country) => (
						<div className={classes.countryItem} key={country.code} onMouseDown={() => selectHandler(country.name)}>
							<span>{country.code.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()))}</span> {country.name}
						</div>
					))
				) : (
					<div className={`${classes.countryItem} ${classes.noResult}`}>No results found</div>
				)}
			</div>
		);
	};

	const selectHandler = (value) => {
		setValue("country", value);
		clearErrors("country");
		setShowCountries(false);
	};

	const onSubmit = async (inputs) => {
		setIsLoading(true);
		const country = COUNTRIES.find((_country) => _country.name.toLowerCase() === inputs.country.toLowerCase())?.name;
		if (!country) {
			setError("country", {
				type: "manual",
				message: "Please select a country",
			});
			return setIsLoading(false);
		}
		const details = {
			profileId: globalSession.profileId,
			alias: `${globalSession.firstName} ${globalSession.lastName}`,
			bypassDuplicate: false,
			name: inputs.name,
			address: inputs.address,
			city: inputs.city,
			country: country,
			date: new Date().toString(),
		};
		await post({
			route: "/api/groups/query",
			input: { query: details.name },
			successHandler: async (data) => {
				const otherGroups = data.content.filter((group) => group.location.country.toLowerCase() === details.country.toLowerCase());
				setDuplicateParams({ details, otherGroups });
				if (otherGroups.length) {
					setShowDuplicateWarning(true);
					return setIsLoading(false);
				}
				await post({
					route: "/api/groups/register-school",
					input: details,
					successHandler: (data) => {
						setGlobalSession((state) => ({ ...state, groups: [...state.groups, data.content] }));
						setVisualBell({ type: "success", message: "Your registration has been submitted for verification" });
						router.push("/my-groups");
					},
				});
			},
		});
	};

	return (
		<div className={`${classes.view} ${classes.newSchool}`}>
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
								inputProps={{
									placeholder: "School name",
									type: "text",
									maxLength: 254,
									...register("name", {
										required: "Please enter your school's name",
										minLength: schoolNameMinLength,
										maxLength: schoolNameMaxLength,
									}),
								}}
								error={errors.name}
							/>
							<Input
								className={classes.input}
								label="Address*"
								labelProps={{ className: classes.inputLabel }}
								inputProps={{
									placeholder: "Address",
									type: "text",
									maxLength: 254,
									...register("address", {
										required: "Please enter your school's address",
										minLength: 10,
										maxLength: 254,
									}),
								}}
								error={errors.address}
							/>
							<Input
								className={classes.input}
								label="City/State*"
								labelProps={{ className: classes.inputLabel }}
								inputProps={{
									placeholder: "City/State",
									type: "text",
									maxLength: 254,
									...register("city", {
										required: "Please enter your school's city/state",
										minLength: 1,
										maxLength: 254,
									}),
								}}
								error={errors.city}
							/>
							<div tabIndex={-1} className={classes.countryDropdownContainer} onFocus={() => setShowCountries(true)} onBlur={() => setShowCountries(false)}>
								<SearchBar
									className={classes.input}
									label="Country*"
									labelProps={{ className: classes.inputLabel }}
									inputProps={{
										placeholder: "Please select a country",
										type: "text",
										maxLength: 254,
										...register("country", { required: "Please select a country", maxLength: 254 }),
										autoComplete: "off",
									}}
									error={errors.country}
								/>
								{showCountries && renderDropdown(countrySearchValue)}
							</div>
							<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Registering ..." mainLabel="Register" />
							<div className={classes.newSchoolCaption}>
								The email registered with your account will be the primary point of contact. Please allow up to 24 hours for us to be verify your registration.
							</div>
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
