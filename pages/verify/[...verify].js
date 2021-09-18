import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useAuthHelper from "../../hooks/useAuthHelper";
import VisualBellContext from "../../store/visual-bell-context";

const Verify = () => {
	const router = useRouter();
	const [session, loading] = useSession();
	const ctx = useContext(VisualBellContext);
	const { verifyAccount } = useAuthHelper({ ...ctx });

	useEffect(() => {
		if (!loading && router.query) {
			const code = router?.query?.verify[0];
			if (code) {
				if (session) {
					verifyAccount({
						details: { code: code },
						failHandler: (content) => {
							if (content.code) {
								ctx.setBell({ type: "error", message: "Code is incorrect or has expired" });
							}
							router.replace("/user/my-account/verification");
						},
						successHandler: () => {
							ctx.setBell({
								type: "success",
								message: "Congratulations! Your account is now verified",
							});
							router.replace("/home");
						},
					});
				} else {
					router.replace(`/auth/login/verify/${code}`);
					ctx.setBell({ type: "warning", message: "Please log in to verify your account" });
				}
			} else {
				router.replace("/home");
			}
		}
	}, [router.query, loading]);

	return null;
};

export default Verify;
