import { useState, createContext, useMemo, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";
import axios from "axios";
import useApi from "../hooks/useApi";
import { signOut } from "next-auth/react";
import VisualBellContext from "./visual-bell-context";
import { GroupAndUserObject } from "../types/types";

interface IGlobalSessionCtx {
	globalSession: {
		accountId: string;
		email: string;
		firstName: string;
		groups: GroupAndUserObject[];
		lastName: string;
		loaded: boolean;
		numOfNotifications: number;
		profileId: string;
		recentGroups: number[];
		verified: boolean;
	};
	setGlobalSession: () => void;
}

const GlobalSessionContext = createContext<IGlobalSessionCtx>({
	globalSession: { accountId: "", email: "", firstName: "", groups: [], lastName: "", loaded: false, numOfNotifications: 0, profileId: "", recentGroups: [], verified: false },
	setGlobalSession: () => {},
});

export default GlobalSessionContext;

export const GlobalSessionContextProvider = ({ children }: { children: JSX.Element }) => {
	const { data: session, status } = useSession();
	const { setVisualBell } = useContext(VisualBellContext);
	const { post } = useApi();
	const [globalSession, setGlobalSession] = useState({ loaded: false });

	useEffect(async () => {
		if (status !== "loading") {
			if (session) {
				const inputs = {
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
	}, [status, session?.user]);

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
		if (globalSession.groups[globalSession.recentGroups[0]]) {
			setVisualBell(
				"success",
				`Now viewing as a${globalSession.groups[globalSession.recentGroups[0]].role === "admin" ? "n" : ""} ${globalSession.groups[globalSession.recentGroups[0]].role} of ${
					globalSession.groups[globalSession.recentGroups[0]].name
				}`
			);
		}
	}, [globalSession.recentGroups]);

	const value = useMemo(
		() => ({
			globalSession: globalSession,
			setGlobalSession: setGlobalSession,
		}),
		[globalSession, setGlobalSession]
	);

	return <GlobalSessionContext.Provider value={value}>{children}</GlobalSessionContext.Provider>;
};
