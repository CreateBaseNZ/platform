import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import InviteOrgContext from "../../store/invite-org-context";
import VisualBellContext from "../../store/visual-bell-context";

const Invite = () => {
	const router = useRouter();
	const inviteCtx = useContext(InviteOrgContext);
	const vbCtx = useContext(VisualBellContext);

	useEffect(() => {
		console.log(router.query);
		if (router.query && router.query.invite) {
			if (!router.query.invite[0] || !router.query.invite[0]) {
				router.replace("/browse");

				return null;
			}
			const type = router.query.invite[0];
			const details = router.query.invite[1].split("-");
		}
	}, [router.query]);

	return null;
};

export default Invite;
