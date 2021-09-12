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
	const { acceptEmailInvitation } = useOrganisationHelper(vbCtx);

	useEffect(() => {
		console.log(router.query);
		if (!loading && router.query && router.query.invite) {
			if (!router.query.invite[0] || !router.query.invite[1]) {
				router.replace("/browse");
				vbCtx.setBell({ type: "neutral", message: "Invalid invitation" });
				return null;
			}
			const type = router.query.invite[0];
			const details = router.query.invite[1].split("__");
			if (type === "educator") {
				if (details[4]) {
					// registered
					acceptEmailInvitation({
						details: { email: details[0], orgId: details[1], orgName: details[2], eduCode: details[3], invCode: details[4] },
						failHandler: (content) => {
							if (content.account) {
								vbCtx.setBell({ type: "fail", message: "Failed to join - you are already in another organisation" });
								router.replace("/onboarding");
							}
						},
						successHandler: () => {
							vbCtx.setBell({ type: "success", message: `Successfully joined ${details.orgName}` });
							router.replace("/onboarding");
						},
					});
				} else {
					// not registered
					inviteCtx.setDetails({ type: type, email: details[0], org: { orgId: details[1], orgCode: details[2].replace("-", " "), orgCode: details[3] } });
					router.replace("/auth/signup");
				}
			} else {
				inviteCtx.setDetails({ type: type, org: { orgId: details[0], orgCode: details[1].replace("-", " "), orgCode: details[2] } });
			}
			router.replace("/auth/");
			return null;
		}
	}, [router.query, loading]);

	return null;
};

export default Invite;
