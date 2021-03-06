import { useState, createContext, useMemo, useEffect, useContext, Dispatch, SetStateAction, ReactNode, useCallback } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";
import axios from "axios";
import useApi, { APIRes } from "../hooks/useApi";
import { signOut } from "next-auth/react";
import { GroupAndUserObject } from "../types/groups";
import { useSetVisualBell } from "./visual-bell-context";

/** Global session object. */
export interface IGlobalSession {
	/** User account ID, or `null` if session is not authenticated. */
	accountId: string | null;
	/** User email. */
	email: string;
	/** User first name. */
	firstName: string;
	/** Array of groups the user is in. */
	groups: GroupAndUserObject[];
	/** User last name. */
	lastName: string;
	/** Number of notifications. */
	numOfNotifications: number;
	/** User profile ID. */
	profileId: string;
	/** Array of ordered group indices from most recent to oldest. */
	recentGroups: number[];
	/** Whether user is verified. */
	verified: boolean;
	/** Whether the session has loaded and the global session context is set. */
	loaded: boolean;
}

const initialState: IGlobalSession = {
	accountId: null,
	email: "",
	firstName: "",
	groups: [],
	lastName: "",
	numOfNotifications: 0,
	profileId: "",
	recentGroups: [],
	verified: false,
	loaded: false,
};

/** Global session context object. */
export type GlobalSessionCtx = {
	/** Global session object. */
	globalSession: IGlobalSession;
	/** Sets the global session object. */
	setGlobalSession: Dispatch<SetStateAction<IGlobalSession>>;
	/** Updates the `recentGroup` property in the profile saves object. */
	postRecentGroups: (newState: IGlobalSession) => void;
};

/**
 * @ignore
 */
const GlobalSessionContext = createContext<GlobalSessionCtx>({
	globalSession: initialState,
	setGlobalSession: () => {},
	postRecentGroups: () => {},
});

export default GlobalSessionContext;

type GlobalSessionCtxProps = { children: ReactNode };

/**
 * @ignore
 */
export const GlobalSessionContextProvider = ({ children }: GlobalSessionCtxProps) => {
	const { data: session, status } = useSession();
	const { post } = useApi();
	const setVisualBell = useSetVisualBell();
	const [globalSession, setGlobalSession] = useState<IGlobalSession>(initialState);

	console.log("** global context re-rendered **");

	useEffect(() => {
		if (status === "loading") return;
		if (!session?.user) {
			console.log("not signed in");
			setGlobalSession((state) => ({ ...state, loaded: true }));
			return;
		}
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
			setGlobalSession((state) => ({ ...state, ...data1.content, loaded: true }));
			const group = data1.content.groups[data1.content.recentGroups?.[0]];
			if (group) {
				setVisualBell("success", `Now viewing as a${group.role === "admin" ? "n" : ""} ${group.role} of ${group.name}`);
			}
		})();
	}, [status, session?.user, setVisualBell]);

	const postRecentGroups = useCallback(
		async (newState: IGlobalSession) => {
			await post("/api/profile/update-saves", {
				profileId: newState.profileId,
				update: { recentGroups: newState.recentGroups },
				date: new Date().toString(),
			});
			const group = newState.groups[newState.recentGroups[0]];
			if (group) {
				setVisualBell("success", `Now viewing as a${group.role === "admin" ? "n" : ""} ${group.role} of ${group.name}`);
			}
		},
		[post, setVisualBell]
	);

	const value = useMemo(
		() => ({
			globalSession: globalSession,
			setGlobalSession: setGlobalSession,
			postRecentGroups: postRecentGroups,
		}),
		[globalSession, postRecentGroups]
	);

	return <GlobalSessionContext.Provider value={value}>{children}</GlobalSessionContext.Provider>;
};
