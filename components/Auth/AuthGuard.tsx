import { useContext, useEffect } from "react";
import { signIn } from "next-auth/react";
import GlobalSessionContext from "../../store/global-session-context";
import router from "next/router";
import LoadingScreen from "../UI/LoadingScreen";
import { Role } from "../../types/types";

export type AuthLevel = "admin" | "staff" | "user" | "any";

const hasAccess = (role: Role, auth: AuthLevel) => {
	switch (auth) {
		case "admin":
			return role === "admin";
		case "staff":
			return role === "admin" || role === "teacher";
		default:
			return true;
	}
};

interface IAuthGuardProps {
	children: JSX.Element;
	auth: AuthLevel;
}

const AuthGuard = ({ children, auth }: IAuthGuardProps): JSX.Element => {
	const { loaded, globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (loaded) {
			if (!globalSession.accountId) {
				signIn();
			} else if (!globalSession.verified) {
				router.push({ pathname: "/auth/verify", query: router.query });
			}
		}
	}, [loaded, globalSession.accountId, globalSession.verified]);

	if (!loaded) return <LoadingScreen />;

	if (globalSession.accountId) {
		if (!globalSession.verified) {
			return <LoadingScreen />;
		} else if (hasAccess(globalSession.groups[globalSession.recentGroups[0]]?.role, auth)) {
			return children;
		} else {
			return <div>No access</div>;
		}
	}

	return <LoadingScreen />;
};

export default AuthGuard;
