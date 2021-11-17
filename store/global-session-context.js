import { useState, createContext, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import useHandleResponse from "../hooks/useHandleResponse";
import router from "next/router";

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
				let data;
				try {
					data = (await axios.post("/api/session", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs }))["data"];
				} catch (error) {
					data.status = "error";
				} finally {
					console.log(data);
					if (data.status === "error" || data.status === "failed") {
						router.push("/404");
					} else {
						setGlobalSession((state) => ({ recentGroups: [], ...state, loaded: true, ...data.content }));
					}
				}
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
