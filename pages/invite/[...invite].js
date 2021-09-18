import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useSession } from "next-auth/client";
import useOrganisationHelper from "../../hooks/useOrganisationHelper";
import InviteOrgContext from "../../store/invite-org-context";
import VisualBellContext from "../../store/visual-bell-context";

const Invite = () => {
	const router = useRouter();
	const inviteCtx = useContext(InviteOrgContext);
	const vbCtx = useContext(VisualBellContext);
	const [session, loading] = useSession();
	const { acceptEmailInvitation, joinOrgEducator } = useOrganisationHelper(vbCtx);

	useEffect(async () => {
		if (!loading && router.query && router.query.invite) {
			if (!router.query.invite[0] || !router.query.invite[1]) {
				router.replace("/home");
				vbCtx.setBell({ type: "error", message: "Invalid invitation" });
				return null;
			}
			const type = router.query.invite[0];
			const details = router.query.invite[1].split("__");
			if (type === "educator") {
				if (details[4]) {
					// registered educator via email
					acceptEmailInvitation({
						details: { email: details[0], orgId: details[1], orgName: details[2].replaceAll("-", " "), eduCode: details[3], invCode: details[4] },
						failHandler: (content) => {
							if (content.account === "incorrect logged in user") {
								vbCtx.setBell({ type: "error", message: "Failed to join - please log out first, then try the link agin" });
								router.replace("/home");
							} else if (content.account === "already in an organisation") {
								vbCtx.setBell({ type: "error", message: "Failed to join - you are already in another organisation" });
								router.replace("/home");
							}
						},
						successHandler: () => {
							if (session) {
								router.replace("/home");
								vbCtx.setBell({ type: "success", message: `Successfully joined ${details[2].replaceAll("-", " ")}` });
							} else {
								router.replace("/auth/login");
								vbCtx.setBell({ type: "success", message: `Successfully joined ${details[2].replaceAll("-", " ")}, log in to continue` });
							}
						},
					});
				} else if (details[3]) {
					// unregistered educator via email
					if (session) {
						// unregistered educator already logged in
						router.replace("/home");
						vbCtx.setBell({ type: "warning", message: "Please log out first, then try the link again" });
						return null;
					} else {
						// unregistered educator not logged in
						router.replace("/auth/signup");
						inviteCtx.setDetails({ isInvited: true, type: type, email: details[0], orgId: details[1], orgName: details[2].replaceAll("-", " "), orgCode: details[3] });
						vbCtx.setBell({ type: "warning", message: `Sign up to join ${details[2].replaceAll("-", " ")}` });
						return null;
					}
				} else if (details[2]) {
					// educator via link
					if (session) {
						// educator via link and logged in as learner
						if (session.user.access === "learner") {
							vbCtx.setBell({ type: "warning", message: "Error - you must be an educator to use this code" });
							router.replace("/home");
							return null;
						} else {
							// educator via link and logged in as educator
							await joinOrgEducator({
								details: { metadata: { id: details[0] }, name: details[1].replaceAll("-", " "), code: details[2], type: "school", country: "New Zealand" },
								failHandler: (content) => {
									if (content.account) {
										vbCtx.setBell({ type: "error", message: "Failed to join - you are already in another organisation" });
									} else if (content.code) {
										vbCtx.setBell({ type: "error", message: "Failed to join - invalid code" });
									} else if (content.organisation) {
										vbCtx.setBell({ type: "error", message: "Failed to join - incorrect organisation details" });
									}
								},
								successHandler: async () => {
									vbCtx.setBell({
										type: "success",
										message: `Successfully joined ${details[1].replaceAll("-", " ")}`,
									});
								},
							});
							router.replace("/home");
							return null;
						}
					} else {
						// educator via link and not logged in
						vbCtx.setBell({ type: "warning", message: "Please log in or sign up, then try the link again" });
						router.replace("/auth");
						return null;
					}
				} else {
					router.replace("/home");
					return null;
				}
			} else if (type === "learner") {
				// learner
				if (details[2]) {
					if (session) {
						if (session.user.access === "learner") {
							// already logged in as leaner
							vbCtx.setBell({ type: "warning", message: "You are already in another organisation" });
							router.replace("/home");
							return null;
						} else {
							// already logged in as educator
							vbCtx.setBell({ type: "warning", message: "Error - you need an educator code to join" });
							router.replace("/home");
							return null;
						}
					} else {
						// not logged in
						inviteCtx.setDetails({ isInvited: true, type: type, orgId: details[0], orgName: details[1].replaceAll("-", " "), orgCode: details[2] });
						router.replace("/auth/signup");
						vbCtx.setBell({ type: "warning", message: `Sign up to join ${details[1].replaceAll("-", " ")}` });
						return null;
					}
				} else {
					router.replace("/home");
					return null;
				}
			} else {
				router.replace("/home");
				return null;
			}
		}
	}, [router.query, loading]);

	return null;
};

export default Invite;
