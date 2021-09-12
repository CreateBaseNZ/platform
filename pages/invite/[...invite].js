import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import InviteOrgContext from "../../store/invite-org-context";

const Invite = () => {
	const router = useRouter();
	const ctx = useContext(InviteOrgContext);

	useEffect(() => {
		console.log(router.query);
		if (router.query && router.query.invite) {
			const type = router.query.invite[0];
			const detais = router.query.invite[1].split("-");
		}
	}, [router.query]);

	return null;
};

export default Invite;
