import { useState, createContext, useMemo, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";
import axios from "axios";
import useApi from "../hooks/useApi";
import { signOut } from "next-auth/react";
import VisualBellContext from "./visual-bell-context";
import tracking from "../utils/tracking";

const GlobalSessionContext = createContext({
	globalSession: { loaded: false },
	setGlobalSession: () => {},
	trackingData: { loaded: false },
	setTrackingData: () => {},
});

export default GlobalSessionContext;

export const GlobalSessionContextProvider = (props) => {
	const { data: session, status } = useSession();
	const { setVisualBell } = useContext(VisualBellContext);
	const { post } = useApi();
	const [globalSession, setGlobalSession] = useState({ loaded: false });
	const [trackingData, setTrackingData] = useState({ loaded: false });

	useEffect(async () => {
		if (status !== "loading") {
			if (session) {
				console.log("use effect ran");
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
			setVisualBell({
				type: "success",
				message: `Now viewing as a${globalSession.groups[globalSession.recentGroups[0]].role === "admin" ? "n" : ""} ${globalSession.groups[globalSession.recentGroups[0]].role} of ${
					globalSession.groups[globalSession.recentGroups[0]].name
				}`,
			});
		}
	}, [globalSession.recentGroups]);

	useEffect(async () => {
		let data;
		try {
			data = await tracking.preprocess();
		} catch (error) {
			// TODO: Error handling
		} finally {
			console.log(data);
			setTrackingData({ data: data, loaded: true });
		}
	}, []);

	const value = useMemo(
		() => ({
			globalSession: globalSession,
			setGlobalSession: setGlobalSession,
			trackingData: trackingData,
			setTrackingData: setTrackingData,
		}),
		[globalSession, setGlobalSession, trackingData, setTrackingData]
	);

	return <GlobalSessionContext.Provider value={value}>{props.children}</GlobalSessionContext.Provider>;
};
