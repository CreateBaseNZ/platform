import { useState, createContext, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import useHandleResponse from "../hooks/useHandleResponse";
import router from "next/router";
import { signOut } from "next-auth/react";

const GlobalSessionContext = createContext({
	globalSession: { loaded: false },
	setGlobalSession: () => {},
});

export default GlobalSessionContext;

export const GlobalSessionContextProvider = (props) => {
	const { data: session, status } = useSession();
	const [globalSession, setGlobalSession] = useState({ loaded: false });
	const { handleResponse } = useHandleResponse();

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
				let data2;
				try {
					data2 = (await axios.post("/api/notifications/fetch", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { groups: data1.content.groups } }))["data"];
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
		let data = {};
		try {
			data = (
				await axios.post("/api/profile/update-saves", {
					PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
					input: {
						profileId: globalSession.profileId,
						update: { recentGroups: globalSession.recentGroups },
						date: new Date().toString(),
					},
				})
			)["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => {},
			});
		}
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
