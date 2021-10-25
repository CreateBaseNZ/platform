import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserSessionContext from "../../store/user-session";

const hasAccess = (userType, authorisation) => {
	switch (authorisation) {
		case "admin":
			return userType === "admin";
		case "staff":
			return userType === "admin" || userType === "teacher";
		default:
			return true;
	}
};

const AuthGuard = ({ children, authorisation }) => {
	const router = useRouter();
	const { sessionLoaded, userSession } = useContext(UserSessionContext);
	// TODO app loading page
	const [render, setRender] = useState(<div>App loading</div>);

	// console.log(authorisation);
	// console.log(router);

	useEffect(() => {
		if (sessionLoaded) {
			if (authorisation) {
				if (!userSession.email && router.route !== "/auth") {
					router.replace({ pathname: "/auth", query: { action: "signup", redirect: router.asPath } });
				} else if (!userSession.verified && router.route !== "/verify") {
					router.replace("/verify");
				} else if (router.route === "/verify" && userSession.verified) {
					router.replace("/");
				} else if (!hasAccess(userSession.view.userType, authorisation)) {
					setRender(<div>Not authorised</div>);
				} else {
					setRender(children);
				}
			} else {
				if (router.route === "/auth" && userSession.email) {
					router.replace("/");
				} else {
					setRender(children);
				}
			}
		}
	}, [sessionLoaded, userSession, children, router]);

	return render;
};

export default AuthGuard;
