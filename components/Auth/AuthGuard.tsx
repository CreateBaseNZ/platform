import { ReactNode, useContext, useEffect } from "react";
import { signIn } from "next-auth/react";
import GlobalSessionContext from "../../store/global-session-context";
import router from "next/router";
import LoadingScreen from "../UI/LoadingScreen";
import { SchoolRole } from "../../types/groups";

export type AuthLevel = "admin" | "staff" | "user" | "any";

const hasAccess = (role: SchoolRole, auth: AuthLevel) => {
	switch (auth) {
		case "admin":
			return role === "admin";
		case "staff":
			return role === "admin" || role === "teacher";
		default:
			return true;
	}
};

type AuthGuardProps = {
	children: ReactNode;
	auth: AuthLevel;
};

const AuthGuard = ({ children, auth }: AuthGuardProps): JSX.Element => {
	const { globalSession } = useContext(GlobalSessionContext);

	if (!globalSession.loaded) return <LoadingScreen />;

	if (!globalSession.accountId) {
		console.log("not authed");
		signIn();
		return <LoadingScreen />;
	}
	if (!globalSession.verified) {
		console.log("not verified");
		router.push({ pathname: "/auth/verify", query: router.query });
		return <LoadingScreen />;
	}

	if (!hasAccess(globalSession.groups[globalSession.recentGroups[0]]?.role, auth)) {
		console.log("no permission");
		router.replace("/404");
		return <LoadingScreen />;
	}

	return <>{children}</>;
};

export default AuthGuard;
