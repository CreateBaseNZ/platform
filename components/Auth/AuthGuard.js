import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import UserSessionContext from "../../store/user-session";

const hasAccess = (userType, authoris) => {
	if (authoris === "admin") {
		if (userType === "admin") {
			return true;
		}
	} else if (authoris === "teacher") {
		if (userType === "admin" || userType === "teacher") {
			return true;
		}
	} else if (authoris === "student" || authoris === "member") {
		if (userType === "admin" || userType === "teacher" || authoris === "student" || authoris === "member") {
			return true;
		}
	}
	return false;
};

const AuthGuard = ({ children, auth }) => {
	const router = useRouter();
	const { sessionLoaded, userSession } = useContext(UserSessionContext);

	console.log(auth);
	console.log(router);
	console.log(children);

	useEffect(() => {
		if (sessionLoaded && auth) {
			if (auth.authent) {
				// needs to be authent
				if (!userSession.email) {
					router.replace({ pathname: "/authent", query: { action: "signup", redirect: router.asPath } });
					console.log("not authenticated");
					return null;
				} else {
					if (hasAccess(userSession.view.userType, auth.authoris)) {
						console.log("authenticated and authorised");
						return <>{children}</>;
					} else {
						console.log("authenticated but not authorised");
						return <div>Not authorised</div>;
					}
				}
			} else {
				// dont need to be authent
				console.log("dont need to be authenticated");
				return <>{children}</>;
			}
		}
	}, [userSession, sessionLoaded, auth]);

	if (!sessionLoaded) return <div>App loading</div>;

	console.log("this still ran");

	return null;
};

export default AuthGuard;
