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

	console.log(globalSession);

	// useEffect(() => {
	// 	if (!globalSession.loaded) return;
	// 	if (!globalSession.accountId) return void signIn();
	// 	if (!globalSession.verified) return void router.push({ pathname: "/auth/verify", query: router.query });
	// }, [globalSession.loaded, globalSession.accountId, globalSession.verified]);

	if (!globalSession.loaded) return <LoadingScreen />;

	if (!globalSession.accountId) {
		console.log("no account");
		signIn();
		return <></>;
	}

	if (!globalSession.verified) {
		return <LoadingScreen />;
	} else if (hasAccess(globalSession.groups[globalSession.recentGroups[0]]?.role, auth)) {
		return <>{children}</>;
	} else {
		return <div>No access</div>;
	}

	return <LoadingScreen />;
};

export default AuthGuard;
