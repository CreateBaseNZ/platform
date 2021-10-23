import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserSessionContext from "../../store/user-session";

const hasAccess = (userType, authoris) => {
	switch (authoris) {
		case "any":
			return true;
		case "admin":
			return userType === "admin";
		case "staff":
			return userType === "admin" || userType === "teacher";
		default:
			return false;
	}
};

const AuthGuard = ({ children, auth }) => {
	const router = useRouter();
	const { sessionLoaded, userSession } = useContext(UserSessionContext);
	const [render, setRender] = useState(<div>App loading</div>);

	console.log(children);
	console.log(auth);

	useEffect(() => {
		console.log("this ran");
		if (sessionLoaded && auth) {
			if (auth.authent === "either") {
				setRender(children);
			} else if (auth.authent === "unauthenticated") {
				if (userSession.email) {
					console.log("not require authentication but is authenticated");
					router.replace("/browse");
					setRender(null);
				} else {
					console.log("not require authentication and not authenticated");
					setRender(children);
				}
			} else {
				if (!userSession.email) {
					router.replace({ pathname: "/authent", query: { action: "signup", redirect: router.asPath } });
					setRender(null);
				} else if (hasAccess(userSession.view.userType, auth.authoris)) {
					setRender(children);
				} else {
					// TODO not authorised page
					setRender(<div>Not authorised</div>);
				}
			}
		}
	}, [sessionLoaded, userSession, auth, children]);

	// TODO app loading page
	return render;
};

export default AuthGuard;
