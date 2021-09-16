import { useContext, useEffect, useRef, useState } from "react";
import InviteOrgContext from "../../store/invite-org-context";
import VisualBellContext from "../../store/visual-bell-context";
import { PrimaryButton, TertiaryButton } from "../UI/Buttons";
import { emailPattern } from "../../utils/formValidation";
import useOrganisationHelper from "../../hooks/useOrganisationHelper";

import classes from "./InviteOrgModal.module.scss";

const InviteOrgModal = ({ user }) => {
	const emailRef = useRef();
	const inviteCtx = useContext(InviteOrgContext);
	const vbCtx = useContext(VisualBellContext);
	const { getEducatorLink, getLearnerLink, sendEmailInvitation } = useOrganisationHelper(vbCtx);
	const [links, setLinks] = useState({ educator: "", learner: "" });

	const [activeTab, setActiveTab] = useState("learner");
	const [isLoading, setIsLoading] = useState(false);
	const [emailInput, setEmailInput] = useState("");
	const [emailList, setEmailList] = useState([]);
	const [validEmails, setValidEmails] = useState([]);
	const [error, setError] = useState();
	const [linkCopied, setLinkCopied] = useState(false);

	useEffect(async () => {
		const educatorLink = await getEducatorLink();
		const learnerLink = await getLearnerLink();
		setLinks({ educator: educatorLink, learner: learnerLink });
	}, []);

	useEffect(() => {
		const valids = emailList.filter((e) => e.valid === true);
		if (emailList.length - valids.length) {
			setError("Please remove invalid emails");
		} else {
			setError();
		}
		setValidEmails(valids);
	}, [emailList]);

	const keyDownHandler = (e) => {
		if (e.key === "Backspace" && !emailInput) {
			setEmailList((state) => state.slice(0, state.length - 1));
		} else if (e.key === "Enter" && emailInput) {
			const valid = emailPattern.value.test(emailInput);
			setEmailList((state) => [...state, { valid: valid, value: emailInput }]);
			setEmailInput("");
		}
	};

	const changeHandler = (e) => {
		let value = e.target.value.trim();
		if (/\s$/.test(e.target.value) && value) {
			const valid = emailPattern.value.test(value);
			setEmailList((state) => [...state, { valid: valid, value: value }]);
			setEmailInput("");
		} else {
			setEmailInput(e.target.value);
		}
	};

	const removeHandler = (ind) => setEmailList((state) => state.filter((_, i) => i !== ind));

	const sendEmailHandler = () => {
		setIsLoading(true);
		if (emailList.length - validEmails.length) {
			vbCtx.setBell({ type: "error", message: "Invitations not sent" });
			return setIsLoading(false);
		}
		if (!validEmails.length) {
			setError("Please enter at least one valid email");
			return setIsLoading(false);
		}
		console.log(validEmails);
		sendEmailInvitation({
			details: { emails: validEmails.map((e) => e.value) },
			successHandler: () => {
				vbCtx.setBell({ type: "success", message: `Invitation${validEmails.length === 1 ? "" : "s"} sent to ${validEmails.length} educator${validEmails.length === 1 ? "" : "s"}` });
				setEmailList([]);
				setIsLoading(false);
			},
		});
	};

	const copyLink = () => {
		navigator.clipboard.writeText(links[activeTab]);
		setLinkCopied(true);
		setTimeout(() => setLinkCopied(false), [500]);
		vbCtx.setBell({ type: "success", message: "Link copied to clipboard" });
	};

	return (
		<div className={classes.overlay}>
			<div className={`${classes.modal} roundScrollbar`}>
				<i className={`material-icons-outlined ${classes.close}`} title="Close" onClick={() => inviteCtx.setShow(false)}>
					close
				</i>
				<div className={classes.header}>Invite people to {user.org.name}</div>
				<div className={classes.tabContainer}>
					<button className={activeTab === "learner" ? classes.active : ""} onClick={() => setActiveTab("learner")}>
						Learner
					</button>
					<button className={activeTab === "educator" ? classes.active : ""} onClick={() => setActiveTab("educator")}>
						Educator
					</button>
				</div>
				<div className={classes.divider} />
				<div className={`${classes.section} ${activeTab === "learner" ? classes.hide : classes.show}`}>
					<div className={classes.sectionHeader}>
						<i className="material-icons-outlined">forward_to_inbox</i>
						Invite with email
					</div>
					<div className={`${classes.textarea} roundScrollbar`} onClick={() => emailRef.current.focus()}>
						{emailList.map((email, i) => (
							<button
								key={i}
								className={`${classes.emailTag} ${email.valid ? "" : classes.invalid}`}
								onClick={removeHandler.bind(this, i)}
								title={email.valid ? "Click to remove" : "Invalid email, click to remove"}>
								{email.value}
								<i className="material-icons-outlined">close</i>
							</button>
						))}
						<input
							ref={emailRef}
							className={classes.emailInput}
							placeholder="Emails must be followed by a space or pressing Enter"
							onChange={changeHandler}
							onKeyDown={keyDownHandler}
							type="text"
							maxLength={254}
							value={emailInput}
						/>
					</div>
					<div className={classes.btnContainer}>
						<p className={classes.errorMessage}>{error}</p>
						<PrimaryButton
							className={classes.emailBtn}
							isLoading={isLoading}
							isDisabled={!validEmails.length}
							loadingLabel={"Sending ..."}
							onClick={sendEmailHandler}
							mainLabel={`Invite ${validEmails.length ? validEmails.length : ""} educator${validEmails.length === 1 ? "" : "s"}`}
							title={validEmails.length ? `Send ${validEmails.length} email${validEmails.length === 1 ? "" : "s"}` : "No emails to send"}
							iconRight={<i className="material-icons-outlined">send</i>}
						/>
					</div>
				</div>
				{<div className={`${classes.divider} ${activeTab === "learner" ? classes.hide : ""}`} />}
				<div className={classes.section}>
					<div className={classes.sectionHeader}>
						<i className="material-icons-outlined">link</i>
						Invite with link
					</div>
					<div className={classes.inputWrapper}>
						<i className={`material-icons ${classes.lock}`} style={{ color: !links[activeTab] && "grey" }}>
							{links[activeTab] ? "lock" : "more_horiz"}
						</i>
						<input className={`${classes.link} ${linkCopied ? classes.copied : ""}`} placeholder="Loading ..." value={links[activeTab]} readOnly />
						<TertiaryButton className={classes.copyBtn} mainLabel="Copy link" iconLeft={<i className="material-icons-outlined">content_copy</i>} onClick={copyLink} title="Copy link to clipboard" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default InviteOrgModal;
