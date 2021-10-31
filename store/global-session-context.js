import { useSession } from "next-auth/react";
import { useState, createContext, useMemo, useEffect } from "react";

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
			const input = {
				accountId: session.user,
			};
			const status = "succeeded";
			let data;
			try {
				data = (await axios.post("/api/session", { PUBLIC_API_KEY: process.env.PUBLIC_API_KEY, input, status }))["data"];
			} catch (error) {
				data.status = "error";
			} finally {
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
