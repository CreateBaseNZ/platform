import { useState, createContext, useMemo, useEffect, useContext, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";
import axios from "axios";
import useApi, { APIRes } from "../hooks/useApi";
import { signOut } from "next-auth/react";
import VisualBellContext from "./visual-bell-context";
import { GroupAndUserObject } from "../types/types";

interface IGlobalSession {
	accountId: string | null;
	email: string;
	firstName: string;
	groups: GroupAndUserObject[];
	lastName: string;
	numOfNotifications: number;
	profileId: string;
	recentGroups: number[];
	verified: boolean;
}

const defaultGlobalSession: IGlobalSession = {
	accountId: null,
	email: "",
	firstName: "",
	groups: [],
	lastName: "",
	numOfNotifications: 0,
	profileId: "",
	recentGroups: [],
	verified: false,
};

interface IGlobalSessionCtx {
	loaded: boolean;
	globalSession: IGlobalSession;
	setGlobalSession: Dispatch<SetStateAction<IGlobalSession>>;
}

const GlobalSessionContext = createContext<IGlobalSessionCtx>({
	loaded: false,
	globalSession: defaultGlobalSession,
	setGlobalSession: () => {},
});

export default GlobalSessionContext;

export const GlobalSessionContextProvider = ({ children }: { children: JSX.Element }) => {
	const { data: session, status } = useSession();
	const { setVisualBell } = useContext(VisualBellContext);
	const { post } = useApi();
	const [loaded, setLoaded] = useState(false);
	const [globalSession, setGlobalSession] = useState<IGlobalSession>(defaultGlobalSession);

	useEffect(() => {
		if (status !== "loading") {
			if (session) {
				const inputs = {
					date: new Date().toString(),
					properties: { profile: ["recentGroups"], license: ["alias"] },
				};
				(async () => {
					let data1: APIRes = {};
					try {
						data1 = (await axios.post("/api/session", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs }))["data"] as APIRes; // TODO - find the not hacky solution
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
					const groups = data1.content.groups.filter((group: GroupAndUserObject) => (group.role === "admin" || group.role === "teacher") && group.verified && group.status === "activated");
					let data2: APIRes = {};
					try {
						data2 = (await axios.post("/api/notifications/fetch", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { groups } }))["data"] as APIRes; // TODO - find the not hacky solution
					} catch (error) {
						data2.status = "error";
					}
					if (data2.status === "error" || data2.status === "failed") return router.push("/404");
					data1.content.numOfNotifications = data2.content.length;
					setGlobalSession((state) => ({ ...state, ...data1.content }));
					setLoaded(true);
				})();
			} else {
				setLoaded(true);
			}
		}
	}, [status, session?.user]);

	useEffect(() => {
		if (!loaded || !globalSession.accountId) return;
		(async () => {
			await post("/api/profile/update-saves", {
				profileId: globalSession.profileId,
				update: { recentGroups: globalSession.recentGroups },
				date: new Date().toString(),
			});
			const group = globalSession.groups[globalSession.recentGroups[0]];
			if (group) {
				setVisualBell("success", `Now viewing as a${group.role === "admin" ? "n" : ""} ${group.role} of ${group.name}`);
			}
		})();
	}, [globalSession.recentGroups]);

	const value = useMemo(
		() => ({
			loaded: loaded,
			globalSession: globalSession,
			setGlobalSession: setGlobalSession,
		}),
		[loaded, globalSession]
	);

	return <GlobalSessionContext.Provider value={value}>{children}</GlobalSessionContext.Provider>;
};
