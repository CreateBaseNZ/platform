import { useCallback, useContext, useState } from "react";
import _debounce from "lodash/debounce";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import VisualBellContext from "../../store/visual-bell-context";
import GlobalSessionContext from "../../store/global-session-context";
import { SearchBar, TextArea } from "../../components/UI/Input";
import { PrimaryButton, SecondaryButton } from "../../components/UI/Buttons";

import classes from "../../styles/myGroups.module.scss";

const JoinSchoolTeacher = () => {
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const [isLoading, setIsLoading] = useState(false);
	const [hasRequested, setHasRequested] = useState(false);
	const [queryDropdown, setQueryDropdown] = useState({ show: false, groups: null, selectedId: "" });
	const { setVisualBell } = useContext(VisualBellContext);
	const { post } = useApi();
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		reset,
		clearErrors,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	const debounceFn = useCallback(_debounce(handleDebounceFn, 200), []);

	async function handleDebounceFn(value) {
		await post({
			route: "/api/groups/query",
			input: { query: value },
			successHandler: (data) => setQueryDropdown((state) => ({ ...state, show: true, groups: data.content, selectedId: "" })),
		});
	}

	const onSearch = (e) => {
		if (e.target.value) {
			clearErrors();
			debounceFn(e.target.value);
		} else {
			setQueryDropdown((state) => ({ ...state, groups: null, show: false, selectedId: "" }));
		}
	};

	const focusHandler = () => setQueryDropdown((state) => ({ ...state, show: true }));

	const blurHandler = () => setQueryDropdown((state) => ({ ...state, show: false }));

	const selectGroupHandler = (group) => {
		setValue("name", group.name);
		setQueryDropdown((state) => ({ ...state, show: false, selectedId: group.id }));
	};

	const onTeacherSubmit = async (inputValues) => {
		setIsLoading(true);
		await post({
			route: "/api/groups/join-school-teacher",
			input: {
				profileId: globalSession.profileId,
				schoolId: queryDropdown.selectedId,
				alias: `${globalSession.firstName} ${globalSession.lastName}`,
				message: inputValues.message,
				date: new Date().toString(),
			},
			failHandler: (data) => {
				if (data.content === "already joined") {
					setError("name", {
						type: "manual",
						message: "You are already in this school",
					});
					setQueryDropdown({ show: false, groups: null, selectedId: "" });
					setIsLoading(false);
				} else if (data.content === "already requested") {
					setError("name", {
						type: "manual",
						message: "You have already sent a request to join this school",
					});
					setQueryDropdown({ show: false, groups: null, selectedId: "" });
					setIsLoading(false);
				}
			},
			successHandler: (data) => {
				setGlobalSession((state) => ({ ...state, groups: [...state.groups, data.content] }));
				setVisualBell({ type: "success", message: "Your request has been sent" });
				setHasRequested(true);
				reset();
				setQueryDropdown({ show: false, groups: null, selectedId: "" });
				setIsLoading(false);
			},
		});
	};

	return hasRequested ? (
		<div>
			<div className={classes.successMessage}>
				<i className="material-icons">check_circle</i>Your request has been sent
			</div>
			<SecondaryButton className={classes.joinAnotherBtn} mainLabel="Join another school" onClick={() => setHasRequested(false)} />
		</div>
	) : (
		<form className={classes.form} onSubmit={handleSubmit(onTeacherSubmit)}>
			<div tabIndex={-1} className={classes.queryWrapper} onFocus={focusHandler} onBlur={blurHandler}>
				<SearchBar
					className={`${classes.input} ${queryDropdown.selectedId ? classes.validInput : ""}`}
					label="School name*"
					labelProps={{ className: classes.inputLabel }}
					inputProps={{
						placeholder: "Search for your school",
						type: "text",
						maxLength: 254,
						...register("name", { required: "Please select a school" }),
						onChange: onSearch,
						autoComplete: "off",
					}}
					error={errors.name}
				/>
				{queryDropdown.selectedId && <i className={`material-icons-outlined ${classes.validTick}`}>check_circle</i>}
				{queryDropdown.show && queryDropdown.groups && (
					<div className={classes.queryDropdown}>
						{queryDropdown.groups.length ? (
							queryDropdown.groups.map((group) => (
								<div key={group.id} className={classes.queryItem} onMouseDown={() => selectGroupHandler(group)}>
									{group.name}
									<div className={classes.groupLocation}>
										{group.location.cityState}, {group.location.country}
									</div>
								</div>
							))
						) : (
							<div className={classes.queryItem} style={{ pointerEvents: "none", opacity: 0.5 }}>
								No results found
							</div>
						)}
					</div>
				)}
			</div>
			{queryDropdown.selectedId && (
				<TextArea
					className={classes.input}
					label="Message"
					labelProps={{ className: classes.inputLabel }}
					inputProps={{
						placeholder: "Send a message with your join request",
						type: "text",
						maxLength: 500,
						...register("message", { maxLength: { value: 500, message: "Exceeded 500 character limit" } }),
					}}
					error={errors.message}
				/>
			)}
			{queryDropdown.selectedId && <PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Sending request ..." mainLabel="Request to join" />}
		</form>
	);
};

export default JoinSchoolTeacher;
