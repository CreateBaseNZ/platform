import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DEFAULT_TABS from "../../constants/mainTabs";
import UserSessionContext from "../../store/user-session";

const hasAccess = (role, authorisation) => {
	switch (authorisation) {
		case "admin":
			return role === "admin";
		case "staff":
			return role === "admin" || role === "teacher";
		default:
			return true;
	}
};

const isDefaultTab = (route) => {
	const pathname = "/" + route.split("/")[1];
	console.log(DEFAULT_TABS.some((tab) => tab.urlObject.pathname === pathname));
	return DEFAULT_TABS.some((tab) => tab.urlObject.pathname === pathname);
};

const AuthGuard = ({ children, authorisation }) => {
	const router = useRouter();
	const { sessionLoaded, userSession } = useContext(UserSessionContext);
	// TODO app loading page
	const [render, setRender] = useState(<div>App loading</div>);

	console.log(router);

	useEffect(() => {
		if (sessionLoaded) {
			if (router.route.startsWith("/auth")) {
				if (userSession.email) {
					router.replace("/");
				} else {
					setRender(children);
				}
			} else if (router.route.startsWith("/verify")) {
				if (userSession.email) {
					if (userSession.verified) {
						router.replace("/");
					} else {
						setRender(children);
					}
				} else {
					router.replace({ pathname: "/auth/login", query: { redirect: router.asPath } });
				}
			} else if (authorisation) {
				if (!userSession.email) {
					router.replace({ pathname: "/auth/signup", query: { redirect: router.asPath } });
				} else if (!userSession.verified) {
					router.replace("/verify");
				} else if (!userSession.view && !isDefaultTab(router.route)) {
					router.replace("/my-groups");
				} else if (!hasAccess(userSession.view?.role, authorisation)) {
					setRender(<div>Not authorised</div>);
				} else {
					setRender(children);
				}
			} else {
				setRender(children);
			}
		}
	}, [sessionLoaded, userSession, children, router]);

	return render;
};

export default AuthGuard;
