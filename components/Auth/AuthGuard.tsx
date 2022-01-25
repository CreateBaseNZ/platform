import { ReactNode, useContext } from "react";
import { signIn } from "next-auth/react";
import GlobalSessionContext from "../../store/global-session-context";
import router from "next/router";
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

	if (!globalSession.loaded) return <></>;

	if (!globalSession.accountId) {
		console.log("not authed");
		signIn();
		return <></>;
	}

	if (!globalSession.verified) {
		console.log("not verified");
		router.push({ pathname: "/auth/verify", query: router.query });
		return <></>;
	}

	if (!hasAccess(globalSession.groups[globalSession.recentGroups[0]]?.role, auth)) {
		console.log("no permission");
		router.replace("/404");
		return <></>;
	}

	return <>{children}</>;
};

export default AuthGuard;
