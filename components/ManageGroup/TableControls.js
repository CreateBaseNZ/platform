import { useRef, useState } from "react";
import { PasswordInput } from "../UI/Input";
import { passwordMinLength, passwordValidate } from "../../utils/formValidation";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/Buttons";
import classes from "./TableControls.module.scss";

const MainButtons = ({ isChecked, tab, tabs, setTab, setShowChangePassword }) => {
	return (
		<div className={classes.mainBtnContainer}>
			{!isChecked[tab] && (
				<>
					{tabs.map((t) => (
						<button key={t.label} className={`${classes.tab} ${tab === t.label ? classes.active : ""}`} onClick={() => setTab(t.label)}>
							<i className="material-icons-outlined">{t.icon}</i> {t.label}
							<div className={classes.title}>View {t.label}</div>
						</button>
					))}
				</>
			)}
			{isChecked[tab] > 0 && (
				<>
					<div className={classes.nSelected}>{isChecked[tab]} selected</div>
					<div className={classes.actions}>
						{tab === "learners" && (
							<button onClick={() => setShowChangePassword(true)}>
								<i className="material-icons-outlined">password</i>
								<div className={classes.title}>Change password</div>
							</button>
						)}
						{/* {tab === "educators" && (
        <button>
          <i className="material-icons-outlined">add_moderator</i>
          <div className={classes.title}>Promote to Admin</div>
        </button>
      )}
      {tab === "admins" && (
        <button>
          <i className="material-icons-outlined">remove_moderator</i>
          <div className={classes.title}>Demote Admin</div>
        </button>
      )} */}
						{/* <button onClick={() => setShowRemoveConfirm(true)}>
        <i className="material-icons-outlined">person_remove</i>
        <div className={classes.title}>Remove from org</div>
      </button> */}
					</div>
				</>
			)}
		</div>
	);
};

const OtherButtons = ({ search, searchHandler, collapseHeader, setCollapseHeader }) => {
	return (
		<div className={classes.otherBtnContainer}>
			<div className={classes.search}>
				<input placeholder="Search" value={search} onChange={searchHandler} />
				<i className="material-icons-outlined">search</i>
				{/* <div className={classes.title}>Search by date using the YYYY-MM-DD format</div> */}
			</div>
			<button className={classes.toggleHeader} onClick={() => setCollapseHeader((state) => !state)} title="Expand table view">
				<span>{collapseHeader ? "Collapse" : "Expand"}</span>
				<i className="material-icons-outlined" style={{ transform: collapseHeader && "rotate(180deg)" }}>
					expand_less
				</i>
			</button>
		</div>
	);
};

const ChangePassword = ({ changePasswordHandler, isChecked, tab, setShowChangePassword }) => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onTouched" });

	const onSubmit = (input) => {
		setIsLoading(true);
		changePasswordHandler(input);
	};

	return (
		<form className={classes.changePassword} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.nSelected}>{isChecked[tab]} selected</div>
			<PasswordInput
				className={classes.inputWrapper}
				inputProps={{
					className: classes.input,
					placeholder: "New password*",
					...register("password", {
						required: "Please enter a new password",
						minLength: passwordMinLength,
						validate: passwordValidate,
					}),
				}}
				error={errors.password}
			/>
			<PrimaryButton className={classes.submit} isLoading={isLoading} type="submit" loadingLabel="Saving ..." mainLabel="Change password" />
			<TertiaryButton mainLabel="Cancel" className={classes.cancel} onClick={() => setShowChangePassword(false)} />
		</form>
	);
};

const RemoveConfirm = ({ isChecked, tab, setShowRemoveConfirm, removeUserHandler }) => {
	return (
		<div className={classes.removeConfirm}>
			Are you sure you want to remove {isChecked[tab]} {isChecked[tab] === 1 ? tab.slice(0, -1) : tab} from your organisation?
			<button className={classes.cancelBtn} onClick={() => setShowRemoveConfirm(false)}>
				Cancel
			</button>
			<button className={classes.confirmBtn} onClick={removeUserHandler}>
				Yes, remove
			</button>
		</div>
	);
};

const TableControls = ({
	isChecked,
	tab,
	setTab,
	tabs,
	allUsers,
	collapseHeader,
	setCollapseHeader,
	search,
	searchHandler,
	removeUserHandler,
	showRemoveConfirm,
	setShowRemoveConfirm,
	showChangePassword,
	setShowChangePassword,
	changePasswordHandler,
}) => {
	let show = "default";
	if (showRemoveConfirm) {
		show = "remove";
	} else if (showChangePassword) {
		show = "password";
	}

	return (
		<div className={classes.controls}>
			{show === "default" && <MainButtons isChecked={isChecked} tab={tab} tabs={tabs} setTab={setTab} setShowChangePassword={setShowChangePassword} />}
			{show === "default" && <OtherButtons search={search} searchHandler={searchHandler} collapseHeader={collapseHeader} setCollapseHeader={setCollapseHeader} />}
			{show === "password" && <ChangePassword changePasswordHandler={changePasswordHandler} isChecked={isChecked} tab={tab} setShowChangePassword={setShowChangePassword} />}
			{show === "remove" && <RemoveConfirm isChecked={isChecked} tab={tab} setShowRemoveConfirm={setShowRemoveConfirm} removeUserHandler={removeUserHandler} />}
		</div>
	);
};

export default TableControls;
