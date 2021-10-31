import { useState, createContext, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const GlobalSessionContext = createContext({
	globalSession: { loaded: false },
	setGlobalSession: () => {},
});

export default GlobalSessionContext;

export const GlobalSessionContextProvider = (props) => {
	const { data: session, status } = useSession();
	const [globalSession, setGlobalSession] = useState({ loaded: false });

	useEffect(async () => {
		if (status !== "loading" && session) {
			const DUMMY_INPUT = {
				accountId: session.user,
			};
			const DUMMY_STATUS = "succeeded";
			let data;
			try {
				data = (await axios.post("/api/session", { PUBLIC_API_KEY: process.env.PUBLIC_API_KEY, input: DUMMY_INPUT, status: DUMMY_STATUS }))["data"];
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
		}
	}, [status, session]);

	const value = useMemo(
		() => ({
			globalSession: globalSession,
			setGlobalSession: setGlobalSession,
		}),
		[globalSession, setGlobalSession]
	);

	return <GlobalSessionContext.Provider value={value}>{props.children}</GlobalSessionContext.Provider>;
};
