import { SessionProvider } from "next-auth/react";
import { io } from "socket.io-client";
import { GlobalSessionContextProvider } from "../store/global-session-context";
import { VisualBellContextProvider } from "../store/visual-bell-context";
import { ClassesContextProvider } from "../store/classes-context";
import { MainLayoutContextProvider } from "../store/main-layout-context";
import LoadingScreen from "../components/UI/Loading";
import VisualBell from "../components/VisualBell";
import MobileView from "../components/MobileView/MobileView";
import AuthGuard from "../components/Auth/AuthGuard";

import "../styles/globals.scss";

// function MyApp({ Component, pageProps }) {
// 	const [loaded, setLoaded] = useState(false);

// 	return (
// 		<Provider session={pageProps.session}>
// 			<VisualBellContextProvider>
// 				<InviteOrgContextProvider>
// 					<div id="modal-root"></div>
// 					<div id="ctx-menu-root"></div>
// 					{!loaded && <LoadingScreen />}
// 					{!blockView && <Component {...pageProps} setLoaded={setLoaded} />}
// 				</InviteOrgContextProvider>
// 				<VisualBell />
// 			</VisualBellContextProvider>
// 		</Provider>
// 	);
// }

// export default MyApp;

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

	return (
		<SessionProvider session={session}>
			<VisualBellContextProvider>
				<GlobalSessionContextProvider>
					<ClassesContextProvider>
						<MainLayoutContextProvider>
							{Component.auth ? <AuthGuard auth={Component.auth}>{getLayout(<Component {...pageProps} />)}</AuthGuard> : getLayout(<Component {...pageProps} />)}
							<div id="modal-root"></div>
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
