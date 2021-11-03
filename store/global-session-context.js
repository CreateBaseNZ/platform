import { useState, createContext, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import useHandleResponse from "../hooks/useHandleResponse";

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
				const DUMMY_INPUT = {
					accountId: session.user,
					date: new Date().toString(),
				};
				const DUMMY_STATUS = "succeeded";
				let data;
				try {
					data = (await axios.post("/api/session", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: DUMMY_INPUT, status: DUMMY_STATUS }))["data"];
				} catch (error) {
					data.status = "error";
				} finally {
					console.log(data);
					if (data.status === "error" || data.status === "failed") {
						// TODO handle error or fail
					} else {
						setGlobalSession((state) => ({ ...state, loaded: true, ...data.content }));
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
					input: { profileId: globalSession.profileId, updates: [{ recentGroups: globalSession.recentGroups }], date: new Date().toString() },
				})
			)["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => {
					console.log("success!");
				},
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
