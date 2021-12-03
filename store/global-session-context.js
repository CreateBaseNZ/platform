import { useState, createContext, useMemo, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";
import axios from "axios";
import useApi from "../hooks/useApi";
import { signOut } from "next-auth/react";
import VisualBellContext from "./visual-bell-context";

const GlobalSessionContext = createContext({
	globalSession: { loaded: false },
	setGlobalSession: () => {},
});

export default GlobalSessionContext;

export const GlobalSessionContextProvider = (props) => {
	const { post } = useApi();
	const [globalSession, setGlobalSession] = useState({ loaded: false });
	const { setVisualBell } = useContext(VisualBellContext);
	const { data: session, status } = useSession();

	useEffect(async () => {
		if (status !== "loading") {
			if (session) {
				const inputs = {
					accountId: session.user,
					date: new Date().toString(),
					properties: { profile: ["recentGroups"], license: ["alias"] },
				};
				let data1;
				try {
					data1 = (await axios.post("/api/session", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs }))["data"];
				} catch (error) {
					data1.status = "error";
				}
				if (data1.status === "error" || data1.status === "failed") {
					if (data1.content === "invalid account id") {
						signOut();
					} else {
						router.push("/404");
					}
					return;
				}
				const groups = data1.content.groups.filter((group) => (group.role === "admin" || group.role === "teacher") && group.verified && group.status === "activated");
				let data2;
				try {
					data2 = (await axios.post("/api/notifications/fetch", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { groups } }))["data"];
				} catch (error) {
					data2.status = "error";
				}
				if (data2.status === "error" || data2.status === "failed") return router.push("/404");
				data1.content.numOfNotifications = data2.content.length;
				setGlobalSession((state) => ({ recentGroups: [], ...state, ...data1.content, loaded: true }));
			} else {
				setGlobalSession((state) => ({ ...state, loaded: true }));
			}
		}
	}, [status, session]);

	useEffect(async () => {
		if (!globalSession.loaded) return;
		await post({
			route: "/api/profile/update-saves",
			input: {
				profileId: globalSession.profileId,
				update: { recentGroups: globalSession.recentGroups },
				date: new Date().toString(),
			},
		});
		router.push("/browse");
		setVisualBell({ type: "success", message: `Now viewing as ${globalSession.groups[globalSession.recentGroups[0]].role} in ${globalSession.groups[globalSession.recentGroups[0]].name}` });
	}, [globalSession.recentGroups]);

	const value = useMemo(
		() => ({
			globalSession: globalSession,
			setGlobalSession: setGlobalSession,
		}),
		[globalSession, setGlobalSession]
	);

	return <GlobalSessionContext.Provider value={value}>{props.children}</GlobalSessionContext.Provider>;
};
