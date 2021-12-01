import { SessionProvider } from "next-auth/react";
import { io } from "socket.io-client";
import NextNProgress from "nextjs-progressbar";
import { GlobalSessionContextProvider } from "../store/global-session-context";
import { VisualBellContextProvider } from "../store/visual-bell-context";
import { ClassesContextProvider } from "../store/classes-context";
import { MainLayoutContextProvider } from "../store/main-layout-context";
import VisualBell from "../components/VisualBell";
import MobileView from "../components/MobileView/MobileView";
import AuthGuard from "../components/Auth/AuthGuard";

import "../styles/globals.scss";
import styles from "../styles/_exports.module.scss";

function browseSocket(...data) {
	console.log(data);
	console.log(`${data[0]} visited the browse page`);
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
	const getLayout = Component.getLayout || ((page) => page);

	// EXAMPLE: Socket - Listen to a Trigger
	// const socket = io();
	// useEffect(() => {
	// 	socket.on("browse", browseSocket);
	// 	return () => {
	// 		socket.off("browse", browseSocket);
	// 	};
	// }, []);

	// useEffect(async () => {
	// 	try {
	// 		await fetch("/api/socket");
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, []);

	// useEffect(async () => {
	// 	console.log("Testing Error");
	// 	const input = {
	// 		email: "carlvelasco96@gmail.com",
	// 		profile: profileId,
	// 		route: "/test",
	// 		type: "frontend",
	// 		date: new Date().toString(),
	// 		metadata: { message: "Hello" },
	// 	};
	// 	let data;
	// 	try {
	// 		data = (await axios.post("/api/error", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input }))["data"];
	// 	} catch (error) {
	// 		data = { status: "error", content: error };
	// 	}
	// 	console.log(data);
	// }, []);

	return (
		<SessionProvider session={session}>
			<VisualBellContextProvider>
				<GlobalSessionContextProvider>
					<ClassesContextProvider>
						<MainLayoutContextProvider>
							<div id="modal-root" />
							<NextNProgress color="#772eff" options={{ showSpinner: false }} />
							{Component.auth ? <AuthGuard auth={Component.auth}>{getLayout(<Component {...pageProps} />)}</AuthGuard> : getLayout(<Component {...pageProps} />)}
							<MobileView />
							<VisualBell />
						</MainLayoutContextProvider>
					</ClassesContextProvider>
				</GlobalSessionContextProvider>
			</VisualBellContextProvider>
		</SessionProvider>
	);
};

export default MyApp;
